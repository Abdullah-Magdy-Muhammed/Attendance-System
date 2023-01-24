function searchFunction() {
    var input, filter, table, tr, td, i, alltables;
    alltables = document.querySelectorAll("table[data-name=table]");
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    alltables.forEach(function (table) {
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    });
}

// function for navbar to be dynamic 
// all divs which have tables of reports
let pendingReport = document.getElementById("pending");
let fullReport = document.getElementById("fullreport");
let monthlyReport = document.getElementById("monthlyreport");
let dailyReport = document.getElementById("dailyreport");

// all navbar buutons
let pendingBtn = document.getElementById("candidates");
let allEmployeesBtn = document.getElementById("fullreportbtn");
let dailyReportBtn = document.getElementById("dailyreportbtn");
let monthlyReportBtn = document.getElementById("monthlyreportbtn")

allEmployeesBtn.addEventListener("click", (e) => {
    pendingBtn.classList.remove("active");
    dailyReportBtn.classList.remove("active");
    monthlyReportBtn.classList.remove("active");
    pendingReport.classList.remove("active");
    dailyReport.classList.remove("active");
    monthlyReport.classList.remove("active");
    e.target.classList.add("active");
    fullReport.classList.add("active");
})
dailyReportBtn.addEventListener("click", (e) => {
    pendingBtn.classList.remove("active");
    monthlyReportBtn.classList.remove("active");
    allEmployeesBtn.classList.remove("active");
    pendingReport.classList.remove("active");
    monthlyReport.classList.remove("active");
    fullReport.classList.remove("active");
    e.target.classList.add("active");
    dailyReport.classList.add("active")

})

monthlyReportBtn.addEventListener("click", (e) => {
    pendingBtn.classList.remove("active");
    dailyReportBtn.classList.remove("active");
    allEmployeesBtn.classList.remove("active");
    pendingReport.classList.remove("active");
    dailyReport.classList.remove("active");
    fullReport.classList.remove("active");
    e.target.classList.add("active");
    monthlyReport.classList.add("active");
})
pendingBtn.addEventListener("click", (e) => {
    monthlyReportBtn.classList.remove("active");
    allEmployeesBtn.classList.remove("active");
    dailyReportBtn.classList.remove("active");
    monthlyReport.classList.remove("active");
    fullReport.classList.remove("active");
    dailyReport.classList.remove("active");
    e.target.classList.add("active");
    pendingReport.classList.add("active");
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
            confirm.innerHTML = `<button id='accept-${data[i].id}' class='btn-light px-2'>&check;</button> <button id= 'delete-${data[i].id}' class='btn-danger px-2'>X</button>`
            tr.appendChild(confirm);

            // confirm and delete
            let deleteBtn = document.getElementById(`delete-${data[i].id}`)
            deleteBtn.addEventListener("click", (e) => {
                let row = e.target.parentElement.parentElement;
                if (window.confirm("Are You Sure to delete this row")) {

                    fetch(`http://localhost:3000/employees/${data[i].id}`, {
                        method: "DELETE",
                        headers: { "Content-type": "application/JSON;charset=UTF-8" },

                    })
                        .then((response) => response.json())
                        .then((data) => {
                            row.remove()
                        })
                }
            })
            let confirmBbtn = document.getElementById(`accept-${data[i].id}`)
            confirmBbtn.addEventListener("click", (e) => {
                let row = e.target.parentElement.parentElement;
                if (window.confirm("Are You Sure to accept this employee")) {

                    fetch(`http://localhost:3000/employees/${data[i].id}`, {
                        method: "PATCH",
                        headers: { "Content-type": "application/JSON;charset=UTF-8" },
                        body: JSON.stringify({ accepted: true })
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            row.remove();
                        })
                }
            })
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
dailyReportBody = document.getElementById("dailyReport");
const empUsername = document.getElementById("username");
fetch(`http://localhost:3000/employees`, {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
})
    .then((response) => response.json())
    .then((data) => {
        allemp = data;
        userId = allemp[0].id
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        fetch(`http://localhost:3000/attendence?date=${today}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                allAttendence = data;
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
                    dailyReportBody.appendChild(tr);
                })
            })
    });

// Monthly Report

let d = new Date(document.getElementById("range"));
console.log(d.getMonth())
monthlyReportBody = document.getElementById("monthlyReport");
fetch(`http://localhost:3000/employees`, {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
})
    .then((response) => response.json())
    .then((data) => {
        allemp = data;
        userId = allemp[0].id
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        fetch(`http://localhost:3000/attendence?date=${today}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                allAttendence = data;
                allemp.forEach((emp) => {
                    let tr = document.createElement("tr");
                    for (let i = 0; i < allAttendence.length; i++) {
                        if (emp.id == allAttendence[i].employeeId) {

                            let empName = document.createElement("td");
                            empName.innerText = `${emp.firstName} ${emp.lastName}`;
                            tr.appendChild(empName);

                            let late = document.createElement("td");
                            let numOfLate = 0;
                            if (allAttendence[i].late != "00:00") {
                                numOfLate++;
                            }
                            late.innerText = `${numOfLate}`;
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
                    monthlyReportBody.appendChild(tr);
                })
            })
    });









