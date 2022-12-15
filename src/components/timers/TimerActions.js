export default { 
    'Tabata': {
        update: (item, toDeduct) => {
            // always make sure we dont remove so we get less than 0 left
            item.timeLeft = Math.max(item.timeLeft - toDeduct, 0);
            if (item.timeLeftInRound === 0 && item.restLeftInRound === 0) {
                item.roundsLeft = item.roundsLeft - 1;
                item.timeLeftInRound = item.originalTime;
                item.restLeftInRound = item.originalRest;
            } else if (item.timeLeftInRound <= 0) {
                item.restLeftInRound = Math.max(item.restLeftInRound - toDeduct, 0);
            } else {
                item.timeLeftInRound = Math.max(item.timeLeftInRound - toDeduct, 0);
            }
            item.timerDesc = item.timerDesc
            return item;
        },
        // run when the timer is finished
        finished: (item) => {
            item.timeLeftInRound = 0;
            item.restLeftInRound = 0;
            item.roundsLeft = 0;
            return item;
        },
        // run when the user clicks reset button
        reset: (item) => {
            item.timeLeftInRound = item.originalTime;
            item.restLeftInRound = item.originalRest;
            item.roundsLeft = item.originalRounds;
            return item;
        }
    },
    'XY': {
        update: (item, toDeduct) => {
            item.timeLeft = Math.max(item.timeLeft - toDeduct, 0);
            item.timeLeftInRound = Math.max(item.timeLeftInRound - toDeduct, 0);
            if (item.timeLeftInRound === 0) {
                item.roundsLeft = item.roundsLeft - 1;
                item.timeLeftInRound = item.originalTime;
            }
            item.timerDesc = item.timerDesc
            return item;
        },
        // run when the timer is finished
        finished: (item) => {
            item.timeLeftInRound = 0;
            item.roundsLeft = 0;
            return item;
        },
        // run when the user clicks reset button
        reset: (item) => {
            item.timeLeftInRound = item.originalTime;
            item.roundsLeft = item.originalRounds;
            return item;
        }
    },
    'Countdown': {
        update: (item, toDeduct) => {
            item.timeLeft = Math.max(item.timeLeft - toDeduct, 0);
            item.timerDesc = item.timerDesc
            return item;
        },
        // run when the timer is finished
        finished: (item) => item,
        // run when the user clicks reset button
        reset: (item) => item
    },
    'Stopwatch': {

        update: (item, toDeduct) => {
            item.timeLeft -= toDeduct; // how much time it has left until the stopwatch is done
            item.currentTime += toDeduct; // what to show, as the stopwatch counts upward
            item.timerDesc = item.timerDesc // // timer description
            return item;
        },
        // run when the timer is finished
        finished: (item) => item,
        // run when the user clicks reset button
        reset: (item) => {
            item.currentTime = 0;
            return item;
        }

} }