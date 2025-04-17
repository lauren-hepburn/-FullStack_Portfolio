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


  //GIthub Random Repo code
  const github_button = document.getElementById('rand_repo_button');
  let github_output = document.getElementById('repo_output');

  async function getRandomRepo() {
    github_output.textContent = 'Loading...';

    try {
      // Search for popular public repos with >1000 stars
      const page = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(`https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc&page=${page}&per_page=30`);

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const repos = data.items;

      if (repos.length > 0) {
        const randomRepo = repos[Math.floor(Math.random() * repos.length)];
        output.innerHTML = `
          <a href="${randomRepo.html_url}" target="_blank">${randomRepo.full_name}</a><br>
          ⭐ ${randomRepo.stargazers_count}<br>
          ${randomRepo.description || 'No description'}
        `;
      } else {
        github_output.textContent = 'No repositories found.';
      }
    } catch (error) {
      console.error(error);
      github_output.textContent = 'Failed to load repository.';
    }
  }

  github_button.addEventListener('click', getRandomRepo);

  //TASK TRACKER CODE
  // Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
const task_tracker_add_button = document.getElementById("task_button");
task_tracker_add_button.addEventListener('click', newElement);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("task_input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("task_input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      }
    }
  }

  // TEMPERATURE CONVERTER
  var fah_input = document.getElementById("temp_converter_input_fah");
  const fah_button = document.getElementById("temp_converter_button_fah");
  var to_cel = document.getElementById("fah_to_cel");

  var cel_input = document.getElementById("temp_converter_input_cel");
  const cel_button = document.getElementById("temp_converter_button_cel");
  var to_fah = document.getElementById("cel_to_fah");

  fah_button.addEventListener('click', convertToCelcius);
  cel_button.addEventListener('click', convertToFahrenheit);

  function convertToCelcius() {
    if (fah_input.value.trim() == "") {
      to_cel.textContent = "You must enter a numerical value!"
    } else {
      let fahrenheitValue = Number(fah_input.value);
      let converted = (fahrenheitValue - 32) * 5 / 9;
      to_cel.textContent = `${fah_input.textContent} Fahreinheit in Celcius is ${converted.toFixed(0)}.`;
    }
  }

  function convertToFahrenheit() {
    if (cel_input.value.trim() == "") {
      to_fah.textContent = "You must enter a numerical value!"
    } else {
      let celciusValue = Number(cel_input.value);
      let converted = (celciusValue * 9 / 5) + 32;
      to_fah.textContent = `${cel_input.textContent} Celcius in Fahrenheit is ${converted.toFixed(0)}.`;
    }
  }


  function getDaysInMonth(year, month)
  {
    return new Date(year, month, 0).getDate();
  }


  //POMODORO TIMER
  let timerDisplay = document.getElementById('pomo_timer');
  let startButton = document.getElementById('pomo_start');
  let resetButton = document.getElementById('pomo_reset');
  let pauseButton = document.getElementById('pomo_pause');

  let workTime = 25 * 60; // 25 minutes in seconds
  let breakTime = 5 * 60; // 5 minutes in seconds
  let currentTime = workTime;
  let isRunning = false;
  let isPaused = false;
  let interval;

  function updateTimerDisplay(seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function startTimer() {
    console.log("Starting timer");
      if (!isRunning) {
          isRunning = true;
          isPaused = false;
          interval = setInterval(() => {
              if (currentTime > 0) {
                  currentTime--;
                  updateTimerDisplay(currentTime);
              } else {
                  clearInterval(interval);
                  isRunning = false;
                  alert('Time is up!');
                  // Switch between work and break time
                  currentTime = (currentTime === workTime) ? breakTime : workTime;
                  updateTimerDisplay(currentTime);
              }
          }, 1000);
      }
  }

  function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    isPaused = false;
    currentTime = workTime;
    updateTimerDisplay(currentTime);
    pauseButton.textContent = 'Pause'; // Reset button text
  }

  function togglePause() {
    if (isRunning) {
        if (isPaused) {
            // Resume the timer
            isPaused = false;
            pauseButton.textContent = 'Pause';
            interval = setInterval(() => {
                if (currentTime > 0) {
                    currentTime--;
                    updateTimerDisplay(currentTime);
                } else {
                    clearInterval(interval);
                    isRunning = false;
                    alert('Time is up!');
                    // Switch between work and break time
                    currentTime = (currentTime === workTime) ? breakTime : workTime;
                    updateTimerDisplay(currentTime);
                }
            }, 1000);
        } else {
            // Pause the timer
            isPaused = true;
            pauseButton.textContent = 'Play';
            clearInterval(interval);
        }
    }
  }


  startButton.addEventListener('click', startTimer);
  resetButton.addEventListener('click', resetTimer);
  pauseButton.addEventListener('click', togglePause);

  // Initialize display
  updateTimerDisplay(currentTime);


  //CANVAS ELEMENT IN PROJECTS
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');


  // 🌸 Light pink gradient background
  const bgGradient = ctx.createLinearGradient(0 , 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#ffe6f0'); // Light pink top
  bgGradient.addColorStop(1, '#ffd6ec'); // Slightly deeper pink bottom
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🌈 Rainbow text gradient
  const textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  textGradient.addColorStop(0, "red");
  textGradient.addColorStop(0.17, "orange");
  textGradient.addColorStop(0.34, "yellow");
  textGradient.addColorStop(0.51, "green");
  textGradient.addColorStop(0.68, "blue");
  textGradient.addColorStop(0.85, "indigo");
  textGradient.addColorStop(1, "violet");

  // Set text style
  ctx.font = "bold 40px sans-serif";
  ctx.fillStyle = textGradient;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // ✨ Draw text in the center
  ctx.fillText("Hello world!", canvas.width / 2, canvas.height / 2);


  const timerButton = document.getElementById('timer_button');
  timerButton.addEventListener('click', startTimer);
  // COUNTDOWN TIMER
  function startTimer() {
    const hoursInput = document.getElementById('hours').value;
    const minutesInput = document.getElementById('minutes').value;
    const secondsInput = document.getElementById('seconds').value;

    let totalSeconds = parseInt(hoursInput) * 3600 + parseInt(minutesInput) * 60 + parseInt(secondsInput);

    if (totalSeconds == 0) {
      alert('You must enter a value above zero!');
    } else {
      const timerDisplay = document.getElementById('timer');

      const interval = setInterval(() => {
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          timerDisplay.textContent =
              `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

          if (totalSeconds <= 0) {
              clearInterval(interval);
              alert('Timer is done!');
          }

          totalSeconds--;
      }, 1000);
    }
  }
});
