// Add event listeners to the buttons
//document.getElementById('review-button').addEventListener('click', function() {
//  window.location.href = '/Review'; // Redirect to the Review page
//});

document.getElementById('review-button').addEventListener('click', function() {
  window.open('/Review', 'ReviewWindow'); // Open the Review page in a new window
});


document.getElementById('update-profile-button').addEventListener('click', function() {
  window.location.href = '/Contact'; // Redirect to the Update Profile page
});

document.getElementById('disconnect-button').addEventListener('click', function() {
  window.location.href = '/Disconnect'; // Redirect to the Cancel Membership page
});
