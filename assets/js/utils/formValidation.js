export default function checkFormValidity(inputs, submitBtn) {
  const isAllFilled = Array.from(inputs).every(input => input.value.trim() !== '');

  submitBtn.disabled = !isAllFilled;
  submitBtn.classList.toggle('blue', isAllFilled);
  submitBtn.classList.toggle('gray', !isAllFilled);
}