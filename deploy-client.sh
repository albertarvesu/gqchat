echo 'Setting configuration to DEVELOPMENT'
heroku config:set NPM_CONFIG_PRODUCTION=false
echo 'Push client subtree to heroku...'
git subtree push --prefix client heroku1 master
echo 'Viewing logs...'
heroku logs