import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TiposVideojuegoService } from 'src/app/videojuegos-tipo/services/tipos-videojuego.service';

@Component({
  selector: 'app-videojuegos-por-tipo',
  templateUrl: './videojuegos-por-tipo.component.html',
  styleUrls: ['./videojuegos-por-tipo.component.scss'],
})
export class VideojuegosPorTipoComponent implements AfterViewInit {

 // Variable en la que se almacenan datos de la gráfica
 dataPoints: any[] = [];
  
 chart:any;

 // Opciones si las quisieramos 
 chartOptions: any = {};   

 constructor(
   private tiposVideojuegoService: TiposVideojuegoService
 ) { }

 ngAfterViewInit(): void {

  // Carga los datos del gráfico
  this.tiposVideojuegoService.getResumenVideojuegosPorTipo().subscribe(respuesta => {

    for(let e of respuesta) {

      // Desestructuración del array
      let [contador, rol] = e;

      // Crea el punto
      const punto = {
        name: rol,
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
          text: "Usuarios por rol"
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
