// const Arweave = require('arweave');
// const fs = require('fs');
import Arweave from 'arweave';
import fs from 'fs';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});


// arweave.wallets.jwkToAddress(key).then((address) => {
//     console.log(address);
//     //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
// });

// arweave.wallets.getBalance('49d9OTVzaTE_A_jbelsu0nHFEsvbPWR0YXH_rC8roj4').then((balance) => {
//     let winston = balance;
//     let ar = arweave.ar.winstonToAr(balance);

//     console.log(winston);
//     //125213858712

//     console.log(ar);
//     //0.125213858712
// });


{
    const transaction = arweave.transactions.get('mHw5iBZg-HdHsgINjSiibbCQwIP8VpwfAXAPl9h6ecw').then(transaction => {

        transaction.get('tags').forEach(tag => {
            let key = tag.get('name', { decode: true, string: true });
            let value = tag.get('value', { decode: true, string: true });
            console.log(`${key} : ${value}`);
        });
        // Content-Type : text/html
        // User-Agent : ArweaveDeploy/1.1.0
    });

    // Get the data decode as string data
    arweave.transactions.getData('mHw5iBZg-HdHsgINjSiibbCQwIP8VpwfAXAPl9h6ecw', { decode: true, string: true }).then(data => {
        console.log(data);
        // <!DOCTYPE HTML>...
    });

}