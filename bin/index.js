#!/usr/bin/env node

const program = require('commander');
const ssh = require("../lib/ssh");

program
    .version('1.0.0', '-v, --version')
    .option('-h, --host <host>', 'Hosting server IP')
    .option('-d, --dstHost <dstHost>', 'Destination host address')
    .option('-p, --localPort <localPort>', 'local port')
    .option('-c, --config <config>', 'path to local config file to override')
    .option('-u, --username <config>', 'user to login with')
    .action((program) => {
        const {host, dstHost, localPort, config} = program;

        if (config) {
            ssh.config(config);
            return;
        }

        if (host && dstHost) {
            const {host, dstHost, localPort, username} = program;
            ssh.exec({ host, dstHost, localPort, username});
        }

    })
    .parse(process.argv);
