(function (){
        //VARIABLES
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    const FPS = 50;
    //dimensiones reales de cada cuadro de ficha (40x40)
    const anchoFicha = 40;
    const altoFicha = 40;
    //dimensiones del canvas
    const anchoCanvas = 400;
    const altoCanvas = 640;
    // dimensiones JUGABLES DEL TABLERO 10x16
    const margenSuperior = 4;
    // variables de puntuacion
    let puntuacionJuego = 0;
    const Ubicacion_resultado = document.querySelector('#resultado');
    let Ubicacion_MaxResultados = document.querySelector('#puntuacionMax');

    let claves = cargarLocalStorage('claves');
    let valores = cargarLocalStorage('valores');


    //colores de las fichas
    const rojo = "#FF0000";
    const morado = "#800080";
    const naranja = "#FF8C00";
    const amarillo = "#FFD700";
    const verde = "#008000";
    const cyan = "#00CED1";
    const azul = "#0000CD";
    
    // dimensiones de 12x21, pero en pantalla solo veremos 10x16
    const tablero = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    const tableroCopia = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    // CLASES
    class Pieza {
        constructor () {
            //posicion inicial de la ficha
            this.y;
            this.x;
            //tipo de ficha del array fichas
            this.tipo; // (7 posibilidades, 0 a 6)
            this.angulo; // (4 posibilidades, 0 a 3)
            this.retraso = 50;
            this.fotograma = 0;
            this.puntuacionJuego = 0;
        }
        //nueva ficha aleatroria
        nuevaFicha() {
            this.x = 4;
            this.y = 0;
            this.tipo = Math.floor(Math.random() * 7);
            this.angulo = 0;
            this.fotograma = 0;
        }
        gameOver () {
            let perder = false;
            for(let i=1; i<tablero[0].length-1; i++){
                if(tablero[2][i] > 0){
                    perder = true;
                }
            }
            return perder;
        }
        limpiaFilas () {
            let filaCompleta = false;
            let numeroFilas = 0;
            let posicionFila = 0;
            for (let i=(tablero.length)-2; i>=margenSuperior; i--) {
                filaCompleta = tablero[i].every( casilla => casilla != 0 );
                if(filaCompleta){
                    numeroFilas++;
                    console.log(`la fila ${i} está completa`)
                    if(i > posicionFila){
                        posicionFila = i;
                    }
                }
            }
            if(numeroFilas > 0){
                for(let vueltas=0; vueltas<numeroFilas; vueltas++) {
                    for (let x=posicionFila; x>margenSuperior; x--) {
                        for (let y=1; y<tablero[0].length-1; y++) {
                            tablero[x][y] = tablero[x - 1][y];
                        }
                    }
                }
                switch (numeroFilas){
                    case 1:
                        console.log(`hay ${numeroFilas} filas para eliminar`)
                        break;
                    case 2:
                        console.log(`hay ${numeroFilas} filas para eliminar`)
                        break;
                    case 3:
                        console.log(`hay ${numeroFilas} filas para eliminar`)
                        break;
                    case 4:
                        console.log(`hay ${numeroFilas} filas para eliminar`)
                        break;
                }     
            }
            sumaPuntos(numeroFilas);
        }
        caer () {
            if(this.fotograma < this.retraso){
                this.fotograma++;
            } else {
                if(this.colision(this.angulo, this.y+1, this.x)==false){
                    this.y++;
                } else {
                    this.fijar();
                    this.limpiaFilas();
                    this.nuevaFicha();
                    mostrarPuntuacion();
                    if (this.gameOver() == true){
                        reseteaTablero();
                        guardarPuntuacion(puntuacionJuego);
                        mostrarPuntuacionMax();
                        puntuacionJuego = 0;
                        mostrarPuntuacion();
                    }
                }
                this.fotograma = 0;
            }
        }
        fijar () {
            for (let i=0;i<4;i++){
                for (let j=0;j<4;j++) {
                    if(fichas[this.tipo][this.angulo][i][j] > 0) {
                        tablero[this.y + i][this.x + j] = fichas[this.tipo][this.angulo][i][j];
                        //sobreescribo el trozo del tablero donde ha caido la ficha
                    }
                }
            }
        }
        colision (anguloNuevo, yNueva, xNueva) {
            let colision = false;
            for(let i=0;i<4;i++){
                for (let j=0;j<4;j++){
                    if(fichas[this.tipo][anguloNuevo][i][j] > 0){ //recorro la ficha
                        if(tablero[yNueva+i][xNueva+j] > 0){ //compruebo que no colisione con el trablero
                            colision = true;
                        }
                    }
                }
            }
            return colision;
        }
        rotar () {
            let anguloFicticio = this.angulo;
            if (anguloFicticio < 3) {
                anguloFicticio ++;
            } else {
                anguloFicticio = 0;
            }
            //gira la variable anguloNuevo que es "ficticia"
            if (this.colision(anguloFicticio, this.y, this.x)==false){
                this.angulo = anguloFicticio; //ojo con "y" y con "x" se cambian
            }
            /*si no hay colision permite el giro aplica el giro de la
            variable "ficticia" anguloNuevo a this.angulo que es la real
            del objeto.*/
        }
        mueveDerecha () {
            if (this.colision(this.angulo, this.y, this.x+1) == false) {
                this.x++;
            }
        }
        mueveIzquierda () {
            if (this.colision(this.angulo, this.y, this.x-1) == false) {
                this.x--;
            }
        }
        acelera () {
            if(this.colision(this.angulo, this.y+1, this.x)==false){
                this.y++;
            }
        }
        dibujaPieza () {
            for(let i=0; i<4; i++){
                for(let j=0; j<4 ; j++){
                    if(fichas[this.tipo][this.angulo][i][j] != 0){
                        switch (fichas[this.tipo][this.angulo][i][j]) {
                            case 1:
                                ctx.fillStyle = rojo;
                                break;
                            case 2:
                                ctx.fillStyle = morado;
                                break;
                            case 3:
                                ctx.fillStyle = naranja;
                                break;
                            case 4:
                                ctx.fillStyle = amarillo;
                                break;
                            case 5:
                                ctx.fillStyle = verde;
                                break;
                            case 6:
                                ctx.fillStyle = cyan;
                                break;
                            case 7:
                                ctx.fillStyle = azul;
                                break;
                            default:
                                break;
                        }
                        ctx.fillRect((this.x+j-1)*anchoFicha, (this.y+i-margenSuperior)*altoFicha, anchoFicha, altoFicha);
                        /*mucho ojo, cambiamos i por j a la hora de
                        imprimir porque si no las pinta simétricas
                        a como nosotros queremos */
                    }
                }
            }
        }
    }
    class MapOrdenado extends Map {
        [Symbol.iterator](){
            const fn = (x, y) => x[1] > y[1] ? -1 : x[1] < y[1] ? 1 : 0;
            return [...super.entries()].sort(fn)[Symbol.iterator]();
        }
        entries(){
            return [...this];
        }
        keys() {
            return [...this].map(x => x[0]);
        }
        values() {
            return [...this].map(x => x[1]);
        }
        actualizaMap () {
            for (let i = 0; i < claves.length; i++) {
                this.set(claves[i], valores[i]);
            }
        }
    }


    // INSTANCIAS DE CLASE
    let pieza = new Pieza();
    const maximasPuntuaciones = new MapOrdenado( [] );
    maximasPuntuaciones.actualizaMap();


    // EVENTOS
    document.addEventListener('DOMContentLoaded', () => {
        inicializaJuego();
    })


    // FUNCIONES
    function inicializaJuego() {
        canvas.style.width = anchoCanvas + "px";
        canvas.style.height = altoCanvas + "px";
        mostrarPuntuacion();
        mostrarPuntuacionMax();
        pieza.nuevaFicha();
        setInterval( () => {
            principal();
        }, 1000/FPS);
        inicializaTeclado(pieza);
    }
    function principal () {
        borraCanvas(); //siempre borrar antes para refrescar pantalla
        dibujaTablero();
        pieza.caer();
        pieza.dibujaPieza();
    }
    function dibujaTablero (){
        for(let i = margenSuperior; i < tablero.length; i++){
            for(let j=1; j < tablero[0].length-1; j++){
                if (tablero[i][j] !=0 ){
                    switch (tablero[i][j]) {
                        case 1:
                            ctx.fillStyle = rojo;
                            break;
                        case 2:
                            ctx.fillStyle = morado;
                            break;
                        case 3:
                            ctx.fillStyle = naranja;
                            break;
                        case 4:
                            ctx.fillStyle = amarillo;
                            break;
                        case 5:
                            ctx.fillStyle = verde;
                            break;
                        case 6:
                            ctx.fillStyle = cyan;
                            break;
                        case 7:
                            ctx.fillStyle = azul;
                            break;
                        default:
                            break;
                    }
                    ctx.fillRect((j-1)*anchoFicha, (i-margenSuperior)*altoFicha, anchoFicha, altoFicha);
                }
            }
        }
    }
    function inicializaTeclado (pieza) {
        document.addEventListener('keydown', (tecla) =>{
            switch (tecla.key){
                case 'ArrowLeft':      // izq
                    pieza.mueveIzquierda();
                    break;
                case 'ArrowUp':        // arriba
                    pieza.rotar();
                    break;
                case 'ArrowRight':    // derecha
                    pieza.mueveDerecha();
                    break;
                case 'ArrowDown':     // abajo
                    pieza.acelera();
                    break;
                case 'Enter':         //intro
                    // musicaJuego.stop();
                    break;
                case 'Backspace':     // letra borrar
                    borrarStorage();
                    break;
                default:
                    break;
            }
        })
    }
    function borraCanvas () {
        canvas.width = anchoCanvas;
        canvas.height = altoCanvas;
    }
    //para resetear tablero
    function reseteaTablero () {
        for (let i=0;i<21;i++) {
            for (let j=0;j<12;j++) {
                tablero [i][j] = tableroCopia[i][j]
            }
        }
    }
    // mostrar y guardar puntos
    function sumaPuntos(multipicador) {
        switch (multipicador) {
            case 1:
                puntuacionJuego = puntuacionJuego + (10 * multipicador);
                break;
            case 2:
                puntuacionJuego = puntuacionJuego + (10 * multipicador * 2);
                break;
            case 3:
                puntuacionJuego = puntuacionJuego + (10 * multipicador * 3);
                break;
            case 4:
                puntuacionJuego = puntuacionJuego + (10 * multipicador * 4);
                break;
            default:
                break;
        }
    }
    function limpiarHTML(lista) {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }
    function mostrarPuntuacion () {
        limpiarHTML(Ubicacion_resultado);
        const resultado = document.createElement('p');
        resultado.textContent = puntuacionJuego;
        Ubicacion_resultado.appendChild(resultado);
    }
    function guardarPuntuacion (valor) {
        let nombre_jugador;
        let condicional = true;
        do {
            nombre_jugador = prompt('¿cuál es tu nombre?');
            if(nombre_jugador != null){
                if (nombre_jugador.length != 0){
                    condicional = false;
                }
            }
        } while (condicional);
        // actualizo claves y valores (es lo que guardo en storage)
        if(claves.length == 0){
            claves.push(nombre_jugador);
            valores.push(valor);
            guardarStorage('claves', claves);
            guardarStorage('valores', valores);
        } else {
            const existe = claves.some( nombre => nombre == nombre_jugador);
            if(existe){
                const indice = claves.findIndex(nombre => nombre == nombre_jugador );
                if(valor > valores[indice]){
                    valores[indice] = valor;
                    guardarStorage('valores', valores);
                }
            } else {
                claves.push(nombre_jugador);
                valores.push(valor);
                guardarStorage('claves', claves);
                guardarStorage('valores', valores);
            }
        }
        maximasPuntuaciones.actualizaMap();
    }
    function mostrarPuntuacionMax () {
        limpiarHTML(Ubicacion_MaxResultados);
        let contador = 1;
        for(let dato of maximasPuntuaciones) {
            const resultado = document.createElement('p');
            resultado.textContent = `${contador}.- ${dato[0]}............${dato[1]}`;
            Ubicacion_MaxResultados.appendChild(resultado);
            contador++;
        }
    }
    function guardarStorage (referenciaLista, item) {
        localStorage.setItem(referenciaLista, JSON.stringify(item));
    }
    function cargarLocalStorage (item) {
        let lista = JSON.parse(localStorage.getItem(item));
        if(lista == null){
            return [];
        } else {
            return lista;
        }
    }
    function borrarStorage () {
        let confirmacion = prompt('¿quieres borrar las puntuaciones? SI o NO');
        if(confirmacion == 'si' || confirmacion == 'SI'){
            localStorage.clear();
        }
    }
}())