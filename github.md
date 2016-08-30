# 给github添加ssh，并在本地免输入用户名密码提交代码

## 生成ssh
 1. 打开终端（windows用户打开cmd），然后输入

    `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

    然后一顿输入，然后enter
 2. linux用户 在 `~/.ssh/id_rsa.pub` 中可以找到你的ssh key

    windows应该是在 `C:\Documents and Settings\Administrator\` 下

## 将ssh key保存到github
 1. 登陆github，右上角头像--> setting --> SSH and GPG keys 添加一个SSH key，取个名字，然后将上面生成的ssh key复制进去
 2. 点击 Add SSH key

## 本地免用户名密码提交 
  本地免密码提交需要使用SSH形式的 remote URL，一般情况下我们使用的都是HTTPS形式的URL，

  HTTPS形式：`https://github.com/USERNAME/OTHERREPOSITORY.git`

  SSH形式：`git@github.com:USERNAME/OTHERREPOSITORY.git`

  设置方式为：
  `git remote set-url origin git@github.com:USERNAME/OTHERREPOSITORY.git`

  检查一下：
  `git remote -v` 应该输出上SSH形式的URL
  参考：[Switching remote URLs from HTTPS to SSH](https://help.github.com/articles/changing-a-remote-s-url/#switching-remote-urls-from-https-to-ssh)

  如果出现这个问题：

  `Permanently added the RSA host key for IP address '192.30.252.128' to the list of known hosts`
  
  其实这只是个警告而已，并不影响你的操作。如果要去除的话，可以在hosts文件中添加一段：
  `192.30.252.128 github.com`

## 参考

可以阅读这个：[https://help.github.com/articles/generating-an-ssh-key/](https://help.github.com/articles/generating-an-ssh-key/)

# Git忽略规则及.gitignore规则不生效的解决办法
 项目开发中有时候会出现在开发过程中需要ignore掉的文件，这个时候，只在.gitignore中添加对应的文件是没有效果的，这是因为.gitignore只能忽略原来没有被track的文件，如果这个文件之前已经没写入了版本管理中，那么ingore是无效的，解决方法是把本地缓存删除，然后提交：
 >  git rm -r --cached .
 >  git add .
 >  git commit -m "update .gitignore"

