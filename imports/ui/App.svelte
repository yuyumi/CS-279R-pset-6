<script>
    import Task from './Task.svelte';
    import { TasksCollection } from '../db/TasksCollection';
    import TaskForm from './TaskForm.svelte';
    import { Meteor } from 'meteor/meteor';
    import LoginForm from './LoginForm.svelte'

    // Filtering features to display number of incomplete tasks or sort the tasks
    let hideCompleted = false;
    let sortByName = false;
    const hideCompletedFilter = { isChecked: { $ne: true } };

    // Logout function
    const logout = () => Meteor.logout();

    // Variable to keep track of pending tasks
    let incompleteCount;
    let pendingTasksTitle = '';
    let tasks = [];

    // User
    let user = null;

    // Loading handling
    let isLoading = true;
    const handler = Meteor.subscribe('tasks');

    // Functions to set variable values
    const setHideCompleted = value =>  {
        hideCompleted = value;
    };
    const setSortByName = value => {
        sortByName = value;
    };

    // $m means to dynamically render when variables are updated
    $m:{ 

        // Get the user
        user = Meteor.user();

        // If user is logged in
        if (user) {
            isLoading = !handler.ready();

            // Filters for userid and pending tasks
            const userFilter = user ? { userId: user._id } : {};
            const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

            // Get the tasks for the user sorted by date or name (determined by sort button)
            tasks =  sortByName ? TasksCollection.find(
                hideCompleted ? hideCompletedFilter : {}, { sort: { text: 1 } }
                ).fetch() : TasksCollection.find(
                hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }
            ).fetch()

            // Get the number of incomplete tasks
            incompleteCount = TasksCollection.find(pendingOnlyFilter).count()

            // Store the number of incomplete tasks into the title
            pendingTasksTitle = `${
                        incompleteCount ? ` (${incompleteCount})` : ''
            }`;
        }
        
        
    }
</script>


<div class="app">
    <header>
        <div class="app-bar">
            <div class="app-header">
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
            </div>
        </div>
    </header>

    <div class="main">
        <!-- If user is logged in -->
        {#if user}

            <!-- Logout button -->
            <div class="user" on:click={logout}>
                {user.username} 🚪
            </div>

            <!-- Input form for tasks -->
            <TaskForm />

            <!-- Hide Completed Tasks -->
            <div class="filter">
                <button on:click={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>

            <!-- Sort by Name or by Date Created -->
            <div class="filter">
                <button on:click={() => setSortByName(!sortByName)}>
                    {sortByName ? 'Sort By Date Added' : 'Sort By Name'}
                </button>
            </div>

            <!-- If the todos are loading from Mongo, have a default loading element -->
            {#if isLoading}
                <div class="loading">loading...</div>
            {/if}

            <!-- Render the tasks -->
            <ul class="tasks">
                {#each tasks as task (task._id)}
                    <Task task={task} />
                {/each}
            </ul>
        {:else}

            <!-- Login Form if the user is not logged in -->
            <LoginForm />
        {/if}
    </div>
</div>