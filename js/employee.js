class Employee {
    #id;
    #fname;
    #lname;
    #address;
    #mail;
    #age;
    constructor(_fname, _lname, _address, _mail, _age) {
        this.#fname = _fname;
        this.#lname = _lname;
        this.#address = _address;
        this.#mail = _mail;
        this.#age = _age;
    }
    set id(_id) {
        if (_id > 0) {
            this.#id = _id;
        }
    }
    get id() {
        return this.#id;
    }
    set age(_age) {
        if (_age >= 18 && age < 60) {
            this.#age = _age;
        }
    }
    get age() {
        return this.#age;
    }
    getDate() {
        let date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    generateRandomName() {
        let length = 7,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    generateRandomPassword() {
        let length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    SaveToJson() {
        fetch("http://localhost:3000/employees", {
            method: "POST",
            body: JSON.stringify({
                id: "",
                firstName: `${this.#fname}`,
                lastName: `${this.#lname}`,
                address: `${this.#address}`,
                email: `${this.#mail}`,
                username: this.generateRandomName(),
                password: this.generateRandomPassword(),
                age: `${this.#age}`,
                role: `0`,
                accepted: false,
                startDate: this.getDate()
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }


}

export { Employee }