export const getDivisorOutputs = (lowerRange, upperRange, divisors) => {
  //Note that if upperRange - lowerRange, and/or divisors are likely to be ginormous, then we will want to look for a way of doing 
  //this with better than O(n x m) algorithmic complexity. But just keeping things simple (and easily unit-testable) for now.

  let results = new Object(); 

  for (let i = lowerRange; i <= upperRange; i++) {
    const outputs = [];
    divisors.forEach(d => {
      if (i % d.divisor === 0)
        outputs.push(d.output);
    });
    if (outputs.length > 0)
      results[i] = outputs;
  }  

  return results;
}