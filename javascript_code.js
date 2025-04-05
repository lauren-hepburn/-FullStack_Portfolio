document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie_consent_banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');
  const calcAgeBtn = document.getElementById('calculate_age');
  let birthday = document.getElementById('calculate_age_birthday');
  birthday.max = new Date().toISOString().split("T")[0];

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

  //Calculate the user's age based on a date centered
  calcAgeBtn.addEventListener('click', function() {
    let birthdate = new Date(birthday.value);

    // User's birthday info
    const birthday_year = birthdate.getFullYear();
    const birthday_month = birthdate.getMonth() + 1;
    const birthday_day = birthdate.getDate()

    // Today's date info
    let today = new Date();
    const current_year = today.getFullYear();
    const current_month = today.getMonth() + 1;
    const current_day = today.getDate();

    let years, months, days;
    years = current_year - birthday_year;

    if (current_month >= birthday_month)
    {
      months = current_month - birthday_month
    }
    else
    {
      years--;
      months = 12 + current_month - birthday_day
    }

    if(current_day >= birthday_day)
    {
      days = current_day - birthday_day
    }
    else {
      months--;
      days = getDaysInMonth(birthday_year, birthday_month) + current_day - birthday_day;
    }
    if (months < 0) { months = 11; years--;}

    document.getElementById('age_text_response').innerText = 'You are ' + years + ' year(s), ' + months + ' month(s), and ' + days + ' day(s) old.'
  })
});



function getDaysInMonth(year, month)
{
  return new Date(year, month, 0).getDate();
}
