
var dropdown = document.querySelector('.dropdown');
const menu = document.querySelector('.dropdown-menu');
dropdown.addEventListener('click',()=>{
      if(dropdown.classList.contains("open")){
        menu.style.animation=`closeheight 0.5s forwards`;
      }
      else{
        menu.style.animation=`openheight 0.5s forwards`;
      }
      dropdown.classList.toggle('open');
});

// adding event listener to dom for menu close
document.addEventListener('click',(e)=>{
  let targetElement = e.target;
  if(targetElement !== dropdown && !dropdown.contains(targetElement) ){
      
      if(dropdown.classList.contains('open')){
        menu.style.animation =`closeheight 0.5s forwards`;
      }

      dropdown.classList.remove('open');
  }

})



    

    
const navSlide = ()=>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const dropdownlinks = document.querySelectorAll('.dropdown-menu li');
    
     burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');
        if(nav.classList.contains('nav-active')){
          document.body.style.overflow = 'hidden';
        }else{
          document.body.style.overflowY = 'auto';
        }
           
            //animate links
        navLinks.forEach((link,index)=>{
            if(link.style.animation){
                link.style.animation = ''
            }
            else{
                link.style.animation = `navLinksfade 0.5s ease forwards ${index / 7+ 0.5}s`
            }
    
            dropdownlinks.forEach((link,index)=>{
            link.style.animation = `navLinksfade 0.5s ease forwards`;
        })
    });
            //burger animation
        burger.classList.toggle('toggle');
 });
    
        
}
    
navSlide();