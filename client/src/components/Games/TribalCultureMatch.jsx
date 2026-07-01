import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Trophy, Clock } from 'lucide-react';

const tribalData = [
  { 
    id: 1,
    tribe: 'Bodo',
    state: 'Assam',
    description: 'Largest plain tribe of Northeast India, known for Bagurumba dance',
    dance: 'Bagurumba',
    icon: '🪘'
  },
  { 
    id: 2,
    tribe: 'Mising',
    state: 'Assam',
    description: 'Agrarian tribe famous for their rich heritage and folk songs',
    dance: 'Selos',
    icon: '🎶'
  },
  { 
    id: 3,
    tribe: 'Naga',
    state: 'Nagaland',
    description: 'Warrior culture with morung system and headhunting heritage',
    dance: 'War Dance',
    icon: '⚔️'
  },
  { 
    id: 4,
    tribe: 'Mizo',
    state: 'Mizoram',
    description: 'Known for Cheraw dance and vibrant cultural traditions',
    dance: 'Cheraw',
    icon: '🎭'
  },
  { 
    id: 5,
    tribe: 'Khasi',
    state: 'Meghalaya',
    description: 'Matrilineal society with deep connection to nature',
    dance: 'Shad Nongkrem',
    icon: '👑'
  },
  { 
    id: 6,
    tribe: 'Garo',
    state: 'Meghalaya',
    description: 'Known for Nagma dance and Wangala festival',
    dance: 'Nagma',
    icon: '🌾'
  },
  { 
    id: 7,
    tribe: 'Tripuri',
    state: 'Tripura',
    description: 'Rich crafts tradition and Garia dance',
    dance: 'Garia',
    icon: '🪵'
  },
  { 
    id: 8,
    tribe: 'Meitei',
    state: 'Manipur',
    description: 'Classical dance tradition with Ras Lila',
    dance: 'Ras Lila',
    icon: '🩰'
  },
  { 
    id: 9,
    tribe: 'Adi',
    state: 'Arunachal Pradesh',
    description: 'Monpa region tribe with Aparangi dance',
    dance: 'Aparangi',
    icon: '🏔️'
  },
  { 
    id: 10,
    tribe: 'Thadou',
    state: 'Manipur',
    description: 'Known for tribal warfare traditions and dance',
    dance: 'Thadou Dance',
    icon: '🪇'
  },
  { 
    id: 11,
    tribe: 'Pnar',
    state: 'Meghalaya',
    description: 'Part of Khasi community with similar traditions',
    dance: 'Ka Shadlang',
    icon: '🦚'
  },
  { 
    id: 12,
    tribe: 'Dimasa',
    state: 'Assam',
    description: 'Known for Busu dance ceremony',
    dance: 'Busu',
    icon: '🌺'
  },
];

const TribalCultureMatch = () => {
  const [tribes, setTribes] = useState(tribalData.slice(0, 6).sort(() => Math.random() - 0.5));
  const [states] = useState([...new Set(tribalData.map(t => t.state))].sort(() => Math.random() - 0.5));
  const [matches, setMatches] = useState({});
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (type, id) => {
    if (feedback) return;
    
    if (!selected) {
      setSelected({ type, id });
    } else {
      if (type === selected.type) {
        setSelected(null);
        return;
      }

      const tribe = tribes.find(t => t.id === selected.id);
      const isCorrect = tribe.state === id;

      if (isCorrect) {
        setMatches({ ...matches, [selected.id]: id });
        setCorrect(correct + 1);
        setFeedback({ type: 'correct', message: `Correct! ${tribe.tribe} are from ${tribe.state}!` });
      } else {
        setWrong(wrong + 1);
        const correctState = tribe.state;
        setFeedback({ type: 'wrong', message: `Wrong! ${tribe.tribe} are from ${correctState}, not ${id}` });
      }

      setTimeout(() => {
        setFeedback(null);
        setSelected(null);
        
        if (isCorrect && correct + 1 === tribes.length) {
          setGameComplete(true);
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setTribes(tribalData.slice(0, 6).sort(() => Math.random() - 0.5));
    setMatches({});
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setGameComplete(false);
    setFeedback(null);
  };

  const getMatchColor = (tribeId, stateId) => {
    if (matches[tribeId] === stateId) return 'border-maximalist-blue bg-maximalist-blue/20';
    return 'border-white/20';
  };

  if (gameComplete) {
    return (
      <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-brutal text-white mb-2 uppercase">Cultural Expert!</h2>
          <p className="text-gray-400 mb-6">You have mastered the tribal culture of Northeast India!</p>
          
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
            <div className="brutal-box-dark p-4">
              <div className="text-3xl font-brutal text-maximalist-blue">{correct}</div>
              <div className="text-xs text-gray-400 uppercase">Correct</div>
            </div>
            <div className="brutal-box-dark p-4">
              <div className="text-3xl font-brutal text-maximalist-pink">{wrong}</div>
              <div className="text-xs text-gray-400 uppercase">Wrong</div>
            </div>
          </div>

          <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
            {tribes.map(t => (
              <div key={t.id} className="glass-panel-light p-3 text-left text-sm">
                <span className="text-xl mr-2">{t.icon}</span>
                <span className="font-bold text-white">{t.tribe}</span>
                <span className="text-gray-400 ml-2">→</span>
                <span className="text-maximalist-cyan ml-2">{t.state}</span>
                <span className="text-xs text-gray-500 ml-2">({t.dance})</span>
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="brutal-box px-8 py-4 font-brutal text-lg uppercase flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-brutal text-white uppercase flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-maximalist-yellow" />
          Match Tribes to States
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-maximalist-blue" />
            <span className="text-sm text-gray-400">{correct} correct</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-maximalist-pink" />
            <span className="text-sm text-gray-400">{wrong} wrong</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-4 text-center">
        Click a tribe, then click its corresponding state to make a match
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 text-center ${
            feedback.type === 'correct' 
              ? 'bg-maximalist-blue/20 border border-maximalist-blue text-maximalist-blue' 
              : 'bg-maximalist-pink/20 border border-maximalist-pink text-maximalist-pink'
          }`}
        >
          {feedback.message}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <h3 className="text-sm font-brutal text-gray-400 uppercase">Tribes</h3>
          {tribes.map((tribe) => {
            const isMatched = matches[tribe.id] !== undefined;
            const isSelected = selected?.id === tribe.id;

            return (
              <motion.button
                key={tribe.id}
                onClick={() => !isMatched && handleSelect('tribe', tribe.id)}
                disabled={isMatched}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                className={`w-full p-4 text-left transition-all glass-panel-light ${
                  isMatched ? 'opacity-50' : ''
                } ${isSelected ? 'ring-2 ring-maximalist-cyan' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tribe.icon}</span>
                  <div>
                    <div className="font-semibold text-white">{tribe.tribe}</div>
                    <div className="text-xs text-gray-500">{tribe.description}</div>
                  </div>
                </div>
                {isMatched && (
                  <div className="mt-2 text-xs text-maximalist-blue">
                    ✓ Matched with {matches[tribe.id]}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-brutal text-gray-400 uppercase">States</h3>
          {states.map((state) => {
            const isSelected = selected?.id === state;

            return (
              <motion.button
                key={state}
                onClick={() => handleSelect('state', state)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 text-left transition-all glass-panel-light ${
                  isSelected ? 'ring-2 ring-maximalist-pink' : ''
                }`}
              >
                <div className="font-semibold text-white">{state}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="mt-6 brutal-box px-6 py-3 font-brutal text-sm uppercase flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Reset Game
      </button>
    </div>
  );
};

export default TribalCultureMatch;