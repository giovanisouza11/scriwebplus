function Enviar(){
	//clpI = I;
	clp_programa = booleano;
	clp_cria_memoria()
    	clp_comandos = comandos;
}

function Envia_Entrada_Ele(data){
	while (data.length < clpI.length) {
		data[(clpI.length)-1] = clpI[(clpI.length)-1];
	}

	if (Tela_Eletrico_Simulador == 0)
		clpI = data; 
}

function Envia_Entrada_S(data){
	while (data.length < clpI.length) {
		data[(clpI.length)-1] = clpI[(clpI.length)-1];
	}
	if (Tela_Eletrico_Simulador==1)
		clpI = data;
}

function Envia_Memoria_S(data){
    	//socket.emit('memoriax', data+','+Sim_enderecoCT(data,0)+ ','+ num_clp); 
	clpM[data.substr(1)] = Sim_enderecoCT(data,0);
}
