# Git 学习笔记 #
**1.创建版本库**
初始化一个Git仓库，使用git init命令<br>
添加文件到Git仓库，分两步：<br>
①.使用命令`git add <file>`,注意，可反复多次使用，添加多个文件；<br>
②.使用命令`git commit -m <message>`,完成

**2.时光穿梭机**<br>
`git status` 命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，reademe.txt被修改过了，但还没有准备提交的修改。<br>
`git diff <file>` 命令查看具体修改了什么内容,diff=>difference,显示的格式正是Unix通用的diff格式。<br>
要随时掌握工作区的转态，使用`git status`命令；如果git status告诉文件被修改过，用git diff可以查看修改的内容。

**2.1 版本回退**<br>
在Git中，用`git log`命令查看历史记录，显示从最近到最远的提交日志。如果嫌输出的信息太多，可以加上--pretty=oneline参数，显示结果如下：<br>

    git log --pretty=oneline
    98e4bbe4640ee5e60d8a893023ac79ce0a5dee60 (HEAD -> master) append GPL
    5469f3954d66a354d38875e72159515f43408cf8 add distributed
    04c88c6d73bca7386ca53e2a96ad8ad9843e9992 wirte a read me file
    98e4bbe4640ee5e60d8a893023ac79ce0a5dee60 => commit_id(版本号) 
**HEAD => 当前版本； HEAD^ => 上一个版本；HEAD^^ => 上上一个版本；HEAD~100 => 往上100个版本**<br>
退回到上一个版本：

    git reset --hard HEAD^
再回到当前版本号：

    git reset --hard 98e4(版本号没必要写全，前几位就够了，Git会自动去找)
`git reflog`记录了你的每一次命令，即使关机后，仍能找到之前的commit_id<br>
总结：HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令<br>

    git reset --hard commit_id
穿梭前，用git log可以查看提交历史，以确定要退回到哪个版本；<br>
要重返未来，用git reflog查看历史命令，以确定要回到未来的哪个版本。<br>

2.2 **工作区(Working Direactory)和暂存区(Stage)**<br>
工作区有一个隐藏目录.git，它是Git的版本库，Git版本库里存了很多东西，其中最重要的就是stage暂存区，还有Git为我们自动创建的第一个分支master,以及指向master的一个指针叫HEAD。<br>
git add : 将文件修改添加到暂存区；<br>git commit ：把暂存区的所有内容提交到当前分支。<br>
git add命令实际上就是把要提交的所有修改放到暂存区（Stage)，然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。

**2.3 管理修改**<br>
Git跟踪并管理的是**修改**，而非文件。每次修改，如果不用git add到暂存区，那就不会加入到commit中。

    git diff HEAD -- <file> 命令可以查看工作区和版本库里面最新版本的区别。

**2.4 撤销修改** <br>
`git checkout -- <file>` 就是把文件在工作区的修改全部撤销，有两种情况：<br>
①.文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；<br>
②.文件已经添加到暂存区，又作了修改，现在，撤销修改就回到添加到暂存区后的状态；<br>
总之，就是让文件回到最近一次git commit或git add时的状态。<br>
`git reset HEAD <file>` 可以把暂存区的修改撤销掉(unstage),重新放回工作区。<br>
总结：<br>
(1)场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令
 
    git checkout -- file
(2)场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，<br>第一步用命令`git reset HEAD <file>`，就回到了场景1，
<br>第二步按场景1操作；<br>
(3)场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，需要版本回退(git reset --hard commit_id)，不过前提是没有推送到远程库。

**2.4 删除文件**<br>
(1)确定要从版本库中删除文件，那就用命令`git rm`删掉，并且git commit<br>
(2)另一种情况是删错了，因为版本库里还有呢，用`git checkout -- <file>`命令把误删的文件恢复到最新版本<br>
注意：**从来没有被添加到版本库就被删除的文件，是无法恢复的**！<br>
命令git rm用于删除一个文件，如果一个文件已经被提交到版本库，那么你永远不要担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。<br>

**3. 远程仓库**<br>
**第1步：创建SSH Key**。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_ras和id_rsa_pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell(Windows下打开Git Bash)，创建SSH Key:<br>


    ssh-keygen -t rsa -C "youremail@example.com"
第2步：登录Github，打开"settings","SSH and GPG keys"页面，然后，点击"New SSH key"，填上任意Title，在Key文本里粘贴id_rsa.pub文件的内容(用notepad或EditPlus打开)，点"Add SSH Key",就能看到已添加的Key。<br>

**3.1 添加远程库**<br>


    git remote add origin git@github.com:jerrychane/learngit.git (关联一个远程库命令)
当你第一次使用Git的clone或push命令连接Github时，会得到一个警告，这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的key时，需要你确认GitHub的key的指纹信息是否真的来自GitHub的服务器，输入**yes**即可。<br>

    git pull --rebase origin master(合并Github中README.md文件到本地代码目录中)

    git push -u origin master(第一次把本地所有内容推送到远程库上)

    git push orgin master(将本地master最新修改推送至GitHub)

**3.2 从远程库克隆**<br>

    git clone git@github.com:jerrychane/front-end-development-study.git
要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆；Git支持多种协议，包括https,但通过ssh支持的原生git协议速度最快。

**4. 分支管理**<br>
创建一个属于你自己的分支，别人看不到，还继续在原来的分支上干活，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样既安全又不影响别人工作。<br>Git的分支是与众不同的，无论创建、切换和删除分支，Git都能在1s内完成。无论你的版本库是1个文件还是1万个文件。

**4.1 创建与合并分支**<br>
创建dev分支，然后切换到dev分支： 
    
    git checkout -b dev
git checkout 命令加上-b参数表示创建并切换，相当于`git branch dev`(创建)和`git checkout dev`(切换)<br>
`git branch` 命令查看当前分支。<br>
`git merge` 命令用于合并指定分支到当前分支。<br>
`git branch -d dev` 删除dev分支<br>
因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个人物，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。

**4.2 解决冲突**<br>
Git用<<<<<<<,=======,>>>>>>>标记处不同分支的内容<br>
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。<br>
解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。<br>


    git log --graph --pretty=oneline --abbrev-commit命令可以看到分支合并图

**4.3 分支管理策略**<br>
在实际开发中，我们应该按照几个基本原则进行分支管理：<br>
1.master分支应该是非常稳定的，仅用来发布新版本，平时不能在上面干活；<br>
2.在dev分支上干活，也就是说，dev分支是不稳定的，到某个时候，比如新版本发布时，再把dev分支合并到master上，在master上发布新版本<br>
3.每个人在dev分支上干活，每个人都有自己的分支，时不时往dev分支上合并就好。<br>
合并分支时，加上--no-ff参数就可以使用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast-forward合并就看不出来曾经做过合并。<br>

    git merge --no-ff -m "msg" dev

**4.4 Bug分支**<br>
Git提供了一个stash(汉语"隐藏"的意思)功能，可以把当前工作现场"隐藏"起来，等以后恢复现场后继续工作
Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：<br>
(1)`git stash apply`恢复，但是恢复后，stash内容并不删除，需要用git stash drop删除；<br>
(2)`git stash pop`,恢复的同时把stash内容也删了。<br>
用`git stash list`可以查看stash内容，修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。<br>

**4.5 Feature分支**<br>
开发一个新feature,最好新建一个分支，一切顺利的话，feature分支和bug分支是类似的，合并，然后删除；
但如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除

**4.6 多人协作**<br>
当从远程仓库克隆时，实际上Git自动把本地master分支和远程master分支对应起来，并且远程仓库的默认名称是**origin**。<br>
要查看远程仓库的信息，用`git remote`命令或者用`git remote -v`显示更详细的信息。<br>
**(1)推送分支**：就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样git就会把该分支推送到远程库对应的远程分支上。<br>
`git push orgin master` 如果要推送其他分支，比如dev，就改成：`git push orgin dev`<br>
但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？<br>
master是主分支，因此要时刻与远程同步；<br>
dev分支是开发分支，团队所有成员都需要在上面工作，所有也需要与远程同步；<br>
bug分支只限于在本地修复bug，就没必要推送到远程了，除非老板要看看你每周到底修复了几个bug;<br>
feature分支是否推送到远程，取决于你是否和你的小伙伴合作在上面开发。<br>
**(2)抓取分支**<br>
多人协作时，大家都会往master和dev分支上推送各自的修改。当彼此推送的提交有冲突时，可以先用`git pull`把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送。<br>
当git pull失败时，原因是没有指定本地dev分支和远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接,再git pull：

    git branch --set-upstream-to=origin/dev dev
多人协作的工作模式通常是这样的：<br>
(1)首先，可以试图用`git push origin <branch-name>`推送自己的修改；<br>
(2)如果推送失败，则因远程分支比你的本地更新，需要先用git pull试图合并；<br>
(3)如果合并冲突，则解决冲突，并在本地提交；<br>
(4)没有冲突或者解决冲突后，再用git push origin <branch-name>推送就能成功。<br>
如果git pull提示no tracking information,则说明本地分支和远程分支链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`<br>

**4.7 Rebase**<br>
Git有一种称为rebase的操作，能够将Git的提交历史变成一条干净的直线。rebase操作可以把本地未push的分叉提交历史整理成直线；rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

**5 标签管理**<br>
Git的标签是版本库的快照，指向某个commit指针(与分支的区别是不可移动)，创建和删除都是瞬间完成的，它和某个commit绑在一起。<br>
**5.1 创建标签**<br>
标签不是按时间顺序列出，而是按**字母**排序的。标签总是个某个commit挂钩，如果这个commit既出现在master分支上，有出现在dev分支上，那么这两个分支都可以看到这个标签。<br>
命令 `git tag <tagname>`  用于创建一个标签，默认为HEAD，也可以指向一个commit id;<br>
命令 `git tag -a <tagname> -m "msg..."`   可以指定标签信息;<br>
命令 `git tag`   可以查看所有标签<br>
命令 `git show <tagname>`  可以看到标签说明文字<br>

<<<<<<< HEAD
**5.2 操作标签**<br>
=======

**10.2 操作标签**<br>
>>>>>>> d5bb06f1ae9f4616cdf73622cd43b0b21c2d09b2
删除标签：`git tag -d <tagname>`<br>
推送某个标签到远程：`git push origin <tagname>`<br>
推送所有标签到远程：`git push origin --tags`<br>
删除远程标签的命令：先从本地删除 `git tag -d <tagname>` 然后从远程删除 `git push origin :refs/tags/<tagname>` 例如 `git push origin:refs/tags/v0.9`

**5.3 使用Github**<br> 
如何参与Github上的开源项目呢？例如bootstrap，可以访问其github项目主页，点"Fork"就在自己的账号下克隆了一个bootstrap仓库，然后从自己的账号下clone:`git clone git@github:jerrychane/bootstrap.git`<br>
拥有Fork后的仓库的读写权限；可以推送pull request给官方仓库来贡献代码。

**5.4 使用码云**<br>
如果希望体验Git飞一般的速度，可以使用国内的Git托管服务 —— **码云([gitee.com](https://gitee.com/))** , 基本命令与Git一样，只是远程库的名字叫gitee不叫origin。

**6. 自定义Git**<br>
在安装Git一节中，已经配置了user.name和user.email，实际上Git还有很多可配置项，例如，让Git显示颜色，会让命令输出看起来更醒目：`git config --global color.ui true`

**6.1 忽略特殊文件**<br>
在Git工作区目录下创建一个特殊的.gitignore文件，然后把要忽略的文件填进去，Git就会自动忽略这些文件，不需要从头写.gitignore文件，Github已经为我们准备了各种配置文件，只需要组合一下就可以使用了。<br>
忽略文件的原则是：<br>
1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，就是一个文件是通过另一个文件自动生成的，那自动生成的文件就没有必要放进版本库里，比如Java编译产生的.class文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件；<br>
强制添加被.gitignore忽略的文件 `git add -f filename` <br>
检查.gitignore文件的错误 `git check-ignore -v filename`

<<<<<<< HEAD
**6.2 配置别名** <br>
=======

**11.2 配置别名** <br>
>>>>>>> d5bb06f1ae9f4616cdf73622cd43b0b21c2d09b2

设置别名的方法：<br>
 `git config --global alias.co checkout` <br>
 `git config --global alias.br branch`<br>
 `git config --global alias.ci commit`<br>
配置后的命令：<br>
 `git co` / `git br` / `git ci -m msg`<br>
 `git last` 显示最近一次的提交<br>
配置文件<br>
配置Git的时候，加上--global是针对当前用户起作用的，如果不加，只针对当前仓库自作用。配置文件放在.git/config文件中。别名就在[alias]后面，要删除别名，直接对应的行删掉即可。

**6.3 搭建Git服务器**
搭建Git服务器需要准备一台运行Linux的机器，推荐Ubuntu或Debian,这样，通过几条简单的apt命令就可以完成安装。假设你已经有sudo权限的用户账号，下面正式开始安装<br>
第一步,安装git:`apt-get isntall git` <br>
第二步，创建一个git用户，用来运行git服务： `adduser git`<br>
第三步，创建证书登录，将公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个<br>
第四步，初始化Git仓库，先选定一个目录作为Git仓库，假定是/srv/simple.git，在/srv目录下输入命令：`git init --bare simple.git` ，把owner改为git,防止用户直接登录服务器上去改工作区: `chown -R git:git simple.git`<br>
第五步，禁用shell登录,出于安全考虑，第二步创建git用户不允许登录shell，可以通过编辑/etc/passwd文件完成。将`git:x:1001:1001:,,,:/home/git:/bin/bash` 改为`git:x:1001:1001:,,,:/home/git:/bin/git-shell`<br>
第六步，克隆远程仓库：git clone
<<<<<<< HEAD

### 后记补充 ###
**1.删除远程Github库上的文件夹或文件命令**<br>
a.将远程仓库项目拉下来：`git pull origin master` <br>
b.删除指定文件或文件夹：`git rm -r --cached filename`（可以用dir命令查看有哪些文件，注意--cached是保留git仓库的文件，如果没有这个命令，git仓库的文件也会被删除）<br>
c.提交本次修改的备注：`git commit -m "提交的备注"`<br>
d.将更新同步到远程仓库：`git push -u origin master`









=======
>>>>>>> d5bb06f1ae9f4616cdf73622cd43b0b21c2d09b2
