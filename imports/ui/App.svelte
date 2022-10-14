<script>
    import Task from './Task.svelte';
    import { TasksCollection } from '../db/TasksCollection';
    import TaskForm from './TaskForm.svelte';
    import { Meteor } from 'meteor/meteor';
    import LoginForm from './LoginForm.svelte'

    let hideCompleted = false;
    let sortByName = false;
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const logout = () => Meteor.logout();

    let incompleteCount;
    let pendingTasksTitle = '';
    let tasks = [];

    let user = null;

    let isLoading = true;
    const handler = Meteor.subscribe('tasks');

    const setHideCompleted = value =>  {
        hideCompleted = value;
    };

    const setSortByName = value => {
        sortByName = value;
    };

    $m:{ 
        user = Meteor.user();

        if (user) {
            isLoading = !handler.ready();

            const userFilter = user ? { userId: user._id } : {};
            const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

            tasks =  sortByName ? TasksCollection.find(
                hideCompleted ? hideCompletedFilter : {}, { sort: { text: 1 } }
                ).fetch() : TasksCollection.find(
                hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }
            ).fetch()

            incompleteCount = TasksCollection.find(pendingOnlyFilter).count()

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
        {#if user}
            <div class="user" on:click={logout}>
                {user.username} 🚪
            </div>
            <TaskForm />

            <div class="filter">
                <button on:click={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>

            <div class="filter">
                <button on:click={() => setSortByName(!sortByName)}>
                    {sortByName ? 'Sort By Date Added' : 'Sort By Name'}
                </button>
            </div>

            {#if isLoading}
                <div class="loading">loading...</div>
            {/if}

            <ul class="tasks">
                {#each tasks as task (task._id)}
                    <Task task={task} />
                {/each}
            </ul>
        {:else}
            <LoginForm />
        {/if}
    </div>
</div>