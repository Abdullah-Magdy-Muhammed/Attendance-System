let username = document.getElementById("username");
let password = document.getElementById("password");



async function CheckUsernameAndPassword() {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let adminData = await fetch(`http://localhost:3000/admin?username=${usernameValue}&password=${passwordValue}`);
    let adminDataObject = await adminData.json();
    let empData = await fetch(`http://localhost:3000/employees?username=${usernameValue}&password=${passwordValue}`);
    let empDataObject = await empData.json();
    if (adminDataObject.length) {
        alert("this is Admin ")
    } else if (empDataObject.length) {
        alert("this is employee")

    }
    else {
        alert("this username is not valid")
    }
}

let loginBtn = document.querySelector('button[type="submit"]')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (CheckUsernameAndPassword()) {

    }



})