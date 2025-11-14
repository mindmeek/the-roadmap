import React from 'react';
import { Lightbulb, Route, Cog, Layers, Target, Sparkles } from 'lucide-react';

const stages = [
  {
    name: 'Vision Stage',
    description: 'Build a solid foundation for your business',
    icon: Lightbulb,
    color: 'from-blue-500 to-blue-600',
    bgLight: 'from-blue-50 to-blue-100',
    bgDark: 'from-blue-900/20 to-blue-800/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    toolIcon: Layers,
    toolLabel: 'Foundation Roadmap'
  },
  {
    name: 'Startup Stage',
    description: 'Create an effective customer journey',
    icon: Route,
    color: 'from-green-500 to-green-600',
    bgLight: 'from-green-50 to-green-100',
    bgDark: 'from-green-900/20 to-green-800/20',
    borderColor: 'border-green-200 dark:border-green-700',
    toolIcon: Target,
    toolLabel: '90-Day Journey'
  },
  {
    name: 'Growth Stage',
    description: 'Automate and streamline operations',
    icon: Cog,
    color: 'from-purple-500 to-purple-600',
    bgLight: 'from-purple-50 to-purple-100',
    bgDark: 'from-purple-900/20 to-purple-800/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    toolIcon: Sparkles,
    toolLabel: 'AI & Analytics'
  }
];

export default function EntrepreneurshipStageProgress({ user }) {
  // Mock progress calculation - you can replace this with actual logic
  const getStageProgress = (stageName) => {
    if (!user) return 0;
    
    // Example logic - replace with actual progress calculation
    if (stageName === 'Vision Stage') {
      // Could check foundation roadmap completion
      return 65;
    } else if (stageName === 'Startup Stage') {
      // Could check journey progress
      return 40;
    } else if (stageName === 'Growth Stage') {
      // Could check advanced features usage
      return 20;
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const ToolIcon = stage.toolIcon;
        const progress = getStageProgress(stage.name);
        
        return (
          <div
            key={index}
            className={`card p-5 bg-gradient-to-br ${stage.bgLight} dark:${stage.bgDark} border-2 ${stage.borderColor}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-br ${stage.color} rounded-full p-2.5`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-[var(--text-main)]">{stage.name}</h4>
              </div>
            </div>
            
            <p className="text-xs text-[var(--text-soft)] mb-4">
              {stage.description}
            </p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[var(--text-soft)]">Progress</span>
                <span className="text-xs font-bold text-[var(--text-main)]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stage.color} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
              <ToolIcon className="w-3 h-3" />
              <span>{stage.toolLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}