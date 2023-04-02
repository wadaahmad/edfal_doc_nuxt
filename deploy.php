<?php

namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'my_project');

// Project repository
set('repository', 'ssh://git@dwcgitlab.dwebsite.com:65534/as/as-frontend.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server
set('writable_dirs', []);

// Hosts
host('live')
    ->hostname('edfalkvm')
    ->configFile('~/.ssh/config')
    ->identityFile('~/.ssh/id_rsa')
    ->set('deploy_path', '/var/www/web/edfaldoc_fe/')
    ->set('application_dir', '/var/www/web/edfaldoc_fe/')
    ->set('script_file', 'update-live.sh');

// Tasks

task('script:permit', function () {
    run('sudo /usr/local/sbin/permit.sh {{application_dir}}', ['tty'=>true]);
});

task('script:addexec', function () {
    run('chmod +x  {{deploy_path}}{{script_file}}', ['tty' => true]);
});

desc('Remove tmp directory');
task('script:remove-tmp', function () {
    run('rm -rf /tmp');
});

desc('Deploy script');
task('script:deploy', function () {
    run('cd {{deploy_path}} && ./{{script_file}}', ['tty' => true]);
});



desc('PM2 Logs');
task('pm2:logs', function () {
    run('pm2 logs', ['tty' => true]);
});


desc('PM2 Monitor');
task('pm2:monit', function () {
    run('pm2 monit', ['tty' => true]);
});

desc('Deploy your project');
task('deploy', [
    'script:deploy',
]);

desc('update package');
task('packages:update', function () {
    run('cd {{deploy_path}} && yarn install', ['tty' => true]);
});

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
