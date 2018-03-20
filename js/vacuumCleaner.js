
class State {
    constructor(location, property) {
        this.location = location;
        this.property = property;

        if (property === "Dirty") {
            d3.select("#" + location).transition()
                .style("background-color", "black");
        }
    }
    suck() {
        console.log("Clean");
        this.property = "Clean";
        d3.select("#" + this.location).transition()
            .style("background-color", "white");
    }
    print() {
        console.log(this.location + " - " + this.property);
    }
    equal(obj) {
        return this.location === obj.location && 
                this.property === obj.property
    }
}

var initialState = [new State("A","Dirty") , new State("B","Dirty")];

var goalState = [new State("A","Clean") , new State("B","Clean")];

function isDirty(states) {

    for (i = 0; i < states.length; i++) {
        //console.log(states[i].property);
        if (states[i].property === "Dirty") {
            return states[i];
        }
    }

    // states.forEach(element => {
    //     if (element.property === "Dirty") return element.location;
    // });

    console.log("Return null!");
    return null;
}

class agent {
    constructor(where) {
        this.where = where;
    }
    move() {
        console.log("Move");
        this.where = (this.where == "A" ? "B" : "A");
    }
};

function equalArrays(arrayA, arrayB) {

    if (arrayA.length !== arrayB.length) {
        return false;
    }

    for (i = 0; i < arrayA.length; i++) {
        if (!arrayA[i].equal(arrayB[i])) {
            return false;
        }
    }

    return true;
};

function agentFun(agent, states) {

    //while(!equalArrays(states,goalState)) {
    window.setInterval(function() {
        
        // states.forEach(item => {
        //     item.print()
        // });

        var dirtyState = isDirty(states);
        if (dirtyState === null) { 
            return true;
        }
        
        console.log("Agent where: " + agent.where);
        console.dir(JSON.parse(JSON.stringify(states)));
        if (agent.where === dirtyState.location) {
            dirtyState.suck();
        } else {
            agent.move();
        }

    }, 600);
}

function main() {
    console.log(initialState);
    
    
    agentFun(new agent("A"), initialState);
}