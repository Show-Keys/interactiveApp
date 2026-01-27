export type SfxName = 'tap' | 'open' | 'close' | 'select';

export interface SfxPlayerOptions {
  enabled?: boolean;
  basePath?: string;
  volume?: number;
  files?: Partial<Record<SfxName, string>>;
}

const defaultFiles: Record<SfxName, string> = {
  tap: 'tap.mp3',
  open: 'open.mp3',
  close: 'close.mp3',
  select: 'select.mp3',
};

function joinUrl(basePath: string, fileName: string) {
  const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${normalizedBase}/${fileName}`;
}

export function createSfxPlayer(options: SfxPlayerOptions = {}) {
  const basePath = options.basePath ?? '/sfx';
  const files = { ...defaultFiles, ...(options.files ?? {}) };
  const volume = typeof options.volume === 'number' ? options.volume : 0.35;

  let enabled = options.enabled ?? true;
  const cache = new Map<SfxName, HTMLAudioElement>();

  const getAudio = (name: SfxName) => {
    const existing = cache.get(name);
    if (existing) return existing;

    const src = joinUrl(basePath, files[name]);
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = volume;
    cache.set(name, audio);
    return audio;
  };

  const preload = (names: SfxName[] = ['tap', 'open', 'close', 'select']) => {
    for (const name of names) {
      try {
        const audio = getAudio(name);
        audio.load();
      } catch {
        // ignore
      }
    }
  };

  const unlock = async (names: SfxName[] = ['tap']) => {
    for (const name of names) {
      try {
        const audio = getAudio(name);
        const previousVolume = audio.volume;
        audio.volume = 0;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = previousVolume;
      } catch {
        // Autoplay policy or WebView limitations.
      }
    }
  };

  const play = async (name: SfxName) => {
    if (!enabled) return;

    try {
      const audio = getAudio(name);
      audio.volume = volume;

      // If already playing, clone so rapid taps still produce feedback.
      const shouldClone = !audio.paused && audio.currentTime > 0;
      const target = shouldClone ? (audio.cloneNode(true) as HTMLAudioElement) : audio;
      target.volume = volume;
      target.currentTime = 0;
      await target.play();
    } catch {
      // Autoplay policy, missing file, or WebView limitations.
    }
  };

  const setEnabled = (value: boolean) => {
    enabled = value;
  };

  const getEnabled = () => enabled;

  const reinitialize = (names: SfxName[] = ['tap', 'open', 'close', 'select']) => {
    cache.clear();
    preload(names);
  };

  return { play, preload, unlock, reinitialize, setEnabled, getEnabled };
}
