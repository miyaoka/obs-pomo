import { useTimestamp, useUrlSearchParams } from "@vueuse/core";
import { computed, ref, watch, type Ref } from "vue";

type Options = {
  workTime?: number;
  breakTime?: number;
  volume?: number;
  opening: Ref<HTMLAudioElement | null>;
  closing: Ref<HTMLAudioElement | null>;
};

const defaultOptions = {
  workTiem: 25 * 60, // sec
  breakTime: 5 * 60, // sec
  volume: 0.5,
};

const ms = 1000;

const getNow = () => new Date().getTime();

export const usePomo = (options: Options) => {
  const { timestamp, resume, pause } = useTimestamp({ controls: true });

  const workTime = (options.workTime ?? defaultOptions.workTiem) * ms;
  const breakTime = (options.breakTime ?? defaultOptions.breakTime) * ms;
  const volume = options.volume ?? defaultOptions.volume;

  const startTime = ref(getNow());
  const pauseTime = ref(getNow());
  const isWorking = ref(true);
  const isPlaying = ref(false);

  const targetTime = computed(() => (isWorking.value ? workTime : breakTime));

  const elapsedTime = computed(() => {
    return timestamp.value - startTime.value;
  });
  const timeLeft = computed(() => {
    return targetTime.value - elapsedTime.value;
  });

  const play = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.volume = volume;
    audio.play();
  };

  const playNext = () => {
    play(isWorking.value ? options.closing.value : options.opening.value);

    startTime.value = pauseTime.value = getNow();
    isWorking.value = !isWorking.value;
    if (!isPlaying.value) {
      // timestampを一度更新させる
      resume();
      pause();
    }
  };

  const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
  };

  watch(
    isPlaying,
    (curr) => {
      if (curr) {
        resume();
        startTime.value += getNow() - pauseTime.value;
      } else {
        pause();
        pauseTime.value = getNow();
      }
    },
    {
      immediate: true,
    }
  );

  watch(timeLeft, (left) => {
    if (left > 0) return;

    playNext();
  });

  return {
    timeLeft,
    isWorking,
    isPlaying,
    playNext,
    togglePlay,
  };
};
