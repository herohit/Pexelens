const search_label=document.querySelector('.search label i');
const search_div=document.querySelector('.search');
const search_inp = document.querySelector('.search input');
search_inp.disabled = true;
search_inp.style.cursor='not-allowed';
search_label.style.cursor='not-allowed';
search_div.style.cursor='not-allowed';


const delete_popup = document.querySelector('.delete-page');
const cancelBtn = delete_popup.querySelector('span');
const open_popup =document.querySelector('.close');

cancelBtn.addEventListener('click',(e)=>{
    delete_popup.style.display='none';
})
open_popup.addEventListener('click',(e)=>{
    if(window.getComputedStyle(delete_popup).display === "none"){
        delete_popup.style.display='block';
    }
    else{
        delete_popup.style.display='none';

    }
})
