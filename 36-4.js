const btn = document.querySelector('.j-btn-test');
const status = document.querySelector('#status');
//для URL api.ipgeolocation.io
const qcURL = document.querySelector('.forURL');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const getTimezone = async (latitude, longitude) => {
    const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=ca4dee1db1394658a0a988f886b6beb4&lat=${latitude}&long=${longitude}`);
    const timezoneJSON = await response.json();
    qcURL.innerHTML = `timezone= ${timezoneJSON.timezone}; date_time_txt=${timezoneJSON.date_time_txt}`;
  } 

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  status.textContent = `latitude=${latitude} longitude=${longitude}`;
  const requestResult = getTimezone(latitude, longitude);   

}

btn.addEventListener('click', () => { 
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

