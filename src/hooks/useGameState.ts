import { useReducer, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';
import {
  type GameState,
  type GameAction,
  INITIAL_STATE,
  BASE_POINTS,
  STREAK_BONUS,
} from '../types';

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...INITIAL_STATE,
        status: 'playing',
        timeLeft: action.payload.maxTime,
        maxTime: action.payload.maxTime,
      };
    }
    case 'SELECT_ANSWER': {
      const { answerIndex, timeLeft } = action.payload;
      const question = questions[state.currentQuestionIndex];
      const isCorrect = answerIndex === question.correctAnswer;
      const timeBonus = Math.floor((timeLeft / state.maxTime) * BASE_POINTS);
      const streakBonus = isCorrect ? state.streak * STREAK_BONUS : 0;
      const pointsEarned = isCorrect ? BASE_POINTS + timeBonus + streakBonus : 0;

      return {
        ...state,
        status: 'answered',
        answers: [...state.answers, answerIndex],
        score: state.score + pointsEarned,
        streak: isCorrect ? state.streak + 1 : 0,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    }
    case 'TIMEOUT': {
      const isCorrect = false;
      // Se marca como -1 para indicar que no respondió
      return {
        ...state,
        status: 'answered',
        answers: [...state.answers, -1],
        streak: 0,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    }
    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= questions.length) {
        return {
          ...state,
          status: 'finished',
        };
      }
      return {
        ...state,
        status: 'playing',
        currentQuestionIndex: nextIndex,
        timeLeft: state.maxTime,
      };
    }
    case 'TICK': {
      if (state.status !== 'playing') return state;
      const newTime = state.timeLeft - 1;
      if (newTime <= 0) {
        return {
          ...state,
          status: 'answered',
          answers: [...state.answers, -1],
          timeLeft: 0,
          streak: 0,
        };
      }
      return {
        ...state,
        timeLeft: newTime,
      };
    }
    case 'RESTART': {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export function useGameState(maxTime = 45) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME', payload: { maxTime } });
  }, [maxTime]);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      dispatch({
        type: 'SELECT_ANSWER',
        payload: { answerIndex, timeLeft: state.timeLeft },
      });
    },
    [state.timeLeft]
  );

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.status !== 'playing') return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.currentQuestionIndex]);

  return {
    state,
    startGame,
    selectAnswer,
    nextQuestion,
    restart,
  };
}
