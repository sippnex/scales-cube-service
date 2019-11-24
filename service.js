var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var EchoCharacteristic = require('./weight-characteristic');

console.log('scales-cube (gatt-service)');

bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertising('scales-cube', ['c2abba42-b99b-40e6-bde8-3e837f4ca68e']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([
            new BlenoPrimaryService({
                uuid: 'c2abba42-b99b-40e6-bde8-3e837f4ca68e',
                characteristics: [
                    new EchoCharacteristic()
                ]
            })
        ]);
    }
});
