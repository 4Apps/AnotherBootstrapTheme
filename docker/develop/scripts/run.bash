#!/bin/bash

source /root/docker/common/scripts/console.bash

echo_info "Update browserslist database"
npx browserslist@latest --update-db

echo_info "Link dependecies from cache"
ln -sfn /srv/sites/cache/node_modules ./node_modules

echo_info "Copy fonts"
npm run fonts:copy

echo_info "Start supervisord process"
/usr/bin/supervisord -c /etc/supervisor/supervisord.conf -n
