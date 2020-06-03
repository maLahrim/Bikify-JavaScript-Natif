class canvas {
    constructor(mapInfoForm) {

        this.formContainer = mapInfoForm;
        this.creatContainer()
    }
    creatContainer() {
        //CanvasContainer
        this.canvasContainer = creatNewElement('div', this.formContainer.id + "_Canvas_container", "canvasContainer")
        // Add to bookingForm
        this.formContainer.appendChild(this.canvasContainer);
        //Canvas Title
        this.title = document.createElement('p');
        this.canvasContainer.appendChild(this.title);
        this.title.innerText = 'Veuillez signer pour confirmer votre réservation';
        //Canvas Element
        this.container = document.createElement('canvas');
        this.ctx = this.container.getContext('2d');
        this.container.className = 'canvas';
        this.canvasContainer.appendChild(this.container);
        //Erase canvas button
        this.eraseCanvas = creatNewElement('button', this.formContainer.id + "_erase_canvas", "fas fa-trash");
        this.eraseCanvas.type = 'button';
        this.eraseCanvas.style.color = "344968";
        this.canvasContainer.appendChild(this.eraseCanvas);
        this.eraseCanvas.addEventListener('click', function () {
            this.ctx.clearRect(0, 0, this.container.width, this.container.height)
        }.bind(this));
        //Canvas Size
        this.container.width = '250';
        this.container.height = '150';
        this.rect = this.container.getBoundingClientRect();
        // Call Settings
        this.canvasSettings();
    }

    canvasSettings() {
        let signature = false;
        let signing = (e) => {
            //Get mouse position on the canvas container
            var mousePos = {
                x: e.clientX - this.container.getBoundingClientRect().left,
                y: e.clientY - this.container.getBoundingClientRect().top
            }
            if (!signature) return;
            //Canvas style
            this.ctx.strokeStyle = "#344968"
            this.ctx.lineWidth = 4;
            this.ctx.lineCap = "round";
            //methodes
            this.ctx.lineTo(mousePos.x, mousePos.y);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(mousePos.x, mousePos.y);
        }
        //Drawing functions (Mouse)
        let startPosition = (e) => {
            signature = true;
            signing(e)
            this.container.style.cursor = "pointer"
        }
        let endPosition = () => {
            signature = false;
            this.ctx.beginPath();
            this.container.style.cursor = "default"
        }
        //Mouse events
        this.container.addEventListener("mousedown", startPosition);
        this.container.addEventListener("mouseup", endPosition);
        this.container.addEventListener("mousemove", signing);
        // Drawing functions (Touche)
        let startPadPosition = (e) => {
            signature = true;
            toutchStart(e)

        }

        let toutchStart = (e) => {
             // Stop Scroll
            if (e.target == this.container) {
                e.preventDefault();
            }
            //Touche Position
            let touchePos = e.touches[0];
            let rect = this.container.getBoundingClientRect();
            let touchPadX = touchePos.clientX - rect.left;
            let touchPadY = touchePos.clientY - rect.top;
            if (!signature) return;
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = "round";
            this.ctx.lineTo(touchPadX, touchPadY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(touchPadX, touchPadY)
        }
        //Touche Events
        this.container.addEventListener("touchstart", startPadPosition);
        this.container.addEventListener("touchend", endPosition);
        this.container.addEventListener("touchmove", toutchStart);
    }
        // Check Canvas to (used to validate the form)
    canvasIsEmpty() {
        const buffer = new Uint32Array(
            this.ctx.getImageData(0, 0, this.container.width, this.container.height).data.buffer
        );
        return !buffer.some(color => color !== 0);
    }
}