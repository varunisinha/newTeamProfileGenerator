const Employee = require("./Employee");

class mediaPlanner extends Employee {
  constructor(name, id, email, department) {
    super(name, id, email);
    this.department = department;
  }

  getRole() {
    return "mediaPlanner";
  }

  getDepartment() {
    return this.department;
  }

}

module.exports = mediaPlanner;