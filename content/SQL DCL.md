- 控制，data control language
- ```sql
  grant all privileges on db1.tb1         # 授权
      # grant insert,delete,update,select,create on db1.tb1
      to 'user1'@'host1'          # localhost本地 , %代表远程
      identified by 'pwd1'
      with grant option;          # 有授权权限
  grant select any table      # oracle
      to user1
  revoke select any table     # oracle
      from user1
  
  revoke privilege ON db1.tb1 from 'user1'@'host1';       # 撤销权限
  flush privileges;        # 提交授权修改, oracle不用flush直接生效
  
  
  oracle
      alter user user1 account unlock             # 解锁用户
      alter user user1 identified by user1        # 改密码
      conn / as sysdba                            # 换角色
  ```
