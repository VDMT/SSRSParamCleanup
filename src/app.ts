
let sampleInput = "";

// First delimeter is "&" value inside has <key=value,value> sequence
// so eg. key=value&key=value,value
// each key, value is a "Parameter"
// a Parameter can have 1 or more values
function Clean(input : String)
{
    let parameters = input.split("&");
    let idxObj = new IdxObject();
    let iterator : number = 0;
    for (let i of parameters)
    {
        let keyValueRow = i.split("=");
        idxObj.Set(keyValueRow[0], keyValueRow[1]);        
        iterator++;
    }

    // format output
    let output : string = "";
    for (let i=0; i<=idxObj.keys; i++)
    {
        if (i==0)
        {
            // regex to detect if value should be treated as character literal
            if (/[^$,\.\d]/.test(idxObj.valStore[i]))
            {
                output += "@" + idxObj.keyStore[i] + "=\'" + idxObj.valStore[i] + "\'";
            }
            else
            {
                output += "@" + idxObj.keyStore[i] + "=" + idxObj.valStore[i] + "";                
            }
            
        }
        else
        {
            if (/[^$,\.\d]/.test(idxObj.valStore[i]))
            {
                output += "\r\n, @" + idxObj.keyStore[i] + "=\'" + idxObj.valStore[i] + "\'";
            }
            else 
            {
                output += "\r\n, @" + idxObj.keyStore[i] + "=" + idxObj.valStore[i] + "";
            }
        }
    }
    output += "";
    return output;
} 

class IdxObject
{
    keyStore = [];
    valStore = [];
    keys : number;
    
    constructor() { 
        this.keys = -1; 
    }
    
    Set(key, val) {
        // if key exists 
        if (this.keyStore.indexOf(key)>-1)
        {
            var existingVal = this.valStore[this.keys];
            this.valStore[this.keys] = existingVal + "," + val;
        }
        else 
        {
            this.keys++;
            this.keyStore[this.keys] = key;
            this.valStore[this.keys] = val;
        }
    }
}
