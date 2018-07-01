var timer = null;
const intervalRefreshValue = 1000;

function timeObject (teamName) {
    this.teamName = teamName;
    this.isActive = false;
    this.timerStartedAt = null;
    this.elapsedTimeInSeconds = 0;
}

var redTimer = null;
var blueTimer = null;

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
    console.info("getting time in sec for: " + time);
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

    if (!activeTimerObject.isActive)
    {
        activeTimerObject.isActive = true;
        activeTimerObject.timerStartedAt = Date.now();
        startTimerInterval(activeTimerObject);  
    }
    alternateTimerObject.isActive = false;
    return activeTimerObject;
};

var startTimerInterval = function (teamTimerObject) {
    var interval = setInterval(function () {
        console.info(teamTimerObject);
        if (teamTimerObject.isActive) {
            // This isn't the most accurate way of tracking elapsed time
            // but is sufficient for now. 
            teamTimerObject.elapsedTimeInSeconds++; 
        } else {
            console.info("Stopping timer for team: " + teamTimerObject.teamName);
            clearInterval(interval);
        }
    }, intervalRefreshValue);
};