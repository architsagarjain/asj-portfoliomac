/**
 * Tiny synthesised UI sounds. No audio files: every cue is a couple of
 * oscillators, so this costs nothing to ship and nothing to load.
 *
 * Browsers refuse to start audio before a user gesture, so the context is
 * created lazily on the first real click and stays warm after that.
 */

type Cue = 'click' | 'open' | 'close' | 'tap';

const STORAGE_KEY = 'asj:muted';

let ctx: AudioContext | null = null;
let muted =
  typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(
  ac: AudioContext,
  at: number,
  from: number,
  to: number,
  dur: number,
  peak: number,
  type: OscillatorType = 'triangle'
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, at);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, at + dur);

  // A quick ramp in and a smooth tail keeps it from sounding like a pop.
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);

  osc.connect(gain).connect(ac.destination);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

export function play(cue: Cue) {
  if (muted) return;
  const ac = context();
  if (!ac) return;
  const t = ac.currentTime;

  switch (cue) {
    case 'click':
      tone(ac, t, 1180, 900, 0.05, 0.05);
      break;
    case 'tap':
      tone(ac, t, 760, 640, 0.045, 0.038);
      break;
    case 'open':
      tone(ac, t, 523.25, 659.25, 0.1, 0.045);
      tone(ac, t + 0.045, 783.99, 987.77, 0.13, 0.032, 'sine');
      break;
    case 'close':
      tone(ac, t, 659.25, 392, 0.13, 0.04);
      break;
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
  } catch {
    // Private mode, or storage is full. The setting just won't persist.
  }
  if (!next) play('tap');
}
