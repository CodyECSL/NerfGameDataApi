var timer = null;

function timeObject (teamName) {
    this.teamName = teamName;
    this.isStarted = false;
    this.timerStartedAt = null;
    this.elapsedTimeInSeconds = null;
}

var redTimer = null;
var blueTimer = null;

module.exports = {
    startTimer: function (teamName) {
        init();
        return startTimerForTeam(teamName);
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

var startTimerForTeam = function (teamName) {
    var teamTimerObject = teamName == 'Red' ? redTimer : blueTimer;

    if (!teamTimerObject.isStarted)
    {
        teamTimerObject.isStarted = true;
        teamTimerObject.timerStartedAt = Date.now();
    } else {
        teamTimerObject.elapsedTimeInSeconds += getTimeDifferenceInSeconds(teamTimerObject.timerStartedAt);
    }    
    console.info(JSON.stringify(teamTimerObject));
};