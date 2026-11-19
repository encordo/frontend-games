//var baraja = ["AH","AS","2H","2S"];
const baraja = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "XH", "JH", "QH", "KH",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "XC", "JC", "QC", "KC",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "XD", "JD", "QD", "KD",
    "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "XS", "JS", "QS", "KS"];

let carta1;
let carta2;
let partida;
let id_crono;
let segundos;
let movimientos;

function compruebaPartida() {
    let tapadas = document.getElementsByClassName("tapado");
    if (tapadas.length == 0) {
        paraCrono();
        document.getElementById("boton").style.display = "initial";
        let h1 = document.querySelector("h1");
        h1.innerText("Partida terminada");
        h1.style.color("red");
        document.getElementById("contadorf").innerText("En " + movimientos + " movimientos.")
    }
}
function convMinSec(secTotal) {
    let minSec;
    let mins;
    let secs;
    //Construye el string de tiempo a mostrar en mm:ss
    if (secTotal >= 60) {
        secs = secTotal % 60;
        mins = (secTotal - secs) / 60;
        minSec = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    } else {
        minSec = "00:" + (secTotal < 10 ? "0" + secTotal : secTotal);
    }
    return minSec;
}
function arrancaCrono() {
    id_crono = setInterval(avanzaCrono, 1000);
}
function paraCrono() {
    clearInterval(id_crono);
    id_crono = 0;
}
function avanzaCrono() {
    //incrementa el contador de segundos en 1 y vuelca el total al input correspondiente
    segundos++;
    document.getElementById("crono").setAttribute("value", convMinSec(segundos));
}
function escogeNumero(total) {
    return Math.floor(Math.random() * total);
}
function preparaPartida() {
    id_crono = 0;
    segundos = 0;
    movimientos = 0;
    partida = new Array();
    carta1 = "00";
    while (baraja.length > 0) {
        var posicion = escogeNumero(baraja.length - 1);
        var carta = baraja[posicion];
        baraja.splice(posicion, 1);
        partida.push(carta);
    }
}
function tapa(carta) {
    carta.classList.remove("destapado");
    carta.classList.add("tapado");
    carta.addEventListener("click", miraCarta);
}
function destapa(carta) {
    carta.classList.remove("tapado");
    carta.classList.add("destapado");
    carta.removeEventListener("click", miraCarta);
}
function empareja(idc1, idc2) {
    document.getElementById(idc1).classList.remove("destapado");
    document.getElementById(idc1).classList.add("emparejada");
    document.getElementById(idc1).removeEventListener("click", miraCarta);
    document.getElementById(idc2).classList.remove("destapado");
    document.getElementById(idc2).classList.add("emparejada");
    document.getElementById(idc2).removeEventListener("click", miraCarta);
}
function miraCarta() {
    if (id_crono == 0) arrancaCrono();
    destapa(this)
    if (carta1 == "00") {
        carta1 = this.getAttribute("id");
    } else {
        movimientos++;
        if (this.getAttribute("id").charAt(0) === carta1.charAt(0)) {
            //OK
            empareja(carta1, this.getAttribute("id"));
            carta1 = "00";
            compruebaPartida();
        } else {
            carta2 = this.getAttribute("id");
            document.querySelectorAll(".tapado").forEach(elemento => elemento.removeEventListener("click", miraCarta));
            setTimeout(function () {
                document.querySelectorAll(".tapado").forEach(elemento => elemento.addEventListener("click", miraCarta));
                tapa(document.getElementById(carta1));
                tapa(document.getElementById(carta2));
                carta1 = "00";
            }, 1500);

        }
    }
}
function repartePartida() {
    document.getElementById("boton").style.display = "none";
    document.getElementById("crono").setAttribute("value", convMinSec(segundos))
    for (let i = 0; i < partida.length; i++) {
        let carta = document.createElement("div");
        carta.setAttribute("id", partida[i]);
        document.getElementById("tapete").append(carta);
        //let ref_carta = partida[i];
        let cresta = (partida[i].charAt(0) == 'X' ? "10" : partida[i].charAt(0));
        let palo;
        let componente;
        carta.classList.add("naipe");
        carta.classList.add("tapado");
        componente = document.createElement("div");
        componente.classList.add("crs");
        componente.innerText = cresta;
        carta.append(componente);
        switch (partida[i].charAt(1)) {
            case 'H': palo = "&hearts;";
                carta.classList.add("heart");
                break;
            case 'C': palo = "&clubs;";
                carta.classList.add("club");
                break;
            case 'S': palo = "&spades;";
                carta.classList.add("spade");
                break;
            case 'D': palo = "&diams;";
                carta.classList.add("diamond");
                break;
            default: alert(partida[i] + " palma");
        }
        componente = document.createElement("div")
        componente.classList.add("palo");
        componente.innerHTML = palo;
        carta.append(componente);
        componente = document.createElement("div");
        componente.classList.add("dist");
        componente.innerText = cresta
        carta.append(componente);
        componente = document.createElement("div")
        componente.classList.add("cri");
        componente.innerText = cresta;
        carta.append(componente);
        carta.addEventListener("click", miraCarta);
    }
}
/**************************************************************** */
function limpiaTapete() {
    document.querySelector(".naipe").forEach(elemento => elemento.remove());
}

function nuevaPartida() {
    let h1 = document.querySelector("h1");
    h1.innerText("Emparejadas");
    h1.style.color = "auto";
    document.getElementById("contador").innerText = "";
    limpiaTapete();
    preparaPartida();
    repartePartida();
}

window.onload = function () {
    preparaPartida();
    repartePartida();
    document.getElementById("boton").addEventListener("click", nuevaPartida);

};