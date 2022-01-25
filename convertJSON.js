var fileImport = document.getElementById('csv');
var headers = [];
var lines = [];
var obj = {};
var propObj = {};

fileImport.addEventListener('change', function (e) {
    const file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function () {
        // catch if input file error
        try {
            const text = fileReader.result;
            lines = text.split('\n');
            headers = lines[0].split(',');
            lines.splice(lines.length - 1, 1);
            if (headers.length <= 3) {
                for (let i = 1; i < lines.length; i++) {

                    const currentline = lines[i].split(",");
                    const preline = lines[i - 1].split(",");
                    if (currentline[0] === '\"\"') {
                        obj[currentline[1]] = currentline[2];
                    } else {
                        if (currentline[0] !== preline[0]) {
                            console.log("add" + currentline[0] + currentline[1]);
                            propObj = {};
                        }
                        propObj[currentline[1]] = currentline[2];
                        obj[currentline[0]] = propObj;
                    }

                }

            }
            else {

            }
            document.getElementById("resultJSON").innerHTML = text;
        } catch (e) {
            console.error(e.message);
            alert("input file error");
        }
    }
    document.getElementById("resultJSON").innerHTML = "";
});

function convertToJSON() {
    console.log(obj);


    // let blob = new Blob([csvStr], { type: 'text/csv' });

    // link.href = URL.createObjectURL(blob);
}

