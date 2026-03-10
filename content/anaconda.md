- [[conda]]
- 环境管理、包管理
- 场景
    - shell默认不进入base环境
        - conda config --set auto_activate_base false
    - 卸载
        - conda install anaconda-clean
        - anaconda-clean --yes
        - rm -rf anaconda3
          rm -rf ~/anaconda3
          rm -rf ~/opt/anaconda3
        - .bash_profile 删除PATH
