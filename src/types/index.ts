export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // índice de la opción correcta
  explanation?: string;
  image?: string; // nombre del archivo en public/images/
}

export type GameStatus = 'idle' | 'playing' | 'answered' | 'finished';

export interface GameState {
  status: GameStatus;
  currentQuestionIndex: number;
  score: number;
  answers: number[]; // índices de las respuestas seleccionadas por pregunta
  timeLeft: number;
  maxTime: number;
  streak: number;
  correctCount: number;
}

export type GameAction =
  | { type: 'START_GAME'; payload: { maxTime: number } }
  | { type: 'SELECT_ANSWER'; payload: { answerIndex: number; timeLeft: number } }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TICK' }
  | { type: 'RESTART' };

export const INITIAL_STATE: GameState = {
  status: 'idle',
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  timeLeft: 0,
  maxTime: 45,
  streak: 0,
  correctCount: 0,
};

export const TIMEOUT_PENALTY = 0;
export const BASE_POINTS = 1000;
export const STREAK_BONUS = 100;
