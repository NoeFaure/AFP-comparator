function displayLogAction (status, message){
	// 2 paramaters allowed for status : success & erros
	if (status == 'success'){
		$("#iconLogAction").removeClass();
		$("#iconLogAction").addClass("has-success");
		$("#messageLogAction").text(message);
		$('#containerLogAction').hide().show();
	}
	else if(status == 'error'){
		$("#iconLogAction").removeClass();
		$("#iconLogAction").addClass("has-danger");
		$("#messageLogAction").text(message);
		$('#containerLogAction').hide().show();
	}
}


function actionCopy() {
  /* Get all the data and format */
	var i;
	var tableSize = 11;
	var copyText = "";
	var id;
	for (i = 1; i <= tableSize; i++) {
		id = '#tableFill' + i;
		// Manage link
		if (i == 3) {
			// Work for Google Doc Only
			copyText += '=LIEN_HYPERTEXTE(\"' + $(id).attr("href") + '\";"Clic")' + '\t';
		}
		else {
			copyText += $(id).text() + '\t';
		}
	}
	
	// Create a field to copy
	var textarea = document.createElement("textarea");
	textarea.id = id;
	// Place in top-left corner of screen regardless of scroll position.
	textarea.style.position = 'fixed';
	textarea.style.top = 0;
	textarea.style.left = 0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textarea.style.width = '1px';
	textarea.style.height = '1px';

	// We don't need padding, reducing the size if it does flash render.
	textarea.style.padding = 0;

	// Clean up any borders.
	textarea.style.border = 'none';
	textarea.style.outline = 'none';
	textarea.style.boxShadow = 'none';

	// Avoid flash of white box if rendered for any reason.
	textarea.style.background = 'transparent';
	document.querySelector("body").appendChild(textarea);
	existsTextarea = document.getElementById(id);
	
	// Select field
	existsTextarea.value = copyText;
 	existsTextarea.select();

  try {
        var status = document.execCommand('copy');
        if(!status){
            console.error("Cannot copy text");
        }else{
            console.log("The text is now on the clipboard");
						displayLogAction("success", "Le texte a été copié avec succès !");
        }
    } catch (err) {
        console.log('Unable to copy.');
    }
}

function exportCsv() {
	displayLogAction("error", "Cette fonction n'est pas encore disponible.");
}