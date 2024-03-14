const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')

const socket = io();

socket.on('message', message => {
    console.log(message)
    displayMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target?.elements?.msg?.value;
    console.log(msg)
    socket.emit('chatMessage', msg)
})

function displayMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Shree <span>&nbsp;9:12pm</span></p>
    <p class="text">${msg}</p>`;
    document.querySelector('.chat-messages')?.appendChild(div)
}