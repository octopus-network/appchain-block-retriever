# 一 导出备份文件
```
./node-template export-blocks --dev --from 0 --to 0 0.data --pruning=archive
./node-template export-blocks --dev --from 1 --to 1 1.data --pruning=archive
./node-template export-blocks --dev --from 2 --to 2 2.data --pruning=archive
```
导出成功输出

```
2021-07-04 14:50:28 DB path: /home/ubuntu/.local/share/node-template/chains/dev/db
2021-07-04 14:50:28 Exporting blocks from #0 to #1
2021-07-04 14:50:28 #0
2021-07-04 14:51:22 DB path: /home/ubuntu/.local/share/node-template/chains/dev/db
2021-07-04 14:51:22 Exporting blocks from #1 to #1
2021-07-04 14:51:45 DB path: /home/ubuntu/.local/share/node-template/chains/dev/db
2021-07-04 14:51:45 Exporting blocks from #2 to #2
```

# 二 安装依赖

yarn install

# 三 手动上传到 arware

node upload.js

# 四 查看上传情况

区块浏览器对应账户最新记录，及结合区块哈希用"node testquery.js"查询和上传内容一致
https://viewblock.io/arweave/address/49d9OTVzaTE_A_jbelsu0nHFEsvbPWR0YXH_rC8roj4

# 五 下载备份文件

node down-bak-file.js
会下载并生成备份文件，block.bak

# 六 导入 substrate

./node-template purge-chain --dev
```
Are you sure to remove "/home/ubuntu/.local/share/node-template/chains/dev/db"? [y/N]: y
"/home/ubuntu/.local/share/node-template/chains/dev/db" removed.
```

./node-template import-blocks block.bak --dev --pruning=archive

导入成功输出

```
2021-07-05 02:07:05 🔨 Initializing Genesis block/state (state: 0xa824…8840, header-hash: 0xdc11…7741)    
2021-07-05 02:07:05 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2021-07-05 02:07:05 ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch    
2021-07-05 02:07:07 🎉 Imported 4 blocks. Best: #2    
```

# 七 重新运行
./node-template --dev  --ws-external --rpc-methods=unsafe  --rpc-cors=all   --pruning=archive 
```
2021-07-05 02:12:55 It isn't safe to expose RPC publicly without a proxy server that filters available set of RPC methods.    
2021-07-05 02:12:55 Substrate Node    
2021-07-05 02:12:55 ✌️  version 3.0.0-fc9d24c-x86_64-linux-gnu    
2021-07-05 02:12:55 ❤️  by Substrate DevHub <https://github.com/substrate-developer-hub>, 2017-2021    
2021-07-05 02:12:55 📋 Chain specification: Development    
2021-07-05 02:12:55 🏷 Node name: ugliest-color-6659    
2021-07-05 02:12:55 👤 Role: AUTHORITY    
2021-07-05 02:12:55 💾 Database: RocksDb at /home/ubuntu/.local/share/node-template/chains/dev/db    
2021-07-05 02:12:55 ⛓  Native runtime: node-template-100 (node-template-1.tx1.au1)    
2021-07-05 02:12:55 Using default protocol ID "sup" because none is configured in the chain specs    
2021-07-05 02:12:55 🏷 Local node identity is: 12D3KooWA5mxnrE1EVg3tQhLKb8e5ao6hLbShGa5oS5pdrV2sDC6    
2021-07-05 02:12:55 📦 Highest known block at #2    
2021-07-05 02:12:55 〽️ Prometheus server started at 127.0.0.1:9615    
2021-07-05 02:12:55 Listening for new connections on 0.0.0.0:9944.    
2021-07-05 02:13:00 🙌 Starting consensus session on top of parent 0x7f5445322c4928c0ca4a80a12b8b584d773f9d39ca4a425c76210d3488bfa437    
2021-07-05 02:13:00 Timeout fired waiting for transaction pool at block #2. Proceeding with production.    
2021-07-05 02:13:00 🎁 Prepared block for proposing at 3 [hash: 0x9d755f2a658b1f5eab2e652731e7c4f29b08761c6e66ef61b3519e89adffa596; parent_hash: 0x7f54…a437; extrinsics (1): [0x6017…6e64]]    
2021-07-05 02:13:00 🔖 Pre-sealed block for proposal at 3. Hash now 0x435b0999dadd55fca3ab3ac38b67cc56c87fdb601c9016d438c557a06f40f1b6, previously 0x9d755f2a658b1f5eab2e652731e7c4f29b08761c6e66ef61b3519e89adffa596.    
2021-07-05 02:13:00 ✨ Imported #3 (0x435b…f1b6)    
2021-07-05 02:13:00 🙌 Starting consensus session on top of parent 0x435b0999dadd55fca3ab3ac38b67cc56c87fdb601c9016d438c557a06f40f1b6    
2021-07-05 02:13:00 🎁 Prepared block for proposing at 4 [hash: 0x0de398279b3502cb519e3ff8daf061367608be3931fe4bcdb938ccb0101e1bf2; parent_hash: 0x435b…f1b6; extrinsics (1): [0x7e51…258b]]    
2021-07-05 02:13:00 🔖 Pre-sealed block for proposal at 4. Hash now 0xd1fda862534e5e84728b660180b389d3362d752b69806dce2cb459b217a472a0, previously 0x0de398279b3502cb519e3ff8daf061367608be3931fe4bcdb938ccb0101e1bf2.    
2021-07-05 02:13:00 ✨ Imported #4 (0xd1fd…72a0)    
2021-07-05 02:13:00 💤 Idle (0 peers), best: #4 (0xd1fd…72a0), finalized #0 (0xdc11…7741), ⬇ 0 ⬆ 0   
```
