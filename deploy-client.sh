# heroku create gql --buildpack https://github.com/mars/create-react-app-buildpack.git
echo 'Setting configuration to DEVELOPMENT'
heroku config:set NPM_CONFIG_PRODUCTION=false
echo 'Push client subtree to heroku...'
git subtree push --prefix client gqchat master
echo 'Viewing logs...'
heroku logs