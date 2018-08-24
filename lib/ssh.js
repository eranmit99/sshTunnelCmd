const tunnel = require("tunnel-ssh");
const colors = require('colors');
const fs = require("fs");
const _ =  require("lodash");


// **************************************************************************

class TunnelHelper {

    constructor() {
        this.configFilePath = __dirname + "/config.json";
        this.baseConfig = this.getBaseConfig(this.configFilePath);
        this.redisList = []
    }

    getBaseConfig(configFilePath) {
        let baseConfig = fs.readFileSync(configFilePath);
            baseConfig = JSON.parse(baseConfig);

        return Object.assign(baseConfig, {
            privateKey: fs.readFileSync(baseConfig.rsa)
        });
    }

    printRedisList() {
        console.log(colors.yellow(this.redisList));
    }

    config(newConfigFilePath) {
        try {
            let newConfig = fs.readFileSync(newConfigFilePath);
                newConfig = JSON.parse(newConfig);

            fs.writeFileSync(this.configFilePath, JSON.stringify(newConfig));

        } catch(err) {
            console.log(colors.red(err));
        }
    }

    exec(options) {
        const config = Object.assign(this.baseConfig, _.omitBy(options, _.isUndefined));

        tunnel(config, (error, server) => {
            if(!error) {
                console.log(colors.green(`Connection Success => The Local Port is ${config.localPort}`));
            } else {
                console.log(colors.red('connection failed', error));
            }
        });
    }
}

module.exports = new TunnelHelper();








