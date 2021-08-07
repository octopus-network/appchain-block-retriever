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


async function export_bak_file(ChainId, targetBlockHight) {
    const path = './block.bak'

    // This is the same as doing:
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (err) {
        console.error(err)
    }

    for (var i = 0; i <= targetBlockHight; i++) {
        const txs = await ardb.search('transactions').tag('ChainId', ChainId.toString()).tag('Height', i.toString()).limit(1).find();

        if (!txs[0]) {
            console.log("####### get " + i + " block data is null, ", "ChainId:", ChainId.toString(), "targetBlockHight", i.toString());
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

async function export_bak_file_from_kyve_union(path, ChainId, i) {
  const txs = await ardb.search('transactions').tag('ChainId', ChainId.toString()).tag('Height', i.toString()).limit(1).find();

  if (!txs[0]) {
      console.log("####### get " + i + " block data is null, ", "ChainId:", ChainId.toString(), "targetBlockHight", i.toString());
      return;
  }
  // Get the data decode as string data
  arweave.transactions.getData(txs[0]._id, { decode: true, string: true }).then(data => {
      //console.log(txs)
      //console.log("#########");
      // console.log(txs[0]._tags)
      // console.log(txs[0]._data)

      // console.log(data);

      console.log(i)
      fs.writeFileSync(path, JSON.parse(data) + '\n', { flag: 'a' }, err => { console.log(err); })

  });
}
async function export_bak_file_from_kyve(ChainId, targetBlockHight) {
  const path = './block.bak'

  // This is the same as doing:
  try {
      fs.unlinkSync(path)
      //file removed
  } catch (err) {
      console.error(err)
  }

  for (var i = 0; i <= targetBlockHight; i++) {
      await export_bak_file_from_kyve_union(path, ChainId, i);
  }
}

//node down-bak-file.js 9999 3
const args = process.argv.slice(2)

console.log("ChainId:", args[0], "targetBlockHight", args[1]);
export_bak_file_from_kyve(args[0], args[1])