var timer = null;
var interval = null;

/* TODO: Currently using 2 hardcoded timer objects.  Need to make
// a "TeamsArray[]" that can be iterated through.  By default, 
// Red and Blue Team Timers can be added along with others later. */
var redTimer = null;
var blueTimer = null;

const intervalRefreshValue = 1000;

// TODO: Rename this object
// Constructor for a timeObject
function timeObject (teamName) {
    this.teamName = teamName;
    this.isActive = false;
    this.timerStartedAt = null;
    this.elapsedTimeInSeconds = 0;
}

module.exports = {
    startTimer: function (teamName) {
        init();
        return startTimerForTeam(teamName);
    },
    getRedTeamTimer: function() {
        return redTimer;
    },
    getBlueTeamTimer: function() {
        return blueTimer;
    },
    resetAndStopTimers: function() {
        return resetAndStopTimers();
    }
};

var init = function () {
    if (redTimer == null) {
        redTimer = new timeObject('Red');
    }
    if (blueTimer == null) {
        blueTimer = new timeObject('Blue');
    }
};

var getTimeInSeconds = function (time) {
    console.info(`getting time in sec for: ${time}`);
    return time / 1000;
};

var getTimeDifferenceInSeconds = function (time) {
    var diff = (Date.now() - time) / 1000;
    return diff;
};

// TO DO: Break apart this function.  It's doing too many actions.
var startTimerForTeam = function (teamName) {
    var activeTimerObject = null;
    var alternateTimerObject = null;

    if (teamName == 'Red') {
        activeTimerObject = redTimer;
        alternateTimerObject = blueTimer;
    } else {
        activeTimerObject = blueTimer;
        alternateTimerObject = redTimer;
    }

    alternateTimerObject.isActive = false;
    activeTimerObject.isActive = true;
    activeTimerObject.timerStartedAt = Date.now();
    clearInterval(interval);
    startTimerInterval(activeTimerObject);  
    return activeTimerObject;
};

var startTimerInterval = (teamTimer) => {
    interval = setInterval(() => {
        // This isn't the most accurate way of tracking elapsed time
        // but is sufficient for now. 
        teamTimer.elapsedTimeInSeconds++; 
        console.info(teamTimer);
    }, intervalRefreshValue);
};

// TODO: Rename
var resetAndStopTimers = function () {
    try {
        redTimer.isActive = false;
        redTimer.elapsedTimeInSeconds = 0;

        blueTimer.isActive = false;
        blueTimer.elapsedTimeInSeconds = 0;
        clearInterval(interval);
        return true;
    } catch (error) {
        console.log(`Error in resetAndStopTimers: ${error}`);
    }
};