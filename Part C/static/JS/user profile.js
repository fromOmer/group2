// Add event listeners to the buttons
document.getElementById('review-button').addEventListener('click', function() {
  window.location.href = '/Review'; // Redirect to the Review page
});

document.getElementById('update-profile-button').addEventListener('click', function() {
  window.location.href = '/Contact'; // Redirect to the Update Profile page
});

document.getElementById('cancel-membership-button').addEventListener('click', function() {
  window.location.href = '/Contact'; // Redirect to the Cancel Membership page
});
