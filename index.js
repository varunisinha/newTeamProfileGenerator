//requiring the necessary files
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output-folder")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const accountManager = require("./lib-folder/accountManger");
const mediaPlanner = require("./lib-folder/mediaPlanner");
const creativeDirector = require("./lib-folder/creativeDirector");


const render = require("./src-folder/page-template.js");

const buildAdTeam = [];
const memberID = [];

function questionsToAsk() {

  function createcreativeDirector() {

    inquirer.prompt([
      {
        type: "input",
        name: "creativeDirectorName",
        message: "What is the name of your creativeDirector?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You need to enter at least one character";
        }
      },
      {
        type: "input",
        name: "creativeDirectorId",
        message: "What is the id of your creativeDirector?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "You need to enter a number greater than zero";
        }
      },
      {
        type: "input",
        name: "creativeDirectorEmail",
        message: "What is the email of your creativeDirector?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "You need to enter a valid email id.";
        }
      },
      {
        type: "input",
        name: "creativeDirectorOfficeNumber",
        message: "What is the official phone number of your creativeDirector?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "You need to enter a number greater than zero.";
        }
      }
    ]).then(answers => {
      const cd = new creativeDirector(answers.creativeDirectorName, answers.creativeDirectorId, answers.creativeDirectorEmail, answers.creativeDirectorOfficeNumber);
      //pushing the creativeDirector info into the buildAdTeam array:
      buildAdTeam.push(cd);

      //pushing the creativeDirectorId into the memberID array
      memberID.push(answers.creativeDirectorId);
      buildATeam();
    });
  }

  function buildATeam() {

    //questions will show up in the console
    inquirer.prompt([
      {
        type: "list",
        name: "selectOptions",
        message: "What is the designation of your team member?",
        choices: [
          "accountManager",
          "mediaPlanner",
          "I don't wish to add any more team members"
        ]
      }//choosing designations for the new team member 
    ]).then(userSelection => {
      switch (userSelection.selectOptions) {

        //switch case functions for each designation
        case "accountManager":
          addaccountManager();
          break;
        case "mediaPlanner":
          addmediaPlanner();
          break;
        default:
          buildTeam();
      }
    });
  }
  //function to generate accountManager
  function addaccountManager() {
    inquirer.prompt([
      {
        type: "input",
        name: "accountManagerName",
        message: "What is the name of your account manager?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You need to enter at least one character in this field.";
        }
      },
      {
        type: "input",
        name: "accountManagerId",
        message: "What is the id of your account manager?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (memberID.includes(answer)) {
              return "You need to enter a vaild number";
            } else {
              return true;
            }

          }
          return "You must enter a number is greater than zero.";
        }
      },
      {
        type: "input",
        name: "accountManagerEmail",
        message: "What is the email of your accountManager?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "You need to enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "accountManagerGithub",
        message: "What is the github username of your accountManager?",
        validate: answer => {
          //if we are not adding anything then it will send off a prompt 
          if (answer !== "") {
            return true;
          }
          return "You need to enter at least one character for this field.";
        }
      }
    ]).then(answers => {
      const am = new accountManager(answers.accountManagerName, answers.accountManagerId, answers.accountManagerEmail, answers.accountManagerGithub);
      //pushing the accountManager to the buildAdTeam array
      buildAdTeam.push(am);

      //pushing the accountManagerId into memberID array
      memberID.push(answers.accountManagerId);

      //now calling the buildATeam function
      buildATeam();
    });
  }

  //function to add a media Planner to the advertising team
  function addmediaPlanner() {
    inquirer.prompt([

      //the prompts that will show up for the user to enter details about the media planner
      {
        type: "input",
        name: "mediaPlannerName",
        message: "What is the name of your media planner?",
        validate: answer => {
          //checking to see if something is entered or not

          if (answer !== "") {
            return true;
          }
          return "You need to enter at least one character in this field.";
        }
      },
      {
        type: "input",
        name: "mediaPlannerId",
        message: "What is the id of your media planner?",
        validate: answer => {
          //if the id matches with another id
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (memberID.includes(answer)) {
              return "The ID you have entered is not available. Enter another number.";
            } else {
              return true;
            }

          }
          return "You need to enter a number greater than zero";
        }
      },
      {
        type: "input",
        name: "mediaPlannerEmail",
        message: "What is the email of your media Planner?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "You need to enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "mediaPlannerDepartment",
        message: "What is the department of your media planner?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You need to enter at least one character in this field.";
        }
      }
    ]).then(answers => {
      const mp = new mediaPlanner(answers.mediaPlannerName, answers.mediaPlannerId, answers.mediaPlannerEmail, answers.mediaPlannerDepartment);

      //pushing mediaplanner to the buildATeam array
      buildAdTeam.push(mp);
      memberID.push(answers.mediaPlannerId);
      buildATeam();
    });
  }

  //calling function to buildTeam here:

  function buildTeam() {

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(buildAdTeam), "utf-8");
  }

  createcreativeDirector();

}

//will ask the questions to build the team
questionsToAsk();