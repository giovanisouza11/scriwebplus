//var socket = io(); //('http://192.168.0.100:4333');
//var num_clp = 0;
//socket.emit('connect', num_clp);
//socket.on('memoria', function(data) {
//	M = data.split(',');
	//Sim_M = data.split(',');
//});
//socket.on('timer', function(data) {
//	T = data.split(',');
	//Sim_T = data.split(',');
//});
//socket.on('counter', function(data) {
//	C = data.split(',');
	//Sim_C = data.split(',');

//});
//socket.on('entrada', function(data) {
  //     	I = data.split(',');
	//Sim_I = data.split(',');
//});
//socket.on('tr', function(data) {
  //     R = data.split(',');
       //Sim_R = data.split(',');	
//});
//socket.on('localizacao', function(data) {
  //     localizacao = data;
//});
//socket.on('config_retorno', function(data) {
  //     	num_clp = data;
	//context.fillStyle = 'ivory';
 // 	context.fillRect(86, 202, 45, 31);
   // 	context.font = '32pt Arial';
  //	context.fillStyle = 'red';
	//context.fillText(data, 86, 233);
//});

//socket.on('saida', function(data) {
  //     	Q = data.split(',');
	//Sim_Q = data.split(',');
	//liga_led_CLP();
	//if (comandos != 0) {
	//	monitora_ladder();
	//};
//});

//function config(dado){
  //  	socket.emit('clp', dado);
//}

function Enviar(){
	clpI = I;
    	//Sim_I = I;
	clp_programa = programa;
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
	clpM[ ] = Sim_enderecoCT(data,0);
}
