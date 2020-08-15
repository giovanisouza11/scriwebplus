 var socket = io();
        socket.on('entrada', function(data) {
            document.getElementById("centrada").value = data;
        });
        //socket.on('memoria', function(data) {
        //    document.getElementById("cmemoria").value = data;
        //});
        //socket.on('saida', function(data) {
        //    document.getElementById("csaida").value = data;
        //});
        //socket.on('tr', function(data) {
        //    document.getElementById("ctr").value = data;
        //});
        //socket.on('comandos', function(data) {
        //    document.getElementById("ccomandos").value = data;
        //});
        //socket.on('programa', function(data) {
        //    document.getElementById("cprograma").value = data;
        //});
        //socket.on('mensagem', function(data) {
	    //   // Console_mensagem(data);
        //});
        //socket.on('time', function(data) {
           // document.getElementById("Horario_Conexao").innerHTML = data.time + " IP " + document.location;
        //});

        function Console_mensagem(data){
            var text = document.createTextNode(data);
            var el = document.createElement('li');
            var messages = document.getElementById('Console');
            el.appendChild(text);
            var tamanho =messages.innerHTML.length - 32;
	        var posicao = messages.innerHTML.indexOf("<hr>") +4;
            messages.innerHTML = messages.innerHTML.substr(0,posicao)+el.innerHTML+"<br>"+messages.innerHTML.substr(posicao, tamanho);
	        if (messages.innerHTML.length > 500) {
                messages.innerHTML = messages.innerHTML.substr(0,460);
            };
        }

        function enviar_config(){
            //socket.emit('entrada', document.getElementById("entrada").value); 
            //socket.emit('saida', document.getElementById("saida").value);
            socket.emit('memoriax', document.getElementById("cmemoria").value);
            //socket.emit('tr', document.getElementById("tr").value);
            }
