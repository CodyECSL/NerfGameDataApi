# NerfGameDataApi

Node and Express JS server that tracks current progress of different game types.  This is designed for the DFW Nerf group.

# Other Games Types
As of now, this is currently set to track data for a King of the Hill game type but other game types are desired.  Examples of these are:

Seals: 
- Name of every Seal player
- Lives of each Seal
- Remaining time

Bomb Run:
- Time remaining to place bomb before round is over.
- Alert when bomb is placed
- Time remaining before bomb is set off

# Desired Future Features
- Integrate a DB (e.g. Mongo) that can track data for multiple matches
- Create a Router file for each game type
- QR Code Generation: Server will create a QR code for a new game.  Users can scan the QR Code to join the new game and sync with the server.
- Create User Profile so Server and Users can view their data over time. This would also help subsribe a user to a game when scanning a QR code
- Add more game types

# How to start
1. Ensure Node is installed on your machine.
2. Navigate to the project folder in your Terminal/Command Prompt.
3. Run "npm install" and wait several secconds.  This will look at the package.json file and install all dependencies.
4. Run "node Server.js" (If doing development, instead run "nodemon Server.js" to automatically restart the server upon file changes.)

This will try to start the server based on an automatically assigned Port (e.g. Heroku) or will default to 3000.

# Deployment
This Node project can be deployed on a free instance in Heroku.  For now, individual groups can deploy their own instance of the API to track their group's games.  In the future, a DB will be included to allow multiple groups to use the same instance of the API.
