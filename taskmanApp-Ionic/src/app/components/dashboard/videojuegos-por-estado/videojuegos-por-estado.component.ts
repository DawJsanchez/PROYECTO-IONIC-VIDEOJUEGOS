import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VideojuegosService} from "../../../services/videojuegos.service";


@Component({
  selector: 'app-videojuegos-por-estado',
  templateUrl: './videojuegos-por-estado.component.html',
  styleUrls: ['./videojuegos-por-estado.component.scss'],
})
export class VideojuegosPorEstadoComponent implements AfterViewInit {

  // Variable en la que se almacenan datos de la gráfica
  dataPoints: any[] = [];

  chart: any;

  // Opciones si las quisieramos
  chartOptions: any = {};

  constructor(
    private videojuegosService: VideojuegosService
  ) {
  }

  ngAfterViewInit(): void {

    // Carga los datos del gráfico
      this.videojuegosService.getResumenVideojuegosPorEstado().subscribe(respuesta => {

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
          title: {
            text: "Videojuegos por estado"
          },
          theme: "dark2",
          legend: {
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
