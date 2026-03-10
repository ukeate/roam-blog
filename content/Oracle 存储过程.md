- 过程与函数
    - 返回值
        - 函数有且只一个返回值
        - 过程没有或多个返回值用(out参数)
        - 过程可返回函数,函数只能返回值或表对象
    - 过程和函数不能重名
    - 函数可嵌入sql执行，过程不行
- 语法
    - IF .. THEN
        - null;
    - ELSIF .. THEN
        - null;
    - ELSE
        - null;
    - END IF;
    - select into给变量赋值
    - raise 异常名   # 抛异常
- 函数
    - ```sql
      create or replace function calculate_score
      ( cat in varchar2
      , score in number
      , weight in number
      ) return number as
      begin
      return null;
      end calculate_score;
      ```
    - 例子1
        - in参数 和返回值的函数
        - ```sql
          create or replace function findEmpIncome(pempno in number) return number
          as
              income number(10);
          begin
              select sal*12+NVL(comm,0) into income from emp where empno = pempno;
              return income;
          end;
          /
          ```
    - 例子2
        - in、out 参数和返回值的函数
        - ```sql
          create or replace function findEmpNameAndSal (pempno in number, psal out number)return varchar2
          as
          pename emp.ename%type;
          begin
          select ename , sal into pename,psal from emp where empno = pempno;
          return pename;
          end;
          /
          执行
          declare
          psal emp.sal%type;
          pename emp.ename%type;
          begin
              pename := findEmpNameAndSal(7788,psal);
              dbms_output.put_line(pename||'的工资是'||psal);
          end;
          /
          ```
- 过程
    - 参数默认in
    - ```sql
      create or replace procedure add_evaluation
      ( evaluation_id in number
      , employee_id in number
      , evaluation_date in date
      , job_id in varchar2
      , manager_id in number
      , department_id in number
      ) as            # as 变量 类型 (值范围);
      begin
      null;
      exception
          when others then
              rollback;
      end add_evaluation;
      
      exec  add_evaluation
      
      drop procedure add_evaluation;
      ```
    - 例子1
        - in 参数的使用
        - ```sql
          create or replace procedure raiseSalary(pempno in emp.empno%type)
          as
          begin
              update emp set sal = sal * 1.1 where empno = pempno;
          end;
          /
          exec raiseSalary(7369);
          ```
    - 例子2
        - out参数的使用，select into
        - ```sql
          create or replace procedure findEmpNameAndSalAndJob (pempno in emp.empno%type,
          pename out emp.ename%type,
          pjob out emp.job%type,
          psal out emp.sal%type)
          as
          begin
              select ename,job,sal into pename,pjob,psal from emp where empno = pempno;
          end;
          /
          declare
              pename emp.ename%type;
              pjob  emp.job%type;
              psal  emp.sal%type;
          begin
              findEmpNameAndSalAndJob(7788,pename,pjob,psal);
              dbms_output.put_line('7788号员工的姓名是'||pename||',职位是'||pjob||',薪水是'||psal);
          end;
          /
          ```
- 包
    - 声明
        - ```sql
          create or replace PACKAGE emp_eval AS
          PROCEDURE eval_department(department_id IN NUMBER);
          FUNCTION calculate_score(evaluation_id IN NUMBER , performance_id IN NUMBER)
              RETURN NUMBER;
          END emp_eval;
          ```
    - 定义
        - ```sql
          CREATE OR REPLACE PACKAGE BODY emp_eval AS
          
          PROCEDURE eval_department(department_id IN NUMBER) AS
          BEGIN
              /* TODO implementation required */
              NULL;
          END eval_department;
          
          FUNCTION calculate_score(evaluation_id IN NUMBER , performance_id IN NUMBER)
              RETURN NUMBER AS
          BEGIN
              /* TODO implementation required */
              RETURN NULL;
          END calculate_score;
          
          END emp_eval;
          ```
