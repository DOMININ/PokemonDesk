function formattedPhone(phone) {
  let result = ''
  let startWithoutEight = 1

  if (phone.length === 11 && phone.charAt(0) === '7') {
    phone = '+' + phone
  } else if (phone.length === 11 && phone.charAt(0) === '8') {
    let newPhone = ''

    for (let i = startWithoutEight; i < phone.length; i++) {
      newPhone += phone.charAt(i)
    }

    phone = '+7' + newPhone
  } else if (phone.length === 10 && phone.charAt(0) !== '+') {
    phone = '+7' + phone
  } else if (!(phone.length === 12 && phone.charAt(0) === '+' && phone.charAt(1) === '7')) {
    return alert('Введен неверный формат телефона')
  }

  for (let i = 0; i < phone.length; i++) {
    if (i === 1) {
      result = '+7 ('
    } else if (i === 4) {
      result += phone.charAt(i) + ') '
    } else if (i === 7) {
      result += phone.charAt(i) + '-'
    } else if (i === 9) {
      result += phone.charAt(i) + '-'
    } else {
      result += phone.charAt(i)
    }
  }

  return alert(result)
}
