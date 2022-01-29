const input = document.getElementById('text-input')
const output = document.getElementById('text-output')

const buttonEncrypt = document.getElementById('btn-encrypt')
const buttonDecrypt = document.getElementById('btn-decrypt')
const buttonCopy = document.getElementById('btn-copy')
const buttonClear = document.getElementById('btn-clear')

const modalCopy = document.getElementById('modal-copy')
const textCopy = document.getElementById('modal-copy-text')

const errorList = document.getElementById('error')
let validEntry = true

const key = ['e', 'i', 'a', 'o', 'u']
const encryptionKey = ['enter', 'imes', 'ai', 'ober', 'ufat']

function standard() {
  input.value = ''
  removeBackground(output)
  buttonCopy.classList.remove('blocked')
  buttonClear.classList.remove('blocked')
  buttonEncrypt.classList.add('blocked')
  buttonDecrypt.classList.add('blocked')
}

function removeBackground(element) {
  element.classList.add('remove-background')
}

function restoreBackground(element) {
  element.classList.remove('remove-background')
}

function encrypt(text) {
  for (let i = 0; i < key.length; i++)
    text = text.replaceAll(key[i], encryptionKey[i])
  return text
}

function decrypt(text) {
  for (let i = 0; i < key.length; i++)
    text = text.replaceAll(encryptionKey[i], key[i])
  return text
}

function validateInput(text) {
  let error = []
  let accentedText = false
  let containsNumber = false
  let accented = 'àèìòùâêîôûäëïöüáéíóúãõ'.split('')

  for (let i = 0; i < accented.length; i++) {
    let letter = accented[i]
    if (text.toLowerCase().includes(letter)) {
      accentedText = true
      break
    }
  }

  for (let i = 0; i < text.length; i++) {
    letter = text[i]
    if (Number.isInteger(parseInt(letter))) {
      containsNumber = true
      break
    }
  }

  if (text.toLowerCase() != text) error.push('Apenas letras minúsculas.')
  if (containsNumber) error.push('Não insira números.')
  if (accentedText) error.push('Não utilize acentuação.')

  return error
}

buttonEncrypt.addEventListener('click', function () {
  if (validEntry && input.value != '') {
    output.textContent = encrypt(input.value)
    standard()
  }
})

buttonDecrypt.addEventListener('click', function () {
  if (validEntry && input.value != '') {
    output.textContent = decrypt(input.value)
    standard()
  }
})

buttonCopy.addEventListener('click', function () {
  let encryptedMessage = output.value
  if (encryptedMessage != '') {
    navigator.clipboard.writeText(output.value)
    textCopy.textContent = 'Copiado com sucesso!'
    modalCopy.classList.add('show-modal')
    setTimeout(() => {
      modalCopy.classList.remove('show-modal')
    }, 1400)
  }
})

buttonClear.addEventListener('click', function () {
  let encryptedMessage = output.value
  if (encryptedMessage != '') {
    output.value = ''
    restoreBackground(output)
    buttonCopy.classList.add('blocked')
    buttonClear.classList.add('blocked')
  }
})

input.addEventListener('input', function () {
  errorList.innerHTML = ''
  let error = validateInput(input.value)
  error.forEach(function (error) {
    let li = document.createElement('li')
    li.textContent = error

    errorList.appendChild(li)
  })

  buttonEncrypt.classList.remove('blocked')
  buttonDecrypt.classList.remove('blocked')

  validEntry = true

  if (error.length > 0 || input.value == '') {
    buttonEncrypt.classList.add('blocked')
    buttonDecrypt.classList.add('blocked')

    validEntry = false
  }
})
