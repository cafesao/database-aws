# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo 'Deploy ARN...'
aws cloudformation deploy --template-file './devops/arn.yml' \
    --stack-name 'people-arn' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=people"

echo 'Deploy ARN Complete'

echo 'Deploy S3...'
aws cloudformation deploy --template-file './devops/s3.yml' \
    --stack-name 'people-s3' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=people"

echo 'Deploy S3 Complete'

echo 'Deploy DynamoDB...'
aws cloudformation deploy --template-file './devops/dynamodb.yml' \
    --stack-name 'people-dynamodb' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=people"

echo 'Deploy DynamoDB Complete'

echo 'Deploy Lambda...'
aws cloudformation deploy --template-file './devops/lambda.yml' \
    --stack-name 'people-lambda' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=people" \
    "AcmCertificate=arn:aws:acm:us-east-1:326611364316:certificate/0d6c6811-96cb-45b9-b373-8f0c26e8fb62" \
    "DomainName=cafesao.net" \
    "NameAPI=people" \
    "ServiceNameCreate=people-create" \
    "ServiceNameRead=people-read" \
    "ServiceNameUpdate=people-update" \
    "ServiceNameDelete=people-delete"
