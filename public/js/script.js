// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


// public/js/flashMessages.js

document.addEventListener("DOMContentLoaded", () => {
  const flashSuccess = document.getElementById('flash-success');
  const flashError = document.getElementById('flash-error');

  [flashSuccess, flashError].forEach(flash => {
    if (flash) {
      setTimeout(() => {
        flash.classList.remove('show');
        flash.classList.add('fade');
        setTimeout(() => {
          flash.remove();
        }, 500); // after fading, remove from DOM
      }, 3000); // after 3 seconds, start fading
    }
  });
});
