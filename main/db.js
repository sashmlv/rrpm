'use strict';

const config = require( './config' );
const sqlite3 = require( 'sqlite3' ).verbose();
const db = new sqlite3.Database(
   config.DB.FILE
);

// db.run('CREATE TABLE lorem (info TEXT)');

module.exports = db;
