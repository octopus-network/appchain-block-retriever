import { RequestManager, WebSocketTransport, Client } from "@open-rpc/client-js";
import fs from 'fs';
import Arweave from 'arweave';

const transport = new WebSocketTransport("ws://127.0.0.1:9944");
const client = new Client(new RequestManager([transport]));

// console.log("#####result is ", result);
// const path = './rpc-block.bak'
// // This is the same as doing:
// try {
//     fs.unlinkSync(path)
//     //file removed
// } catch (err) {
//     console.error(err)
// }
// fs.writeFile(path, JSON.stringify(result), { flag: 'a' }, err => { console.log(err); })

// //49d9OTVzaTE_A_jbelsu0nHFEsvbPWR0YXH_rC8roj4
let key = {
}

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

async function upload(hash, block_hight) {
    const result = await client.request({ method: "chain_getBlock", params: [hash] });
    console.log("#####result is ", result);

    let data = JSON.stringify(result)
    let transaction = await arweave.createTransaction({ data: data }, key);
    transaction.addTag('chain-id', '9999');
    transaction.addTag('block-high', block_hight);
    //todo add hash to tag

    await arweave.transactions.sign(transaction, key);

    let uploader = await arweave.transactions.getUploader(transaction);

    while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }
}

upload('0x1ff2a60f3160e59abfef2c5dd142c6a3fa6aada27d815cffb5b7b89a6e81145a', 9)