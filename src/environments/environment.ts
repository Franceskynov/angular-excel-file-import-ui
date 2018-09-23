// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_SERVICE: 'http://localhost:8000/api/v1/',
  MESSAGES: {
    UPLOAD_SUCCESS: "The file has been uploaded",
    SERVER_ERROR: "Error to connect with the server",
    MULTIPLE_FILES_ERROR: "At the moment multiple files can not be processed",
    FILES_ERROR: "No file has been loaded to process"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
