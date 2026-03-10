- 设置
    - ahci, secure boot, post behavious thorough
- 联网
    - iwctl
        - device list
        - station wlan0 scan
        - station wlan0 get-networks
        - station wlan0 connect a1
    - 隐藏网络
        - iwctl
            - station <device> connect-hidden <ssid>
        - iwctl --passphrase <passphrase> station <device> connect-hidden <ssid>`
- 源
    - vim /etc/pacman.d/mirrorlist
    - pacman -Syy
    - vim /etc/pacman.conf
        - ParallelDownloads = 50
- 更新时间
    - timedatectl set-ntp true
    - timedatectl status
- 分区
    - mount -t efivarfs efivarfs /sys/firmware/efi/efivars
        - 判断efi
    - lsblk
    - cfdisk /dev/nvme0n1
        - ```shell
          mkfs.vfat -F32 /dev/nvme0n1p1
              或直接使用windows的uefi分区
          mkswap /dev/nvme0n1p2
          swapon /dev/nvme0n1p2
          mkfs.ext4 /dev/nvme0n1p3
          ```
    - 或lvs
        - ```shell
          pvcreate /dev/nvme0n1p2
          vgcreate vg_os /dev/nvme0n1p2
          lvcreate -L 300G vg_os -n lv_root
          mkfs.ext4 /dev/mapper/vg_os-lv_root
          lvs
          ```
    - mount /dev/nvme0n1p3 /mnt
    - mkdir -p /mnt/boot/efi
    - mount /dev/nvme0n1p1 /mnt/boot/efi
- 配置
    - ```shell
      pacman -Sy archlinux-keyring
      pacstrap -i /mnt base linux linux-firmware base-devel  vim man-db man-pages openssh lvm2 dialog wpa_supplicant
      genfstab -U -p /mnt >> /mnt/etc/fstab
      arch-chroot /mnt /bin/bash
      vim /etc/locale.gen
        zh_CN.UTF-8 UTF-8
        en_US.UTF-8 UTF-8
      locale-gen
      echo LANG=en_US.UTF-8 > /etc/locale.conf
      ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
      hwclock --systohc --utc
      echo u1 > /etc/hostname
      ```
- 网络
    - ```shell
      pacman -S networkmanager network-manager-applet
      systemctl enable NetworkManager
      
      nmcli device wifi list
      nmcli device wifi connect ssid1 password pwd1
      ```
- 编译内核（lvm2用）
    - /etc/mkinitcpio.conf
        - HOOKS=(base systemd block sd-lvm2 filesystems)
    - mkinitcpio -p linux
- grub
    - pacman -S grub efibootmgr os-prober dosfstools
        - os-prober用于识别windows启动区
    - grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub1 --recheck
    - grub-mkconfig -o /boot/grub/grub.cfg
- 用户
    - passwd
    - groupadd outrun
    - useradd -m -g users -G outrun -s /bin/bash outrun
    - passwd outrun
    - vim /etc/sudoers
        - %wheel ALL=(ALL:ALL) ALL
- 退出
    - exit
    - umount -R /mnt
    - reboot
- F12
    - boot sequence 添加grub
- 桌面
    - ```shell
      pacman -S xorg-server xorg-apps xorg xorg-xinit
      pacman -S xf86-video-intel mesa
      pacman -S gnome
      echo exec gnome-session > .xinitrc
          - systemctl enable gdm
      /etc/modprobe.d/blacklist_nouveau.conf中写blacklist nouveau
      /etc/modprobe.d/modprobe.conf中写blacklist nouveau
      pacman -S ttf-dejavu wqy-microhei
      ```
    - ```shell
      pacman -S awesome xterm
      .xinitrc
        exec awesome
      touch ~/.Xauthority
      chmod 600 ~/.Xauthority
      ```
    - awesome-wm-widgets
    - ```shell
      .config/awesome/rc.lua
        awful.spawn.with_shell("nm-applet")
      ```
- 字体
    - ```shell
      sudo pacman -S noto-fonts noto-fonts-extra
      .config/awesome/rc.lua
        # beautiful.init下边
        beautiful.font = "Noto Sans 10"
      ```
- 触摸板
    - ```shell
      sudo pacman -S xf86-input-libinput
      /etc/X11/xorg.conf.d/40-libinput.conf
        Section "InputClass"
              Identifier "libinput touchpad catchall"
              MatchIsTouchpad "on"
              MatchDevicePath "/dev/input/event*"
              Driver "libinput"
              Option "Tapping" "on"
        EndSection
      ```
    - ```shell
      pacman -S xf86-input-synaptics
      /etc/X11/xorg.conf.d/70-synaptics.conf
        Section "InputClass"
              Identifier "touchpad catchall"
              Driver "synaptics"
              MatchIsTouchpad "on"
              Option "TapButton1" "1"
        EndSection
      ```
- yaourt
    - ```shell
      /etc/pacman.conf
          [archlinuxfr]
              SigLevel = Never
              Server = http://repo.archlinux.fr/$arch
      pacman -Sy base-devel yaourt
      ```
- AUR
    - git clone https://aur.archlinux.org/snapd.git
    - cd snapd
    - makepkg -si
    - sudo systemctl enable --now snapd.socket
- 
