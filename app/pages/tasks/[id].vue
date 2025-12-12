<script setup lang="ts">
import { FetchError } from "ofetch";

const taskName = ref("");
const errorMessage = ref("");
const loading = ref(false);

const route = useRoute();
const { data: task, error, status } = await useFetch(`/api/tasks/${route.params.id}`, {
    lazy: true,
});

async function onSubmit() {
    if (!taskName.value.trim()) {
        errorMessage.value = "Task name is required";
        return;
    }
    try {
        loading.value = true;
        errorMessage.value = "";
        const result = await $fetch(`/api/tasks/${route.params.id}`, {
            lazy: true,
            method: 'PUT',
            body: {
                title: taskName.value,
            },
        });
        navigateTo({
            name: "tasks-id",
            params: { id: result.updated?.id, }
        })
        task.value = result.updated;
        taskName.value = "";
    }
    catch (e) {
        const error = e as FetchError;
        errorMessage.value = error.statusMessage || "Unknown error";
    }
    loading.value = false;
}

async function onDelete() {
    try {
        loading.value = true;
        errorMessage.value = "";
        
        await $fetch(`/api/tasks/${route.params.id}`, {
            method: 'DELETE',
        });
        navigateTo({ name: "index" });
    } catch (e) {
        const error = e as FetchError;
        errorMessage.value = error.statusMessage || "Unknown error";
    }
    loading.value = false;
}

</script>

<template>
    <div>
        <article v-if="status === 'pending'" aria-busy="true" />
        <article v-else-if="error" class="error">
            {{ error.statusMessage }}
        </article>
        <div v-else-if="task">
            <article>
                {{ task.title }}

                <div class="button-container">
                    <button v-if="loading" aria-busy="true" @click="onDelete">Deleting...</button>
                    <button v-else @click="onDelete">Delete</button>
                </div>
                
                <div>
                <form @submit.prevent="onSubmit">
                    <label>
                        Task
                        <input v-model="taskName" name="title" placeholder="Update with a new task">
                    </label>
                    <article class="error" v-if="errorMessage">
                            {{ errorMessage }}
                    </article>
                    <div class="button-container">
                        <button v-if="loading" aria-busy="true">Updating...</button>
                        
                        <button v-else>Update</button>
                    </div>
                    
                </form>
                </div>
            </article>
        </div>
    </div>
</template>