import users from './logins.js';

document.addEventListener('DOMContentLoaded', () => {
    if (typeof users !== 'undefined') {
        users.forEach(user => {
            const tr = document.createElement('tr');
            const trContent = `
                <td><img src="${user.profilePic}" alt="Profile" class="user-pfp"></td>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
            `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }
})