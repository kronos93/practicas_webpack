var $ = require('jquery');
import Persona from './Persona';
import autoNumeric from './autoNumeric.js';
import NumeroALetras from './NumeroALetras.js';

$( document ).ready(function() {
	console.log("Hola mundo");
	//console.log(NumeroALetras.NumeroALetras(1100000000000.00));
	require('./format_campos.js');
	var persona = new Persona("Samuel","Rojas Too");
	persona.saludar();
  	
});