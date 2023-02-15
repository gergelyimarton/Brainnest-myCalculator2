class Calculator {
  constructor(prevOperandTextElement, currentOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    this.setupKeyboardSupport()
  }


    
  setupKeyboardSupport() {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addNumber(event.key)
          this.updateDisplay()
          break
        case '.':
          this.addNumber('.')
          this.updateDisplay()
          break
        case '+':
        case '-':
        case '*':
        case '/':
          this.operationChoose(event.key)
          this.updateDisplay()
          break
        case 'Enter':
          this.compute()
          this.updateDisplay()
          break
        case 'Backspace':
          this.delete()
          this.updateDisplay()
          break
        case 'Escape':
          this.clear()
          this.updateDisplay()
          break
      }
    })
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  addNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return
  }
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  operationChoose(operation) {
    if (this.currentOperand === '') {
      return
    }
    
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(current === 0){
      return alert("Sorry, but you can't compute with zero!")
    }
    if (isNaN(prev) || isNaN(current)) {
      return
    }
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.prevOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.prevOperandTextElement.innerText = ''
    }
  }
}
  
const numButtons = document.querySelectorAll('[number]'),
opButtons = document.querySelectorAll('[operation]'),
equalsButton = document.querySelector('[equals]'),
deleteButton = document.querySelector('[delete]'),
allClearButton = document.querySelector('[all-clear]'),
prevOperandTextElement = document.querySelector('[previous-operand]'),
currentOperandTextElement = document.querySelector('[current-operand]');
const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement)




numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.innerText)
    calculator.updateDisplay()
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.operationChoose(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})