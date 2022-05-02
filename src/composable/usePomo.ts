import { useTimestamp } from "@vueuse/core";
import { computed, ref, watch, type Ref } from "vue";

type Options = {
  workingTime?: number;
  restTime?: number;
  opening: Ref<HTMLAudioElement | null>;
  closing: Ref<HTMLAudioElement | null>;
};

const defaultOptions = {
  workingTime: 25 * 60, // sec
  restTime: 5 * 60, // sec
};

const ms = 1000;

export const usePomo = (options: Options) => {
  const { timestamp, pause, resume } = useTimestamp({
    interval: 100,
    controls: true,
  });

  const workingTime = (options.workingTime ?? defaultOptions.workingTime) * ms;
  const restTime = (options.restTime ?? defaultOptions.restTime) * ms;

  const startTime = ref(new Date().getTime());
  const isWorking = ref(true);

  const targetTime = computed(() => (isWorking.value ? workingTime : restTime));

  const elapsedTime = computed(() => {
    return timestamp.value - startTime.value;
  });
  const timeLeft = computed(() => {
    return targetTime.value - elapsedTime.value;
  });

  const play = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.volume = 0.5;
    audio.play();
  };

  watch(timeLeft, (left) => {
    if (left > 0) return;

    play(isWorking.value ? options.closing.value : options.opening.value);

    startTime.value = new Date().getTime();
    isWorking.value = !isWorking.value;
  });

  return {
    timeLeft,
    isWorking,
  };
};
