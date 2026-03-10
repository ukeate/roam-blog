- procedure language
- oracle对sql99的扩展
    - 增加了类型定义
    - 判断
    - 循环
    - 指针/游标/光标
    - 输出语句
    - 异常
- 语法
    - 符号
        - /   # 结束标记
        - :=                # 赋值号
        - &   # 进行定义运行时赋值
    - 语句
        - ```javascript
          declare    分号结束
          ;
          begin  dml语句/tcl语句,以分号结束 # 必写
          ;
          [exception]
          ;
          end;        # 必写
          /
          
          set serveroutput on;        # 设置plsql的输出打开，默认是off 的
          
          dbms_output.put_line('');  # 只能在 plsql 的执行语句中使用，dbms_output的输出方法,会自动换行
          
          emp.ename%type;        # 同emp表中的ename的类型一样的类型
          emp_record emp%rowtype      # 匹配一行类型
              emp_record.ename输出一个字段的数据
          
          
          if 条件1.1 and 条件1.2 then 语句1;
          elsif 条件2 then 语句2;
          else 语句3;
          end if;
          
          loop
          exit [when];
          end loop;
          
          while 条件
          loop
          ;
          end loop;
          
          for i in 1..3                # 不可以在循环中更改i的值
          loop
          ;
          end loop;
          ```
    - cursor
        - 多行数据 ，相当于resultset
        - ```javascript
          cursor c1 查询语句
          open c1;
          loop
          fetch                        # 先判断再下移，最后一条记录打印两次
                                          ## 先下移再判断 ，正常显示
          exit when 条件;
          end loop;
          close c1;
          ```
- 异常
    - 内置异常
        - no_data_found
            - 没有查到数据,游标中使用的时候异常不抛出
            - select ename into pename from emp where deptno = 100;
                - select into 插入的数据找不到的时候
        - too_many_rows
        - zero_divide
            - 除零异常
        - value_error
        - timeout_on_resource
            - 例子
                - ```sql
                  declare
                      i number(2) := 10;
                      s number(2);
                  begin
                      s:= i/0;
                  exception
                      when zero_divide then dbms_output.put_line('除0异常');
                  end;
                  /
                  ```
    - 自定义异常
        - ```sql
          declare
              no_emp_found exception;
          begin
              if()then
              raise no_emp_found;
              end if;
          exception
              when no_emp_found then dbms_output.put_line('查无数据');
          end;
          /
          ```
    - 抛出异常的函数
        - raise_application_error('-20666','禁止操作');
            - begin语句中的相关地方调用此函数即可
            - 20000-20999错误编号范围，是负数
- 例子
    - ```sql
      例1
        declare
            mysum number(3);
        begin
            mysum := 10 + 100;      # :=就是赋值
            dbms_output.put_line('结果为' || mysum);
        end;
        /
      例2，emp.ename%type
            ## select .. into ..
        declare
            x emp.ename%type;
            y emp.sal%type;
        begin
            --select ename,sal from emp where empno = 7369        # sql语句可以单独执行
            select ename,sal into x,y from emp where empno = 7369      # plsql语句只能整体 
        执行
            dbms_output.put_line(x || '是' || y);
        end;
        /
      例3，emp%rowtype
        declare
            emp_record emp%rowtype;
        begin
            select * into emp_record from emp where empno = 7788;
            dbms_output.put_line(emp_record.ename || emp_record.sal);
        end;
        /
      例4，运行时赋值符号与if判断语句
        declare
        num number(2);
        begin
        num := &num;
        if num<5 then dbms_output.put_line(num || '<5');
        elsif num=5 then ..
        else ..
        end if;
        end;
        /
      例5，loop 循环
        declare
            i number(2) := 1;      # 声明的时候可以赋值
        begin
            loop
                exit when i > 10;
                dbms_output.put_line(i);
                i := i + 1;
            end loop;
        end;
        /
      例6，while循环
        declare
            i number(2) := 10;
        begin
            while i <= 20
            loop
                dbms_output.put_line(i);
                i := i + 1;
            end loop;
        end;
        /
      例7，for循环
        declare
            i number(2)
        begin
                loop
            for i in 20..30    # 一个一个增加,循环中不能再对i进行操作
                dbms_output.put_line(i);
            end loop;
        end;
        /
      例8，cursor
        declare
            cursor cemp is select ename,sal from emp;
            pename emp.ename%type;
            psal emp.sal%type;
        begin
            open cemp;
            loop
                exit when cemp%notfound;
                fetch cemp into pename,psal;
                dbms_output.put_line(pename || '的薪水是' || psal);
            end loop;
            close cemp;
        end;
        /
      例9，有参游标
        declare
            cursor cemp(pdeptno emp.deptno%type) is select ename,sal from emp where deptno=pdeptno;
            pename emp.ename%type;
            psal emp.sal%type;
        begin
            open cemp(&deptno);
            loop
                fetch cemp into pename,psal;
                exit when cemp%notfound;
                dbms_output.put_line(pename ||'的薪水是' || psal);
        end loop;
                close cemp;
                end;
                /
      例10，输入&emptno没有的时候，输出"查无员工"，综合if loop 与cursor
        declare
            cursor cemp(pdeptno emp.deptno%type) is select ename,sal from emp where deptno=pdeptno;
            pename emp.ename%type;
            psal emp.sal%type;
                        pdeptno emp.deptno%type := &deptno;
        begin
                if pdeptno in (10,20,30) then dbms_output.put_line('输入的值正确');
            open cemp(pdeptno);
            loop
                fetch cemp into pename,psal;
                exit when cemp%notfound;
                dbms_output.put_line(pename ||'的薪水是' || psal);
        end loop;
                close cemp;
                else dbms_output.put_line('输入的值不正确');
                end if;
                end;
                /
      
      例11，给所有ANALYST加工资，综合cursor if loop ,循环之后执行了tcl 事务控制语言
        declare
            cursor cemp is select empno,ename,job,sal from emp;
            pempno emp.empno%type;
            pename emp.ename%type;
            pjob emp.job%type;
            psal emp.sal%type;
        begin
            open cemp;
            loop
                fetch cemp into pempno,pename,pjob,psal;
                exit when cemp%notfound;
                if pjob='ANALYST' then
                    update emp set sal = sal+1000 where empno = pempno;
                end if;
            end loop;
            commit;
            close cemp;
        end;
        /
      ```
