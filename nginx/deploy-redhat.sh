#! /bin/bash

appdirectory="/home/ec2-user/myapp"
# yum update -y
# yum install epel-release -y
# if which nginx > /dev/null 2>&1; then echo "nginx installed"; else echo "installing nginx..."; fi
# if systemctl status nginx > /dev/null 2>&1; then echo "nginx installed"; else echo "installing nginx..."; fi
if which nginx > /dev/null 2>&1; then
     echo "nginx installed"
else
     echo "installing nginx..."
     yum install nginx -y
     systemctl start nginx
     systemctl enable nginx

     #Install git
     yum install git -y

     #Install nodejs
     curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
     yum install nodejs -y

     #Install process manager to run the app
     npm install pm2 -g
fi
# mkdir -p "$appdirectory" > /dev/null 2>&1
[ -d "$appdirectory"] || mkdir "$appdirectory"
if [ -d "$appdirectory" ]; then
    cd "$appdirectory"
    git clone https://github.com/idevops-academy/iConnect-Demo.git
    cd iConnect-Demo
    npm install
    cp nginx/sysmon.conf /etc/nginx/conf.d/
    pm2 delete iconnect > /dev/null 2>&1
    pm2 start --name iconnect npm -- start
    echo "restart nginx"
    systemctl restart nginx
    echo "App Installation Succeeded"
else
    echo "Error in installaing..Exiting"
    exit 2
fi
