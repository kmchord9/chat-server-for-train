var socket = io();

var messagesElem = document.getElementsByClassName('kaiwa line')[0];
var form = document.getElementById('form');
var textarea = document.getElementById('textarea');
var event = new Event( "submit", {"bubbles":true, "cancelable":true});

form.addEventListener('submit', function(e) {
  var username = document.getElementById('username').value;
  e.preventDefault();
  if (textarea.value) {
    var post = {
      text: textarea.value,
      name: username
    }          
    socket.emit('chat message', post);
    textarea.value = '';
  }
});

form.addEventListener('keydown', function(e) {
  if ( e.keyCode === 13 && e.shiftKey ) {         
    this.dispatchEvent(event);
    e.preventDefault();
    //console.log('shift+enter');
  }
})
socket.on('chat message', function(msg) {       
  var username = document.getElementById('username').value;
  addMessageElem(messagesElem, msg.name, msg.text);
  window.scrollTo(0, document.body.scrollHeight);
});

function addMessageElem(elem, username, msg) {
  //username
  if (username=="") {
    username="匿名さん"
  }
  var usernameElem = document.createElement('div');
  usernameElem.className = 'name';
  usernameElem.textContent = username;

  //message
  var messageElem = document.createElement('div');
  messageElem.className = 'fukidasi left'; 
  messageElem.textContent = msg;

  //add elem              
  elem.appendChild(usernameElem);
  elem.appendChild(messageElem);

  //url
  var regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  msgUrl = msg.match(regexp_url);

  if (msgUrl) {
    console.log(msgUrl)
    msgUrl.forEach(element => {
      var urlElem = document.createElement('div');
      urlElem.className = 'fukidasi left';
      urlElem.innerHTML = `<a href="${element}" target="_blank">${element}</a>`;  
      elem.appendChild(urlElem);        
    });
  }
  
  return;
}