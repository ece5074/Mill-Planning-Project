const mysql2 = require('mysql2/promise');
const {test, development, production} = require('../config/dbconfig');

const dbconnpool = mysql2.createPool(production);
//console.log(dbconnpool);
module.exports = dbconnpool;



