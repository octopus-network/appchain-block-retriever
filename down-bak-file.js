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


async function export_bak_file(ChaidId, targetBlockHight) {
    const path = './block.bak'

    // This is the same as doing:
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (err) {
        console.error(err)
    }

    for (var i = 0; i <= targetBlockHight; i++) {
        const txs = await ardb.search('transactions').tag('ChaidId', ChaidId.toString()).tag('Height', i.toString()).limit(1).find();

        if (!txs[0]) {
            console.log("####### get " + i + " block data is null, ", "ChaidId:", ChaidId.toString(), "targetBlockHight", i.toString());
            continue;
        }
        // Get the data decode as string data
        arweave.transactions.getData(txs[0]._id, { decode: true, string: true }).then(data => {
            //console.log(txs)
            //console.log("#########");
            console.log(txs[0]._tags)
            console.log(txs[0]._data)

            console.log(data);

            fs.writeFile(path, data, { flag: 'a' }, err => { console.log(err); })

        });
    }
}

//node down-bak-file.js 9999 3
const args = process.argv.slice(2)

console.log("ChaidId:", args[0], "targetBlockHight", args[1]);
export_bak_file(args[0], args[1])