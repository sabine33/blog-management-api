docker run -v /home/user/.aws:/root/.aws -p 8000:8000 amazon/dynamodb-local 
yarn migrate:create
yarn migrate:load