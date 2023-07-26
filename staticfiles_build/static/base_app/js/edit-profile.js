const editlink=document.querySelector('.settings-profilename button');
const editform=document.querySelector('.editname-form');
const closenameBtn=document.querySelector('.editname-form span');
const main = document.querySelector('section');



editlink.addEventListener('click',()=>{
  editform.style.display = "block";
  main.classList.add('hide-body');

    // 
  setTimeout(()=> {
    editform.classList.add('show-name');
    
}, 10);
  
})

closenameBtn.addEventListener('click',()=>{
  editform.classList.remove('show-name');
  main.classList.remove('hide-body');

  
  setTimeout(()=> {
  editform.style.display = "none";
  
}, 300);
})


const error_message = document.querySelector('.error-messages');
const error_message_btn = document.querySelector('.error-message button');


if(error_message_btn){
  error_message_btn.addEventListener('click',()=>{
    error_message.style.display = 'none';
    })
}




// if (error_message) {
// setTimeout(() => {
// error_message.classList.add('hidden'); 
// }, 4000);
// }


const search_label=document.querySelector('.search label i');
const search_div=document.querySelector('.search');
const search_inp = document.querySelector('.search input');
search_inp.disabled = true;
search_inp.style.cursor='not-allowed';
search_label.style.cursor='not-allowed';
search_div.style.cursor='not-allowed';