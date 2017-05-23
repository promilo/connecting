
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('_milestones', function(table){
      table.increments('id').primary();
      table.string('description');
      table.date('date_achieveds');
      // table.timestamps();
      // table.integer('famous_person_id')
      table.integer('famous_person_id').references("famous_people.id")
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('_milestones')
  ])
};
