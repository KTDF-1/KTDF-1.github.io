---
title: win11电脑配置C C++的编译环境
author: K头的扉
index_img: /img/C++.png
date: 2025-08-06 01:38:49
tags:
	-windows
	-C/C++
	-配置编译环境
---

# win11电脑配置C/C++的编译环境

<!-- more --> 

参考链接：

[VS Code 配置 C/C++ 编程运行环境（保姆级教程）_vscode配置c++环境-CSDN博客](https://blog.csdn.net/qq_42417071/article/details/137438374)

PS：上述链接里有更详细更全面的关于VS code中配置C/C++编译环境的教程

# 1.  下载MinGW-W64

可以选择去官网下载

[Source Code - mingw-w64](https://www.mingw-w64.org/source/)

（PS：当然，官网下载可能比较慢，而且我没试过，所以不清楚流程是否一样）

百度网盘下载

Github下载

# 2.安装MinGW-W64

双击打开 msys2-x86_64-20250221.exe 文件

![安装步骤截图](/img/win11电脑配置C-C-的编译环境/image.png)

之后全部选择默认安装即可

![image.png](/img/win11电脑配置C-C-的编译环境/image1.png)

这里安装路径如果要更改的话，请一定要记住安装路径，之后要用到的

![image.png](/img/win11电脑配置C-C-的编译环境/image2.png)

选择“下一步”

![image.png](/img/win11电脑配置C-C-的编译环境/image3.png)

等待安装完成即可（PS：进度条可能会长时间停留在50%，这是正常现象，继续等待即可）

![image.png](/img/win11电脑配置C-C-的编译环境/image4.png)

选择“下一步”

![image.png](/img/win11电脑配置C-C-的编译环境/image5.png)

如果没有自动勾选”立即运行MSYS2“，自己勾选上，然后点击”完成“

![image.png](/img/win11电脑配置C-C-的编译环境/image6.png)

点击完成之后，等待一下，就会出现这个命令框

![image.png](/img/win11电脑配置C-C-的编译环境/image7.png)

然后在命令框中输入

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

PS：     S是大写         devel是英文，l可能会应为字体原因被认为是数字1

这里直接点击回车键即可

![image.png](/img/win11电脑配置C-C-的编译环境/image8.png)

输入”Y”，点击回车

![image.png](/img/win11电脑配置C-C-的编译环境/image9.png)

静静等待即可

![image.png](/img/win11电脑配置C-C-的编译环境/image10.png)

安装完成之后，关闭窗口

![image.png](/img/win11电脑配置C-C-的编译环境/image11.png)

打开安装MSYS2的目录,之后  `ucrt64  —>  bin` ，进入到bin文件夹中之后，复制路径

如果，一开始是选择的默认安装路径，那路径就是`C:\msys64\ucrt64\bin`。

![image.png](/img/win11电脑配置C-C-的编译环境/image12.png)

# 3. 配置环境变量

之后在“开始”菜单中搜素“编辑系统环境变量”，然后打开

![image.png](/img/win11电脑配置C-C-的编译环境/image13.png)

在“系统属性”界面点击“环境变量”

![image.png](/img/win11电脑配置C-C-的编译环境/image14.png)

在“环境变量”界面双击“Path”

![image.png](/img/win11电脑配置C-C-的编译环境/image15.png)

在”编辑环境变量“界面选择”新建“，之后会在中间空白部分有一个可填写的区域，在区域中粘贴上刚刚复制的路径，之后点击”确定“

![image.png](/img/win11电脑配置C-C-的编译环境/image16.png)

之后一路点击”确定“返回即可

![image.png](/img/win11电脑配置C-C-的编译环境/image17.png)

# 验证是否配置成功

`win+R` 输入`cmd` 点击回车打开命令提示符

![image.png](/img/win11电脑配置C-C-的编译环境/image18.png)

之后依次输入以下内容并回车

```bash
gcc --version

g++ --version

gdb --version
```

如果出现以下内容就是配置成功了

![image.png](/img/win11电脑配置C-C-的编译环境/image19.png)

来，给自己“呱唧呱唧”。