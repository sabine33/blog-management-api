aws dynamodb create-table \
    --table-name BlogArticles \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=Title,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=title,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD