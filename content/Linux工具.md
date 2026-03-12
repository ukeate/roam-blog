- 终端与文本
    |  |  |  |
    | --- | --- | --- |
    | 快捷键 | ctrl alt f1/f2/…（终端切换） |  |
    | 帮助 | [[tldr]]、[[navi]]、[[man]] | [[whatis]]、[[apropos]] |
    | Shell与会话 | clear、pwd、echo、source、[[bash]]、zsh、[[tmux]] | fish、[[screen]] |
    | 终端录制与自动化 | [[script]]、[[scriptreply]] |  |
    | 趣味 | aview（图片文字化）、pv -qL 10（文件缓慢显示） | fortune、toilet（彩虹字）、cowsay（牛说）、figlet（大写字）、sl（火车） |
    | 日期与日历 | [[date]]、[[cal]] |  |
    | 计算 | bc、maxima（符号计算）、factor（分解质因数） |  |
    | 编码与编辑 | [[iconv]]、nano |  |
- 文件与存储
    |  |  |  |
    | --- | --- | --- |
    | 文件与目录 | rm -rf、[[touch]]、[[ls]]、mkdir、cd（~ / -）、[[cp]]、mv、ln | tree、rmdir |
    | 查找与定位 | whereis、which、[[find]] |  |
    | 归档与压缩 | [[tar]]、gzip x（压缩；-d 解压）、[[unzip]] | unzip-beta（解压并转码中文） |
    | 云盘与文件管理 | [[onedrive命令]] | mucommander（跨平台文件管理软件）、shred（文件粉碎）、rclone-browser（rclone GUI） |
    | 文件权限属性 | [[chmod]]、[[chown]]、[[chgrp]]、[[chattr]] 、lsattr file | [[getfacl]]、[[setfacl]]、[[chcon]] |
    | 存储查询 | lsblk（查看挂载的分区）、blktrace（磁盘访问情况） | nfsiostat（nfs驱动器信息）、cifsiostat（CIFS信息）、[[hdpi]] |
    | 存储操作 | fdisk -l、parted、mkfs、fsck /dev/sda1（检查并修复）、[[mount]]、[[umount]]、df -h（-T 查看分区类型）、[[LVM]] | cfdisk、sfdisk、mkswap、testdisk /dev/sdb1、e2fsck -a /dev/sdb1（修复ext2）、ntfsfix -d -b /dev/sdb1（修复ntfs坏扇区和脏标记）、udisks --detach 设备编号（移除磁盘）、growpart（磁盘热扩容）、[[mdadm]]、[[dmsetup]]、[[multipath]] |
    | 存储测试 | [[hdparm]]、[[smartctl]]、[[fio]] | [[bonnie++]]、[[iozone]] |
- 系统
    |  |  |  |
    | --- | --- | --- |
    | 电源 | poweroff（立即关机）、shutdown -h now（-r 重启）、halt |  |
    | 启动与任务 | systemd、[[systemctl]]、[[cron]] | [[grub]]、at（某时间运行一次）、osmo（个人日程管理）、[[reap]] |
    | 用户 | [[sudo]]、id（用户信息/所在组）、passwd（修改密码）、useradd outrun（-g 指定组；-r 系统用户；-d 指定登录目录；-u 指定id）、[[usermod]] | [[w]]、id outrun（用户信息）、[[su]]、userdel -r user1（完全删除用户）、groups user1（查看组）、groupadd ftp（创建组） |
    | 配置 | env（查看所有环境变量） | [[envsubst]]、getent（查看系统数据库数据；如 group docker 查看docker用户组） |
    | 日志 | [[dmesg]]、[[journalctl]] | [[rsyslog]]、rasdaemon（硬件错误日志） |
    | 内核与模块 | uname -a（查看版本）、[[lsmod]] | modprobe vboxdrv、dkms（status） |
    | 包管理 | [[apt]]、[[dpkg]] | [[snap]]、[[rpm]]、[[pacman]]、[[yum]]、[[downgrade]]、[[pkgfile]] |
- 观测与调试
    |  |  |  |
    | --- | --- | --- |
    | 设备查看 | [[lspci]]、[[lsusb]]、[[lshw]] |  |
    | BIOS/DMI | [[biosdecode]]、[[dmidecode]] |  |
    | 系统与性能 | [[uptime]]、[[top]]、[[htop]]、[[vmstat]]、[[sar]] | [[perf]]、tload（字符画负载图）、[[atop]]、btop、[[nmon]]、glances、netdata、dool（定时收集系统信息）、lxtask（GUI监控CPU/内存）、[[sysdig]] |
    | CPU监控 | powertop（找到高功率进程）、[[mpstat]] |  |
    | 内存监控 | [[free]]、[[slabtop]] |  |
    | 进程 | [[pidstat]]、[[ps]]、[[pstree]]、[[kill]] | pwdx [pid]（查看进程工作目录）、[[pmap]]、pkill Xorg、killall Xorg、xkill |
    | 加压 | stress（--io 1000；-c/--cpu 4；--timeout 600） |  |
    | 编译 | [[make]]、cmake、makepkg（创建软件包） | :() { :\|:& };:（fork bombmake） |
    | 调试/追踪 | [[strace]]、bpftrace、gdb、SystemTap、[[bcc]]、[[eBPF]] | [[itrace]]、[[dtrace]] |
- 网络
    |  |  |  |
    | --- | --- | --- |
    | 基础 | hostname、[[ip命令]]、[[nmcli]]、nmtui、arp -n（-s 设置ip/mac表）、[[route]] | wpa_supplicant、iwlist、iwconfig、wifi-menu、pppoe、[[ifconfig]]、netctl、[[hostapd]] |
    | 访问/传输 | [[curl]]、[[wget]]、[[ssh]]、[[scp]] | [[sshpass]]、[[sshfs]]、w3m（命令行浏览器）、[[vnc]]、[[socat]] |
    | SELinux | getenforce、sestatus -v、setenforce 0/1 |  |
    | 防火墙 | ufw（ubuntu 简化防火墙）、[[iptables]]、[[firewall]] |  |
    | 隧道/穿透 | [[Ngrok]] | [[ptunnel]] |
- 图形与多媒体
    |  |  |  |
    | --- | --- | --- |
    | 桌面环境 | kde、xfce、[[gnome]] | i3（.xinitrc: exec i3）、[[awesome]] |
    | 终端效果 | cmatrix（终端黑客帝国）、screenfetch |  |
    | 截图与显示 | import（截图：选区；pause 3 -frame a.png 延迟截窗口）、xgamma -gamma .75（调整屏幕色值）、[[display命令]] |  |
    | 联网 | nm-applet |  |
    | 输入法 | fcitx、[[ibus]] |  |
    | 模拟 | wine、winetricks、cabextract |  |
    | 文件管理 | [[nautilus]] |  |
    | 显示器 | [[xrandr]] |  |
    | 声卡 | [[amixer]]、[[alsamixer]]、[[alsactl]]、aplay -l、[[pactl]] | [[ALSA]] |
    | 媒体处理 | [[convert]]、[[ffmpeg]] |  |