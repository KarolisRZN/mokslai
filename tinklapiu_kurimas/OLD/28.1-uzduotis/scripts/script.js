const pirmadienis = +prompt("Kiek pamoku yra pirmadieni?");
console.log(pirmadienis);
const antradienis = +prompt("Kiek pamoku yra antradieni?");
console.log(antradienis);
const treciadienis = +prompt("Kiek pamoku yra treciadieni?");
console.log(treciadienis);
const ketvirtadienis = +prompt("Kiek pamoku yra kietvirtadieni?");
console.log(ketvirtadienis);
const penktadienis = +prompt("Kiek pamoku yra pienktadieni?");
console.log(penktadienis);

const pamokuSuma = pirmadienis+antradienis+treciadienis+ketvirtadienis+penktadienis;
console.log("Pamoku skaicius : "+pamokuSuma)
const pamokuValandos = pamokuSuma * 45; 
console.log("Tai sudaro minuciu : "+pamokuValandos)