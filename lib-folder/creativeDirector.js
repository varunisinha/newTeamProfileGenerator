const Employee = require("./Employee");

class creativeDirector extends Employee {

  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "creativeDirector";
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

}

module.exports = creativeDirector;