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

./node-template import-blocks block.bak --dev --pruning=archive

导入成功输出

```
2021-07-04 15:54:52 🎉 Imported 4 blocks. Best: #1699
```
