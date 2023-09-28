<script setup>
import { ref, watch, onMounted } from "vue";
import { nanoid } from "nanoid";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import Todos from "./components/Todos.vue";
import Header from "./components/Header.vue";

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
    todos.value.unshift(newTodoItem);
    userInput.value = "";
  }
}

function markComplete(id) {
  todos.value = todos.value.map((todo) => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  });
}

function updateTodo(event, id) {
  todos.value = todos.value.map((todo) => {
    return todo.id === id ? { ...todo, text: event.target.value } : todo;
  });
}

function deleteTodo(id) {
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
}

const initCompletedTodos = localStorage.getItem("completedTodos");
const completedTodos = ref(
  initCompletedTodos ? JSON.parse(initCompletedTodos) : NaN
);

watch(
  todos,
  () => {
    let todosDone = 0;
    todos.value.forEach((todo) => {
      todo.completed ? (todosDone += 1) : (todosDone += 0);
    });
    const percent = Math.round((todosDone / todos.value.length) * 100);
    completedTodos.value = percent;
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(completedTodos.value)
    );
  },
  { deep: true }
);
</script>

<template>
  <div>
    <Header :completed-todos="completedTodos" />
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
          <svg-icon
            type="mdi"
            :path="mdiPlus"
            @click="addTodo"
            class="cursor-pointer"
          ></svg-icon>
        </div>
      </div>
      <div class="w-4/6 mt-10">
        <Todos
          v-for="todo in todos"
          :key="todo.id"
          :text="todo.text"
          :completed="todo.completed"
          :id="todo.id"
          @mark-complete="markComplete"
          @delete-todo="deleteTodo"
          @update-todo="updateTodo"
        />
      </div>
    </div>
  </div>
</template>
