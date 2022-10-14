import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

// Meteor methods to verify the user can perform the requested action and then change the database accordingly
Meteor.methods({

  // Add a new task
  'tasks.insert'(text) {
    check(text, String);

    // If user requesting the action is not the user in the payload
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Insert a new task with the task name and id from the payload
    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    })
  },

  // Delete a task
  'tasks.remove'(taskId) {
    check(taskId, String);

    // If user requesting the action is not the user in the payload
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Find the task to be deleted
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // If not found, throw an error
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Remove the task
    TasksCollection.remove(taskId);
  },

  // Toggle completion status
  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    // If user requesting the action is not the user in the payload
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Find the task to be updated
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // If not found, throw an error
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Toggle the completion status
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});