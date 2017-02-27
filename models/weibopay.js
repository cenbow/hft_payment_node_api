/**
 * Created by linwei on 15-11-12.
 */
var url                 = require("url");
var querystring         = require("querystring");
var crypto              = require("crypto");
var fs                  = require("fs");
/*var ursa                = require('ursa');
var encoding            = require('encoding');*/
/**
 * 封装对外接口
 * MD5签名计算
 */
exports.md5 = function ( data ) {
    return md5(data)
};
/**
 * rsa 签名计算
 */
exports.rsa_sign=function(data,input_charset)
{
    return Rsa_SignMsg(data,input_charset);
};
/**
 * RSA加密
 */
exports.ecrypt=function(data)
{
    return Rsa_ecrypt(data);
};
/**
 * md5签名
 * @param data
 * @returns
 */
function md5(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}
/**
 * RSA签名
 * @param $data 需要计算签名的数据
 * @constructor
 */

function Rsa_SignMsg(data)
{
    var pem = fs.readFileSync(__dirname.split("\\").join("/")+'/../cert/rsa_sign_private.pem');
    var key = pem.toString('ascii');
    var sign = crypto.createSign('RSA-SHA1');
    sign.update(data);  // data from your file would go here
    var sig = sign.sign(key,'base64');
    return sig;
}
/**
 * 关键数据加密
 * @param data 需要加密的数据
 * @constructor
 */
function Rsa_ecrypt(data)
{
    var clientModulusBit    = 512;//秘钥长度
    var serverModulusBit    = 512;//秘钥长度
    var clientMaxBit        = clientModulusBit/8;
    var serverMaxBit        = serverModulusBit/8;
    var clientRealBit       = clientMaxBit - 11;
    var serverRealBit       = serverMaxBit - 11;
    var padding             = ursa.RSA_PKCS1_PADDING;
    var plain=data;//加密数据
    var start1 = 0;//开始位
    var end1   = clientRealBit;//结束位
    var result1 = '';
    var originBuff = new Buffer(plain);
    var originByte = bytes(plain, 'utf8');
    var crt = ursa.createPublicKey(fs.readFileSync(__dirname.split("\\").join("/")+'/../cert/rsa_sign_private.pem'));
    while(start1 < originByte){
        var originTmp  = originBuff.slice(start1, end1);
        result1 += crt.encrypt(originTmp, 'binary', 'binary', padding);
        start1 += clientRealBit;
        end1 += clientRealBit;
    }

    var encrypted =  encoding.convert(result1, 'binary', 'base64');
    console.log("=====:"+encrypted.toString());
    return encrypted.toString();
}
/**
 * 数据格式转换转为byte
 * @param text
 * @param coding
 * @returns {*}
 */
function bytes(text, coding) {
    if (typeof text === 'undefined') {
        throw new Error("must have a arg.");
    }

    coding = coding || 'utf8';
    return Buffer.byteLength(text.toString(), coding);
}

