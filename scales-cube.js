var HX711 = require('hx711');

const clockPin = 22;
const dataPin = 11;

const sensor = new HX711(clockPin, dataPin);

module.exports.getWeight = () => {
  console.log('scalesCube.getWeight()');
  return sensor.getUnits();
}

module.exports.tare = () => {
  console.log('scalesCube.tare()');
  sensor.tare();
}