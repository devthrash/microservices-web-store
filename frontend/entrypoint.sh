#!/bin/sh

# replace env variable
for file in /usr/share/nginx/html/assets/*.js
do
  sed -i 's|VITE_API_BACKEND_HOST_PLACEHOLDER|'$API_BACKEND_HOST'|g' $file
done

# start nginx
nginx -g 'daemon off;'
