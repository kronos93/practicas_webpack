var messages = require('./messages');
import Btn from './button';
import $ from 'jquery';

console.log('Hola desde webpack');


var box_msg = document.getElementById('message');
box_msg.innerHTML = `
	<div id="menu">
		<button id="loadPage1">Load page 1</button>
		<button id="loadPage2">Load page 2</button>
	</div>
	<div id="content">
		<h1>Homes</h1>
	</div>
`;

document.getElementById('loadPage1').addEventListener('click', ()=>{
	//console.log('page 1');
	System.import('./page1').then(pageModule => {
		document.getElementById('content').innerHTML = pageModule.default;
	});
});
document.getElementById('loadPage2').addEventListener('click', ()=>{
	//console.log('page 2');
	System.import('./page2').then(pageModule => {
		document.getElementById('content').innerHTML = pageModule.default;
	});
});
/*box_msg.innerHTML = (Btn.button);
Btn.attachEl();*/
/*var msg = messages.hi;
var domMsg = document.createTextNode(msg);
box_msg.append(domMsg);

var newMessage = () => `${messages.hi} ${messages.event}`;
var domMsg = document.createTextNode(newMessage());
box_msg.append(domMsg);
if(module.hot){
	module.hot.accept();
}*/
$("#app").css('background-color','red');

console.log('PRODUCTION: ' + PRODUCTION);
console.log('DEVELOPMENT: ' + DEVELOPMENT);

console.log(module, module.hot);
if (module.hot) {
    console.log('ok');
    module.hot.accept();
}