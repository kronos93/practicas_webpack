class Persona {
	constructor(nombre, apellidos) {
  		this.nombre = nombre;
  		this.apellidos = apellidos;
	}	
	
	saludar(){
		[1,2,3].map(function(n) {
		  	console.log(n + 1);
		});
		console.log("Hola: "+ this.nombre + " " + this.apellidos);
	}
}

export default Persona;