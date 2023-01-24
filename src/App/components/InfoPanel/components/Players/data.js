
export const players = [
  'Skylar Baptista',
  'Wilson Rosser',
  'Leo Aminoff',
  'Livia Bator',
  'Ahmad Dias',
  'Brandon Dokidis',
],
page = '8/12',
avatars = []

for ( let i = 1; i <= players.length; ++i )
  avatars.push( require( `../../../../../assets/avatars/${ i }.png` ))
