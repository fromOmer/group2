function showAlert(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    alert('The form sent to us! thank you.'); // Show an alert to the client
    event.target.submit(); // Manually submit the form
  }
