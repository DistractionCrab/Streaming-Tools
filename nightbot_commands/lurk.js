$(eval 

var values = "$(urlfetch https://pastebin.com/raw/97V99DAf) ".split(",");
var choose = Math.floor(Math.random() * values.length);

`$(user) used chameleon to transform into ${values[choose]}`)
