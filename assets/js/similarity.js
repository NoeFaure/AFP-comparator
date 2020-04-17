// ======= Levenstein Algorithm =======
function levDist(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}

function pourcentageLevenstein(textA, textB) {
	var levDis = levDist(textA,textB);
	var bigger = Math.max(textA.length, textB.length);
	
	return (bigger - levDis)/bigger;
}
// ======= Jaccard Algorithm =======

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

function jaccard(a,b) {
	
	// Convert string in arrays
	a = a.split(" ");
	b = b.split(" ");
	
  var intersection = (intersect(a, b)).length;
  var union = a.length + b.length - intersection;
  var jacardIndex = (intersection / union)
  
	return jacardIndex;
}

// ======= Round =======

function round(number) {
	// round with one decimal
	number = number*100;
	number= Math.round(number * 10) / 10;
	
	return number;
}

// ======= Ratio Longest Substring =======
function ratioLongestString(longestSize, a, b){
	// return the ratio between the shortest text and the common substring size
	var smaller = Math.min(a.length, b.length);
	var ratio = longestSize/smaller;
	
	return ratio;
	
}

// ======= Similar Text Use =======
function similarTextRatio(a,b){
	var distance = similarText(a,b);
	var bigger = Math.max(a.length, b.length);
	var ratio = distance/bigger;
	
	return ratio;
}

function fillTable(nameDepeche, nameArticle, linkArticle, nameJournal, dateArticle, indexJaccard, indexLevenstein, similiRatio, ratioLongest, longestCommonStringSize){
	$("#tableFill1").text(nameDepeche);
	$("#tableFill2").text(nameArticle);
	$("#tableFill3").attr("href", linkArticle);
	$("#tableFill4").text(nameJournal);
	$("#tableFill5").text(dateArticle);
	$("#tableFill6").text(indexJaccard + '%');
	$("#tableFill7").text(indexLevenstein + '%');
	$("#tableFill8").text(similiRatio + '%');
	$("#tableFill9").text(ratioLongest + '%');
	$("#tableFill10").text(longestCommonStringSize);
}

// ======= Pre-treatment =======
function preTreatment(a) {
	// Delete all cariage return
	a = a.replace(/[\n\r]+/g, ' ');
	// Homogenize quote
	a = a.replace(/[»]+/g, '\"');
	a = a.replace(/[«]+/g, '\"');
	// To lowercase
	a = a.toLowerCase()
	
	return a;
}


// ======= Show Results =======

function actionSimilarity(){
	var nameDepeche = $("#titreAfp").val();
	var nameArticle = $("#titreArticle").val();
	
	// Get content of the article and add the title
	var firstArticle = $("#content1").val() + nameDepeche;
	var secondArticle = $("#content2").val() + nameArticle;
	
	//Homogeneity
	firstArticle = preTreatment(firstArticle);
	secondArticle = preTreatment(secondArticle);
	
	var indexLevenstein = pourcentageLevenstein(firstArticle, secondArticle);
	var indexJaccard = jaccard(firstArticle, secondArticle);
	var longestCommonString = longestCommonSubstring(firstArticle, secondArticle);
	var longestCommonStringSize = longestCommonString.length;
	var ratioLongest = ratioLongestString(longestCommonStringSize, firstArticle, secondArticle);
	var similiRatio = similarTextRatio(firstArticle, secondArticle);
	
	//Longest common substring
	$("#longestString").text(longestCommonString);
	$("#sizeLongestString").text(longestCommonStringSize);
	
	// Put in pourcentage and round the number
	indexLevenstein = round(indexLevenstein);
	indexJaccard = round(indexJaccard);
	ratioLongest = round(ratioLongest);
	similiRatio = round(similiRatio);
	
	//Scroll top
	$("html, body").animate({ scrollTop: 0 }, "slow");
	
	// Change index
	$("#levenshtein-index").text(indexLevenstein);
	$("#levenshtein-progress").attr('data-value',indexLevenstein);
	
	$("#jaccard-index").text(indexJaccard);
	$("#jaccard-progress").attr('data-value',indexJaccard);
	
	$(".longest-string-ratio").text(ratioLongest + "%");
	
	$("#similitude-index").text(similiRatio);
	$("#similitude-progress").attr('data-value',similiRatio);
	
	// Draw graph
	traceProgresssBar();
	
	// Fill Table
	var linkArticle = $("#linkArticle").val();
	var journalName = $("#journalName").val();
	var dateArticle = $("#dateArticle").val();
	fillTable(nameDepeche, nameArticle, linkArticle, journalName, dateArticle, indexJaccard, indexLevenstein, similiRatio, ratioLongest, longestCommonStringSize);
	
	// Show figures
	$('#figures').hide().slideToggle("slow");
	
}