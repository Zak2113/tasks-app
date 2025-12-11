<script setup lang="ts">
import { FetchError} from "ofetch";
import { id } from "zod/locales";

const errorMessage = ref("");
const loading = ref(false);

const taskName = ref("");

async function onSubmit() {
    if (!taskName.value.trim()) {
        errorMessage.value = "Task name is required";
        return;
    }
    try{
    loading.value = true;
    errorMessage.value = "";
    const result = await $fetch('/api/tasks', {
            method: 'POST',
            body: {
                title: taskName.value,
            }, 
        });
        navigateTo({
            name: "tasks-id",
            params: {id: result.created?.id,}
        })
    }
    catch (e){
        const error = e as FetchError;
        errorMessage.value = error.statusMessage || "Unknown error";
    }
    loading.value = false;
}

</script>


<template>
    <div>
        <article v-if="loading" aria-busy/>
        <article class="error" v-else-if="errorMessage">
            {{ errorMessage }}
        </article>
        
        <form @submit.prevent="onSubmit">
            <label>
                Task
                <input v-model="taskName" name="title">
            </label>
            <div class="button-container">
                <button>Create</button>
            </div>
        </form>
    </div>
</template>