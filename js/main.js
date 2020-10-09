
function init() {
    var main = document.getElementById(main);
}
class Calculator {
    constructor() {
        this.displayString = '';
        this.savedString = '';
        this.lastNumber = '';
        this.lastOperator = '';
        this.allClear = true;
        this.history = [];
        this.element = [
            ['div', 'container justify-content-center', 'outside', '', 'main'],
            ['div', 'calc row bg-secondary justify-content-center', 'mainrow', '', 'outside'],
            ['div', 'col justify-content-center', 'body', '', 'mainrow'],
            ['div', 'display bg-light rounded row justify-content-center', 'row1', '', 'body'],
            ['div', 'display-4', 'display', '0', 'row1'],
            ['div', 'row justify-content-center', 'row2', '', 'body'],
            ['button', 'btn btn-warning', 'button1', '1', 'row2'],
            ['button', 'btn btn-warning', 'button2', '2', 'row2'],
            ['button', 'btn btn-warning', 'button3', '3', 'row2'],
            ['button', 'btn btn-warning', 'buttonplus', '+', 'row2'],
            ['div', 'row justify-content-center', 'row3', '', 'body'],
            ['button', 'btn btn-warning', 'button4', '4', 'row3'],
            ['button', 'btn btn-warning', 'button5', '5', 'row3'],
            ['button', 'btn btn-warning', 'button6', '6', 'row3'],
            ['button', 'btn btn-warning', 'buttonminus', '-', 'row3'],
            ['div', 'row justify-content-center', 'row4', '', 'body'],
            ['button', 'btn btn-warning', 'button7', '7', 'row4'],
            ['button', 'btn btn-warning', 'button8', '8', 'row4'],
            ['button', 'btn btn-warning', 'button9', '9', 'row4'],
            ['button', 'btn btn-warning', 'buttonmultiply', '*', 'row4'],
            ['div', 'row justify-content-center', 'row5', '', 'body'],
            ['button', 'btn btn-warning', 'buttonclear', 'C', 'row5'],
            ['button', 'btn btn-warning', 'button0', '0', 'row5'],
            ['button', 'btn btn-warning', 'buttondecimal', '.', 'row5'],
            ['button', 'btn btn-warning', 'buttondivide', '/', 'row5'],
            ['div', 'row justify-content-center', 'row6', '', 'body'],
            ['button', 'big btn btn-primary', 'buttonequals', '=', 'row6'],
            ['div', 'history bg-light rounded row justify-content-center', 'row7', '', 'body'],
            ['div', 'jumbotron-fluid', 'history', '-', 'row7']
        ]
    }
    createElements() {
        for (let i = 0; i < this.element.length; i++) {
            var tmp = '';
            var e = [];
            e[i] = document.createElement(this.element[i][0]);
            e[i].setAttribute('class', this.element[i][1]);
            e[i].setAttribute('id', this.element[i][2]);
            e[i].textContent = this.element[i][3];
            tmp = document.getElementById(this.element[i][4]);
            tmp.appendChild(e[i]);
            if (this.element[i][0] === "button") {
                e[i].addEventListener('click', this.hitButton);
            }
            this.displayBar = document.getElementById('display');
            this.historyBar = document.getElementById('history');
        }
    }
    // when a button is hit, go to controller, log history
    hitButton(e) {
        c.history.push(e.target.textContent);
        c.controller(e.target.textContent);
    }
    updateHistoryBar() {
        c.historyBar.textContent = c.history.toString('');
    }
    updateDisplay(newDisplay) {
        c.displayBar.textContent = newDisplay;
        c.historyBar.textContent = c.history.toString().replace(',', ' ');
    };
    controller(newCmd) {
        console.log(newCmd);
        // if Cmd is a number or decimal
        if (parseInt(newCmd) || newCmd == '.' || newCmd == '0') {
            // add to prev string and display
            c.displayString += newCmd;
            c.updateDisplay(c.displayString);
            // otherwise if its an operator
        } else if (newCmd == '+' || newCmd == "-" || newCmd == '*' || newCmd == '/') {
            //  check to see if it's the second operator
            if (c.displayString == '') {
                c.displayString = c.savedString + newCmd;
                c.updateDisplay(c.displayString);
                c.lastOperator = newCmd;
            } else if (c.lastOperator == '') {
                //if not load it as last operator and display it with dS
                c.lastOperator = newCmd;
                c.displayString += newCmd;
                c.updateDisplay(c.displayString);
            } else {
                //else if it is the second operator perform the original operation,
                //make the result the new display string
                console.log('sending to PO')
                c.displayString = c.performOperation(c.displayString);
                c.displayString += newCmd;
                c.updateDisplay(c.displayString);
                //save the result but clear the dS
                //c.savedString = c.displayString;
                //c.displayString += '';
                //keep track of the old operator?
                //c.lastOperator = newCmd;
            }
            // otherwise if the = is pressed
        } else if (newCmd == '=') {
            c.displayString = c.performOperation(c.displayString);
            c.updateDisplay(c.displayString);
            c.savedString = c.displayString;
            c.resetStrings();
            //c.lastOperator = '=';

        } else if (newCmd = 'C') {
            c.updateDisplay(0);
            c.resetStrings();
        } else {
            c.updateDisplay('error');
        }
    }
    performOperation(operation) {
        if (operation.includes('+')) {
            let add = operation.split('+');
            return parseFloat(add[0]) + parseFloat(add[1]);
        } else if (operation.includes('-')) {
            let diff = operation.split('-');
            return parseFloat(diff[0]) - parseFloat(diff[1]);
        } else if (operation.includes('*')) {
            let prod = operation.split('*');
            return parseFloat(prod[0]) * parseFloat(prod[1]);
        } else if (operation.includes('/')) {
            let quot = operation.split('/');
            return parseFloat(quot[0]) / parseFloat(quot[1]);
        } else return "error";
    }
    resetStrings() {
        this.displayString = '';
        //this.savedString = '';
        this.lastNumber = '';
        this.lastOperator = '';

    }
}
const c = new Calculator();
c.createElements();
//c.updateDisplay()
//console.log(c.history);
//console.log('cycle');


