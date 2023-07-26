document.querySelector("#scrollToTop").addEventListener("click", ()=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Check if the .no-post element exists
    var noPostElement = document.querySelector('.no-notification');
    var scrollToTopButton = document.getElementById('scrollToTop');
  
    if (noPostElement) {
      scrollToTopButton.style.display = 'none'; // Hide the scroll-to-top button
    }
  });


const search_label=document.querySelector('.search label i');
const search_div=document.querySelector('.search');
const search_inp = document.querySelector('.search input');
search_inp.disabled = true;
search_inp.style.cursor='not-allowed';
search_label.style.cursor='not-allowed';
search_div.style.cursor='not-allowed';