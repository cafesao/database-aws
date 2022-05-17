# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install Modules (Typescript)
cd Lambdas/Create && yarn && cd $ROOT_FOLDER
cd Lambdas/Read && yarn && cd $ROOT_FOLDER
cd Lambdas/Update && yarn && cd $ROOT_FOLDER
cd Lambdas/Delete && yarn && cd $ROOT_FOLDER
cd Lambdas/Layer && yarn && cd $ROOT_FOLDER

# Compile
cd Lambdas/Create && yarn compile && cd $ROOT_FOLDER
cd Lambdas/Read && yarn compile && cd $ROOT_FOLDER
cd Lambdas/Update && yarn compile && cd $ROOT_FOLDER
cd Lambdas/Delete && yarn compile && cd $ROOT_FOLDER
cd Lambdas/Layer && yarn compile && cd $ROOT_FOLDER

# Zip Lambdas
cd Lambdas/Create && cd ./dist && zip -q -r ../lambda.zip ./ && echo "Success Create" && cd $ROOT_FOLDER
cd Lambdas/Read && cd ./dist && zip -q -r ../lambda.zip ./ && echo "Success Read" && cd $ROOT_FOLDER
cd Lambdas/Update && cd ./dist && zip -q -r ../lambda.zip ./ && echo "Success Update" && cd $ROOT_FOLDER
cd Lambdas/Delete && cd ./dist && zip -q -r ../lambda.zip ./ && echo "Success Delete" && cd $ROOT_FOLDER

# Remove node_modules and install dependencies (prod)
cd Lambdas/Create && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd Lambdas/Read && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd Lambdas/Update && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd Lambdas/Delete && rm -r node_modules && yarn --production && cd $ROOT_FOLDER

# Create folder nodejs and copy node_modules
cd Lambdas/Create && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd Lambdas/Read && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd Lambdas/Update && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd Lambdas/Delete && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip nodejs
cd Lambdas/Create && zip -q -r ./lib.zip ./nodejs && echo "Success Create" && cd $ROOT_FOLDER
cd Lambdas/Read && zip -q -r ./lib.zip ./nodejs && echo "Success Read" && cd $ROOT_FOLDER
cd Lambdas/Update && zip -q -r ./lib.zip ./nodejs && echo "Success Update" && cd $ROOT_FOLDER
cd Lambdas/Delete && zip -q -r ./lib.zip ./nodejs && echo "Success Delete" && cd $ROOT_FOLDER

# Move folder to nodejs Layer Helper
cd Lambdas/Layer && mkdir nodejs && mv ./dist/* ./nodejs && mv ./node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip Layer Helper
cd Lambdas/Layer && zip -q -r ./lib.zip ./nodejs && echo "Success Create" && cd $ROOT_FOLDER

# Sync S3 Lambda
echo 'Sync S3'
export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name people-s3 --query "Stacks[].Outputs[?OutputKey=='S3BucketLambdaName'].OutputValue" --profile pessoal --no-cli-pager --output text)
aws s3 cp Lambdas/Create/lambda.zip s3://${S3_NAME}/Create/lambda.zip --profile pessoal
aws s3 cp Lambdas/Read/lambda.zip s3://${S3_NAME}/Read/lambda.zip --profile pessoal
aws s3 cp Lambdas/Update/lambda.zip s3://${S3_NAME}/Update/lambda.zip --profile pessoal
aws s3 cp Lambdas/Delete/lambda.zip s3://${S3_NAME}/Delete/lambda.zip --profile pessoal

# Sync S3 Lib
aws s3 cp Lambdas/Create/lib.zip s3://${S3_NAME}/Create/lib.zip --profile pessoal
aws s3 cp Lambdas/Read/lib.zip s3://${S3_NAME}/Read/lib.zip --profile pessoal
aws s3 cp Lambdas/Update/lib.zip s3://${S3_NAME}/Update/lib.zip --profile pessoal
aws s3 cp Lambdas/Delete/lib.zip s3://${S3_NAME}/Delete/lib.zip --profile pessoal

# Sync S3 Layer Helper
aws s3 cp Lambdas/Layer/lib.zip s3://${S3_NAME}/Layer/lib.zip --profile pessoal

#Update Code Lambda
echo 'Update Code'
aws lambda update-function-code --function-name people-create --s3-bucket ${S3_NAME} --s3-key Create/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name people-read --s3-bucket ${S3_NAME} --s3-key Read/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name people-update --s3-bucket ${S3_NAME} --s3-key Update/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name people-delete --s3-bucket ${S3_NAME} --s3-key Delete/lambda.zip --profile pessoal --no-cli-pager || true

# Update Lib
echo 'Create Layer'
export LAYER_CREATE=$(aws lambda publish-layer-version --layer-name people-layer-create --content S3Bucket=${S3_NAME},S3Key=Create/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_READ=$(aws lambda publish-layer-version --layer-name people-layer-read --content S3Bucket=${S3_NAME},S3Key=Read/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_UPDATE=$(aws lambda publish-layer-version --layer-name people-layer-update --content S3Bucket=${S3_NAME},S3Key=Update/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_DELETE=$(aws lambda publish-layer-version --layer-name people-layer-delete --content S3Bucket=${S3_NAME},S3Key=Delete/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_HELPER=$(aws lambda publish-layer-version --layer-name people-layer-helper --content S3Bucket=${S3_NAME},S3Key=Layer/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)

# Update Layers
echo 'Update Layer'
aws lambda update-function-configuration --function-name people-create --layers ${LAYER_CREATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name people-read --layers ${LAYER_READ} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name people-update --layers ${LAYER_UPDATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name people-delete --layers ${LAYER_DELETE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true

# Clear
echo 'Clear'
cd Lambdas/Create && rm -r ./dist ./nodejs ./lambda.zip ./lib.zip && echo "Clear Create" && cd $ROOT_FOLDER
cd Lambdas/Read && rm -r ./dist ./nodejs ./lambda.zip ./lib.zip && echo "Clear Read" && cd $ROOT_FOLDER
cd Lambdas/Update && rm -r ./dist ./nodejs ./lambda.zip ./lib.zip && echo "Clear Update" && cd $ROOT_FOLDER
cd Lambdas/Delete && rm -r ./dist ./nodejs ./lambda.zip ./lib.zip && echo "Clear Delete" && cd $ROOT_FOLDER
cd Lambdas/Layer && rm -r ./dist ./nodejs ./lib.zip && echo "Clear Delete" && cd $ROOT_FOLDER
