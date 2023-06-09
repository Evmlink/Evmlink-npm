import { EvmLink } from "../src";

test("returns valid EvmLink", () => {
  return EvmLink.create("/","http://192.168.1.103:8080/",true).then((evmLink: EvmLink) => {
    // console.log(evmLink)
    expect(typeof evmLink.url.hash).toBe('string');
    expect(typeof evmLink.keypair.privateKey).toBe('string');
    expect(typeof evmLink.keypair.address).toBe('string');
  });
})

test("matches website", () => {
  return EvmLink.fromLink('http://192.168.1.103:8080/a1NHTXo5ZzArOTdaUjd0TVNlZkxUMk9lVmloVXNNcTBtVEZpRUpIUlprS2pGSDhsSXRmQndWV2FDbEZqTnpUdFByRVNMSitzMFZHekNBR042bCtESW9jRjVlbjlzL0tncy9rcnFCVjgraWM9/2719/').then((evmLink: any) => {
    console.log(evmLink)
    console.log(evmLink.address)
    expect(evmLink.address).toMatch('0x5d23F4c32e9cCc48C615c4f814526d3Acf446039');
    console.log(evmLink.privateKey)
    expect(evmLink.privateKey).toMatch('0x3bfa9ba3a2a36024bc46d3b8e6966fac5fc44e42643b9a949db9b94c325fef22');
  });
})


