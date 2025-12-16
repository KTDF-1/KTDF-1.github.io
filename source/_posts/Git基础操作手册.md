---
title: Git操作教程
author: K头的扉
date: 2025-08-05 12:10:25
tags:
	-教程
	-Git
---

# Git 基础操作手册#

<!-- more --> 

PS:（目前仅有在本地使用Git的教程，2025.08.05）

### **一、初始化仓库**

在项目目录中使用命令 `git init` 初始化 Git 仓库，会创建名为 .git 的隐藏目录，存放仓库必要文件。

### **二、检查文件状态**

使用 `git status` 命令，可查看当前目录中未跟踪、已修改和已暂存的文件状态。

### **三、跟踪新文件**

- 跟踪单个文件：如跟踪 index.html，执行 `git add index.html`。
- 批量跟踪：用通配符 *，执行 `git add *.*` 。

跟踪后再运行 `git status` 可查看文件处于暂存状态。

### **四、提交更新**

使用 `git commit -m "提交信息"` 命令，将暂存区文件提交到 Git 仓库，-m 后为描述本次提交内容的信息。

### **五、修改已提交文件**

修改文件后，先 `git add <文件名>` 暂存修改，再 `git commit -m "修改说明"` 提交。

### **六、跳过暂存区**

对于已跟踪文件，使用 `git commit -a -m "提交信息"` 可直接提交，跳过暂存步骤。

### **七、移除文件**

- 从 Git 仓库和工作区同时移除：`git rm -f <文件名>` ，如 git rm -f index.js 。
- 仅从 Git 仓库移除，保留工作区：`git rm --cached <文件名>` ，如 git rm --cached index.css 。

### **八、忽略文件**

创建 .gitignore 文件，按匹配模式列出要忽略的文件或目录，如：

- .log ：忽略所有 .log 文件
- `node_modules/` ：忽略 node_modules 目录

### **九、回退到指定版本**

- 用 `git log --pretty=oneline` 查看提交历史。
- 用 `git reset --hard <commitID>` 回退到指定版本 。