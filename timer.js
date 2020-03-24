var interval = null;
var teamsArray = [new timeObject('Red'), new timeObject('Blue')];
var gameTimerInterval = null;
var gameTimeElapsed = 0.0;
var pointsToWin = 300;

const gameTimerIntervalRefreshValue = 500;
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
    setPointsToWin: function (points) {
        return setPointsToWin(points);
    },
    startTimer: function (teamName) {
        init();
        return startTimerForTeam(teamName);
    },
    startGameTimer: function () {
        // return teamsArray;
        return startGameTimer();
    },
    getTimerForTeam: function(teamName) {
        return getTimerForTeam(teamName);
    },
    resetTimers: function() {
        return resetTimers();
    },
    stopTimers: function() {
        return stopTimers();
    },
    addTeam: function (teamName) {
        return addTeam(teamName);
    },
    getAllTimers: function () {
        // return teamsArray;
        return returnListOfTeamData();
    },
    removeTeam: function (teamName) {
        return removeTeam(teamName);
    }
};

var init = function () {
    teamsArray.forEach(team => {
        console.info(team.teamName);
    });
};

var startGameTimer = function () {
    if (null == gameTimerInterval) {
        gameTimerInterval = setInterval(() => {
            gameTimeElapsed ++;
        }, intervalRefreshValue);
    }

};

var setPointsToWin = (points) => {
    points = parseInt(points);
    if (NaN != points) {
        console.info(`Setting points to: ${points}`)
        pointsToWin = points;
    }
    return `Points to win: ${pointsToWin}`
}

var addTeam = (teamName) => {
    if (findTeamByTeamName(teamName) == null) {
        teamsArray.push(new timeObject(teamName));
        return findTeamByTeamName(teamName);
    } else {
        return `A Team with the name of ${teamName} already exists!`;
    }
};

var findTeamByTeamName = (teamName) => {
    var _team = null;
    teamsArray.forEach(team => {
        if (team.teamName == teamName) {
            _team = team;
        }
    });
    return _team || null ;
};

var returnListOfTeamData = () => {
    let listOfTeams = {
        ElapsedGameTime: gameTimeElapsed,
        ElapsedGameTimeFormatted: getTimeFormatFromSeconds(gameTimeElapsed),
        PointsToWin: pointsToWin,
        Teams: []
        
    };
    teamsArray.forEach(team => {
        listOfTeams.Teams.push(team);
    });
    console.info(listOfTeams)
    // Sort the array based on Most Points descending
    teamsArray.sort((a,b) => a.elapsedTimeInSeconds < b.elapsedTimeInSeconds)
    return listOfTeams;
}

var getTimeInSeconds = function (time) {
    console.info(`getting time in sec for: ${time}`);
    return time / 1000;
};

var getTimeDifferenceInSeconds = function (time) {
    var diff = (Date.now() - time) / 1000;
    return diff;
};

var getTimeFormatFromSeconds = (seconds) => {
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(14, 5);
    return timeString;
}

// TO DO: Break apart this function.  It's doing too many actions.
var startTimerForTeam = function (teamName) {
    var activeTeam = null;

    teamsArray.forEach(team => {
        if (team.teamName == teamName) {
            activeTeam = team;
            team.isActive = true;
            team.timerStartedAt = Date.now();
        } else {
            deactivateTeam(team);
        }
    });

    clearInterval(interval);
    startTimerInterval(activeTeam);  
    startGameTimer();
    return activeTeam;
};

// TODO: Expound on what "deactivating" a team consists of.  If it's
// just marking the team as inactive, then remove this function.
var deactivateTeam = (teamTimer) => {
    teamTimer.isActive = false;
};

var startTimerInterval = (teamTimer) => {
    interval = setInterval(() => {
        // This isn't the most accurate way of tracking elapsed time
        // but is sufficient for now. 
        teamTimer.elapsedTimeInSeconds++; 
        console.info(teamTimer);
    }, intervalRefreshValue);
};

var resetTimers = function () {
    try {
        teamsArray.forEach(team => {
            team.elapsedTimeInSeconds = 0;
            team.isActive = false;
            team.timerStartedAt = null;
    });
        gameTimeElapsed = 0;
        return stopTimers();
    } catch (error) {
        console.log(`Error in resetTimers: ${error}`);
        return false;
    }
};

var stopTimers = () => {
    try {
        clearInterval(interval);
        clearInterval(gameTimerInterval);
        gameTimerInterval = null;
        return true;        
    } catch (error) {
        console.log(`Error in stopTimers: ${error}`);
        return false;
    }
}

var getTimerForTeam = (teamName) => {
    var teamFound = null;
    teamsArray.forEach(team => {
        if (team.teamName == teamName) {
            teamFound = team;
        }
    });
    return teamFound != null ? teamFound : `Team ${teamName} was not found.`;
};

var removeTeam = (teamNameToRemove) => {
    try {
        let newTeamsArray = [];
        let isTeamToRemoveFound = false;
        teamsArray.forEach(team => {
            if (team.teamName === teamNameToRemove) {
                console.log(`Removed ${teamNameToRemove}`);
                isTeamToRemoveFound = true;
            } else {
                newTeamsArray.push(team);
            }
        });

        if (isTeamToRemoveFound) {
            teamsArray = newTeamsArray;
            return true;
        }
        console.log(`Did not find team to remove: ${teamNameToRemove}`)
        return false;
    } catch (error) {
        console.log(`Error in removeTeam: ${error}`)
        return false;
    }
}