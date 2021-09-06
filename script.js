// Todos
// let nomeDoPeso = ["TG", "TM", "TP", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "I"];
// let pesoDoPeso = [7905, 5134, 4318, 5074, 4462, 5640, 2352, 2273, 903, 875, 484, 462, 644];
// let pesoMaximo = 40000

// Só anilhas
let nomeDoPeso = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];
let pesoDoPeso = [5074, 4462, 5640, 2352, 2273, 903, 875, 484, 462];
let pesoMaximo = 22000

let quantidadeDePesos = nomeDoPeso.length;

// for (let i = 0; i < nomeDoPeso.length; i++) {
//     console.log(nomeDoPeso[i] + " = " + pesoDoPeso[i] + "g");
// }

let listaDePossibilidades = [];
let listaDePesoTotalDaPossibilidade = [];

for (let i = 0; i <= Math.pow(2, quantidadeDePesos); i++) {
    let binario = (i).toString(2);
    while (binario.length < quantidadeDePesos) {
        binario = "0" + binario;
    }

    let possibilidade = [];
    for (let j = 0; j < quantidadeDePesos; j++) {
        possibilidade[j] = binario.charAt(j);
    }

    listaDePossibilidades.push(possibilidade);

    let pesoTotalDaPossibilidade = 0;
    for (let j = 0; j < quantidadeDePesos; j++) {
        if (possibilidade[j] == 1) {
            pesoTotalDaPossibilidade += pesoDoPeso[j];
        }
    }

    listaDePesoTotalDaPossibilidade.push(pesoTotalDaPossibilidade);
}

for (let i = 1000; i <= pesoMaximo; i += 1000) {
    let menorDiferenca = Number.MAX_VALUE;
    let melhorPossibilidade = -1;
    for (let j = 0; j < listaDePesoTotalDaPossibilidade.length; j++) {
        let diferencaDaPossibilidade = i - listaDePesoTotalDaPossibilidade[j];
        if (diferencaDaPossibilidade < 0) {
            diferencaDaPossibilidade *= -1;
        }

        if (diferencaDaPossibilidade < menorDiferenca) {
            menorDiferenca = diferencaDaPossibilidade;
            melhorPossibilidade = j;
        }
    }

    let combinacaoDePesos = "";
    for (let j = 0; j < quantidadeDePesos; j++) {
        if (listaDePossibilidades[melhorPossibilidade][j] == 1) {
            combinacaoDePesos += nomeDoPeso[j] + " ";
        }
    }

    // Criação da tabela HTML
    let table = document.getElementById("table");
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    let d1 = document.createTextNode(i / 1000 + "kg");
    let d2 = document.createTextNode(combinacaoDePesos);
    let d3 = document.createTextNode(listaDePesoTotalDaPossibilidade[melhorPossibilidade] + "g");
    let d4 = document.createTextNode(listaDePesoTotalDaPossibilidade[melhorPossibilidade] - i + "g");

    td1.appendChild(d1);
    td2.appendChild(d2);
    td3.appendChild(d3);
    td4.appendChild(d4);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr);
}