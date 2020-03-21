cd ../
docker build -t cards-api:latest .

# docker rm cards-app
# docker run --name cards-app -p 8080:8080 --env-file ../env.list cards-api:latest
# docker run --name cards-app -p 8080:8080 --env-file ../env.list -it cards-api:latest bash
