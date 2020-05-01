var file = document.getElementById('file-upload');
file.addEventListener('change', function() {
    var reader = new FileReader();
    var f = file.files[0];
    reader.onload = function(e) {
        var CSVARRAY = parseResult(e.target.result); //this is where the csv array will be
			
				createTable(CSVARRAY);
    };
    reader.readAsText(f);
});

function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function(row) {
        var rowArray = [];
        row.split("\t").forEach(function(cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });
    return resultArray;
}

function createTable(CSVARRAY) {
    var array = CSVARRAY;
    var content = "";
		var indexRow = 0;
		var indexColumn = 0;
    array.forEach(function(row) {
				indexRow = indexRow + 1;
				indexColumn = 0;
        content += "<tr>";
        row.forEach(function(cell) {
						indexColumn = indexColumn + 1;
						if (indexRow == 1) {
							content += "<th>" + cell + "</th>" ;
						}
						else {
							if(indexColumn == 1 || indexColumn == 2) {
								content += "<td class=\"name-articles\">" + cell + "</td>" ;
							}
							else if (indexColumn == 3){
								content += "<td><a href=\"#\" target=\"_blank\" class=\"clic-link\">" + cell + "</a></td>"; 
							}
							else if (indexColumn == 10 || indexColumn == 11) {
								content += "<td><mark class=\"valid-index\">" + cell + "</mark></td>" ;
							}
							else if (indexColumn > 5 && !!cell) {
								content += "<td><mark>" + cell + "</mark></td>" ;
							}
							else {
            		content += "<td>" + cell + "</td>" ;
							}
						}
        });
        content += "</tr>";
    });
    document.getElementById("table-content").innerHTML = content;
}