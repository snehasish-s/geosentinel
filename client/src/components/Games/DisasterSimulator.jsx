import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, Clock, Shield, Zap, Heart, Home, Car, RefreshCw } from 'lucide-react';

const disasterScenarios = [
  {
    id: 'flood',
    title: 'Flash Flood in Assam',
    description: 'Heavy rainfall has caused a flash flood in the Brahmaputra river basin. Villages are being evacuated.',
    icon: '🌊',
    stats: { affected: '50,000', severity: 'High', timeLeft: 120 },
    decisions: [
      {
        id: 'd1',
        question: 'Immediate action required - Which should be prioritized?',
        options: [
          { id: 'a', text: 'Evacuate children and elderly first', impact: 'positive', points: 10, consequence: 'Most vulnerable saved safely' },
          { id: 'b', text: 'Secure livestock and property', impact: 'negative', points: -5, consequence: 'Delay in human evacuation causes casualties' },
          { id: 'c', text: 'Wait for official government orders', impact: 'negative', points: -10, consequence: 'Critical time lost, situation worsens' },
          { id: 'd', text: 'Start from nearest houses moving outward', impact: 'neutral', points: 2, consequence: 'Systematic but not optimal' },
        ]
      },
      {
        id: 'd2',
        question: 'A family refuses to leave their home. What do you do?',
        options: [
          { id: 'a', text: 'Forcefully evacuate them', impact: 'positive', points: 8, consequence: 'Family saved but resentment remains' },
          { id: 'b', text: 'Offer resources to convince them', impact: 'positive', points: 10, consequence: 'They agree to evacuate peacefully' },
          { id: 'c', text: 'Respect their decision', impact: 'negative', points: -8, consequence: 'Family in danger, rescue needed later' },
          { id: 'd', text: 'Report to authorities', impact: 'neutral', points: 3, consequence: 'Authorities take time to arrive' },
        ]
      },
      {
        id: 'd3',
        question: 'A child is stuck on a rooftop. Water is rising fast.',
        options: [
          { id: 'a', text: 'Attempt rescue immediately', impact: 'positive', points: 15, consequence: 'Child rescued successfully' },
          { id: 'b', text: 'Wait for professional rescue team', impact: 'negative', points: -5, consequence: 'Child rescued but hypothermia sets in' },
          { id: 'c', text: 'Throw a flotation device', impact: 'neutral', points: 5, consequence: 'Child holds on until rescue arrives' },
          { id: 'd', text: 'Call for backup first', impact: 'neutral', points: 2, consequence: 'Precious time lost' },
        ]
      },
    ]
  },
  {
    id: 'earthquake',
    title: 'Earthquake in Nagaland',
    description: 'A 6.2 magnitude earthquake has struck the region. Multiple aftershocks expected.',
    icon: '🌋',
    stats: { affected: '25,000', severity: 'Critical', timeLeft: 180 },
    decisions: [
      {
        id: 'd1',
        question: 'After the tremor stops, what\'s your first action?',
        options: [
          { id: 'a', text: 'Check on neighbors for injuries', impact: 'positive', points: 10, consequence: 'Multiple injuries discovered and treated' },
          { id: 'b', text: 'Check building structural damage', impact: 'positive', points: 8, consequence: 'Critical cracks identified, evacuation ordered' },
          { id: 'c', text: 'Immediately run outside', impact: 'negative', points: -3, consequence: 'Injured by falling debris from panicked crowd' },
          { id: 'd', text: 'Call emergency services', impact: 'neutral', points: 5, consequence: 'Lines overloaded, minimal response' },
        ]
      },
      {
        id: 'd2',
        question: 'A building has partially collapsed. Survivors are trapped inside.',
        options: [
          { id: 'a', text: 'Start manual debris removal', impact: 'positive', points: 12, consequence: '3 survivors pulled out safely' },
          { id: 'b', text: 'Wait for professional rescue team', impact: 'positive', points: 8, consequence: 'Team arrives, all 5 survivors rescued' },
          { id: 'c', text: 'Use nearby vehicles to lift rubble', impact: 'negative', points: -8, consequence: 'Building collapses further, casualties' },
          { id: 'd', text: 'Search for survivors independently', impact: 'neutral', points: 6, consequence: 'You find 2 survivors but get injured' },
        ]
      },
    ]
  },
  {
    id: 'fire',
    title: 'Forest Fire in Mizoram',
    description: 'A forest fire is spreading rapidly due to dry conditions. Nearby villages are at risk.',
    icon: '🔥',
    stats: { affected: '10,000', severity: 'Medium', timeLeft: 240 },
    decisions: [
      {
        id: 'd1',
        question: 'How do you approach the spreading fire?',
        options: [
          { id: 'a', text: 'Create firebreak to contain spread', impact: 'positive', points: 15, consequence: 'Fire contained, villages protected' },
          { id: 'b', text: 'Direct attack with water and sand', impact: 'neutral', points: 5, consequence: 'Fire partially contained, exhausted team' },
          { id: 'c', text: 'Evacuate immediately', impact: 'negative', points: -5, consequence: 'Villages threatened but eventually saved' },
          { id: 'd', text: 'Call forest department', impact: 'neutral', points: 3, consequence: 'Department understaffed, delayed response' },
        ]
      },
      {
        id: 'd2',
        question: 'A group of tourists is trapped in the forest.',
        options: [
          { id: 'a', text: 'Guide them to safety through smoke', impact: 'positive', points: 12, consequence: 'All tourists evacuated safely' },
          { id: 'b', text: 'Ask them to find own escape route', impact: 'negative', points: -10, consequence: 'Tourists lost, multi-day search required' },
          { id: 'c', text: 'Radio for helicopter evacuation', impact: 'neutral', points: 6, consequence: 'Helicopter arrives in 2 hours, all safe' },
          { id: 'd', text: 'Wait for fire to die down naturally', impact: 'negative', points: -15, consequence: 'Tragedy strikes, this cannot happen' },
        ]
      },
    ]
  },
];

const DisasterSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentDecision, setCurrentDecision] = useState(0);
  const [score, setScore] = useState(0);
  const [scenarioStarted, setScenarioStarted] = useState(false);
  const [scenarioComplete, setScenarioComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const scenario = disasterScenarios[currentScenario];
  const decision = scenario?.decisions[currentDecision];

  const startScenario = () => {
    setScenarioStarted(true);
    setCurrentDecision(0);
    setScore(0);
    setHistory([]);
    setFeedback(null);
  };

  const handleDecision = (option) => {
    const newHistory = [...history, { decision: decision.question, choice: option.text, ...option }];
    setHistory(newHistory);
    setScore(score + option.points);
    setFeedback({
      impact: option.impact,
      consequence: option.consequence,
      points: option.points
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentDecision < scenario.decisions.length - 1) {
        setCurrentDecision(currentDecision + 1);
      } else {
        setScenarioComplete(true);
      }
    }, 2500);
  };

  const nextScenario = () => {
    setTotalScore(totalScore + Math.max(0, score));
    if (currentScenario < disasterScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setScenarioStarted(false);
      setScenarioComplete(false);
      setCurrentDecision(0);
      setScore(0);
      setHistory([]);
    } else {
      setScenarioComplete(false);
      setCurrentScenario(-1);
    }
  };

  const resetGame = () => {
    setTotalScore(0);
    setCurrentScenario(0);
    setScenarioStarted(false);
    setScenarioComplete(false);
    setCurrentDecision(0);
    setScore(0);
    setHistory([]);
  };

  if (currentScenario === -1) {
    return (
      <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-4xl font-brutal text-white mb-4 uppercase">Simulation Complete!</h2>
          <div className="brutal-box-dark inline-block px-12 py-8 mb-6">
            <div className="text-5xl font-brutal text-maximalist-yellow">
              {totalScore} pts
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">
              Total Score
            </div>
          </div>
          <p className="text-gray-400 mb-6">
            You've completed all disaster scenarios. Remember, quick and informed decisions save lives!
          </p>
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

  if (scenarioComplete) {
    return (
      <div className="glass-panel p-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <span className="text-5xl">{scenario.icon}</span>
            <h2 className="text-2xl font-brutal text-white mt-2 uppercase">
              {scenario.title} - Complete
            </h2>
          </div>
          
          <div className="brutal-box-dark p-4 mb-6 text-center">
            <div className="text-4xl font-brutal text-maximalist-blue">
              {Math.max(0, score)} pts
            </div>
          </div>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className={`p-3 text-sm ${
                h.impact === 'positive' ? 'bg-maximalist-blue/10 border-l-4 border-maximalist-blue' :
                h.impact === 'negative' ? 'bg-maximalist-pink/10 border-l-4 border-maximalist-pink' :
                'bg-white/5 border-l-4 border-white/30'
              }`}>
                <div className="font-semibold text-white mb-1">{h.decision}</div>
                <div className="text-gray-400 text-xs">Your choice: {h.choice}</div>
                <div className="text-xs mt-1">{h.consequence}</div>
              </div>
            ))}
          </div>

          <button
            onClick={nextScenario}
            className="w-full brutal-box py-4 font-brutal text-lg uppercase"
          >
            {currentScenario < disasterScenarios.length - 1 ? 'Next Scenario' : 'See Final Results'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!scenarioStarted) {
    return (
      <div className="glass-panel p-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-5xl">{scenario.icon}</span>
          <h2 className="text-2xl font-brutal text-white mt-2 uppercase">{scenario.title}</h2>
        </div>

        <p className="text-gray-400 mb-6 text-center">
          {scenario.description}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-panel-light p-4 text-center">
            <Users className="w-6 h-6 text-maximalist-pink mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{scenario.stats.affected}</div>
            <div className="text-xs text-gray-500">Affected</div>
          </div>
          <div className="glass-panel-light p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-maximalist-yellow mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{scenario.stats.severity}</div>
            <div className="text-xs text-gray-500">Severity</div>
          </div>
          <div className="glass-panel-light p-4 text-center">
            <Clock className="w-6 h-6 text-maximalist-blue mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{scenario.stats.timeLeft}s</div>
            <div className="text-xs text-gray-500">Response Time</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {scenario.decisions.map((d, i) => (
            <div key={d.id} className="glass-panel-light p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-maximalist-cyan/20 flex items-center justify-center text-maximalist-cyan font-bold">
                {i + 1}
              </div>
              <div className="text-sm text-gray-300">Decision {i + 1}</div>
            </div>
          ))}
        </div>

        <button
          onClick={startScenario}
          className="w-full brutal-box py-4 font-brutal text-lg uppercase flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Begin Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{scenario.icon}</span>
          <span className="text-sm text-gray-400">
            Decision {currentDecision + 1}/{scenario.decisions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-maximalist-yellow" />
          <span className="text-sm text-gray-400">Score: {score}</span>
        </div>
      </div>

      <motion.div
        key={currentDecision}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-xl font-semibold text-white mb-6">{decision.question}</h3>

        <div className="space-y-3">
          {decision.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleDecision(option)}
              disabled={feedback !== null}
              className={`w-full p-4 text-left transition-all glass-panel-light hover:border-maximalist-cyan ${
                feedback ? 'opacity-50' : 'hover:bg-white/10'
              }`}
            >
              <span className="font-mono mr-3 text-maximalist-cyan">{option.id.toUpperCase()}.</span>
              {option.text}
            </button>
          ))}
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 border-l-4 ${
              feedback.impact === 'positive' ? 'bg-maximalist-blue/10 border-maximalist-blue' :
              feedback.impact === 'negative' ? 'bg-maximalist-pink/10 border-maximalist-pink' :
              'bg-white/5 border-white/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {feedback.impact === 'positive' ? (
                <Heart className="w-5 h-5 text-maximalist-blue" />
              ) : feedback.impact === 'negative' ? (
                <AlertTriangle className="w-5 h-5 text-maximalist-pink" />
              ) : (
                <Home className="w-5 h-5 text-gray-400" />
              )}
              <span className={`font-bold ${
                feedback.impact === 'positive' ? 'text-maximalist-blue' :
                feedback.impact === 'negative' ? 'text-maximalist-pink' :
                'text-gray-400'
              }`}>
                {feedback.impact === 'positive' ? '+' : ''}{feedback.points} points
              </span>
            </div>
            <p className="text-sm text-gray-300">{feedback.consequence}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DisasterSimulator;