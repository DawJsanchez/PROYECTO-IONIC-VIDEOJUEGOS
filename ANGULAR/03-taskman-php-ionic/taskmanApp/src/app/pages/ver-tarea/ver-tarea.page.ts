import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.page.html',
  styleUrls: ['./ver-tarea.page.scss'],
})
export class VerTareaPage implements OnInit {


  tarea! : Tarea | undefined;  

//-------------------------------------------------------------------------------------
// Inicialización
//-------------------------------------------------------------------------------------

constructor(

  private activatedRoute    : ActivatedRoute,
  private router            : Router,

  private tareasService     : TareasService

) { }

/**
 * Inicialización de la página
 */
ngOnInit(): void {

  // Carga la tarea
  this.cargarTarea();

}


//-------------------------------------------------------------------------------------
// Funciones de persistencia. Permiten guardar y recuperar tareas
//-------------------------------------------------------------------------------------

/**
 * Cuando estamos editando, este método carga la tarea que estamos editando en el formulario
 */
 cargarTarea() {
    
  // Si estamos en modo edición, obtiene los parámeros
  // y carga los datos
  this.activatedRoute.params
    
    // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
    // por la tarea
    .pipe(

        switchMap( ({id}) => this.tareasService.getTareaPorId(id) ),
        
        // Este pipe muestra lo que viene
        tap(console.log)
    )
    // Finalmente, este subscribe recibe el resultado, que será el objeto
    .subscribe(respuesta => {
      
      if(respuesta.ok) {

        // Carga los datos
        this.tarea = respuesta.datos;

      } else {
        this.router.navigate([ '/listado-tareas' ]);
      }
    });
  }

}
