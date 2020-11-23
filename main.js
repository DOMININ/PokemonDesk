function getElById(id) {
  return document.getElementById(id)
}

const $btnKick = getElById('btn-kick')
const $btnBump = getElById('btn-bump')

const $logs = document.querySelector('#logs')

const MAX_DAMAGE_KICK = 20
const MAX_DAMAGE_BUMP = 30

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: getElById('health-character'),
  elProgressbar: getElById('progressbar-character'),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBar: renderProgressBar,
}

const enemy = {
  name: 'Charmander',
  defaultHP: 200,
  damageHP: 200,
  elHP: getElById('health-enemy'),
  elProgressbar: getElById('progressbar-enemy'),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBar: renderProgressBar,
}

const buttonClickCounter = ($btnEl) => {
  const MAX_CLICKS = 6
  let count = 0

  return ($btnEl) => {
    count++

    if (count === MAX_CLICKS) {
      disableButton($btnEl)
    }

    console.log('Кол-во нажатий', count)
    console.log('Осталось нажатий', MAX_CLICKS - count)
  }
}

const countKick = buttonClickCounter()
const countBump = buttonClickCounter()

$btnKick.addEventListener('click', function () {
  const $btnEl = this

  countKick($btnEl)
  character.changeHP(random(MAX_DAMAGE_KICK))
  enemy.changeHP(random(MAX_DAMAGE_KICK))
})

$btnBump.addEventListener('click', function () {
  const $btnEl = this

  countBump($btnEl)
  enemy.changeHP(random(MAX_DAMAGE_BUMP))
})

function init() {
  console.log('Start Game!')
  character.renderHP()
  enemy.renderHP()
}

function renderHP() {
  this.renderHPLife()
  this.renderProgressBar()
}

function renderHPLife() {
  const { elHP, damageHP, defaultHP } = this

  elHP.innerText = damageHP + ' / ' + defaultHP
}

function renderProgressBar() {
  const { elProgressbar, damageHP, defaultHP } = this
  const coeff = defaultHP / damageHP
  const percent = 100 / coeff

  elProgressbar.style.width = percent + '%'
}

function changeHP(count) {
  const { name, defaultHP } = this
  const $p = document.createElement('p')

  this.damageHP -= count

  if (this.damageHP <= 0) {
    this.damageHP = 0

    alert('Бедный ' + name + ' проиграл бой!')

    disableButton($btnKick)
    disableButton($btnBump)
  }

  const log =
    this === enemy
      ? generateLog(this, character, count, this.damageHP, defaultHP)
      : generateLog(this, enemy, count, this.damageHP, defaultHP)

  $p.innerText = `${log}`

  $logs.insertBefore($p, $logs.children[0])

  this.renderHP()
}

function random(num) {
  return Math.ceil(Math.random() * num)
}

function disableButton(btn) {
  return (btn.disabled = true)
}

function generateLog(firstPerson, secondPerson, count, damageHP, defaultHP) {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`,
  ]

  return logs[random(logs.length) - 1]
}

init()
