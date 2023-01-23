// function to controll flow of admin panel 
// function changeDisplayedTable()
let navBar = document.getElementById("reportsTabs")

navBar.addEventListener("click", (e) => {
    // this.classList.remove("active");
    console.log(navBar)

    // e.classList.add("active")
})

// first table in admin page (pending people who need admin permission)

pendingBody = document.getElementById("allpending");
fetch("http://localhost:3000/employees?accepted=false", {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            pendingBody.appendChild(tr);

            let name = document.createElement("td");
            name.innerText = `${data[i].firstName} ${data[i].lastName}`;
            tr.appendChild(name);

            let email = document.createElement("td");
            email.innerText = data[i].email;
            tr.appendChild(email);

            let age = document.createElement("td");
            age.innerText = data[i].age;
            tr.appendChild(age);

            let postition = document.createElement("td");
            if (data[i] == 0) {
                postition.innerText = "Employee"
            } else if (data[i] == 1) {
                postition.innerText = "Secuirty"
            } else {
                postition.innerText = "Admin"
            }
            tr.appendChild(postition)

            let confirm = document.createElement("td");
            confirm.innerHTML = "<button id=`accept-${i}` class='btn-light px-2'>&check;</button> <button class='btn-danger px-2'>X</button>"
            tr.appendChild(confirm)
        }
    })
// full employee report (Second table in admin page)
fullEmployeeReport = document.getElementById("fullEmployeeReports");

fetch("http://localhost:3000/employees", {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            fullEmployeeReport.appendChild(tr);

            let empName = document.createElement("td");
            empName.innerText = `${data[i].firstName} ${data[i].lastName}`;
            tr.appendChild(empName);

            let email = document.createElement("td");
            email.innerText = data[i].email;
            tr.appendChild(email);

            let age = document.createElement("td");
            age.innerText = data[i].age;
            tr.appendChild(age);

            let postition = document.createElement("td");
            if (data[i] == 0) {
                postition.innerText = "Employee"
            } else if (data[i] == 1) {
                postition.innerText = "Secuirty"
            } else {
                postition.innerText = "Admin"
            }
            tr.appendChild(postition)
            let startDate = document.createElement("td");
            startDate.innerText = data[i].startDate;
            tr.appendChild(startDate);

        }
    })

// Daily Report
dailyReport = document.getElementById("dailyReport");
fetch("http://localhost:3000/employees", {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            dailyReport.appendChild(tr);

            let empName = document.createElement("td");
            empName.innerText = `${data[i].firstName} ${data[i].lastName}`;
            tr.appendChild(empName);

            let late = document.createElement("td");
            late.innerText = data[i].late;
            tr.appendChild(email);

            let absent = document.createElement("td");
            absent.innerText = data[i].absent;
            tr.appendChild(absent);

            let postition = document.createElement("td");
            if (data[i] == 0) {
                postition.innerText = "Employee"
            } else if (data[i] == 1) {
                postition.innerText = "Secuirty"
            } else {
                postition.innerText = "Admin"
            }
            tr.appendChild(postition)
        }
    })


