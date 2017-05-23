const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let user_input = process.argv[2];

function looking (name, cb){
  console.log("Searching ... ", name)
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", ['Abraham'], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result);
  });
}
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  looking(user_input, (result) => {
    console.log("Found " + result.rows.length + " person(s) by the name of " + user_input);
    result.rows.forEach(row => {
      console.log("- "+ row.id + ": " +  row.first_name +" " + row.last_name + ", born " + row.birthdate);
    })
  })

  });
