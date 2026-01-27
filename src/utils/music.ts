export interface MusicPlayerOptions {
  src: string;
  volume?: number;
  enabled?: boolean;
}

export function createLoopingMusicPlayer(options: MusicPlayerOptions) {
  const volume = typeof options.volume === 'number' ? options.volume : 0.2;
  let enabled = options.enabled ?? true;
  let startedOnce = false;

  const createAudio = () => {
    const element = new Audio(options.src);
    element.preload = 'auto';
    element.loop = true;
    element.volume = volume;
    return element;
  };

  let audio = createAudio();

  const start = async () => {
    if (!enabled) return;

    try {
      audio.volume = volume;
      await audio.play();
      startedOnce = true;
    } catch {
      // Autoplay restrictions or missing file.
      // Important: do NOT mark started until a play() succeeds, otherwise
      // subsequent user gestures won't retry.
      startedOnce = false;
    }
  };

  const ensureStarted = async () => {
    if (startedOnce && !audio.paused) return;
    await start();
  };

  const stop = () => {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // ignore
    }
  };

  const pause = () => {
    try {
      audio.pause();
    } catch {
      // ignore
    }
  };

  const setEnabled = (value: boolean) => {
    enabled = value;
    if (!enabled) pause();
  };

  const getEnabled = () => enabled;

  const setVolume = (next: number) => {
    const clamped = Math.min(1, Math.max(0, next));
    audio.volume = clamped;
  };

  const preload = () => {
    try {
      audio.load();
    } catch {
      // ignore
    }
  };

  const unlock = async () => {
    try {
      const previousVolume = audio.volume;
      audio.volume = 0;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.volume = previousVolume;
    } catch {
      // Autoplay policy or WebView limitations.
    }
  };

  const reinitialize = () => {
    try {
      audio.pause();
    } catch {
      // ignore
    }
    startedOnce = false;
    audio = createAudio();
    preload();
  };

  return { start, ensureStarted, pause, stop, setEnabled, getEnabled, setVolume, preload, unlock, reinitialize };
}
