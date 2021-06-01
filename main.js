document.getElementById('formulario').addEventListener('submit', cadastraVeiculo)//Recebe o form e chama o cadastro

function cadastraVeiculo(e){
    let modeloCarro = document.getElementById('modeloCarro').value;
    let placaCarro = document.getElementById('placaCarro').value;
    let precoHora = document.getElementById('precoHora').value;
    let horaEntrada = new Date();

    carro = {
		modelo: modeloCarro,
		placa: placaCarro,
		preco: precoHora,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes() 
    }

    if(localStorage.getItem('patio') === null){
        let carros = [];
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));//Chega como objeto transforma em string
    }else{
        let carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    }
    document.getElementById('formulario').reset();

    mostraPatio();
    console.log(carro);
    e.preventDefault();
}

function apagarCarro(placa){
    let carros = JSON.parse(localStorage.getItem('patio'));
    let patioOcupado = document.getElementById('ocupadas');
    let patioLivre = document.getElementById('patio');
    let vagaOcupada = 1;
    let vagaLivre = 9;

    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
            patioLivre.innerHTML  = vagaLivre++;
            patioOcupado.innerHTML = vagaOcupada--;
        }

        localStorage.setItem('patio', JSON.stringify(carros));
    }

    mostraPatio();
}

function mostraPatio(){
    let carros = JSON.parse(localStorage.getItem('patio')); //Chamada dos carros que existem no patio
    let patioResultado = document.getElementById('resultados');
    let patioOcupado = document.getElementById('ocupadas');
    let patioLivre = document.getElementById('patio');
    let vagaOcupada = 1;
    let vagaLivre = 9;
    patioResultado.innerHTML = '';
    patioLivre.innerHTML = '';
    patioOcupado.innerHTML = '';

    for(var i = 0; i < carros.length; i++){
        let modelo = carros[i].modelo;
        let placa = carros[i].placa;
        let hora = carros[i].hora;
        let minutos = carros[i].minutos;

        patioResultado.innerHTML += '<tr><td>'+ modelo +'</td><td>'+ placa +'</td><td>'+ hora +' : ' + minutos + '</td><td><button onclick="apagarCarro(\''+ placa +'\')">Excluir</button></td>'+'</tr>';
        patioLivre.innerHTML  = vagaLivre--;
        patioOcupado.innerHTML = vagaOcupada++;
    }              
}