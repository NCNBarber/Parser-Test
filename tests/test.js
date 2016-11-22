
var test = require('tape');
var parser = require('../mygrammar');

function testAnswer(tester, expression, expected, description) {
    var result = parser.parse(expression);
    tester.equal(result, expected, description);
}

test('parse single integer test', function (t) {
  var result;

  t.doesNotThrow(function() {
    result = parser.parse('123');
  });

  t.notEqual(result, '123', 'can parse constant integer');
  t.equal(result, 123, 'can parse constant integer');

  t.end();
});

test('basic addition test', function (t) {
  var result;

  t.doesNotThrow(function() {
    result = parser.parse('1+2');
  });

  t.equal(result, 3, 'can add integers');

  t.end();
});

test('handling whitespaces test', function (t) {

  testAnswer(t, '1 +2', 3);
  testAnswer(t, '1+ 2', 3);
  testAnswer(t, '1  +2 ', 3);
  testAnswer(t, ' 1  + 2', 3);

  t.end();
});

test('handling unique whitespaces test', function (t) {
  var result;

  //Handling tabs
  t.doesNotThrow(function() {
    result = parser.parse('1 +\t2');
  });

  t.equal(result, 3, 'can add integers');

  //Handling new lines
  t.doesNotThrow(function() {
    result = parser.parse('1 +\n2');
  });

  t.equal(result, 3, 'can add integers');

  t.end();
});

test('basic multiplication test', function (t) {
  var result;

  testAnswer(t, '1*1', 1, 'could multiply')
  testAnswer(t, '1*2', 2, 'could multiply')
  testAnswer(t, '3*4', 12, 'could multiply')

  t.end();
});

test('multiplication and addition test', function (t) {
  var result;

  testAnswer(t, '1 * 1 + 1', 2, 'could compute')
  testAnswer(t, '1 * 2 + 3', 5, 'could compute')
  testAnswer(t, '3 * 4 + 2', 14, 'could compute')
  testAnswer(t, '3 + 4 * 2', 11, 'could compute')

  t.end();
});
