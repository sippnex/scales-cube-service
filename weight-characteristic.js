var util = require('util');
var bleno = require('bleno');
var scalesCube = require('./scales-cube');

var BlenoCharacteristic = bleno.Characteristic;

var WeightCharacteristics = function() {
    WeightCharacteristics.super_.call(this, {
        uuid: 'de5098d0-e052-400b-9482-6468cbfeb74c',
        properties: ['read', 'notify'],
        value: 0
    });

    this._value = new Buffer(0);
    this._updateValueCallback = null;
};

util.inherits(WeightCharacteristics, BlenoCharacteristic);

WeightCharacteristics.prototype.onReadRequest = function(offset, callback) {
    console.log('WeightCharacteristics - onReadRequest: value = ' + this._value.toString('hex'));
    scalesCube.getWeight();
    callback(this.RESULT_SUCCESS, this._value);
};

/*WeightCharacteristics.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('WeightCharacteristics - onWriteRequest: value = ' + this._value.toString('hex'));

    if (this._updateValueCallback) {
        console.log('WeightCharacteristics - onWriteRequest: notifying');

        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};*/

WeightCharacteristics.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('WeightCharacteristics - onSubscribe');
    this._updateValueCallback = updateValueCallback;
};

WeightCharacteristics.prototype.onUnsubscribe = function() {
    console.log('WeightCharacteristics - onUnsubscribe');
    this._updateValueCallback = null;
};

module.exports = WeightCharacteristics;
