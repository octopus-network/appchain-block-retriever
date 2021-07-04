import Arweave from 'arweave';
import ArDB from '@textury/ardb';
import fs from 'fs';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

//console.log(ArDB, ArDB.default, JSON.stringify(ArDB))
//arweave is Arweave Client instance
const ardb = new ArDB.default(arweave);


async function export_bak_file() {
    const path = './block.bak'

    // This is the same as doing:
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (err) {
        console.error(err)
    }

    const limit = 3;
    for (var i = 0; i < limit; i++) {
        const txs = await ardb.search('transactions').tag('chain-id', '9999').tag('block-high', i.toString()).limit(1).find();

        // Get the data decode as string data
        arweave.transactions.getData(txs[0]._id, { decode: true, string: true }).then(data => {
            //console.log(txs)
            console.log("#########");
            console.log(txs[0]._tags)
            console.log(txs[0]._data)

            console.log(data);

            fs.writeFile(path, data, { flag: 'a' }, err => { console.log(err); })

        });
    }
}

export_bak_file()