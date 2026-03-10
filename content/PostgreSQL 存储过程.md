- ```sql
  drop function change_type1();
  create or replace function change_type1()
  returns int as
  $body$
  DECLARE
      r mongo_keys_type%rowtype;
      begin
      for r in select * from mongo_keys_type where type='number'
      loop
          EXECUTE 'alter table "' || r."mongo_collection_name" || '" alter "' || r."key" || '" type decimal';
      END LOOP;
      return 0;
      end
  $body$
  language 'plpgsql';
  
  select change_type1()
  ```
