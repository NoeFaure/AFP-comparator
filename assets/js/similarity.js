function pourcentageLevenstein(textA, textB) {
	
	// Addtionial treatments
	textA = textA.replace(/[']+/g, ' ');
	textB = textB.replace(/[']+/g, ' ');
	
	textA = textA.replace(/[.]+/g, '');
	textB = textB.replace(/[.]+/g, '');
	
	textA = textA.replace(/[,]+/g, '');
	textB = textB.replace(/[,]+/g, '');
	
	// Convert string in arrays
	textA = textA.split(" ");
	textB = textB.split(" ");
	
	var levDis = levDist(textA,textB);
	var bigger = Math.max(textA.length, textB.length);
	
	return (bigger - levDis)/bigger;
}
// ======= Jaccard Algorithm =======

function intersect(a, b){
	var common = [];
	
	for(var i=0 ; i<a.length ; ++i) {
    for(var j=0 ; j<b.length ; ++j) {
      if(a[i] == b[j]) {
        common.push(b[j]);
				// Remove element
        index = b.indexOf(b[j]);
        b.splice(index, 1);
				break;
      }
    }
  }
	return common;
}

function jaccard(a,b) {
	
	// Addtionial treatments
	a = a.replace(/[']+/g, ' ');
	b = b.replace(/[']+/g, ' ');
	
	a = a.replace(/[.]+/g, '');
	b = b.replace(/[.]+/g, '');
	
	a = a.replace(/[,]+/g, '');
	b = b.replace(/[,]+/g, '');
	
	// Convert string in arrays
	a = a.split(" ");
	b = b.split(" ");
	
	//console.log(intersect(a, b));
  var intersection = intersect(a, b).length;
  var union = a.length + b.length;
	var jacardIndex = (intersection / union);
	
	/*
	alert("a ("+ a.length +"): " + a);
	alert("b ("+ b.length +"): " + b);
	alert("intersecteion : " + intersection);
	alert("union : " + union);*/
	
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