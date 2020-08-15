
var socket = io(); //('http://192.168.0.100:4333');

socket.on('memoria', function(data) {
	   M = data.split(',');

});
socket.on('timer', function(data) {
	   T = data.split(',');
});
socket.on('counter', function(data) {
	   C = data.split(',');
});
socket.on('entrada', function(data) {
       I = data.split(',');
});
socket.on('tr', function(data) {
       R = data.split(',');
});
socket.on('saida', function(data) {
       Q = data.split(',');
	//		 atualiza_simulador();
});

function Enviar(){
    socket.emit('entradax', I.join());
}

function envia_entrada(data){
	while (data.length < I.length) {
		data[data.length] = I[data.length];
	}
     socket.emit('entradax', data.join());
}

function envia_memoria(data){
	//while (data.length < M.length) {
	//	data[data.length] = M[data.length];
	//}
     socket.emit('memoriax', data+','+enderecoCT(data,0));
}
