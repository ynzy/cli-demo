#!/usr/bin/env node

const lib = require('ynzy-test-cli-lib')
// console.log(lib.sum(1,2));
// console.log('test-cli');
const argv = require('process').argv;
// 注册一个命令 test-cli init
const command = argv[2];

// 实现参数解析 init --name
const options = argv.slice(3)
if(options.length>1){
    let [option,param] = options
    option = option.replace('--','')
    // console.log(option,param);
    if (command) {
        if (lib[command]) {
            lib[command]({option,param})
        } else {
            console.log('无效的命令');
        }
    } else {
        console.log('请输入命令');
    }
}
// 实现参数解析 --version
if(command.startsWith('--') || command.startsWith('-')){
    // 全局的option
    const globalOption = command.replace(/--|-/g, '')
    // console.log(globalOption);
    if(globalOption === 'version' || globalOption === 'V')
    console.log('1.0.0');
}