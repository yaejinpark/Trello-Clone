#Trello Clone on Mongoose and Angular

**NOTE: This app is created purely for academic purposes.

##Description

Trello Clone first started as a simple todo-list app that many new developers are familiar with. This app allows the user to create a board and multiple lists of todo-items within the board. The user may also invite a member (another user) to the board he/she created and let the member have access to the contents of the board. Once user has access to the board, he/she is free to make how many board/lists/todo items as he/she pleases.

##How To Run App

Make sure you have all of the directories in todo-angular-mongoose.

#####Express Server:
cd all the way to 'mytodoupgrade' folder. This folder contains all of the back-end side code of the app. Type and enter 'node app.js' and if you are successful, you should get the following message in your terminal: 'Listening to port 3000'

#####Angular Server: 
cd all the way to 'mytodo' folder. This folder contains all of the front-end side code of the app. Type and enter 'gulp serve' and if you are successful, you should see the app running in your default browser with the following page rendered:

![Alt text](signin.png "Sign In Page of the App")

##How To Run Test:

#####Express Test:
In app.js, comment out line 106 (app.listen(3000)) and then run the server.
Open another tab in your terminal and make sure the directory in the new terminal window is still 'mytodoupgrade'. Type in 'jasmine' to run all the spec files within the directory.  

#####Angular Test:

##Future Updates