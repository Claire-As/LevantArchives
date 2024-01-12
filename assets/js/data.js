$(function(){
  
	//--------------------------------------------------------------------------- PIE CHARTS les ambassadrices

	function traitementPie() {
		var data = this.result;
		
		console.log(data);
		var tableau = $.csv.toArrays(data, { "separator": "," });
		console.log(tableau);
	
		var ambassadeurs = [];
		var ambassadrices = [];
	
		for (var i = 1; i < tableau.length; i++) {
			var colonne = tableau[i];
			console.log("colonne : " + colonne);
			var role = colonne[2];
	
			if (role.includes("ambassadeur")) {
				ambassadeurs.push(role);
			} else if (role.includes("ambassadrice")) {
				ambassadrices.push(role);
			}
		}
	
		var totalAmbassadeurs = ambassadeurs.length;
		var totalAmbassadrices = ambassadrices.length;
	
		// GRAPHIQUES
		var traceAmbassadeurs = {
			labels: ['Ambassadeurs', 'Ambassadrices'],
			values: [totalAmbassadeurs, totalAmbassadrices],
			type: 'pie',
			hole: 0.4
		};
	
		var data = [traceAmbassadeurs];
	
		var layout = {
			title: "Répartition des ambassadeurs et ambassadrices en pourcentage de 1946 à nos jours à l'internationale",
			showlegend: false
		};
	
		Plotly.newPlot('pie-chart', data, layout);
	}

// ------------------------------------------------------------------------  BAR CHARTS Les ambassadeurs syriens

	function traitementBar() {
		$('#my-chart').empty();
		var data = this.result;
		
		console.log(data);
		var tableau = $.csv.toArrays(data, { "separator": "," });
		console.log(tableau);

		var annees = [];
		var envoyesExtra = [];
		var ambassadeurs = [];

		for (var i = 1; i < tableau.length; i++) {
			var colonne = tableau[i];
			console.log("colonne : " + colonne);
			var pays = colonne[0];
			var nom = colonne[1];
			var role = colonne[2];
			var dateStr = colonne[3];

			var annee = parseInt(dateStr.split(' ')[2]);

			if (!annees.includes(annee)) {
				annees.push(annee);
			}

			if (role.includes("envoyé extraordinaire et ministre plénipotentiaire")) {
				envoyesExtra.push({ annee: annee, nom: nom });
			} else if (role.includes("ambassadeur")) {
				ambassadeurs.push({ annee: annee, nom: nom });
			}
		}

		var traceAmbassadeurs = {
			x: annees,
			y: countOccurrences(ambassadeurs),
			text: ambassadeurs.map(item => item.nom),
			type: 'bar',
			name: 'Ambassadeurs',
			marker: {
				color: 'blue'
			}
		};

		var traceEnvoyesExtra = {
			x: annees,
			y: countOccurrences(envoyesExtra),
			text: envoyesExtra.map(item => item.nom),
			type: 'bar',
			name: 'Envoyés extraordinaires et ministres plénipotentiaires',
			marker: {
				color: 'green'
			}
		};

		var data = [traceAmbassadeurs, traceEnvoyesExtra];

		var layout = {
			barmode: 'stack',
			title: "Nombre d'ambassadeurs et d'envoyés extraordinaires par année en Syrie",
			xaxis: {
				title: 'Année'
			},
			yaxis: {
				title: 'Nombre'
			}
		};

		Plotly.newPlot('bar-chart', data, layout);
	}

	function countOccurrences(arr) {
		var counts = {};
		arr.forEach(function (obj) {
			var key = obj.annee + '|' + obj.nom;
			counts[key] = (counts[key] || 0) + 1;
		});
		return Object.values(counts);
	}

	function lectureFichierPie(e) {
		$('#my-chart').empty();
		var file = e.target.files[0];
		var reader = new FileReader();
		$(reader).on('load', traitementPie);
		reader.readAsText(file);
	}

	function lectureFichierBar(e) {
		$('#my-chart').empty();
		var file = e.target.files[0];
		var reader = new FileReader();
		$(reader).on('load', traitementBar);
		reader.readAsText(file);
	}

	// ----------------------------------------------------------  LES ANIMATIONS ----------------------------------------------
	
	$('#choix_fichier_pie').on("change", lectureFichierPie);
	$('#choix_fichier_bar').on("change", lectureFichierBar);

	$('.galerie img').on("mouseover", agrandirPhotos);
	$('.galerie img').on("mouseleave", diminuerPhotos);

	function agrandirPhotos() {
		$('.galerie img').css("width", "28%")
	}

	function diminuerPhotos() {
		$('.galerie img').css("width", "25%")
	}

	$('#btn_cacher').on("click", cacherPhotos);
	$('#btn_afficher').on("click", afficherPhotos);

	function cacherPhotos() {
		$('.galerie img').css("display", "none")
	}

	function afficherPhotos() {
		$('.galerie img').css("display", "flex")
	}
	
	
	$('#btn_cacher').on("mousedown", btnPresse);
	$('#btn_afficher').on("mousedown", btnPresse);

	function btnPresse() {
		$(this).css("background-color", "#301a05");
		$(this).css("background", "#301a05");
	}

	$('#btn_cacher').on("mouseup", btnLache);
	$('#btn_afficher').on("mouseup", btnLache);

	function btnLache() {
		$(this).css("background-color", "#80450b");
		$(this).css("background", "#80450b");
	}

});