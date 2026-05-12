- 网络连接

    | 联通 | NAT | Bridged Adapter | Internal | Host-only Adapter |
    | --- | --- | --- | --- | --- |
    | 虚拟机-&gt;主机 | √ | √ | × | 默认不能，需设置 |
    | 主机-&gt;虚拟机 | × | √ | × | 默认不能，需设置 |
    | 虚拟机-&gt;其他主机 | √ | √ | × | 默认不能，需设置 |
    | 其他主机-&gt;虚拟机 | × | √ | × | 默认不能，需设置 |
    | 虚拟机间 | × | √ | 同网络可以 | √ |
- 方案
    - linux安装增强iso
        - iso位置
            - /usr/share/virtualbox
        - 编译环境
            - kernel-devel
            - gcc
    - 共享剪切板与拖拽文件
        - 虚拟机启动后devices下设置
    - 共享文件夹
        - linux下挂载
            - mount -t vboxsf 共享名 /mnt/share
        - windows下挂载
            - 我的电脑 右键 映射网络驱动器
    - clone
        - clone 时选择更新mac,并在虚拟机中网络连接设置中重写mac与ip
        - 配置主机间ssh免登录，远程ssh与所有主机免登录
