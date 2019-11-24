var HX711 = require('hx711');

const clockPin = 3;
const dataPin = 2;
const sensor = new HX711(clockPin, dataPin);

//sensor.tare();

const getWeight = () => {
    console.log(sensor.getUnits());
    setTimeout(getWeight, 1000);
};