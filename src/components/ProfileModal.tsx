import React, { useState } from 'react';
import { X, Linkedin, Github, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

export function ProfileModal({ profile, onClose, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="input"
              placeholder="Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="input"
              rows={3}
              placeholder="A brief description about yourself and your career goals"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="input"
                placeholder="LinkedIn Profile URL"
              />
            </div>

            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                className="input"
                placeholder="GitHub Profile URL"
              />
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="input"
                placeholder="Personal Website URL"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}