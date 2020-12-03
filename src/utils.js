export function random(max, min) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

export function getElById(id) {
  return document.getElementById(id)
}

export function disableButton(btn) {
  return (btn.disabled = true)
}

export const buttonClickCounter = (num, el) => {
  const MAX_CLICKS = num
  let count = MAX_CLICKS

  const innerText = el.innerText
  el.innerText = `${innerText} (${count})`

  return () => {
    count--

    if (count === 0) {
      disableButton(el)
    }

    el.innerText = `${innerText} (${count})`
    return count
  }
}
