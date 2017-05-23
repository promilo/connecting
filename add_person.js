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

let first = process.argv[2];
let last = process.argv[3];
let birth = process.argv[4]

function insertion(f, l, b, cb){
knex
.insert({first_name: f, last_name: l, birthdate: b})
.into('famous_people')
.asCallback( (err) => {
  if (err) throw err;
  cb();
})
};

insertion(first, last, birth, () =>
console.log("Added"))
