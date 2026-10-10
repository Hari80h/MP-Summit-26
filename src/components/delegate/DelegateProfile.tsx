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
    savedPeopleIds,
    sessions,
    showToast,
    setActiveDelegateTab,
    updateCurrentUserPrivacy,
    updateCurrentUser,
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
    <div className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-4 pt-1 pb-24 space-y-2">
      <div className="pt-1 pb-0.5">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0">ITS26 · DELEGATE</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Profile</h1>
      </div>
      
      {/* Identity Card */}
      <div className="bg-white py-3 px-3.5 rounded-[16px] border border-[#DEDCD7] shadow-sm relative">
        <button 
          onClick={() => setActiveDelegateTab('edit_profile')}
          className="absolute top-3 right-3 p-1 text-[#6B6B6B] hover:text-[#181818] transition-colors"
          title="Edit Profile"
        >
          <Pencil className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-[52px] h-[52px] rounded-full object-cover border border-[#E5E7EB] flex-shrink-0 mt-0.5" 
            />
          ) : (
            <div className="w-[52px] h-[52px] rounded-full bg-[#F6F4F0] border border-[#E5E7EB] text-[#181818] flex items-center justify-center font-bold text-[18px] flex-shrink-0 mt-0.5">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="pr-8 space-y-0">
            <h2 className="text-[17px] font-bold text-[#181818] tracking-tight">{currentUser.name}</h2>
            <p className="text-[12.5px] text-[#6B6B6B]">
              {currentUser.designation} · {currentUser.company}
            </p>
            <p className="text-[12.5px] text-[#8BA5CD]">
              · {currentUser.ticketType} · 3-day
            </p>
          </div>
        </div>
        
        {/* Profile Completion */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-bold mb-1">
            <span className="text-[#6B6B6B] uppercase tracking-wider">Profile Completion</span>
            <span className="text-[#181818]">{profileCompletion}%</span>
          </div>
          <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#181818] rounded-full" 
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-[#DEDCD7] shadow-sm overflow-hidden">
        <button
          onClick={onOpenQRModal}
          className="w-full py-2.5 px-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-3">
            <QrCode className="w-[20px] h-[20px] text-[#181818]" />
            <span className="font-semibold text-[#181818] text-[13px]">My Event QR</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => {
            setViewSavedPeopleOnly(true);
            setActiveDelegateTab('people');
          }}
          className="w-full py-2.5 px-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-3">
            <Star className="w-[20px] h-[20px] text-[#181818]" />
            <span className="font-semibold text-[#181818] text-[13px]">Saved People ({savedPeopleIds.length})</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => {
            setViewSavedCompaniesOnly(true);
            setActiveDelegateTab('companies');
          }}
          className="w-full py-2.5 px-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-[#F3F4F6]"
        >
          <div className="flex items-center gap-3">
            <Building className="w-[20px] h-[20px] text-[#181818]" />
            <span className="font-semibold text-[#181818] text-[13px]">Saved Companies ({savedCompanyIds.length})</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button
          onClick={() => setActiveDelegateTab('schedule')}
          className="w-full py-2.5 px-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-[20px] h-[20px] text-[#181818]" />
            <span className="font-semibold text-[#181818] text-[13px]">My Schedule ({savedSessionsCount})</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>
      </div>

      {/* Inline Contact Sharing block */}
      <div className="bg-white py-3 px-3.5 rounded-[16px] border border-[#DEDCD7] shadow-sm space-y-2">
        <div>
          <h3 className="text-[14.5px] font-bold text-[#181818]">Contact Sharing</h3>
          <p className="text-[13px] text-[#6B6B6B] leading-relaxed mt-0.5 pr-2">
            Applies to your QR, scans and product enquiries<br/>
            EventSphere owns consent — registration data stays with the event website
          </p>
        </div>

        <select 
          value={currentUser.privacy.preset}
          onChange={handlePresetChange}
          className="w-full py-2 px-3 rounded-[8px] border border-[#DEDCD7] bg-white text-[13.5px] font-medium text-[#181818] outline-none appearance-none focus:border-[#181818]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B6B6B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
        >
          <option value="Open">Open</option>
          <option value="Connections Only">Connections Only</option>
          <option value="Private">Private</option>
        </select>
        
        <p className="text-[13px] text-[#6B6B6B] mt-1 border-b border-[#F3F4F6] pb-4">
          {currentUser.privacy.preset === 'Open' 
            ? 'Share selected fields with everyone' 
            : currentUser.privacy.preset === 'Private'
            ? 'Keep all contact information private'
            : 'Customize who sees your information'}
        </p>

        <div className="space-y-0">
          <div className="flex items-center justify-between py-2.5 group border-b border-[#F3F4F6]">
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-[14px] font-medium text-[#181818] w-[80px] flex-shrink-0">Email</span>
              <input 
                type="text" 
                value={currentUser.email === 'Not publicly listed' ? '' : (currentUser.email || '')} 
                onChange={(e) => updateCurrentUser({ email: e.target.value })} 
                placeholder="Add email..." 
                className="flex-1 min-w-0 max-w-[160px] px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[13px] text-[#181818] outline-none focus:border-[#181818] focus:bg-white placeholder-[#9CA3AF] transition-colors"
              />
            </div>
            <button 
              onClick={() => handleTogglePrivacy('shareEmail')}
              className="focus:outline-none flex-shrink-0 ml-3"
            >
              {currentUser.privacy.shareEmail ? (
                <CheckSquare className="w-6 h-6 text-[#181818]" />
              ) : (
                <Square className="w-6 h-6 text-[#D1D5DB]" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between py-2.5 group border-b border-[#F3F4F6]">
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-[14px] font-medium text-[#181818] w-[80px] flex-shrink-0">Mobile</span>
              <input 
                type="text" 
                value={currentUser.mobile === 'Not publicly listed' ? '' : (currentUser.mobile || '')} 
                onChange={(e) => updateCurrentUser({ mobile: e.target.value })} 
                placeholder="Add mobile..." 
                className="flex-1 min-w-0 max-w-[160px] px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[13px] text-[#181818] outline-none focus:border-[#181818] focus:bg-white placeholder-[#9CA3AF] transition-colors"
              />
            </div>
            <button 
              onClick={() => handleTogglePrivacy('sharePhone')}
              className="focus:outline-none flex-shrink-0 ml-3"
            >
              {currentUser.privacy.sharePhone ? (
                <CheckSquare className="w-6 h-6 text-[#181818]" />
              ) : (
                <Square className="w-6 h-6 text-[#D1D5DB]" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between py-2.5 group border-b border-[#F3F4F6]">
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-[14px] font-medium text-[#181818] w-[80px] flex-shrink-0">LinkedIn</span>
              <input 
                type="text" 
                value={currentUser.linkedin || ''} 
                onChange={(e) => updateCurrentUser({ linkedin: e.target.value })} 
                placeholder="Profile link..." 
                className="flex-1 min-w-0 max-w-[160px] px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[13px] text-[#181818] outline-none focus:border-[#181818] focus:bg-white placeholder-[#9CA3AF] transition-colors"
              />
            </div>
            <button 
              onClick={() => handleTogglePrivacy('shareLinkedIn')}
              className="focus:outline-none flex-shrink-0 ml-3"
            >
              {currentUser.privacy.shareLinkedIn ? (
                <CheckSquare className="w-6 h-6 text-[#181818]" />
              ) : (
                <Square className="w-6 h-6 text-[#D1D5DB]" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between py-2.5 group">
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-[14px] font-medium text-[#181818] w-[80px] flex-shrink-0">Twitter / X</span>
              <input 
                type="text" 
                value={currentUser.twitter || ''} 
                onChange={(e) => updateCurrentUser({ twitter: e.target.value })} 
                placeholder="@handle" 
                className="flex-1 min-w-0 max-w-[160px] px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[13px] text-[#181818] outline-none focus:border-[#181818] focus:bg-white placeholder-[#9CA3AF] transition-colors"
              />
            </div>
            <button 
              onClick={() => handleTogglePrivacy('shareTwitter')}
              className="focus:outline-none flex-shrink-0 ml-3"
            >
              {currentUser.privacy.shareTwitter ? (
                <CheckSquare className="w-6 h-6 text-[#181818]" />
              ) : (
                <Square className="w-6 h-6 text-[#D1D5DB]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Export Connections Box */}
      <div className="bg-white py-3 px-3.5 rounded-[16px] border border-[#DEDCD7] shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[14.5px] font-bold text-[#181818] tracking-tight">Export Connections</span>
          <span className="text-[11px] font-semibold text-[#6B6B6B] bg-gray-100 px-2 py-1 rounded-md">{connections.length} contacts</span>
        </div>
        <p className="text-[13px] text-[#6B6B6B] leading-relaxed">
          Download your verified event contacts into your CRM or phone address book:
        </p>

        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={handleExportCSV}
            className="py-2.5 px-2 bg-[#F9FAFB] hover:bg-gray-100 active:scale-95 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-bold text-[#4B5563] flex flex-col items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-5 h-5 text-[#181818]" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => {
              showToast("HubSpot CRM integration successfully connected.");
            }}
            className="py-2.5 px-2 bg-[#F9FAFB] hover:bg-gray-100 active:scale-95 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-bold text-[#4B5563] flex flex-col items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Share2 className="w-5 h-5 text-[#ff7a59]" />
            <span>HubSpot</span>
          </button>

          <button
            onClick={() => {
              showToast("Salesforce CRM integration successfully connected.");
            }}
            className="py-2.5 px-2 bg-[#F9FAFB] hover:bg-gray-100 active:scale-95 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-bold text-[#4B5563] flex flex-col items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Share2 className="w-5 h-5 text-[#00a1e0]" />
            <span>Salesforce</span>
          </button>
        </div>
      </div>
    </div>
  );
};
