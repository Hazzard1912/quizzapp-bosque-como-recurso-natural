import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useSound } from './hooks/useSound';
import { questions } from './data/questions';
import { StartScreen } from './components/StartScreen';
import { ProgressBar } from './components/ProgressBar';
import { Timer } from './components/Timer';
import { ScoreDisplay } from './components/ScoreDisplay';
import { QuestionCard } from './components/QuestionCard';
import { AnswerOptions } from './components/AnswerOptions';
import { ExplanationCard } from './components/ExplanationCard';
import { GameOver } from './components/GameOver';

const MAX_TIME = 45;

function App() {
  const { state, startGame, selectAnswer, nextQuestion, restart } = useGameState(MAX_TIME);
  const sound = useSound();
  const prevStreakRef = useRef(state.streak);
  const prevTimeLeftRef = useRef(state.timeLeft);

  const currentQuestion = questions[state.currentQuestionIndex];
  const isAnswered = state.status === 'answered';
  const isFinished = state.status === 'finished';
  const isPlaying = state.status === 'playing';
  const isIdle = state.status === 'idle';

  // Inicializar audio y empezar juego
  const handleStart = async () => {
    await sound.init();
    sound.playStart();
    startGame();
  };

  // Seleccionar respuesta
  const handleSelectAnswer = (index: number) => {
    const isCorrect = index === currentQuestion.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
    selectAnswer(index);
  };

  // Siguiente pregunta
  const handleNext = () => {
    if (state.currentQuestionIndex + 1 >= questions.length) {
      sound.playFinish();
    } else {
      sound.playStart();
    }
    nextQuestion();
    // En móvil, volver arriba al cambiar de pregunta
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reiniciar
  const handleRestart = () => {
    restart();
  };

  // Sonido de tick cuando quedan <= 5 segundos
  useEffect(() => {
    if (isPlaying && state.timeLeft <= 5 && state.timeLeft > 0) {
      if (state.timeLeft !== prevTimeLeftRef.current) {
        sound.playTick();
      }
    }
    prevTimeLeftRef.current = state.timeLeft;
  }, [state.timeLeft, isPlaying, sound]);

  // Sonido de racha cuando se acumulan 2+ aciertos seguidos
  useEffect(() => {
    if (state.streak > prevStreakRef.current && state.streak >= 2) {
      sound.playStreak();
    }
    prevStreakRef.current = state.streak;
  }, [state.streak, sound]);

  // Timeout sound
  useEffect(() => {
    if (state.status === 'answered' && state.timeLeft === 0 && state.answers[state.currentQuestionIndex] === -1) {
      sound.playTimeout();
    }
  }, [state.status, state.timeLeft, state.answers, state.currentQuestionIndex, sound]);

  if (isIdle) {
    return <StartScreen onStart={handleStart} />;
  }

  if (isFinished) {
    return (
      <GameOver
        score={state.score}
        correctCount={state.correctCount}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-paper relative">
      {/* === MOBILE: Header fijo === */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand/40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <ScoreDisplay
            score={state.score}
            streak={state.streak}
            correctCount={state.correctCount}
            totalQuestions={questions.length}
          />
          {isPlaying && (
            <Timer timeLeft={state.timeLeft} maxTime={MAX_TIME} />
          )}
        </div>
      </header>

      {/* === DESKTOP: Paneles laterales fijos === */}
      {/* Panel izquierdo: Score + Timer */}
      <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 w-44">
        <div className="bg-cream/95 backdrop-blur-sm rounded-2xl border border-sand/40 p-3 shadow-sm flex flex-col items-center gap-3 w-full">
          <ScoreDisplay
            score={state.score}
            streak={state.streak}
            correctCount={state.correctCount}
            totalQuestions={questions.length}
          />
          {isPlaying && (
            <Timer timeLeft={state.timeLeft} maxTime={MAX_TIME} />
          )}
        </div>
      </aside>

      {/* Panel derecho: ProgressBar vertical */}
      <aside className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-44">
        <div className="bg-cream/95 backdrop-blur-sm rounded-2xl border border-sand/40 p-3 shadow-sm flex flex-col items-center">
          <ProgressBar
            current={state.currentQuestionIndex}
            total={questions.length}
            orientation="vertical"
          />
        </div>
      </aside>

      {/* === Contenido principal === */}
      <main className="pt-24 md:pt-8 pb-8 px-4 md:px-0">
        <div className="max-w-3xl mx-auto md:mx-auto">
          {/* Progreso en móvil (dentro del flujo) */}
          <div className="md:hidden mb-6">
            <ProgressBar current={state.currentQuestionIndex} total={questions.length} />
          </div>

          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion.question}
              currentIndex={state.currentQuestionIndex}
              image={currentQuestion.image}
            />
          </AnimatePresence>

          <AnswerOptions
            options={currentQuestion.options}
            selectedIndex={state.answers[state.currentQuestionIndex] ?? null}
            correctIndex={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelect={handleSelectAnswer}
          />

          <AnimatePresence>
            {isAnswered && currentQuestion.explanation && (
              <ExplanationCard
                explanation={currentQuestion.explanation}
                isCorrect={state.answers[state.currentQuestionIndex] === currentQuestion.correctAnswer}
                onNext={handleNext}
              />
            )}
            {isAnswered && !currentQuestion.explanation && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-moss hover:bg-bark text-white font-bold px-6 py-3 rounded-full shadow-md transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
