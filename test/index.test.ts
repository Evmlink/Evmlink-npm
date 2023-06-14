import { EvmLink } from "../src";

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