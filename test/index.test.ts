import { EvmLink } from "../src";

//Encryption
test("returns valid EvmLink", () => {
  return EvmLink.create("/","http://192.168.1.103:8080/",true,137).then((evmLink: EvmLink) => {
    // console.log(evmLink)
    // console.log(evmLink.url)
    expect(typeof evmLink.url.hash).toBe('string');
    expect(typeof evmLink.keypair.privateKey).toBe('string');
    expect(typeof evmLink.keypair.address).toBe('string');
  });
})

//Ecryption test
test("matches website", () => {
  return EvmLink.fromLink('http://192.168.1.103:8080/137/eVlpVDFqNFpzRG9Fcm1YM21kV2owN2cveUVhQmMydFdqTGhHUGRxZGU4YjdyOGFoWFU0WXRRWnVPYW93ZE1OM2pvQVJ4c3Z3SmVhNzZ6Y0ZxWjNxMTJ6S2tpNE9oL096Y0M0RWVyVUpNd3c9/7015/').then((evmLink: any) => {
    // console.log(evmLink)
    // console.log(evmLink.address)
    expect(evmLink.address).toMatch('0xa7e5B896E221E588beB49a3d871567f7B080E0f0');
    console.log(evmLink.privateKey)
    expect(evmLink.privateKey).toMatch('0xab51c5ede0103693ea08cb35add2a8150e3fe65c62238b30ba9b2ee6565db1ae');
  });
})



//Unencrypted
test("returns valid EvmLink", () => {
  return EvmLink.create("/","http://192.168.1.103:8080/",false,137).then((evmLink: EvmLink) => {
    // console.log(evmLink)
    // console.log(evmLink.url)
    expect(typeof evmLink.url.hash).toBe('string');
    expect(typeof evmLink.keypair.privateKey).toBe('string');
    expect(typeof evmLink.keypair.address).toBe('string');
  });
})

//Unecrypted test
test("matches website", () => {
  return EvmLink.fromLink('http://192.168.1.103:8080/137/MHg0YjRiYjE3NWRkMTc5MzAwMWI0MWU5NDExMTc5ZWQ0YjNhM2I0M2YyNzAwMjZjODY0NTY2NzkwN2NlYzliNzZi//').then((evmLink: any) => {
    // console.log(evmLink)
    // console.log(evmLink.address)
    expect(evmLink.address).toMatch('0xD150eF015e30fFe38fEA3510472588eD97de3fA8');
    console.log(evmLink.privateKey)
    expect(evmLink.privateKey).toMatch('0x4b4bb175dd1793001b41e9411179ed4b3a3b43f270026c8645667907cec9b76b');
  });
})