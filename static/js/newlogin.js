const container = document.querySelector('.signin-container');
const signup_link = document.querySelector('.signup-link');
const signin_link = document.querySelector('.signin-link');
const error_message = document.querySelector('.error-messages');
const error_message_btn = document.querySelector('button');

error_message_btn.addEventListener('click',()=>{
  error_message.style.display = 'none';
})
if (error_message) {
  setTimeout(() => {
    error_message.classList.add('hidden'); // Add 'hidden' class to hide the element
  }, 3000);
}


function flipCards() {
  container.classList.toggle('flipped');
}

signup_link.addEventListener('click',flipCards);
signin_link.addEventListener('click',flipCards);