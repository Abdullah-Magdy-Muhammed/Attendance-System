let username = document.getElementById("username");
let password = document.getElementById("password");

async function CheckUsernameAndPassword() {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let empData = await fetch(`http://localhost:3000/employees?username=${usernameValue}&password=${passwordValue}`);
    let empDataObject = await empData.json();
    if (empDataObject.length == 0) {
        alert("Please Check your username and password and try again")
    }
    // guide you to admin panel
    else if (empDataObject[0].role == 2) {
        window.open("../admin.html", "_blank");
    } else if (empDataObject[0].role == 1) {
        window.open("../attendance.html", "_blank");
    }
    else if (empDataObject[0].role == 0) {
        window.open("../profile.html", "_blank");
    }
    else {
        alert("this username is not valid")
    }
}

let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let vaildUserName = username.checkValidity();
    let vaildPassword = password.checkValidity();
    if (vaildUserName && vaildPassword) {
        CheckUsernameAndPassword();
    }
})