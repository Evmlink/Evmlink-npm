# EvmLink Npm

This repo is frok from [Tiplik Api](https://github.com/TipLink/tiplink-api) , [Origin Documentation](https://docs.tiplink.io)

## Feature

- Use web3js to make pair generate in EVM chain .

- Add EVM txns to make  simple transactions and ERC20-approve .

- Add self design Link . Allow user desigin it's link . 

- Add encryption of private key and not directly using b58 .

# What is EvmLink?

EvmLink is a lightweight wallet designed to make transferring digital assets as easy as sending a link. It allows any web3auth/unipass/magicWallet user to easly transfer money and share any kinds of token including ERC721(NFT) easly by linkes . 

# Basic Installation instructions
```bash
npm install @evmlink
```
Import Instructions
```js
import { EvmLink } from '@evmlink';
```
Create a EvmLink
```js
EvmLink.create("/","http://192.168.1.103:8080/",true).then(evmlink => {
  console.log("link: ", evmlink.url.toString());
  console.log("publicKey: ", evmlink.keypair.publicKey);
  return evmlink;
});
```
```js
const ep = 'https://xxx.xxx/a1NHTXo5ZzArOTdaUjd0TVNlZkxUMk9lVmloVXNNcTBtVEZpRUpIUlprS2pGSDhsSXRmQndWV2FDbEZqTnpUdFByRVNMSitzMFZHekNBR042bCtESW9jRjVlbjlzL0tncy9rcnFCVjgraWM9/2719/';
EVMLink.fromLink(ep).then(evmlink => {
  console.log("converted publicKey: ", evmlink.keypair.publicKey);
  return evmlink;
});
```
