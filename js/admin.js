// function to controll flow of admin panel 
// function changeDisplayedTable()

let allemp;
let allAttendence;
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
            if (data[i].role == 0) {
                postition.innerText = "Employee"
            } else if (data[i].role == 1) {
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
            if (data[i].role == 0) {
                postition.innerText = "Employee"
            } else if (data[i].role == 1) {
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

const empUsername = document.getElementById("username");


fetch(`http://localhost:3000/employees`, {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
})
    .then((response) => response.json())
    .then((data) => {
        allemp = data;
        console.log(allemp);
        userId = allemp[0].id
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        fetch(`http://localhost:3000/attendence?date=${today}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                allAttendence = data;
                console.log(allAttendence)
                debugger
                allemp.forEach((emp) => {
                    let tr = document.createElement("tr");
                    for (let i = 0; i < allAttendence.length; i++) {
                        if (emp.id == allAttendence[i].employeeId) {

                            let empName = document.createElement("td");
                            empName.innerText = `${emp.firstName} ${emp.lastName}`;
                            tr.appendChild(empName);

                            let late = document.createElement("td");
                            late.innerText = allAttendence[i].late;
                            tr.appendChild(late);

                            let absent = document.createElement("td");
                            if (allAttendence[i].absent) {
                                absent.innerText = "Absent"
                            } else {
                                absent.innerText = "Attend"
                            }
                            tr.appendChild(absent);

                            let postition = document.createElement("td");
                            if (emp.role == 0) {
                                postition.innerText = "Employee"
                            } else if (emp.role == 1) {
                                postition.innerText = "Secuirty"
                            } else {
                                postition.innerText = "Admin"
                            }
                            tr.appendChild(postition)
                        }
                    }
                    dailyReport.appendChild(tr);
                })

                // for (let i = 0; i < data.length; i++) {
                //     let tr = document.createElement("tr");
                //     dailyReport.appendChild(tr);

                //     let empName = document.createElement("td");
                //     empName.innerText = `${data[i].firstName} ${data[i].lastName}`;
                //     tr.appendChild(empName);

                //     let late = document.createElement("td");
                //     late.innerText = data[i].late;
                //     tr.appendChild(late);

                //     let absent = document.createElement("td");
                //     absent.innerText = data[i].absent;
                //     tr.appendChild(absent);

                //     let postition = document.createElement("td");
                //     if (data[i].role == 0) {
                //         postition.innerText = "Employee"
                //     } else if (data[i].role == 1) {
                //         postition.innerText = "Secuirty"
                //     } else {
                //         postition.innerText = "Admin"
                //     }
                //     tr.appendChild(postition)
                // }
            })

    });












