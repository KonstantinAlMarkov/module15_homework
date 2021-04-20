const btn = document.querySelector('.j-btn-test');
const screenP = document.querySelector('#screen');
const coordsP = document.querySelector('#coords');

function getScreenSize()
{
    screenP.innerText = `Ширина экрана:${window.screen.width}px высота:  ${window.screen.height}px`;
}

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  coordsP.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
    getScreenSize();
    
    if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

