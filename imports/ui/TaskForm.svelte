<script>
    import { Meteor } from 'meteor/meteor';

    let newTask = '';

    // Handle submitting a new task to be added
    const handleSubmit = () => {
        if (!newTask) return;

        // Insert new task into the database
        Meteor.call('tasks.insert', newTask);

        // Clear form
        newTask = '';
    }
</script>

<!-- Input box for new tasks -->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
<input
        type="text"
        name="text"
        placeholder="Type to add new tasks"
        bind:value={newTask}
/>

<!-- Add task button -->
<button type="submit">Add Task</button>
</form>