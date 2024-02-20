window.history.forward()

sessionStorage.setItem('username', "user")
sessionStorage.setItem('password', "123")

function validate() {

    let storedUsername = sessionStorage.getItem('username');
    let storedPassword = sessionStorage.getItem('password');

    let username = document.getElementById('username').value; 
    let password = document.getElementById('password').value;

    if ((username === storedUsername) && (password === storedPassword)) {
        location.href = "resume.html"
    } else {
        alert('Invalid credential');
    }
}

document.getElementById('login-btn').addEventListener('click', validate);