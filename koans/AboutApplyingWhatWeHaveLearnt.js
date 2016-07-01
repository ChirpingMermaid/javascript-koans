var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(product){ 
        return !(product.containsNuts || _(product.ingredients).any(function(ingredient){ return ingredient === "mushrooms"; })); 
      });
      
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1,1000)).chain()
                                .reduce(function(sum, num){
                                  if (num % 3 === 0 || num % 5 === 0)
                                    sum += num;
                                  return sum;
                                },0)
                                .value();    

    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
               .map(function(product){ return product.ingredients; })
               .flatten()
               .reduce(function(ingredientCount, ingredient){
                  if (ingredient in ingredientCount){
                    ingredientCount[ingredient] += 1;
                  }else{
                    ingredientCount[ingredient] = 1;
                  }
                  return ingredientCount;
               },{})
               .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {
    function isPrime(num){
      var prime = true;
      for (var i=2; i<num; i++){
        if (num % i === 0)
          prime = false;
      }
      return prime;
    }
    function largestPrimeFactor(num){
      if (isPrime(num)) 
        return "please use a composite number"; 
      else{
        for (var i=num-1; i>1; i--){
          if (num % i === 0 && isPrime(i)){
            return i;
          }
        }
      }
      return "not found";
    }
    
    expect(largestPrimeFactor(77)).toBe(11);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(num){
      var numArray = String(num).split("");
      for(var i=0,j=numArray.length-1; i<numArray.length/2; i++, j--){
        if (numArray[i] !== numArray[j]) return false;
      }
      return true;
    }

    var pal = "no palindrome found";
    for(var i=999*999; i>100*100; i--){ //tests range from largest product of two 3 digit numbers to smallest
      if (isPalindrome(i)){
        pal = i;
        break;
      }
    }

    expect(pal).toBe(997799);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function divisibleByNumsThrough20(num){
      var divisible = true;
      for (var i=1; i<=20; i++){
        if (num % i !== 0){
          divisible = false;
        }
      }
      return divisible;
    }

    var smallestNum = 20;
    while (!divisibleByNumsThrough20(smallestNum)){
      smallestNum++;
    }

    expect(smallestNum).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function diffSumOfSqsAndSqOfSums(){ //can take any number of numbers to compute
      var sumOfSqs = 0, sum = 0;
      for (var i=0; i<arguments.length; i++){
        sumOfSqs += arguments[i] * arguments[i];
        sum += arguments[i];
      }
      return Math.max(sumOfSqs - sum * sum, sum * sum - sumOfSqs); //return positive difference
    }

    expect(diffSumOfSqsAndSqOfSums(1,2,3,4)).toBe(70);
  });

  it("should find the 10001st prime", function () {
    function isPrime(num){
      var prime = true;
      for (var i=2; i<num; i++){
        if (num % i === 0)
          prime = false;
      }
      return prime;
    }

    function findPrime(num){
      if (num < 1) 
        return "please enter a number greater than 0";
      
      var prime = 1, count = 0;
      while (count !== num){
        prime++;
        if (isPrime(prime)){
          count++;
        }
      }
      return prime;
    }

    expect(findPrime(10001)).toBe(104743);
  });
 
});
