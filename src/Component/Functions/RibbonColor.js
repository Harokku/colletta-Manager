export function ribbonColor(role) {
  if (role === 'COORDINAMENTO'){
    return 'orange'
  } else if (role === 'AUTISTA'){
    return 'olive'
  } else if (role === 'NAVIGATORE'){
    return 'yellow'
  } else if (role === 'OPMARKET'){
    return 'brown'
  } else {
    return 'black'
  }
}

export function shiftColor(shift){
  if (shift === 'MATTINA'){
    return 'pink'
  } else if (shift === 'POMERIGGIO'){
    return 'violet'
  }
}