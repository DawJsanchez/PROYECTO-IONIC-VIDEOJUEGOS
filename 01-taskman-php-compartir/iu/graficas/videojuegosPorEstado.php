<!-- Basado en ejemplo 
    https://canvasjs.com/jquery-charts/pie-chart-index-data-label-inside/
-->
<script type="text/javascript">
    window.addEventListener('load', function() {

        var dataPoints = [];

        var options = {
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
                indexLabelPlacement: "inside",
                dataPoints: dataPoints
            }]
        };
        
        $("#chartContainer").CanvasJSChart(options);

        function addData(respuesta) {
	        let data = respuesta.datos;

            for (var i = 0; i < data.length; i++) {
		        dataPoints.push({
			        name: data[i].estado,
			        y: data[i].contador
		        });
	        }

            $("#chartContainer").CanvasJSChart(options);        
        }

        $.getJSON("http://localhost/daw/daw2-dwec-profesorado/taskman/01-taskman-php/ajax.php?s=_getResumenVideojuegosPorEstado", addData);
    });    
</script>

<div id="chartContainer" style="height: 200px; width: 300px;"></div>
