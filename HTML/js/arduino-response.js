// The existing Arduino firmware returns a fixed JSONP-shaped response.
// Read it as text so bytes from the network are never executed as JavaScript.
function parseArduinoResponse(response) {
    if (typeof response !== 'string' || response.length > 256) {
        throw new Error('Invalid Arduino response');
    }

    var match = /^\s*dados\s*\(\s*\{\s*sensor1\s*:\s*(\d{1,5})\s*,\s*sensor2\s*:\s*(\d{1,5})\s*,\s*LUZ1\s*:\s*([01])\s*,\s*LUZ2\s*:\s*([01])\s*\}\s*\)\s*;?\s*$/.exec(response);
    if (!match) {
        throw new Error('Invalid Arduino response');
    }

    var sensor1 = Number(match[1]);
    var sensor2 = Number(match[2]);
    if (sensor1 > 65535 || sensor2 > 65535) {
        throw new Error('Invalid Arduino sensor value');
    }

    return {
        sensor1: sensor1,
        sensor2: sensor2,
        LUZ1: Number(match[3]),
        LUZ2: Number(match[4])
    };
}
