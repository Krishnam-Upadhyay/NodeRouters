const logEvents = require('./logEvents');

const EvenEmitter = require('events');

class MyEmitter extends EvenEmitter{};

//initialize object
const myEmitter = new MyEmitter();

//add listner for the log event
myEmitter.on('log',(msg)=>logEvents(msg));

setTimeout(()=>{
    myEmitter.emit('log','Log Event Emitted!');
},2000);   