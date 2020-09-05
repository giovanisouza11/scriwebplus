var num_clp;
var num_linha;

function draw_inicio() {
	if (localStorange.num_clp > 0)
		num_clp = localStorange.numclp;
	else
		num_clp = 0;
	config(num_clp);
	if (localStorange.num_linhas > 0 && localStorange.num_linhas<301)
		num_linha = localStorange.num_linha;
	else
		num_linha = 100;		
	draw_eletrico();
    	draw_botoes();
	draw_ladder_inicio();	
	//onLoad();
}
