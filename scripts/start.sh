#!/bin/bash
cd /home/ubuntu/slow-postbox/server
authbind --deep pm2 start index.js