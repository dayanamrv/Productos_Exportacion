# ¿Es el café nuestro principal producto de exportación?
Objetivo: 
La visualización que se presenta a continuación pretende mostrar el resumen de los principales productos, (de acuerdo a su peso y/o precio), que se producen en los departamentos de Colombia y que son exportados al exterior del país.

Descripción: 

La gráfica de la derecha contiene: 1) Recuadros que representan los productos producidos o comercializados en el país. 2)Los colores, representan los departamentos comercializadores y/o productores. 3)El tamaño de las áreas de los recuadros es proporcional al peso (toneladas) o al precio anual del producto. (dependiendo de la selección del usuario) 

Instrucciones

El usuario cuenta con un filtro por año, en la esquina superior izquierda de la visualización, que le permitirá ver la distribución de los productos por departamento, que fueron exportados durante los años 2016, 2017 y lo que va del 2018. El usuario también podrá ver los resultados por peso (en toneladas) o por precio (en dólares) de los productos que fueron exportados, gracias a las casillas tipo “radio button”, ubicadas en la esquina superior derecha de la gráfica. Al modificarlas, la visualización cambiará el área de los recuadros de acuerdo al atributo escogido. La visualización cuenta también con un tooltip que ofrece información, del departamento, producto, peso y precio de cada uno de los productos, si se pasa el mouse por los recuadros.

WHAT

Los datos escogidos para la visualización provienen de una Tabla. El DataSet representa un Árbol, en donde los papás son los departamentos del país y los hijos (nodos u hojas) corresponden a los productos que comercializa o exporta cada departamento.

    Variables

    Departamento: Categórica
    Producto: Categórica
    Año: Ordenado – Ordinal – Secuencial
    Peso: Ordenado – Cuantitativo – Secuencial
    Precio: Ordenado – Cuantitativo – Secuencial

WHY

* Summarize Features
Resumir la distribución de la cantidad (ya sea en peso o en precio) de los principales productos que se producen para exportación en Colombia.
* Identify Extremes
Al ser un TreeMap, esta visualización nos permite identificar el producto que más se vende y el que menos se vende (de acuerdo a su peso o a su precio) en el exterior.
* Explore Features
La visualización permite al usuario la exploración de datos a tráves de sus interacciones, utilizando los filtros de años, y de peso o precio.
* Compare Features
A partir del filtro de "años", el usuario podrá comparar el resumen de la distribución de los productos más y menos vendidos durante los últimos tres años. 

HOW

    Marcas
    Áreas: Representan los productos
    Canales
    Color Hue: Representa los departamentos
    Separate: Cada producto(leaf) esta separada una de otra
    Order: Los productos se encuentran ordenados de mayor a menor
    Manipulate
    Change: El usuario puede seleccionar en el radio button si desea ver la gráfica por peso o por precio, y la visualización cambiará de acuerdo a ello
    Reduce
    Filter: El resumen de la distribución de los productos podrá ser filtrada por año

Insights: 
* El principal producto de exportación de Colombia durante los últimos 3 años sigue siendo el Café, al menos por precio, pero en realidad, exportamos más cantidad de bananos al exterior, aunque de este último no recibimos la misma retribución económica.
* Al parecer Antioquia es el departamento de Colombia que más productos agrícolas produce para exportación.
* La Yuca es el producto con menos popularidad dentro de nuestros países compradores, tanto por precio como por peso. Al parecer no se consume mucho en exterior.
* El departamento del Huila ha venido bajando la venta de Café durante los últimos tres años.
* Antioquia y Magdalena son nuestros principales productores de Bananos para exportación.

Tecnologías: 
D3 V4
JavaScript
Clarify Design

Este proyecto se publica bajo la licencia MIT


![alt text](https://i.imgur.com/EZuMT7X.png)
