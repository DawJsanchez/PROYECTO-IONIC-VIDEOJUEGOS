import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VideojuegosSpringService } from 'src/app/videojuegos/services/videojuegos-spring.service';

@Component({
  selector: 'app-videojuegos-por-estado',
  templateUrl: './videojuegos-por-estado.component.html',
  styleUrls: ['./videojuegos-por-estado.component.css']
})
export class VideojuegosPorEstadoComponent implements AfterViewInit {

  // Define la variable que va a almacenar los puntos en el gráfico
  dataPoints: any[] = [];
  
  // Puntero a la gráfica
  chart:any;

  // Opciones del gráfico 
  chartOptions: any = {};    

  constructor(

    private videojuegosService: VideojuegosSpringService

  ) { }

  ngAfterViewInit(): void {

    // Carga los datos del gráfico
    this.videojuegosService.getResumenVideojuegosPorEstado().subscribe(respuesta => {

      for(let e of respuesta) {

        // Desestructuración del array
        let [contador, estado] = e;

        // Crea el punto
        const punto = {
          name: estado,
          y: contador
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
            text: "Videojuegos por estado"
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
