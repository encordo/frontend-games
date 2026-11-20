//Cartas a sacar
const cartas = 3; // o 5 o 9 -> Ver al final
//Parámetros de las cartas
let config = [{nombre:"El Loco",imagen:"🃏",numero:"",sig_normal:"Carencia de sentido común. Potencial fuerza de voluntad y destreza. El espíritu en busca de experiencia. Audacia, extravagancia. Negligencia, poca reflexión. Desorientación, inmadurez, desequilibrio. Ligereza. Indiscreción y superficialidad.",sig_invertido:"Pasiones y obsesiones, indecisión, irracionalidad, apatía, complicaciones. Decisiones equivocadas, caída, abandono, inmovilización. Locura. Desborde psíquico y/o emocional. Viaje obstaculizado"},
    {nombre:"El Mago",imagen:"🧙‍♂️",numero:"I",sig_normal:"Originalidad. Iniciativa, centro de acción, inteligencia espontánea. Posesión de sí mismo, autonomía, emancipación de todo prejuicio. Elocuencia, destreza, habilidad, finura, diplomacia. Abogado, orador, diplomático o político.",sig_invertido:"Carente de escrúpulos, arribista, intrigrante, embustero, pillo, estafador, charlatán. Indecisión, ineptitud, voluntad débil, retraso, inseguridad. Voluntad aplicada a malos fines."},
    {nombre:"La Suma Sacerdotisa",imagen:"🧕",numero:"II",sig_normal:"Paciencia, silencio, discreción, reserva, meditación, modestia, resignación y piedad. Decisión meditada.",sig_invertido:"Disimulo, intenciones ocultas, rencor, pereza, intolerancia, fanatismo. Se vuelve pesada y pasiva, es como una carga. Retraso, tensión y torpeza en las relaciones. Decisión inmeditada."},
    {nombre:"La Emperatriz",imagen:"👸",numero:"III",sig_normal:"Comprensión, inteligencia, instrucción. Encanto, afabilidad, elegancia, distinción. Cortesía, abundancia, riqueza. Matrimonio, fecundidad, dulzura.",sig_invertido:"Afectación, pose, frivolidad, coquetería, vanidad. Desdén, presunción. Lujo innecesario. Sensible a los halagos. Falta de refinamiento. Discusiones en todos los planos. Esterilidad."},
    {nombre:"El Emperador",imagen:"🤴",numero:"IV",sig_normal:"Poder, voluntad, energía, certeza, constancia, firmeza, rigor, exactitud, equidad y positivismo. Realización. Protector poderoso.",sig_invertido:"Testarudez, falta de idealismo. Adversario obstinado. Caída, pérdida de los bienes."},
    {nombre:"El Hierofante",imagen:"👳‍♂️",numero:"V",sig_normal:"Sabiduría, perseverancia, enseñanzas, consejos equitativos, generosidad e indulgencia, mansedumbre. Ayuda de los superiores, organización. La carga que representa al consultante (usted), en la forma de la voz interior. Dogma.",sig_invertido:"Jefe sentencioso, excesivamente crítico, moralista estrecho de miras, profesor autoritario, teórico limitado, consejero desprovisto de sentido práctico, carencia de apoyo espiritual. Inconvencional, ilógico, supersticioso, incapaz de actuar coherente y racionalmente."},
    {nombre:"Los Enamorados",imagen:"💏",numero:"VI",sig_normal:"Elección o decisión. Unión, matrimonio, amor, la unión de los opuestos, atracción, balance, apertura a la inspiración. Pruebas superadas. Armonía de la vida interior y el mundo exterior.",sig_invertido:"Desorden, fracaso, divorcio, amor desgraciado y contrariedades de todo tipo. Matrimonio frustrado, tentación peligrosa. Peligro de ser seducido. Inconducta, libertinaje y debilidad. Peleas, infidelidad. Inestabilidad emocional."},
    {nombre:"El Carro",imagen:"🛷",numero:"VII",sig_normal:"Triunfo, victoria, superación de obstáculos, esperanza, conquista. Buena noticia inesperada. Gran autocontrol, habilidad para determinar el propio destino. Gran fuerza física y mental. Velocidad. Viaje.",sig_invertido:"Desorden generalizado. Enfermedad. Peligroso descontrol. Peligro de un accidente violento. Malas noticias. Fatiga. Falta de tacto. Mala conducta. Actividad afiebrada y sin reposo."},
    {nombre:"La Justicia",imagen:"⚖",numero:"VIII",sig_normal:"Justicia, armonía, equidad, integridad, regla de conducta, firme propósito, acción de juzgar, moderación en todas las cosas. Independencia de espíritu. Para mantener el balance ciertas cosas deben ser sacrificadas. Puede estar relacionada con asuntos legales, juicios, matrimonios, divorcios, etc.",sig_invertido:"Fanatismo, injusticia, severidad en el juicio, abuso, acusaciones falsas. Inseguridad. Marañas legales. Inseguridad. Falta de un apropiado balance."},
    {nombre:"El Ermitaño",imagen:"👴",numero:"IX",sig_normal:"Prudencia, sabiduría, paciencia, silencio, avance espiritual, inspiración divina, circunspección. Retiro del mundo, soledad. Peregrinaje. Puede ser un maestro. La realización de un balance y progresar.",sig_invertido:"Inmadurez, vicios, oscuridad, testarudez, traición, engaño. Misantropía, misoginia, celibato. Persona excesivamente tímida e insociable. Enemigos ocultos. Prudencia que sobra o que falta."},
    {nombre:"La Ruleta de la Fortuna",imagen:"🎡",numero:"X",sig_normal:"Cambio, evolución, éxito, buena fortuna, destino. Felicidad, abundancia. Nuevas condiciones. Abundancia, crecimiento.",sig_invertido:"La transformación se efectuará dificultosamente pero se hará de todos modos. Progreso retardado, Retroceso."},
    {nombre:"La Fuerza",imagen:"🏋️‍♂️",numero:"XI",sig_normal:"Sublimación o regulación de las pasiones y bajos instintos. Poder, energía, gran amor. El espíritu que domina la materia. Acción, coraje, éxito. Poderosa voluntad y gran fuerza física. La fuerza interior que domestica la bestia. Poder sobre los animales.",sig_invertido:"Discordia, ruina. Debilidad, testarudez, abuso de poder. Impaciencia, temeridad, grosería, insensibilidad. dureza, crueldad, furor."},
    {nombre:"El Colgado",imagen:"😵",numero:"XII",sig_normal:"Fortaleza, sabiduría. Limitaciones auto impuestas. Iniciación, prueba. Redención a través del sacrificio, pérdida. Poder profético. Decisiones suspendidas. Elección que requiere contemplación.",sig_invertido:"Arrogancia, egotismo, resistencia a las influencias espirituales. Materialismo. Esfuerzo desperdiciado. Falsa profecía. Fracaso. Falta de límites, falta de franqueza, carencia de sacrificio."},
    {nombre:"",imagen:"💀",numero:"XIII",sig_normal:"Transformación completa. Muerta y renacimiento. El fin de algo. Evolución desde un estado a otro superior. Cambio provechoso.",sig_invertido:"Estancamiento, muerte, petrificación. Enfermedad incurable. Matrimonio roto. Falta de oportunidades, esperanza deshecha."},
    {nombre:"La Templanza",imagen:"🌊",numero:"XIV",sig_normal:"Consideración cuidadosa, paciencia, moderación, adaptación, compostura, reflexión. Paciencia uniendo dos opuestos, combinándolos cuidadosamente. Buen matrimonio. Trabajando en armonía con otros, habilidad directiva. Algo se está preparando. Gran talento y creatividad. Luchando por trascendencia a través del trabajo. Alquimia. La unión de los opuestos refinada por el fuego de la voluntad.",sig_invertido:"Desorden, conflicto, mala combinación, peleas. Posibilidad de naufragio. Desarreglos."},
    {nombre:"El Diablo",imagen:"😈",numero:"XV",sig_normal:"Destino (bueno o malo). Poder de seducción, impulso ciego, tentación, obsesión. Desviación sexual. Un estado mental confuso. Las pasiones carnales descontroladas.",sig_invertido:"Carta dañina, fatalidad, mal uso de la fuerza. Debilidad, ceguera, desorden. Efectos maléficos. La patética condición humana que prefiere la ilusión a la verdad."},
    {nombre:"La Torre",imagen:"🗼",numero:"XVI",sig_normal:"Cambios repentinos sin otra alternativa. Colapso, escape de la prisión o liberación de ataduras, accidente. Los planes fracasarán, las intenciones no se realizarán. El \"dedo de Dios\". Bancarrota. Muerte súbita.",sig_invertido:"Confusión completa. Ganar la libertad a un gran costo. Falsas acusaciones, opresión. Castigo que resulta de los excesos cometidos, enfermedad. Error presuntuoso que no sabe rectificarse a tiempo."},
    {nombre:"La Estrella",imagen:"⭐",numero:"XVII",sig_normal:"Esperanza, ayuda inesperada, perspicacia y claridad de visión, inspiración, flexibilidad. Un gran amor será dado y recibido. Buena salud. Carta totalmente espiritual.",sig_invertido:"Arrogancia, pesimismo, testarudez. enfermedad, error de juicio. Impotencia psíquica, reestructuración, privación y abandono."},
    {nombre:"La Luna",imagen:"🌙",numero:"XVIII",sig_normal:"Intuición, umbral de un importante cambio, camino difícil y oscuro, desarrollo de poderes psíquicos. Navegación, experimentación, trabajo penoso.",sig_invertido:"Peligros no vistos, enemigos ocultos, alucinación, autoengaño, histeria, desorientación. Inestabilidad, embustes, trampas, falso saber, carácter neurótico. Escándalo, secreto que se hace público, chantajista."},
    {nombre:"El Sol",imagen:"🌞",numero:"XIX",sig_normal:"Gloria. Felicidad material. Matrimonio o relación feliz, colaboración. Exito. Placer, energía, motivación, inspiración.",sig_invertido:"Molestias, disimulos, arrogancia, vanidad. Compromiso o trabajo perdido. Tanteo en la oscuridad, desorientación. Deseo de figurar."},
    {nombre:"El Juicio",imagen:"👩‍⚖️",numero:"XX",sig_normal:"Cambio radical, resurrección a una vida nueva. Trabajo (o vida) bien hecha. Voluntad para iniciar algo nuevo. Buen juicio y discernimiento. Poder creativo e influencia sobre la familia y la carrera laboral. Capacidad de perdonar. Despertar. Dictámenes judiciales favorable.",sig_invertido:"Vacilación espiritual, debilidad, juicio o decisión equivocada. Enfermedad, separación. Dictamen judicial adverso. Error sobre sí mismo y sobre los otros. Decisión postergada."},
    {nombre:"El Mundo",imagen:"🌍",numero:"XXI",sig_normal:"Suceso garantizado. Recompensas recibidas. Viaje, emigración (dentro del mismo continente), cambio de lugar de residencia. Compra o venta de tierras.",sig_invertido:"Obstáculos, estancamiento, estorbos. Necesidad de trabajar muy duro para alcanzar el éxito."}]
function escogeNumero(total){
    return Math.floor(Math.random()*total);
}
function generaMazo(){
    let deck_o = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    let deck_u = new Array();
    while(deck_o.length > 0){
        var posicion = escogeNumero(deck_o.length-1);
        var carta = deck_o[posicion];
        deck_o.splice(posicion,1);
        deck_u.push(carta);
    }
    return deck_u;
}

function despliega(mazo){
    let mano = [];
    for(let i = 0; i<cartas;i++){
        mano.push(mazo[i]);
    }
    return mano;
}

function muestraMano(mano){
    let slot_m = document.getElementById("slot_cartas");
    for(let i = 0; i<mano.length; i++){
        //Crea la carta
        let c = document.createElement("div")
        c.classList.add("naipe");
        c.classList.add("tapado");
        //Inserta número
        let elem = document.createElement("div");
        elem.classList.add("numero");
        elem.innerText = config[mano[i]].numero;
        c.appendChild(elem);
        //Inserta imagen
        elem = document.createElement("div");
        elem.classList.add("icono");
        elem.innerText = config[mano[i]].imagen;
        c.appendChild(elem);
        //Inserta nombre
        elem = document.createElement("div");
        elem.classList.add("nombre");
        elem.innerText = config[mano[i]].nombre;
        c.appendChild(elem);
        //Gira si procede
        let inv = (escogeNumero(2)==0);
        if(inv){
            c.style.transform = "rotate(180deg)";
        }
        //Inserta evento
        c.addEventListener("click", function(){
            this.classList.remove("tapado");
            this.classList.add("destapado");
            //Meter info contextual de la carta en su atributo title
            if(inv){
                this.title = config[mano[i]].sig_invertido;
            } else{
                this.title = config[mano[i]].sig_normal;
            }
            
        })
        //Inserta cada carta en el tapete
        slot_m.appendChild(c);
    }
}
function inicializaMesa(){
    let mazo = generaMazo();
    let mano = despliega(mazo);
    muestraMano(mano);
}

window.onload = function(){
    //Despliega las cartas.
    inicializaMesa();
    document.getElementById("b_reiniciar").addEventListener("click",function(){
        //Limpia el tapete
        document.getElementById("slot_cartas").replaceChildren();
        //Despliega las cartas.
        inicializaMesa();
    });
}