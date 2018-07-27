function showIntegerConverter() {
    document.getElementById('i-to-rn-input').style.display = "block";
    document.getElementById('rn-to-i-input').style.display = "none"; 
    
}

function showRNConverter() {
    document.getElementById('rn-to-i-input').style.display = "block";
    document.getElementById('i-to-rn-input').style.display = "none";
}

function romanNumeralConverter() {
    if (document.getElementById('i-to-rn-radio').checked) {
        let userInput = document.getElementById('i-to-rn-input').value;
        if (userInput == "") {
            document.getElementById('rn-convert-result').innerHTML = "Please enter a number!";
        } else if (userInput > 10000) {
            document.getElementById('rn-convert-result').innerHTML = "Please enter a number below 10000!";
        } else {
            let rn = "";
            let x = userInput;
            function whileNum(dec, roman) {
                while (x >= dec) {
                    x -= dec;
                    rn += roman;
                }
            }

            function ifNum(dec, roman) {
                if (x >= dec) {
                    x -= dec;
                    rn += roman;
                }
            }

            whileNum(1000, "M");
            ifNum(900, "CM");
            ifNum(500, "D");
            ifNum(400, "CD");
            whileNum(100, "C");
            ifNum(90, "XC");
            ifNum(50, "L");
            ifNum(40, "XL");
            whileNum(10, "X");
            ifNum(9, "IX");
            ifNum(5, "V");
            ifNum(4, "IV");
            whileNum(1, "I");    

            document.getElementById('rn-convert-result').innerHTML = userInput + " converted to Roman Numerals is " + rn + ".";

        }
    } else if (document.getElementById('rn-to-i-radio').checked) {
        let userInput = document.getElementById('rn-to-i-input').value;
        let validRNRegex = /^M{0,9}(CM|CD|D?C{0,4})(XC|XL|L?X{0,4})(IX|IV|V?I{0,4})$/i;
        if (validRNRegex.test(userInput)) {
            if (userInput == "") {
                document.getElementById('rn-convert-result').innerHTML = "Please enter a Roman Numeral!"
            } else {
                let x = 0; 
                
                x -= /CM|CD/i.test(userInput) ? 200 : 0;
                x -= /XC|XL/i.test(userInput) ? 20 : 0;
                x -= /IX|IV/i.test(userInput) ? 2 : 0;
                
                x += (userInput.match(/M/gi) || []).length * 1000;
                x += (userInput.match(/D/gi) || []).length * 500;
                x += (userInput.match(/C/gi) || []).length * 100;
                x += (userInput.match(/L/gi) || []).length * 50;
                x += (userInput.match(/X/gi) || []).length * 10;
                x += (userInput.match(/V/gi) || []).length * 5;
                x += (userInput.match(/I/gi) || []).length * 1;
                
                document.getElementById('rn-convert-result').innerHTML = userInput.toUpperCase() + " converted to Integers is " + x + ".";
            }
        } else {
            document.getElementById('rn-convert-result').innerHTML = userInput + " is not a valid Roman Numeral!";
        }
    }
}

function baseNumberConverter() {
    
    //get data
    let firstBase = document.getElementById('input-base').value;
    let secondBase = document.getElementById('output-base').value;
    let inputNumber = document.getElementById('base-converter-num-input').value;
    
    if (firstBase < 2 || firstBase > 36 || isNaN(firstBase) || !firstBase) {
        document.getElementById('base-num-convert-result').innerHTML = `${firstBase} is not a number between 2 and 36.`;
    } else if (secondBase < 2 || secondBase > 36 || isNaN(secondBase) || !firstBase) {
        document.getElementById('base-num-convert-result').innerHTML = `${secondBase} is not a number between 2 and 36.`;
    } else if (!inputNumber) {
        document.getElementById('base-num-convert-result').innerHTML = "Please enter a number to convert!";
    } else {
        
        let inputNumberArr = String(inputNumber).split("");
        let calcValue = (x) => {
            const validNum = /\d/;
            const validAlpha = /[A-Z]/i;
            if (validNum.test(x)) {
                return Number(x);
            } else if (validAlpha.test(x)) {
                return x.toUpperCase().charCodeAt(0) - 55;
            } else {
                return -1;
            }
        }
        if (inputNumberArr.some(x => x === -1)) {
            document.getElementById('base-num-convert-result').innerHTML = `${inputNumber} is not a valid number.`;
        } else if (inputNumberArr.some(x => calcValue(x) >= firstBase)) {
            document.getElementById('base-num-convert-result').innerHTML = `${inputNumber} is not a valid number in base ${firstBase}.`;
        } else {
            let resultBaseTen = 0;
            let result = "";            
            let digits = 1;
            let convert = (x) => x < 10 ? String(x) : String.fromCharCode(x+55);
                
            for (let i = 0; i < inputNumberArr.length; i++) {
                resultBaseTen += Math.pow(firstBase, inputNumberArr.length - (i + 1)) * calcValue(inputNumberArr[i]);
            }
            while (Math.pow(secondBase, digits) <= resultBaseTen) {
                digits++;
            }
            for (let i = 0; i < digits; i++) {
                result += convert(Math.floor(resultBaseTen / Math.pow(secondBase, digits - (i + 1))));
                resultBaseTen %= Math.pow(secondBase, digits - (i + 1));
            }
            document.getElementById('base-num-convert-result').innerHTML = `${inputNumber} in base ${firstBase} is equal to ${result} in base ${secondBase}.`
        }
        
    }
    
    
}
        