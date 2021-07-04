// const Arweave = require('arweave');
// const fs = require('fs');
import Arweave from 'arweave';
import fs from 'fs';

// //49d9OTVzaTE_A_jbelsu0nHFEsvbPWR0YXH_rC8roj4
let key = {
    //todo use the env key
}

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

async function upload(index) {
    {
        let data = fs.readFileSync('./' + index + '.data');

        let transaction = await arweave.createTransaction({ data: data }, key);
        transaction.addTag('chain-id', '9999');
        transaction.addTag('block-high', index.toString());
        //todo add hash to tag

        await arweave.transactions.sign(transaction, key);

        let uploader = await arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
    }
}

upload(0)
upload(1)
upload(2)
