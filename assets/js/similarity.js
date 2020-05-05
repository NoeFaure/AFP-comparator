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
  
	// Temporary fix
	if (jacardIndex > 1) {
		return 1;
	}
	else {
		return jacardIndex;
	}
	
}

// ======= Round =======

function round(number) {
	// round with one decimal
	number = number*100;
	number= Math.round(number * 10) / 10;
	
	// Check the existance of the ratio
	if (isNaN(number)) {
		return(0.0);
	}
	else {
		return number;
	}
}

// ======= Ratio Longest Substring =======
function ratioLongestString(longestSize, a, b){
	// return the ratio between the shortest text and the common substring size
	var smaller = Math.min(a.length, b.length);
	var ratio = longestSize/smaller;
	
	return ratio;
	
}

// ======= Calculator Substring =======
function generateSubstrings(seuil, textA, textB){
	var content1 = textA;
	var content2 = textB;
	var ratioSubstring = round(ratioLongestString(lengthSubstring, textA, textB));
	var index = 1;
	var block;
	
	var substring = longestCommonSubstring(textA, textB);
	var lengthSubstring = substring.length;
	
	while (substring.length >= seuil) {	
		
		if (index != 1) {
			// Append to the body
			block = '<hr class="hr-progress"><div class="longestSubtringsIteration"><h6><span class="sizeLongestString size">' + lengthSubstring + '</span><span class="longest-string-ratio">' + ratioSubstring + '%</span>' + index + 'ème séquence commune la plus longue :</h6><p><mark class="longestString">' + substring + '</mark></p></div>';

			$('.longestSubtringsIteration').last().after(block);
		}
		
		// Remove previous common substring
		content1 = content1.replace(substring, '');
		content2 = content2.replace(substring, '');
		index = index + 1;
		
		// Re-compute the substring
		substring = longestCommonSubstring(content1, content2);
		
		// Compute informations
		lengthSubstring = substring.length;
		ratioSubstring = round(ratioLongestString(lengthSubstring, textA, textB));
		
	}
}


// ======= Similar Text Use =======
function similarTextRatio(a,b){
	var distance = similarText(a,b);
	var bigger = Math.max(a.length, b.length);
	var ratio = distance/bigger;
	
	return ratio;
}

// ======= Sum up content of same class =======
function sumUpClass(nameClass) {
	var sum = 0;
	$("." + nameClass).each(function(){
			sum += parseFloat($(this).text());
	})
	
	// Round
	sum = sum*10;
	sum = Math.round(sum);
	sum = sum/10;
	
	return sum;
}

function fillTable(nameDepeche, nameArticle, linkArticle, nameJournal, dateArticle, indexJaccard, indexLevenstein, similiRatio, ratioLongest, longestCommonStringSize, indexJaroWinkler){
	$("#tableFill1").text(nameDepeche);
	$("#tableFill2").text(nameArticle);
	$("#tableFill3").attr("href", linkArticle);
	$("#tableFill4").text(nameJournal);
	$("#tableFill5").text(dateArticle);
	$("#tableFill6").text(indexJaccard + '%');
	$("#tableFill7").text(indexLevenstein + '%');
	$("#tableFill8").text(similiRatio + '%');
	$("#tableFill9").text(indexJaroWinkler + '%');
	$("#tableFill10").text(sumUpClass('longest-string-ratio') + '%');
	$("#tableFill11").text(sumUpClass('sizeLongestString'));
}

// ======= Pre-treatment =======
function preTreatment(a) {
	// Delete all cariage return
	a = a.replace(/[\n\r]+/g, ' ');
	// Homogenize quote
	a = a.replace(/[»]+/g, '\"');
	a = a.replace(/[«]+/g, '\"');
	a = a.replace(/[’]+/g, '\'');
	a = a.replace(/[‘]+/g, '\'');
	a = a.replace(/[“]+/g, '\"');
	a = a.replace(/[”]+/g, '\"');
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
	var jaroWinklerRatio = jaro_winkler(firstArticle, secondArticle);
	
	//Longest common substring
	$(".longestString").text(longestCommonString);
	$(".sizeLongestString").text(longestCommonStringSize);
	
	// Put in pourcentage and round the number
	indexLevenstein = round(indexLevenstein);
	indexJaccard = round(indexJaccard);
	ratioLongest = round(ratioLongest);
	similiRatio = round(similiRatio);
	indexJaroWinkler = round(jaroWinklerRatio);
	
	//Scroll top
	$("html, body").animate({ scrollTop: 0 }, "slow");
	
	// Change index
	$("#levenshtein-index").text(indexLevenstein);
	$("#levenshtein-progress").attr('data-value',indexLevenstein);
	
	$("#jaccard-index").text(indexJaccard);
	$("#jaccard-progress").attr('data-value',indexJaccard);
	
	$("#jaroWinklerIndex").text(indexJaroWinkler);
	$("#JaroWinklerProgress").attr('data-value',indexJaroWinkler);
	
	$(".longest-string-ratio").text(ratioLongest + "%");
	
	$("#similitude-index").text(similiRatio);
	$("#similitude-progress").attr('data-value',similiRatio);
	
	// Generate substrings
	var seuil = $('#seuil').val();
	seuil = Number(seuil);
	generateSubstrings(seuil, firstArticle, secondArticle);
	
	// Draw graph
	traceProgresssBar();
	
	// Fill Table
	var linkArticle = $("#linkArticle").val();
	var journalName = $("#journalName").val();
	var dateArticle = $("#dateArticle").val();
	fillTable(nameDepeche, nameArticle, linkArticle, journalName, dateArticle, indexJaccard, indexLevenstein, similiRatio, ratioLongest, longestCommonStringSize, indexJaroWinkler);
	
	// Show figures
	$('#figures').hide().slideToggle("slow");
	
}