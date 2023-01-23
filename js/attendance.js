// to count late time mintues and hours
let fixedAttendTime = new Date();
fixedAttendTime.setHours(9);
fixedAttendTime.setMinutes(0);
// console.log(fixedAttendTime.getHours())

function countLateTime() {
    let attendetAt = new Date();

    let lateMinites = Number(attendetAt.getMinutes()) - Number(fixedAttendTime.getMinutes());
    let lateHours = Number(attendetAt.getHours()) - Number(fixedAttendTime.getHours());
    if (lateHours < 0) {

        return "0:0";
    }
    else {
        return `${lateHours}:${lateMinites}`;
    }
}
const empUsername = document.getElementById("username");

attend.addEventListener("click", function (e) {
    e.preventDefault();

    fetch(`http://localhost:3000/employees?username=${empUsername.value}`, {
        method: "GET",
        headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 1 && data[0].username === empUsername.value) {
                let date = new Date();
                let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                let userId = data[0].id;

                fetch(`http://localhost:3000/employees/${userId}/attendence?date=${today}`, {
                    method: "GET",
                    headers: { "Content-type": "application/JSON;charset=UTF-8" },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.length) {
                            let hour = new Date().getHours();
                            let mintues = new Date().getMinutes();
                            let time = `${hour}:${mintues}`;
                            fetch(`http://localhost:3000/attendence/${data[0].id}`, {
                                method: "PATCH",
                                headers: { "Content-type": "application/JSON;charset=UTF-8" },
                                body: JSON.stringify({ out: time }),
                            })
                                .then((response) => response.json())
                                .then((data) => { });
                        } else {
                            let latency = countLateTime();
                            console.log(countLateTime())

                            let hour = new Date().getHours();
                            let mintues = new Date().getMinutes();
                            let time = `${hour}:${mintues}`;
                            console.log(time)
                            let postBody = { in: time, out: 0, date: today, late: latency, absent: false };
                            fetch(`http://localhost:3000/employees/${userId}/attendence`, {
                                method: "POST",
                                headers: { "Content-type": "application/JSON;charset=UTF-8" },
                                body: JSON.stringify(postBody),
                            }).then((response) => {
                                return response.json();
                            });
                        }
                    });
            } else {
            }
        });
});

