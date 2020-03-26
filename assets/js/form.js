function addBlockArticle (){
	var block = '<div class="other-article-container"><div class="form-group form-new-article"><span class="form-journal-icon"><span class="lnr lnr-text-align-justify"></span></span><input type="text" class="form-control form-control-alternative" placeholder="Nom du journal"><button class="btn btn-primary btn-neutral btn-fab btn-icon btn-round delete-button" type="button" onclick="deleteBlockArticle(this);"><span class="lnr lnr-trash"></span></button></div><div class="form-group form-new-article"><input type="text" class="form-control form-control-alternative" placeholder="Titre de l\'article"></div><textarea class="form-control form-control-alternative" rows="3" placeholder="Contenu de l\'article"></textarea><hr></div>';

	if ($('.other-article-container').length){
		$('.other-article-container').last().after(block);
	}
	else {
		$('.hr-start').last().after(block);
	}
}

function deleteBlockArticle (current){
	current.parentElement.parentElement.remove();
}