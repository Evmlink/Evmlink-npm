import _sodium from "libsodium-wrappers-sumo";
var tou8 = require('buffer-to-uint8array');
import Web3 from "web3";
import CryptoJS from 'crypto-js'

const DEFAULT_PASSWORDLENGTH = 4;

const randomAccount = async () => {
  var _w = new Web3();
  return _w.eth.accounts.create();
}

const seedToAccount = async (seed:string) => {
  var _w = new Web3();
  return _w.eth.accounts.privateKeyToAccount(seed);
}

const aesEncrypt = (message:any, key:any) => {
  var iv = CryptoJS.enc.Utf8.parse(key);
  key = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(message)),key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return Buffer.from(encrypted.toString()).toString('base64');
}

const decryptByDES = (ciphertext:any, key:any) => {
  var iv = CryptoJS.enc.Utf8.parse(key);
  key = CryptoJS.enc.Utf8.parse(key);
  ciphertext=Buffer.from(ciphertext,"base64").toString()
  var decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});
  var ret = (decrypted.toString(CryptoJS.enc.Utf8)).split('"');
  return ret[1]
}

const aesCreate = async (msg:any) => {
    var seed = await ranStr(DEFAULT_PASSWORDLENGTH);
    var ret =  await aesEncrypt(
      msg,
      seed
    )
    return {
      "data":ret,
      "key":seed
    }
}

const urlEncode = (data:any) =>
{
  var str =  ''
  for (var i = 0 ; i < Object.keys(data).length ; i ++)
  {
    str+=data[Object.keys(data)[i]]+"/";
  }
  return str;
}


const urlDecode = (data:string,origin:string) =>
{
  var obj = {
    isEncrypt:true,
    privateKey:''
  };
  var param = data.split(origin);
  if(param.length>1)
  {
    var _p = param[1].split("/");
    if(_p.length>0)
    {
      var msg = _p[1];
      var key = _p[2];
      if(msg.length>0 && key.length)
      {
        //have encrypt . make ecrypt
        obj = {
          isEncrypt:true,
          privateKey:decryptByDES(msg,key)
        }
      }else if (msg.length>0)
      {
        //not encrypt
        obj = {
          isEncrypt:false,
          privateKey:msg
        }
      }
    }
  }
  return obj;
}

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


export class EvmLink {
  url: URL;
  keypair: any;

  private constructor(url: URL, keypair: any) {
    this.url = url;
    this.keypair = keypair;
  }

  public static async create(_path:any,_origin:any,_isEncrypt:boolean): Promise<EvmLink> {
    const link = new URL(_path, _origin);
    var _w = await randomAccount()
    var hashData = {
      isEncrypt : _isEncrypt,
      data : {}
    }
    if(_isEncrypt)
    {
      hashData.data = await aesCreate(_w.privateKey);
    }else{
      hashData.data = {
          data:_w.privateKey,
          key:""
      }
    }
    link.href+=urlEncode(hashData.data);
    const evmlink = new EvmLink(link, _w);
    return evmlink;
  }


  public static async fromUrl(url: URL): Promise<EvmLink> {
    var dec = urlDecode(url.href,url.origin);
    var keypair ;
    try{
      keypair = seedToAccount(dec.privateKey);
    }catch(e)
    {
      console.log(e)
    }
    const evmlink = new EvmLink(url, keypair);
    return evmlink;
  }

  public static async fromLink(link: string): Promise<EvmLink> {
    const url = new URL(link);
    return this.fromUrl(url);
  }
}

