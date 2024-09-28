const ERROR_BORDER = function errorBorder(TYPE_OF_INPUT) {
  TYPE_OF_INPUT.addEventListener('focusout', function() {
    if (TYPE_OF_INPUT.value.trim() === '') {
      TYPE_OF_INPUT.classList.add('error-border');
    } else {
      TYPE_OF_INPUT.classList.remove('error-border');
    }
  })
}


export {ERROR_BORDER}