export default function ribbonColor(role) {
  if (role === 'COORDINAMENTO'){
    return 'red'
  } else if (role === 'AUTISTA'){
    return 'green'
  } else if (role === 'NAVIGATORE'){
    return 'blue'
  } else if (role === 'OPMARKET'){
    return 'brown'
  } else {
    return 'black'
  }
}