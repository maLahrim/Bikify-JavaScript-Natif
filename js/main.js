const mainMenu = new Menu(
    "menu_button",
    "main_header",
    'main_nav',
    [{name:'ACCUEIL',url:"#accueil_hook"},{name:'RÉSERVATION',url:"#slider_container_text"},{name:'CONTACT',url:"#contact_hook"}]
);
//Sliders
const sliderHome = new Slider( // instance de la class Slider
    'slider_container', // Slider Container
    5000,//Slider Timer
    ["img/slider_01.jpg", "img/slider_02.jpg", "img/slider_03.jpg"],//Slider Images
    [   //Slide text content 
        "<span>1</span><div><h1>SÉLÉCTIONNEZ VOTRE STATION</h2><p>Vérifiez la disponibilité.</p></div>",
        "<span>2</span><div><h1>SAISISSEZ VOS INFORMATIONS</span></h1> <p>Signez votre réservation</p></div>",
        "<span>3</span><div><h1>RÉCUPÉREZ VOTRE VÉLO</span></h1> <p>Votre vélo sera réservé pendant 20 minutes</p></div>"
    ],
    true, // add button to slide 
);
/* Pour supprimer un Carte il suffit de la commenter et de supprimer le boutton html*/
const lyon = new VeloMap(
    14,// Map Zoom Level
    322, // Bike Station Index
    20, // Booking timer in minutes 
    'lyon',//Section or Container ID (only for available cityApi nantes or lyon)
    'Réservez votre vélo sur LYON', // Map Title

);
const nantes = new VeloMap(
    13,// Map Zoom Level 
    1, // Bike Station Index
    20, // Booking timer in minutes 
    'nantes',//Section or Container ID (only for available cityApi nantes or lyon)
    'Réservez votre vélo sur NANTES', // Map Title
);
    //"7ee775b17d7ed74cda7b8700967b87403e551647", // JcdKey
    //  'AIzaSyCLOKVvGq8nsWlevMr-_HPqRKp0939QV4w', // GoogleKey 1
    // AIzaSyB06wtl_uh1EUSqnOMVfDf8GVyBBeDfe78 // Main GoogleKey 1