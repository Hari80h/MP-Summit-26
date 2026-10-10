'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import {
  Search,
  Download,
  Upload,
  UserPlus,
  CheckCircle2,
  XCircle,
  MoreVertical,
  X,
  FileSpreadsheet,
  Check,
  ShieldCheck,
  Calendar,
  Share2,
  QrCode
} from 'lucide-react';
import { Person } from '../../types';

export const OrganizerAttendees: React.FC = () => {
  const {
    attendees,
    toggleCheckIn,
    addWalkInAttendee,
    importAttendeesMock,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'All' | 'Checked In' | 'Not Checked In' | 'VIP' | 'Speakers' | 'Exhibitors'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Modals
  const [showImportModal, setShowImportModal] = useState(false);
  const [showWalkInModal, setShowWalkInModal] = useState(false);

  // Walk-in form state
  const [walkInName, setWalkInName] = useState('');
  const [walkInEmail, setWalkInEmail] = useState('');
  const [walkInMobile, setWalkInMobile] = useState('');
  const [walkInCompany, setWalkInCompany] = useState('');
  const [walkInDesignation, setWalkInDesignation] = useState('');
  const [walkInTicket, setWalkInTicket] = useState('Full Access Delegate Pass');

  // CSV column mapping state
  const [mappingStep, setMappingStep] = useState<'upload' | 'mapping' | 'complete'>('upload');
  const [importedRowCount, setImportedRowCount] = useState(120);

  // Filter attendees
  const filteredAttendees = attendees.filter((person) => {
    const matchesSearch =
      searchQuery === '' ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.registrationId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'Checked In') return person.checkedIn;
    if (activeTab === 'Not Checked In') return !person.checkedIn;
    if (activeTab === 'VIP') return person.role === 'vip';
    if (activeTab === 'Speakers') return person.role === 'speaker';
    if (activeTab === 'Exhibitors') return person.role === 'exhibitor_staff';
    return true; // 'All'
  });

  const handleExportCSV = () => {
    const headers = ['Registration ID', 'Name', 'Email', 'Company', 'Designation', 'Ticket Type', 'Checked In', 'Check-In Time'];
    const rows = attendees.map((a) => [
      `"${a.registrationId}"`,
      `"${a.name}"`,
      `"${a.email}"`,
      `"${a.company}"`,
      `"${a.designation}"`,
      `"${a.ticketType}"`,
      `"${a.checkedIn ? 'YES' : 'NO'}"`,
      `"${a.checkInTime || '-'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eventsphere-its26-attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Attendee roster exported successfully ✓', 'success');
  };

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName || !walkInEmail) return;

    addWalkInAttendee({
      name: walkInName,
      email: walkInEmail,
      mobile: walkInMobile || '+91 9800000000',
      company: walkInCompany || 'Independent',
      designation: walkInDesignation || 'Delegate',
      ticketType: walkInTicket,
    });

    // Reset and close
    setWalkInName('');
    setWalkInEmail('');
    setWalkInMobile('');
    setWalkInCompany('');
    setWalkInDesignation('');
    setShowWalkInModal(false);
  };

  const handleConfirmImport = () => {
    importAttendeesMock(importedRowCount);
    setShowImportModal(false);
    setMappingStep('upload');
  };

  return (
    <div className="space-y-3 select-none max-w-6xl">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <h1 className="text-[15px] font-black text-[#181818] tracking-tight">Attendee Management</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            2,438 pre-registered records synced from external registration portal
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setMappingStep('upload');
              setShowImportModal(true);
            }}
            className="px-2.5 py-2 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#181818]" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => setShowWalkInModal(true)}
            className="px-2.5 py-2 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Walk-in</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-2.5 py-2 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7] overflow-x-auto no-scrollbar">
            {(['All', 'Checked In', 'Not Checked In', 'VIP', 'Speakers', 'Exhibitors'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#181818] shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#181818]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, REG-ID..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
            />
          </div>
        </div>

        {/* Attendees Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DEDCD7] text-[#6B6B6B] font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Attendee</th>
                <th className="py-2.5 px-3">Organization</th>
                <th className="py-2.5 px-3">Ticket / Role</th>
                <th className="py-2.5 px-3">Registration ID</th>
                <th className="py-2.5 px-3">Check-In Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEDCD7]/60">
              {filteredAttendees.map((person) => (
                <tr
                  key={person.id}
                  onClick={() => setSelectedPerson(person)}
                  className="hover:bg-[#F6F4F0] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#EFEEEA] border border-[#DEDCD7] flex items-center justify-center font-bold text-[10px] text-[#181818] flex-shrink-0">
                        {person.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-[#181818] group-hover:text-[#B51F32]">
                          {person.name}
                        </p>
                        <p className="text-[10px] text-[#6B6B6B]">{person.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <p className="font-semibold text-[#181818]">{person.company}</p>
                    <p className="text-[10px] text-[#6B6B6B]">{person.designation}</p>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        person.role === 'speaker'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : person.role === 'vip'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : person.role === 'exhibitor_staff'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-gray-50 text-[#181818] border-gray-200'
                      }`}
                    >
                      {person.ticketType}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-[#6B6B6B]">
                    {person.registrationId}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      {person.checkedIn ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#2F7D58]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Checked In</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-[#6B6B6B]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                    {person.checkInTime && (
                      <p className="text-[10px] text-[#6B6B6B]">{person.checkInTime}</p>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleCheckIn(person.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                        person.checkedIn
                          ? 'bg-[#EFEEEA] hover:bg-[#E5E3DC] text-[#6B6B6B] border-[#DEDCD7]'
                          : 'bg-[#2F7D58] hover:bg-[#256346] text-white border-[#2F7D58]'
                      }`}
                    >
                      {person.checkedIn ? 'Check Out' : 'Check In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendee Detail Modal */}
      {selectedPerson && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-lg max-h-[90vh] overflow-y-auto p-3 space-y-2 shadow-xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                  Attendee Profile & Engagement Record
                </span>
                <h2 className="text-[12px] font-bold text-[#181818]">{selectedPerson.name}</h2>
              </div>
              <button
                onClick={() => setSelectedPerson(null)}
                className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#181818]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Registration Details */}
            <div className="bg-[#F6F4F0] p-2.5 rounded-lg border border-[#DEDCD7] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Registration ID:</span>
                <strong className="font-mono text-[#181818]">{selectedPerson.registrationId}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Ticket Tier:</span>
                <span className="font-semibold text-[#181818]">{selectedPerson.ticketType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Company & Role:</span>
                <span className="text-[#181818]">{selectedPerson.designation} · {selectedPerson.company}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Check-in Status:</span>
                <span className={`font-bold ${selectedPerson.checkedIn ? 'text-[#2F7D58]' : 'text-[#6B6B6B]'}`}>
                  {selectedPerson.checkedIn ? `Checked In (${selectedPerson.checkInTime || 'On-site'})` : 'Not checked in'}
                </span>
              </div>
            </div>

            {/* Engagement metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7]">
                <span className="text-[10px] text-[#6B6B6B] block">Sessions</span>
                <strong className="text-[12px] font-mono text-[#181818]">4 Bookmarked</strong>
              </div>
              <div className="p-2.5 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7]">
                <span className="text-[10px] text-[#6B6B6B] block">Connections</span>
                <strong className="text-[12px] font-mono text-[#181818]">8 Made</strong>
              </div>
              <div className="p-2.5 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7]">
                <span className="text-[10px] text-[#6B6B6B] block">QR Scans</span>
                <strong className="text-[12px] font-mono text-[#181818]">14 Badge Scans</strong>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  toggleCheckIn(selectedPerson.id);
                  setSelectedPerson({ ...selectedPerson, checkedIn: !selectedPerson.checkedIn });
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white transition-colors ${
                  selectedPerson.checkedIn ? 'bg-[#181818] hover:bg-black' : 'bg-[#2F7D58] hover:bg-[#256346]'
                }`}
              >
                {selectedPerson.checkedIn ? 'Mark as Not Checked In' : 'Confirm Check-In Now'}
              </button>
              <button
                onClick={() => setSelectedPerson(null)}
                className="py-2.5 px-3 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg hover:bg-[#F6F4F0]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Modal with Column Mapping */}
      {showImportModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-md p-3 space-y-2 shadow-xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[13px] font-bold text-[#181818]">Import External Registrations</h3>
                <p className="text-xs text-[#6B6B6B]">Map CSV columns to EventSphere attendee schema</p>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#181818]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {mappingStep === 'upload' && (
              <div className="space-y-2">
                <div
                  onClick={() => setMappingStep('mapping')}
                  className="border-2 border-dashed border-[#DEDCD7] hover:border-[#B51F32] rounded-[14px] p-3 text-center cursor-pointer transition-colors bg-[#F6F4F0]"
                >
                  <FileSpreadsheet className="w-8 h-8 text-[#B51F32] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#181818]">Click to select CSV File</p>
                  <p className="text-[11px] text-[#6B6B6B] mt-1">
                    Simulating: <strong className="text-[#181818]">its26_external_registrations_batch2.csv</strong> (120 rows)
                  </p>
                </div>
                <button
                  onClick={() => setMappingStep('mapping')}
                  className="w-full py-2.5 bg-[#B51F32] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#9C1A2B]"
                >
                  Proceed to Column Mapping
                </button>
              </div>
            )}

            {mappingStep === 'mapping' && (
              <div className="space-y-3 text-xs">
                <p className="text-[#6B6B6B]">
                  Verify CSV column mapping for 120 attendee records:
                </p>

                <div className="space-y-2 bg-[#F6F4F0] p-2 rounded-lg border border-[#DEDCD7]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B6B]">Full Name:</span>
                    <span className="font-mono font-bold text-[#181818]">CSV Col: "Full_Name"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B6B]">Email Address:</span>
                    <span className="font-mono font-bold text-[#181818]">CSV Col: "Email"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B6B]">Organization:</span>
                    <span className="font-mono font-bold text-[#181818]">CSV Col: "Company"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B6B]">Ticket Tier:</span>
                    <span className="font-mono font-bold text-[#181818]">CSV Col: "Pass_Category"</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setMappingStep('upload')}
                    className="py-2.5 px-3 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmImport}
                    className="flex-1 py-2.5 bg-[#2F7D58] hover:bg-[#256346] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Import 120 Records</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Walk-in Attendee Modal */}
      {showWalkInModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-md p-3 space-y-2 shadow-xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[13px] font-bold text-[#181818]">Add On-site Walk-in Attendee</h3>
                <p className="text-xs text-[#6B6B6B]">Instantly issues digital pass and marks checked-in</p>
              </div>
              <button
                onClick={() => setShowWalkInModal(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#181818]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#181818] mb-1">Full Name</label>
                <input
                  type="text"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  required
                  className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#181818] mb-1">Email</label>
                  <input
                    type="email"
                    value={walkInEmail}
                    onChange={(e) => setWalkInEmail(e.target.value)}
                    placeholder="maya@example.com"
                    required
                    className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#181818] mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={walkInMobile}
                    onChange={(e) => setWalkInMobile(e.target.value)}
                    placeholder="+91 9800000000"
                    className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#181818] mb-1">Company</label>
                  <input
                    type="text"
                    value={walkInCompany}
                    onChange={(e) => setWalkInCompany(e.target.value)}
                    placeholder="Zomato"
                    className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#181818] mb-1">Designation</label>
                  <input
                    type="text"
                    value={walkInDesignation}
                    onChange={(e) => setWalkInDesignation(e.target.value)}
                    placeholder="Engineering Manager"
                    className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWalkInModal(false)}
                  className="py-2.5 px-3 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-3 bg-[#B51F32] hover:bg-[#9C1A2B] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                >
                  Register & Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
