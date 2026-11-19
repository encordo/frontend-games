let mazo;
let id_crupier;

function escogeNumero(total) {
    return Math.floor(Math.random() * total);
}
function barajarMazo() {
    //var baraja = ["AH","AS","2H","2S"];
    const baraja = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "XH", "JH", "QH", "KH",
        "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "XC", "JC", "QC", "KC",
        "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "XD", "JD", "QD", "KD",
        "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "XS", "JS", "QS", "KS"];
    mazo = new Array();
    while (baraja.length > 0) {
        let posicion = escogeNumero(baraja.length - 1);
        let carta = baraja[posicion];
        baraja.splice(posicion, 1);
        mazo.push(carta);
    }
}

/********************************************************************/
function evaluaMano(mano) {
    let cuenta = 0;
    let tiene_as = false;
    for (let i = 0; i < mano.length; i++) {
        switch (mano[i].charAt(0)) {
            case "2": cuenta += 2; break;
            case "3": cuenta += 3; break;
            case "4": cuenta += 4; break;
            case "5": cuenta += 5; break;
            case "6": cuenta += 6; break;
            case "7": cuenta += 7; break;
            case "8": cuenta += 8; break;
            case "9": cuenta += 9; break;
            case "X": cuenta += 10; break;
            case "J": cuenta += 10; break;
            case "Q": cuenta += 10; break;
            case "K": cuenta += 10; break;
            default: tiene_as = true;
                if (cuenta + 11 > 21)
                    cuenta += 1;
                else
                    cuenta += 11;
        }
    }
    // If it overflows, recalculates counting aces as 1
    if (cuenta > 21 && tiene_as) {
        cuenta = 0;
        for (let i = 0; i < mano.length; i++) {
            switch (mano[i].charAt(0)) {
                case "2": cuenta += 2; break;
                case "3": cuenta += 3; break;
                case "4": cuenta += 4; break;
                case "5": cuenta += 5; break;
                case "6": cuenta += 6; break;
                case "7": cuenta += 7; break;
                case "8": cuenta += 8; break;
                case "9": cuenta += 9; break;
                case "X": cuenta += 10; break;
                case "J": cuenta += 10; break;
                case "Q": cuenta += 10; break;
                case "K": cuenta += 10; break;
                default: cuenta += 1;
            }
        }
    }
    return cuenta
}
function preparaPartida() {
    barajarMazo();
    repartirCartas();
}
function robarCarta() {
    let carta = mazo.shift();
    return carta;
}
function crearCarta(carta) {
    let naipe = document.createElement("div");
    naipe.setAttribute("id",carta);
    let cresta = (carta.charAt(0) == 'X' ? "10" : carta.charAt(0));
    let palo;
    let componente;
    naipe.classList.add("naipe");
    naipe.classList.add("destapado");
    componente = document.createElement("div");
    componente.classList.add("crs");
    componente.innerText = cresta;
    naipe.append(componente);
    switch (carta.charAt(1)) {
        case 'H': palo = "&hearts;";
            naipe.classList.add("heart");
            break;
        case 'C': palo = "&clubs;";
            naipe.classList.add("club");
            break;
        case 'S': palo = "&spades;";
            naipe.classList.add("spade");
            break;
        case 'D': palo = "&diams;";
            naipe.classList.add("diamond");
            break;
        default: alert(carta + " palma");
    }
    componente = document.createElement("div");
    componente.classList.add("palo");
    componente.innerHTML = palo;
    naipe.append(componente);
    componente = document.createElement("div");
    componente.classList.add("dist");
    componente.innerText = cresta;
    naipe.append(componente);
    componente = document.createElement("div");
    componente.classList.add("cri");
    componente.innerText = cresta;
    naipe.append(componente);
    return naipe;
}
function repartirCartas() {
    let carta = robarCarta();
    let naipe = crearCarta(carta);
    document.getElementById("slot_jugador").append(naipe);
    document.getElementById("m_jugador").innerText = evaluaMano([carta]);
    carta = robarCarta();
    naipe = crearCarta(carta);
    document.getElementById("slot_crupier").append(naipe);
    document.getElementById("m_crupier").innerText = evaluaMano([carta]);
}
function getMano(node_mano) {
    let cartas = node_mano.childNodes;
    let mano = new Array();
    for (var i = 0; i < cartas.length; i++) {
        mano.push(cartas[i].getAttribute("id"));
    }
    return mano;
}
function pideCarta() {
    let carta = robarCarta();
    let naipe = crearCarta(carta);
    document.getElementById("slot_jugador").append(naipe);
    let p_jugador = evaluaMano(getMano(document.getElementById("slot_jugador")));
    document.getElementById("m_jugador").innerText = p_jugador;
    if (p_jugador >= 21) {
        document.getElementById("top_deck").removeEventListener("click",pideCarta);
        if (p_jugador == 21) {
            alert("¡¡BLACJACK!!");
            juegaCrupier();
        } else {
            document.getElementById("b_pasa").removeEventListener("click",juegaCrupier);
            terminaPartida(1);
        }
    }
}
function jugadaCrupier() {
    let carta = robarCarta();
    let naipe = crearCarta(carta);
    document.getElementById("slot_crupier").append(naipe);
    var p_crupier = evaluaMano(getMano(document.getElementById("slot_crupier")))
    document.getElementById("m_crupier").innerText = p_crupier;
    if (p_crupier == 21) {
        alert("¡¡BLACJACK!!")
    }
    if (p_crupier > 21) {
        terminaPartida(2);
    } else if (p_crupier >= evaluaMano(getMano(document.getElementById("slot_jugador")))) {
        terminaPartida(3);
    } else if (p_crupier >= 17) {
        terminaPartida(4);
    } else {
        //Sigue jugando
    }
}
function juegaCrupier() {
    document.getElementById("b_pasa").removeEventListener("click",juegaCrupier);
    document.getElementById("top_deck").removeEventListener("click",pideCarta);
    id_crupier = setInterval(jugadaCrupier, 1000);
}
function terminaPartida(tipo) {
    if (tipo > 1) clearInterval(id_crupier);
    let gs_banner = document.getElementById("gs_banner");
    gs_banner.style.display = "block";
    switch (tipo) {
        case 1: gs_banner.style.color =  "red";
                gs_banner.innerHTML = "Te pasaste.<br>¡¡PERDISTE!!";
                break;
        case 2: gs_banner.style.color =  "lime";
                gs_banner.innerHTML = "Se pasó.<br>Has ganado.";
                break;
        case 3: gs_banner.style.color =  "red";
                gs_banner.innerHTML = "Te pilló.<br>Has perdido";
                break;
        case 4: gs_banner.style.color =  "lime";
                gs_banner.innerHTML = "Se planta.<br>Has ganado.";
    }
}
function limpiaTapete() {
    document.querySelectorAll("#slot_crupier .naipe").forEach(carta =>carta.remove());
    document.querySelectorAll("#slot_jugador .naipe").forEach(carta =>carta.remove());
}
window.onload = function(){
    preparaPartida();
    document.getElementById("top_deck").addEventListener("click",pideCarta);
    document.getElementById("b_pasa").addEventListener("click",juegaCrupier);
    document.getElementById("b_np").addEventListener("click",function(){
        limpiaTapete();
        preparaPartida()
        document.getElementById("top_deck").addEventListener("click",pideCarta);
        document.getElementById("b_pasa").addEventListener("click",juegaCrupier);
        document.getElementById("gs_banner").style.display = "none";
    });
}
