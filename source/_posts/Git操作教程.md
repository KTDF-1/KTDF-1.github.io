---
title: Git 操作教程
author: K头的扉
index_img: /img/git.jpg
date: 2025-08-05 12:10:25
tags:
	-教程
	-Git
categories: 技术教程        # 分类
toc: true                   # 开启目录
comments: true              # 开启评论
math: true                  # 开启数学公式
---

# Git 操作教程

PS:（目前仅有在本地使用Git的教程，2025.08.05）

<!-- more --> 

## Git是什么

Git是分布式版本控制工具，可以把文件保存成不同版本快照（类似游戏存档），记录每一次改动；同时可以对接GitHub/Gitee等远程代码托管平台，完成代码推送、拉取、多设备同步。 

> 四大核心区域理解
> 1. **工作区**：电脑上肉眼看到的文件夹、文件
> 2. **暂存区**：临时存放准备提交的改动
> 3. **本地仓库(.git)**：本地永久保存所有版本快照
> 4. **远程仓库**：GitHub云端仓库

下载连接：[Git官网](https://git‑scm.com/downloads) 

## 查看与配置Git信息

### 1. 查看Git配置

```bash
# 查看所有配置信息（全局 + 系统）
git config --list

# 只查看全局配置
git config --global --list

# 只查看当前仓库的配置
git config --local --list
```

### 2. 查看用户信息

~~~bash
# 查看用户名
git config user.name

# 查看用户邮箱
git config user.email
~~~

这里的用户信息并不是作为账号登陆了Git，而是作为一种身份标签，标记了每一条提交记录上的作者身份 

### 3. 查看Git版本与路径

~~~bash
# 查看 Git 版本
git --version

# 查看 Git 安装路径
git --exec-path

# 查看配置文件位置
git config --list --show-origin
~~~

### 4. 配置用户信息

~~~bash
# 设置全局用户名（所有仓库生效）
git config --global user.name "你的用户名"

# 设置全局邮箱
git config --global user.email "你的邮箱@example.com"

# 只针对当前仓库设置（优先级更高）
git config user.name "当前仓库专用用户名"
git config user.email "当前仓库专用邮箱@example.com"
~~~

`--global` 是全局配置，**对本机所有已经存在、未来新建的仓库全部生效**；只有当某个仓库用`--local`单独设置了 user.name/user.email，才会覆盖全局配置， 本地仓库配置优先级高于全局配置。 

## 查看仓库连接与状态

Git中常用来与GitHub仓库建立连接，来推送/拉取一些文件，所以清楚的知道自本地Git仓库与哪些远程仓库建立了连接以及远程仓库的相关信息是很重要的。

### 1. 查看远程仓库连接

~~~bash
# 查看当前仓库连接了哪些远程仓库（显示地址）
git remote -v

# 查看远程仓库详细信息
git remote show origin

# 查看所有远程仓库名称
git remote
~~~

### 2. 查看当前仓库状态

~~~bash
# 查看当前工作区状态（哪些文件修改了、暂存了）
git status

# 简洁模式查看状态
git status -s

# 查看当前仓库所在分支
git branch
~~~

### 3. 查看分支情况

~~~bash
# 查看本地所有分支（* 表示当前分支）
git branch

# 查看远程所有分支
git branch -r

# 查看本地 + 远程所有分支
git branch -a
~~~

## 仓库初始化与基本工作流

接下来就是正式创建一个本地仓库了

### 1.初始化/克隆仓库

~~~bash
# 在当前目录初始化一个新的 Git 仓库
git init

# 克隆远程仓库到本地
git clone <仓库地址>
# 例如：git clone https://github.com/username/repo.git

# 克隆到指定目录
git clone <仓库地址> 指定目录名
~~~

创建本地仓库也就是初始换仓库，打开Git bash，跳转到你想要初始化仓库的文件夹（或者在你想要初始化文件夹里打开Git bash），输出命令 `git init`，即可将这个文件夹初始化为一个本地仓库，win11系统点击 ‘查看’ -> ‘显示’ -> ‘显示隐藏文件’ ，便可以看到一个.git文件夹。克隆远程仓库到本地同样也可得到一个git仓库，克隆下来的仓库本身就带有.git文件夹。

> `.git`是隐藏文件夹，存放版本库全部数据，**禁止手动修改、删除内部文件，会损坏仓库**。 

### 2. 添加文件到暂存区

Git 流程：修改工作区文件 → git add 加入暂存区 → git commit 提交到本地仓库 

~~~bash
# 添加指定文件到暂存区
git add 文件名.txt

# 添加当前目录及子目录下所有修改的文件
git add .

# 添加所有修改（整个仓库的变更，包括删除的文件）
git add -A

# 交互式选择要添加的文件
git add -p
~~~

这里的交互式选择是什么意思

###3.提交更改 

~~~bash
# 提交暂存区的更改，带提交信息
git commit -m "提交说明"

# 添加并提交（对【已经被Git跟踪】的文件，跳过add直接提交，但只对已经被跟踪的文件文件生效）
git commit -am "提交说明"

# 修改最近一次提交的信息
git commit --amend -m "新的提交信息"
~~~

### 4.推送到远程仓库

~~~bash
# 推送当前分支到远程仓库
git push

# 首次推送并设置上游分支
git push -u origin 分支名

# 强制推送（危险！会覆盖远程历史）
git push -f
~~~

`-u origin 分支名`：设置上游跟踪关系，后续直接 git push 即可，不用重复写分支名。 

`‑f`强制推送是高危操作，会覆盖远程历史，公共仓库谨慎使用。 

### 5.拉取远程更新

~~~bash
# 拉取远程更新并合并到当前分支
git pull

# 拉取指定远程指定分支
git pull origin 分支名

# 只拉取不合并（先看看有什么更新）
git fetch origin
~~~

`git pull` = `git fetch` + `git merge` 

fetch 只下载远程更新到本地镜像，**不会改动你的工作区**，安全；pull 会自动合并到本地。 

## 分支管理

### 1. 创建与切换分支

```bash
# 创建新分支(不切换)
git branch 新分支名

# 切换到指定分支
git checkout 分支名

# 创建并切换到新分支（一步到位）
git checkout -b 新分支名

# （新版 Git）切换分支的新写法
git switch 分支名

# （新版 Git）创建并切换
git switch -c 新分支名
```

新版 Git 提供`switch`，专门用于切换 / 创建分支，区分撤销文件和分支切换，比旧`checkout`语义清晰。 

### 2. 合并分支

```bash
# 先切换到目标分支（要接受合并的分支，比如主分支）
git checkout main

# 把指定分支合并到当前分支
git merge 要合并的分支名
```

合并时如果修改同一处代码，会产生**冲突**：Git 无法自动判断保留哪一份，需要手动打开冲突文件修改，删除`<<<<<<<`标记，保存后再 add、commit。 

### 3. 删除分支

```bash
# 删除本地分支（已合并的才能删）
git branch -d 分支名

# 强制删除本地分支（未合并的也删）
git branch -D 分支名

# 删除远程分支
git push origin --delete 分支名
```

### 4.重命名分支

```bash
# 重命名当前分支
git branch -m 新分支名

# 重命名指定分支
git branch -m 旧分支名 新分支名
```

## 远程仓库操作

### 1. 管理远程连接

```bash
# 添加远程仓库
git remote add origin <仓库地址>

# 修改已有远程仓库地址
git remote set-url origin <新地址>

# 移除远程关联
git remote remove origin
```

### 2. 查看远程信息

```bash
# 查看远程仓库详细信息（分支、跟踪关系等）
git remote show origin

# 查看远程分支列表
git ls-remote origin
```

##撤销与回退操作

只修改本地、没有推送到远程的提交可以 reset；已经推送到公共远程的提交优先使用`revert`。 

### 1. 撤销工作区修改

只会还原**工作区**，已经`git add`进入暂存区的改动不受影响。 

```bash
# 撤销单个文件未暂存的改动，恢复到最近提交状态
git restore 文件名.txt
# 全部文件撤销
git restore .

# 旧写法
git checkout -- 文件名.txt
git checkout .
```

### 2. 撤销暂存（把文件移出暂存区，改动保留在工作区 ）

```bash
# 把指定文件移出暂存区
git reset HEAD 文件名.txt

# 把所有文件移出暂存区
git reset HEAD
```

### 3. 回退提交

```bash
# 软回退：撤销上次提交，修改保留在暂存区
git reset --soft HEAD~1

# 混合回退（默认）：撤销上次提交，修改保留在工作区
git reset --mixed HEAD~1

# 硬回退：撤销上次提交，修改全部丢弃（危险！）
git reset --hard HEAD~1

# 回退到指定版本（用 commit id）
git reset --hard <commit-id>
```

### 4. 用新提交来回退旧提交（安全方式）

revert**不会删除历史记录**，新增一条反向提交抵消旧提交效果，适合已经推送到远程公共分支。 

```bash
# 生成一个反向提交来撤销指定提交
git revert <commit-id>
```

### .gitignore 文件使用

1. 在仓库根目录新建`.gitignore`，填写需要忽略的文件、目录；
2. 只对**未跟踪的新文件**生效；如果文件已经被 Git 跟踪，修改`.gitignore`不会自动忽略，需要执行：

```bash
git rm --cached 要忽略的文件
```

常用规则示例

```bash
# 忽略全部.log后缀文件
*.log
# 忽略node_modules整个文件夹
node_modules/
# ! 代表不忽略（例外）
!keep_me.log
# /开头只匹配根目录下文件
/temp.txt
```

## 日志与历史查看

### 1. 查看提交历史

```bash
# 查看完整提交历史
git log

# 简洁模式（每个提交一行）
git log --oneline

# 查看最近 N 条提交
git log -n 5

# 图形化显示分支结构
git log --oneline --graph --all

# 查看某个文件的修改历史
git log 文件名.txt
```

### 2. 查看差异

```bash
# 查看工作区与暂存区的差异
git diff

# 查看暂存区与上次提交的差异
git diff --cached

# 查看两个分支的差异
git diff 分支1 分支2
```

### 3. 查看具体某次提交

```bash
# 查看指定提交的详细内容
git show <commit-id>

# 查看某文件在指定版本的内容
git show <commit-id>:文件名.txt
```

## 其他实用命令

### 1. 暂存工作区

```bash
# 把当前工作区的修改暂存起来（临时保存）
git stash

# 查看暂存列表
git stash list

# 恢复最近一次暂存
git stash apply

# 恢复并删除暂存
git stash pop

# 删除暂存
git stash drop
```

### 2. 打标签

```bash
# 打轻量标签
git tag v1.0.0

# 打附注标签（带说明）
git tag -a v1.0.0 -m "版本1.0.0发布"

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags

# 查看所有标签
git tag
```

### 3. 比较与查看

```bash
# 查看当前分支与远程分支的差异
git diff origin/main

# 查看谁修改了哪一行
git blame 文件名.txt
```

### 4. 配置别名（简化命令）

```bash
# 设置别名（比如用 git st 代替 git status）
git config --global alias.st status

# 设置别名：git lg 代替查看日志
git config --global alias.lg "log --oneline --graph --all"

# 使用别名
git st
git lg
```

## 仓库使用实例

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