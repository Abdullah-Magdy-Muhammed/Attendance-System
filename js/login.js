let username = document.getElementById("username");
let password = document.getElementById("password");



async function CheckUsernameAndPassword() {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let empData = await fetch(`http://localhost:3000/employees?username=${usernameValue}&password=${passwordValue}`);
    let empDataObject = await empData.json();
    if (empDataObject[0].role == "admin") {
        alert("this is Admin ")
    } else if (empDataObject[0].role == "employee") {
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