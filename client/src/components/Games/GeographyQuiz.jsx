import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Zap, Target, RotateCcw, ChevronRight } from 'lucide-react';

const northeastStates = [
  { name: 'Arunachal Pradesh', capital: 'Itanagar', districts: 25, tribes: 82 },
  { name: 'Assam', capital: 'Dispur', districts: 33, tribes: 23 },
  { name: 'Manipur', capital: 'Imphal', districts: 16, tribes: 33 },
  { name: 'Meghalaya', capital: 'Shillong', districts: 12, tribes: 17 },
  { name: 'Mizoram', capital: 'Aizawl', districts: 11, tribes: 12 },
  { name: 'Nagaland', capital: 'Kohima', districts: 16, tribes: 17 },
  { name: 'Tripura', capital: 'Agartala', districts: 8, tribes: 19 },
];

const quizQuestions = [
  {
    question: 'Which is the largest state in Northeast India by area?',
    options: ['Assam', 'Arunachal Pradesh', 'Meghalaya', 'Nagaland'],
    correct: 1,
    explanation: 'Arunachal Pradesh is the largest state in Northeast India, covering an area of about 83,743 sq km.'
  },
  {
    question: 'Which state is known as the "Land of Rising Sun"?',
    options: ['Assam', 'Manipur', 'Arunachal Pradesh', 'Nagaland'],
    correct: 2,
    explanation: 'Arunachal Pradesh is known as the "Land of Rising Sun" due to its easternmost location.'
  },
  {
    question: 'Which is the smallest state in Northeast India?',
    options: ['Mizoram', 'Tripura', 'Sikkim', 'Meghalaya'],
    correct: 1,
    explanation: 'Tripura is the smallest state in Northeast India, covering an area of about 10,491 sq km.'
  },
  {
    question: 'Which state has the highest number of districts?',
    options: ['Assam', 'Arunachal Pradesh', 'Manipur', 'Nagaland'],
    correct: 0,
    explanation: 'Assam has 33 districts, which is the highest among all Northeast states.'
  },
  {
    question: 'The "Living Root Bridge" is famous in which state?',
    options: ['Nagaland', 'Mizoram', 'Meghalaya', 'Manipur'],
    correct: 2,
    explanation: 'Meghalaya is famous for living root bridges, especially in Cherrapunji and Nongriat.'
  },
  {
    question: 'Which lake is the largest in Northeast India?',
    options: ['Loktak Lake', 'Chilai Lake', 'Diphu Lake', 'Foy Lake'],
    correct: 0,
    explanation: 'Loktak Lake in Manipur is the largest lake in Northeast India, known for floating islands.'
  },
  {
    question: 'Which state is famous for "Hornbill Festival"?',
    options: ['Mizoram', 'Nagaland', 'Arunachal Pradesh', 'Assam'],
    correct: 1,
    explanation: 'Nagaland hosts the famous Hornbill Festival every year in December.'
  },
  {
    question: 'What is the capital of Meghalaya?',
    options: ['Tura', 'Nongpoh', 'Shillong', 'Jowai'],
    correct: 2,
    explanation: 'Shillong is the capital of Meghalaya and is also known as the "Scotland of the East".'
  },
];

const GeographyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (index) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizStarted(false);
    setStreak(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { title: 'Perfect Score!', emoji: '🏆', message: 'You are a Northeast India expert!' };
    if (percentage >= 80) return { title: 'Excellent!', emoji: '🌟', message: 'Impressive knowledge of the Northeast!' };
    if (percentage >= 60) return { title: 'Good Job!', emoji: '👍', message: 'You know your Northeast geography!' };
    if (percentage >= 40) return { title: 'Keep Learning!', emoji: '📚', message: 'Explore more about this beautiful region!' };
    return { title: 'Try Again!', emoji: '💪', message: 'Practice makes perfect!' };
  };

  if (!quizStarted) {
    return (
      <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-maximalist-pink via-maximalist-blue to-maximalist-yellow flex items-center justify-center">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-brutal text-white mb-4 uppercase">Northeast Geography Quiz</h2>
          <p className="text-gray-400 mb-6">
            Test your knowledge about the eight sisters of Northeast India! 
            8 questions await you about states, capitals, culture, and geography.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-md mx-auto">
            {northeastStates.slice(0, 4).map((state, i) => (
              <div key={state.name} className="brutal-box-dark p-3 text-sm">
                <div className="font-bold">{state.name}</div>
                <div className="text-gray-400 text-xs">{state.capital}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="brutal-box px-8 py-4 font-brutal text-lg uppercase hover:bg-black hover:text-white transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const { title, emoji, message } = getScoreMessage();
    return (
      <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-4xl font-brutal text-white mb-2 uppercase">{title}</h2>
          <p className="text-gray-400 mb-6">{message}</p>
          <div className="brutal-box-dark inline-block px-8 py-6 mb-6">
            <div className="text-6xl font-brutal text-maximalist-blue">
              {score}/{quizQuestions.length}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Final Score</div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="brutal-box px-6 py-3 font-brutal uppercase flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-maximalist-pink" />
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1}/{quizQuestions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-maximalist-yellow" />
          <span className="text-sm text-gray-400">Score: {score}</span>
          {streak >= 3 && (
            <span className="text-xs text-maximalist-pink font-bold animate-pulse">
              🔥 {streak} streak!
            </span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-maximalist-pink via-maximalist-blue to-maximalist-yellow"
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6">{q.question}</h3>
        
        <div className="space-y-3">
          {q.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === q.correct;
            const showCorrect = showExplanation && isCorrect;
            const showWrong = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedOption !== null}
                className={`w-full p-4 text-left transition-all ${
                  showCorrect
                    ? 'bg-maximalist-blue/20 border-2 border-maximalist-blue text-white'
                    : showWrong
                    ? 'bg-maximalist-pink/20 border-2 border-maximalist-pink text-white'
                    : isSelected
                    ? 'bg-white/10 border-2 border-white/30 text-white'
                    : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <span className="font-mono mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 glass-panel-light border-l-4 border-maximalist-cyan"
          >
            <p className="text-sm text-gray-300">{q.explanation}</p>
          </motion.div>
        )}
      </motion.div>

      {selectedOption !== null && (
        <button
          onClick={nextQuestion}
          className="w-full brutal-box py-4 font-brutal text-lg uppercase flex items-center justify-center gap-2"
        >
          {currentQuestion < quizQuestions.length - 1 ? (
            <>
              Next Question
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5" />
              See Results
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default GeographyQuiz;