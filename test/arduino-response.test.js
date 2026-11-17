const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const parserSource = fs.readFileSync(
    path.join(__dirname, '../HTML/js/arduino-response.js'),
    'utf8'
);

function parserIn(context) {
    vm.runInNewContext(parserSource, context);
    return context.parseArduinoResponse;
}

test('accepts the response printed by the existing Arduino firmware', () => {
    const parse = parserIn({});
    const result = parse('dados({ sensor1 : 1023, sensor2 :  0, LUZ1 : 0, LUZ2 : 1})');
    assert.deepEqual(JSON.parse(JSON.stringify(result)), {
        sensor1: 1023,
        sensor2: 0,
        LUZ1: 0,
        LUZ2: 1
    });
});

test('rejects injected script instead of evaluating it', () => {
    const context = { injected: false };
    const parse = parserIn(context);
    assert.throws(() => parse('dados({ sensor1 : 1, sensor2 : 2, LUZ1 : 0, LUZ2 : 1});injected=true'));
    assert.equal(context.injected, false);
    assert.throws(() => parse('dados({ sensor1 : 1, sensor2 : 2, LUZ1 : 0, LUZ2 : 1, __proto__: {} })'));
    assert.throws(() => parse('dados({ sensor1 : "<img src=x onerror=alert(1)>", sensor2 : 2, LUZ1 : 0, LUZ2 : 1})'));
});

test('rejects malformed or unbounded device values', () => {
    const parse = parserIn({});
    assert.throws(() => parse('other({ sensor1 : 1, sensor2 : 2, LUZ1 : 0, LUZ2 : 1})'));
    assert.throws(() => parse('dados({ sensor1 : 1, sensor2 : 2, LUZ1 : 2, LUZ2 : 1})'));
    assert.throws(() => parse('dados({ sensor1 : 65536, sensor2 : 2, LUZ1 : 0, LUZ2 : 1})'));
    assert.throws(() => parse('x'.repeat(257)));
});
