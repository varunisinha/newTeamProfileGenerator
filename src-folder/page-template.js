// create the team
const generateTeam = team => {

    // create the creativeDirector html
    const generatecreativeDirector = creativeDirector => {
        return `
      <div class="card employee-card">
      <div class="card-header">
          <h2 class="card-title">${creativeDirector.getName()}</h2>
          <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Creative Director</h3>
      </div>
      <div class="card-body">
          <ul class="list-group">
              <li class="list-group-item">ID: ${creativeDirector.getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${creativeDirector.getEmail()}">${creativeDirector.getEmail()}</a></li>
              <li class="list-group-item">Office number: ${creativeDirector.getOfficeNumber()}</li>
          </ul>
      </div>
  </div>
      `;
    };

    // create the html for accountManagers
    const generateaccountManager = accountManager => {
        return `
      <div class="card employee-card">
  <div class="card-header">
      <h2 class="card-title">${accountManager.getName()}</h2>
      <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Account Manager</h3>
  </div>
  <div class="card-body">
      <ul class="list-group">
          <li class="list-group-item">ID: ${accountManager.getId()}</li>
          <li class="list-group-item">Email: <a href="mailto:${accountManager.getEmail()}">${accountManager.getEmail()}</a></li>
          <li class="list-group-item">GitHub: <a href="https://github.com/${accountManager.getGithub()}" target="_blank" rel="noopener noreferrer">${accountManager.getGithub()}</a></li>
      </ul>
  </div>
</div>
      `;
    };

    // create the html for mediaPlanners
    const generatemediaPlanner = mediaPlanner => {
        return `
      <div class="card employee-card">
  <div class="card-header">
      <h2 class="card-title">${mediaPlanner.getName()}</h2>
      <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>Media Planner</h3>
  </div>
  <div class="card-body">
      <ul class="list-group">
          <li class="list-group-item">ID: ${mediaPlanner.getId()}</li>
          <li class="list-group-item">Email: <a href="mailto:${mediaPlanner.getEmail()}">${mediaPlanner.getEmail()}</a></li>
          <li class="list-group-item">Department Name: ${mediaPlanner.getDepartment()}</li>
      </ul>
  </div>
</div>
      `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "creativeDirector")
        .map(creativeDirector => generatecreativeDirector(creativeDirector))
    );
    html.push(team
        .filter(employee => employee.getRole() === "accountManager")
        .map(accountManager => generateaccountManager(accountManager))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === "mediaPlanner")
        .map(mediaPlanner => generatemediaPlanner(mediaPlanner))
        .join("")
    );

    return html.join("");

}

// export function to generate entire page
module.exports = team => {

    return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>My Team</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body>
  <div class="container-fluid">
      <div class="row">
          <div class="col-12 jumbotron mb-3 team-heading">
              <h1 class="text-center">My Team</h1>
          </div>
      </div>
  </div>
  <div class="container">
      <div class="row">
          <div class="team-area col-12 d-flex justify-content-center">
              ${generateTeam(team)}
          </div>
      </div>
  </div>
</body>
</html>
  `;
};