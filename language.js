var multilang;
			
function onLoad() {
	if (localStorage.linguagem) {
		multilang = new MultiLang('multilang/language.json',localStorage.linguagem, this.initList);
	} else {
		multilang = new MultiLang('multilang/language.json', 'pt', this.initList);
		localStorage.linguagem = 'pt';
	}
}

function onLoad1() {
	multilang = new MultiLang('multilang/languagel.json'); // only load JSON, no callback
	multilang.setLanguage("pt");//localStorage.linguagem);
	refreshLabels();
	localStorage.linguagem = sel.value;
	//document.getElementById("rodape").textContent = localStorage.linguagem ;
}

function langSelectChange(sel) {
	// switch to selected language code
	multilang.setLanguage(sel.value);
	// refresh labels
	refreshLabels();
	localStorage.linguagem = sel.value;
	//document.getElementById("rodape").textContent = localStorage.linguagem ;
}

function initList() {
	// get language list element
	var list = document.getElementsByName("listlanguages")[0];
	// clear all options
	list.options.length = 0;

	// add all available languages
	for (var key in multilang.phrases) {
		// create new language option
		var lang = document.createElement("option");
		lang.value = key;
		lang.innerHTML = multilang.phrases[key]['langdesc'];
		// append to select element
		list.appendChild(lang);
	}
			
	refreshLabels();
}

function refreshLabels() {

	// Basically do the following for all document elements:
	//document.getElementById("Options").textContent = multilang.get("Options");

	// loop through all document elements
	var allnodes = document.body.getElementsByTagName("*"); //("h2");

	for (var i=0, max=allnodes.length; i < max; i++) {
		// get id current elements
		var idname = allnodes[i].id;
		var multi = multilang.get(idname);
		// if id exists, set get id current elements
		if (idname != '') {
			allnodes[i].textContent = multi;
		};
	};
}
		