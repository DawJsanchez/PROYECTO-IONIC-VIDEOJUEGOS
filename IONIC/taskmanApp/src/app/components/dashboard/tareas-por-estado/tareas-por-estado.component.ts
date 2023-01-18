import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tareas-por-estado',
  templateUrl: './tareas-por-estado.component.html',
  styleUrls: ['./tareas-por-estado.component.scss'],
})
export class TareasPorEstadoComponent implements AfterViewInit {

 // Define la variable que va a almacenar los puntos en el gráfico
 dataPoints: any[] = [];
  
 // Puntero a la gráfica
 chart:any;

 // Opciones del gráfico 
 chartOptions: any = {};    

 constructor(

   private tareasService: TareasService

 ) { }

 ngAfterViewInit(): void {

   // Carga los datos del gráfico
   this.tareasService.getResumenTareasPorEstado().subscribe(respuesta => {

     // Obtiene la respuesta
     let data = respuesta.datos;

     for (var i = 0; i < data.length; i++) {

       // Crea el punto
       const punto = {
         name: data[i].estado,
         y: Number(data[i].contador)
       }

       // Añade el punto
       this.dataPoints.push(punto);
     }      

     // Si no asigna aquí las opciones
     // no se refresca el gráfico
     this.chartOptions = {    
       exportEnabled: false,
       animationEnabled: true,
       title:{
           text: "Tareas por estado"
       },
       legend:{
           horizontalAlign: "right",
           verticalAlign: "center"
       },
       data: [{
           type: "pie",
           showInLegend: true,
           toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
           indexLabel: "{name}",
           legendText: "{name} (#percent%)",
           indexLabelPlacement: "outside",
           dataPoints: this.dataPoints      
       }]
     };
   });    
 }

}
