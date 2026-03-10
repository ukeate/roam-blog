- v grep         # 过滤掉grep
- 常用
    - grep -nr --exclude-dir={.git, res, bin} 'a' .
        - 递归查找
    - ```shell
      sed -i "s/邻羊生活/成都非遗/g" `grep 邻羊生活 -rl ./
      `````
