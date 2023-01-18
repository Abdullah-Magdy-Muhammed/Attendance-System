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
    SaveToJson() {
        fetch("http://localhost:3000/pending", {
            method: "POST",
            body: JSON.stringify({
                firstName: `${this.#fname}`,
                lastName: `${this.#lname}`,
                address: `${this.#address}`,
                email: `${this.#mail}`,
                age: `${this.#age}`,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }


}

export { Employee }