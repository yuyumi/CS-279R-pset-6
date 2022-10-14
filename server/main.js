import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/TasksMethods';
import '/imports/api/TasksPublications';

// Add a new task (serverside)
const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

// Default username and password
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

// Start the Meteor app on the server
Meteor.startup(() => {

  // Create a default user
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  // Find the default user
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // Create a default list of tasks for the user if there are none pre-existing
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});