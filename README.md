# Mutation DNA 🚀

Prueba tecnica de adn

## Descripcion

Proyecto creado en node.js te permite enviar un arreglo de strings y determinar si existen 4 digitos iguales en horizontal verticar u oblicuo ademas de contar cuantos registros cumplen esta condicion y cuantos no

### Prerrequisitos para la descarga 📦

Tener ya instalado node.js en tu ordenandor y npm 

```
Clonar el repositorio
```

### Instalacion 🛠️

Dentro de la carpeta clonada ejecutar el sigiente comando

```
npmi i
```
Crerar el archivo .env con los siguientes datos

```
PORT=3000
ENV=development
db='mongodb://localhost/adnanalysis'

```
Despues para correr en local 

```
NPM run dev

```

y porbarlos en su servidor local

## Rutas que se pueden probar en local 🖇️

Puede probar en las siguientes url
Con un método Post y en enviando en el body:
```
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```
```
http://localhost:3000/mutation
```
Con un método Get 
```
http://localhost:3000/stats

```
regrersa el conteo de las pruebas que han realizado 
```
{“count_mutations”:40, “count_no_mutation”:100: “ratio”:0.4}

```
### Realizado por 📌

Fernando Mendez Rios




