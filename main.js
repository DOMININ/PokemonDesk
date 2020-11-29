import { random, buttonClickCounter, getElById } from './utils.js'
import Pokemon from './pokemon.js'
import createLog from './logs.js'
import { pokemons } from './pokemons.js'

const $control = document.querySelector('.control')
const $btnStart = document.createElement('button')
$btnStart.classList.add('button')
$btnStart.innerText = 'Начать игру'
$control.appendChild($btnStart)

const resetGame = () => {
  const allButtons = document.querySelectorAll('.control .button')
  allButtons.forEach(($item) => $item.remove())
  $control.appendChild($btnStart)
}

const autoKick = (player1, player2) => {
  player1.changeHP(
    random(player2.attacks[0].maxDamage, player2.attacks[0].minDamage),
    (count, damageHP, defaultHP) => {
      createLog(player1, player2, count, damageHP, defaultHP)

      if (damageHP === 0) {
        resetGame()
      }
    },
  )
}

$btnStart.addEventListener('click', () => {
  $btnStart.remove()

  // TODO: это надо куда-то вынести
  const characterPokemon = pokemons[random(pokemons.length - 1, 0)]
  const enemyPokemons = pokemons.filter((pok) => pok.name !== characterPokemon.name)
  const enemyPokemon = enemyPokemons[random(enemyPokemons.length - 1, 0)]

  const $characterImg = getElById('sprite-character')
  $characterImg.src = characterPokemon.img

  const $characterName = getElById('name-character')
  $characterName.innerText = characterPokemon.name

  const $enemyImg = getElById('sprite-enemy')
  $enemyImg.src = enemyPokemon.img

  const $enemyName = getElById('name-enemy')
  $enemyName.innerText = enemyPokemon.name
  // -------------

  const player1 = new Pokemon({
    ...characterPokemon,
    selectors: 'character',
  })

  let player2 = new Pokemon({
    ...enemyPokemon,
    selectors: 'enemy',
  })

  player1.attacks.forEach((item) => {
    const $btn = document.createElement('button')
    $btn.classList.add('button')
    $btn.innerText = item.name

    const btnCount = buttonClickCounter(item.maxCount, $btn)

    $btn.addEventListener('click', () => {
      player2.changeHP(random(item.maxDamage, item.minDamage), (count, damageHP, defaultHP) => {
        createLog(player2, player1, count, damageHP, defaultHP)
      })

      autoKick(player1, player2)

      btnCount()
    })

    $control.appendChild($btn)
  })
})
