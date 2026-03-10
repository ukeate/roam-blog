- 分类
    - select 没有触发器
    - 语句级insert / delete           # 只在语句执行时触发
    - 行级(for each row)update        # 每一行都执行，出错后不会继续执行并且回滚
- 语法
    - create [or replace] trigger 触发器名
    - {before|after}
    - {insert|delete|update of 列名}
    - on 表名
    - for each row
    - plsql块
    - 行级触发器中
        - :new 代表更新后那一行整行的值
        - :old 则是旧的整行的值
        - update of 列名 for each row是连起来用的。语句级触发器没有for each row
    - drop trigger 触发器名
- 例子(语句级)
    - 当在休息日与非9点到17点之间的时候，禁止对emp表进行插入操作
    - ```sql
      create or replace trigger securityTrigger
      before insert on emp
      declare
      pday varchar2(10);
      phour number(20);
      begin
      select to_char(sysdate,'day') into pday from dual;
      select to_char(sysdate,'hh24') into phour from dual;
      if(pday in ('星期六','星期日') or (phour not between 9 and 17)) then
      raise_application_error('-20666','禁止操作');
      end if;
      end;
      /
      ```
- 例子(行级)
    - 当对每一行的工资进行修改的时候，新的工资不能小于原来的工资
    - ```sql
      create or replace trigger checkSalayTrigger
      before update of sal on emp for each row
      begin
      if :new.sal < :old.sal then
      raise_application_error('-20555','工资不能减少');
      end if;
      end;
      /
      ```
