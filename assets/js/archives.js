$(function(){
	// Ici, le DOM est entièrement défini
	// On peut y mettre le code de traitement
	console.log("Ca marche !");
	
	var fascicules_illustration_xml = null;
	var numero_fascicule = 0; // indice du premier fascicule
	var numero_page = 1;
	var liste_des_annees = "https://gallica.bnf.fr/ark:/12148/cb34349566r/date"
	//var url_base_image = "https://gallica.bnf.fr/ark%3A%2F12148%2Fbd6t59877590/f118.thumbnail";
	var url_base_image = "https://gallica.bnf.fr/ark%3A%2F12148%2F";
	var year = "https://gallica.bnf.fr/services/Issues?ark=ark%3A%2F12148%2Fcb34349566r%2Fdate&date=1947";
	var code_ark = null;
	var url_image_page_fascicule = null;
	var date = null;
	var nombre_de_fascicules = null;
	var page_choisis = null;
	
	$.ajax({
		url: "https://raw.githubusercontent.com/Claire-As/LevantArchivesV3/main/annuairesv3.xml",
		type: "GET",
		data: "",
		dataType: "xml",
		success: traitement
	});
	function traitement(data) {

		console.log(data);
		
		// Récupération des données dans le XML
		fascicules_illustration_xml = $(data).find("issue");
		
		// Détermination du nombre de fascicules
		// Récupération du code ARK dans le XML
		// Récupération du de la DATE dans le XML
		// On crée l'URL
		// Récupération de la page choisis dans l'XML

		nombre_de_fascicules = $(fascicules_illustration_xml["length"])[0];
		code_ark = $(fascicules_illustration_xml[numero_fascicule]).attr("ark");
		date = $(fascicules_illustration_xml[numero_fascicule]).text();
		url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
		page_choisis = $(fascicules_illustration_xml[numero_fascicule]).attr("page");

		console.log("Nb fascicules : " + nombre_de_fascicules);
		console.log("code ark : " + code_ark);
		console.log("date : " + date);
		console.log("page choisis : " + page_choisis);
		
		// On met l'IMG dans le HTML et son URL
		image_page_fascicule = $('<img src="" alt="Page du fascicule">');
		image_page_fascicule.attr("src", url_image_page_fascicule);

		// On affiche tout dans l'HTML
		$("#image_illustration img").attr("src", url_image_page_fascicule);
		$("#date_fascicule").text(date);
		$("#numero_page").text("Page : " + numero_page);
		$("#listPages").text(page_choisis);

		
		/*************** Creation d'un tableau avec les dates *************/

		// on loop sur les date dans le XML qu'on met dans un tableau
		var tabDatesFasicules = [];
		var i = 0;

		while (i < nombre_de_fascicules) {
			var fasciculeInfo = $(fascicules_illustration_xml[i]).text();
			tabDatesFasicules.push(fasciculeInfo);
			i++;
		}
		console.log(tabDatesFasicules);

		// on affiche les DATES dans l'HTML
		var datesContainer = $('<div>');

		for (var i = 0; i < tabDatesFasicules.length; i++) {
			var date = tabDatesFasicules[i];
			var dateElement = $('<p>').text(date);
			datesContainer.append(dateElement);
			dateElement.addClass('dateItem');
		}
		// Ajout du conteneur contenant toutes les dates a l'HTML
		$('#dateList').append(datesContainer);

	}

	/****************   		FLECHE DE DROITE	    ****************/

	$("#fleche_droite").on("click", page_suivante);
	function page_suivante(){

		// on met la fleche gauche à l'état normal
		$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");

		// on change de page
		numero_page = numero_page + 1;

		// on affiche la nouvelle page
		url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
		$("#image_illustration img").attr("src", url_image_page_fascicule);
		$("#numero_page").text("Page : " + numero_page);

		/****AUDIO *****/
		var audio = new Audio(); 
        audio.src = 'assets/audio/page.mp3'; 
        audio.play(); 
		console.log("play");

	}

	/****************   		FLECHE DE GAUCHE	    ****************/
	
	$("#fleche_gauche").on("click", page_precedante);
	function page_precedante(){
		if(numero_page==1){
			$("#fleche_gauche img").attr("src", "assets/img/stop.png");
			console.log("avant");

			/****AUDIO *****/
			var audio = new Audio(); 
			audio.src = 'assets/audio/stop.mp3'; 
			audio.play(); 
			console.log("play");

		}else{
			$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");
			numero_page = numero_page - 1;
			url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
			$("#image_illustration img").attr("src", url_image_page_fascicule);
			$("#numero_page").text("Page : " + numero_page);
	
			/****AUDIO *****/
			var audio = new Audio(); 
			audio.src = 'assets/audio/page.mp3'; 
			audio.play(); 
			console.log("play");
		}
	}
	
	/****************   		FLECHE DU BAS	    ****************/

	$("#fleche_basse").on("click", fascicule_suivant);
	function fascicule_suivant(){

		$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");
		numero_page = 1;
		if(numero_fascicule != nombre_de_fascicules-1){
			numero_fascicule = numero_fascicule + 1;
			console.log("on arrive a la fin");
		}else{
			numero_fascicule = 0;
			console.log("on retourne a 0");
		}

		code_ark = $(fascicules_illustration_xml[numero_fascicule]).attr("ark");
		date = $(fascicules_illustration_xml[numero_fascicule]).text();
		url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
		page_choisis = $(fascicules_illustration_xml[numero_fascicule]).attr("page");
		
		$("#image_illustration img").attr("src", url_image_page_fascicule);
		$("#date_fascicule").text(date);
		$("#numero_page").text("Page : " + numero_page);
		$("#listPages").text(page_choisis);

		/****AUDIO *****/
		var audio = new Audio(); 
        audio.src = 'assets/audio/grande_page.mp3'; 
        audio.play(); 
		console.log("play");
	}
	
/****************   		FLECHE DU HAUT	    ****************/

	$("#fleche_haute").on("click", fascicule_precedant);
	function fascicule_precedant(){

		$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");
		numero_page = 1;
		if(numero_fascicule != 0){
			numero_fascicule = numero_fascicule - 1;
			console.log("on arrive a la fin");
		}else{
			numero_fascicule = nombre_de_fascicules-1 // permet de retrouver le dernier indice
			console.log("on retourne a 0");
		}

		code_ark = $(fascicules_illustration_xml[numero_fascicule]).attr("ark");
		date = $(fascicules_illustration_xml[numero_fascicule]).text();
		url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
		page_choisis = $(fascicules_illustration_xml[numero_fascicule]).attr("page");


		$("#image_illustration img").attr("src", url_image_page_fascicule);
		$("#date_fascicule").text(date);
		$("#numero_page").text("Page : " + numero_page);
		$("#listPages").text(page_choisis);

		/****AUDIO *****/
		var audio = new Audio(); 
        audio.src = 'assets/audio/grande_page.mp3'; 
        audio.play(); 
		console.log("play");
	}

	/**************** ON CHANGE EN FONCTION DE LA PAGE PROPOSEES ****************/

	$("#listPages").on("click", pageClique);
	function pageClique(){
		$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");

		var pageChoisis = $(this).text();
		var pageChoisis = parseInt(pageChoisis);
		numero_page = pageChoisis;

		/* CHANGEMENT PAGE */
		url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
		$("#image_illustration img").attr("src", url_image_page_fascicule);
		$("#numero_page").text("Page : " + numero_page);

		/**** AUDIO *****/
		var audio = new Audio(); 
        audio.src = 'assets/audio/page.mp3'; 
        audio.play(); 
		console.log("play");
	}

	/**************** ON CHANGE DE FASICULE EN FONCTION DE L'ANNEE ****************/

	$('#dateList').on('click', '.dateItem', afficherFasciculeAnnee);
	function afficherFasciculeAnnee() {
		var annee_choisie = $(this).text();
		var annee_choisie = parseInt(annee_choisie);

		// Recherche du fascicule correspondant à l'année cliquée
		var fasciculeIndex = trouverFasciculeParAnnee(annee_choisie);

		// Utilisation de l'index de fascicule trouvé pour charger les informations du fascicule
		if (fasciculeIndex !== null) {
			$("#fleche_gauche img").attr("src", "assets/img/chevron_gauche.png");
			numero_fascicule = fasciculeIndex;
			numero_page = 1;
			code_ark = $(fascicules_illustration_xml[numero_fascicule]).attr("ark");
			date = $(fascicules_illustration_xml[numero_fascicule]).text();
			url_image_page_fascicule = url_base_image + code_ark + "/f" + numero_page + ".medres";
			page_choisis = $(fascicules_illustration_xml[numero_fascicule]).attr("page");

			// On change les données dans le XML
			$("#image_illustration img").attr("src", url_image_page_fascicule);
			$("#date_fascicule").text(date);
			$("#numero_page").text("Page : " + numero_page);
			$("#listPages").text(page_choisis);

			/****AUDIO *****/
			var audio = new Audio(); 
			audio.src = 'assets/audio/grande_page.mp3'; 
			audio.play(); 
			console.log("play");
		}
	}

	function trouverFasciculeParAnnee(annee) {
		for (var i = 0; i < fascicules_illustration_xml.length; i++) {
			var fasciculeAnnee = parseInt($(fascicules_illustration_xml[i]).text());
			if (fasciculeAnnee === annee) {
				return i;
			}
		}
		return null;
	}

});