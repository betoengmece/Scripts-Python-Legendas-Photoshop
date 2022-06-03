#include json2.js

//var fileRef = new File("D:/PASTA DE TRABALHO/ARQUIVOS DE REFERENCIA E AUXILIO/LEGENDAS PHOTOSHOP/Legenda em lote.psd")
//var docRef = app.open( fileRef)
var pasta_destino = 'C:/Users/betoe/Desktop/CAMARA LONDRINA/PhotoshopPortable/LEGENDAS';

(function main(){
	var nome = ["AILTON NANTES", "AMAURI CARDOSO", "DANIELE ZIOBER",
	"EMANOEL GOMES", "ESTEVAO DA ZONA SUL", "FELIPE PROCHET", "JAIRO TAMURA",
	"JOAO MARTINS","ROQUE NETO", "MADUREIRA", "MARIO", "GERSON ARAUJO",
	"PROFESSOR RONY", "ROBERTO FU", "VILSON BITTENCOURT","EDUARDO TOMINAGA",
	"GUILHERME BELENATI" , "SANTOS ROSA", "PÉRICLES LONDRINA"];
	//var lessons = loadJson('lessons.json');
	var lessons = loadJson('nome_vereadores.json'); 
	
	for (var i = 0; i < lessons.length; i++){
		var lesson = lessons[i];
		processLesson(lesson,nome[i]);
	}
		
})();

function processLesson(lesson,nome){
	
	var doc = app.activeDocument;
	var titleGroup = doc.layerSets.getByName('title');
	var titleLayer = titleGroup.layers[0];
	titleLayer.textItem.contents = lesson.title;
	titleLayer.textItem.justification = Justification.CENTER
	
	//titleGroup.visible = true;
	//todoGroup.visible = false;
	
	saveGroup(titleGroup,titleLayer, nome);
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