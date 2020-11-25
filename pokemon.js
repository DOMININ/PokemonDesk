import { getElById, disableButton } from './utils.js'

class Selectors {
  constructor(name) {
    this.elHP = getElById(`health-${name}`)
    this.elProgressbar = getElById(`progressbar-${name}`)
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors)

    this.name = name
    this.hp = {
      defaultHP: hp,
      damageHP: hp,
    }
    this.type = type

    this.renderHP()
  }

  renderHP = () => {
    this.renderHPLife()
    this.renderProgressBar()
  }

  renderHPLife = () => {
    const {
      elHP,
      hp: { damageHP, defaultHP },
    } = this

    elHP.innerText = damageHP + ' / ' + defaultHP
  }

  renderProgressBar = () => {
    const {
      elProgressbar,
      hp: { damageHP, defaultHP },
    } = this
    const coeff = defaultHP / damageHP
    const percent = 100 / coeff

    elProgressbar.style.width = percent + '%'
  }

  changeHP = (count, cb) => {
    let { defaultHP } = this.hp

    this.hp.damageHP -= count

    if (this.hp.damageHP <= 0) {
      const $controlBtns = document.querySelectorAll('.control button')

      this.hp.damageHP = 0

      $controlBtns.forEach((btn) => {
        disableButton(btn)
      })

      alert('Бедный ' + this.name + ' проиграл бой!')
    }

    this.renderHP()
    cb && cb(count, this.hp.damageHP, defaultHP)
  }
}

export default Pokemon
