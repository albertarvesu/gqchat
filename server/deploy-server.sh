echo 'Changing directory'
cd server
echo 'Push server subtree to heroku'
git subtree push --prefix server heroku master
echo 'Viewing logs'
heroku logs