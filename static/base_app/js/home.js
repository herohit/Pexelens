
// nav hider
var prevScrollpos = window.pageYOffset;
var navBar = document.querySelector("nav");

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  
  // Show/hide the navbar based on scroll direction and position
  if (prevScrollpos > currentScrollPos) {
    navBar.style.top = "0";
  } else if (currentScrollPos > 20 * window.innerHeight / 100) {
    navBar.style.top = "-8vh";
  }

  prevScrollpos = currentScrollPos;
}

  // Define the Intersection Observer callback function
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


  //page bottom to up scollers  
 document.querySelector("#scrollToTop").addEventListener("click", ()=> {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});





const error_message = document.querySelector('.error-messages');
const error_message_btn = document.querySelector('.error-message button');



error_message_btn.addEventListener('click',()=>{
  error_message.style.display='none';
})

// press enetr to post comment
const commentInput = document.querySelectorAll('.comment-input-field input');
const sendCommentButton = document.querySelectorAll('.send-comment');

commentInput.forEach((input,index)=>{
  input.addEventListener('keydown',function(e){
    if(e.key === 'Enter'){
      e.preventDefault();
      sendCommentButton[index].click();
    }
  })
})

// pop up onpage commemnt box
const commentBtns =document.querySelectorAll('.comment-button-home');
const postcommentdiv = document.querySelectorAll('.post-box-comment');
const commentdivCloseBtn = document.querySelectorAll('.close-commentdiv');
const commentdivSendBtn = document.querySelectorAll('.send-comment');
const commentdivinput = document.querySelectorAll('.comment-input-field input');



commentBtns.forEach((button,index) =>{
  button.addEventListener('click',(e)=>{
    postcommentdiv[index].style.height = '90px';
    commentdivinput[index].value = "";
  });
});

commentdivSendBtn.forEach((button,index)=>{
  button.addEventListener('click',()=>{
      postcommentdiv[index].style.height = '0px';
    });
});


commentdivCloseBtn.forEach((button,index) =>{
  button.addEventListener('click',(e)=>{
    postcommentdiv[index].style.height = '0px';
  });
});




$(document).ready(function(){

  // ajax for comment button
  $('.send-comment').click(function(e){
    e.preventDefault();
    var postId = $(this).data('post-id');
    var commentValue = $(this).siblings('input[type="text"]').val();
    var commentCountElement = $('.comment-count-home[data-post-id="' + postId + '"]');  
    var error_message_p = $('.error-message p');
    var csrfToken = $(this).data('csrf');
    $.ajax({
      type:'POST',
      url: '/comment-post/' + postId,
      data:{'post_id':postId,'commentValue':commentValue,'csrfmiddlewaretoken': csrfToken},
      success:function(response){

        commentCountElement.text(response.comment_count);
        if(response.success){
          error_message_p.text(response.success)
          console.log(response.success)
        }
        else if(response.error){
          error_message_p.text(response.error)
          console.log(response.error)
        }

        

        error_message.style.display='block';
        

        setTimeout(()=>{
          error_message.style.display='none';
        },2000)
      },
      error:function(xhr, errmsg, err){
        console.log(xhr.status + ": " + xhr.responseText);
        error_message.style.display='block';
        

        setTimeout(()=>{
          error_message.style.display='none';
        },2000)
        error_message_p.text("Something went wrong!")
      }
    });

  });


// ajax for like button
$('.like-btn-home').click(function(e) {
  e.preventDefault();
  var likeButton = $(this);
  var postId = $(this).data('post-id');
  var csrfToken = $(this).data('csrf');
  var likeCountElement = $('.like-count-home[data-post-id="' + postId + '"]');
  var heartIcon = likeButton.find('i');
  var error_message_p = $('.error-message p');
  $.ajax({
    type: 'POST',
    url: '/like-post/', 
    data: {
      'post_id': postId,'csrfmiddlewaretoken': csrfToken
    },
    success: function(response) {
      likeCountElement.text(response.likes_count);
      if (heartIcon.hasClass('bi-heart-fill')) {
        heartIcon.removeClass('bi-heart-fill').addClass('bi-suit-heart').css('color', '');
      } else {
        heartIcon.removeClass('bi-suit-heart').addClass('bi-heart-fill').css('color', 'red');
      }
      
    },
    error:function(xhr, errmsg, err){
      console.log(xhr.status + ": " + xhr.responseText);
      error_message.style.display='block';
      

      setTimeout(()=>{
        error_message.style.display='none';
      },2000)
      error_message_p.text("Something went wrong!")
    }
    
  });
});


});



