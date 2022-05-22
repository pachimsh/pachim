#!/bin/bash

echo -e "\033[0;32mYou are trying to install javascript product from Pachim\033[0m"
echo -e "\033[0;32mproduct :\033[0m $1 "
echo -e "\033[0;32mlicense :\033[0m [$2]"

read -p "Please confirm to continue? (y) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then

  echo -e '\033[1;32mPackage registry added.\033[0m'
  echo -e "- npm config set @$1:registry https://node.pachim.sh/$1"

  npm config set "@$1:registry" "https://node.pachim.sh/$1" --userconfig .npmrc

  echo -e '\033[1;32mYour license key is stored.\033[0m'
  echo -e "- npm config set //node.pachim.sh/$1/:_authToken $2"

  npm config set "//node.pachim.sh/$1/:_authToken" "$2" --userconfig .npmrc

  echo -e '\033[1;32mInstalling package\033[0m'
  echo -e "- npm install @$1/$1"

  npm install "@$1/$1"

  echo -e '\033[1;32mAll done, Do Magic!'
fi
