const Employee = require("./Employee");

class accountManager extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getRole() {
    return "accountManager";
  }

  getGithub() {
    return this.github;
  }

}

module.exports = accountManager;