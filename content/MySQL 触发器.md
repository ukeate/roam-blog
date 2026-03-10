- trigger
- new与old
    - 指代新数据
    - insert只有new是合法的；
    - delete只有old才合法；
    - update可同时使用。
- 语句
    - show triggers [from schema_name];
    - drop trigger [if exists] [schema_name.]trigger_name
- 例1
    - ```javascript
      # 当更新表tb1的name字段时，更新表tb2 field1加上name的长度create trigger tr1
      after                   # before, after
      insert on tb1           # insert, update, delete
      for each row
      update tb2 set field1 = field1+char_length(new.name);
          
      ```
- 例2     
    - ```javascript
      # UPDATE同时使用NEW和OLD
      create trigger tr1
      before update on t22
      for each row
      begin
      set @old = old.s1;
      set @new = new.s1;
      end;
      ```
