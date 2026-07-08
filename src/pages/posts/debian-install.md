---
title: "#260417 本人debian的安装及配置分享"
date: 2026-04-17
tags:
  - Debian
description: "记录 Debian 13 的安装、镜像、桌面和开发环境配置经验。"
---
本文将介绍关于`Debian 13 (Trixie)`安装和配置的分享，
侧重于配置分享

## 安装

下载镜像：<https://www.debian.org/>
建议安装`KDE Plsama`的桌面环境

安装应该不用我教吧？
实在不行<https://baidu.com>自己找小白教程

## 配置

### 镜像源
首先，<https://linuxmirrors.cn>更改镜像源，
建议改为阿里云，记得更新软件包

### 魔法
咳咳，这个嘛，自己搞定
这个是以后进行配置操作的前提
建议/路/由/为/绕/过/大/陆/

### 美观调整
这个主要是按自己的喜好和桌面环境决定，
使用`KDE Plsama`的主要原因就是可以一步搞定
可以前往
<https://www.opendesktop.org/browse?cat=365>
寻找全局主题
我使用的是：
全局主题：`Otto`
图标：`Kora`

### 我的开发环境配置
<https://code.visualstudio.com>
以及奇奇怪怪的插件

全栈狂喜之：`Docker`
主要用于分割开发环境，尤其是那种互不兼容的
可以试试我配置的初始环境`juneqwq/env-image`
路径映射：（容器外）`/home/<user>/<project>`：（容器内）`/home/share`

### 坑点

#### 驱动下载
对于一些冷门机器，安装时会提示驱动缺失
建议备好一个无线网卡（防止网卡无驱动）
驱动下载：
<https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree>
<https://github.com/armbian/firmware>

#### 仅供电设备加载超时
采用`usbguard`拦截仅供电设备的加载
1. 通过`dmesg`查找超时设备的usb端口
2. `apt install usbguard`
3. 设置usbguard模式
4. `sudo vim /etc/usbguard/usbguard-daemon.conf`
5. 查找对应行，设置`ImplicitPolicyTarget=allow`
6. 设置usbguard规则
7. `sudo vim /etc/usbguard/rules.conf`
8. 添加一行`block via-port "<问题设备的usb端口号>"`
9. `sudo systemctl enable --now usbguard`
10. 重启电脑即可解决

注意：步骤4，步骤7中的路径在不同设备环境下可能不正确。
