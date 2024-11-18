import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Skill } from '../types';

interface AddMilestoneModalProps {
  skill: Skill;
  onClose: () => void;
  onAdd: (skillId: string, milestone: { description: string; link?: string }) => void;
}

export function AddMilestoneModal({ skill, onClose, onAdd }: AddMilestoneModalProps) {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(skill.id, { description, link: link || undefined });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Add Achievement
            </h2>
            <p className="text-sm text-gray-500">
              For: {skill.name}
            </p>
          </div>
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
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              rows={3}
              placeholder="e.g., Completed advanced certification course"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link (optional)
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="input"
              placeholder="https://"
            />
            <p className="mt-1 text-xs text-gray-500">
              Add a link to your certificate, project, or related resource
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}