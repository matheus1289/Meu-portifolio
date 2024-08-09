window.sr = ScrollReveal({ reset: true});

sr.reveal('.titulo', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay: 500
});
sr.reveal('.subtitulo', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:1000
});
sr.reveal('.carta', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:1500
});
sr.reveal('.foto', { 
    duration: 2000
    
});
sr.reveal('.habilidades', { 
    duration: 2000
});
sr.reveal('.container-2', { 
    duration: 2000
});
sr.reveal('.img-2', { 
    duration: 2000
});
sr.reveal('.sobre-mim', { 
    duration: 2000,
    delay:1000

});
sr.reveal('.container3', { 
    duration: 1000
});
sr.reveal('.projetos:nth-child(1)', { 
    duration: 2000,
    origin:'left',
    distance:'50px'
});
sr.reveal('.projetos:nth-child(2)', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:300
});
sr.reveal('.projetos:nth-child(3)', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:600
});
sr.reveal('.projetos:nth-child(4)', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:900
});
// fim do scroll reviel

// scroll da header
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 1)
})
window.addEventListener("scroll", function(){
    let cima = document.querySelector('.icon')
    cima.classList.toggle('view',window.scrollY > 100)
})
// fim scrol header

// menu reponsivo
const hambergeButton = document.querySelector("#hambergeButton");
const closeButton = document.querySelector(".ativar");
const mobileMenu = document.querySelector("#mobileMenu");
const menu = document.querySelector("#menu-item");



hambergeButton.addEventListener("click", function (){
    if (hambergeButton.classList.contains('ativar')){
        mobileMenu.classList.add("flex-menu");
        
    }else{
        mobileMenu.classList.remove("flex-menu");
    }

});
menu.addEventListener("click", function(){
    mobileMenu.classList.remove("flex-menu");
    hambergeButton.classList.toggle("ativar");
    
});





