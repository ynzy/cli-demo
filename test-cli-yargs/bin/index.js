#!/usr/bin/env node

const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')
const log = require("npmlog");
const dedent = require('dedent')
const pkg = require("../package.json");

// const arg = hideBin(process.argv)  // 解析命令
const cli = yargs()

const argv = process.argv.slice(2)
const context = {
    cliDevVersion: pkg.version,
};

cli
    // 配置 第一行的使用提示
    .usage('Usage: $0 [command] <options>')
    // 配置 提示用户脚手架最少要接收一个命令
    .demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
    // 配置 命令输入错误或者没有此命令的时候可以根据输入推荐合适的命令
    .recommendCommands()
    // 配置 命令错误时执行的方法
    .fail((err, msg) => {
        log.error('err', err);
        console.log('msg', msg);
    })
    // 配置 严格模式，最后一行提示命令错误，如：无法识别的选项：lis
    .strict()
    .alias("h", "help")  // 别名
    .alias("v", "version")
    // 配置 终端宽度   
    .wrap(cli.terminalWidth())
    // 配置 尾部的提示文字 去除缩进
    .epilogue(dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna
    `)
    // 全局指令，对象
    .options({
        debug: {
            type: 'boolean',
            describe: 'Bootstrap debug mode',
            alias: 'd'
        }
    })
    // 只能传入一个字符串参数(命令)
    .option("ci", {
        hidden: true, // 命令隐藏，但是还是可以用，一般供内部开发用
        type: "boolean",
    })
    .option("registry", {
        type: "string",
        describe: 'Define global registry',
        alias: 'r'
    })
    // 选项分组
    .group(['debug'], "Dev Options:")
    .group(['registry'], "Extra Options:")
    // 配置 命令，当执行 init [name] 命令的时候一系列的行为
    .command('init [name]', 'Do init a project', (yargs) => {
        yargs
            .option('name', {
                type: 'string',
                describe: 'Name of a project',
                alias: 'n'
            })
    }, (argv) => {
        log.info(argv);
    })
    // 配置 命令的第二种方法
    .command({
        command: 'list',
        aliases: ["ls", "la", "ll"],
        describe: 'List local packages',
        builder: (yargs) => {
        },
        handler: (argv) => {
            console.log(argv);
        }
    })
    // 解析参数
    .parse(argv, context);
