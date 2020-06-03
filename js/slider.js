class Slider {
    constructor(SldierContanerId, timer, imagesArray, sliderHtmlContent, Addbutton) {
        this.sliderContainerId = SldierContanerId;
        this.Addbutton = Addbutton; // set to true or false to hide buttons
        this.time = timer; // image change interval in ms
        this.imagesArray = imagesArray;
        this.sliderHtmlContent = sliderHtmlContent;
        this.buttonArray = []
        this.i = this.imagesArray.length - 1
        this.creatSlider();
    }
    creatSlider() {
        var sliderContainer = document.getElementById(this.sliderContainerId);
        sliderContainer.className += "slider_container"
        if (this.Addbutton) {
            this.sliderText = document.createElement('div')
            this.sliderText.className = "slider_text col-md-10 col-sm-12 m-auto";
            this.sliderText.id = this.sliderContainerId + '_text'
            sliderContainer.appendChild(this.sliderText);
        } //check with montor
        //img        
        this.sliderImg = document.createElement('img')
        this.sliderImg.className = "img_slide";
        this.sliderImg.alt = this.sliderContainerId + '_alt'
        this.sliderImg.id = this.sliderContainerId + '_img'
        sliderContainer.appendChild(this.sliderImg);
        //
        if (this.Addbutton) {
            var buttonContainer = document.createElement('div')
            buttonContainer.className = "sliderNav";
            buttonContainer.id = this.sliderContainerId + '_button'
            sliderContainer.appendChild(buttonContainer);
            //Preview
            let buttonClass = [
                "fas fa-chevron-left sliderBtn",
                "fas fa-play sliderBtn",
                "fas fa-pause sliderBtn",
                "fas fa-chevron-right sliderBtn",
            ]
            buttonClass.forEach(buttonClassName => {
                let button = document.createElement('button')
                button.className = buttonClassName
                button.type = "button"
                this.buttonArray.push(button)
                buttonContainer.appendChild(button);
            });
            this.sliderEvent();
        }
        this.startSlide();
    }
    startSlide() {
        if (this.Addbutton) {
            this.buttonArray[1].style.display = "none" //   Hide play Button
            this.buttonArray[2].style.display = "block" //Show pause Button
        }
        this.next()
        this.changeSlide = setTimeout(function () { //Start the loop
            //next image
            this.startSlide() //repeat itself
        }.bind(this), this.time);
    }
    next() { //next image
        if (this.i < this.imagesArray.length - 1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.sliderImg.src = this.imagesArray[this.i];
        if (this.Addbutton) {
            this.sliderText.innerHTML = this.sliderHtmlContent[this.i];
        }
        return this.imagesArray[this.i];
    }
    preview() {
        clearTimeout(this.changeSlide); //clear the loop
        this.buttonArray[1].style.display = "block" //Show the play button
        this.buttonArray[2].style.display = "none" //Hide the pause button
        if (this.i == 0) {
            this.i = this.imagesArray.length - 1;
        } else {
            this.i--;
        }
        this.sliderImg.src = this.imagesArray[this.i];
        this.sliderText.innerHTML = this.sliderHtmlContent[this.i];
    }
    sliderEvent() {
        // Preview Button
        this.buttonArray[0].addEventListener('click', this.preview.bind(this));
        // Next Button
        this.buttonArray[3].addEventListener('click', function () {
            clearTimeout(this.changeSlide);
            this.buttonArray[2].style.display = "none"
            this.buttonArray[1].style.display = "block"
            this.next()
        }.bind(this));
        //Play Button
        this.buttonArray[1].addEventListener('click', function () {
            this.buttonArray[1].style.display = "none"
            this.buttonArray[2].style.display = "block"
            this.startSlide()
        }.bind(this));
        //PauseButton
        this.buttonArray[2].addEventListener('click', function () { //PauseButton
            clearTimeout(this.changeSlide)
            this.buttonArray[2].style.display = "none"
            this.buttonArray[1].style.display = "block"
        }.bind(this));
        //keyBoard Event
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                return this.next()
            };
            if (event.key === 'ArrowLeft') {
                return this.preview()
            }
        })
    }

}