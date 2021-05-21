function Enviar(){
	clpI = I;
	clp_programa = booleano;
    	clp_comandos = comando;
}

function Envia_Entrada_Ele(data){
	while (data.length < I.length) {
		data[(I.length)-1] = I[(I.length)-1];
	}

	if (Tela_Eletrico_Simulador == 0)
		clpI = data; 
}

function Envia_Entrada_S(data){
	while (data.length < I.length) {
		data[(I.length)-1] = I[(I.length)-1];
	}
	//Sim_I = data.split(',');
	if (Tela_Eletrico_Simulador==1)
		clpI = data;
}

//socket.on('config_socket_r', function(data) {
//	localStorage.setItem("num_clp1", data);
//});

//function Sim_Config_Socket(dado){
//    	socket.emit('clp', dado);
//}
function Envia_Memoria_S(data){
    	//socket.emit('memoriax', data+','+Sim_enderecoCT(data,0)+ ','+ num_clp); 
	clpM[data.substr(1)] = Sim_enderecoCT(data,0);
}
