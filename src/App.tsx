import React, { useState } from 'react';
import { Plus, Share2, Trophy } from 'lucide-react';
import { SkillCard } from './components/SkillCard';
import { AddSkillModal } from './components/AddSkillModal';
import { AddMilestoneModal } from './components/AddMilestoneModal';
import { SkillsChart } from './components/SkillsChart';
import { ProfileCard } from './components/ProfileCard';
import { ProfileModal } from './components/ProfileModal';
import { Skill, UserProfile } from './types';

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Your Name',
  });

  const handleAddSkill = (newSkill: {
    name: string;
    category: string;
    goal: number;
    color: string;
  }) => {
    setSkills((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        progress: 0,
        milestones: [],
        ...newSkill,
      },
    ]);
  };

  const handleProgressUpdate = (id: string, progress: number) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, progress } : skill
      )
    );
  };

  const handleAddMilestone = (skillId: string, milestone: { description: string; link?: string }) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              milestones: [
                ...skill.milestones,
                {
                  id: Date.now().toString(),
                  date: new Date().toLocaleDateString(),
                  ...milestone,
                },
              ],
            }
          : skill
      )
    );
  };

  const handleShare = () => {
    const shareData = {
      title: `${profile.name}'s Career Skills Progress`,
      text: `Check out ${profile.name}'s career skills progress! Currently tracking ${skills.length} skills and making great progress.${profile.linkedin ? ` Connect on LinkedIn: ${profile.linkedin}` : ''}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Career Skill Tracker</h1>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 size={20} />
              Share Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProfileCard profile={profile} onEdit={() => setShowProfileModal(true)} />
        </div>

        {skills.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills Overview</h2>
            <SkillsChart skills={skills} />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">My Skills</h2>
          <button
            onClick={() => setShowAddSkill(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="relative group">
              <SkillCard skill={skill} onProgressUpdate={handleProgressUpdate} />
              <button
                onClick={() => setSelectedSkill(skill)}
                className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add Milestone
              </button>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No skills added yet</h3>
            <p className="text-gray-500 mb-6">
              Start tracking your career progress by adding your first skill
            </p>
            <button
              onClick={() => setShowAddSkill(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
            >
              <Plus size={20} />
              Add Your First Skill
            </button>
          </div>
        )}
      </main>

      {showAddSkill && (
        <AddSkillModal onClose={() => setShowAddSkill(false)} onAdd={handleAddSkill} />
      )}

      {selectedSkill && (
        <AddMilestoneModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onAdd={handleAddMilestone}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onClose={() => setShowProfileModal(false)}
          onSave={setProfile}
        />
      )}
    </div>
  );
}

export default App;