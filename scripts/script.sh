docker build -t blogapi .
docker run -p 4000:4000 -d blogapi
#docker run -p 8000:8000 amazon/dynamodb-local