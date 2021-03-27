'use strict';

const config = require( './config' );
const sqlite3 = require( 'sqlite3' ).verbose();
const db = new sqlite3.Database(
   config.DB.FILE
);

db.run('CREATE TABLE IF NOT EXISTS users(login)');

module.exports = db;
