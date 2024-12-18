const vscode = require('vscode');

function activate() {
    vscode.commands.registerCommand('calculator.open', () => {
			const panel = vscode.window.createWebviewPanel(
				'calculator',
				'Calculator',
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);

			panel.webview.html = getWebviewContent();
		});
}

function getWebviewContent() {
    return `
    <!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Calculator</title>
		<style>
			body {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.calculator {
				margin-top: 5px;
				display: grid;
				grid-template-columns: repeat(4, 60px);
				gap: 10px;
			}
			button {
				padding: 10px;
				font-size: 36px;
			}
			#result {
				width: 100%;
				font-size: 45px;
				margin-bottom: 40px;
				text-align: center;
				padding: 30px;
				color: white;
				background-color: orange;
			}
		</style>
	</head>
	<body>
		<input id="result" type="text" disabled>
		<div class="calculator">
			<button onclick="append('7')">7</button>
			<button onclick="append('8')">8</button>
			<button onclick="append('9')">9</button>
			<button onclick="operate('/')">÷</button>
			<button onclick="append('4')">4</button>
			<button onclick="append('5')">5</button>
			<button onclick="append('6')">6</button>
			<button onclick="operate('*')">×</button>
			<button onclick="append('1')">1</button>
			<button onclick="append('2')">2</button>
			<button onclick="append('3')">3</button>
			<button onclick="operate('-')">-</button>
			<button onclick="append('0')">0</button>
			<button onclick="clearResult()">C</button>
			<button onclick="calculate()">=</button>
			<button onclick="operate('+')">+</button>
		</div>
		<script>
			console.log("Script is loaded");
			let expression = '';
			function append(value) {
				expression += value;
				document.getElementById('result').value = expression;
			}
			function operate(operator) {
				expression += operator;
				document.getElementById('result').value = expression;
			}
			function clearResult() {
				expression = '';
				document.getElementById('result').value = '';
			}
			function calculate() {
				expression = eval(expression).toString();
				document.getElementById('result').value = expression;
			}
		</script>
	</body>
	</html>
    `;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};