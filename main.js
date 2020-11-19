const $btnKick = document.getElementById('btn-kick')
const $btnBump = document.getElementById('btn-bump')

const MAX_DAMAGE_KICK = 20
const MAX_DAMAGE_BUMP = 30

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
}

$btnKick.addEventListener('click', function () {
  changeHP(random(MAX_DAMAGE_KICK), character)
  changeHP(random(MAX_DAMAGE_KICK), enemy)
})

$btnBump.addEventListener('click', function () {
  changeHP(random(MAX_DAMAGE_BUMP), enemy)
})

function init() {
  console.log('Start Game!')
  renderHP(character)
  renderHP(enemy)
}

function renderHP(person) {
  renderHPLife(person)
  renderProgressBar(person)
}

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP
}

function renderProgressBar(person) {
  person.elProgressbar.style.width = person.damageHP + '%'
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0
    alert('Бедный ' + person.name + ' проиграл бой!')

    disableButton($btnKick)
    disableButton($btnBump)
  } else {
    person.damageHP -= count
  }

  renderHP(person)
}

function random(num) {
  return Math.ceil(Math.random() * num)
}

function disableButton(btn) {
  return (btn.disabled = true)
}

init()
