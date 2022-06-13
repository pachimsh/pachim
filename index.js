#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import readline from 'readline';
import shell from 'shelljs';

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let params = process.argv.slice(2);
let product = params[0] || "";
let licenseKey = params[1] || "";

let commandGuide = "Usage: pachim <product> <license-key>";

if(product === "") {
    console.log(chalk.red('The Product Identifier is Required'))
    console.log(`\n${commandGuide}`)
    process.exit(1);
}

if(licenseKey === "") {
    console.log(chalk.red('The License key is Required'))
    console.log(`\n${commandGuide}`)
    process.exit(1);
}


clear();

console.log(
  chalk.rgb(5, 150, 105)(
    figlet.textSync('Pachim', { horizontalLayout: 'full' })
  )
);

console.log( chalk.yellow(`You are trying to install javascript product from Pachim`) )
console.log(`${chalk.bold('Product')} : ${product}`)
console.log(`${chalk.bold('License Key')} : ${licenseKey}`)

console.log('-------------')
// 
readlineInstance.question(`Please confirm to continue? (y/n) `, answer => {
    if(answer.toLowerCase() !== 'y') {
        process.exit(1);
    }

    readlineInstance.close();
    console.log("")
    
    // add registry to .npmrc
    console.log(chalk.rgb(5, 150, 105)(`- npm config set @${product}:registry https://node.pachim.sh/${product}`))
    shell.exec(`npm config set "@${product}:registry" "https://node.pachim.sh/${product}" --userconfig .npmrc`)
    console.log(chalk.bold.yellow('Package registry added. \n'))

    // store license key
    console.log(chalk.rgb(5, 150, 105)(`- npm config set //node.pachim.sh/${product}/:_authToken ${licenseKey}`))
    shell.exec(`npm config set "//node.pachim.sh/${product}/:_authToken" "${licenseKey}" --userconfig .npmrc`)
    console.log(chalk.bold.yellow('Your license key is stored. \n'))
    
    console.log(chalk.yellow("Installing package ... \n"))
    console.log(`- npm install @${product}/${product}`)

    let statusOfNpmIstall = shell.exec(`npm install "@${product}/${product}"`).code;

    if(statusOfNpmIstall) {
        console.log(chalk.bold.red("\n Bad, I Can`t Install Your Package!"))
    } else {
        console.log(chalk.bold.yellow("\n All done, Do Magic!"))
    }

});