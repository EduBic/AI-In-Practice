(function(matrixGenerator) {

    matrixGenerator.printMat = function(divId, matrix2d) {
        let container = document.getElementById(divId);

        let tableUI = document.createElement("table");
        tableUI.className += "matrix-table";
        container.appendChild(tableUI);

        for (let r = -1; r < matrix2d.length; r++) {
            let rowUI = document.createElement("tr");
            tableUI.appendChild(rowUI);

            if (r < 0) {
                for (let i = -1; i < matrix2d[0].length; i++) {
                    let elemUi = document.createElement("th");
                    let textUi = document.createTextNode(i < 0 ? "" : i);
    
                    elemUi.appendChild(textUi);
                    rowUI.appendChild(elemUi);
                }
            } else {
                for (let c = -1; c < matrix2d[r].length; c++) {
                    if (c < 0) {
                        let elemUi = document.createElement("th");
                        let textUi = document.createTextNode(r);
        
                        elemUi.appendChild(textUi);
                        rowUI.appendChild(elemUi);
                    } else {
                        let elemUi = document.createElement("td");
                        let textUi = document.createTextNode(matrix2d[r][c]);
        
                        elemUi.appendChild(textUi);
                        rowUI.appendChild(elemUi);
                    }
                }
            }
        }

        // matrix2d.forEach(row => {
        //     let rowUI = document.createElement("tr");
        //     tableUI.appendChild(rowUI);

        //     row.forEach(elem => {
        //         let elemUi = document.createElement("td");
        //         let textUi = document.createTextNode(elem);

        //         elemUi.appendChild(textUi);
        //         rowUI.appendChild(elemUi);
        //     })
        // });
    }



}(window.matrixGenerator = window.matrixGenerator || {}));