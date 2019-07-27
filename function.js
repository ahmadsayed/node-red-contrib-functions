const { spawn } = require('child_process');
const fs = require('fs');
var os = require("os");

function invoke() {
    return new Promise(resolve => {
        const child = spawn('node', ['main.js']);
        child.on('exit', function() {
            var Contents = fs.readFileSync('global','utf8');
            resolve(Contents)
        });
    
    })
}


function main(request) {
    // replace this with your flow name
//    fs.copyFileSync('flows_DESKTOP-OI2DB72.json', 'flows_' + os.hostname+'.json');    
    var done  = false;
    var res = null;
    var result = invoke().then( ((contents) => {
        done = true;
        res = contents;
    
    }));
    require('deasync').loopWhile(function(){return !done;});
    return {payload: `${res}`};    
 }
 exports.main = main;
console.log(main('test'));
