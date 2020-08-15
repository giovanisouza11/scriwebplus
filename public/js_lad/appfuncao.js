	
function funAIM(data) {
    var nLogicas = data.split(',');
	let texto = '_id, nome, var_1, tipo, var_2, ver, R-W, pisca, funcao' + '\n';
	compila_ladder();

    var i=pos_Logica.length-1;
	while (pos_Logica[i] > nLogicas[0]){
		  i--;
	};
	nLogicas[0] = pos_Logica[i];
	
	i = 0; 
	while ((pos_Logica[i] < nLogicas[2]) && (i < pos_Logica.length) ){
		i++;
	};
	if( i >(pos_Logica.length-1))
		i = pos_logica.length;
	nLogicas[2] = pos_Logica[i];
	
	i=0;
	while ((pos_Logica[i] < (parseInt(nLogicas[0])+parseInt(nLogicas[1]))) && (i < pos_Logica.length) ){
		i++;
	};
	if( (i < (pos_Logica.length)) && (valor_chave[17] != 1))
		nLogicas[1] = pos_Logica[i];
		
	//Mudanca o local
	var tamanho = parseInt(larray.length/(8*9));
	var desvio = parseInt(nLogicas[1]); 
	//document.getElementById("rodape1").innerHTML += nLogicas[0]+'-'+desvio+ '-'+nLogicas[2]+'-'+tamanho;
		
	if (valor_chave[17]==1 && desvio > 0) 
		inserir(tamanho, desvio, nLogicas[0]);
	else
		valor_chave[17] = 0;
	
	if (valor_chave[18]==1) 
			copiar(tamanho, desvio, nLogicas[0], nLogicas[2]);
	
	if (valor_chave[19]==1) 
			mover(tamanho, desvio, nLogicas[0], nLogicas[2]);
	
	if (valor_chave[20]==1) 
			apagar(tamanho, desvio, nLogicas[0]);
	
	var fileArr;
	for (var i=0; i<(larray.length/9); i++) {
		for (var j=0; j<9; j++)
		    texto += larray[(i*9)+j]+',';
		texto += '\n';
	}
	fileArr = texto.split('\n');

	draw_ladder(fileArr);
}

function inserir(tamanho, desvio, origem){
	for (var i=tamanho; i>=origem; i--){ 
		for(var z=0 ;z<8; z++){
			larray[(i+desvio)*9*8+(z*9)] = (i+desvio)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i+desvio)*9*8+(z*9)+j] = larray[i*9*8+(z*9)+j];
		}
	}
	for (var i=origem; i<(origem+desvio); i++){ 
		for(var z=0 ;z<8; z++){
			for(var j=0; j<9 ; j++)
				larray[i*9*8+(z*9)+j] = '';
		}
	}
	valor_chave[17] = 0;
}

function copiar(tamanho, desvio, origem, destino){
	desvio = desvio - origem;
	if (origem > destino)
		origem = origem +destino;
	for (var i=tamanho; i>=destino; i--){ 
		for(var z=0 ;z<8; z++){
			larray[(i+desvio)*9*8+(z*9)] = (i+desvio)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i+desvio)*9*8+(z*9)+j] = larray[i*9*8+(z*9)+j];
		}
	}
	for (var i=origem; i<(origem+desvio); i++){ 
		for(var z=0 ;z<8; z++){
			larray[(i-origem+destino)*9*8+(z*9)] = (i-origem+destino)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i-origem+destino)*9*8+(z*9)+j] = larray[i*9*8+(z*9)+j];
		}
	}
	valor_chave[18] = 0;
}

function mover(tamanho, desvio, origem, destino){
	desvio = desvio - origem;
	if (origem > destino)
		origem = origem + destino;
	for (var i=tamanho; i>=destino; i--){ 
		for(var z=0 ;z<8; z++){
			larray[(i+desvio)*9*8+(z*9)] = (i+desvio)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i+desvio)*9*8+(z*9)+j] = larray[i*9*8+(z*9)+j];
		}
	}
	for (var i=0; i<desvio; i++){ 
		for(var z=0 ;z<8; z++){
			larray[(i+destino)*9*8+(z*9)] = (i+destino)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i+destino)*9*8+(z*9)+j] = larray[(i+origem)*9*8+(z*9)+j];
		}
	};
	apagar(tamanho, desvio+origem, origem);
	valor_chave[19] = 0;
}

function apagar(tamanho, desvio, origem){
	desvio = desvio - origem;
	for (var i=(origem+desvio); i<=tamanho; i++){ 
		for(var z=0 ;z<8; z++){
			larray[(i-desvio)*9*8+(z*9)] = (i-desvio)*10+z;
			for(var j=1; j<9 ; j++)
				larray[(i-desvio)*9*8+(z*9)+j] = larray[(i)*9*8+(z*9)+j];
		}
	}
	for (var i=tamanho; i>(tamanho-desvio); i--){ 
		for(var z=0 ;z<8; z++){
			for(var j=0; j<9 ; j++)
				larray[(i)*9*8+(z*9)+j] = '';
		}
	}
	valor_chave[20] = 0;
}