const alarms = [];
let intervalId;

function startAlarmCheck() {
    intervalId = setInterval(checkAlarms, 1000);
}

function stopAlarmCheck() {
    clearInterval(intervalId);
}

function addAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    const alarmLabel = document.getElementById('alarmLabel').value || 'Alarm';
    
    if (!alarmTime) {
        alert('Please select a time.');
        return;
    }

    const alarm = { time: alarmTime, label: alarmLabel };
    alarms.push(alarm);
    renderAlarms();
    document.getElementById('alarmTime').value = '';
    document.getElementById('alarmLabel').value = '';
    
    startAlarmCheck(); // Start checking alarms
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms() {
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = '';

    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.textContent = `${alarm.time} - ${alarm.label}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteAlarm(index);
        
        li.appendChild(deleteButton);
        alarmList.appendChild(li);
    });
}

function checkAlarms() {
    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5); // HH:MM format

    alarms.forEach(alarm => {
        if (alarm.time === currentTime) {
            notifyAlarm(alarm.label);
            // Optionally remove the alarm after it triggers
            // alarms.splice(alarms.indexOf(alarm), 1);
            // renderAlarms();
        }
    });
}

function notifyAlarm(label) {
    if (Notification.permission === "granted") {
        new Notification('Alarm!', { body: `Alarm: ${label}`, icon: 'https://via.placeholder.com/50' });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification('Alarm!', { body: `Alarm: ${label}`, icon: 'https://via.placeholder.com/50' });
            }
        });
    }
}

// Request notification permission on load
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission === "default") {
        Notification.requestPermission();
    }
});
