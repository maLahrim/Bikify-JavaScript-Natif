class VeloMap {
    constructor(zoomLevel, zoomCenter, timerMinutes, sectionContainerId, title) {
        this.title = title;
        this.sectionContainerId = sectionContainerId;
        this.timerMinutes = timerMinutes; //timer In minutes
        this.city = sectionContainerId; // Map Conatiner 
        this.zoomLevel = zoomLevel // Map Zoom Level
        this.zoomCenter = zoomCenter // Map Center coordinate(index of Station used to get it's position)
        this.map;
        this.creatMap();
    }
    //end of Constructor
    creatMap() {
        // Add map Class to Parent container
        this.ParentContainer = document.getElementById(this.sectionContainerId);
        this.ParentContainer.className += 'map_container';
        //Creat Map Container
        this.mapContainer = creatNewElement('div', this.sectionContainerId + '_map', 'veloMap');
        this.ParentContainer.appendChild(this.mapContainer);
        console.log(this.sectionContainerId + " MapContainer : Ok");
        //Creat Map Title
        this.mapTitle = creatNewElement('h4', this.sectionContainerId + '_title', 'map_title');
        //Check if a booking existe
        if (sessionStorage.getItem(this.sectionContainerId + "_oldBookingTime")) {
            this.customerLastName = sessionStorage.getItem(this.sectionContainerId + '_customerLastName');
            this.customerFirstName = sessionStorage.getItem(this.sectionContainerId + '_customerFirstName');
            this.customerstation = sessionStorage.getItem(this.sectionContainerId + '_customerStation');
            let bookTime = sessionStorage.getItem(this.sectionContainerId + "_oldBookingTime");
            this.oldTimer = setInterval(function () {
                let now = new Date().getTime();
                let delay = bookTime - now;
                let seconds = Math.floor((delay % (1000 * 60)) / 1000);
                let minutes = Math.floor((delay % (1000 * 60 * 60)) / (1000 * 60));
                this.mapTitle.innerHTML = 'Vélo réservé par ' + this.customerFirstName + ' ' + this.customerLastName + ' à la ' + this.customerstation + ',</br> Valable pendant <span class="time">' + minutes + '</span> :<span class="time"> ' + seconds + '</span> minutes.';
                if (delay < 0) {
                    clearInterval(this.oldTimer);
                    this.mapTitle.innerHTML = "Votre réservation est expirée ,veuillez séléctionner un nouveau vélo";
                    this.mapTitle.style.fontSize = "1.3rem";
                    this.mapTitle.style.color = "#ee293f";
                    sessionStorage.removeItem(this.sectionContainerId + "_oldBookingTime");
                    sessionStorage.removeItem(this.sectionContainerId + "_customerLastName");
                    sessionStorage.removeItem(this.sectionContainerId + "_customerFirstName");
                    sessionStorage.removeItem(this.sectionContainerId + "_customerStation");
                }
            }.bind(this), 1000);
        } else {
            this.mapTitle.innerHTML = this.title;
        }
        //Set map title
        this.ParentContainer.appendChild(this.mapTitle);
        //Get JCdecaux APi
        jcdApi('7ee775b17d7ed74cda7b8700967b87403e551647', this.city).then(stations => { // Get Api Response
            // Creat Google Map
            this.map = getMap(this.mapContainer, stations, this.zoomLevel, this.zoomCenter);
            // Call form
            this.bookingForm = new Booking(this.sectionContainerId, this.timerMinutes, this.oldTimer);
            console.log(this.sectionContainerId + " Form : Ok");
            //Creat Html Form
            this.bookingForm.creatForm()
            stations.forEach(station => { //Creat Stations
                //Filter Station
                if (station.status === "OPEN") {
                    station.status = "OUVERT"
                }
                if (station.status === "CLOSED") {
                    station.status = "FERMÉE"
                }
                station.name = station.name.replace(/[0-9]/g, '');
                //get index of each Station
                let stationIndex = stations.indexOf(station);
                if (station.address) {
                    //Creat Markers
                    let newMarker = creatMarker(stationIndex, station.position, station.available_bikes, station.address, station.available_bike_stands, station.status, station.name, this.map);
                    //
                    markerEvent(newMarker, this.map.infoWindow, this.bookingForm, this.sectionContainerId);
                    this.map.markers.push(newMarker)
                }
            })
            //Groupe markers
            markerCluster(this.map, this.map.markers)
        })
        this.selectCity()
    };
    selectCity() {
        this.mapButton = document.querySelectorAll(".selectMapBtn")
        this.nantes = document.getElementById("nantes")
        this.lyon = document.getElementById("lyon")
        this.lyon.style.display = "none"
        // Select city button event Listener
        this.mapButton[1].addEventListener("click", function () {
            this.mapButton[1].style.backgroundColor = "#344968"
            this.mapButton[0].style.backgroundColor = "#ee293f"
            this.lyon.style.display = "block"
            this.nantes.style.display = "none"
        }.bind(this))
        this.mapButton[0].addEventListener("click", function () {
            this.mapButton[1].style.backgroundColor = "#ee293f"
            this.mapButton[0].style.backgroundColor = "#344968"
            this.lyon.style.display = "none"
            this.nantes.style.display = "block"
        }.bind(this))

    }
}