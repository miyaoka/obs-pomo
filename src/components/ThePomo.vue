<script setup lang="ts">
import { usePomo } from "@/composable/usePomo";
import { computed, ref } from "vue";

const closing = ref<HTMLAudioElement | null>(null);
const opening = ref<HTMLAudioElement | null>(null);

const { timeLeft, isWorking, playNext } = usePomo({
  workTime: 50 * 60,
  breakTime: 10 * 60,
  opening,
  closing,
});

const formedTime = computed(() => {
  const intLeftTime = Math.ceil(timeLeft.value / 1000);
  const mm = String(Math.floor(intLeftTime / 60));
  const ss = String(Math.floor(intLeftTime % 60));

  return `${mm.padStart(2, "0")}:${ss.padStart(2, "0")}`;
});
</script>

<template>
  <audio src="/src/assets/weather_tomorrow.mp3" ref="closing" />
  <audio src="/src/assets/日常系アニメ風ジングル.mp3" ref="opening" />
  <div class="currentMode">{{ isWorking ? "work" : "break" }}</div>
  <div class="timeLeft">{{ formedTime }}</div>

  <button @click="playNext">skip</button>
</template>

<style scoped>
.currentMode {
  font-weight: 700;
  font-size: 60px;
  color: #fff;
}

.timeLeft {
  font-weight: 700;
  font-size: 96px;
  color: #fff;
}
</style>
