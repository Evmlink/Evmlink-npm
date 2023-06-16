import { EvmLink,EvmWallet } from "../src";

//Encryption
test("returns valid EvmLink", () => {
  return EvmLink.create("/","http://192.168.1.103:8080/",true,137,"Happy Birthday !").then((evmLink: EvmLink) => {
    // console.log(evmLink)
    // console.log(evmLink.url)
    expect(typeof evmLink.url.hash).toBe('string');
    expect(typeof evmLink.keypair.privateKey).toBe('string');
    expect(typeof evmLink.keypair.address).toBe('string');
  });
})

//Ecryption test
test("matches website", () => {
  return EvmLink.fromLink('http://192.168.1.103:8080/137/V3M5bnAvUkZ3YVdYNGMxaGQyUUlpbHd4U2ppYXV1bXhXdURVdG54bHVSTXh1U2NJK2JWVTc4bThrczJUY3UxTWZQdlNxTjVaTzhkYkJrbWI3dE8rK2o5dWo3cUlpT243UHU0RkhSY29rWFE9/3413/SGFwcHkgQmlydGhkYXkgIQ==/').then((evmLink: any) => {
    // console.log(evmLink)
    // console.log(evmLink.address)
    expect(evmLink.keypair.address).toMatch('0xabA79099763769b3bee6E784a4C2a936326CC387');
    console.log(evmLink.keypair.privateKey)
    expect(evmLink.keypair.privateKey).toMatch('0x11ebb150a9d1ecd27541f3efd8319614b05c7f8f893c3bf04b52bedddb4e7592');
    expect(evmLink.msg).toMatch("SGFwcHkgQmlydGhkYXkgIQ==");
    expect(evmLink.chainId).toBe(137);
  });
})



//Unencrypted
test("returns valid EvmLink", () => {
  return EvmLink.create("/","http://192.168.1.103:8080/",false,137,"Happy Birthday !").then((evmLink: EvmLink) => {
    // console.log(evmLink)
    // console.log(evmLink.url)
    expect(typeof evmLink.url.hash).toBe('string');
    expect(typeof evmLink.keypair.privateKey).toBe('string');
    expect(typeof evmLink.keypair.address).toBe('string');
  });
})

//Unecrypted test
test("matches website", () => {
  return EvmLink.fromLink('http://192.168.1.103:8080/137/MHhjOTZjMGRjODYxYzIyOWJkNzllMWJjMDk3MTQzZjlhOTQ1YzRjNDVkMWRhZjNiY2Y3Y2ZlYmU4MTYyYzk3OTFm//SGFwcHkgQmlydGhkYXkgIQ==/').then((evmLink: any) => {
    // console.log(evmLink)
    // console.log(evmLink.address)
    expect(evmLink.keypair.address).toMatch('0xc02527b09DAc7Db43e73464B4968CB945A39C10B');
    console.log(evmLink.keypair.privateKey)
    expect(evmLink.keypair.privateKey).toMatch('0xc96c0dc861c229bd79e1bc097143f9a945c4c45d1daf3bcf7cfebe8162c9791f');
    expect(evmLink.msg).toMatch("SGFwcHkgQmlydGhkYXkgIQ");
    expect(evmLink.chainId).toBe(137);
  });
})


/**
 * Test the wallet model 
 */

test("Wallet Balance", () => {
  return EvmWallet.getBalance("0xc96c0dc861c229bd79e1bc097143f9a945c4c45d1daf3bcf7cfebe8162c9791f","https://poly-rpc.gateway.pokt.network",137).then((wallet: any) => {
    console.log("My balance",wallet)
  });
})

var erc20 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"}],"name":"changeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address","name":"childChainManager","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

test("Contract Read", () => {
  return EvmWallet.readContract("0xc96c0dc861c229bd79e1bc097143f9a945c4c45d1daf3bcf7cfebe8162c9791f","https://poly-rpc.gateway.pokt.network",137,
  {
    abi:erc20,
    address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    functionName:"balanceOf",
    method:["0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245"],
    value:0
  }
  ).then((wallet: any) => {
    console.log("My USDT  balance",wallet)
  });
})