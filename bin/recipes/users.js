'use strict';

const debug   = require('debug');

// let User
// let Role
// let RoleMapping
// let database
let table_name = 'user'

let attributes  = [
    'userId'
];
// let attribute  = '';

// const init = async ( options, helper, cb ) => {
//
//   let server = options[0];
//   let helper = options[1];
//   let Raven  = options[2];
//
//
//   User        = server.models.user;
//   Role        = server.models.Role;
//   RoleMapping = server.models.RoleMapping;
//   database    = server.datasources.recipeDS;
//
//
//   let args = {
//     model     : User,
//     table_name: table_name,
//     database  : database,
//     rows      : get()
//   }
//
//   // add data to db
//   helper.create(args, cb);
//   // attachMenusToUsers
//   // attachRecipesToUsers
// }

const get = () => {

    var data     = [
      {
        name: 'john',
        email: 'john.doe@ibm.com',
        password: 'john1',
      },
      {
        name: 'jane',
        email: 'jane.doe@ibm.com',
        password: 'jane1',
      },
      {
        name: 'admin',
        email: 'admin@ibm.com',
        password: 'admin',
      }
     ];

  	return data;

};


function assignAdmin(options, admin_id){
  let server
  let database
  let raven

  ( {server, database, raven} = options );

  // User        = server.models.user;
  let Role        = server.models.Role;
  let RoleMapping = server.models.RoleMapping;
  // database    = server.datasources.recipeDS;

	database.automigrate('Role', function(err){
		if (err) return cb(err);

		Role.create({ name:'admin' })
		.then(function(role){

			role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: admin_id
              }, function(err, principal){
                console.log('Principal', principal);
              });

		}).catch(function(err){
      raven.captureException("admin was not assigned");
      throw err;
    });
	});
  debug('admin was created');
};


const attachRecipesToUsers = () => {
  // 	recipes.forEach(function(recipe){
  // 		recipe.updateAttribute('userId', users[2].id);

  // 	});
};

const attachMenusToUsers = (users, menus) => {
  helper.attach(users, menus, attributes[0])
};

module.exports.get   = get;
module.exports.table_name   = table_name;
module.exports.assignAdmin   = assignAdmin;

module.exports.attachRecipesToUsers   = attachRecipesToUsers;
module.exports.attachMenusToUsers   = attachMenusToUsers;
