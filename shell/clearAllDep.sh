# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo $ROOT_FOLDER

# Install Modules (Typescript)

cd Lambdas/Create && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Create"
cd $ROOT_FOLDER
cd Lambdas/Read && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Read"
cd $ROOT_FOLDER
cd Lambdas/Update && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Update"
cd $ROOT_FOLDER
cd Lambdas/Delete && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Delete"
cd $ROOT_FOLDER
cd Lambdas/Layer && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Layer"
cd $ROOT_FOLDER
