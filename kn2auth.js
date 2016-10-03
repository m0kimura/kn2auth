var Sp=require('speakeasy');
//var Qr=require('qrcode');
var Fs=require('fs');
var Kt={
  open: function(fpath){
    var me=this; if(fpath){me.path=fpath;}else{me.path="~/twofactor.auth";}
  },
//
  generate: function(){
    var me=this;
    var data=Sp.generateSecret(); Fs.writeFileSync(me.path, data);
  },
//
  showkey: function(type){
    var me=this; if(!type){type="base32";}
    var secret=JSON.parse(Fs.readFileSync(me.path));
    return secret[type];
  },
//
  qrcode: function(){
//    var me=this;
//    var secret=JSON.parse(Fs.readFileSync(me.path));
//    Qr.toDataURL(secret.otpauth_url, function(err, data_url){
//      console.log(data_url);
//      return '<img src="' + data_url + '">';
//    };
  },
//
  verify: function(token){
    var me=this;
    var secret=JSON.parse(Fs.readFileSync(me.path));
    return Sp.totp.verify({ secret: secret.base32, encoding: 'base32', token: token});
  },
//
  close: function(){}
};
module.export=Kt;
