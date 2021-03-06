#!/bin/bash
cd /home/ubuntu/slow-postbox/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export ACCOUNT_USER=$(aws ssm get-parameters --region ap-northeast-2 --names ACCOUNT_USER --query Parameters[0].Value | sed 's/"//g')
export ACCOUNT_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names ACCOUNT_PASS --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js