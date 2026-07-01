import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Brain, AlertTriangle, Sparkles, Globe, Zap } from 'lucide-react';
import GeographyQuiz from '../components/Games/GeographyQuiz';
import DisasterSimulator from '../components/Games/DisasterSimulator';
import TribalCultureMatch from '../components/Games/TribalCultureMatch';

const games = [
  {
    id: 'geography',
    icon: Globe,
    color: 'bg-blue-500',
    component: GeographyQuiz
  },
  {
    id: 'disaster',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    component: DisasterSimulator
  },
  {
    id: 'culture',
    icon: Sparkles,
    color: 'bg-yellow-500',
    component: TribalCultureMatch
  }
];

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const selectedGameData = games.find(g => g.id === selectedGame);
  const GameComponent = selectedGameData?.component;

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gov-light">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedGame(null)}
            className="gov-btn-secondary flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {GameComponent && <GameComponent />}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gov-light">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-saffron" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gov-blue">
              Interactive Games
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn about Northeast India's geography, disaster preparedness, and tribal cultures 
            through engaging interactive games
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedGame(game.id)}
              className="gov-card p-8 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className={`w-20 h-20 rounded-xl ${game.color} flex items-center justify-center mx-auto mb-6`}>
                <game.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gov-blue text-center mb-3">
                {game.id === 'geography' && 'Northeast Geography Quiz'}
                {game.id === 'disaster' && 'Disaster Response Simulator'}
                {game.id === 'culture' && 'Tribal Culture Match'}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {game.id === 'geography' && 'Test your knowledge of Northeast India\'s states, capitals, and geography'}
                {game.id === 'disaster' && 'Learn to make critical decisions during natural disasters'}
                {game.id === 'culture' && 'Match tribes with their home states and learn traditional dances'}
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 text-sm text-gov-blue font-medium">
                  Play Now
                  <Zap className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="gov-card p-8 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-saffron" />
            <h2 className="text-xl font-bold text-gov-blue">Learning Benefits</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-gray-800 mb-1">Geography</h3>
              <p className="text-xs text-gray-600">Learn locations of all 8 Northeast states and their capitals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Disaster Awareness</h3>
              <p className="text-xs text-gray-600">Understand proper responses during floods, earthquakes, and fires</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="font-semibold text-gray-800 mb-1">Cultural Heritage</h3>
              <p className="text-xs text-gray-600">Discover the rich tribal traditions of Northeast India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamesPage;