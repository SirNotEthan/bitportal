import users from './logins.js';

document.getElementById('login-btn').addEventListener('click', async function(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    console.log("Username:", usernameInput);
    console.log("Password:", passwordInput);

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);
    console.log("Matching User:", user);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '../index.html';
    } else {
        alert('Invalid username or password.');
    }
});
