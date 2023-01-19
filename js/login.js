let username = document.getElementById("username");
let password = document.getElementById("password");



function checkUserInput() {
    let vaildUserName = username.checkValidity();
    let vaildPassword = password.checkValidity();
    if (vaildUserName && vaildPassword) {
        CheckUsernameAndPassword();
    }

}

async function CheckUsernameAndPassword() {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let empData = await fetch(`http://localhost:3000/employees?username=${usernameValue}&password=${passwordValue}`);
    let empDataObject = await empData.json();
    console.log(empDataObject);
    if (empDataObject[0].role == "admin") {
        alert("this is Admin ")
    } else if (empDataObject[0].role == "employee") {
        alert("this is employee")
        // location.href("")

    }
    else {
        alert("this username is not valid")
    }
}

let loginBtn = document.querySelector('button[type="submit"]')

loginBtn.addEventListener('click', (e) => {

    e.preventDefault();
    checkUserInput();
})