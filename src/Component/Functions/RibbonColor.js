export function ribbonColor(role) {
  const roleUppercased = role ? role.toUpperCase() : null;
  if (roleUppercased === 'COORDINAMENTO'){
    return 'orange'
  } else if (roleUppercased === 'AUTISTA'){
    return 'olive'
  } else if (roleUppercased === 'NAVIGATORE'){
    return 'yellow'
  } else if (roleUppercased === 'OPMARKET'){
    return 'brown'
  } else {
    return 'black'
  }
}

export function shiftColor(shift){
  const shiftUppercased = shift ? shift.toUpperCase(): null;
  if (shiftUppercased === 'MATTINA'){
    return 'pink'
  } else if (shiftUppercased === 'POMERIGGIO'){
    return 'violet'
  } else {
    return 'black'
  }
}