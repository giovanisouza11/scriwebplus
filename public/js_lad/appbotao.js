var AImageB = new Image();
AImageB.src = "/img_lad/botoes4.png";
var canvas1;
var context1;
var valor_chave = new Array(31);
let titulo_lad = 'Scriweb';

//desenha os botoes
function draw_botoes() {
        canvas1 = document.getElementById("tela2");
	context1 = canvas1.getContext("2d");
        canvas1.width = 220;
        canvas1.height = 500;

	for(i=1; i<11; i++)
                context1.drawImage(AImageB, 70*valor_chave[i], 45*(i-1), 70, 45, 7,(i-1)*47, 70, 45);
    	for(i=11; i<21; i++)
                context1.drawImage(AImageB, 140+(70*valor_chave[i]), 45*(i-11), 70, 45, 79,(i-11)*47, 70, 45);
 	for(i=21; i<31; i++)
                context1.drawImage(AImageB, 280+(70*valor_chave[i]), 45*(i-21), 70, 45, 151,(i-21)*47, 70, 45);
}

//Verifica QUAL botao foi acionado
//Separa em tres grupos: 0 a 10: comandos do software, 11 a 20: edicao do ladder, 21 a 30: funcoes do ladder
function trocar_botao() {
	var posicaoy= parseInt((window.event.clientY-1)/47);
	var posicaox = parseInt((window.event.clientX-425)/72);
	if (posicaox == 1)
		posicaoy = posicaoy + 10;
	if (posicaox == 2)
		posicaoy = posicaoy + 20;

	//document.getElementById("Horario_Conexao").innerHTML = posicaoy;
	if ((posicaoy >=0) && (posicaoy < 31))
	{
		for(var i=11; i<31; i++)
			valor_chave[i] = 0;
		if((posicaoy >=3) && (posicaoy < 8))
			for(var i=2; i<8; i++)
				valor_chave[i] = 0;

		valor_chave[posicaoy]=1;
		draw_botoes();
	}
	if (valor_chave[20]==1){
		//window.open("popup", "Apagar", "height=200,width=200");
		// Get the modal
		var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "Apagar";
		modalb.innerHTML = "<p>Origem <input type=text id='input1' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Quantidade<input type=text id='input2' maxlength=3 size=3></p>"; 
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			funAIM(document.getElementById('input1').value + ','+document.getElementById('input2').value +',0');
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
	if (valor_chave[19]==1){
		//window.open("popup", "Mover", "height=200,width=200");
		var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "Mover";
		modalb.innerHTML = "<p>Origem <input type=text id='input1' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Quantidade<input type=text id='input2' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Destino<input type=text id='input3' maxlength=3 size=3></p>"; 
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			funAIM(document.getElementById('input1').value + ','+document.getElementById('input2').value +','+document.getElementById('input3').value);
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
	if (valor_chave[18]==1){
		//window.open("popup", "Copiar", "height=200,width=200");
		var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "Copiar";
		modalb.innerHTML = "<p>Origem <input type=text id='input1' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Quantidade<input type=text id='input2' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Destino<input type=text id='input3' maxlength=3 size=3></p>"; 
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			funAIM(document.getElementById('input1').value + ','+document.getElementById('input2').value +','+document.getElementById('input3').value);
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

	}
	if (valor_chave[17]==1){
		//window.open("popup", "Inserir", "height=200,width=200");
		var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "Inserir";
		modalb.innerHTML = "<p>Origem <input type=text id='input1' maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Quantidade<input type=text id='input2' maxlength=3 size=3></p>"; 
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			funAIM(document.getElementById('input1').value + ','+document.getElementById('input2').value +',0');
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

	}

	if (valor_chave[10]==1){
        //location.href='/About';
        window.open("About", "SCriWeb", "height=600,width=600");
	    valor_chave[10]=0;
	}
	if (valor_chave[9]==1){
        //location.href='Help';
        window.open("Help", "SCriWeb", "height=800,width=1000");
	    valor_chave[9]=0;
	}
	if (valor_chave[8]==1){
        //location.href='/Config';
       // window.open("Config", "SCriWeb", "height=320,width=500");
	 	var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "CONFIG";
		modalb.innerHTML = "<p>Endereço do CLP (1 a 30): <input type=number id='input1' max=30 min=0 size=2></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Tempo de Scan: <input type=number id='input2' max=10 maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Tempo de Atualização(Num de Scan):<input type=number id='input3' max=10 maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Número máximo de lógicas:<input type=number id='input4' max = 200 maxlength=3 size=3></p>"; 
		document.getElementById('input1').value = localStorage.num_clp;
		document.getElementById('input2').value = localStorage.tempo_scan;
		document.getElementById('input3').value = localStorage.tempo_atualizacao;
		document.getElementById('input4').value = localStorage.num_linhas;
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			config(document.getElementById('input1').value);
			localStorage.setItem("num_clp", document.getElementById('input1').value);
			localStorage.setItem("tempo_scan", document.getElementById('input2').value);
			localStorage.setItem("tempo_atualizacao", document.getElementById('input3').value);
			localStorage.setItem("num_linhas", document.getElementById('input4').value);
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	
	   valor_chave[8]=0;
	}
	if (valor_chave[1]==1){
        	var inputCSV = document.createElement('input');
		inputCSV.type = 'file';
		inputCSV.accept = '.CSV';
	    	inputCSV.click();
		inputCSV.onchange = function() {
			//inputCSV.setPropertie('accept', '.csv');
			var file = this.files[0];
		    	leitorDeCSV1.readAsText(file);
			titulo_lad =;
		};
		valor_chave[1]=0;
		valor_chave[4]==0;
		valor_chave[5]==0;
		valor_chave[6]==0;
		valor_chave[7]==1;
	}
	if (valor_chave[2]==1){
	    let texto = '_id, nomecep, var_1, tipo, var_2, ver, R-W, pisca, funcao' + '\n';
	    for (var i=0; i<(larray.length/9); i++) {
			for (var j=0; j<9; j++)
			    texto += larray[(i*9)+j]+',';
			texto += '\n';
		}
		compila_ladder();
		//texto += '\n\n';
		//for (var i=0; i<(booleano.length); i++) {
			//for (var j=0; j<2; j++)
		//	texto += booleano[i]+' , ';
		//}
        //let titulo ='scriweb';
        var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        saveAs(blob, titulo + ".csv");
        valor_chave[2]=0;
	}
	if (valor_chave[3]==1){
		compila_ladder();
		let texto = '';
		for (var i=0; i<(booleano.length); i++) {
			//for (var j=0; j<2; j++)
			texto += booleano[i]+',';
		}

                //socket.emit('programax', texto+','+num_clp); 
		clp_programa = booleano;
		clp_cria_memoria();
		//alert(clp_programa);
		I = clpI;
		valor_chave[3]=0;
		valor_chave[7]=1;
	}

	if (valor_chave[4]==1){
		comandos = 1;
		run_CLP();
		clp_comandos = 1;
		//socket.emit('comandosx', 1+ ','+  num_clp);
	}
	if (valor_chave[5]==1){
		run_CLP();
		comandos = 2;
		clp_comandos = 2;
		//socket.emit('comandosx', 2+ ','+  num_clp);
	}
	if (valor_chave[6]==1){
		run_CLP();
		if (comandos == 3)
			clp_comandos = 4;
			//socket.emit('comandosx', 4+ ','+  num_clp);
		else {
			comandos = 3;
			clp_comandos = 3;
			//socket.emit('comandosx', 3+ ','+  num_clp);
		}
	}
	if (valor_chave[7]==1){
		comandos = 0;
		stop_CLP();
		monitora_ladder(larray);
		clp_comandos = 0;
		//socket.emit('comandosx', 0+ ','+  num_clp);
	}
}


//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var leitorDeCSV1 = new FileReader();
leitorDeCSV1.addEventListener('load', leCSV1);


function pegaCSV1(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV1.readAsText(file);
}

function leCSV1(evt) {
	var fileArr = evt.target.result.split('\n');
	
//document.getElementById("rodape1").innerHTML = fileArr;
	draw_ladder(fileArr);
}
