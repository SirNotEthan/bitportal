const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const addReminder = document.getElementById('add-reminder-btn');
const reminderModal = document.getElementById('reminderModal');
const reminderSettingsModal = document.getElementById('reminderSettingsModal');
const reminderCloseModal = document.querySelector('.reminder-close-btn');
const reminderSettingCloseModal = document.querySelector('.reminder-settings-close-btn');
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

function displayReminders() {
    const remindersContainer = document.querySelector('.reminders');
    const remindersList = document.querySelectorAll('.notification');
    remindersList.forEach(notification => notification.remove());

    reminders.forEach(reminder => {
        if (reminder.title && reminder.date && reminder.time && reminder.createdBy) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <div class="icon">
                    <span class="material-icons-sharp">
                        start
                    </span>
                </div>
                <div class="content">
                    <div class="info">
                        <h3>${reminder.title}</h3>
                        <small>${reminder.time} ${reminder.date}</small>
                        <small>Created by: ${reminder.createdBy}</small>
                    </div>
                    <div class="reminder-settings" id="reminder-settings-btn">
                        <span class="material-icons-sharp">
                            more_vert
                        </span>
                    </div>
                </div>
            `;
            remindersContainer.appendChild(notification);

            const reminderSettings = notification.querySelector('#reminder-settings-btn');
            reminderSettings.addEventListener('click', () => {
                reminderSettingsModal.style.display = 'block';
            });
        } else {
            console.error("Reminder data is incomplete:", reminder);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('.profile .info p').innerHTML = `Hey, <b>${user.name}</b>`;
    document.querySelector('.profile .info small').innerText = user.role;
    document.querySelector('.profile-photo img').src = user.profilePic;
    displayReminders();

    const ReminderPermissions = ['Owner', 'Admin'];

    if (!ReminderPermissions.includes(user.role)) {
        addReminder.style.display = 'none';
        // reminderSettings.style.display = 'none';  // You need to handle this within each reminder
    }

    if (typeof Payments !== 'undefined') {
        Payments.forEach(payment => {
            const tr = document.createElement('tr');
            const trContent = `
                <td>${payment.productName}</td>
                <td>${payment.productNumber}</td>
                <td>${payment.paymentStatus}</td>
                <td class="${payment.status === 'Declined' ? 'danger' : payment.status === 'Pending' ? 'warning' : 'primary'}">${payment.status}</td>
                <td class="primary">Details</td>
            `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }
});

// Sidebar toggle functionality
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

document.getElementById('reminderForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('reminderTitle').value;
    const date = document.getElementById('reminderDate').value;
    const time = document.getElementById('reminderTime').value;

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    const reminder = {
        title: title,
        date: date,
        time: time,
        createdBy: user.name  
    };

    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    document.getElementById('reminderForm').reset();
    reminderModal.style.display = 'none';
    displayReminders();
});

addReminder.addEventListener('click', () => {
    reminderModal.style.display = 'block';
});

reminderCloseModal.addEventListener('click', () => {
    reminderModal.style.display = 'none';
});

reminderSettingCloseModal.addEventListener('click', () => {
    reminderSettingsModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === reminderModal) {
        reminderModal.style.display = 'none';
    } else if (event.target === reminderSettingsModal) {
        reminderSettingsModal.style.display = 'none';
    }
});
