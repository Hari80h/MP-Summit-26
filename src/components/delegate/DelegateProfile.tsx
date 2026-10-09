'use client';

import React from 'react';
import { BarChart2, Briefcase, Building, Building2, Calendar, CheckCircle, CheckSquare, ChevronRight, Download, LineChart, Mic, Pencil, QrCode, Share2, Square, Star, User, Users } from 'lucide-react';

import { useStore } from '../../lib/store';

interface DelegateProfileProps {
  onOpenPrivacyModal: () => void;
  onOpenQRModal: () => void;
}

export const DelegateProfile: React.FC<DelegateProfileProps> = ({
  onOpenQRModal,
}) => {
  const {
    currentUser,
    connections,
    sessions,
    showToast,
    setActiveDelegateTab,
    updateCurrentUserPrivacy,
    setViewSavedPeopleOnly,
    setViewSavedCompaniesOnly,
    savedCompanyIds,
  } = useStore();

  const handleExportCSV = () => {
    // Generate real CSV content blob
    const headers = ['Name', 'Company', 'Designation', 'Status', 'Connected At'];
    const rows = connections.map((c) => [
      `"${c.personName}"`,
      `"${c.company}"`,
      `"${c.designation}"`,
      `"${c.status}"`,
      `"${c.connectedAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eventsphere-connections-its26.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Connections exported successfully ✓', 'success');
  };

  const handleExportVCard = () => {
    // Generate vCard format
    let vCardContent = '';
    connections.forEach((c) => {
      vCardContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${c.personName}\nORG:${c.company}\nTITLE:${c.designation}\nNOTE:Connected at India Tech Summit 2026 via EventSphere\nEND:VCARD\n`;
    });
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `its26-contacts.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('vCard exported successfully ✓', 'success');
  };

  const handleAddToPhone = () => {
    showToast('Contacts synced to phone address book ✓', 'success');
  };

  const savedSessionsCount = sessions.filter((s) => s.isBookmarked).length;
  // Calculate completion
  const profileCompletion = 85; 

  const handleTogglePrivacy = (field: keyof typeof currentUser.privacy) => {
    updateCurrentUserPrivacy({ [field]: !currentUser.privacy[field] });
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const preset = e.target.value as any;
    updateCurrentUserPrivacy({ preset });
    if (preset === 'Open') {
      updateCurrentUserPrivacy({ shareEmail: true, sharePhone: true, shareLinkedIn: true, shareTwitter: true });
    } else if (preset === 'Private') {
      updateCurrentUserPrivacy({ shareEmail: false, sharePhone: false, shareLinkedIn: false, shareTwitter: false });
    }
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">
      <div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · DELEGATE</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Profile</h1>
      </div>
      {/* Identity Card */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-sm relative">
        <button 
          onClick={() => setActiveDelegateTab('edit_profile')}
          className="absolute top-4 right-4 p-2 text-[#6B6B6B] hover:bg-gray-100 rounded-full transition-colors"
          title="Edit Profile"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-[42px] h-[42px] rounded-full object-cover shadow-sm border border-[#E5E7EB] flex-shrink-0" 
            />
          ) : (
            <div className="w-[42px] h-[42px] rounded-full bg-[#F6F4F0] border border-[#E5E7EB] text-[#181818] flex items-center justify-center font-bold text-[14px] shadow-sm flex-shrink-0">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="pr-8">
            <h2 className="text-[15px] font-bold text-[#181818] tracking-tight">{currentUser.name}</h2>
            <p className="text-[11px] text-[#6B6B6B] mt-0.5">
              {currentUser.designation} · {currentUser.company}
            </p>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">
              · {currentUser.ticketType} · 3-day
            </p>
          </div>
        </div>
        
        {/* Profile Completion */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
            <span className="text-[#6B6B6B] uppercase tracking-wider">Profile Completion</span>
            <span className="text-[#181818]">{profileCompletion}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#181818] rounded-full" 
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Menu Action Items */}
      <div className="bg-white rounded-[14px] border border-[#DEDCD7] shadow-sm overflow-hidden text-[12px]">
        <button
          onClick={onOpenQRModal}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#4B5563]" />
            <span className="font-semibold text-[#181818]">My Event QR</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => {
            setViewSavedPeopleOnly(true);
            setActiveDelegateTab('people');
          }}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#4B5563]" />
            <span className="font-semibold text-[#181818]">Saved People ({connections.filter(c => c.status === 'connected').length})</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => {
            setViewSavedCompaniesOnly(true);
            setActiveDelegateTab('companies');
          }}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-[#4B5563]" />
            <span className="font-semibold text-[#181818]">Saved Companies ({savedCompanyIds.length})</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => setActiveDelegateTab('schedule')}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4B5563]" />
            <span className="font-semibold text-[#181818]">My Schedule ({savedSessionsCount})</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        </button>
      </div>

      {/* Inline Contact Sharing block */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-sm space-y-2">
        <div>
          <h3 className="text-[12px] font-bold text-[#181818]">Contact Sharing</h3>
          <p className="text-[12px] text-[#6B6B6B] leading-relaxed mt-1">
            Applies to your QR, scans and product enquiries. EventSphere owns consent — registration data stays with the event website.
          </p>
        </div>

        <select 
          value={currentUser.privacy.preset}
          onChange={handlePresetChange}
          className="w-full p-2 rounded-lg border border-[#DEDCD7] bg-white text-[12px] font-medium text-[#181818] outline-none appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B6B6B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
        >
          <option value="Open">Open</option>
          <option value="Connections Only">Connections Only</option>
          <option value="Private">Private</option>
        </select>
        
        <p className="text-[11px] text-[#6B6B6B]">
          {currentUser.privacy.preset === 'Open' 
            ? 'Share selected fields with everyone' 
            : currentUser.privacy.preset === 'Private'
            ? 'Keep all contact information private'
            : 'Customize who sees your information'}
        </p>

        <div className="space-y-0 pt-2 border-t border-[#F3F4F6]">
          <label className="flex items-center justify-between py-3 cursor-pointer group border-b border-[#F3F4F6]">
            <span className="text-[12px] text-[#181818]">Email</span>
            <input 
              type="checkbox" 
              checked={currentUser.privacy.shareEmail}
              onChange={() => handleTogglePrivacy('shareEmail')}
              className="hidden" 
            />
            {currentUser.privacy.shareEmail ? (
              <CheckSquare className="w-5 h-5 text-[#B51F32]" />
            ) : (
              <Square className="w-5 h-5 text-[#D1D5DB]" />
            )}
          </label>
          
          <label className="flex items-center justify-between py-3 cursor-pointer group border-b border-[#F3F4F6]">
            <span className="text-[12px] text-[#181818]">Mobile</span>
            <input 
              type="checkbox" 
              checked={currentUser.privacy.sharePhone}
              onChange={() => handleTogglePrivacy('sharePhone')}
              className="hidden" 
            />
            {currentUser.privacy.sharePhone ? (
              <CheckSquare className="w-5 h-5 text-[#B51F32]" />
            ) : (
              <Square className="w-5 h-5 text-[#D1D5DB]" />
            )}
          </label>
          
          <label className="flex items-center justify-between py-3 cursor-pointer group">
            <span className="text-[12px] text-[#181818]">LinkedIn</span>
            <input 
              type="checkbox" 
              checked={currentUser.privacy.shareLinkedIn}
              onChange={() => handleTogglePrivacy('shareLinkedIn')}
              className="hidden" 
            />
            {currentUser.privacy.shareLinkedIn ? (
              <CheckSquare className="w-5 h-5 text-[#B51F32]" />
            ) : (
              <Square className="w-5 h-5 text-[#D1D5DB]" />
            )}
          </label>
          <label className="flex items-center justify-between py-3 cursor-pointer group border-t border-[#F3F4F6]">
            <span className="text-[12px] text-[#181818]">Twitter / X</span>
            <input 
              type="checkbox" 
              checked={!!currentUser.privacy.shareTwitter}
              onChange={() => handleTogglePrivacy('shareTwitter')}
              className="hidden" 
            />
            {currentUser.privacy.shareTwitter ? (
              <CheckSquare className="w-5 h-5 text-[#B51F32]" />
            ) : (
              <Square className="w-5 h-5 text-[#D1D5DB]" />
            )}
          </label>
        </div>
      </div>

      {/* Export Connections Box */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-[#181818] tracking-tight">Export Connections</span>
          <span className="text-[11px] font-semibold text-[#6B6B6B] bg-gray-100 px-2 py-1 rounded-md">{connections.length} contacts</span>
        </div>
        <p className="text-[12px] text-[#6B6B6B] leading-relaxed">
          Download your verified event contacts into your CRM or phone address book:
        </p>

        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={handleExportCSV}
            className="py-3 px-2 bg-[#F9FAFB] hover:bg-gray-100 active:scale-95 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-bold text-[#4B5563] flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-5 h-5 text-[#181818]" />
            <span>CSV</span>
          </button>

          <button
            onClick={handleExportVCard}
            className="py-3 px-2 bg-[#F9FAFB] hover:bg-gray-100 active:scale-95 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-bold text-[#4B5563] flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Share2 className="w-5 h-5 text-[#181818]" />
            <span>vCard</span>
          </button>

          <button
            onClick={handleAddToPhone}
            className="py-3 px-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] active:scale-95 rounded-lg border border-[#BBF7D0] hover:border-[#86EFAC] text-[12px] font-bold text-[#166534] flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
          >
            <CheckCircle className="w-5 h-5 text-[#2F7D58]" />
            <span>To Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
};
