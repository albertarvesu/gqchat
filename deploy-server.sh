echo 'Setting configuration to DEVELOPMENT'
heroku config:set NPM_CONFIG_PRODUCTION=false
echo 'Push server subtree to heroku...'
git subtree push --prefix server heroku master
echo 'Viewing logs...'
heroku logs