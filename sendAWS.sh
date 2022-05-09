#!/bin/bash
echo 'Delete node_modules...'
rm -r node_modules || true

echo 'Install dependencies production...'
yarn install --production

echo 'Compile...'
yarn compile

echo 'Create folder and move node_modules...'
mkdir nodejs && mv node_modules ./nodejs

echo 'Zip files...'
cd ./dist && zip -q -r ../lambda.zip ./

echo 'Zip node_modules...'
zip -q -r ./lib.zip ./nodejs

echo 'Code and node_modules zipped and ready to go.'

echo 'Get S3'
export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-lambda-s3 --query "Stacks[].Outputs[?OutputKey=='S3BucketLambdaName'].OutputValue" --output text)

echo 'Upload zips...'
aws s3 cp lambda.zip s3://${S3_NAME}/lambda.zip
aws s3 cp lib.zip s3://${S3_NAME}/lib.zip

if [ $1 = first ]; then
    echo 'Update code...'
    aws lambda update-function-code --function-name people-lambda --s3-bucket ${S3_NAME} --s3-key lambda.zip

    echo 'Create Layer...'
    export LAYER=$(aws lambda publish-layer-version --layer-name people-layer-lambda --content S3Bucket=${S3_NAME},S3Key=lib.zip --compatible-runtimes nodejs14.x --query 'LayerVersionArn' --output text)

    echo 'Updating lambda with layer...'
    aws lambda update-function-configuration --function-name people-lambda --layers ${LAYER}
fi

echo 'Done!'
