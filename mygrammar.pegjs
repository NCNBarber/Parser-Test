{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = multiplicitive

multiplicitive
  = whitespace? left:integer whitespace? "*" whitespace? right:multiplicitive whitespace? { return left * right }
  / additive

additive
  = whitespace? left:integer whitespace? "+" whitespace? right:additive whitespace? { return left + right }
  / integer

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }

whitespace
  = [ \t\n]+ { return; }
