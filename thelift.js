(function(){
    // console.log("hi");

    // template
    // let MyQueue = 
    // let MyCapacity = 

    // let MyQueue = [[8, 8, 6], [8, 3, 4, 7], [], [2, 6, 8, 5], [], [0, 8, 8, 4, 1], [], [3, 2, 2, 3], []]
    // let MyCapacity = 9;

    // up
    // let MyQueue = [
    //     [], // G
    //     [], // 1
    //     [5,5,5], // 2
    //     [], // 3
    //     [], // 4
    //     [], // 5
    //     [], // 6
    //   ];
    // let MyCapacity = 5;

    // down
    // let MyQueue = [
    //     [], // G
    //     [], // 1
    //     [1,1], // 2
    //     [], // 3
    //     [], // 4
    //     [], // 5
    //     [], // 6
    //   ];
    // let MyCapacity = 5

    // // up and up
    // let MyQueue = [
    //     [], // G
    //     [3], // 1
    //     [4], // 2
    //     [], // 3
    //     [5], // 4
    //     [], // 5
    //     [], // 6
    //   ];
    // let MyCapacity = 5;

    // down and down
    // let MyQueue = [
    //   [], // G
    //   [0], // 1
    //   [], // 2
    //   [], // 3
    //   [2], // 4
    //   [3], // 5
    //   [], // 6
    // ];
    // let MyCapacity = 5

    // Yo-Yo
    let MyQueue = [ [], [], [ 4, 4, 4, 4 ], [], [ 2, 2, 2, 2 ], [], [] ];
    let MyCapacity = 2;

    console.log(lift(MyQueue, MyCapacity));

    function lift(queues, capacity){

        // console.log(queues); // debugging
        // console.log(capacity); // debuggin
        let elevator = {
            newQueue : queues,
            calls : {}, // keep track of floors that still have people (key, value)~(floor, 1)
            up : true, // indicating if elevator is going up (or down)
            currentFloor : 0, // what floor is the elivator at
            riders : {}, // who is on the elivator (key, value)~(pasenger type, number of that type)
            totalRiders : 0, // how many riders are currently on the elivator
            riderCap : capacity, // keep track of capacity
            floorHistory : [],
            // function to handle if we need to come back to a floor
            addCall : function(floor){
                if( !(floor in this.calls) ){
                    this.calls[floor] = 1
                }
            },
            removeCall : function(floor){
                if( floor in this.calls ){
                    delete this.calls[floor];
                }
            },
            // will be used to see if any more floors need to be visited
            // if it returns 0 ... then we have more people to get
            callsLength : function(){
                return Object.keys(this.calls).length;
            },
            // hard adds a rider
            addRider : function(wantingRider){
                if (this.totalRiders < this.riderCap){
                    if(wantingRider in this.riders){
                        this.riders[wantingRider] = this.riders[wantingRider] + 1;
                    }
                    else{
                        this.riders[wantingRider] = 1;
                    }
                    this.totalRiders = this.totalRiders + 1;
                    return true
                }
                return false;
            },
            // adds a rider if the elevator direction is ok
            // and if there is room on the elevator
            // takes an array of people needing rides
            addRiderBar : function(wantingRiderBar){
                let index = 0;
                let addedRider = false;
                while( index < wantingRiderBar.length ){
                    if( ( this.up && (wantingRiderBar[index] > this.currentFloor) ) || ( !(this.up) && (wantingRiderBar[index] < this.currentFloor) ) ){
                        addedRider = true; // if someone was able to at least call the elevator, return true
                        if(this.addRider(wantingRiderBar[index])){
                            
                            wantingRiderBar.splice(index,1);
                        }
                        else{
                            index = index + 1;
                        }
                    }
                    else{
                        index = index + 1;
                    }
                }
                return addedRider;
            },
            // removes all riders that match a particular floor
            removeRider : function(floor){
                if(floor in this.riders){
                    this.totalRiders = this.totalRiders - this.riders[floor];
                    delete this.riders[floor];
                    return true;
                }
                return false;
            },
            // debugging
            showCurrentQueue : function(){
                for(let i = this.newQueue.length -1; i >= 0; i--){
                    console.log(i +" : "+ this.newQueue[i]);
                }
            },
            visitFloor : function(floor){
                // note the current floor
                this.currentFloor = floor;
                // did anyone get off or on (in that order)
                let addFloor = false; // did we do anything on this floor
                // see if anyone needs off
                if(this.removeRider(floor) == true){
                    addFloor = true;
                }
                // see if anyone needs to get on
                if(this.addRiderBar(this.newQueue[floor]) == true){
                    addFloor = true;
                }
                // if we used the floor add it to our floorHistory
                if(addFloor == true){
                    this.addFloor(floor);
                }

                // are there any people still needed rides on this floor
                if(this.newQueue[floor].length > 0){
                    this.addCall(floor);
                }
                else{
                    this.removeCall(floor);
                }

            },
            addFloor : function(floor){
                if(this.floorHistory[this.floorHistory.length - 1] != floor){
                    this.floorHistory.push(floor);
                }
            },
            goUpThenDown : function(){
                this.addFloor(0);
                do{
                    // go up
                    this.up = true;
                    for(let i = 0; i < this.newQueue.length; i++){
                        this.visitFloor(i);

                    }

                    // go down
                    this.up = false;
                    for(let i = this.newQueue.length - 1; i >= 0; i--){
                        this.visitFloor(i);

                    }

                }
                while(this.callsLength() > 0)
                this.addFloor(0);
            },


        };

        elevator.goUpThenDown();

        return elevator.floorHistory;
    }
})();