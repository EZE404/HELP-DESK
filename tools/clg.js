const chalk = require('chalk');

// clg.info(string, objeto); => El string es obligatorio. El objeto es opcional
async function info(msg, obj) {
    if (!obj) {
        console.log(await chalk.cyanBright.bgBlack.bold('> '+msg));
    } else {
        console.log(await chalk.cyanBright.bgBlack.bold('> '+msg+': '+JSON.stringify(obj)));
    }
}

// clg.objeto(objeto, string); => El objeto es obligatorio. El string es opcional
async function objeto(obj, msg) {
    if (!msg) {
        console.log(await chalk.magentaBright.bgBlack(await JSON.stringify(obj)));
    } else {
        console.log(await chalk.magentaBright.bgBlack('> '+msg+': '+ await JSON.stringify(obj)));
    }
}

// ESTE NO SÉ SI FUNCIONA
// clg.error(error, string); => El error es obligatorio. El string es opcional
async function error(err, msg) {
    if (!msg) {
        console.log(await chalk.redBright.bgBlack(await JSON.stringify(err)));
    } else {
        console.log(await chalk.redBright.bgBlack('> '+msg+': '+ await JSON.stringify(err)));
    }
}



module.exports = {
    info,
    objeto
}