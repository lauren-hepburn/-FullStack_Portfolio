document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie_consent_banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  // Check if user already made a choice
  //const cookieConsent = localStorage.getItem('cookieConsent');
  //if (!cookieConsent) {
    //banner.style.display = 'block';
  //}

  //Always show the Cookie consent
  banner.style.display = 'block';

  // When user accepts cookies
  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
    // Place any code here to initialize cookies, analytics, etc.
    console.log('Cookies accepted');
  });

  // When user rejects cookies
  rejectBtn.addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'rejected');
    banner.style.display = 'none';
    console.log('Cookies rejected');
  });
});
