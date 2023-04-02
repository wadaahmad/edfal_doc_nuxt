git reset --hard
git pull origin beta
cd /home/php_devs/docker
docker-compose build as-frontend;docker-compose up -d --force-recreate as-frontend

