/* 
    Sorry for not commenting everything.
*/
class Calculator {
    constructor(prevTextViewer, currTextViewer) {
        this.prevTextViewer = prevTextViewer;
        this.currTextViewer = currTextViewer;
        // were setting the readytoreset to false so that the condition from numbers event listener willnot fire
        this.readyToReset = false;
        this.clear();
    }

    // append method for concatinating the values
    append(number) {
        // checking if 'dot' is already present
        if (number === '.' && this.currentOperand.includes('.')) return;
        // setting the variable current Operand value, from its default undefined value;
        if(number === 'π') number = Math.PI;
        this.currentOperand = `${this.currentOperand}${number}`;
        this.curr = this.currentOperand;
        // find the length of the characters inside the current Viewer
        let currentLength = (this.currTextViewer.innerHTML).length;
        // check if the length is above 32 then apply some css properties
        if (currentLength < 32){
            this.currTextViewer.style.fontSize = '2rem';
            this.currTextViewer.style.transition = 'all 0.3s ease';
        }else if (currentLength >= 32 && currentLength <= 48) {
            this.currTextViewer.style.fontSize = '1.5rem';
            this.currTextViewer.style.transition = 'all 0.3s ease';
        }else {
            this.currTextViewer.style.fontSize = '1.3rem';
            this.currTextViewer.style.transition = 'all 0.3s ease';
        }
    }

    // method for operators
    operator(operation, symbol) {
        // checking if the current viewer is empty, then do nothing
        if (this.currentOperand  === '') return;
        // if not empty proceed to computation
        if (this.previousOperand  !== '' && this.currentOperand !== '') {
          this.BasicCompute();
        }
        this.symbol = symbol;
        this.operation = operation;
        this.previousOperand  = this.currentOperand;
        this.currentOperand = '';
        this.prev = this.previousOperand;
      }


    BasicCompute() {

        // create a variable for result
        let result;
        // parse the texts displayed to float
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        // checking if prev or curr is not a number, then do nothing
        if(isNaN(prev) || isNaN(curr)) return;
        // switch statement for the computation
        switch(this.operation) {
            case '+': 
                result = prev + curr;
                break;
            case '-': 
                result = prev - curr;
                break;
            case '÷': 
                result = prev / curr;
                break;
            case 'x':
                result = prev * curr;
                break;
            case 'mod':
                if(prev < curr){
                    this.modError = true;
                    return;
                }
                result = prev % curr;
                break;
            case 'x^y':
                result = Math.pow(prev,curr);
                break;
            default: 
                return;
        }
        // setting to true so that if the user click another number after pressing equals button
        // the currentTextViewer will be set to empty string;
        this.readyToReset = true;
        this.currentOperand  = result;
        // set the this.result to the result for the log pad
        this.result = result;
        this.operation = undefined;
        this.previousOperand  = '';
    }
    // method for complex computation
    scientific(esp) {
        const input = parseFloat(this.currTextViewer.innerHTML);
        if(this.previousOperand !== '' || this.currTextViewer.innerHTML === '') return;
        let espresult;
        switch(esp){
            case '+/-': 
            // convert input to negative or positive
                espresult = (input > 0) ? -Math.abs(input) : Math.abs(input);
                break;
            case '1/x': 
                espresult = 1 / input;            
                break;
            case '√':
                if(input < 0){
                    this.espSymbol = undefined;
                    break;
                }
                espresult = Math.sqrt(input);
                break;
            case 'x2':
                espresult = input * input;
                break;
            case '|x|':
                espresult = Math.abs(input);
                break;
            case '⌊x⌋':
                espresult = Math.floor(input);
                break;
            case '⌈x⌉':
                espresult = Math.ceil(input);
                break;
            case 'exp':
                espresult = Math.exp(input);
                break;
            case 'n!':
                   espresult = this.factorial(input);
                break;
            case 'sin':
                espresult = Math.sin(input);
                break;
            case 'cos':
                espresult = Math.cos(input);
                break;
            case 'tan':
                espresult = Math.tan(input);
                break;
            case 'sinh':
                espresult = Math.sinh(input);
                break;
            case 'cosh':
                espresult = Math.cosh(input);
                break;
            case 'tanh':
                espresult = Math.tanh(input);
                break;
            case 'sin-1':
                espresult = Math.asin(input);
                break;
            case 'cos-1':
                espresult = Math.acos(input);
                break;
            case 'tan-1':
                espresult = Math.atan(input);
                break;
            case 'sinh-1':
                espresult = Math.asinh(input);
                break;
            case 'cosh-1':
                espresult = Math.acosh(input);
                break;
            case 'tanh-1':
                espresult = Math.atanh(input);
                break;
            case 'log':
                espresult = Math.log(input);
                break;
            default: 
                return;
        }

        // setting to true so that if the user click another number after pressing equals button
        // the currentTextViewer will be set to empty string;
        this.readyToReset = true;
        // preview the result
        this.currentOperand = espresult;
        this.operation = undefined;
        this.espSymbol = esp;
        // set the this.result to currentviewer inner text for the log pad
        this.result = this.currTextViewer.innerHTML;
    }

    // factorial function 
    factorial(input) {
        // dont proceed if the input is negative and is a floating number
        if(input < 0 || input.toString().includes('.')) return;
        let num = input
        let res = 1;
        for(let i = 1; i <= num; ++i) res *= i;
        return res;
    }

    // delete method for the backspace
    delete() {
        this.currentOperand  = this.currentOperand.toString().slice(0, -1);
        // for the log pad 
        this.curr = this.currentOperand;
    }

    //clear method for Clear Button
    clear() {
        // clearing the viewers and setting the operation to undefined
        this.readyToReset = true;
        this.currentOperand = '';
        this.previousOperand = undefined;
        this.operation = undefined;
        this.espSymbol = undefined;
    }

    //get display
    getDisplay(number) {

        const stringNum = number.toString();
        const beforeDot = parseFloat(stringNum.split('.')[0]);
        const afterDot = stringNum.split('.')[1];
        let numberDisplay;
        if(isNaN(beforeDot)) {
            numberDisplay = '';
        }else {
            numberDisplay = beforeDot.toLocaleString('en', {maximumFractionDigits: 0});
        }
        // if the user clicks a dot, we then concatnate
        if (afterDot != null) {
            return `${numberDisplay}.${afterDot}`;
        }else {
            // simply return the number with .toLocaleString functionality
            return numberDisplay;
        }
    }

    //update the Text Viewers as the user press numbers || operations
    update() {
        this.currTextViewer.innerHTML =
        this.getDisplay(this.currentOperand);
        if (this.operation != null) {
            this.prevTextViewer.innerHTML =
            `${this.getDisplay(this.previousOperand)} ${this.symbol}`;
        } else {
            this.prevTextViewer.innerHTML = `${this.currentOperand}`;
            this.total = `${this.currentOperand}`;
        }
    } 


    // especial buttons logging
    log(logPad) {
        if (this.espSymbol === undefined) return;
        // if the current text viewer is empty or the previous operand has a value, dont proceed
        if(this.currentOperand === '' || this.previousOperand !== '') return;
        this.data = `✓ ${this.espSymbol}(${this.result}) = ${this.total}`;
        this.node = document.createElement('LI');
        this.nodeVal = document.createTextNode(this.data);
        this.node.appendChild(this.nodeVal);
        logPad.appendChild(this.node);        
    }


    // logging for basic compute
    Basiclog(logPad) {
        // if the current text viewer is empty dont proceed
        if(this.previousOperand !== '' || this.operation !== undefined) return;
        if(this.modError) return;
        if(this.currentOperand === '') return;
        this.data = `✓ ${this.prev} ${this.symbol} ${this.curr} = ${this.total}`;
        this.node = document.createElement('LI');
        this.nodeVal = document.createTextNode(this.data);
        this.node.appendChild(this.nodeVal);
        logPad.appendChild(this.node);      
    }
    // for the logpad clear button
    erase(logpad) {
        if(logpad.innerHTML === '') return;
        logpad.innerHTML = '';
    }
    // for the auto scroll feature
    toBottom(div) {
        div.scrollTop = div.scrollHeight;
    }
}


// Get all the necessary buttons
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const eqBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const prevTextViewer = document.getElementById('prev');
const currTextViewer = document.getElementById('curr');
const specialBtns = document.querySelectorAll('[data-esp]');
const erase = document.querySelector('#clear');
const logPad = document.getElementById('logPad');

const dragCont = document.getElementById('dragCont');
// create a variable for the object calculator
const calculator = new Calculator(prevTextViewer, currTextViewer);

// loop thru each numbers in numberBtns
numberBtns.forEach(num => {
    num.addEventListener('click', () => {
        // this will only fire when you had a previous calculation.
        // checking if the current operand is not empty and this.readyToReset is set to True
        // then clear the currentOperand and set readyToReset to False
        if(calculator.previousOperand === '' && calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
            // debug purpose
            // [bug solved]! [closed]
            console.log('previous calculation removed!');
        }
        calculator.append(num.innerHTML);
        calculator.update();
    });
});

//clear log pad
erase.addEventListener('click', () => {
    calculator.erase(logPad);
});

// loop thru especial btns
specialBtns.forEach(esp => {
    esp.addEventListener('click', () => {
        calculator.scientific(esp.innerHTML);
        calculator.update();
        calculator.log(logPad);
        // to scroll down logpad after each click
        calculator.toBottom(dragCont);
    });
});

// loop thru each operators in operationBtns
operationBtns.forEach(operation => {
    operation.addEventListener('click', (ev) => {
        let symbol = ev.target;
        calculator.operator(operation.innerHTML, symbol.getAttribute('value'));
        calculator.update();
    });
});

eqBtn.addEventListener('click', () => {
    calculator.BasicCompute();
    calculator.update();
    calculator.Basiclog(logPad);
    // to scroll down logpad after each click of the equals button
    calculator.toBottom(dragCont);

});

// Event Listener for the delete button
delBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
});

// Event Listener for the delete button
clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
});


