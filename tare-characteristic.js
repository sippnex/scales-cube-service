var util = require('util');
var bleno = require('bleno');
var scalesCube = require('./scales-cube');

var BlenoCharacteristic = bleno.Characteristic;

var TareCharacteristics = function() {
    TareCharacteristic.super_.call(this, {
        uuid: '17900496-ff17-4920-be38-b3686a9c7ce4',
        properties: ['write', 'notify'],
        value: null
    });

    this._value = new Buffer(0);
    this._updateValueCallback = null;
};

util.inherits(TareCharacteristic, BlenoCharacteristic);

/*TareCharacteristics.prototype.onReadRequest = function(offset, callback) {
    console.log('TareCharacteristics - onReadRequest: value = ' + this._value.toString('hex'));

    callback(this.RESULT_SUCCESS, this._value);
};*/

TareCharacteristics.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('TareCharacteristics - onWriteRequest: value = ' + this._value.toString('hex'));
    scalesCube.tare();

    if (this._updateValueCallback) {
        console.log('TareCharacteristics - onWriteRequest: notifying');
        this._updateValueCallback(1);
    }

    callback(this.RESULT_SUCCESS);
};

TareCharacteristics.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('TareCharacteristics - onSubscribe');
    this._updateValueCallback = updateValueCallback;
};

TareCharacteristics.prototype.onUnsubscribe = function() {
    console.log('TareCharacteristics - onUnsubscribe');
    this._updateValueCallback = null;
};

module.exports = TareCharacteristics;
