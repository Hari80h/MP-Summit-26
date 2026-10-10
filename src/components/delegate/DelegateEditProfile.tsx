'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { ArrowLeft, Save } from 'lucide-react';

export const DelegateEditProfile: React.FC = () => {
  const { currentUser, updateCurrentUser, setActiveDelegateTab } = useStore();
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    designation: currentUser.designation,
    company: currentUser.company,
    bio: currentUser.bio || '',
    linkedin: currentUser.linkedin || '',
    twitter: currentUser.twitter || '',
    email: currentUser.email || '',
    mobile: currentUser.mobile || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateCurrentUser(formData);
    setActiveDelegateTab('profile');
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] flex flex-col relative h-full">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-3 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveDelegateTab('profile')}
            className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#181818]" />
          </button>
          <h1 className="text-[15px] font-bold text-[#181818] tracking-tight">Edit Profile</h1>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#181818] hover:bg-[#333] text-white text-[11.5px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>

      <div className="p-3 pb-24 overflow-y-auto space-y-3">
        
        {/* Basic Info */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#E5E7EB] shadow-sm space-y-2">
          <h2 className="text-[12px] font-bold text-[#181818] border-b border-[#F3F4F6] pb-2">Basic Info</h2>
          
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#6B6B6B]">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#DEDCD7] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#181818]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#6B6B6B]">Designation / Job Title</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#DEDCD7] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#181818]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#6B6B6B]">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#DEDCD7] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#181818]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#6B6B6B]">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-[#DEDCD7] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#181818] resize-none"
            />
          </div>
        </div>



      </div>
    </div>
  );
};
