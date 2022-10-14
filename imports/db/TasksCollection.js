import { Mongo } from 'meteor/mongo';
 
// Create a MongoDB collection with all the methods inherited by Mongo.Collection object from Meteor
export const TasksCollection = new Mongo.Collection('tasks');