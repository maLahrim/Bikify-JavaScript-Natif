class Menu {
    constructor(menuBtnId, headerId, navId, menuLink) {
        this.menuBtn = document.getElementById(menuBtnId); // menu button 
        this.headerId = document.getElementById(headerId);
        this.navId = navId, //menu container
        this.menuLink = menuLink // link content and url
        this.makeMenu();
        this.menuEvent();//invocation 
    }
    // Creat menu 
    makeMenu() {
        var menuParent = document.getElementById(this.navId)
        this.menuList = document.createElement('ul'); // déclarer
        this.menuList.className = "collapsible_menu navbar-nav mr-auto";
        this.menuList.id = this.navId + '_list'; //this.menuId+'menu'
        menuParent.appendChild(this.menuList);

        this.menuLink.forEach(link => {
            var newLink = document.createElement('li');
            this.menuList.appendChild(newLink);
            newLink.innerHTML = '<a class="nav-link" href="' + link.url + '">' + link.name + '</a>'
            //Links events
            newLink.addEventListener('click', function () {
                this.menuList.style.display = "none";
                this.headerId.style.borderRadius = "0px";
            }.bind(this))
        })
    }
    menuEvent() {
        //Button Menu event 
        this.menuBtn.addEventListener('click', function () {
            if (this.menuList.style.display === "block") { //if est un block
                this.menuList.style.display = "none";
                this.headerId.style.borderRadius = "0px";
            } else {
                this.menuList.style.display = "block";
                this.headerId.style.borderRadius = "0px 0px 50px 50px";
                this.menuList.style.backgroundColor = '#fff';
            }
        }.bind(this))
    }
}