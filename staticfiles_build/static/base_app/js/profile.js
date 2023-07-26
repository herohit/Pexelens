document.addEventListener('DOMContentLoaded', function() {
  // Check if the .no-post element exists
  var noPostElement = document.querySelector('.no-post');
  var scrollToTopButton = document.getElementById('scrollToTop');

  if (noPostElement) {
    scrollToTopButton.style.display = 'none'; // Hide the scroll-to-top button
  }
});

function lazyLoadImages(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.getAttribute('data-src');
        
        // Add the lazy-load class to the image
        image.classList.add('loaded');
        
        // Update the src attribute to load the image
        image.setAttribute('src', src);
        
        // Stop observing the image once it's loaded
        observer.unobserve(image);
      }
    });
  }
  
  // Create the Intersection Observer
  const observer = new IntersectionObserver(lazyLoadImages, { rootMargin: '0px', threshold: 0.1 });
  
  // Get all the images with data-src attribute
  const images = document.querySelectorAll('img[data-src]');
  
  // Observe each image
  images.forEach((image) => {
    observer.observe(image);
  });
  
    const followers = document.querySelector('.all-followers');
    const following = document.querySelector('.all-following');
    const following_btn = document.querySelector('.my-following');
    const followers_btn = document.querySelector('.my-followers');
  
    following_btn.addEventListener('click',()=>{
  
      following.classList.toggle('active');
      if(following.classList.contains('active')){
        following.style.animation = `heightactive 0.5s forwards`;
      }
      else{
        following.style.animation = `heightdeactive 0.5s`;
      }
      
      if(followers.classList.contains('active')){
  
  followers.style.animation = `heightdeactive 0.5s`;
  }
      followers.classList.remove('active');
      
  
  });
  followers_btn.addEventListener('click',()=>{
      followers.classList.toggle('active');
      if(followers.classList.contains('active')){
        followers.style.animation = `heightactive 0.5s forwards`;
      }
      else{
        followers.style.animation = `heightdeactive 0.5s`;
      }
  
      if(following.classList.contains('active')){
  
  following.style.animation = `heightdeactive 0.5s`;
  }
      following.classList.remove('active');
  
      
  });
  
  document.addEventListener('click',(e)=>{
      let targetElement = e.target;
      if(targetElement !== followers_btn && targetElement !== following_btn && !followers.contains(targetElement) && !following.contains(targetElement) ){
          
          if(followers.classList.contains('active')){
            followers.style.animation = `heightdeactive 0.5s`;
          }
          if(following.classList.contains('active')){
  
            following.style.animation = `heightdeactive 0.5s`;
          }
          followers.classList.remove('active');
          following.classList.remove('active');
      }

  })


  document.querySelector("#scrollToTop").addEventListener("click", ()=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });





//  to handle ajax request of follow unfollow 

    
    
  function handleFollowUnfollow(event){
    event.preventDefault();
    var action = $(this).data('value');
    var userId = $(this).data('userid');
    var csrfToken = $(this).data('csrf');
    var $button = $(this);

    $.ajax({
      url:'/profile/' + userId +'/',
      method:'POST',
      data:{action:action,'csrfmiddlewaretoken': csrfToken},
      success:function(response){
        if(action === 'follow'){
          $button.text('Unfollow');
          $button.data('value', 'unfollow'); // Update the button text
          $button.removeClass('follow-btn').addClass('unfollow-btn');
          updateFollowerCount(1);
          console.log("followed successfully !");
        }else if (action === 'unfollow'){
          $button.text('Follow'); // Update the button text
          $button.data('value', 'follow');
          $button.removeClass('unfollow-btn').addClass('follow-btn');
          updateFollowerCount(-1);
          console.log('unfollow Successfully');
        }
      },
      error:function(xhr,status,error){
        console.error('Error',error);
      },
    });
  }

  function updateFollowerCount(change) {
    var $followerCount = $('#followerCount');
    var count = parseInt($followerCount.text());
    count += change;
    $followerCount.text(count);
  }


  $(document).ready(function(){
    $('.unfollow-btn, .follow-btn').click(handleFollowUnfollow);
    });


const search_label=document.querySelector('.search label i');
const search_div=document.querySelector('.search');
const search_inp = document.querySelector('.search input');
search_inp.disabled = true;
search_inp.style.cursor='not-allowed';
search_label.style.cursor='not-allowed';
search_div.style.cursor='not-allowed';