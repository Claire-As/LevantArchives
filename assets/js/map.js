$(function(){

    // on crée la carte
    var map = L.map('map').setView([34.63908194940235, 37.9294664934], 7);

    // affichage de la carte
    L.tileLayer('https://api.mapbox.com/styles/v1/yohoho/clffvxs9y002f01p4s3c59upu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieW9ob2hvIiwiYSI6ImNqZHo4MHdlbzRuZWsycXFvYno4aGU2eW0ifQ.vY_xI_fFfGZZVAHQeK0SvA', {
        maxZoom: 19,
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
    }).addTo(map);

    // création des icones et de leurs propriétés
    var iconCentresCulturels = L.icon({
        iconUrl: 'assets/img/office.png',
        iconSize:     [38, 38], // size of the icon
    });

    var iconEcolesLazariste = L.icon({
        iconUrl: 'assets/img/school.png',
        iconSize:     [38, 38], // size of the icon
    });


    // fonction affiche le text quand on clique dessus
    var markerCentresCulturelsDamas = L.marker([33.51543523202705, 36.297417739777806], {icon: iconCentresCulturels}).addTo(map).bindPopup("Centre culturel francais de Damas").openPopup();
    // la location du centre d'alep n'est pas correct c'est juste le centre de la ville
    var markerCentresCulturelsAlep = L.marker([36.20823529215952, 37.13004567220868], {icon: iconCentresCulturels}).addTo(map).bindPopup("Centre culturel francais D'Alep").openPopup();
    var markerEcoleLazariste = L.marker([36.20823529215952, 37.13004567220868], {icon: iconEcolesLazariste}).addTo(map).bindPopup("Ecole Lazariste").openPopup();

/*--------------------------- LISTES -------------------------------*/
    var liste_1944 = {
        "Délégué général plénipotentiaire de France au Levant" : "Paul Beynet 1944 à 1946",
        "Plenipotentiaire français itinérant" : "Stanislas Ostrorog",
    };

    var liste_1945 = {
        "Délégué général plénipotentiaire de France au Levant" : "Paul Beynet 1944 à 1946",
        "Plenipotentiaire français itinérant" : "Stanislas Ostrorog",
    };

    $("#1944").on("click", change_to_1944);

    function change_to_1944() {

        console.log(Object.entries(liste_1944));

        for (var [key, value] of Object.entries(liste_1944)) {
            console.log(`${key}: ${value}`);
            $("#personnalites").append("<p>"+`${key}: ${value}`+"</p></br>");
          }

        $("#personnalites").css("color", "blue");

    }
});