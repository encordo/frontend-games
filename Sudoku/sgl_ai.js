// === HECHO CON GEMINI AI ===
class SudokuGenerator {
    constructor() {
        this.size = 9;
        this.boxSize = 3;
    }

    // Genera un objeto con el puzzle (vacíos como 0) y su solución completa
    generate(difficulty = 40) { // difficulty = número de celdas visibles
        const solution = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.fillBoard(solution);

        // Copia profunda para crear el puzzle vaciando celdas
        const puzzle = solution.map(row => [...row]);
        this.removeNumbers(puzzle, 81 - difficulty);

        return { puzzle, solution };
    }

    // Llena el tablero usando backtracking recursivo
    fillBoard(board) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (board[row][col] === 0) {
                    const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    for (let num of numbers) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.fillBoard(board)) return true;
                            board[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // Desencadena el backtrack si ningún número encaja
                }
            }
        }
        return true;
    }

    // Valida si un número se puede colocar en una posición específica
    isValid(board, row, col, num) {
        for (let i = 0; i < this.size; i++) {
            // Validar fila y columna
            if (board[row][i] === num || board[i][col] === num) return false;
            
            // Validar cuadrante interno 3x3
            const boxRow = this.boxSize * Math.floor(row / this.boxSize) + Math.floor(i / this.boxSize);
            const boxCol = this.boxSize * Math.floor(col / this.boxSize) + (i % this.boxSize);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    // Remueve celdas de forma aleatoria para crear el juego
    removeNumbers(board, count) {
        let removed = 0;
        while (removed < count) {
            const cell = Math.floor(Math.random() * 81);
            const row = Math.floor(cell / this.size);
            const col = cell % this.size;

            if (board[row][col] !== 0) {
                board[row][col] = 0;
                removed++;
            }
        }
    }

    // Mezcla un array de manera aleatoria (Algoritmo Fisher-Yates)
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Utilidad gráfica para imprimir las matrices de forma legible
    printBoard(board) {
        console.log(board.map(row => row.map(n => n === 0 ? "." : n).join(" ")).join("\n"));
    }
}
// === EXPORTA EL SUDOKUGENERATOR ===
export{SudokuGenerator}
// === EJEMPLO DE USO ===
/* const generator = new SudokuGenerator();
const game = generator.generate(35); // Generar con 35 números visibles

console.log("--- ROMPECABEZAS (SUDOKU) ---");
generator.printBoard(game.puzzle);

console.log("\n--- SOLUCIÓN COINCIDENTE ---");
generator.printBoard(game.solution); */
