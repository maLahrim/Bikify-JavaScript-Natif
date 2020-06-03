class Booking {
    constructor(sectionContainerId, minutes,oldTimer) {
        this.containerId = sectionContainerId;
        this.minute = minutes;
        this.oldTimer= oldTimer
    }
    creatForm(){
        //Create booking container/*
        this.mapInfo = creatNewElement('div',this.containerId + "_info","map_info")
        document.getElementById(this.containerId).appendChild(this.mapInfo)
        ///>
        this.mapInnerInfo = creatNewElement('div',this.containerId +"_book_confirmationn","infoContainer")
        this.mapInfo.appendChild(this.mapInnerInfo)
        //
        this.closeForm = creatNewElement('button',this.containerId +"_close_info","fas fa-times")
        this.mapInnerInfo.appendChild(this.closeForm)
        //
        this.mapInfoTitle = creatNewElement('h4',this.containerId +"_info_title","form_title")
        this.mapInnerInfo.appendChild(this.mapInfoTitle)
        //Station Address
        this.mapInfoAddress =  creatNewElement('p',this.containerId +"_info_address","form_adress")
        this.mapInnerInfo.appendChild(this.mapInfoAddress)
        //Available bikes
        this.formAvailableBike =  creatNewElement('p',this.containerId +"_info_bikes","form_bikes")
        this.mapInnerInfo.appendChild(this.formAvailableBike)
        //Main Form
        this.mapInfoForm = creatNewElement('form',this.containerId +"_form","info_form")
        this.mapInnerInfo.appendChild(this.mapInfoForm)
        this.mapInfoForm.name = this.containerId + '_form';
        this.mapInfoForm.method = 'POST';
        ///> LastName title
        this.lastNameTitle = creatNewElement('h5',this.containerId +"_form_name","form_name")
        this.mapInfoForm.appendChild(this.lastNameTitle)
        this.lastNameTitle.innerText = 'Nom'
        ///> LastName input
        this.lastNameInput = document.createElement('INPUT');
        this.mapInfoForm.appendChild(this.lastNameInput);
        this.lastNameInput.type = 'TEXT';
        this.lastNameInput.name = 'nom';
        //FirstName title
        this.fristNameTitle = document.createElement('h5');
        this.mapInfoForm.appendChild(this.fristNameTitle)
        this.fristNameTitle.innerText = 'Prénom'
        //FirstName input
        this.firstNameInput = document.createElement('INPUT');
        this.mapInfoForm.appendChild(this.firstNameInput);
        this.firstNameInput.type = 'TEXT';
        this.firstNameInput.name = 'prenom';
        //Form Canvas
        this.canvas = new canvas(this.mapInfoForm)
        this.closeForm.addEventListener('click',function(){
            this.mapInfo.style.display="none"
            this.canvas.canvasContainer.style.display="none"
            this.firstNameInput.style.display = "block"
            this.lastNameInput.style.display = "block"
            this.fristNameTitle.style.display = "block"
            this.lastNameTitle.style.display = "block"
        }.bind(this))
        //
        this.formButton = creatNewElement('button',this.containerId +"_confBtn","bookBtn confBtn")
        this.mapInfoForm.appendChild(this.formButton);
        this.formButton.type = 'button';
        this.formButton.innerHTML = "Réserver"
        //
        this.newBooking()
    }
    newBooking(){
        this.bookingExpired = document.getElementById(this.containerId + '_title')
        this.canvas.canvasContainer.style.display = "none"
        // Check Storage for customerInformations
        if (localStorage.getItem(this.containerId+'_customerLastName') 
        && localStorage.getItem(this.containerId+'_customerFirstName')) { // Check Storage 
            this.lastNameInput.value=localStorage.getItem(this.containerId+'_customerLastName')
            this.firstNameInput.value=localStorage.getItem(this.containerId+'_customerFirstName')
     }
        this.formButton.addEventListener('click', function () {
            //Select Steps
                if (this.formButton.innerHTML === "Réserver") { // = First step of booking
                    // = Check Input if empty alert customer
                    if (this.lastNameInput.value == "" || this.firstNameInput.value == "") {
                        alert('Veuillez saisir votre nom et prénom!')
                    } else { // = If filed hide input Show next step
                        this.firstNameInput.style.display = "none"
                        this.lastNameInput.style.display = "none"
                        this.fristNameTitle.style.display = "none"
                        this.lastNameTitle.style.display = "none"
                        this.canvas.canvasContainer.style.display = "block"
                        this.formButton.innerHTML = "Confirmer"
                        console.log('Step 1: Booking :Success')
                    }
                } else { // if button = confirmer => Check if new Customer  
                    if (!localStorage.getItem(this.containerId+'_customerLastName') 
                        || !localStorage.getItem(this.containerId+'_customerFirstName')){ // = New customer
                        localStorage.setItem(this.containerId+"_customerLastName", this.lastNameInput.value);
                        localStorage.setItem(this.containerId+"_customerFirstName", this.firstNameInput.value)
                        console.log('Step 2A: NewCustomer')
                    }else{ // = If old  Local Storage available
                        console.log("Step 2B: Old Customer")
                        if( // = Update Local Storage Input Data are Different
                            this.lastNameInput.value===localStorage.getItem(this.containerId+'_customerLastName')
                            && this.firstNameInput.value===localStorage.getItem(this.containerId+'_customerFirstName')){
                                // If Same Do nothing
                                console.log('customer input Same Name => Keep localStorage Data')
                            }else{ // = If if Different Update Local Storage Data
                                localStorage.setItem(this.containerId+"_customerLastName", this.lastNameInput.value);
                                localStorage.setItem(this.containerId+"_customerFirstName", this.firstNameInput.value)
                                console.log('customer input new Name => Replace Inputs Value')
                        }
                    }
                    if ( !this.canvas.canvasIsEmpty() ){
                        // check canvas if signed = Store Session Data & start Timer
                        sessionStorage.setItem(this.containerId+"_customerLastName", this.lastNameInput.value);
                        sessionStorage.setItem(this.containerId+"_customerFirstName", this.firstNameInput.value);
                        sessionStorage.setItem( this.containerId+"_customerStation", this.mapInfoTitle.innerHTML);
                        console.log('Step 2: Booking :Success')
                        if(this.timer){clearInterval(this.timer),sessionStorage.clear()}// if no refresh but booking existe 
                        if(this.oldTimer){clearInterval(this.oldTimer),sessionStorage.clear()}// if refresh timer existe 
                        alert('Réservation confirmée, veuillez récupérer votre vélo.') //confirme booking
                        this.mapInfo.style.display = "none"
                        this.startTimer()
                        // Hide Button and Canvas
                        this.bookingExpired.style.color="#344968"
                        this.firstNameInput.style.display = "block"
                        this.lastNameInput.style.display = "block"
                        this.fristNameTitle.style.display = "block"
                        this.lastNameTitle.style.display = "block"
                        this.formButton.innerHTML = "Réserver"
                        this.canvas.canvasContainer.style.display = "none"
                        this.canvas.ctx.clearRect(0,0,this.canvas.container.width,this.canvas.container.height)
                    }else  {
                        console.log("Canvas is empy")
                        alert('Veuillez signer le formulaire!')
                        this.firstNameInput.style.display = "none"
                        this.lastNameInput.style.display = "none"
                        this.fristNameTitle.style.display = "none"
                        this.lastNameTitle.style.display = "none"
                        this.canvas.canvasContainer.style.display = "block"
                        this.formButton.innerHTML = "Confirmer"
                    }
                }
        }.bind(this))
    }
    //timer
    startTimer(){
        //get actual time 
        var time = new Date().getTime()+(1000) + (this.minute * 60 * 1000);
        this.timer = setInterval(function () {
            var now = new Date().getTime();
            let delay = time - now
            var seconds = Math.floor((delay % (1000 * 60)) / 1000);
            var minutes = Math.floor((delay % (1000 * 60 * 60)) / (1000 * 60));
            this.bookingExpired.innerHTML = 'Vélo réservé par '+ this.firstNameInput.value +' '+ this.lastNameInput.value + ' à la ' + this.mapInfoTitle.innerHTML + ',</br> Valable pendant <span class="time">' + minutes + '</span> :<span class="time"> ' + seconds + '</span> minutes.';
            //store Booking time on sessionStorage (used on map.js to check if a booking existe and get the old timer)
            sessionStorage.setItem(this.containerId+"_oldBookingTime", time);
                if (delay < 0) {
                    clearInterval(this.timer);
                    this.bookingExpired.innerHTML = "Votre réservation est expirée ,veuillez sélectionner une nouvelle station"
                    this.bookingExpired.style.fontSize="1.3rem"
                    this.bookingExpired.style.color="#ee293f"
                    sessionStorage.removeItem(this.containerId+'_oldBookingTime')
                    sessionStorage.removeItem(this.containerId+'_customerLastName');
                    sessionStorage.removeItem(this.containerId+'_customerFirstName');
                    sessionStorage.removeItem( this.containerId+'_customerStation');
                }
        }.bind(this), 1000); //interval every seconde
    }
}
