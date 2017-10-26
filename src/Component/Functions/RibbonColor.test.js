import {shiftColor, ribbonColor} from './RibbonColor'

// RibbonColor Tests
test('return correct orange color for COORDINAMENTO ribbon (Case Insensitive)', () => {
  expect(ribbonColor('coordinamento')).toBe('orange')
});
test('return correct olive color for AUTISTA ribbon (Case Insensitive)', () => {
  expect(ribbonColor('autista')).toBe('olive')
});
test('return correct yellow color for NAVIGATORE ribbon (Case Insensitive)', () => {
  expect(ribbonColor('navigatore')).toBe('yellow')
});
test('return correct brown color for OPMARKET ribbon (Case Insensitive)', () => {
  expect(ribbonColor('opmarket')).toBe('brown')
});

test('return default for ribbon color if passed null as parameter', () => {
  expect(ribbonColor(null)).toBe('black')
});


// ShiftColor Tests

test('return correct color pink for MATTINA shift (Case Insensitive)', () => {
  expect(shiftColor('mattina')).toBe('pink')
});
test('return correct color violet for POMERIGGIO shift (Case Insensitive)', () => {
  expect(shiftColor('pomeriggio')).toBe('violet')
});

test('return default for shift color if passed null as parameter', () => {
  expect(shiftColor(null)).toBe('black')
});

