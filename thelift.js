(function(){
    console.log("hi");

    let MyQueue = [[8, 8, 6], [8, 3, 4, 7], [], [2, 6, 8, 5], [], [0, 8, 8, 4, 1], [], [3, 2, 2, 3], []]
    let MyCapacity = 9

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
            calls : {},
            up : true,
            currentFloor : 0,
            riders : {},
            totalRiders : 0,
            addCall : function(floor){
                if( !(floor in this.calls) ){
                    this.calls[floor] = 0
                }
            },
            callsLength : function(){
                return Object.keys(this.calls).length;
            },
            addRider : function(wantingRider){
                if (this.totalRiders < capacity){
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
            // removeRider : function(floor){
            //     if(floor in )
            // }
        };
        
        for(let i = 0; i < queue.length; i++){
            console.log(queue[i].length + " " + (i in elevator.calls));
            if( (queue[i].length) > 0 ){
                elevator.addCall(i);
            }
        }

        // while(Object.keys(callOrder).length > 0){

        // }
        console.log(elevator.callsLength());

        

        return 1;
    }
})();