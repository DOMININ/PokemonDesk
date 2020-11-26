export function random(num) {
  return Math.ceil(Math.random() * num)
}

export function getElById(id) {
  return document.getElementById(id)
}

export function disableButton(btn) {
  return (btn.disabled = true)
}
