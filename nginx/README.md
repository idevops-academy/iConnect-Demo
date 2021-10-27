### nginx configuration
We will use nginx proxy to take requests on port 80 and forward the requests to the application running on port 3000.
This way the app can process requests on http port 80.

Install nginx, copy the Sysmon.conf file located in this folder to /etc/nginx/conf.d and restart nginx
