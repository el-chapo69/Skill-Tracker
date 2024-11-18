import React from 'react';
import { ExternalLink, Trophy, Award } from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  onProgressUpdate: (id: string, progress: number) => void;
}

export function SkillCard({ skill, onProgressUpdate }: SkillCardProps) {
  const percentage = (skill.progress / skill.goal) * 100;
  const isComplete = percentage >= 100;

  return (
    <div className="card p-6 relative overflow-hidden">
      {isComplete && (
        <div className="absolute top-3 right-3">
          <Award className="w-6 h-6 text-yellow-400" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{skill.name}</h3>
          <span className="inline-block px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded-md">
            {skill.category}
          </span>
        </div>
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#eee"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke={skill.color}
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 36 * percentage / 100} ${2 * Math.PI * 36}`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold" style={{ color: skill.color }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="range"
            min="0"
            max={skill.goal}
            value={skill.progress}
            onChange={(e) => onProgressUpdate(skill.id, Number(e.target.value))}
            className="w-full"
            style={{
              backgroundImage: `linear-gradient(to right, ${skill.color} ${percentage}%, #eee ${percentage}%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0</span>
            <span>{skill.goal}</span>
          </div>
        </div>

        {skill.milestones.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Trophy size={16} /> Latest Achievements
            </h4>
            <ul className="space-y-3">
              {skill.milestones.slice(-2).map((milestone) => (
                <li
                  key={milestone.id}
                  className="text-sm bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-gray-700">{milestone.description}</span>
                    {milestone.link && (
                      <a
                        href={milestone.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 flex-shrink-0"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">{milestone.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}