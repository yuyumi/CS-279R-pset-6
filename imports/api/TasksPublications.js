import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// Allows the server to publish the todos assigned to the user
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});