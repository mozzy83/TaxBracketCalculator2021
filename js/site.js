//Get values
function getValues() {
    let payRate = document.getElementById("hourlyRate").value;
    if(payRate > 6.04){
    if(parseFloat(payRate) && parseFloat(payRate) > 0){
        payRate = parseFloat(payRate);
        let grossPay = payRate * 2080;
        let taxable = grossPay - 12550;
        let taxBracket = calculateTaxBracket(taxable);
        let taxLiability = taxable * taxBracket;
        let netPay = grossPay - taxLiability;
        let netWeekly = netPay/52;
        let next = calculateNext(taxBracket);
        formatResults(grossPay, taxBracket, taxLiability, netPay, netWeekly, next);
    }
    else{alert("Enter a valid amount");}
    }
    else if (payRate > 0 && payRate < 6.04){alert("You won't have any taxes");}
    else{alert("Enter a valid amount");}
}
//calculation functions
function calculateTaxBracket(taxable){
    let taxBracket = 0;
    if(taxable > 0 && taxable <= 9950){
        taxBracket = .1;
    }
    else if(taxable > 9950 && taxable <= 40525){
        taxBracket = .12;
    }
    else if(taxable > 40525 && taxable <= 86375){
        taxBracket = .22;
    }
    else if(taxable > 86375 && taxable <= 164925){
        taxBracket = .24;
    }
    else if(taxable > 164925 && taxable <= 209425){
        taxBracket = .32;
    }
    else if(taxable > 209425 && taxable <= 523600){
        taxBracket = .35;
    }
    else{taxBracket = .37}
    return taxBracket;
}
function calculateNext(taxBracket){
    let next = {};
    if(taxBracket == .1){
        next.Income = 22501;
        next.Rate = 10.82;
        next.Bracket = .12;
    }
    else if(taxBracket == .12){
        next.Income = 53076;
        next.Rate = 25.52;
        next.Bracket = .22;
    }
    else if(taxBracket == .22){
        next.Income = 98926;
        next.Rate = 47.56;
        next.Bracket = .24;
    }
    else if(taxBracket == .24){
        next.Income = 177476;
        next.Rate = 85.33;
        next.Bracket = .32;
    }
    else if(taxBracket == .32){
        next.Income = 221976;
        next.Rate = 106.72;
        next.Bracket = .35;
    }
    else if(taxBracket == .35){
        next.Income = 536151;
        next.Rate = 257.76;
        next.Bracket = .37;
    }
    else if(taxBracket == .37) {
        next.Income = 0;
        next.Rate = 0;
        next.Bracket = 0;
    }
    return next;
}
//format into float with two decimals
function formatResults(grossPay, taxBracket, taxLiability, netPay, netWeekly, next) {
    grossPay = grossPay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    taxBracket = taxBracket * 100;
    taxLiability = taxLiability.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    netPay = netPay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    netWeekly = netWeekly.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    next.Bracket = next.Bracket * 100;
    next.Income = next.Income.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    next.Rate = next.Rate.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    displayResults(grossPay, taxBracket, taxLiability, netPay, netWeekly, next);
}
//display results to user
function displayResults(grossPay, taxBracket, taxLiability, netPay, netWeekly, next) {
    document.getElementById("nextRich").innerHTML = "";
    document.getElementById("grossPay").innerHTML = grossPay;
    document.getElementById("taxBracket").innerHTML = taxBracket;
    document.getElementById("taxLiability").innerHTML = taxLiability;
    document.getElementById("netPay").innerHTML = netPay;
    document.getElementById("netWeekly").innerHTML = netWeekly;
    if(next.Bracket > 0){
    document.getElementById("nextBracket").innerHTML = next.Bracket;
    document.getElementById("nextIncome").innerHTML = next.Income;
    document.getElementById("nextRate").innerHTML = next.Rate;
    document.getElementById("nextRich").classList.add("invisible");
    document.getElementById("nextDiv").classList.remove("invisible");
    //grossPay, taxBracket, taxLiability, net.Pay, net.Weekly, next.Bracket, next.Income, next.Rate
    //insivible classes removed
    }
    else{
        document.getElementById('nextDiv').classList.add('invisible');
        document.getElementById("nextRich").innerHTML = "You are in the highest tax bracket. Congratulations.";
        document.getElementById("nextRich").classList.remove("invisible");
    }
    document.getElementById("tableDiv").classList.remove("invisible");
}
