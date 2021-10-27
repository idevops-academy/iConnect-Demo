#!/bin/bash
sudo yum update -y

#Install nginx on Amazon Linux
sudo amazon-linux-extras install nginx1 -y
sudo systemctl enable nginx
sudo systemctl start nginx

#Install git
sudo yum install git -y

#Install nodejs
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo yum install nodejs -y

#Install process manager to run the app
sudo npm install pm2 -g

#create directory for cloning the app
sudo mkdir -p /var/myapp
cd /var/myapp

#clone the application from github
sudo git clone https://github.com/idevops-academy/iConnect-Demo.git
cd iConnect-Demo/

#install application dependencies and start the app
sudo npm install
pm2 start --name iconnect npm -- start

#copy the nginx configuration to forward the requests to the app
sudo cp nginx/sysmon.conf /etc/nginx/conf.d/

#restart nginx
sudo systemctl restart nginx

