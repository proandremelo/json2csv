function convert(){
    var file = document.getElementById("inputFile").files[0];
    var text = document.getElementById("inputText").value;
    var reader = new FileReader();
    // console.log("File : " + file);
    // console.log("Text : " + text);
    try{
        reader.readAsText(file);
        reader.addEventListener("load", () => {
            if(text == ""){
                if(getInputOption() == "JSON"){
                    try {
                        convertJSON(reader.result);        
                    }catch(error){
                        console.log(error);
                    }
                }else{
                    convertCSV(reader.result);
                }
            }else{
                alert("One input at a time. Text of file.");
            }
        });
    }catch(e){
        console.log(e);
        if(getInputOption() == "JSON"){
            convertJSON(text);
        }else{
            convertCSV(text);
        }
    }
    
}

function getInputOption(){
    return document.querySelectorAll("select")[0].value;
}

function convertJSON(inputelem){
    var jsonObj = {}
    try{
        jsonObj = JSON.parse(inputelem);
    }catch(error){
        alert(error);
    }
    var csvResult = "";
    csvResult += Object.keys(jsonObj);
    csvResult += "\n";
    csvResult += Object.values(jsonObj);
    document.getElementById("output").value = csvResult;
}

function convertCSV(inputelem){
    var csvArray = inputelem.split("\r\n");
    var keyArray = csvArray[0].split(",");
    var valueArray = csvArray[1].split(",");
    var jsonResult = new Object();
    var klen = getLength(keyArray);
    var vlen = getLength(valueArray);
    if(klen == vlen){
        for(var i = 0; i < klen; i++){
            jsonResult[keyArray[i]] = valueArray[i];
        }
    }else{
        alert("Column size different than values");
    }
    document.getElementById("output").value = JSON.stringify(jsonResult);
}

function getLength(Obj){
    var len = 0;
    for(item in Obj){
        len++;
    }
    return len;
}

function clearInput(){
    document.getElementById("inputText").value = "";
}

function clearOutput(){
    document.getElementById("output").value = "";
}