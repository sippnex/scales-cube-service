var util = require('util');
var bleno = require('bleno');
var scalesCube = require('./scales-cube');

var BlenoCharacteristic = bleno.Characteristic;

var WeightCharacteristic = function() {
    WeightCharacteristic.super_.call(this, {
        uuid: 'de5098d0-e052-400b-9482-6468cbfeb74c',
        properties: ['read']
    });
};

util.inherits(WeightCharacteristic, BlenoCharacteristic);

WeightCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log('WeightCharacteristic - Read Request');
    let buf = Buffer.allocUnsafe(4);
    buf.writeInt32LE(scalesCube.getWeight());
    callback(this.RESULT_SUCCESS, buf);
};

module.exports = WeightCharacteristic;
