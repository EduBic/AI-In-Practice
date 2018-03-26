
class State {
    constructor(name) {
        this.name = name;
    }
}

class Action {

}


class Problem {
    constructor(initState, goalState) {
        this.initState = initState;
        this.goalState = goalState;
    }

    goalTest(state) {
        return state === this.goalState;
    }
};

class Node {
    constructor(state) {
        this.state = state;
    }
    
};