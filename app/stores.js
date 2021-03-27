import config from './config';
// import { writable } from 'svelte/store';

const store = {

   appName: config.APP_NAME,
   // path: writable(''),
   // read: key => get( store[ key ]),
};

export const {

   appName,
   path,
   read,
} = store;
