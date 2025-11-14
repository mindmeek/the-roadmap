import React from 'react';
import { Lightbulb, Route, Cog, Layers, Target, Sparkles, TrendingUp } from 'lucide-react';

const stages = [
  {
    name: 'Vision Stage',
    description: 'Build your foundation',
    icon: Lightbulb,
    gradient: 'from-blue-500 via-blue-600 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    bgDarkGradient: 'from-blue-900/30 to-cyan-900/30',
    glowColor: 'shadow-blue-500/20',
    iconBg: 'bg-blue-500',
    toolIcon: Layers,
    toolLabel: 'Foundation Roadmap'
  },
  {
    name: 'Startup Stage',
    description: 'Launch & validate',
    icon: Route,
    gradient: 'from-emerald-500 via-green-600 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    bgDarkGradient: 'from-emerald-900/30 to-teal-900/30',
    glowColor: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500',
    toolIcon: Target,
    toolLabel: '90-Day Journey'
  },
  {
    name: 'Growth Stage',
    description: 'Scale & automate',
    icon: Cog,
    gradient: 'from-purple-500 via-violet-600 to-indigo-600',
    bgGradient: 'from-purple-50 to-indigo-50',
    bgDarkGradient: 'from-purple-900/30 to-indigo-900/30',
    glowColor: 'shadow-purple-500/20',
    iconBg: 'bg-purple-500',
    toolIcon: Sparkles,
    toolLabel: 'AI & Analytics'
  }
];

export default function EntrepreneurshipStageProgress({ user }) {
  const getStageProgress = (stageName) => {
    if (!user) return 0;
    
    if (stageName === 'Vision Stage') {
      return 65;
    } else if (stageName === 'Startup Stage') {
      return 40;
    } else if (stageName === 'Growth Stage') {
      return 20;
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const ToolIcon = stage.toolIcon;
        const progress = getStageProgress(stage.name);
        
        return (
          <div
            key={index}
            className={`group relative overflow-hidden bg-gradient-to-br ${stage.bgGradient} dark:${stage.bgDarkGradient} rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${stage.glowColor} border border-white/20 dark:border-gray-700/50`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`${stage.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">
                {stage.name}
              </h3>
              <p className="text-sm text-[var(--text-soft)] mb-4">
                {stage.description}
              </p>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-soft)]">Progress</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[var(--primary-gold)]" />
                    <span className="text-sm font-bold bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 bg-clip-text text-transparent">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-2 bg-white/30 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className={`h-full bg-gradient-to-r ${stage.gradient} transition-all duration-500 ease-out shadow-lg`}
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Tool Label */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-soft)] bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <ToolIcon className="w-3.5 h-3.5" />
                <span className="font-medium">{stage.toolLabel}</span>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
          </div>
        );
      })}
    </div>
  );
}