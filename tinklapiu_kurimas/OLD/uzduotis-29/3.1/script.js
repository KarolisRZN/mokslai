const pirma = +prompt("Įveskite intervalo pradžią:");
console.log(pirma);
let antra = +prompt("Įveskite intervalo pabaigą:");
console.log(antra++);
let intervalas = [100];
let suma = [0];
for (let intervalas = pirma; intervalas < antra; intervalas++) {
    if (intervalas % 6 == 0) {
      suma++;
    }
  }
  console.log(suma);