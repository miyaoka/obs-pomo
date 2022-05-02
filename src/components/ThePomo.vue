<script setup lang="ts">
import { usePomo } from "@/composable/usePomo";
import { ref } from "vue";

const closing = ref<HTMLAudioElement | null>(null);
const opening = ref<HTMLAudioElement | null>(null);

const { timeLeft, isWorking } = usePomo({
  workTime: 0.5 * 60,
  breakTime: 0.5 * 60,
  opening,
  closing,
});
</script>

<template>
  <audio src="/src/assets/weather_tomorrow.mp3" ref="closing" />
  <audio src="/src/assets/日常系アニメ風ジングル.mp3" ref="opening" />
  <div class="currentMode">{{ isWorking ? "work" : "break" }}</div>
  <div class="timeLeft">{{ Math.ceil(timeLeft / 1000) }}</div>
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
