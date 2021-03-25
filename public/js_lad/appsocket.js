var socket = io(); //('http://192.168.0.100:4333');
//var num_clp = 0;
socket.emit('connect', num_clp);
socket.on('memoria', function(data) {
	M = data.split(',');
	SM = data.split(',');
});
socket.on('timer', function(data) {
	T = data.split(',');
	ST = data.split(',');
});
socket.on('counter', function(data) {
	C = data.split(',');
	SC = data.split(',');

});
socket.on('entrada', function(data) {
       	I = data.split(',');
	SI = data.split(',');
});
socket.on('tr', function(data) {
       R = data.split(',');
       SR = data.split(',');	
});
socket.on('localizacao', function(data) {
       localizacao = data;
});
socket.on('config_retorno', function(data) {
       	num_clp = data;
	context.fillStyle = 'ivory';
  	context.fillRect(86, 202, 45, 31);
    	context.font = '32pt Arial';
  	context.fillStyle = 'red';
	context.fillText(data, 86, 233);
});

socket.on('saida', function(data) {
       	Q = data.split(',');
	liga_led_CLP();
	if (comandos != 0) {
		monitora_ladder();
	};
});

function config(dado){
    	socket.emit('clp', dado);
}

function Enviar(){
	var data = I.join()+ ','+ num_clp;
    	socket.emit('programax', programa+ ','+ num_clp);
    	socket.emit('comandosx', comando+ ','+ num_clp);
    	socket.emit('entradax',data);
}

function Envia_Entrada_Ele(data){
	while (data.length < SI.length) {
		data[data.length] = SI[data.length];
	}
	socket.emit('entradax', data.join()+ ','+ num_clp);
}

function Envia_Entrada_S(data){
	while (data.length < SI.length) {
		data[data.length] = SI[data.length];
	}
	socket.emit('entradax', data.join()+ ','+ num_clp);
}

socket.on('config_socket_r', function(data) {
	localStorage.setItem("num_clp1", data);
});

function Config_Socket_Sim(dado){
	socket.emit('sup', dado);
}

function Envia_Memoria_S(data){
     	socket.emit('memoriax', data+','+Sim_enderecoCT(data,0)+ ','+  localStorage.num_clp1);
}
socket.on('config_socket_r', function(data) {
	localStorage.setItem("num_clp1", data);
});
function Enviar_S(){
	socket.emit('entradax', SI.join()+ ','+  localStorage.num_clp1);
}
