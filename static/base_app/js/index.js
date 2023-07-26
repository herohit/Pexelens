const navSlide = ()=>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');
        //animate links
        navLinks.forEach((link,index)=>{
            if(link.style.animation){
                link.style.animation = ''
            }
            else{
                link.style.animation = `navLinksfade 0.5s ease forwards ${index / 7+ 0.5}s`
            }
        });
        //burger animation
        burger.classList.toggle('toggle');
    });

    
}

navSlide();




var reveal = document.querySelector('.reveal');
var revealtext = reveal.querySelector('a');
var logo = document.querySelector('.logo');
var cameraicon = document.querySelector('.camera-icon');
var camera_i = cameraicon.querySelector('i');
var main = document.querySelector('main');
var sidebar = document.querySelector('.account-sidebar');


  
  // Call the disableScroll function before the animation starts


  // Disable scrolling
function disableScroll() {
    document.body.style.overflow = "hidden";
  }
  
  // Enable scrolling
  function enableScroll() {
    document.body.style.overflow = "";
    reveal.style.position = 'fixed';
  }
  
  // Call the disableScroll function before the animation starts
  disableScroll();


function animateOnLoad() {
  gsap.to(reveal,{top:0,left:'10%',duration:2,delay:1.2 , onComplete: enableScroll});
  gsap.fromTo(logo,{y:0},{y:-50,duration:2,delay:1.2});
  gsap.to(revealtext,{fontSize:'1.5rem',duration:2,color:'black',delay:1.2});
  gsap.to(cameraicon,{left:'100%',rotate:360,duration:2});
  gsap.to(camera_i,{duration:2,color:'white',delay:0.2});
  gsap.fromTo(main,{opacity:'0'},{opacity:'1',duration:1,delay:2.8});
  gsap.fromTo(sidebar,{opacity:'0'},{opacity:'1',duration:2,delay:4});
}


// window.onload = animateOnLoad;

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click',()=>{
  dropdown.classList.toggle('open');
})

