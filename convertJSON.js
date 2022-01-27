var fileImport = document.getElementById('csv');
var headers = [];
var lines = [];
var obj = {};
var propObj = {};
var arrObj = [];
var arrObjName = [];
fileImport.addEventListener('change', function (e) {
    const file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function () {
        // catch if input file error
        try {
            const text = fileReader.result;

            document.getElementById("resultJSON").innerHTML = text;
            lines = text.split('\n');
            // read first line to get header
            headers = lines[0].replace(/(\r\n|\n|\r)/gm, "").split(',');
            // remove last blank line
            lines.splice(lines.length - 1, 1);
            if (headers.length <= 3) { //if header is prefix,label,en ...
                for (let i = 1; i < lines.length; i++) {
                    const currentline = lines[i].replace(/(\r\n|\n|\r)/gm, "").split(",");
                    const preline = lines[i - 1].split(",");

                    if (currentline[0] === '\"\"') {//if prefix is ""
                        obj[currentline[1]] = currentline[2];
                    } else {
                        if (currentline[0] !== preline[0]) {
                            propObj = {};
                        }
                        propObj[currentline[1]] = currentline[2];
                        obj[currentline[0]] = propObj;
                    }

                }
                arrObjName.push(headers[2]);
                arrObj.push(obj);
            }
            else { //if header is prefix,label,en, vi, ...
                for (let i = 2; i < headers.length; i++) {
                    obj = {};
                    const element = headers[i];

                    for (let j = 1; j < lines.length; j++) {
                        const currentline = lines[j].split(",");
                        const preline = lines[j - 1].split(",");
                        if (currentline[0] === '\"\"') {
                            obj[currentline[1]] = currentline[i];
                        } else {
                            if (currentline[0] !== preline[0]) {
                                propObj = {};
                            }
                            propObj[currentline[1]] = currentline[i];
                            obj[currentline[0]] = propObj;
                        }
                    }

                    arrObjName.push(element);
                    arrObj.push(obj);
                }
            }
            
        } catch (e) {
            alert(e.name); 
            alert(e.message); 
        }
    }
    document.getElementById("resultJSON").innerHTML = "";
});

function convertToJSON() {
    for (var i = 0; i < arrObjName.length; i++) {
        // create file name
        const para = document.createElement("p");
        para.innerHTML = arrObjName[i]+".json";
        document.getElementById("fileCreated").appendChild(para);

        //file content and implement <a>
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrObj[i]));

        var a = document.createElement('a');
        var btnId = arrObjName[i];
        
        a.setAttribute("id", "a"+btnId);
        a.setAttribute("hidden", true);
        a.href = 'data:' + data;
        a.download = arrObjName[i] + '.json';
        a.innerHTML = 'download JSON';
        document.getElementById("fileCreated").appendChild(a);

        // create button download
        const btn = document.createElement("button");
        btn.innerHTML = "Download";
        btn.className = "btn btn-success";
        btn.setAttribute("id", btnId);
        
        document.getElementById("fileCreated").appendChild(btn);
        

    }
    var buttons = document.getElementsByTagName("button");
    var buttonsCount = buttons.length;
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            console.log(document.getElementById("a"+this.id));
            document.getElementById("a"+this.id).click();
        };
    }
}
