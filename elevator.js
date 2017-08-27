export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = [];
    this.history = [];
    this.direction = [];
    this.currentRiders = [];
    this.numOfStops = 0;
  }

  reset() {
    this.currentFloor = 0;
    this.requests = [];
    this.history = [];
    this.currentRiders = [];
    this.numOfStops = 0;
  }

  goToFloor(user) {
    return new Promise((res, rej) => {
      this.requests.push(user.currentFloor, user.dropOffFloor);
      this.direction.push(this.getDirection(user), 'stop');
      this.currentRiders.push(user);
      this.time = new Date(Date.now()).getHours();
      res();
    })
    .then(() => {
      if (this.requests.length) {
        this.moveElevator()
      }
    })
  }

  returnToLobby() {
    this.currentFloor = 0;
    this.history.push(0);
    this.numOfStops += 1;;
  }

  moveElevator() {
    while (this.requests.length) {
      const targetFloor = this.requests.shift();
      const direction = this.direction.shift();

      this.currentRiders.shift();
      this.currentFloor = targetFloor;
      this.history.push(targetFloor);
      this.numOfStops = this.history.length;
    }

    if (this.time < 12 ) {
      this.returnToLobby();
    }
  }

  getDirection({ currentFloor, dropOffFloor }) {
    if (currentFloor > dropOffFloor) {
      return 'down';
    }
    return 'up';
  }
}
