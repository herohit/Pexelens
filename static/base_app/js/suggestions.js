document.querySelector("#scrollToTop").addEventListener("click", ()=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Change the placeholder text
  var inputField = document.querySelector("#search-input");
  inputField.placeholder = "Search people...";

//     const Allbtn = document.querySelectorAll('.btn-flip');
//   Allbtn.forEach(btn =>{
//     btn.addEventListener('click',()=>{
//         btn.classList.toggle('hover');
//     })
//   })





const error_message = document.querySelector('.error-messages');
const error_message_btn = document.querySelector('.error-message button');

error_message_btn.addEventListener('click',()=>{
    error_message.style.display='none';
  })


$(document).ready(function(){
    $('.btn-flip').click(function(e){
      e.preventDefault();
      var $button = $(this);
      var isFollowing = $button.hasClass('following');
      var userId = $(this).data('userid');
      var action = isFollowing ? 'unfollow' : 'follow';
      var csrfToken = $(this).data('csrf');
      var error_message_p = $('.error-message p');
      $.ajax({
        type:'POST',
        url: '/profile/' + userId +'/',
        data:{action:action, 'csrfmiddlewaretoken': csrfToken},
        success:function(response){
          if (isFollowing) {
            $button.removeClass('following');
            $button.removeClass('hover');
          } else {
            $button.addClass('following');
            $button.addClass('hover');

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