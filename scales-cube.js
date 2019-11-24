var HX711 = require('hx711');

const clockPin = 3;
const dataPin = 2;

const sensor = new HX711(clockPin, dataPin);

module.exports.getWeight = () => {
  console.log('scalesCube.getWeight()');
  return sensor.getUnits();
}

module.exports.tare = () => {
  console.log('scalesCube.tare()');
  sensor.tare();
}