// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // authority: 'http://localhost:5000',
  // clientId: 'AngularClient',
  redirectUri: 'http://localhost:4200',
  responseType: 'id_token token',
  scope: 'microservice1 microservice2',
  authenticationServiceUrl: 'http://localhost:3000/api',
  crudServiceUrl: 'http://localhost:3001/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
