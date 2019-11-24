var util = require('util');
var bleno = require('bleno');
var scalesCube = require('./scales-cube');

var BlenoCharacteristic = bleno.Characteristic;

var TareCharacteristic = function() {
    TareCharacteristic.super_.call(this, {
        uuid: '17900496-ff17-4920-be38-b3686a9c7ce4',
        properties: ['write'],
        value: 0
    });

    this._value = new Buffer(0);
    //this._updateValueCallback = null;
};

util.inherits(TareCharacteristic, BlenoCharacteristic);

/*TareCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log('TareCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

    callback(this.RESULT_SUCCESS, this._value);
};*/

TareCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('TareCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
    scalesCube.tare();

    /*if (this._updateValueCallback) {
        console.log('TareCharacteristic - onWriteRequest: notifying');
        this._updateValueCallback(1);
    }*/

    callback(this.RESULT_SUCCESS);
};

/*TareCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('TareCharacteristic - onSubscribe');
    this._updateValueCallback = updateValueCallback;
};

TareCharacteristic.prototype.onUnsubscribe = function() {
    console.log('TareCharacteristic - onUnsubscribe');
    this._updateValueCallback = null;
};*/

module.exports = TareCharacteristic;
