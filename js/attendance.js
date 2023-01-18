// get all employee data
let userNames = [];
(async function verify() {
    let allEmployeeData = await fetch(`http://localhost:3000/employees`);
    let empObjects = await allEmployeeData.json();
    empObjects.forEach(element => {
        userNames.push(element.username)
    });

})();

let attendBtn = document.getElementById("attend");
let attendInput = document.getElementById("username");

attendBtn.addEventListener(('click'), (e) => {
    e.preventDefault();
    let inputValue = attendInput.value;
    let today = new Date()
    for (let i = 0; i < userNames.length; i++) {
        if (userNames[i] == inputValue) {
            checkAttendance(inputValue, today);
            console.log("this is valid data");
            break;
        } else {
            e.preventDefault();
            attendInput.focus();
            console.log("this is invalid data");

        }
    }
})

//  attendanceEmployeeObject[0].info[0].date;

async function checkAttendance(username, date) {
    let attendanceEmployee = await fetch(`http://localhost:3000/attendence?username=${username}`);
    let attendanceEmployeeObject = await attendanceEmployee.json();
    let newInfo = attendanceEmployeeObject[0].info[attendanceEmployeeObject[0].info.length - 1];
    console.log(newInfo)
    if (newInfo.date == formatDate(date)) {
        newInfo.out = time(date);
        console.log(newInfo)
        fetch(`http://localhost:3000/attendence/${attendanceEmployeeObject[0].id}`, {
            method: "PATCH",
            body: JSON.stringify({
                info: `${newInfo}`
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

    }
}








function formatDate(date) {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}


function time(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (strTime);
}