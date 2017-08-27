require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  beforeEach(function() {
    elevator.reset();
  });

  it.skip('should bring a rider to a floor above their current floor', () => {
    const user = new Person('Brittany', 2, 5);

    elevator.goToFloor(user);

    assert.equal(elevator.currentFloor, 5);
  });

  it.skip('should bring a rider to a floor below their current floor', () => {
    const user = new Person('Brittany', 8, 3);

    elevator.goToFloor(user);

    assert.equal(elevator.currentFloor, 3);
  });

  it.skip('should keep track of number of stops', () => {
    const user = new Person('Brittany', 8, 3);

    elevator.goToFloor(user);

    assert.equal(elevator.numOfStops, 2);
  });

  it.skip('should keep track of the floors it traversed', () => {
    const user = new Person('Brittany', 8, 3);

    elevator.goToFloor(user);

    assert.deepEqual(elevator.history, [8, 3]);
  });

  it.skip('should keep track of the floors it traversed', () => {
    const user = new Person('Brittany', 8, 3);

    elevator.goToFloor(user);

    assert.deepEqual(elevator.history, [8, 3]);
  });

  it.skip('should fill multiple requests', () => {
    const Bob = new Person('Bob', 3, 9);
    const Sue = new Person('Sue', 6, 2);

    elevator.goToFloor(Bob);
    elevator.goToFloor(Sue);

    assert.deepEqual(elevator.history, [3, 9, 6, 2]);
    assert.deepEqual(elevator.currentRiders, [Bob, Sue]);
    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.numOfStops, 4);
  });

  it.skip('should fill multiple requests scenario: person A up person B up', done => {
    const personA = new Person('A', 2, 5);
    const personB = new Person('B', 5, 2);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 14;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [2, 5, 5, 2]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [2, 5, 5, 2]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 2);
        assert.equal(elevator.numOfStops, 4);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });

  it('should fill multiple requests scenario: person A up person B down', done => {
    const personA = new Person('A', 2, 5);
    const personB = new Person('B', 5, 2);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 14;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [2, 5, 5, 2]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [2, 5, 5, 2]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 2);
        assert.equal(elevator.numOfStops, 4);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });

  it('should fill multiple requests scenario: person A down person B up', done => {
    const personA = new Person('A', 8, 5);
    const personB = new Person('B', 2, 5);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 14;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [8, 5, 2, 5]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [8, 5, 2, 5]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 5);
        assert.equal(elevator.numOfStops, 4);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });

  it('should fill multiple requests scenario: person A down person B down', done => {
    const personA = new Person('A', 8, 5);
    const personB = new Person('B', 2, 5);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 14;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [8, 5, 2, 5]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [8, 5, 2, 5]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 5);
        assert.equal(elevator.numOfStops, 4);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });

  it('should return to level 0 if there are no requests and time is before 12', done => {
    const personA = new Person('A', 3, 9);
    const personB = new Person('B', 10, 5);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 10;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [3, 9, 10, 5]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [3, 9, 10, 5, 0]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 0);
        assert.equal(elevator.numOfStops, 5);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });

  it('should stay on last level if there are no requests and time is after 12', done => {
    const personA = new Person('A', 3, 9);
    const personB = new Person('B', 10, 5);

    elevator.goToFloor(personA);
    elevator.goToFloor(personB);
    elevator.time = 14;

    new Promise(res => {
      assert.deepEqual(elevator.history, []);
      assert.deepEqual(elevator.currentRiders, [personA, personB]);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.numOfStops, 0);
      assert.deepEqual(elevator.requests, [3, 9, 10, 5]);
      res();
    })
      .then(() => {
        assert.deepEqual(elevator.history, [3, 9, 10, 5]);
        assert.deepEqual(elevator.currentRiders, []);
        assert.equal(elevator.currentFloor, 5);
        assert.equal(elevator.numOfStops, 4);
        assert.deepEqual(elevator.requests, []);
        done();
      });
  });
});
