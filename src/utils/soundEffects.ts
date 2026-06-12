/**
 * Sound effects usando Tone.js - Web Audio framework.
 * Usa sintetizadores pre-construidos y efectos en lugar de
 * osciladores crudos de la Web Audio API nativa.
 */

import * as Tone from 'tone';

// ============================================================
// CONFIGURACIÓN GLOBAL DE EFECTOS
// ============================================================

// Reverb suave para darle ambiente a los sonidos
const reverb = new Tone.Reverb({
  decay: 1.5,
  preDelay: 0.1,
  wet: 0.3,
}).toDestination();

// Delay sutil para eco
const feedbackDelay = new Tone.FeedbackDelay("8n", 0.2).toDestination();

// ============================================================
// SINTETIZADORES PRE-CONSTRUIDOS
// ============================================================

// 1. PolySynth para acordes (correcto, finish)
const chordSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.2,
    release: 0.6,
  },
  volume: -8,
}).connect(reverb).connect(feedbackDelay);

// 2. FM Synth para sonidos brillantes (start)
const brightSynth = new Tone.FMSynth({
  harmonicity: 3,
  modulationIndex: 10,
  oscillator: { type: "sine" },
  envelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
  modulation: { type: "square" },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
  volume: -10,
}).connect(reverb).connect(feedbackDelay);

// 3. MembraneSynth para percusión grave (wrong, timeout)
const drumSynth = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 4,
  oscillator: { type: "sine" },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
  },
  volume: -5,
}).toDestination();

// 4. MetalSynth para ticks de reloj (tick, timer)
const tickSynth = new Tone.MetalSynth({
  envelope: {
    attack: 0.001,
    decay: 0.05,
    release: 0.01,
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5,
  volume: -15,
}).toDestination();

// 5. NoiseSynth para efectos de sizzle (timeout)
const noiseSynth = new Tone.NoiseSynth({
  noise: { type: "brown" },
  envelope: {
    attack: 0.01,
    decay: 0.3,
    sustain: 0,
  },
  volume: -10,
}).toDestination();

// 6. Arpegio synth para finalización (usamos PolySynth en vez de PluckSynth para evitar errores de scheduling)
const arpeggioSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sawtooth" },
  envelope: {
    attack: 0.01,
    decay: 0.15,
    sustain: 0.05,
    release: 0.4,
  },
  volume: -10,
}).connect(reverb).connect(feedbackDelay);

// ============================================================
// CONTROL DE INICIALIZACIÓN
// ============================================================

let audioStarted = false;

export async function initAudio(): Promise<void> {
  if (!audioStarted) {
    await Tone.start();
    audioStarted = true;
  }
}

// ============================================================
// FUNCIONES DE SONIDO
// ============================================================

/** Sonido de respuesta correcta: acorde mayor ascendente con reverb */
export function playCorrectSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  chordSynth.triggerAttackRelease("C5", "16n", now);
  chordSynth.triggerAttackRelease("E5", "16n", now + 0.08);
  chordSynth.triggerAttackRelease("G5", "8n", now + 0.16);
  chordSynth.triggerAttackRelease("C6", "4n", now + 0.24);
}

/** Sonido de respuesta incorrecta: tambor grave + ruido descendente */
export function playWrongSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  drumSynth.triggerAttackRelease("C2", "8n", now);
  noiseSynth.triggerAttackRelease("16n", now + 0.1);
  // Segundo golpe más grave para efecto de "caída"
  drumSynth.triggerAttackRelease("G1", "8n", now + 0.15);
}

/** Sonido de tick de reloj: metálico, corto y brillante */
export function playTickSound() {
  if (!audioStarted) return;
  tickSynth.triggerAttackRelease(200, "32n", Tone.now());
}

/** Sonido de timeout: tambor + noise descendente */
export function playTimeoutSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  drumSynth.triggerAttackRelease("A1", "4n", now);
  noiseSynth.triggerAttackRelease("8n", now);
}

/** Sonido de inicio: nota brillante FM */
export function playStartSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  brightSynth.triggerAttackRelease("C5", "16n", now);
  brightSynth.triggerAttackRelease("E5", "16n", now + 0.12);
  brightSynth.triggerAttackRelease("G5", "8n", now + 0.24);
}

/** Sonido de finalización: arpegio ascendente con acorde final */
export function playFinishSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  const notes = ["C4", "E4", "G4", "C5", "E5", "G5", "C6"];
  notes.forEach((note, i) => {
    arpeggioSynth.triggerAttackRelease(note, "16n", now + i * 0.12);
  });
  // Acorde final sostenido
  chordSynth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "2n", now + notes.length * 0.12);
}

/** Sonido de bonus/racha: campanita brillante */
export function playStreakSound() {
  if (!audioStarted) return;
  const now = Tone.now();
  brightSynth.triggerAttackRelease("G5", "32n", now);
  brightSynth.triggerAttackRelease("C6", "16n", now + 0.1);
}
