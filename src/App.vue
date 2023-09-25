<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import Todos from "./components/Todos.vue";

const todos = ref([]);
const userInput = ref("");

function addTodo() {
  if (userInput.value === "") {
    alert("Please enter your todo-item!");
  } else {
    const newTodoItem = {
      text: userInput.value,
      completed: false,
      id: nanoid(),
    };
    todos.value.unshift(newTodoItem);
    userInput.value = "";
  }
}

function deleteTodo(id) {
  console.log(todos.value);
  const updatedTodos = [];
  for (let i = 0; i < todos.value.length; i++) {
    const todo = todos.value[i];
    if (todo.id === id) {
      continue;
    } else {
      updatedTodos.push(todo);
    }
  }
  todos.value = updatedTodos;
  console.log(todos.value);
}
</script>

<template>
  <div>
    <!-- <Header /> -->
    <div class="flex flex-col items-center">
      <div class="w-4/6 my-5 flex justify-center">
        <div class="flex w-fit p-1 border-b border-slate-200 text-lg">
          <input
            class="appearance-none focus:outline-none w-96 mr-5"
            type="text"
            placeholder="Add Todo"
            v-model="userInput"
            @keydown.enter="addTodo"
          />
          <svg-icon type="mdi" :path="mdiPlus" @click="addTodo"></svg-icon>
        </div>
      </div>
    </div>
    <div class="w-4/6 mt-10">
      <Todos
        v-for="todo in todos"
        :key="todo.id"
        :text="todo.text"
        :completed="todo.completed"
        :id="todo.id"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>
