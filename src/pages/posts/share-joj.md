---
title: JOJ-简易评测系统
date: 2024-02-04
tags:
  - 分享
description: "介绍 JOJ 简易评测系统的设计思路、特点和对比体验。"
---
# **请注意！该项目已停止维护**

JOJ=Jun-Online-Judge

JOJ 的好处：简易、安全、高效

这样说可能不能体现出 JOJ 的好处，

打分表格（满分 10 分）：

（JOJ 与其他 OJ 比较，个人观点，不喜勿喷）

|   | **JOJ** | Hydro | UOJ |
| --- | --- | --- | --- |
| 沙盒系统 | 6 | 8 | 7 |
| 搭建简易 | 9 | 8.5 | 8 |
| 占用空间小 | 9 | 7 | 5 |

目前已实现及会实现的功能：

- [x] 用户系统
- [x] 比赛系统（IOI 赛制）
- [x] 一键备份还原
- [x] 排行榜系统
- [x] 个人资料页面
- [x] 一键安装

一键安装：

```bash
curl https://raw.githubusercontent.com/Jun-Software/Jun-Online-Judge/master/install.sh | sudo bash
```

下载地址及部署教程：

[https://github.com/Jun-Software/Jun-Online-Judge](https://github.com/Jun-Software/Jun-Online-Judge)
