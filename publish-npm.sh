
#
#  Publish to Nexus NPM repository if it's not a pull request
#

if [ ${TRAVIS_PULL_REQUEST} != "false" ];  then echo "Not publishing a pull request !!!" && exit 0; fi

#  Set nexus npm repository
#
npm config set strict-ssl false
npm install -g npm-cli-login 
npm-cli-login --scope @froala-org -u ${NEXUS_USER} -p ${NEXUS_USER_PWD} -e dummy-email@noemail@froala.com -r ${NEXUS_URL}/repository/Froala-npm

	
echo "seting up nexus as default registry to publish ..."
#  
npm-cli-login -u ${NEXUS_USER} -p ${NEXUS_USER_PWD} -e dummy-email@noemail@froala.com -r ${NEXUS_URL}/repository/Froala-npm

jq '.publishConfig |= . + {"registry": "https://nexus.tools.froala-infra.com/repository/Froala-npm/" }' package.json  > new.file && cat new.file > package.json && rm -f new.file

##
# specify core library to be installed from local path
PACKAGE_NAME=`jq '.name' version.json | tr -d '"'` 
PACKAGE_VERSION=`jq '.version' version.json | tr -d '"'`
echo "Package name : ${PACKAGE_NAME}"
#
# Update package.json with right froala aurelia editor name & version
#
jq --arg froalaeditor "file:${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz" '.dependencies["froala-editor"] |= $froalaeditor' package.json  > new.file && cat new.file > package.json && rm -f new.file
#"dependencies": {
#    "froala-editor": "file:./froala-editor.tar.gz"
#  }

jq --arg froalaeditor "file:${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz" '.dependencies["froala-editor"] |= $froalaeditor' projects/library/package.json  > new.file && cat new.file > projects/library/package.json && rm -f new.file

echo " Angular demo package.json file: " && cat projects/library/package.json

###
# Replace froala angular editor name in package.json - suffix it with BRANCH_NAME
#
export DEFAULT_NAME=`cat package.json | jq '.name '`
export DEFAULT_NAME=`sed -e 's/^"//' -e 's/"$//' <<<"$DEFAULT_NAME"`
echo ${DEFAULT_NAME}
export ANGULAR_EDITOR_NAME=${DEFAULT_NAME}-${TRAVIS_BRANCH}
jq --arg newval "$ANGULAR_EDITOR_NAME" '.name |= $newval' package.json > tmp.json && mv tmp.json package.json
#
###

# finally, build & publish npm package to nexus
wget --no-check-certificate --user ${NEXUS_USER}  --password ${NEXUS_USER_PWD} https://nexus.tools.froala-infra.com/repository/Froala-npm/${PACKAGE_NAME}/-/${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz

npm install
npm run build
cd dist
# update angular name
jq --arg newval "$ANGULAR_EDITOR_NAME" '.name |= $newval' package.json > tmp.json && mv tmp.json package.json
# set nexus npm repo
jq '.publishConfig |= . + {"registry": "https://nexus.tools.froala-infra.com/repository/Froala-npm/" }' package.json  > new.file && cat new.file > package.json && rm -f new.file

npm publish

echo "Published ${ANGULAR_EDITOR_NAME} to nexus "
#
echo "Please create/verify branch update ${TRAVIS_BRANCH} for  https://github.com/froala/ionic-froala-demo-mcs/blob/devops/version.json and update version.json with ${ANGULAR_EDITOR_NAME} and version "