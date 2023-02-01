// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 
  // URL Base de los servicios de taskman
  taskmanBaseUrl: 'http://localhost/daw/daw2-dwec-profesorado/taskman/01-taskman-php-ajax/', 

  // Tiempo en milisegundos que un usuario debe estar sin pulsar una tecla
  // para que se acepte la entrada para lanzar por ejemplo un desplegable
  userInputDebounceDelay: 500,

  // Activa el modo depuración. Desactiva la autenticación.
  debug: 1  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
