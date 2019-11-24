var util = require('util');
var bleno = require('bleno');
var scalesCube = require('./scales-cube');

var BlenoCharacteristic = bleno.Characteristic;

var WeightCharacteristic = function() {
    WeightCharacteristic.super_.call(this, {
        uuid: 'de5098d0-e052-400b-9482-6468cbfeb74c',
        properties: ['read', 'notify'],
        value: null
    });

    this._value = new Buffer(0);
    this._updateValueCallback = null;
};

util.inherits(WeightCharacteristic, BlenoCharacteristic);

WeightCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log('WeightCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));
    this._value = scalesCube.getWeight();
    console.log('callback: ', this._value);
    if (this._updateValueCallback) {
        this._updateValueCallback(this._value);
    }
    callback(this.RESULT_SUCCESS, this._value);
};

/*WeightCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('WeightCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

    if (this._updateValueCallback) {
        console.log('WeightCharacteristic - onWriteRequest: notifying');

        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};*/

WeightCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('WeightCharacteristic - onSubscribe');
    this._updateValueCallback = updateValueCallback;
};

WeightCharacteristic.prototype.onUnsubscribe = function() {
    console.log('WeightCharacteristic - onUnsubscribe');
    this._updateValueCallback = null;
};

module.exports = WeightCharacteristic;
