<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckCircleOutline } from "@mdi/js";
import { mdiCheckCircle } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { mdiPencil } from "@mdi/js";

const props = defineProps(["text", "completed", "id"]);
</script>

<template>
  <div class="grid grid-cols-todos gap-1 mb-5 pb-5 border-b border-slate-200">
    <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
    <p>{{ text }}</p>
    <svg-icon type="mdi" :path="mdiPencil"></svg-icon>
    <svg-icon
      type="mdi"
      :path="mdiDelete"
      @click="$emit('deleteTodo', id)"
    ></svg-icon>
  </div>
</template>
