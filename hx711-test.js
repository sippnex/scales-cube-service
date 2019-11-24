var HX711 = require('hx711');

const clockPin = 3;
const dataPin = 2;

console.log('hx711 test');

const sensor = new HX711(clockPin, dataPin);
//sensor.tare();
console.log(sensor.getUnits());