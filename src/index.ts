import Web3 from "web3";
import CryptoJS from 'crypto-js'

const DEFAULT_PASSWORDLENGTH = 4; //The length of encryption number

//To generate a totally new account
const randomAccount = async () => {
  const _w = new Web3();
  return _w.eth.accounts.create();
}
//Recover account from seeds
const seedToAccount = (seed:string) => {
  const _w = new Web3();
  return _w.eth.accounts.privateKeyToAccount(seed);
}
//Base encryption with CBC-Pkcs7
const aesEncrypt = (message:any, key:any) => {
  const iv = CryptoJS.enc.Utf8.parse(key);
  key = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(message)),key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return Buffer.from(encrypted.toString()).toString('base64');
}
//Base decryption with same method
const decryptByDES = (ciphertext:any, key:any) => {
  const iv = CryptoJS.enc.Utf8.parse(key);
  key = CryptoJS.enc.Utf8.parse(key);
  ciphertext=Buffer.from(ciphertext,"base64").toString()
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});
  const ret = (decrypted.toString(CryptoJS.enc.Utf8)).split('"');
  return ret[1]
}
//Create a init link for a random address
const aesCreate = async (msg:any) => {
    const seed = await ranStr(DEFAULT_PASSWORDLENGTH);
    const ret =  await aesEncrypt(
      msg,
      seed
    )
    return {
      "data":ret,
      "key":seed
    }
}
/**
 * The rules of Url :
 * {origin}/{path}/{chainID}/{secretKey}/{Password}/{Message}
 */
const urlEncode = (data:any,msg:any) =>
{
  let str =  ''
  for (let i = 0 ; i < Object.keys(data).length ; i ++)
  {
    str+=data[Object.keys(data)[i]]+"/";
  }
  str+=msg+"/";
  return str;
}
const urlDecode = (pathname:string) =>
{
  let obj = {
    isEncrypt:true,
    privateKey:'',
    chainId:0,
    message:""
  };
  const param = pathname;
  if(pathname.length>1)
  {
    const _p = param.split("/");
    // console.log(_p)
    if(_p.length>0)
    {
      let chain = 0;
      let sec = "";
      let key = "";
      let msg = "";
      if(_p.length>2)
      {
        chain = Number(_p[1]);
      }
      if(_p.length>3)
      {
        sec = _p[2];
      }
      if(_p.length>=4)
      {
        key = _p[3];
      }
      if(_p.length>5)
      {
        msg = _p[4];
      }

      // console.log(sec,key)
      if(sec.length>0 && key.length>0)
      {
        //have encrypt . make ecrypt
       
        obj = {
          isEncrypt:true,
          privateKey:decryptByDES(sec,key),
          chainId:chain,
          message:msg
        }
      }else if (sec.length>0)
      {
        //not encrypt
        obj = {
          isEncrypt:false,
          privateKey:Buffer.from(sec,"base64").toString(),
          chainId:chain,
          message:msg
        }
      }
    }
  }
  return obj;
}
//Random Number String
const ranStr = async (length: number) =>   {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * Web3  Sign
 */
const signTxn = async (_w:EvmWallet,to:any,tx:any) => {
  const gas = await tx.estimateGas({from: _w.keypair.address});
  const gasPrice = (await _w._web3.eth.getGasPrice());
  const data = tx.encodeABI();
  const nonce = await _w._web3.eth.getTransactionCount(_w.keypair.address);
  return await _w._web3.eth.accounts.signTransaction(
      {
        to: to.address, 
        data,
        gas,
        gasPrice,
        nonce, 
        chainId: _w.chainId
      },
      _w.keypair.privateKey
    );
}

const signTxnValue = async (_w:EvmWallet,to:any,tx:any) => {
  const gas = await tx.estimateGas({values:to.value, from: _w.keypair.address});
  const gasPrice = (await _w._web3.eth.getGasPrice());
  const data = tx.encodeABI();
  const nonce = await _w._web3.eth.getTransactionCount(_w.keypair.address);
  return await _w._web3.eth.accounts.signTransaction(
      {
        to: to.address, 
        value:to.values,
        data,
        gas,
        gasPrice,
        nonce, 
        chainId: _w.chainId
      },
      _w.keypair.privateKey
    );
}



 /**
  * EVMLINK Class 
  * 
  * - Create new wallet in link
  * - Recover wallet by link
  */
export class EvmLink {
  url: URL;
  keypair: any;
  msg:string;
  chainId;
  //Init this object 
  private constructor(url: URL, keypair: any , msg:string , chainId:number) {
    this.url = url;
    this.keypair = keypair;
    this.msg = msg
    this.chainId = chainId
  }
  /**
   * Create a new wallet | new link
   * 
   * @param _path 
   * @param _origin 
   * @param _isEncrypt 
   * @param _chainId 
   * @param _msg 
   * @returns 
   */
  public static async create(_path:any,_origin:any,_isEncrypt:boolean,_chainId:number,_msg:any): Promise<EvmLink> {
    const link = new URL(_path+_chainId+"/",_origin);
    const _w = await randomAccount()
    const hashData = {
      isEncrypt : _isEncrypt,
      data : {}
    }
    if(_isEncrypt)
    {
      hashData.data = await aesCreate(_w.privateKey);
    }else{
      hashData.data = {
          data:Buffer.from(_w.privateKey).toString("base64"),
          key:""
      }
    }
    link.href+=urlEncode(hashData.data,Buffer.from(_msg).toString("base64"));
    const evmlink = new EvmLink(link, _w,Buffer.from(_msg).toString("base64"),_chainId);
    return evmlink;
  }

  /**
   * Recover from url
   * 
   * @param url 
   * @returns 
   */
  public static async fromUrl(url: URL): Promise<any> {
    const dec = urlDecode(url.pathname);
    let keypair ;
    try{
      keypair = seedToAccount(dec.privateKey);
    }catch(e)
    {
      console.log(e)
    }
    const evmlink = new EvmLink(url, keypair,dec.message,dec.chainId);
    return evmlink
  }
  public static async fromLink(link: string): Promise<EvmLink> {
    const url = new URL(link);
    return this.fromUrl(url);
  }


}

/**
 * EvmWallet model . To make a stander web base wallet
   * Wallet Model : 
   *  - Make this thing work like a fornt-end wallet 
   *  - Add contract call if nessary
   *  - Add signature 
   *  - Avoid input private key (But not likly possible)
 */
export class EvmWallet {
  keypair: any;
  provider: string;
  chainId:number;
  _web3:any;
  //Init this object 
  private constructor(sec:string,_p:string,_c:number) {
    this.keypair = seedToAccount(sec);
    this.provider = _p;
    this.chainId = _c;
    //Set the default provider
    this._web3 = new Web3(new Web3.providers.HttpProvider(_p))
  }
  //Get balance of this address
  public static async getBalance(sec:string,_p:string,_c:number): Promise<any> {
    let _w = new EvmWallet(sec,_p,_c) ;
    var balance =await _w._web3.eth.getBalance(_w.keypair.address,);
    return balance
  }
  //Do contract call
  public static async readContract(sec:string,_p:string,_c:number,_contract:any): Promise<any> {
    let _w = new EvmWallet(sec,_p,_c) ;
    var  Ctr = new _w._web3.eth.Contract(_contract.abi,_contract.address);
    var ret ; 
    await Ctr.methods[_contract.functionName](..._contract.method).call()
                .then(function(result:any){ 
                   ret = result;
            });
    return ret;
  }
  //Do contract send
  public static async writeContract(sec:string,_p:string,_c:number,_contract:any): Promise<any> {
    let _w = new EvmWallet(sec,_p,_c) ;
    const  Ctr = new _w._web3.eth.Contract(_contract.abi,_contract.address);
    const tx = Ctr.methods[_contract.functionName](..._contract.method);
    let _signedTx;
    if(_contract.value>0)
    {
      _signedTx = await signTxnValue(_w,_contract,tx);
    }else{
      _signedTx = await signTxn(_w,_contract,tx);
    }
    const receipt = await _w._web3.eth.sendSignedTransaction(_signedTx.rawTransaction);
    return receipt;
  }
}
