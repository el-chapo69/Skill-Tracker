import React from 'react';
import { Linkedin, Github, Globe, PenSquare } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  profile: UserProfile;
  onEdit: () => void;
}

export function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 relative group border border-gray-100">
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out transform group-hover:scale-110 bg-white rounded-full shadow-sm"
        title="Edit Profile"
      >
        <PenSquare size={20} />
      </button>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                {profile.name}
              </h2>
              {profile.title && (
                <p className="text-blue-600 font-medium">{profile.title}</p>
              )}
            </div>
          </div>
        </div>

        {profile.bio && (
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/10 rounded-full" />
            <p className="text-gray-600 pl-4 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-2">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          )}

          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          )}

          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Globe size={18} />
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}