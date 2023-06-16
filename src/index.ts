import Web3 from "web3";
import CryptoJS from 'crypto-js'

const DEFAULT_PASSWORDLENGTH = 4;

const randomAccount = async () => {
  const _w = new Web3();
  return _w.eth.accounts.create();
}

const seedToAccount = (seed:string) => {
  const _w = new Web3();
  return _w.eth.accounts.privateKeyToAccount(seed);
}

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
  //Init this object 
  private constructor(sec:string) {
    this.keypair = seedToAccount(sec);
  }

  
}
