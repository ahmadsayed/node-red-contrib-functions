var RED = require("node-red");


const fs = require('fs');

var settings = {
    //logging: off,
    httpAdminRoot:false,
    httpNodeRoot: false,
    userDir: __dirname,
    functionGlobalContext: { }    // enables global context
};

RED.init(null,settings);
RED.start()

// do app specific cleaning before exiting
process.on('exit', function () {
    RED.runtime.context.getValue({
        scope: 'global',
        id: undefined,
        store: undefined, // use default
        key: 'test'
    }).then(function(value) {
        fs.writeFileSync("global", JSON.stringify(value));
        
        console.log(value);
    });
});

