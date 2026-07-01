import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Brain, AlertTriangle, Sparkles, Globe, Zap } from 'lucide-react';
import GeographyQuiz from '../components/Games/GeographyQuiz';
import DisasterSimulator from '../components/Games/DisasterSimulator';
import TribalCultureMatch from '../components/Games/TribalCultureMatch';

const games = [
  {
    id: 'geography',
    icon: Globe,
    color: 'from-maximalist-blue to-cyan-400',
    hoverColor: 'hover:border-maximalist-blue hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
    component: GeographyQuiz
  },
  {
    id: 'disaster',
    icon: AlertTriangle,
    color: 'from-maximalist-pink to-pink-400',
    hoverColor: 'hover:border-maximalist-pink hover:shadow-[0_0_30px_rgba(255,16,240,0.3)]',
    component: DisasterSimulator
  },
  {
    id: 'culture',
    icon: Sparkles,
    color: 'from-maximalist-yellow to-yellow-400',
    hoverColor: 'hover:border-maximalist-yellow hover:shadow-[0_0_30px_rgba(254,255,55,0.3)]',
    component: TribalCultureMatch
  }
];

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const selectedGameData = games.find(g => g.id === selectedGame);
  const GameComponent = selectedGameData?.component;

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-maximalist-void maximal-bg diagonal-stripes-bg noise-overlay">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedGame(null)}
            className="glass-panel px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 transition-colors mb-6"
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
    <div className="min-h-screen bg-maximalist-void maximal-bg diagonal-stripes-bg noise-overlay">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-maximalist-pink" />
            <h1 className="text-4xl lg:text-5xl font-brutal text-white uppercase tracking-wider">
              Interactive Games
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              className={`glass-panel p-8 cursor-pointer transition-all duration-300 border-2 border-transparent ${game.hoverColor}`}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mx-auto mb-6`}>
                <game.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-brutal text-white text-center mb-3 uppercase">
                {game.id === 'geography' && 'Northeast Geography Quiz'}
                {game.id === 'disaster' && 'Disaster Response Simulator'}
                {game.id === 'culture' && 'Tribal Culture Match'}
              </h3>
              <p className="text-sm text-gray-400 text-center">
                {game.id === 'geography' && 'Test your knowledge of Northeast India\'s states, capitals, and geography'}
                {game.id === 'disaster' && 'Learn to make critical decisions during natural disasters'}
                {game.id === 'culture' && 'Match tribes with their home states and learn traditional dances'}
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 text-sm text-maximalist-cyan">
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
          className="glass-panel p-8 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-maximalist-yellow" />
            <h2 className="text-xl font-brutal text-white uppercase">Learning Benefits</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-white mb-1">Geography</h3>
              <p className="text-xs text-gray-400">Learn locations of all 8 Northeast states and their capitals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-1">Disaster Awareness</h3>
              <p className="text-xs text-gray-400">Understand proper responses during floods, earthquakes, and fires</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="font-semibold text-white mb-1">Cultural Heritage</h3>
              <p className="text-xs text-gray-400">Discover the rich tribal traditions of Northeast India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamesPage;