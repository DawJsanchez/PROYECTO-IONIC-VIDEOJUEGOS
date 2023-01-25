import { AfterViewInit, Component, OnInit } from '@angular/core';
//FALTA IMPORT DE USUARIOSSERVICE HACER CUANDO SE JUNTE

@Component({
  selector: 'app-usuarios-por-rol',
  templateUrl: './usuarios-por-rol.component.html',
  styleUrls: ['./usuarios-por-rol.component.scss'],
})
export class UsuariosPorRolComponent implements AfterViewInit {

  // Variable en la que se almacenan datos de la gráfica
  dataPoints: any[] = [];
  
  chart:any;

  // Opciones si las quisieramos 
  chartOptions: any = {};   

  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngAfterViewInit(): void {

    // Carga los datos del gráfico
    this.usuariosService.getResumenUsuariosPorRol().subscribe(respuesta => {

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
