// Root
let root = document.documentElement;

// Nav
let navDropDown = document.getElementById('navDropdown');
let navMainLogo = document.getElementById('navMainLogo');

// Switches
let lightModeCheckbox = document.getElementById('lightModeSwitch');
let hackerModeCheckBox = document.getElementById('hackerModeSwitch');

// SE main image
let seImage = document.getElementById('seImage');

// Container
let mainContainer = document.getElementById('mainContainer');
let screenSaver = document.getElementById('screenSaver');

// On Load function calls
if (!localStorage.getItem('light_mode')) {
  localStorage.setItem('light_mode', false);
}

if (!localStorage.getItem('hacker_mode')) {
  localStorage.setItem('hacker_mode', false);
}

if (JSON.parse(localStorage.getItem('hacker_mode'))) {
  toggleHackerMode();
}
else {
  toggleLightMode();
}

// Search engine toggle
navMainLogo.addEventListener('click', function () {
  navDropDown.classList.toggle('active');
  if (navDropDown.classList.contains('active')) {
    navMainLogo.style.transform = 'rotate(180deg)';
  } else {
    navMainLogo.style.transform = 'rotate(0deg)';
  }
});

// Hacker mode
hackerModeCheckBox.addEventListener('change', function () {
  // Switch off light mode
  lightModeCheckbox.checked = false;

  localStorage.setItem('light_mode', false);
  localStorage.setItem('hacker_mode', hackerModeCheckBox.checked ? true : false);

  if (hackerModeCheckBox.checked) {
    toggleHackerMode();
  }
  else {
    toggleLightMode();
  }

});

function toggleHackerMode() {
  lightModeCheckbox.checked = false;
  hackerModeCheckBox.checked = true;

  toggleLightMode();

  root.style.setProperty('--main-bg', "url('.././assets/bg_main/matrix.webp')");
  root.style.setProperty('--fav-bg', '#00000000')
  root.style.setProperty('--fav-box-shadow', 'none')
}

// Light Mode
lightModeCheckbox.addEventListener('change', function () {
  localStorage.setItem('light_mode', lightModeCheckbox.checked ? true : false);

  if (lightModeCheckbox.checked) {
    hackerModeCheckBox.checked = false;
  }
  toggleLightMode();
});

function changeSearch(value) {
  let logoElm = document.getElementById(value);
  // Hide dropdown
  navDropDown.classList.toggle('active');
  navMainLogo.style.transform = 'rotate(0deg)';
  // Replace main logo with this logo
  let tempLogoSrc = navMainLogo.src;
  navMainLogo.src = logoElm.src;
  logoElm.src = tempLogoSrc;

  // Replace se image and form values
  let formMain = document.getElementById('formMain');
  let formInput = document.getElementById('formInput');

  let logoVal;
  if (navMainLogo.src.includes('google')) {
    logoVal = 'google';
    formInput.placeholder = 'Search Google';
    formMain.action = 'https://www.google.com/search';
  }
  else if (navMainLogo.src.includes('yahoo')) {
    logoVal = 'yahoo';
    formInput.placeholder = 'Search Yahoo';
    formMain.action = 'https://www.google.com/search';
  }
  else {
    logoVal = 'bing';
    formInput.placeholder = 'Search Bing';
    formMain.action = 'https://www.google.com/search';
  }

  let src = `assets/se_main/${logoVal}_se.png`;
  seImage.src = src;

}

function toggleLightMode() {

  let lightMode = JSON.parse(localStorage.getItem('light_mode'));
  lightModeCheckbox.checked = lightMode;

  let lightModeVar = {
    '--main-bg': '#F9F5F6',
    '--fav-bg': '#FFF',
    '--fav-shadow': '#9BABB8',
    '--fav-img-wrapper': '#F0F0F0',
    '--fav-box-shadow': 'rgba(54, 53, 53, 0.5) 0px 2px 8px 0px',
    '--nav': '#D9D7F1',
    '--lg-mode': '#092635',
    '--bg-btn': 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)',
    '--bg-btn-saver': 'linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)',
  };

  let darkModeVar = {
    '--main-bg': '#161A30',
    '--fav-bg': '#0E2954',
    '--fav-shadow': '#B6BBC4',
    '--fav-img-wrapper': '#F0F0F0',
    '--fav-box-shadow': 'rgba(157, 132, 183, 0.5) 0px 2px 8px 0px',
    '--nav': '#fff',
    '--lg-mode': '#F1F0E8',
    '--bg-btn': 'linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)',
    '--bg-btn-saver': 'linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
  };

  Object.entries(lightMode ? lightModeVar : darkModeVar).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}


window.onbeforeunload = function () {
  lightModeCheckbox.checked = false;
  hackerModeCheckBox.checked = false;
  window.location.reload(true);
}

// Toggle FS
document.addEventListener('fullscreenchange', checkExitFullScreen);

function checkExitFullScreen() {
  if (!document.fullscreenElement) {
    exitFullScreenMode();
  }
}

function toggleFullscreen() {
  enterFullScreenMode();
  if (document.fullscreenElement) {
    exitFullScreenMode();
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen()
      .catch(err => {
        console.error('Error attempting to enable fullscreen:', err.message);
      });
  }
}

function exitFullScreenMode() {
  screenSaver.classList.add('d-none');
  mainContainer.classList.remove('d-none');
}

function enterFullScreenMode() {
  mainContainer.classList.add('d-none');
  screenSaver.classList.remove('d-none');
}



