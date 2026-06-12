import { useCallback } from 'react';
import {
  playCorrectSound,
  playWrongSound,
  playTickSound,
  playTimeoutSound,
  playStartSound,
  playFinishSound,
  playStreakSound,
  initAudio,
} from '../utils/soundEffects';

export function useSound() {
  const playCorrect = useCallback(() => playCorrectSound(), []);
  const playWrong = useCallback(() => playWrongSound(), []);
  const playTick = useCallback(() => playTickSound(), []);
  const playTimeout = useCallback(() => playTimeoutSound(), []);
  const playStart = useCallback(() => playStartSound(), []);
  const playFinish = useCallback(() => playFinishSound(), []);
  const playStreak = useCallback(() => playStreakSound(), []);
  const init = useCallback(() => initAudio(), []);

  return {
    playCorrect,
    playWrong,
    playTick,
    playTimeout,
    playStart,
    playFinish,
    playStreak,
    init,
  };
}
