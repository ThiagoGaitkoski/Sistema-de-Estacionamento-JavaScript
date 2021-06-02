document.getElementById('formulario').addEventListener('submit', cadastrarCarro);//Recebe o formulario do front

function cadastrarCarro(e){
	let modeloCarro = document.getElementById('modeloCarro').value.trim().toUpperCase();
	let placaCarro = document.getElementById('placaCarro').value.trim().toUpperCase();
	let precoHora = document.getElementById('precoHora').value;
	let horaEntrada = new Date();

	// Cria objeto com os dados preenchidos
	veiculo = {
		modelo: modeloCarro,
		placa: placaCarro,
		preco: precoHora,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes() 	
	};

	if(localStorage.getItem('patio') === null){
		let veiculos = [];
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));//transforma em string
	}else{
		let veiculos = JSON.parse(localStorage.getItem('patio'));
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	}

	document.getElementById('formulario').reset();//Reseta as informações do formulário
	mostraPatio();
	e.preventDefault();
}

function confirma(placa){
	let c = confirm("Deseja realmente excluir?");	
	if (c){
		removeVeiculo(placa);
		console.log('Carro removido!');
	}else{
		console.log('Carro não removido!');
		return false;
	}
}

function removeVeiculo(placa){
	let patio = JSON.parse(localStorage.getItem('patio'));
	for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));
	mostraPatio();
}

function calculaHoras(placa, preco, horas, minutos){
	let tot = 0;
	let valor = parseInt(preco);
	let hr = parseInt(horas);
	let min = parseInt(minutos)
	let total = document.getElementById('total-carro');

	let date = new Date();
	let horaAtual = parseInt(date.getHours());
	let minAtual = parseInt(date.getMinutes());

	let qtdHoras = horaAtual - hr;
	let qtdMinutos = minAtual - min;
	let precoHora = qtdHoras  *valor;
	let precoMin = (qtdMinutos/60) * valor;

	if (precoHora == 0){
		tot = precoMin.toFixed(2);
	} else {
		tot = (precoHora + precoMin).toFixed(2);
	}

	total.style.border = " 2px solid green";
	total.innerHTML ='Pagamento referente a esse carro R$:' + tot;
}

function mostrarTudo(num){
	if (num == 1){
		mostraPatio();		
	}
}

function pesquisar(){	
	let pesq = document.getElementById('procurar').value.trim().toUpperCase();
	veiculos = JSON.parse(localStorage.getItem('patio'));
	let patioResultado = document.getElementById('resultados');

	for(var i = 0; i < veiculos.length; i++){
		if(pesq == veiculos[i].placa){
			let modelo = veiculos[i].modelo;
			let placa = veiculos[i].placa;
			let preco = veiculos[i].preco;
			let hora = veiculos[i].hora;
			let minutos = veiculos[i].minutos;
			patioResultado.innerHTML = '<tr><td>'+ modelo + '</td>'+
			'<td>'+ placa + '</td>' +
			'<td>'+ preco + '</td>' +
			'<td>'+ hora + ':' + minutos + '</td>' +
			'<td><button type="button" class="" onclick="calculaHoras(\''+ placa +'\',\''+ preco +'\',\''+ hora +'\',\''+ minutos +'\')">Calcular</button></td>'+
			'<td><button type="button" class="" onclick="confirma(\'' + placa + '\')">Finalizar</button></td>'+
			'</tr>';
			document.getElementById('procurar').style.border= "2px solid green";
			alert('Carro encontrado!');
			mostrarTudo(0);
		}
	}
}


function mostraPatio(){
	let veiculos = JSON.parse(localStorage.getItem('patio'));
	let patioResultado = document.getElementById('resultados');
	patioResultado.innerHTML = '';

	for(var i = 0; i < veiculos.length; i++){
		let modelo = veiculos[i].modelo;
		let placa = veiculos[i].placa;
		let preco = veiculos[i].preco;
		let hora = veiculos[i].hora;
		let minutos = veiculos[i].minutos;
		patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
		'<td>'+ placa + '</td>' +
		'<td>'+ preco + '</td>' +
		'<td>'+ hora + ':' + minutos + '</td>' +
		'<td><button type="button" class="" onclick="calculaHoras(\''+ placa +'\',\''+ preco +'\',\''+ hora +'\',\''+ minutos +'\')">Calcular</button></td>'+
		'<td><button type="button" class="" onclick="confirma(\'' + placa + '\')">Finalizar</button></td>'+
		'</tr>';
	}
}