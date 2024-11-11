const positives = (arr) => {
    if (!Array.isArray(arr)) {
      return "Pateiktas neteisingas duomenų tipas. Tai turi būti masyvas.";
    }
    return arr.filter(num => num > 0);
  };
  console.log(positives([1, -3, 5, -3, 0])); // 1, 5
  console.log(positives([1, 2, 3]));          // 1, 2, 3
  console.log(positives([-1, -2, -3]));       // []
  console.log(positives("ne masyvas"));       // neteisingas
  