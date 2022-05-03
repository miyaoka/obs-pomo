<script setup lang="ts">
import { usePomo } from "@/composable/usePomo";
import { useUrlSearchParams } from "@vueuse/core";
import { computed, ref } from "vue";

const closing = ref<HTMLAudioElement | null>(null);
const opening = ref<HTMLAudioElement | null>(null);

const params = useUrlSearchParams("history");

const parseParamString = (input: string | string[]) => {
  if (Array.isArray(input)) return undefined;
  if (!input) return undefined;
  return input;
};

const parseParamNumber = (input: string | string[]) => {
  const str = parseParamString(input);
  if (str == null) return str;

  const num = Number(input);
  if (isNaN(num)) return undefined;

  return num;
};

const parseParamTime = (input: string | string[]) => {
  const num = parseParamNumber(input);
  if (num == null) return undefined;

  return num * 60;
};

const { timeLeft, isWorking, playNext, togglePlay, isPlaying } = usePomo({
  opening,
  closing,
  volume: parseParamNumber(params.volume),
  workTime: parseParamTime(params.worktime),
  breakTime: parseParamTime(params.breaktime),
});

const workLabel = parseParamString(params.worklabel) ?? "work";
const breakLabel = parseParamString(params.breaklabel) ?? "break";

const formedTime = computed(() => {
  const intLeftTime = Math.floor(timeLeft.value / 1000);
  const mm = String(Math.floor(intLeftTime / 60));
  const ss = String(Math.floor(intLeftTime % 60));

  return `${mm.padStart(2, "0")}:${ss.padStart(2, "0")}`;
});

const currentLabel = computed(() => {
  return isWorking.value ? workLabel : breakLabel;
});
</script>

<template>
  <div
    class="container relative flex flex-col select-none leading-none items-center"
  >
    <div class="currentMode text-[120px] text-white font-bold">
      {{ currentLabel }}
    </div>
    <div class="timeLeft text-[192px] text-white font-bold">
      {{ formedTime }}
    </div>
    <div
      class="control absolute inset-0 flex items-center justify-center gap-8 bg-[rgba(0,0,0,.4)] opacity-0 hover:opacity-100"
    >
      <button @click="togglePlay" class="p-8 bg-white rounded-full text-4xl">
        {{ isPlaying ? "stop" : "play" }}
      </button>
      <button @click="playNext" class="p-8 bg-white rounded-full text-4xl">
        skip
      </button>
    </div>
  </div>

  <audio src="/audio/weather_tomorrow.mp3" ref="closing" />
  <audio src="/audio/日常系アニメ風ジングル.mp3" ref="opening" />
</template>

<style scoped></style>
