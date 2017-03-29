const Button = {
	button : '<button id="myBtn">Press me</button>',
	attachEl : () => {
		document.getElementById('myBtn').addEventListener('click',() => {
			debugger;
			console.log('clicked');
		});
	},
}
export default Button;