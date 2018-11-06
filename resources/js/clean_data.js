var datos;
var open_data = d3.csv("resources/data/data.csv");
var new_data = []; var datos_agr= [];
open_data.then(function(result) {


	//Generación y limpieza de datos
	datos = result;
	//	datos = datos.slice(0,20);
	console.log(datos);

	//Reduce para agrupar sumatoria de datos
	var groupBy = function (miarray, prop) {
	    return miarray.reduce(function(groups, item) {
	    	
	        var val = item.anio + '|' + 
	                  item.departamento + '|' + 
	                  item.producto;

	        groups[val] = groups[val] || {anio: item.anio,  
	        							  origen: item.departamento, 
	        							  producto: item.producto,
	        							  toneladas: 0, 
	        							  precio: 0};  

	        groups[val].toneladas += parseFloat(item.toneladas);
	        groups[val].precio += parseFloat(item.precio);
	        
	        return groups;
	    }, {});
	}

	//Llamar al metodo que agrupa y totaliza
	datos_agr = groupBy(datos,'anio');


	//Crear array de salida
	for (var i in datos_agr){

		new_data.push({"anio": datos_agr[i]["anio"], 
			           "origen": datos_agr[i]["origen"],
					   "producto": datos_agr[i]["producto"],
					   "toneladas": (datos_agr[i]["toneladas"]).toFixed(2), 
					   "precio": (datos_agr[i]["precio"]).toFixed(2)});

	}

	//Convertir el array a json
	json = JSON.stringify(new_data);
	var json_data = JSON.parse(json);
	
	console.log(new_data);
	DownloadJSON2CSV(json_data);

});
	

function DownloadJSON2CSV(objArray)
{
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
            line += array[i][index] + ',';
        }
        line = line.substr(0, line.length-1);
        str += line + '\r\n';
    }

    window.open( "data:resources/data;charset=utf-8," + escape(str));
}