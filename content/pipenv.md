- 安装
    - pip install pipenv
- 命令
    - pipenv
        - __进入项目目录运行__
        - --help  -h
        - --python 3.6
            - 创建环境
        - --venv
            - __查看环境__
        - --rm
            - 删除环境
        - install
            - 当前目录安装
            - --skip-lock
            - --dev
                - __只用于开发环境__
        - uninstall
            - --all
            - --all-dev
        - lock
        - shell
        - run Python a.py
- 场景
    - 使用requirements.txt
        - pipenv lock -r --dev > requirements.txt
        - pipenv install -r requirements.txt
    - 创建环境
        - pipenv --python 3.6
        - pipenv run python --version
- Pipfile
    - ```shell
      [[source]]
      name = "pypi"
      url = "https://pypi.org/simple"
      verify_ssl = true
      
      [dev-packages]
      
      [packages]
      
      [requires]
      python_version = "3.7"
      ```
- ~/.local/share/virtualenvs
    - __环境存储位置__
