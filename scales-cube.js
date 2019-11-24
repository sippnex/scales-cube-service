const HX711 = require('hx711');
const SCLK = 9;
const DATA = 8;

var sensor = new HX711(SCLK, DATA);

module.exports.getWeight = () => {
  console.log('scalesCube.getWeight()');
  return sensor.getUnits();
}

module.exports.tare = () => {
  console.log('scalesCube.tare()');
  sensor.tare();
}