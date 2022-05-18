# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install Modules (Typescript)
cd Lambdas/Create && yarn && cd $ROOT_FOLDER
cd Lambdas/Read && yarn && cd $ROOT_FOLDER
cd Lambdas/Update && yarn && cd $ROOT_FOLDER
cd Lambdas/Delete && yarn && cd $ROOT_FOLDER
cd Lambdas/Layer && yarn && cd $ROOT_FOLDER
