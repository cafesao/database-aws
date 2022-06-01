export ROOT_FOLDER=$(pwd)

echo 'Install Modules (Typescript)'
cd Lambdas/Layer && yarn && cd $ROOT_FOLDER
cd Lambdas/Layer && yarn compile && cd $ROOT_FOLDER
cd Lambdas/Layer && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd Lambdas/Layer && mkdir nodejs && mv ./dist/* ./nodejs && mv ./node_modules ./nodejs || true && cd $ROOT_FOLDER
cd Lambdas/Layer && zip -q -r ./lib.zip ./nodejs && echo "Success Create" && cd $ROOT_FOLDER

echo 'Sync S3'
export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-s3 --query "Stacks[].Outputs[?OutputKey=='S3BucketLambdaName'].OutputValue" --profile pessoal --no-cli-pager --output text)
aws s3 cp Lambdas/Layer/lib.zip s3://${S3_NAME}/Layer/lib.zip --profile pessoal

echo 'Create Layer'
export LAYER_CREATE=$(aws lambda publish-layer-version --layer-name people-layer-create --content S3Bucket=${S3_NAME},S3Key=Create/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_READ=$(aws lambda publish-layer-version --layer-name people-layer-read --content S3Bucket=${S3_NAME},S3Key=Read/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_UPDATE=$(aws lambda publish-layer-version --layer-name people-layer-update --content S3Bucket=${S3_NAME},S3Key=Update/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_DELETE=$(aws lambda publish-layer-version --layer-name people-layer-delete --content S3Bucket=${S3_NAME},S3Key=Delete/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_HELPER=$(aws lambda publish-layer-version --layer-name people-layer-helper --content S3Bucket=${S3_NAME},S3Key=Layer/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)

# Get Name Lambda
export LAMBDA_FUNCTION_CREATE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameCreate'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_READ_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameRead'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_UPDATE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameUpdate'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_DELETE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameDelete'].OutputValue" --profile pessoal --no-cli-pager --output text)

# Update Layers
echo 'Update Layer'
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_CREATE_NAME} --layers ${LAYER_CREATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_READ_NAME} --layers ${LAYER_READ} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_UPDATE_NAME} --layers ${LAYER_UPDATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_DELETE_NAME} --layers ${LAYER_DELETE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true

echo 'Clear'
cd Lambdas/Layer && rm -r ./dist ./nodejs ./lib.zip && echo "Clear Layer" && cd $ROOT_FOLDER
