#include json2.js

//var fileRef = new File("D:/PASTA DE TRABALHO/ARQUIVOS DE REFERENCIA E AUXILIO/LEGENDAS PHOTOSHOP/Legenda em lote.psd")
//var docRef = app.open( fileRef)
var pasta_destino = 'C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/LEGENDAS';

(function main(){
	//var lessons = loadJson('Projetos reunioes.json');
	//var lessons = loadJson('lessons.json');
	var lessons = loadJson('convidados.json');
	//var lessons = loadJson('nome_vereadores.json'); 
	var numero_convidados = prompt("Quantos convidados tem a lista","1","Input your text here");
	
	for (var i = 0; i < numero_convidados; i++){
		var lesson = lessons[i];
		processLesson(lesson);
	}
		
})();

function processLesson(lesson){
	
	var doc = app.activeDocument;
	var titleGroup = doc.layerSets.getByName('title');
	if (lesson.title.indexOf("\r") != -1){
		var titleLayer = titleGroup.layers[1];
		var posBarraR = lesson.title.indexOf("\r");
		}
	else if (lesson.title.indexOf("/") != -1){
		var titleLayer = titleGroup.layers[0];
		var posBarraR = lesson.title.indexOf("/");
	}else {
		var titleLayer = titleGroup.layers[0];
		var posBarraR = lesson.title.length;
	}
	titleLayer.textItem.contents = lesson.title;
	titleLayer.textItem.justification = Justification.CENTER;
	
	//titleGroup.visible = true;
	//todoGroup.visible = false;
	//var posBarraR = lesson.title.indexOf("/")
	//var posBarraR = lesson.title.indexOf("\r")

	var nomeSalvar = lesson.title.slice(0,posBarraR);
	//alert(nomeSalvar);
	saveGroup(titleGroup,titleLayer, nomeSalvar);
	//saveGroup(todoGroup, lesson.id + '-todo');
}

function saveGroup(group, camada, name){
	
	group.visible = true;
	camada.visible = true;
	savePng(name);
	//savePsd(name);
	group.visible = false;
	camada.visible = false;
}

function loadJson(relPath) {
	var script = new File($.fileName);
	var jsonFile = new File(script.path + '/' + relPath);
	
	jsonFile.open('r');
	var str = jsonFile.read();
	jsonFile.close();
	
	return JSON.parse(str);
}

function saveJpeg(name) {
	var doc = app.activeDocument
	var file = new File(pasta_destino + '/' + name + '.jpg');
	
	var opts = new JPEGSaveOptions();
	opts.quality = 10;
	
	doc.saveAs(file, opts, true);
	
	
}

function savePng(name) {

	var doc = app.activeDocument
	var file = new File(pasta_destino + '/' + name + '.png');
	
	var opts = new PNGSaveOptions();
	opts.quality = 3;
	opts.compression = 9;
	//opts.formatOptions = FormatOptions.PROGRESSIVE
	
	doc.saveAs(file, opts, true);
}

function savePsd(name) {

	var doc = app.activeDocument
	var file = new File(pasta_destino + '/' + name + '.psd');
	
	var opts = new PhotoshopSaveOptions();
	opts.quality = 5;
	
	doc.saveAs(file, opts, true);
}