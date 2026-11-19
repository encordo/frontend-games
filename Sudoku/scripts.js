import { SudokuGenerator } from "./sgl_ai.js";

const generator = new SudokuGenerator();
let dificultad; //Número de casillas visibles
let sudoku;
/************MAPAS DE LOS DISTINTOS GRUPOS A VALIDAR******************/
//Cuadrantes
/* const cdr1 = ["c111", "c112", "c113", "c121", "c122", "c123", "c131", "c132", "c133"];
const cdr2 = ["c214", "c215", "c216", "c224", "c225", "c226", "c234", "c235", "c236"];
const cdr3 = ["c317", "c318", "c319", "c327", "c328", "c329", "c337", "c338", "c339"];
const cdr4 = ["c441", "c442", "c443", "c451", "c452", "c453", "c461", "c462", "c463"];
const cdr5 = ["c544", "c545", "c546", "c554", "c555", "c556", "c564", "c656", "c566"];
const cdr6 = ["c647", "c648", "c649", "c657", "c658", "c659", "c667", "c668", "c669"];
const cdr7 = ["c771", "c772", "c773", "c781", "c782", "c783", "c791", "c792", "c793"];
const cdr8 = ["c874", "c875", "c876", "c884", "c885", "c886", "c894", "c895", "c896"];
const cdr9 = ["c977", "c978", "c979", "c987", "c988", "c989", "c997", "c998", "c999"]; */
//Filas
const fil1 = ["c111", "c112", "c113", "c214", "c215", "c216", "c317", "c318", "c319"];
const fil2 = ["c121", "c122", "c123", "c224", "c225", "c226", "c327", "c328", "c329"];
const fil3 = ["c131", "c132", "c133", "c234", "c235", "c236", "c337", "c338", "c339"];
const fil4 = ["c441", "c442", "c443", "c544", "c545", "c546", "c647", "c648", "c649"];
const fil5 = ["c451", "c452", "c453", "c554", "c555", "c556", "c657", "c658", "c659"];
const fil6 = ["c461", "c462", "c463", "c564", "c565", "c566", "c667", "c668", "c669"];
const fil7 = ["c771", "c772", "c773", "c874", "c875", "c876", "c977", "c978", "c979"];
const fil8 = ["c781", "c782", "c783", "c884", "c885", "c886", "c987", "c988", "c989"];
const fil9 = ["c791", "c792", "c793", "c894", "c895", "c896", "c997", "c998", "c999"];
//Colmunas
/* const col1 = ["c111", "c121", "c131", "c441", "c451", "c461", "c771", "c781", "c791"];
const col2 = ["c112", "c122", "c132", "c442", "c452", "c462", "c772", "c782", "c792"];
const col3 = ["c113", "c123", "c133", "c443", "c453", "c463", "c773", "c783", "c793"];
const col4 = ["c214", "c224", "c234", "c544", "c554", "c564", "c874", "c884", "c894"];
const col5 = ["c215", "c225", "c235", "c545", "c555", "c565", "c875", "c885", "c895"];
const col6 = ["c216", "c226", "c236", "c546", "c556", "c566", "c876", "c886", "c896"];
const col7 = ["c317", "c327", "c337", "c647", "c657", "c667", "c977", "c987", "c997"];
const col8 = ["c318", "c328", "c338", "c648", "c658", "c668", "c978", "c988", "c998"];
const col9 = ["c319", "c329", "c339", "c649", "c659", "c669", "c979", "c989", "c999"]; */
/********************** */
const filas = [fil1, fil2, fil3, fil4, fil5, fil6, fil7, fil8, fil9];
/* const columnas = [col1, col2, col3, col4, col5, col6, col7, col8, col9];
const cuadrantes = [cdr1, cdr2, cdr3, cdr4, cdr5, cdr6, cdr7, cdr8, cdr9]; */
/******************************/
function compruebaPartida() {
	//let contador = 0;
	let datosPartida = document.getElementById("datos-partida");
	let correctas = 0;
	let incorrectas = 0;
	let vacias = 0;
	for (let i = 0; i < filas.length; i++) {
		for (let j = 0; j < filas[i].length; j++) {
			//console.log(`f${i+1} c${j+1} - ${filas[i][j]}`);
			let celda = document.getElementById(filas[i][j]);
			celda.readOnly = true;
			if (!celda.classList.contains("fija") && sudoku.solution[i][j] === parseInt(celda.value)) {
				celda.classList.add("correcta");
				correctas++;
			}
			else if (!celda.classList.contains("fija")) {
				celda.classList.add("incorrecta");
				if (celda.value !== "")
					incorrectas++;
				else {
					vacias++;
				}
			}
		}
	}
	let estado = document.getElementById("estado");
	if (document.querySelectorAll(".fija").length
		+ document.querySelectorAll(".correcta").length === 81) {
		estado.innerText = "Correcto";
		estado.classList.add("correcto");
		datosPartida.innerText = "Todo correcto";
		alert("¡FELICIDADES!\nLo has resuelto");
	}
	else {
		estado.innerText = "Incorrecto";
		estado.classList.add("incorrecto");
		datosPartida.innerHTML = `Correctas:${correctas}&emsp;Incorrectas:${incorrectas}&emsp;Vacías:${vacias}&emsp;Fijas:${dificultad}`;
		alert("Lo siento.\nHay fallos.");
	}
}

function sudokuLleno(){
	let celdas = document.querySelectorAll(".celda > input[type='text']");
	for(let celda of celdas){
		if(celda.value === undefined || celda.value === "") return false;
		
	}
	return true;
}

function inicializaJuego() {
	dificultad = document.getElementById("s_dificultad").value;
	sudoku = generator.generate(dificultad);
	for (let i = 0; i < filas.length; i++) {
		for (let j = 0; j < filas[i].length; j++) {
			//console.log(`f${i+1} c${j+1} - ${filas[i][j]}`);
			let celda = document.getElementById(filas[i][j]);
			celda.classList.remove("fija", "correcta", "incorrecta");
			if (sudoku.puzzle[i][j] !== 0) {
				celda.value = sudoku.puzzle[i][j];
				celda.classList.add("fija");
				celda.readOnly = true;
			}
			else {
				celda.value = "";
			}
		}
	}
	document.getElementById("datos-partida").innerText = "";
	let estado = document.getElementById("estado");
	estado.innerText = "En juego";
	estado.classList.remove("correcto", "incorrecto");
	//Volcado del sudoku y su solución para comprobaciones.
	/* generator.printBoard(sudoku.solution);
	generator.printBoard(sudoku.puzzle); */
}

function configuraDificultad(dif) {
	dificultad = dif;
	let selDif = document.getElementById("s_dificultad");
	selDif.addEventListener("input", function () {
		dificultad = selDif.value;
		inicializaJuego();
	})

}

function configuraCeldas() {
	//La celda sólo admitirá números del 1 al 9
	document.querySelectorAll(".celda > input").forEach(element => {
		element.addEventListener("input", function () {
			console.log("Salto: " + new Date().toDateString());
			this.value = this.value.replace(/[^1-9]/g, '');
			if(sudokuLleno()){
				document.getElementById("b_comprobar").disabled = false;
			}
			else{
				document.getElementById("b_comprobar").disabled = true;
			}
		});
		element.addEventListener("click", function () {
			if (!this.classList.contains("correcta") && !this.classList.contains("fija")) {
				this.readOnly = false;
				this.classList.remove("incorrecta");
				this.value = "";
			}
		})
	});
}
function configuraBotones() {
	document.getElementById("b_comprobar").disabled = true;
	document.getElementById("b_comprobar").addEventListener("click", function () {
		this.disabled = true;
		compruebaPartida();
	});
	document.getElementById("b_np").addEventListener("click", function () {
		document.getElementById("b_comprobar").disabled = true;
		inicializaJuego();
	})
}
// == MAIN ===


configuraDificultad(35);
configuraCeldas();
configuraBotones();
inicializaJuego();
