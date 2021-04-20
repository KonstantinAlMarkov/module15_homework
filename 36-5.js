const chatMessages = document.getElementById("chatMessages");
const btnSendMessage = document.querySelector('.sendMessage');
const btnGetGeo = document.querySelector('.getGeo');
const textInput = document.querySelector('.chatMessages');
btnSendMessage.disabled = true;
btnGetGeo.disabled = true;


const wsUri = "wss://echo.websocket.org/";
let websocket;

window.onload = (event) => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        console.log("CONNECTED");
        //избегаем ошибок без асинхронности - просто блокируем кнопки до соединения
        btnSendMessage.disabled = false;
        btnGetGeo.disabled = false;
      };
    websocket.onclose = function(evt) {
        console.log("DISCONNECTED");
        btnSendMessage.disabled = true;
        btnGetGeo.disabled = true;
      };
    websocket.onmessage = function(evt) {
      if(evt.data.indexOf('https://www.openstreetmap.org/#map=18')===-1) 
        {
         appendMessage(
          evt.data, 'response'
        );           
        }
      };
    websocket.onerror = function(evt) {
        appendMessage(
          'ERROR:' + evt.data, 'error'
        );
      };
}


function appendMessage(messageText, type)
{
     var li = document.createElement("li");
     li.setAttribute("id", type);
 li.appendChild(document.createTextNode(messageText));
     chatMessages.appendChild(li);  
}
                                     
btnSendMessage.addEventListener('click', () => {
  const message = textInput.value;
  appendMessage(message, 'request');
  textInput.value = '';
  websocket.send(message);
});

//функционал опеределения местоположения
// Функция, выводящая текст об ошибке
const error = () => {
  appendMessage('Невозможно получить ваше местоположение','error');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
 // console.log('position:' + position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const openRequest = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  appendMessage(openRequest,'geodata');
  websocket.send(openRequest);
}

btnGetGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    appendMessage('Geolocation не поддерживается вашим браузером','error');
  } else {
    console.log = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
