<script setup>
import CircleProgress from "vue3-circle-progress";
const props = defineProps(["completedTodos"]);

const today = new Date();
const day = today.toLocaleString("en-us", { weekday: "long" });
const month = today.toLocaleString("default", { month: "short" });
const date = today.getDate();
const year = today.getFullYear();

const todaysDate = `${day}, ${month} ${date} ${year}`;
</script>
<template>
  <div
    class="flex justify-center py-16 bg-headertest bg-no-repeat bg-cover border-b-8 border-slate-100"
  >
    <div class="w-4/6 grid grid-cols-2 grid-rows-2 gap-10 text-slate-900">
      <div class="col-span-2">
        <h1 class="text-5xl font-normal">My ToDo-List</h1>
      </div>
      <div class="flex self-end">
        <p>{{ todaysDate }}</p>
      </div>
      <div class="flex justify-end items-end">
        <div class="w-14 h-14">
          <circle-progress
            v-show="!isNaN(completedTodos)"
            :percent="completedTodos"
            :viewport="true"
            empty-color="#fff"
            fill-color="#60a5fa"
            :size="50"
            :border-width="5"
            :border-bg-width="4"
            class=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
