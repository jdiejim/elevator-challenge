require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Person = require('../person').default;

describe('Person', function() {
  it('should have a name', () => {
    const person = new Person('Bruce', 1, 2);

    assert.equal(person.name, 'Bruce');
  });

  it('should have a current floor', () => {
    const person = new Person('Bruce', 1, 2);

    assert.equal(person.currentFloor, 1);
  });

  it('should have a a drop floor', () => {
    const person = new Person('Bruce', 1, 2);

    assert.equal(person.dropOffFloor, 2);
  });
});
