
var test = require('tape');
var parser = require('../mygrammar');

function testAnswer(tester, expression, expected, description) {
    var result
    tester.doesNotThrow(function() {
      result = parser.parse(expression);
    });
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

  testAnswer(t, '1*1', 1, 'could multiply')
  testAnswer(t, '1*2', 2, 'could multiply')
  testAnswer(t, '3*4', 12, 'could multiply')

  t.end();
});

test('multiplication and addition test', function (t) {

  testAnswer(t, '1 * 1 + 1', 2, 'could compute')
  testAnswer(t, '2 * 2 + 3', 7, 'could compute')
  testAnswer(t, '3 * 4 + 2', 14, 'could compute')
  testAnswer(t, '3 + 4 * 2', 11, 'could compute')
  testAnswer(t, '3 + 4 +2* 2+ 1 *5', 16, 'could compute')

  t.end();
});

test('subtraction test', function (t) {

  testAnswer(t, '5 - 2', 3, 'could subtract')
  testAnswer(t, '5 - 4', 1, 'could subtract')
  testAnswer(t, '4 - 5', -1, 'could subtract')

  t.end();
});

test('subtraction and multiplication test', function (t) {

  testAnswer(t, '5 - 1 * 2', 3, 'could subtract')
  testAnswer(t, '2 * 5 - 4', 6, 'could subtract')
  testAnswer(t, '4 - 5 * 2', -6, 'could subtract')

  t.end();
});

test('brackets test', function (t) {
  var result;

  testAnswer(t, '(5)', 5, 'could compute')
  testAnswer(t, '((5))', 5, 'could compute')
  testAnswer(t, '(5 + 5)', 10, 'could compute')
  testAnswer(t, '((5 + 5))', 10, 'could compute')
  testAnswer(t, '(5 * 5)', 25, 'could compute')
  testAnswer(t, '((10 * 10))', 100, 'could compute')
  testAnswer(t, '(10 - 5)', 5, 'could compute')
  testAnswer(t, '((20 - 5))', 15, 'could compute')
  testAnswer(t, '(10 + 5 * 2)', 20, 'could compute')
  testAnswer(t, '(10 + 2) * 2', 24, 'could compute')
  testAnswer(t, '(5 - 10) * 2', -10, 'could compute')
  testAnswer(t, '(6 - 3) + (5 + 7) * 2', 27, 'could compute')
  testAnswer(t, '((6 - 3) - (5 + 7)) * 2', -18, 'could compute')
  testAnswer(t, '((6 - 3) - ((5 + 7) * 2)) * 2', -42, 'could compute')
  testAnswer(t, '5 + (5 + 5)', 15, 'could compute')
  testAnswer(t, '5 + (5 * 5)', 30, 'could compute')

  testAnswer(t, '(10 - 5', undefined, 'should throw');

  t.end();
});

test('division test', function (t) {

  testAnswer(t, '10 / 2', 5, 'could divide')
  testAnswer(t, '10 / 10', 1, 'could divide')
  testAnswer(t, '((0 - 1) * 10) / 2', -5, 'could divide')
  testAnswer(t, '10 + -2', 8, 'could compute')


  t.end();
});
