let _display = document.querySelector('.result-panel')
let _number = document.querySelectorAll('.number')
let _operator = document.querySelectorAll('.oper')
let _result = document.querySelector('.result')
let _reset = document.querySelector('.reset')
let _resultDisplayed = false

for (let i = 0; i < _number.length; i++) {
    _number[i].addEventListener('click', function(event) {
        let _currentString = _display.innerHTML
        let _lastChar = _currentString[_currentString.length - 1]
        if(_resultDisplayed === false) {
            _display.innerHTML += event.target.innerHTML
        } else if(_resultDisplayed === true && _lastChar === "+" || _lastChar === "-" || _lastChar === "x" || _lastChar === "/" || _lastChar === "%"){
            _resultDisplayed = false
            _display.innerHTML += event.target.innerHTML
        } else {
            _resultDisplayed = false
            _display.innerHTML = ''
            _display.innerHTML += event.target.innerHTML
        }
    })
}
for (let j = 0; j < _operator.length; j++) {
    _operator[j].addEventListener('click', function(event) {
        let _currentString = _display.innerHTML
        let _lastChar = _currentString[_currentString.length - 1]
        if(_lastChar === "+" || _lastChar === "-" || _lastChar === "x" || _lastChar === "/" || _lastChar === "%") {
            let _newStr = _currentString.substring(0, _currentString.length - 1) + event.target.innerHTML
            _display.innerHTML = _newStr
        } else if(_currentString.length == 0){
            alert('enter a number please')
        } else {
            _display.innerHTML += event.target.innerHTML;
        }
    })
}
_result.addEventListener('click', function() {
    let _inputStr = _display.innerHTML
    let numbers = _inputStr.split(/\+|\-|\x|\/|\%/g)
    let operators = _inputStr.replace(/[0-9]|\./g, "").split("")

    // console.log(_inputStr)
    // console.log(numbers)
    // console.log(operators)

    let _divide = operators.indexOf('/')
    while(_divide != -1) {
        numbers.splice(_divide, 2, numbers[_divide] / numbers[_divide + 1])
        operators.splice(_divide, 1)
        _divide = operators.indexOf('/')
    }

    let _rest = operators.indexOf('%')
    while(_rest != -1) {
        numbers.splice(_rest, 2, numbers[_rest] % numbers[_rest + 1])
        operators.splice(_rest, 1)
        _rest = operators.indexOf('%')
    }

    let _multi = operators.indexOf('x')
    while(_multi != -1) {
        numbers.splice(_multi, 2, numbers[_multi] * numbers[_multi + 1])
        operators.splice(_multi, 1)
        _multi = operators.indexOf('x')
    }

    let _sub = operators.indexOf('-')
    while(_sub != -1) {
        numbers.splice(_sub, 2, numbers[_sub] - numbers[_sub + 1])
        operators.splice(_sub, 1)
        _sub = operators.indexOf('-')
    }

    let _add = operators.indexOf('+')
    while(_add != -1) {
        numbers.splice(_add, 2, parseFloat(numbers[_add]) + parseFloat(numbers[_add + 1]))
        operators.splice(_add, 1)
        _add = operators.indexOf('+')
    }
    _display.innerHTML = numbers[0]
    _resultDisplayed = true
})

_reset.addEventListener('click', function() {
    _display.innerHTML = ''
})

