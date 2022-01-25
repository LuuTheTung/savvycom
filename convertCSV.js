var cloneObject = {};
var csvStr = [];
var JsonFields = ["prefix", "label"];
var fileImport = document.getElementById('json');
var arrJSON = [];
// import and read file
fileImport.addEventListener('change', function (e) {
    const files = e.currentTarget.files;
    Object.keys(files).forEach(i => {
        const file = files[i];
        let locale = file.name.indexOf('.');
        JsonFields.push(file.name.substr(0, locale));
        csvStr = JsonFields.join(",") + "\n";
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = function () {
            // catch if input file error
            try {
                parsedJSON = JSON.parse(fileReader.result);
                // push into array
                arrJSON.push(parsedJSON);
            } catch (e) {
                console.error(e.message);
                alert("input file error");
            }
        }
       
    });
    document.getElementById("result").innerHTML = "";
    cloneObject = Object.create(null);
});

let convert = () => {
    cloneObject = Object.assign({}, arrJSON[0]);
    if(arrJSON.length <= 1 ){
        for (const property in cloneObject) {
            if (typeof cloneObject[property] == "string") {
                csvStr += '\'\' ,' + property + ',' + cloneObject[property] + "\n";
            }
            if (typeof cloneObject[property] == "object") {
                for (const subProperty in cloneObject[property]) {
                    csvStr += property + ',' + subProperty + ',' + cloneObject[property][subProperty] + "\n";
                }
            }
        }
    }
    else {
        for(let i = 1; i<arrJSON.length; i++){ 
            for (const property in cloneObject) {
                if (typeof cloneObject[property] == "string") {
                    if (cloneObject.hasOwnProperty(property) != arrJSON[i].hasOwnProperty(property)) {
                        cloneObject[property] = cloneObject[property] + ', ' + arrJSON[0][property];
                    }
                    else {
                        cloneObject[property] = cloneObject[property] + ', ' + arrJSON[i][property];
                    };
                }  
                if (typeof cloneObject[property] == "object") {
                    if (cloneObject.hasOwnProperty(property) != arrJSON[i].hasOwnProperty(property)) {
                        cloneObject[property] = arrJSON[i][property];
                    }
                    else {
                        for (const subProperty in cloneObject[property]) {
                            if (cloneObject[property].hasOwnProperty(subProperty) != arrJSON[i][property].hasOwnProperty(subProperty)) {
                                cloneObject[property][subProperty] = cloneObject[property][subProperty] + ', ' + arrJSON[0][property][subProperty];
                            }
                            else {
                                cloneObject[property][subProperty] = cloneObject[property][subProperty] + ', ' + arrJSON[i][property][subProperty];
                            }
                        }
                    };
                }             
            }
        }
        for (const property in cloneObject) {
            if (typeof cloneObject[property] == "string") {
                csvStr += '\'\' ,' + property + ',' + cloneObject[property] + "\n";
            }
            if (typeof cloneObject[property] == "object") {
                for (const subProperty in cloneObject[property]) {
                    csvStr += property + ',' + subProperty + ',' + cloneObject[property][subProperty] + "\n";
                }
            }
        }
    }
}

function convertToCSV() {
    convert();
    document.getElementById("result").innerHTML = csvStr;
    let blob = new Blob([csvStr], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
}

