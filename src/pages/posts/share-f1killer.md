---
title: F1Killer-强制关闭窗口
date: 2025-11-01
tags:
  - 分享
description: "介绍一个用 F1 键强制关闭并重新打开窗口的小工具。"
---

[https://github.com/lemonorangeapple/F1Killer](https://github.com/lemonorangeapple/F1Killer)

如题

使用教程：

1. 按下 F1 截获前台窗口，并强制关闭
2. 再次按下 F1 重新弹出窗口

原理：

3. 用 GetForegroundWindow 截获前台窗口
4. 强制用 ShowWindow 隐藏
5. 用 win32api 挂起窗口对应进程
6. 弹出窗口仅需反向操作
