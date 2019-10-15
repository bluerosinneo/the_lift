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
    let MyQueue = [
      [], // G
      [0], // 1
      [], // 2
      [], // 3
      [2], // 4
      [3], // 5
      [], // 6
    ];
    let MyCapacity = 5

    console.log(lift(MyQueue, MyCapacity));

    function lift(queue, capacity){
        // but .splice() might be better
        // .splice(location, #ofTimes)

        // test splice
        // let testSplice = [0,1,2,3,4,5];
        // console.log(testSplice);
        // console.log(testSplice.splice(2,1)[0]);
        // console.log(testSplice);

        // initial calls
        // idea is to make an order to visit floors
        // will use to tell if we are done
        let elevator = {
            newQueue : queue,
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
                    return true;
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
                        if(this.addRider(wantingRiderBar[index])){
                            addedRider = true;
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
            goUpThenDown : function(){
                this.floorHistory.push(0);
                do{
                    // go up
                    this.up = true;
                    for(let i = 0; i < this.newQueue.length; i++){
                        this.currentFloor = i;
                        // did anyone get off or on (in that order)
                        let addFloor = false;
                        if(this.removeRider(i) == true){
                            addFloor = true;
                        }
                        if(this.addRiderBar(this.newQueue[i]) == true){
                            addFloor = true;
                        }
                        if(addFloor == true){
                            this.floorHistory.push(i);
                        }

                        // are there any people still needed rides on this floor
                        if(this.newQueue[i].length > 0){
                            this.addCall(i);
                        }
                        else{
                            this.removeCall(i);
                        }

                        // console.log(this.riders);
                    }

                    // go down
                    this.up = false;
                    for(let i = this.newQueue.length - 1; i >= 0; i--){
                        this.currentFloor = i;
                        // did anyone get off or on (in that order)
                        let addFloor = false;
                        if(this.removeRider(i) == true){
                            addFloor = true;
                        }
                        if(this.addRiderBar(this.newQueue[i]) == true){
                            addFloor = true;
                        }
                        if(addFloor == true){
                            this.floorHistory.push(i);
                        }

                        // are there any people still needed rides on this floor
                        if(this.newQueue[i].length > 0){
                            this.addCall(i);
                        }
                        else{
                            this.removeCall(i);
                        }

                    }

                    // console.log(this.calls);
                    // console.log(this.floorHistory)

                }
                while(this.callsLength() > 0)
                this.floorHistory.push(0);
            },


        };

        elevator.goUpThenDown();
        // console.log(elevator.floorHistory);

        // let testRiders = [0,9,1,8,2,7,3,6,4,5];
        // elevator.currentFloor = 5
        // elevator.riderCap = 4
        // elevator.up = false;

        // console.log(testRiders);
        // elevator.addRiderBar(testRiders);

        // console.log(elevator.riders);
        // console.log(elevator.totalRiders);

        // console.log(testRiders);

        // elevator.removeRider(1);

        // console.log(elevator.riders);
        // console.log(elevator.totalRiders);

        // elevator

        


        

        return elevator.floorHistory;
    }
})();