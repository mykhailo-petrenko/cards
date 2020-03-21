cd ../
# Build Docker image and deploy
heroku container:push --app=mapetrenko-cards web --context-path .
# Do the release
heroku container:release --app=mapetrenko-cards web
# Scale pod
heroku ps:scale web=1 --app=mapetrenko-cards
# Watch logs
heroku logs --tail --app=mapetrenko-cards
