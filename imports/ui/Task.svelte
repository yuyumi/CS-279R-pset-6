<script>
    import { Meteor } from 'meteor/meteor';
  
    export let task;

    // Toggle completion status
    const toggleChecked = () =>
            Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

    // Remove the task
    const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
    <!-- Checkbox onclick toggles completion status -->
    <input
            type="checkbox"
            readonly
            checked={!!task.isChecked}
            on:click={toggleChecked}
    />

    <!-- Task name -->
    <span>{ task.text }</span>

    <!-- Delete button -->
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>