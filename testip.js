const internalIp = require('internal-ip');
 
(async () => {
    console.log(await internalIp.v6());
    //=> 'fe80::1'
 
    console.log(await internalIp.v4());
    //=> '10.0.0.79'
})();
 
console.log(internalIp.v6.sync())
//=> 'fe80::1'