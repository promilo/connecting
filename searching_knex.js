const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function looking(name){
  console.log("Searching ... ", name)
  return knex.select('*')
  .from("famous_people")
  .where("first_name", name)
  .orWhere("last_name", name)
  .asCallback((err, rows) => {
    if (err) return console.error(err);
    console.log("Found " + rows.length + " person(s) by the name of " + user_input);
    rows.forEach(row => {
      console.log("- "+ row.id + ": " +  row.first_name +" " + row.last_name + ", born " + row.birthdate);
  });
});
}



let user_input = process.argv[2]

looking(user_input);
