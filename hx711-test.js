const HX711 = require('hx711');
const SCLK = 9;
const DATA = 8;

var sensor = new HX711(SCLK, DATA);

const readWeight = () => {
    console.log(sensor.getUnits());
    setTimeout(readWeight, 2000);
};

//sensor.tare();
readWeight();