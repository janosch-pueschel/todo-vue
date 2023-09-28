<script setup>
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckCircleOutline } from "@mdi/js";
import { mdiCheckCircle } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { mdiPencil } from "@mdi/js";

const props = defineProps(["text", "completed", "id"]);

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
      <svg-icon
        v-if="completed"
        type="mdi"
        :path="mdiCheckCircle"
        color="#60a5fa"
        class="my-1 mx-2 cursor-pointer"
        @click="$emit('markComplete', id)"
      ></svg-icon>
      <svg-icon
        v-if="!completed && !todoEditor"
        type="mdi"
        :path="mdiCheckCircleOutline"
        class="my-1 mx-2 cursor-pointer text-zinc-300 hover:text-blue-400"
        @click="$emit('markComplete', id)"
      ></svg-icon>
    </div>
    <div>
      <input
        v-if="todoEditor"
        type="text"
        class="w-full border appearance-none focus:outline-none italic border-none rounded bg-zinc-100 py-1 px-2"
        :value="text"
        @keydown.enter="openTodoEditor"
        @change="$emit('updateTodo', $event, id)"
      />
      <p
        v-if="!todoEditor"
        class="py-1 px-2"
        :class="{ 'line-through': completed }"
      >
        {{ text }}
      </p>
    </div>
    <div>
      <svg-icon
        v-show="!completed"
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
      @click="$emit('deleteTodo', id)"
    ></svg-icon>
  </div>
</template>
