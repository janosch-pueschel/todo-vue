<script setup>
import { ref, watch, computed } from "vue";
import { nanoid } from "nanoid";
import { mdiPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

import TemplateHeader from "./components/TemplateHeader.vue";
import ToDo from "./components/ToDo.vue";

const initTodos = localStorage.getItem("todos");
const todos = ref(initTodos ? JSON.parse(initTodos) : []);
const userInput = ref("");

watch(
  todos,
  (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
  { deep: true }
);

function addTodo() {
  if (userInput.value === "") {
    alert("Please enter your todo-item!");
  } else {
    const newTodoItem = {
      text: userInput.value,
      completed: false,
      id: nanoid(),
    };
    todos.value.unshift(newTodoItem); // better: use arr.push and sort in ToDo-component
    userInput.value = "";
  }
}

function toggleComplete(id) {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

function updateTodo(event, id) {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, text: event.target.value } : todo
  );
}

function deleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

const todoProgress = computed(() => {
  const todosDone = todos.value.filter((todo) => todo.completed);
  return (todosDone.length / todos.value.length) * 100;
});
</script>

<template>
  <div>
    <TemplateHeader :todo-progress="todoProgress" />
    <div class="flex flex-col items-center">
      <div class="w-11/12 sm:w-4/6 my-5 flex justify-center">
        <div
          class="flex w-11/12 sm:w-fit p-1 border-b border-slate-200 text-lg items-center"
        >
          <input
            class="w-full sm:w-96 mr-5 appearance-none focus:outline-none focus:bg-slate-200 rounded px-2 py-1"
            type="text"
            placeholder="Add Todo"
            v-model="userInput"
            @keydown.enter="addTodo"
          />
          <svg-icon
            type="mdi"
            :path="mdiPlus"
            @click="addTodo"
            class="cursor-pointer w-fit hover:border hover:border-slate-200 rounded"
          ></svg-icon>
        </div>
      </div>
      <div class="w-11/12 sm:w-4/6 mt-10">
        <ToDo
          v-for="todo in todos"
          :todo="todo"
          @toggle-complete="toggleComplete"
          @delete-todo="deleteTodo"
          @update-todo="updateTodo"
        />
      </div>
    </div>
  </div>
</template>
