<script setup>
const props = defineProps(["completedTodos"]);
</script>
<template>
  <div
    class="flex justify-center py-16 bg-headertest bg-no-repeat bg-cover border-b-8 border-slate-100"
  >
    <div class="w-4/6 grid grid-cols-2 grid-rows-2 gap-10 text-slate-900">
      <div class="col-span-2">
        <h1 class="text-5xl font-normal">My ToDo-List</h1>
      </div>
      <div className="flex self-end">
        <p><!-- {todaysDate} --></p>
      </div>
      <div className="flex justify-end">
        <div className="w-14 h-14">
          <!-- {isNaN(props.completedTodos) ? 
            ( "" ) : 
            ( <CircularProgressbar
                value={props.completedTodos}
                text={`${props.completedTodos}%`}
                strokeWidth={10}
                styles={buildStyles({
                    textSize: "28px",
                    textColor: "#fff",
                    pathColor: "#60a5fa",
                    trailColor: "#fff", })} />
                    )} -->
        </div>
      </div>
    </div>
  </div>
</template>
