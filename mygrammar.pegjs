{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = additive
  / multiplicative

additive
  = whitespace? left:multiplicative whitespace? operator:additiveOp whitespace? right:additive whitespace? {
    if (operator === "+") {
      return left + right;
    } else {
      return left - right;
    }
  }
  / primary

multiplicative
  = whitespace? left:primary whitespace? operator:multiplicativeOp whitespace? right:multiplicative whitespace? {
    if (operator === "*") {
      return left * right;
    } else {
      return left / right;
    }
  }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }
  / "(" multiplicative:multiplicative ")" { return multiplicative; }

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }

whitespace
  = [ \t\n]+ { return; }

additiveOp
  = "+"
  / "-"

multiplicativeOp
  = "*"
  / "/"
