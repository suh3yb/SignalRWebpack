import { HubConnectionBuilder } from '@microsoft/signalr';
import './css/main.css';

const nrOfUsersNode: HTMLDivElement = document.querySelector('#nrOfUsers');
const divMessages: HTMLDivElement = document.querySelector('#divMessages');
const tbMessage: HTMLInputElement = document.querySelector('#tbMessage');
const btnSend: HTMLButtonElement = document.querySelector('#btnSend');
const btnServerTest: HTMLButtonElement =
  document.querySelector('#btnServerTest');
const btnServer: HTMLButtonElement = document.querySelector('#btnServer');
const btnSendPrivateSelf: HTMLButtonElement = document.querySelector(
  '#btnSendPrivateSelf'
);
const username = new Date().getTime();

const connection = new HubConnectionBuilder()
  .withUrl('/hub')
  .withAutomaticReconnect()
  .build();

connection.on('chatMessageReceived', (username: string, message: string) => {
  const m = document.createElement('div');

  m.innerHTML = `
    <div class="message-author">${username}</div>
    <div class="message">${message}</div>
    `;

  appendChild(m);
});

connection.on('serverMessageReceived', (message: string) => {
  const m = document.createElement('div');

  m.innerHTML = `
    <div class="server-message">${message}</div>
    `;

  appendChild(m);
});

connection.on('nrOfUsersReceived', (nrOfUsers: number) => {
  nrOfUsersNode.innerText = nrOfUsers.toString();
});

connection.start().catch(err => document.write(err));

tbMessage.addEventListener('keyup', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    send();
  }
});

btnSend.addEventListener('click', send);
btnServerTest.addEventListener('click', test);
btnServer.addEventListener('click', server);
btnSendPrivateSelf.addEventListener('click', sendPrivateSelfMessage);

function appendChild(child: HTMLDivElement) {
  divMessages.appendChild(child);
  divMessages.scrollTop = divMessages.scrollHeight;
}

function send() {
  connection
    .send('newMessage', username, tbMessage.value, null, false)
    .then(() => (tbMessage.value = ''));
}

function test() {
  connection.send('test', username);
}

function server() {
  connection.send('serverMessage', username);
}

function sendPrivateSelfMessage() {
  connection
    .send(
      'newMessage',
      username,
      tbMessage.value,
      connection.connectionId,
      true
    )
    .then(() => (tbMessage.value = ''));
}
