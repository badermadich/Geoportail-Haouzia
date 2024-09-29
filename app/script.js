// Initialisation de la carte avec la base ESRI
var map = L.map('map').setView([33.256, -8.5], 11);
L.esri.basemapLayer('Imagery').addTo(map);

// Basemap switcher
// document.getElementById('basemapSelector').addEventListener('change', function() {
//     const selectedBasemap = this.value;
//     switchBasemap(selectedBasemap);
// });
// Fonction pour styliser les limites des communes
function styleCommunes(feature) {
    if (feature.properties.Nom_Commun === "Haouzia") {
        return {
            color: '#f54266', 
            weight: 2,
            opacity: 1,
            fillOpacity: 0,
            // fillColor: 'red'
        };
    } else {
        return {
            color: '#"ffffff"', 
            weight: 4,
            opacity: 0.5,
            fillOpacity: 0,
            // fillColor: '#D3D3D3'
        };
    }
}

function onEachFeatureCommunes(feature, layer) {
    if (feature.properties && feature.properties.Nom_Commun === "Haouzia") {
        var popupContent = `
        <div class="popup-tabs">
            <button class="tablinks" onclick="openTab(event, 'page1')">Description</button>
            <button class="tablinks" onclick="openTab(event, 'page2')">Image</button>
            <button class="tablinks" onclick="openTab(event, 'page4')">Zones</button>
            <button class="tablinks" onclick="openTab(event, 'page5')">Événements</button>
    
            <div id="page1" class="tabcontent">
                <h3>Commune Haouzia</h3>
                <p>La commune Haouzia est créée en 1992 (suite au dernier découpage administratif). Elle
                s’étend sur une superficie de 148 Km selon la monographie communale avec près de
                23.358 habitants se répartissant sur 38 douars. Elle est limitée au Nord, par l’océan
                atlantique (le littoral), au Sud, par la commune rurale ouled Hcine (commune rurale
                Haouzia et la commune rurale Ouled Rahmoune), à l’Est, par la commune urbaine
                d’Azemmour et les communes rurales Ouled Rahmoune et Sidi Ali Ben Hamdouche et à
                l’ouest, par la commune urbaine d’El Jadida et la commune rurale Moulay Abdallah.</p>
            </div>
    
            <div id="page2" class="tabcontent" style="display:none;">
                <h3>Image de l'organisme</h3>
                <img src="img/haouzia.png" alt="image haouzia" style="width:100%;">
            </div>
    
            <div id="page3" class="tabcontent" style="display:none;">
                <h3>Statistiques</h3>
                <p>nnnnnn</p>
            </div>
    
            <div id="page4" class="tabcontent" style="display:none;">
                <h3>Zones</h3>
                <div class="zones-container">
                    <div class="zone">
                        <h4>Zone Touristique</h4>
                        <ul>
                            <li>Mazagan Beach Resort</li>
                            <li>Golf Royal d’El jadida</li>
                            <li>Complexe Touristique Zephyr</li>
                            <li>Plage Centre Haouzia titulaire du Label Bleu depuis 2006</li>
                            <li>Centre National de Vacances</li>
                            <li>Hotel Amwaj</li>
                        </ul>
                    </div>
    
                    <div class="zone">
                        <h4>Zone Urbaine</h4>
                        <ul>
                            <li>Pole Urbain Mazagan : Lancé en 2017, le projet Pôle Urbain de Mazagan (PUMA), est un investissement de 5 milliards de dirhams, une superficie de 1300 hectares, dont 186 de voiries principales, 303 d'espaces verts et 180 de réserve foncière.</li>
                            <li>Pole Urbain Haouzia : Le plan d’aménagement homologué en 2018 constitue un centre urbain d'excellence, levier de développement pour le Chef lieu de la commune.</li>
                        </ul>
                    </div>
    
                    <div class="zone">
                        <h4>Zone Agricole</h4>
                        <ul>
                            <li>Élevage des chevaux Pur Sang</li>
                            <li>Culture de céréales</li>
                            <li>Culture de légumes et plantes aromatiques</li>
                            <li>Élevage de bovins - Lait et viande</li>
                            <li>Élevage de volaille - Œuf et viande</li>
                            <li>Apiculture</li>
                        </ul>
                    </div>
    
                    <div class="zone">
                        <h4>Zone Universitaire</h4>
                        <ul>
                            <li>Faculté de droit et économie de gestion</li>
                            <li>École Nationale des Sciences Appliquées</li>
                            <li>École Nationale de Commerce et de Gestion</li>
                            <li>Institut Spécialisé en Tourisme et Hôtellerie Haouzia</li>
                        </ul>
                    </div>
                </div>
            </div>
    
            <div id="page5" class="tabcontent" style="display:none;">
                <h3>Événements</h3>
                <ul>
                    <li>Salon du Cheval au Parc d’Exposition Mohammed VI</li>
                    <li>Marathon d’El Haouzia</li>
                    <li>Fantasia</li>
                    <li>Soirées de Ramadan</li>
                    <li>Compétition de Surf</li>
                    <li>Compétition de Foot-Ball avec l’équipe locale « Amal El Haouzia »</li>
                </ul>
            </div>
        </div>
    `;
        layer.bindPopup(popupContent);
    }
}
// var communesAAfficher = ["Oulad Rahmoune", "Ouled Hcine", "Azemmour", "El Jadida", "Moulay Abdelah" ,"Haouzia" ];
var communesAAfficher = [ "Haouzia" ];
fetch('data/commune.geojson')
    .then(response => response.json())
    .then(data => {
        console.log("Données GeoJSON chargées:", data);
        L.geoJson(data, {
            style: styleCommunes,
            onEachFeature: onEachFeatureCommunes,
            filter: function (feature) {
                console.log("Nom de la commune:", feature.properties.Nom_Commun); // Afficher le nom de chaque commune
                return communesAAfficher.includes(feature.properties.Nom_Commun);
            }
        }).addTo(map);
    })
    .catch(error => console.error("Erreur lors du chargement du GeoJSON des communes: ", error));
function createPopupContent(marker) {
    return `
        <div class="popup-tabs">
            <button class="tablinks" onclick="openTab(event, 'page1')">Description</button>
            <button class="tablinks" onclick="openTab(event, 'page2')">Image</button>
            <button class="tablinks" onclick="openTab(event, 'page3')">Statistiques</button>
            
            <div id="page1" class="tabcontent">
                <h3>${marker.popupContent.organisme}</h3>
                <p>${marker.popupContent.description}</p>
            </div>
            
            <div id="page2" class="tabcontent" style="display:none;">
                <h3>Image de l'organisme</h3>
                <img src="${marker.popupContent.image}" alt="${marker.popupContent.organisme}" style="width:100%;">
            </div>
            
            <div id="page3" class="tabcontent" style="display:none;">
                <h3>Statistiques</h3>
                <p>${marker.popupContent.stats}</p>
            </div>
        </div>
    `;
}
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Récupère tous les éléments avec la classe "tabcontent" et les masque
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Supprime la classe "active" de tous les boutons d'onglets
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Affiche l'onglet actuel et ajoute une classe "active" au bouton d'onglet cliqué
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Ajout des marqueurs avec popup pour les écoles, mosquées, etc.
var markersData = [
    { 
        coords: [33.253867,  -8.437217], 
        popupContent: {
            organisme: "ZEPHYR Mazagan",
            description:  "Conçu sur 3 hectares d’espaces arborés, ZEPHYR Mazagan est idéalement situé en front de ‎mer sur la route côtière RP3402, offre une vue imprenable sur l’océan atlantique.<br>" +
            "Cet hôtel 4 étoiles est composé de 48 chambres, 4 suites et un Appart’hôtel doté de 62 ‎appartements entièrement équipés.<br>" +
            "L’établissement dispose de 3 piscines et de 3 bassins pour enfants et compte plusieurs ‎espaces de restauration en intérieur et en terrasses.<br>" +
            "ZEPHYR Mazagan dispose d’un Club de fitness Narjisse, spa et un hammam.",
            image: "img/place/zephyr.jpg",
            stats: "",
            tooltipColor: "#9b28de",
            markerSymbol:'/img/location_marker.png'
        } 
    },
    // { 
    //     coords: [33.251167, -8.432893], 
    //     popupContent: {
    //         organisme: "La Faculté des Sciences Juridiques, Economiques et sociales d’El Jadida",
    //         description: "La Faculté des Sciences Juridiques, Economiques et sociales d’El Jadida « FSJESJ » a été créée ‎par transformation de la Faculté polydisciplinaire et ce par le décret N° 2.18.236 du 11 Mai ‎2018 qui lui confère, à partir de l'année universitaire 2018/2019, le statut d'une composante ‎relevant de l’Université Chouaib Doukkali.<br>" +
    //         "la FSJESJ est un établissement jeune, dynamique et ‎tourné vers l’avenir.<br>" +
    //         "L’ouverture de son nouveau siège est le premier jalon du Pôle ‎Universitaire en création à Mazagan.",
    //         image: "img/place/fsjes.jpg",
    //         stats: "",
    //         tooltipColor: "#de9b28"
    //     } 
    // },
    // { 
    //     coords: [33.250815,  -8.433788], 
    //     popupContent: {
    //         organisme: "L’Ecole Nationale des Sciences Appliquées d’El Jadida –ENSAJ",
    //         description: "L’Ecole Nationale des Sciences Appliquées d’El Jadida –ENSAJ–, est un établissement ‎public qui a pour vocation la formation d’ingénieurs d’état, la formation continue et la ‎recherche scientifique.<br>" +
    //         "Sa création à l’Université Chouaïb Doukkali, s’inscrit dans le cadre ‎d’une stratégie qui vise à diversifier les formations dispensées dans les établissements de ‎l’université tenant compte des nouvelles exigences du marché de l’emploi national et ‎international,<br>" +
    //         "à renforcer le système de passerelles en offrant aux étudiants de nouvelles ‎opportunités de réorientation et à intensifier les interactions avec les opérateurs ‎socioéconomiques par le biais de processus de transfert de technologie, de valorisation de la ‎recherche scientifique et de création d’entreprise.",
    //         image: "img/place/ensaj.webp",
    //         stats: "Nombre d'élèves: 600, Nombre de classes: 25",
    //         tooltipColor: "#de2865"
    //     } 
    // },
    { 
        coords: [33.192922, -8.44928], 
        popupContent: {
            organisme: "Jawhara-Annassim",
            description: "Au cœur du centre émergeant d'El Jadida se situe le projet de lotissement Jawhara-Annassim,\n\
            il s'agit de lots de terrain pour immeubles en R+2 et R+3.\n\
            Commercial des superficies vont de 80 m² à 280 m².",
            image: "img/place/jawhara annassin.jpg",
            stats: "",
            tooltipColor: "#ded828",
            markerSymbol:'/img/location_marker.png'

        } 
    },
    { 
        coords: [33.307609,  -8.355244], 
        popupContent: {
            organisme: "Le centre national de vacances El Haouzia d'Azemmour",
            description: "Le centre national de vacances El Haouzia d'Azemmour se veut un espace d'interaction culturelle et de synergie sociale<br>\
            qui accueille plus de 7.000 enfants des quatre coins du Royaume,<br>\
            et qui allie le plaisir des vacances à un ensemble d'activités qui favorisent l'éducation aux valeurs de citoyenneté.",
            image: "./img/place/CENTRE NATIONAL VACANE.jpg",
            stats: "",
            tooltipColor: "#de8c28",
            markerSymbol:'/img/location_marker.png'
        } 
    },
    // { 
    //     coords: [33.247674, -8.399958], 
    //     popupContent: {
    //         organisme: "Le Pôle urbain de Mazagan (PUMA‎)",
    //         description: "Le Pôle urbain de Mazagan (PUMA) est une illustration concrète de la nouvelle stratégie de développement des pôles urbains, promue à l’échelle nationale par le ministère de l’Habitat et de la Politique de la Ville.<br>\
    //         Ce projet d’intérêt national résulte d’une volonté de prise en compte globale du territoire urbain et d’intégration associée à des dimensions économique, sociale et environnementale qui conditionneront la vie de ses futurs résidents.<br>\
    //         Ainsi, le Pôle urbain de Mazagan situé près d’El Jadida constituera une véritable cité au confluent du savoir et de l’innovation.<br>\
    //         Son aménagement permettra la création d’une zone urbaine modèle pour accompagner le développement économique et social de la région et pour développer un éco-urbanisme, tout en respectant les meilleurs standards écologiques du développement durable.<br>\
    //         Il proposera une offre éducative innovante grâce à un pôle universitaire aux normes internationales.",
    //         image: "",
    //         stats: "",
    //         tooltipColor: "#28b6de",
    //         markerSymbol:'/img/location_marker.png'
    //     } 
    // },
    { 
        coords: [33.282761, -8.379925], 
        popupContent: {
            organisme: "Mazagan Beach & Golf Resort",
            description: "Mazagan Beach & Golf Resort est un site touristique marocain de luxe, sur la côte Atlantique.<br>\
            Il est aménagé par la société sud-africaine Kerzner International, la Caisse de Dépôt et de Gestion et la Société Maroco Emirati de Développement dans le cadre du plan azur.<br>\
            Le programme comprend les installations suivantes :<br>\
            • 78 pôle d'animation autour des deux lagons ;<br>\
            • 1 académie de sport avec deux terrains, sous les normes de la FIFA ;<br>\
            • 1 golf en ligne face à l'océan de 18 trous ;<br>\
            • 1 centre de congrès<br>\
            • 13 restaurants et bars<br>\
            • 2 terrains de tennis<br>\
            • Karting<br>\
            • Paint-ball<br>\
            • Tir à l'arc<br>\
            • Club équestre<br>\
            • Quads<br>\
            • Jet-sky<br>\
            • Surf<br>\
            • Salle de sport<br>\
            • SPA<br>\
            • Baby Club<br>\
            • Kids Club<br>\
            • Rush Club<br>\
            • 7 km de plage privée<br>\
            • 492 Chambres<br>\
            • 2 Royal Suites<br>\
            • Jockey Club",
            image: "img/place/mazagan.jpg",
            stats: "L'hôtel a été construit par la société belge Besix en collaboration avec Somagec, une ‎société marocaine. L'aménagement intérieur de l'hôtel ainsi que les villas sont ‎réalisées par DEPA Maroc. Il emploie plus de 1500 employés, à parité de femmes et ‎d'hommes, venus du monde entier et exerçant 300 métiers différents.‎",
            tooltipColor: "#429966",
            markerSymbol:'/img/location_marker.png'
        } 
    },
    { 
        coords: [33.267380, -8.382384], 
        popupContent: {
            organisme: "Le parc d'Expositions Mohammed VI",
            description: "Le parc d'Expositions Mohammed VI est une infrastructure polyvalente destinée à abriter des salons, des foires, des manifestations artistiques, culturelles ou sportives d’envergure.<br>\
            Il a été édifié en 2015 par la Société Royale d'Encouragement du cheval selon les normes internationales.",
            image: "img/place/parc expositin.jpg",
            stats: "Le Parc d'Exposition s'étend sur 29 hectares et propose une surface couverte de ‎‎30 000 m2 comprenant une surface utile d'exposition de 20 000 m2 avec une galerie ‎technique souterraine et des salles de réunions. Il dispose d'une zone d'exposition ‎extérieure de 70 000 m2.‎",
            tooltipColor: "#dceb91",
            markerSymbol:'/img/location_marker.png'
        } 
    },
    { 
        coords: [33.258728, -8.423143], 
        popupContent: {
            organisme: "Pullman",
            description: "Niché au fond de la superbe baie d'El Jadida à 90 kilomètres au sud de Casablanca, le Pullman Mazagan Royal Golf & Spa offre l'un des plus beaux dix-huit trous du Maroc.<br>\
            Donnant sur une côte atlantique à la fois belle et sauvage, le Pullman Mazagan Royal Golf & Spa a été récemment rénové.<br>\
            Doté d'un Spa et d'une piscine extérieure, cet hôtel haut de gamme propose une cuisine raffinée ainsi que deux salles de conférences.<br>\
            L'hôtel dispose d'un cadre rêvé pour pratiquer du golf et se ressourcer.",
            image: "img/place/pullman.jpg",
            stats: "",
            tooltipColor: "#91ebc8",
            markerSymbol:'/img/location_marker.png'
        } 
    },
    { 
        coords: [33.190572, -8.443315], 
        popupContent: {
            organisme: "RIAD AL JADIDA",
            description: "Exceptionnel de par son emplacement, Riad Al Jadida est un programme prestigieux à l’image de la ville qui l’accueille.<br>\
            Situé dans la commune d’El Haouzia, à 8 minutes du centre ville d’Al Jadida, le lotissement offre un large éventail de prestations.<br>\
            Riad Al Jadida est un complexe résidentiel s’étendant sur 60 hectares, alliant appartements de standing ainsi que de nombreux lots de terrain villa, R+3 et R+4.",
            image: "img/place/riad-al-jadida.jpg",
            stats: "",
            tooltipColor: "#ebb491",
            markerSymbol:'/img/location_marker.png'
            
        } 
    },
    { 
        coords: [33.259758, -8.412223], 
        popupContent: {
            organisme: "Forêt Mazagan",
            description: "Situé à quelques pas de la mer, de la plage et de la forêt de 400 hectares, Mazagan offre un cadre idéal pour celles et ceux qui souhaitent explorer les grands espaces tout en profitant d'un magnifique soleil. Faites le plein d'aventures en pratiquant le karting, l'escalade, la tyrolienne et le paintball.",
            image: "img/place/foret.jpg",
            stats: "",
            tooltipColor: "#129645",
            markerSymbol:'./img/forest.png'
            // Couleur personnalisée de l'étiquette (Orange)
        } 
    },
    { 
        coords: [33.306078, -8.357849], 
        popupContent: {
            organisme: "Plage al houzia",
            description: `
            La plage centre Haouzia a hissé le prestigieux « Pavillon Bleu » pour la 17ème année ‎consécutive.<br>
            Le label “Pavillon bleu” est une référence internationale dans le domaine de la qualité des ‎sites balnéaires, délivré par la Fondation Internationale pour l’Education à ‎l’Environnement (FEE) pour distinguer les sites balnéaires qui répondent aux critères de ‎qualité et de sécurité.<br>
        `,
            image: "img/place/plagehaouzia.jpg",
            stats: "",
            tooltipColor: "#123396",  
            markerSymbol:'./img/pavillonBleu.png'
        }   
    },
    { 
        coords: [33.185794, -8.444082], 
        popupContent: {
            organisme: "Siège commune Haouzia",
            description: "La commune Haouzia est créée en 1992 (suite au dernier découpage administratif). Elle s’étend sur une superficie de 148 Km selon la monographie communale avec près de 23.358 habitants se répartissant sur 38 douars. Elle est limitée au Nord, par l’océan atlantique (le littoral), au Sud, par la commune rurale ouled Hcine (commune rurale Haouzia et la commune rurale Ouled Rahmoune), à l’Est, par la commune urbaine d’Azemmour et les communes rurales Ouled Rahmoune et Sidi Ali Ben Hamdouche et à l’ouest, par la commune urbaine d’El Jadida et la commune rurale Moulay Abdallah.",
            image: "img/haouzia.png",
            stats: "",
            tooltipColor: "#9b9da3" ,
            markerSymbol:'/img/location_marker.png'
        } 
    },
    { 
        coords: [33.281239, -8.407631], 
        popupContent: {
            organisme: "16 Km du Lithoral",
            description: ``,
            image: "",
            stats: "",
            tooltipColor: "#f7f379",  
            
        }   
    }
];

/// Stocker les instances de marqueurs pour un contrôle ultérieur
var markerLayerGroup = L.layerGroup();  // Initialement ne pas ajouter à la carte

// Activer le clustering pour les marqueurs des lieux
var clusterGroup = L.markerClusterGroup();

// Fonction pour ajouter tous les marqueurs à la carte avec étiquettes et clustering
// function addMarkers() {
//     markersData.forEach(function(marker) {
//         var popup = createPopupContent(marker);

//         // Créer un marqueur avec popup et tooltip coloré
//         var markerInstance = L.marker(marker.coords)
//             .bindPopup(popup)  // Contenu du popup
//             .bindTooltip(marker.popupContent.organisme, {  // Étiquette (tooltip)
//                 permanent: true,  // L'étiquette reste visible en permanence
//                 direction: 'top',  // Afficher l'étiquette au-dessus du marqueur
//                 className: 'custom-tooltip',
//                 offset: [0, -20],
//                 opacity: 0.9
//             }).on('add', function () {  // Appliquer la couleur personnalisée à l'ajout du marqueur
//                 var tooltipNode = markerInstance.getTooltip().getElement();
//                 if (tooltipNode) {
//                     tooltipNode.style.backgroundColor = marker.popupContent.tooltipColor || '#FFFFFF';
//                 }
//             });

//         markerInstance.on('click', function() {
//             map.closePopup();  
//             this.openPopup();  
//         });

//         clusterGroup.addLayer(markerInstance);  // Ajouter au cluster
//     });

//     markerLayerGroup.addLayer(clusterGroup);  // Ajouter le cluster au LayerGroup
// }
function addMarkers() {
    markersData.forEach(function(marker) {
        var popup = createPopupContent(marker);

        // Créer une icône personnalisée en lisant markerSymbol depuis popupContent
        var customIcon = L.icon({
            iconUrl: marker.popupContent.markerSymbol || 'default-icon.png',  // Utiliser markerSymbol pour l'icône (ou une icône par défaut)
            iconSize: [40, 40],  // Taille de l'icône [largeur, hauteur]
            iconAnchor: [12, 41],  // Point d'ancrage de l'icône (généralement au bas du marqueur)
            popupAnchor: [12, -41]  // Point d'ancrage du popup par rapport à l'icône
        });

        // Créer un marqueur avec icône personnalisée, popup et tooltip coloré
        var markerInstance = L.marker(marker.coords, { icon: customIcon })  // Ajouter l'icône au marqueur
            .bindPopup(popup)  // Contenu du popup
            .bindTooltip(marker.popupContent.organisme, {  // Étiquette (tooltip)
                permanent: true,  // L'étiquette reste visible en permanence
                direction: 'top',  // Afficher l'étiquette au-dessus du marqueur
                className: 'custom-tooltip',
                offset: [20, -20],
                opacity: 0.9
            }).on('add', function () {  // Appliquer la couleur personnalisée à l'ajout du marqueur
                var tooltipNode = markerInstance.getTooltip().getElement();
                if (tooltipNode) {
                    tooltipNode.style.backgroundColor = marker.popupContent.tooltipColor || '#FFFFFF';
                }
            });

        markerInstance.on('click', function() {
            map.closePopup();  
            this.openPopup();  
        });

        clusterGroup.addLayer(markerInstance);  // Ajouter au cluster
    });

    markerLayerGroup.addLayer(clusterGroup);  // Ajouter le cluster au LayerGroup
}

// Fonction pour afficher ou masquer les marqueurs des lieux selon l'état de la case à cocher
// function togglePlacesLayer() {
//     var placesCheckbox = document.getElementById('places');
//     if (placesCheckbox.checked) {
//         map.addLayer(markerLayerGroup);
//           // Afficher les marqueurs
//     } else {
//         map.removeLayer(markerLayerGroup);  // Masquer les marqueurs
//     }
// }

// Écouteur de changement pour la case "Afficher les lieux"
// document.getElementById('places').addEventListener('change', togglePlacesLayer);

// Appel de la fonction pour ajouter les marqueurs (mais sans les afficher initialement)
addMarkers();
///////////////////////

////////////////
let zoneTouristiqueLayer, centreUrbaineLayer, routesLayer ,routesNationalLayer, PALayer , ZT1Layer ;
let zoneTouristiqueMarkers, centreUrbaineMarkers, routesMarkers, routesNationalMarkers,PAMarkers , ZT1Markers ;

// Coordonnées aléatoires pour chaque zone (à modifier selon les vraies coordonnées)
const zoneTouristiqueCoords = [33.269138798081826, -8.395135921927249];  // Coordonnées fictives pour la zone touristique
const centreUrbaineCoords = [33.18806159714188, -8.445706033884107];    // Coordonnées fictives pour le centre urbain
const routesCoords = [33.25004330550368, -8.37998333597713];  
const routesNationalCoords = [33.145907, -8.447628];
const PACoords = [33.229607, -8.470562];
const ZT1Coords = [33.262427, -8.391323];
        

   // Coordonnées fictives pour la route
         // Coordonnées fictives pour la route

// Définir des icônes personnalisées
const touristeIcon = L.icon({
    iconUrl: 'img/touriste.png',
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});

const centreIcon = L.icon({
    iconUrl: 'img/centre_urbain.png',
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});

const routesIcon = L.icon({
    iconUrl: 'img/ADM.png',
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});
const routesNationalIcon = L.icon({
    iconUrl: 'img/RoutesNational.png',
    iconSize: [0, 0], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});
const PAIcon = L.icon({
    iconUrl: 'img/PA.png',
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});

const ZT1Icon = L.icon({
    iconUrl: 'img/PA.png',
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32] // Point où la popup s'affiche par rapport à l'icône
});

// Charger les fichiers GeoJSON et les ajouter à la carte avec les marqueurs
function loadGeoJSON() {
    zoneTouristiqueLayer = L.geoJSON(null, {
        style: () => getPolygonStyle('zone_touristique')
    });

    centreUrbaineLayer = L.geoJSON(null, {
        style: () => getPolygonStyle('centre_urbaine')
    });

    routesLayer = L.geoJSON(null, {
        style: () => getPolygonStyle('routes')
    });
    routesNationalLayer = L.geoJSON(null, {
        style: () => getPolygonStyle('routes-national')
    });
    // PALayer = L.geoJSON(null, {
    //     style: () => getPolygonStyle('PA')
    // });
    ZT1Layer = L.geoJSON(null, {
        style: () => getPolygonStyle('ZT1')
    });
    

    // Créer des groupes de marqueurs pour chaque couche avec les icônes personnalisées
    // zoneTouristiqueMarkers = L.layerGroup([L.marker(zoneTouristiqueCoords, { icon: touristeIcon }).bindPopup('Centre de la zone touristique')]);
    zoneTouristiqueMarkers = L.layerGroup([
        L.marker(zoneTouristiqueCoords, { icon: touristeIcon }).bindPopup(`
            <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
                <!-- Titre stylisé -->
                <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">Zone Touristique</h3>
                
                <!-- Image (facultative) -->
                <div style="text-align: center; margin: 10px 0;">
                    <img src="img/place/zone touristique.jpg" alt="Image de la zone" style="border-radius: 5px; width: 230px; height: 120px; object-fit: cover;">
                </div>
    
                <!-- Description minimale -->
                <p style="margin: 5px 0; text-align: justify;">
                    Une destination touristique populaire offrant des paysages magnifiques et des activités variées.
                </p>
                
                
            </div>
        `)
    ]);
    // centreUrbaineMarkers = L.layerGroup([L.marker(centreUrbaineCoords, { icon: centreIcon }).bindPopup('Centre du centre urbain')]);
    centreUrbaineMarkers = L.layerGroup([
        L.marker(centreUrbaineCoords, { icon: centreIcon }).bindPopup(`
            <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
                <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">PA du centre urbain haouzia</h3>
                
                <!-- Image (facultative) -->
                <div style="text-align: center; margin: 10px 0;">
                    <img src="img/place/CENTRE URBAINE.jpg" alt="Image de la zone" style="border-radius: 5px; width: 230px; height: 120px; object-fit: cover;">
                </div> 
    
                
    
                
            </div>
        `)
    ]);
    // routesMarkers = L.layerGroup([L.marker(routesCoords, { icon: routesIcon }).bindPopup('Centre de la route')]);
    routesMarkers = L.layerGroup([
        L.marker(routesCoords, { icon: routesIcon }).bindPopup(`
            <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
                <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">Autoroute : A103</h3>
                <p style="margin: 5px 0; text-align: justify;">100km de l'aéroport Mohammed 5</p>
                <p style="margin: 5px 0; text-align: justify;">180km de la ville de Rabat</p>
                <p style="margin: 5px 0; text-align: justify;">92km de la ville de Casablanca</p>


         
                
             
               
            </div>
        `)
    ]);
    // routesNationalMarkers = L.layerGroup([
    //     L.marker(routesNationalCoords, { icon: routesNationalIcon }).bindPopup(`
    //         <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
    //             <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">Route National : RN1</h3>         
    //         </div>
    //     `)
    // ]);
    routesNationalMarkers = L.layerGroup([
        L.marker(routesNationalCoords, { icon: routesNationalIcon }).bindTooltip(`
        <div style="font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: white; background-color: green; padding: 5px 10px; border-radius: 4px; z-index: 1000; position: relative;opacity: 0.8;">
        Zone Agricole
    </div>
        `, {
            permanent: true, // L'étiquette sera toujours visible
            direction: 'top', // Positionne l'étiquette au-dessus du marqueur
            offset: [0, -10], // Ajuste légèrement la position de l'étiquette
            className: 'my-custom-tooltip' // Optionnel : ajoute une classe CSS personnalisée si nécessaire
        })
    ]);
    PAMarkers = L.layerGroup([
        L.marker(PACoords, { icon: PAIcon }).bindPopup(`
        <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
        <!-- Titre stylisé -->
        <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">PA de la zone Nord Est de la ville d'El Jadida et une partie de la collectivité de Haouzia 
        </h3>
        
        <!-- Image (facultative) -->
        <div style="text-align: center; margin: 10px 0;">
            <img src="img/place/PA.jpg" alt="Image de la zone" style="border-radius: 5px; width: 230px; height: 120px; object-fit: cover;">
        </div>

        <!-- Description minimale -->
        <p style="margin: 5px 0; text-align: justify;">
        homo/déc n°2.18.690 du 02/10/2018 (B.O n°6718 du 18/10/2018)
        </p>
    </div>
        `)
        
    ]);
    ZT1Markers = L.layerGroup([
        L.marker(ZT1Coords, { icon: ZT1Icon }).bindPopup(`
        <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
        <!-- Titre stylisé -->
        <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">PA du Pôle Urbain de Mazagan
        
        <!-- Image (facultative) -->
        <div style="text-align: center; margin: 10px 0;">
            <img src="img/place/ZT1.jpg" alt="Image de la zone" style="border-radius: 5px; width: 230px; height: 120px; object-fit: cover;">
        </div>

        <!-- Description minimale -->
        <p style="margin: 5px 0; text-align: justify;">
        Le Pôle urbain de Mazagan (PUMA) est une illustration concrète de la nouvelle stratégie de développement des pôles urbains, promue à l’échelle nationale par le ministère de l’Habitat et de la Politique de la Ville.
        </p>
        
        
    </div>
        `)
        
    ]);
    

    // Charger les fichiers GeoJSON
    fetch('data/zone touristique.geojson')
        .then(response => response.json())
        .then(data => {
            zoneTouristiqueLayer.addData(data);
            console.log("Zone touristique chargée:", data);
        })
        .catch(error => console.error("Erreur lors du chargement de la zone touristique:", error));
        
    fetch('data/ZT2_converted.geojson')
        .then(response => response.json())
        .then(data => {
            centreUrbaineLayer.addData(data);
            console.log("Centre urbain chargé:", data);
        })
        .catch(error => console.error("Erreur lors du chargement du centre urbain:", error));
        
    fetch('data/Autoroute.geojson')
        .then(response => response.json())
        .then(data => {
            routesLayer.addData(data);
            console.log("Routes chargées:", data);
        })
        .catch(error => console.error("Erreur lors du chargement des routes:", error));

    fetch('data/zone agricole f.geojson')
        .then(response => response.json())
        .then(data => {
            routesNationalLayer.addData(data);
            console.log("Routes nationals chargées:", data);
        })
        .catch(error => console.error("Erreur lors du chargement des routes nationals:", error));

    fetch('data/PA NORD EL JADIDA.geojson')
        .then(response => response.json())
        .then(data => {
            PALayer.addData(data);
            console.log("Routes nationals chargées:", data);
        })
        .catch(error => console.error("Erreur lors du chargement des pa:", error));

        fetch('data/PUMAAAAAAAAA.geojson')
        .then(response => response.json())
        .then(data => {
            ZT1Layer.addData(data);
            console.log("Routes nationals chargées:", data);
        })
        .catch(error => console.error("Erreur lors du chargement des pa:", error));
}

// Appel de la fonction pour charger les GeoJSON
loadGeoJSON();

// Fonction pour obtenir le style des polygones
function getPolygonStyle(type) {
    switch(type) {
        case 'zone_touristique':
            return { color: 'yellow', weight: 2, fill:true,fillColor: 'yellow', fillOpacity: 0}; // Hachures (longueur et espacement}; 
        // case 'centre_urbaine':
        //     return { color: '#2858de', weight: 2, fillOpacity: 0.5 , fill: true,fillColor: '#2858de'}; // Couleur de fond  };
        case 'centre_urbaine':
    return {
        fill: true,
        fillColor: '#2858de', // Couleur de remplissage
        fillOpacity: 0,      // Opacité du remplissage
        weight: 1,
        color: '#2858de',      // Couleur de la bordure
    
        hachure: {
            weight: 29,
            color: '#ffffff', // Couleur des hachures
            
            dashArray: '8, 16' // Espacement des hachures
        }
    }; 
        case 'routes':
            return { color: '#3357FF', weight: 2, fillOpacity: 0 }; 
       ; 
        
        case 'routes-national':
            return {
                fill: true,
                fillColor: '#1c874c', // Couleur de remplissage
                fillOpacity: 0,      // Opacité du remplissage
                weight: 3,
                color: '#1c874c',      // Couleur de la bordure
            
                hachure: {
                    weight: 29,
                    color: '#1c874c', // Couleur des hachures
                    dashArray: '8, 16' // Espacement des hachures
                }
            }; 
            

        // case 'PA':
        //         return { color: '#6fd9d2', weight: 2, fill:true,fillColor: '#6fd9d2', fillOpacity: 0}; 
        
        case 'ZT1':
            return {
                fill: true,
                fillColor: '#2858de', // Couleur de remplissage
                fillOpacity: 0,      // Opacité du remplissage
                weight: 1,
                color: '#2858de',      // Couleur de la bordure
            
                hachure: {
                    weight: 29,
                    color: '#ffffff', // Couleur des hachures
                    
                    dashArray: '8, 16' // Espacement des hachures
                }
            }; 
         
        default:
                 return { color: '#FFFFFF', weight: 2, fillOpacity: 0}

    };
    
}

// Fonction pour contrôler l'affichage des couches et des marqueurs avec des checkboxes
function controlLayerDisplay() {
    // const placesCheckbox = document.getElementById('places');
    const zoneTouristiqueCheckbox = document.getElementById('zone_touristique');
    const centreUrbaineCheckbox = document.getElementById('centre_urbaine');
    const routesCheckbox = document.getElementById('routes');
    const routesNationalCheckbox = document.getElementById('routes-national');
    // const PACheckbox = document.getElementById('PA');
    const ZT1Checkbox = document.getElementById('ZT1');

    const echangeurCheckbox = document.getElementById('echangeur');
    // Afficher ou masquer les marqueurs des places
    // placesCheckbox.addEventListener('change', function() {
    //     console.log("Places checkbox:", this.checked);
    //     if (this.checked) {
    //         map.addLayer(markerLayerGroup);
    //     } else {
    //         map.removeLayer(markerLayerGroup);
    //     }
    // });

    // Afficher ou masquer les zones touristiques et les marqueurs associés
    zoneTouristiqueCheckbox.addEventListener('change', function() {
        console.log("Zone touristique checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(zoneTouristiqueLayer);
            map.addLayer(markerLayerGroup);
            map.addLayer(zoneTouristiqueMarkers);
            map.setView(zoneTouristiqueCoords, 14);  // Centrer sur la zone touristique
        } else {
            map.removeLayer(zoneTouristiqueLayer);
            map.removeLayer(zoneTouristiqueMarkers);
            map.removeLayer(markerLayerGroup);
        }
    });

    // Afficher ou masquer les centres urbains et les marqueurs associés
    centreUrbaineCheckbox.addEventListener('change', function() {
        console.log("Centre urbain checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(centreUrbaineLayer);
            map.addLayer(centreUrbaineMarkers);
            map.addLayer(markerLayerGroup);

            map.setView(centreUrbaineCoords, 14);  // Centrer sur le centre urbain
        } else {
            map.removeLayer(centreUrbaineLayer);
            map.removeLayer(centreUrbaineMarkers);
            map.removeLayer(markerLayerGroup);

        }
    });

const echangeur1Coords = [33.246235, -8.450608];  // Example: Haouzia -> El Jadida
const echangeur2Coords = [33.256975, -8.346221];  // Example: Azemmour -> Haouzia
const echangeur3Coords = [33.190982, -8.491756];  // Example: Azemmour -> Haouzia

const echangeurIcon = L.icon({
    iconUrl: 'img/echangeur.jpg',  // Replace with actual icon path
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const echangeurMarkers = L.layerGroup([
    L.marker(echangeur1Coords, { icon: echangeurIcon }).bindPopup('Échangeur 1 : De El Jadida vers Haouzia '),
    L.marker(echangeur2Coords, { icon: echangeurIcon }).bindPopup('Échangeur 2 : De Azemmour vers Haouzia'),
    L.marker(echangeur3Coords, { icon: echangeurIcon }).bindPopup('Échangeur 3 : De Moulay Abdelah vers Haouzia')

]);


    // Afficher ou masquer les routes et les marqueurs associés
    routesCheckbox.addEventListener('change', function() {
        console.log("Routes checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(routesLayer);
            map.addLayer(routesMarkers);
            map.addLayer(echangeurMarkers);
            map.setView(routesCoords, 12);  // Centrer sur la route
        } else {
            map.removeLayer(routesLayer);
            map.removeLayer(routesMarkers);
            map.removeLayer(echangeurMarkers);
        }
    });
    // Afficher ou masquer les routes et les marqueurs associés
    routesNationalCheckbox.addEventListener('change', function() {
        console.log("Routes checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(routesNationalLayer);
            map.addLayer(routesNationalMarkers);
            map.setView(routesNationalCoords, 12);  // Centrer sur la route
        } else {
            map.removeLayer(routesNationalLayer);
            map.removeLayer(routesNationalMarkers);
        }
    });

    // Afficher ou masquer les routes et les marqueurs associés
    // PACheckbox.addEventListener('change', function() {
    //     console.log("PA checkbox:", this.checked);
    //     if (this.checked) {
    //         map.addLayer(PALayer);
    //         map.addLayer(PAMarkers);
    //         map.setView(PACoords, 14);  // Centrer sur la route
    //     } else {
    //         map.removeLayer(PALayer);
    //         map.removeLayer(PAMarkers);
    //     }
    // });
    ZT1Checkbox.addEventListener('change', function() {
        console.log("ZT1 checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(ZT1Layer);
            map.addLayer(ZT1Markers);
            map.setView(ZT1Coords, 14);  // Centrer sur la route
        } else {
            map.removeLayer(ZT1Layer);
            map.removeLayer(ZT1Markers);
        }
    });
    
    echangeurCheckbox.addEventListener('change', function() {
        console.log("echangeur checkbox:", this.checked);
        if (this.checked) {
            map.addLayer(echangeurMarkers);
            map.setView([33.220297,-8.444272], 12);
        } else {
            map.removeLayer(echangeurMarkers);
        }
    });
}
// Appel de la fonction pour contrôler l'affichage des couches
controlLayerDisplay();
// Zoom sur Haouzia lorsqu'on clique sur le bouton
document.getElementById('zoom-haouzia').addEventListener('click', function() {
    // Coordonées approximatives du centre de la commune de Haouzia
    map.setView([33.21887217765888, -8.411834602596173], 11);
});

// // switcher
// document.getElementById('basemapSelector').addEventListener('change', function() {
//     const selectedBasemap = this.value;
//     switchBasemap(selectedBasemap);
// });

function switchBasemap(basemap) {
    map.eachLayer(function (layer) {
        if (layer.options && layer.options.id) {
            map.removeLayer(layer);
        }
    });
    L.esri.basemapLayer(basemap).addTo(map);
}
// Fonction pour rendre la sidebar draggable
function makeDraggable(element) {
    let isMouseDown = false;
    let offset = [0, 0];

    // Événement pour le démarrage du glissement
    element.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        offset = [
            element.offsetLeft - e.clientX,
            element.offsetTop - e.clientY
        ];
    });

    // Événement pour le glissement
    document.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (isMouseDown) {
            element.style.left = (e.clientX + offset[0]) + 'px';
            element.style.top = (e.clientY + offset[1]) + 'px';
        }
    });
}
// Appel de la fonction pour rendre la sidebar déplaçable
const sidebar = document.getElementById('sidebar');
makeDraggable(sidebar);

const ecoleIcon = L.icon({
    iconUrl: 'img/location_marker.png',  // Remplacez avec l'URL de votre icône
    iconSize: [30, 30],        // Taille de l'icône
    iconAnchor: [16, 32],      // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32]      // Point où le popup s'affiche par rapport à l'icône
});

// // Coordonnées de l'école
// const ecoleCoords = [33.301425, -8.3543];  // Coordonnées de l'école (longitude, latitude)

// // Groupe de marqueurs pour les écoles
// const ecoleMarkers = L.layerGroup([
//     L.marker(ecoleCoords, { icon: ecoleIcon }).bindPopup(`
//         <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; border-radius: 8px; padding: 10px; color: white;">
//             <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">Institut spécialisé en tourisme et hotellerie</h3>
//             <p>Une description de l'école à Haouzia.</p>
//         </div>
//     `).bindTooltip('Institut spécialisé en tourisme et hotellerie', {
//         permanent: true,  // L'étiquette reste visible en permanence
//         direction: 'top',  // Affiche l'étiquette au-dessus du marqueur
//         className: 'custom-tooltip',
//         offset: [0, -20],
//         opacity: 0.9
//     })
// ]);

// Coordonnées des écoles
const ecoles = [
    {
        coords: [33.301425, -8.3543],  // Coordonnées de l'école 1
        name: "Institut spécialisé en tourisme et hôtellerie",
        description: "L'école hôtelière offre une formation complète et pratique, prépare pour des carrières dans l’industrie de l’hôtellerie, du tourisme et de l’accueil. L'équipe d’enseignants expérimentés est dédiée à  offrir une expérience éducative de qualité, qui équilibre théorie et pratique.",
        image:"./img/place/INSTITUT DE TOURISME.jpg"
    },
    {
        coords: [33.250815,  -8.433788],  // Coordonnées de l'école 2
        name: "L’Ecole Nationale des Sciences Appliquées d’El Jadida –ENSAJ",
        description: "ENSAJ–, est un établissement ‎public qui a pour vocation la formation d’ingénieurs d’état, la formation continue et la ‎recherche scientifique.",
        image:"./img/place/ensaj.webp"
    },
    {
        coords: [33.251167, -8.432893],  // Coordonnées de l'école 3
        name: "La Faculté des Sciences Juridiques, Economiques et sociales d’El Jadida",
        description: "‎« FSJESJ » a été créée par transformation de la Faculté polydisciplinaire et ce par le décret N° ‎‎2.18.236 du 11 Mai 2018 qui lui confère, à partir de l'année universitaire 2018/2019, le statut ‎d'une composante relevant de l’Université Chouaib Doukkali. la FSJESJ est un établissement ‎jeune, dynamique et tourné vers l’avenir. L’ouverture de son nouveau siège est le premier ‎jalon du Pôle Universitaire en création à Mazagan.‎",
        image:"./img/place/fsjes.jpg"
    }
];

// Groupe de marqueurs pour les écoles
const ecoleMarkers = L.layerGroup(
    ecoles.map(ecole => {
        return L.marker(ecole.coords, { icon: ecoleIcon })
        .bindPopup(`
        <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; opacity: 0.9; border-radius: 8px; padding: 10px; color: white;">
            <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">${ecole.name}</h3>
            
            <!-- Add image inside the popup -->
            <div style="text-align: center; margin-top: 10px;">
                <img src="${ecole.image}" alt="${ecole.name}" style="max-width: 100%; border-radius: 5px;" />
            </div>
            
            <p style="margin-top: 10px;">${ecole.description}</p>
        </div>
    `)
            .bindTooltip(ecole.name, {
                permanent: true,  // L'étiquette reste visible en permanence
                direction: 'top',  // Affiche l'étiquette au-dessus du marqueur
                className: 'custom-tooltip',
                offset: [0, -20],
                opacity: 0.9
            });
    })
);


// Écouteur de changement pour la checkbox "Ecole"
const ecoleCheckbox = document.getElementById('ecole');
ecoleCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // Ajouter la couche des écoles et centrer la vue sur l'école
        map.addLayer(ecoleMarkers);
        map.setView([33.258663, -8.414154], 12);  // Centrer la carte sur l'école
    } else {
        // Retirer la couche des écoles
        map.removeLayer(ecoleMarkers);
    }
});



const PatrimoineIcon = L.icon({
    iconUrl: 'img/location_marker.png',  // Remplacez avec l'URL de votre icône
    iconSize: [30, 30],        // Taille de l'icône
    iconAnchor: [16, 32],      // Point d'ancrage de l'icône (au centre)
    popupAnchor: [0, -32]      // Point où le popup s'affiche par rapport à l'icône
});


const Patrimoines = [
    {
        coords: [33.241101, -8.431267],  // Coordonnées de l'école 1
        name: "Madinat Almojahidine",
        description: "Les portugais s’enfuient et quittent la ville en mars 1769. Le sultan qui avait résidé plusieurs mois au sein du Ribat retourne vers son palais.",
        image:"./img/place/Mojahidin.jpg"
    },
    {
        coords: [33.242645,  -8.436191],  // Coordonnées de l'école 2
        name: "Phare de Sidi Mesbah",
        description: "Le phare de Sidi Mesbah est une tour carrée avec galerie et petite lanterne, de 18 m de haut. Le phare est peint en blanc, et la galerie et lanterne sont vertes. Il émet, à une hauteur focale de 50 mètres, un éclat alternativement blanc et rouge toutes les six secondes.",
        image:"./img/place/sidi mesbah.jpg"
    },
    {
        coords: [33.251406, -8.397223],  // Coordonnées de l'école 3
        name: "Cimetière Achohada",
        description: "Commémoration du 20 août,une occasion propice pour se remémorer les grands sacrifices des martyrs d’El Adir et l’une des grandes épopées de l’histoire du Maroc.",
        image:"./img/place/chohada.jpg"
    }
];

// Groupe de marqueurs pour les écoles
const PatrimoineMarkers = L.layerGroup(
    Patrimoines.map(Patrimoine => {
        return L.marker(Patrimoine.coords, { icon: PatrimoineIcon })
        .bindPopup(`
        <div style="font-family: Arial, sans-serif; width: 250px; background-color: #6aafba; opacity: 0.9; border-radius: 8px; padding: 10px; color: white;">
            <h3 style="margin: 0; text-align: center; font-size: 16px; font-weight: bold;">${Patrimoine.name}</h3>
            
            <!-- Add image inside the popup -->
            <div style="text-align: center; margin-top: 10px;">
                <img src="${Patrimoine.image}" alt="${Patrimoine.name}" style="max-width: 100%; border-radius: 5px;" />
            </div>
            
            <p style="margin-top: 10px;">${Patrimoine.description}</p>
        </div>
    `)
            .bindTooltip(Patrimoine.name, {
                permanent: true,  // L'étiquette reste visible en permanence
                direction: 'top',  // Affiche l'étiquette au-dessus du marqueur
                className: 'custom-tooltip',
                offset: [0, -20],
                opacity: 0.9
            });
    })
);


// Écouteur de changement pour la checkbox "Ecole"
const PatrimoineCheckbox = document.getElementById('patrimoine');
PatrimoineCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // Ajouter la couche des écoles et centrer la vue sur l'école
        map.addLayer(PatrimoineMarkers);
        map.setView([33.245528, -8.419218], 15);  // Centrer la carte sur l'école
    } else {
        // Retirer la couche des écoles
        map.removeLayer(PatrimoineMarkers);
    }
});


// Définition des données des communes
const communes = [
    {
        coords: [33.286695, -8.346795],
        nom_commune: 'Azemmour',
        orientation: 'top',
        angle: 0
    },
    {
        coords: [33.252143, -8.333215],
        nom_commune: 'Ouled Rahmoune',
        orientation: 'right',
        angle: 20
    },
    {
        coords: [33.234644, -8.502289],
        nom_commune: 'El Jadida',
        orientation: 'bottom',
        angle: -45
    },
    {
        coords: [33.196226, -8.4872],
        nom_commune: 'Moulay Abdellah',
        orientation: 'left',
        angle: 90
    }
];

// Création d'un LayerGroup pour les étiquettes des communes
const communeLabels = L.layerGroup().addTo(map);

// Ajouter les étiquettes à la carte
communes.forEach(function(commune) {
    const tooltip = L.tooltip({
        permanent: true,   // L'étiquette reste visible en permanence
        direction: commune.orientation,  // Direction de l'étiquette
        className: 'commune-tooltip',  // Classe CSS personnalisée pour les styles
        opacity: 1,  // Opacité à 100%, mais sans background
        offset: [0, 0]  // Ajuster l'offset si besoin
    }).setContent(commune.nom_commune);  // Le contenu de l'étiquette (nom_commune)

    // Créer un marqueur transparent uniquement pour l'étiquette
    L.marker(commune.coords, { opacity: 0 })  // Marqueur invisible
        .bindTooltip(tooltip)  // Lier l'étiquette au marqueur
        .addTo(communeLabels);

    // Appliquer l'angle de rotation à l'étiquette
    tooltip.on('add', function() {
        const tooltipNode = tooltip.getElement();
        if (tooltipNode) {
            tooltipNode.style.transform += ` rotate(${commune.angle}deg)`;  // Appliquer l'angle de rotation
        }
    });
});

// CSS pour supprimer la flèche et ajuster les styles
const style = document.createElement('style');
style.innerHTML = `
    .commune-tooltip {
        background-color: transparent !important;  /* Pas de fond */
        border: none !important;  /* Pas de bordure */
        font-weight: bold;
        color: white;  /* Couleur du texte en noir */
        text-shadow: none !important;  /* Pas de contour blanc */
        transform-origin: center;  /* Centre de rotation pour l'angle */
    }

    .commune-tooltip::before, .commune-tooltip::after {
        display: none !important;  /* Suppression de la flèche */
    }
`;
document.head.appendChild(style);