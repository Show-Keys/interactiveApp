export interface MusicPlayerOptions {
  src: string;
  volume?: number;
  enabled?: boolean;
}

export function createLoopingMusicPlayer(options: MusicPlayerOptions) {
  const volume = typeof options.volume === 'number' ? options.volume : 0.2;
  let enabled = options.enabled ?? true;
  let startedOnce = false;

  const audio = new Audio(options.src);
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = volume;

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

  return { start, ensureStarted, pause, stop, setEnabled, getEnabled, setVolume };
}
