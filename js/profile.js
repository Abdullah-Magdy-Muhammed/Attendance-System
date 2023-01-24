const username = localStorage.getItem("username");

let fullName = document.getElementById("fullname");
let position = document.getElementById("position");
let headAddress = document.getElementById("headaddress");
let address = document.getElementById("address");
let headName = document.getElementById("headname");
let email = document.getElementById("email");
let age = document.getElementById("age")

fetch(`http://localhost:3000/employees?username=${username}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]) // array of object of every employee
        fullName.innerText = `${data[0].firstName} ${data[0].lastName}`;
        headName.innerText = `${data[0].firstName} ${data[0].lastName}`;
        position.innerText = `${data[0].role}`;
        address.innerText = `${data[0].address}`;
        headAddress.innerText = `${data[0].address}`;

        email.innerText = `${data[0].email}`;
        age.innerText = `${data[0].age}`

    })