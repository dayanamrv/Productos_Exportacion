
var anio = document.getElementById("select-full").value;			//Obtener el año de exportaciones
var radio_button = document.getElementById("peso").checked;
var svg = d3.select("#tree"); 										//Traer el svg del HTML
var	width =  svg.attr("width"); 									//Obtengo el ancho del svg
var height = svg.attr("height"); 									//Obtengo el alto del svg
var anual_data = [];
var treemap;

var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

/**************************************** MANIPULAR DATOS A PARTIR DEL PROMISE **********************************/
var open_data = d3.csv("resources/data/data.csv",function(result){//);
	datos = result;
	anio = document.getElementById("select-full").value;
	anio = document.getElementById("select-full").value;
	treemap = d3.treemap().size([width, height]);
	color = d3.scaleOrdinal()
	.range(["#BDC3C7", "#A569BD", "#E67E22", "#F4D03F", "#58D68D", "#85C1E9", "#A93226", "#EC7063"])
	.domain(d3.set(datos.map(d=> d.producto)).values());


	root = reloadData(datos, getParametro());
	createTree(root);

});

var rects,texts,leaf;

function reloadData(datos, parametro) {	

	anual_data = datos.filter(function (d) { return d.anio === anio });

	nestedData = d3.nest()
	.key( d=> d.producto)
	.entries(anual_data);

	nestedDataAsTree = ({values:nestedData});


	if (parametro == "peso")
	{
		dataHierarchy = d3.hierarchy(nestedDataAsTree, d => d.values)
		.sum(d => d.toneladas)
		.sort((a, b) => b.height - a.height || b.value - a.value);
	}else
	{	
		dataHierarchy = d3.hierarchy(nestedDataAsTree, d => d.values)
		.sum(d => d.precio)
		.sort((a, b) => b.height - a.height || b.value - a.value);
	}

	return treemap(dataHierarchy);										

}

function createTree(root) {	

	leaf = svg.selectAll("g")
	.data(root.leaves())
	.enter()
	.append("g");

	leaf.attr("transform", d => `translate(${d.x0},${d.y0})`);

	rects = leaf.append("rect")
	.attr("stroke", "white")
	.attr("fill", d => { return color(d.data.producto); })
	.attr("fill-opacity", 1)
	.attr("width", d => d.x1 - d.x0)
	.attr("height", d => d.y1 - d.y0);

	rects
	  .on('mouseover', function(d) {

	    tooltip.transition()
	    .duration(300)
	    .style("opacity", .95);

	    tooltip.html( "<strong>"+ d.data.departamento+"</strong><br>"+d.data.producto+": "+d.data.toneladas+"<br> Precio: "+formatNumber(d.data.precio) + " dólares" )
	     .style("left", (d3.event.pageX) + "px")
	     .style("top", (d3.event.pageY + 10) + "px");
	  })
	  .on("mouseout", function() {
	    tooltip.transition()
	    .duration(300)
	    .style("opacity", 0);
	  })
	  .on("mousemove", function() {
	    tooltip.style("left", (d3.event.pageX) + "px")
	    .style("top", (d3.event.pageY + 10) + "px");
	  });

	var id_clip = 1;
	leaf.append("clipPath")
	.attr("id", d => (d.clipUid = "clip-uid-"+(id_clip++)))
	.append("use");

	texts = leaf.append("text")
	.attr("clip-path", d => d.clipUid)
	.attr("font-size", "10px")
	.attr("x", 3)
	.attr("y", "1.9em")//(d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
	.attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
	.text(d => d.data.departamento + " - " +d.data.producto+":"+ d.data.toneladas+" - Precio: " +formatNumber(d.data.precio)+" dólares"); 									

}

function updateTree(root){

	leaf.data(root.leaves());
	leaf.transition()
	.duration(1500).attr("transform", d => `translate(${d.x0},${d.y0})`);

	leaf.select("rect").transition()
	.duration(1500)
	.attr("fill", d => { return color(d.data.departamento); })
	.attr("width", d => d.x1 - d.x0)
	.attr("height", d => d.y1 - d.y0);
	leaf.select("text").transition()
	.duration(1500)
	.attr("font-size", "10px")
	.attr("x", 3)
	.attr("y", "1.9em")//(d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
	.attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
	.text(d => d.data.departamento + " - " +d.data.producto+":"+ d.data.toneladas+" - Precio: " +formatNumber(d.data.precio)+" dólares"); 
	
	leaf.exit();
	rects.exit();
	texts.exit();
}


var dropdown = document.getElementById("select-full");
dropdown.onchange = function() {
	anio = document.getElementById("select-full").value;
	root = reloadData(datos, getParametro());
	updateTree(root);
}


 function changeRadio() {
 	 
 	 anio = document.getElementById("select-full").value;

	 root = reloadData(datos, getParametro());
	 updateTree(root);

	
}

function getParametro(){
	radio_button = document.getElementById("peso").checked;
	var parametro;
 	 
 	 if(radio_button == 1){
 	 	parametro = "peso";
 	 }else{
 	 	parametro = "precio";
 	 }
 	 return parametro;

}

function formatNumber(num) {
   num += '';
   var splitStr = num.split(',');
   var splitLeft = splitStr[0];
   var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
   var regx = /(\d+)(\d{3})/;
   while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
   }
   return '$' + splitLeft + splitRight;
}

