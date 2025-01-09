const pirma = +prompt("Iš kokio akščio šoka parašiutininkas?");
console.log(pirma);
const antra = +prompt("Pier kiek sekundžių išsikleidžia jo parašiutas?");
console.log(antra);

const suma = Math.sqrt((2 * pirma) / 9.8);
console.log(suma);

if (antra < suma) {
  console.log("Parašiutas išsiskleis");
} else {
  console.log("Parašiutas neišsiskleis");
}