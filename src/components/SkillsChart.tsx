import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Skill } from '../types';

interface SkillsChartProps {
  skills: Skill[];
}

export function SkillsChart({ skills }: SkillsChartProps) {
  const data = skills.map((skill) => ({
    name: skill.name,
    value: (skill.progress / skill.goal) * 100,
    color: skill.color,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: '#4b5563', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#4b5563', fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white shadow-lg rounded-lg p-3 border">
                    <p className="font-medium" style={{ color: data.color }}>
                      {data.name}
                    </p>
                    <p className="text-gray-600">
                      Progress: {Math.round(data.value)}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          {data.map((entry, index) => (
            <Radar
              key={entry.name}
              name={entry.name}
              dataKey="value"
              stroke={entry.color}
              fill={entry.color}
              fillOpacity={0.3}
              data={[data[index]]}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}