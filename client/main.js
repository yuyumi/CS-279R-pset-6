import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

// Start the Meteor App
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});