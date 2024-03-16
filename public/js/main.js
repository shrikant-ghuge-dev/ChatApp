const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const socket = io();

socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({ room, users }) => {
    displayRoomName(room);
    displayUsers(users);
})
socket.on('message', message => {
    console.log(message)
    displayMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
        return false;
    }
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function displayMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">${msg.text}</p>`;
    document.querySelector('.chat-messages')?.appendChild(div)
}

function displayRoomName(room) {
    roomName.innerText = room;
}

function displayUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    }
});