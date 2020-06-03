                                //__Function File__\\
                                //__6 * function__\\
    //__get JCD api__\\
async function jcdApi(jcdKey, city) {
    const apiData = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=' + city + '&apiKey=' + jcdKey)
    return apiData.json() //send json Data to creat Station
};

//__Create map__\\
function getMap(mapContainer, stations, zoomLevel, zoomCenter, ) {
    const mapOptions = {
        center: stations[zoomCenter].position,
        zoom: zoomLevel,
        infoWindow: new google.maps.InfoWindow({
            /*disableAutoPan:true*/ }),
        markers: [],
        id: mapContainer.id
    }
    var newMap = new google.maps.Map(mapContainer, mapOptions);
    console.log(mapOptions.id + " GoogleMap : Ok")
    return newMap
};

//__Create Map Marker__\\
function creatMarker(index, stationPosition, availablBikes, stationAddress, stationStands, stationStatus, stationName, map, icon) {
    if (availablBikes < 10) {
        icon = 'img/yellow_marker.png'
    } else {
        icon = 'img/green_marker.png'
    }
    if (availablBikes === 0) {
        icon = 'img/red_marker.png'
    }

    let markerOption = {
        position: stationPosition,
        map: map,
        icon: icon,
        index: index,
        label: {
            color: '#344968',
            fontSize: '15px',
            text: '' + availablBikes + ''
        },
        address: stationAddress,
        availablBike: availablBikes,
        name: stationName,
        status: stationStatus,
        availablStand: stationStands,

    }
    return new google.maps.Marker(markerOption);
};
//__Marker Click Event__\\
function markerEvent(marker, infoWindow, bookingForm, sectionContainerId) {
    marker.addListener('mouseover', function () {
        marker.setAnimation(google.maps.Animation.DROP)
        infoWindow.setContent(
            '<div id="' + sectionContainerId + '_info_velo" class="infoContainer"><h4>STATION ' + marker.name + '</h4><p><i class="fas fa-map-marked-alt"></i> : ' + marker.address + '</p><p>VÉLOS DISPONIBLES : ' + marker.availablBike + '</p><p>PLACES DISPONIBLES : ' + marker.availablStand + '</p><p>ETAT : ' + marker.status + '</p></div>'
        );
        infoWindow.open(marker.map, marker);
    });
    marker.addListener('click', function showInfo() {
        if (marker.availablBike === 0) {
            alert("Aucun vélo disponible,veuillez choisire une autre station");
            infoWindow.setContent(
                '<div id="' + sectionContainerId + '_info_velo" class="infoContainer"><h4>STATION ' + marker.name + '</h4><h6>Aucun vélo disponible</h6><p><i class="fas fa-map-marked-alt"></i> : ' + marker.address + '</p><p>PLACES DISPONIBLES : ' + marker.availablStand + '</p><p>ETAT : ' + marker.status + '</p></div>'
            )
            infoWindow.open(marker.map, marker);
        } else {
            console.log("click 2")
            bookingForm.mapInfoTitle.innerHTML = "Station " + marker.name;
            bookingForm.mapInfoAddress.innerHTML = '<i class="fas fa-map-marked-alt"></i> : ' + marker.address;
            bookingForm.formAvailableBike.innerHTML = '<i class="fas fa-store"></i> : ' + marker.status + ' - <i class="fas fa-bicycle"></i> : ' + marker.availablBike + ' - <i class="fas fa-parking"></i> : ' + marker.availablStand
            bookingForm.formButton.innerHTML = "Réserver"
            bookingForm.canvas.canvasContainer.style.display = "none"
            bookingForm.firstNameInput.style.display = "block"
            bookingForm.lastNameInput.style.display = "block"
            bookingForm.fristNameTitle.style.display = "block"
            bookingForm.lastNameTitle.style.display = "block"
            bookingForm.mapInfo.style.display = "block"
            this.map.infoWindow.close();
        }
        console.log(" Bike N°:" + marker.index + " clicked")
    })
};

//__Create Marker Cluster__\\
function markerCluster(map, markerArray) { // cluster fonction
    let clusterIconStyles = [{
            textColor: '#fff',
            url: 'img/clustrer/velo1.png',
            height: 50,
            width: 50,
            anchorText: [-9, 0],
            textSize: 15,
        },
        {
            textColor: '#fff',
            url: 'img/clustrer/velo2.png',
            height: 60,
            width: 60,
            anchorText: [-12, -1],
            textSize: 18,
        },
        {
            textColor: '#fff',
            url: 'img/clustrer/velo3.png',
            height: 60,
            width: 60,
            anchorText: [-12, -2],
            textSize: 20,
        }
    ];
    let clusterOption = {
        imagePath: 'img/clustrer/velo',
        maxZoom: 14,
        styles: clusterIconStyles
    }
    new MarkerClusterer(map, markerArray, clusterOption);
    console.log("Marker Cluster : Ok")
};
//__Créat element__\\
function creatNewElement(typeOfElement, Id, className) {
    let newElement = document.createElement(typeOfElement);
    newElement.id = Id
    newElement.className = className
    return newElement
};
// *** ***Unused***  *** \\
//__Create map script__\\
/*
initMapScript=(googleKey)=>{
    if (!document.getElementById('mapCluster')) {
        /*
       var mapScript = document.createElement('script');
        mapScript.async = true;
        mapScript.defer = true;
        mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleKey; // 
        mapScript.type = 'text/javascript';
        mapScript.id = 'mapScript';
        document.head.appendChild(mapScript);
        var mapCluster = document.createElement('script');
        mapCluster.src = 'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js'; // 
        mapCluster.type = 'text/javascript';
        mapCluster.id = 'mapCluster';
        document.head.appendChild(mapCluster);
    }
};*/

//***__Create Station Script__***\\ ***Unused*** 
/*
function creatStations(stationsArray, station, stationPosition, stationAddress, stationName,stationContractName, stationNumber, stationAvailableBikes, stationStatus, stationInformation, stationBookingBtn, stationForm,
){
    if (stationStatus === "OPEN") {
        stationStatus = "OUVERT"
    }
    if (stationStatus === "CLOSE") {
        stationStatus = "FERMÉE"
    }
    stationName = stationName.replace(/[0-9]/g, '')
    var newStation = {
        position: stationPosition,
        address: stationAddress,
        name: stationName,
        city: stationContractName,
        Number: stationNumber,
        availablBikes: stationAvailableBikes,
        Status: stationStatus,
        index: stationsArray.indexOf(station),
        informations: stationInformation,
        bookingBtn: stationBookingBtn,
        form: stationForm,
    }
    return newStation
};
*/
