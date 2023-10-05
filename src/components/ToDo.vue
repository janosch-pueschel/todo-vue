<script setup>
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiCheckCircleOutline,
  mdiCheckCircle,
  mdiDelete,
  mdiPencil,
} from "@mdi/js";

defineProps(["todo"]);

const todoEditor = ref(false);
function openTodoEditor() {
  todoEditor.value = !todoEditor.value;
}
</script>

<template>
  <div
    class="grid grid-cols-todos gap-1 mb-5 pb-5 border-b last:border-0 border-slate-200"
  >
    <div>
      <!-- better: render svg as button -->
      <svg-icon
        type="mdi"
        :path="todo.completed ? mdiCheckCircle : mdiCheckCircleOutline"
        class="my-1 mx-2 cursor-pointer"
        :class="{
          'text-zinc-300 hover:text-blue-400': !todo.completed && !todoEditor,
          'text-blue-400': todo.completed,
        }"
        @click="$emit('toggleComplete', todo.id)"
      ></svg-icon>
    </div>
    <div>
      <input
        v-if="todoEditor"
        type="text"
        class="w-full border appearance-none focus:outline-none italic border-none rounded bg-zinc-100 py-1 px-2"
        :value="text"
        @keydown.enter="openTodoEditor"
        @change="$emit('updateTodo', $event, todo.id)"
      />
      <p
        v-if="!todoEditor"
        class="py-1 px-2"
        :class="{ 'line-through': todo.completed }"
      >
        {{ todo.text }}
      </p>
    </div>
    <div>
      <svg-icon
        v-show="!todo.completed"
        type="mdi"
        :path="mdiPencil"
        class="my-1 mx-2 cursor-pointer hover:text-zinc-800"
        :class="{ 'text-zinc-800': todoEditor, 'text-zinc-300': !todoEditor }"
        @click="openTodoEditor"
      ></svg-icon>
    </div>
    <svg-icon
      type="mdi"
      :path="mdiDelete"
      class="my-1 mx-2 cursor-pointer text-zinc-300 hover:text-zinc-800"
      @click="$emit('deleteTodo', todo.id)"
    ></svg-icon>
  </div>
</template>
