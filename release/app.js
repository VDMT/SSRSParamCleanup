var sampleInput = "";
// First delimeter is "&" value inside has <key=value,value> sequence
// so eg. key=value&key=value,value
// each key, value is a "Parameter"
// a Parameter can have 1 or more values
function Clean(input) {
    var parameters = input.split("&");
    var idxObj = new IdxObject();
    var iterator = 0;
    for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
        var i = parameters_1[_i];
        var keyValueRow = i.split("=");
        idxObj.Set(keyValueRow[0], keyValueRow[1]);
        iterator++;
    }
    // format output
    var output = "";
    for (var i = 0; i <= idxObj.keys; i++) {
        if (i == 0) {
            // regex to detect if value should be treated as character literal
            if (/[^$,\.\d]/.test(idxObj.valStore[i])) {
                output += "@" + idxObj.keyStore[i] + "=\'" + idxObj.valStore[i] + "\'";
            }
            else {
                output += "@" + idxObj.keyStore[i] + "=" + idxObj.valStore[i] + "";
            }
        }
        else {
            if (/[^$,\.\d]/.test(idxObj.valStore[i])) {
                output += "\r\n, @" + idxObj.keyStore[i] + "=\'" + idxObj.valStore[i] + "\'";
            }
            else {
                output += "\r\n, @" + idxObj.keyStore[i] + "=" + idxObj.valStore[i] + "";
            }
        }
    }
    output += "";
    return output;
}
var IdxObject = (function () {
    function IdxObject() {
        this.keyStore = [];
        this.valStore = [];
        this.keys = -1;
    }
    IdxObject.prototype.Set = function (key, val) {
        // if key exists 
        if (this.keyStore.indexOf(key) > -1) {
            var existingVal = this.valStore[this.keys];
            this.valStore[this.keys] = existingVal + "," + val;
        }
        else {
            this.keys++;
            this.keyStore[this.keys] = key;
            this.valStore[this.keys] = val;
        }
    };
    return IdxObject;
}());
