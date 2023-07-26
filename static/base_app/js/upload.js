
var textarea = document.querySelector("#id_caption");
var charCount = document.querySelector("#charCount");
textarea.setAttribute("cols", 0);
textarea.setAttribute("rows", 0);
var maxChars = 75;

textarea.addEventListener("input", function() {
  var remainingChars = maxChars - textarea.value.length;
  charCount.textContent = remainingChars + " characters remaining";

  if (remainingChars < 1) {
    textarea.value = textarea.value.slice(0, maxChars);
    remainingChars = 0;
    charCount.textContent = remainingChars + " characters remaining";
    charCount.style.color = 'red';
  }
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});


const search_label=document.querySelector('.search label i');
const search_div=document.querySelector('.search');
const search_inp = document.querySelector('.search input');
search_inp.disabled = true;
search_inp.style.cursor='not-allowed';
search_label.style.cursor='not-allowed';
search_div.style.cursor='not-allowed';