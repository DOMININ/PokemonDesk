import { random, buttonClickCounter, getElById } from './utils.js'
import Pokemon from './pokemon.js'
import createLog from './logs.js'

class Game {
  getPokemons = async () => {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons')
    const body = await response.json()
    return body
  }

  getDamage = async (id1, id2, idAtck) => {
    const responce = await fetch(
      `https://reactmarathon-api.netlify.app/api/fight?player1id=${id1}&attackId=${idAtck}&player2id=${id2}`,
    )

    const body = await responce.json()
    return body
  }

  start = async () => {
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

    $btnStart.addEventListener('click', async () => {
      $btnStart.remove()

      const pokemons = await this.getPokemons()
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

        $btn.addEventListener('click', async () => {
          const damage = await this.getDamage(characterPokemon.id, enemyPokemon.id, item.id)
          const damageResult = damage.kick

          player2.changeHP(damageResult.player2, (count, damageHP, defaultHP) => {
            createLog(player2, player1, count, damageHP, defaultHP)
          })

          player1.changeHP(damageResult.player1, (count, damageHP, defaultHP) => {
            createLog(player1, player2, count, damageHP, defaultHP)

            if (damageHP === 0) {
              resetGame()
            }
          })

          btnCount()
        })

        $control.appendChild($btn)
      })
    })
  }
}

const game = new Game()
game.start()
