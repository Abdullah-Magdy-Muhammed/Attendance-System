import { Employee } from "./employee.js";

function setData() {
    let emp = new Employee(
        firstName.value,
        lastName.value,
        address.value,
        mail.value,
        age.value,
    );
    emp.SaveToJson();
}

// names validation
function isUserNameValide(name) {
    var usernamepattern = /^[a-zA-Z]{4,8}$/;
    return name.match(usernamepattern);
}
let firstName = document.getElementsByClassName('firstName')[0];
let lastName = document.getElementsByClassName('lastName')[0];
firstName.focus();
firstName.addEventListener('blur', (e) => {
    if (!isUserNameValide(firstName.value)) {
        firstName.focus();
        firstName.select();
        firstName.style.border = "2px solid red";
    } else {
        firstName.style.border = "2px solid green";
        lastName.focus();
    }
})
lastName.addEventListener('blur', (e) => {
    if (!isUserNameValide(lastName.value)) {
        lastName.focus();
        lastName.select();
        lastName.style.border = "2px solid red";
    } else {
        lastName.style.border = "2px solid green";
        address.focus();
    }
})
// validation for address
let address = document.getElementById('address');

address.addEventListener('blur', () => {
    address.style.border = '2px solid green';
    mail.focus();

})
// check if email is already exist or not 
let allEmails = [];

(async function mailExistence() {
    let employees = await fetch("http://localhost:3000/employees")
    let employeesobj = await employees.json();
    // let pending = await fetch("http://localhost:3000/pending")
    // let pendingObjects = await pending.json();
    employeesobj.forEach(element => {
        allEmails.push(element.email)
    });
    // pendingObjects.forEach(element => {
    //     allEmails.push(element.email)
    // });
})()
// console.log(allEmails)
// email validation
let mail = document.getElementById("mail");
mail.addEventListener("blur", unquieValidMail); // end of email validation

function isEmailValide() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);
}
function unquieValidMail() {
    if (!isEmailValide()) {
        mail.focus();
        mail.select();
        mail.style.border = "2px solid red";
        return false;
    } else {
        for (let i = 0; i < allEmails.length; i++) {
            if (allEmails[i] == mail.value) {
                return false;
            }
        }
        mail.style.border = "2px solid green";
        age.focus();
        return true;
    }
}

// end of existance mail

// get all dom elment 
let empForm = document.getElementsByClassName("needs-validation")[0];
empForm.addEventListener('submit', (e) => {

    if (

        isUserNameValide(firstName.value) &&
        isUserNameValide(lastName.value) &&
        unquieValidMail()

    ) {
        setData();

    } else {
        e.preventDefault();
        mail.focus();
        alert("This Email is Already signed up before!")


    }

})



function generateRandomName() {
    let length = 7,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
function generateRandomPassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}