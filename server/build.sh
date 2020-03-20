mvn clean install
docker build -t cards-api:latest .

# docker run --name cards-app -p 8080:8080 --env-file ./env.list cards:latest
