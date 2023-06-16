# EvmLink Npm

This idea is frok from [Tiplik Api](https://github.com/TipLink/tiplink-api) , [Origin Documentation](https://docs.tiplink.io)

## Feature

- Use web3js to make pair generate in EVM chain .

- Add EVM txns to make  simple transactions and ERC20-approve .

- Add self design Link . Allow user desigin it's link . 

- Add encryption of private key and not directly using b58 .

# What is EvmLink?

EvmLink is a lightweight wallet designed to make transferring digital assets as easy as sending a link. It allows any web3auth/unipass/magicWallet user to easly transfer money and share any kinds of token including ERC721(NFT) easly by linkes . 

# Basic Installation instructions
```bash
npm install @evmlink/api
```
Import Instructions
```js
import { EvmLink } from '@evmlink';
```
Create a EvmLink
```js
EvmLink.create("/","http://192.168.1.103:8080/",true,137,"Happy Birthday !").then(evmlink => {
  console.log("link: ", evmlink.url.toString());
  console.log("publicKey: ", evmlink.keypair.publicKey);
  return evmlink;
});
```
- create :
  - {path :: string}
  - {origin :: sting}
  - {encryption  :: bool}
  - {chainId  :: uint}
  - {message  :: string}


```js
const ep = 'http://192.168.1.103:8080/137/V3M5bnAvUkZ3YVdYNGMxaGQyUUlpbHd4U2ppYXV1bXhXdURVdG54bHVSTXh1U2NJK2JWVTc4bThrczJUY3UxTWZQdlNxTjVaTzhkYkJrbWI3dE8rK2o5dWo3cUlpT243UHU0RkhSY29rWFE9/3413/SGFwcHkgQmlydGhkYXkgIQ==/';
EVMLink.fromLink(ep).then(evmlink => {
  console.log("converted publicKey: ", evmlink.keypair.publicKey);
  return evmlink;
});
```

# What is EvmWallt ?

EvmWallet is a Class that allows you to use link-base-wallet like extension wallet (like metamask).

## Feature

- Init the account with web3js

- Balance of account 

- Transfer network token

- Basical contract call

- Basical contract send

- Basical contract send with payable

- Erc20 Token Groups
  - Erc20 balanceOf
  - Erc20 approve
  - Erc20 transfer
  - Erc20 transferFrom

# How to use EvmWallet


