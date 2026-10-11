'use client';

import React, { useState, useEffect } from 'react';
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
    event,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'All' | 'Checked in' | 'Not in' | 'VIP' | 'Speakers' | 'Exhibitors'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(11);

  // Reset to page 1 whenever search query, filter tab, or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, pageSize]);

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
    const q = searchQuery.toLowerCase().trim();
    const regId = (person.registrationId || '').toLowerCase();
    const matchesSearch =
      q === '' ||
      person.name.toLowerCase().includes(q) ||
      person.company.toLowerCase().includes(q) ||
      person.designation.toLowerCase().includes(q) ||
      person.email.toLowerCase().includes(q) ||
      regId.includes(q);

    if (!matchesSearch) return false;

    if (activeTab === 'Checked in') return person.checkedIn;
    if (activeTab === 'Not in') return !person.checkedIn;
    if (activeTab === 'VIP') return person.role === 'vip' || person.ticketType?.toLowerCase().includes('vip');
    if (activeTab === 'Speakers') return person.role === 'speaker' || person.ticketType?.toLowerCase().includes('speaker');
    if (activeTab === 'Exhibitors') return person.role === 'exhibitor_staff' || person.ticketType?.toLowerCase().includes('exhibitor');
    return true; // 'All'
  });

  const totalRecords = event.totalRegistered || 2438;

  const totalPages = Math.max(1, Math.ceil(filteredAttendees.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedAttendees = filteredAttendees.slice(startIndex, startIndex + pageSize);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // When near the beginning: show 1, 2, 3, 4, 5, 6, '...', totalPages
    if (safeCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, 6, '...', totalPages];
    }
    // When near the end: show last 6 pages
    if (safeCurrentPage >= totalPages - 3) {
      return [1, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    // In the middle: show 2 pages behind and 2 pages ahead
    return [
      1,
      '...',
      safeCurrentPage - 2,
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      safeCurrentPage + 2,
      '...',
      totalPages,
    ];
  };

  const getFormattedRegId = (person: Person) => {
    if (!person.registrationId || person.registrationId.toLowerCase().includes('not public') || person.registrationId.toLowerCase().includes('unlisted')) {
      const num = String(Math.abs(person.id.split('').reduce((acc, c) => ((acc << 5) - acc) + c.charCodeAt(0), 0)) % 9000 + 1000).padStart(4, '0');
      return `#${num}`;
    }
    return person.registrationId.startsWith('#') ? person.registrationId : `#${person.registrationId}`;
  };

  const handleExportCSV = () => {
    const headers = ['Registration ID', 'Name', 'Email', 'Company', 'Designation', 'Ticket Type', 'Checked In', 'Check-In Time'];
    const rows = attendees.map((a) => [
      `"${getFormattedRegId(a)}"`,
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
    <div className="space-y-5 select-text max-w-7xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C8983] block">
            {event.id} · {totalRecords.toLocaleString()} RECORDS
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight mt-1">
            Attendees
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setMappingStep('upload');
              setShowImportModal(true);
            }}
            className="px-4 py-2 bg-white hover:bg-[#F2EFE9] text-[#1A1A1A] text-sm font-medium rounded-xl border border-[#DDD8CE] shadow-xs transition-colors"
          >
            Import CSV
          </button>

          <button
            onClick={() => setShowWalkInModal(true)}
            className="px-4 py-2 bg-white hover:bg-[#F2EFE9] text-[#1A1A1A] text-sm font-medium rounded-xl border border-[#DDD8CE] shadow-xs transition-colors"
          >
            + Walk-in
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#101012] hover:bg-black text-white text-sm font-medium rounded-xl border border-[#B51F32]/40 shadow-[0_2px_10px_rgba(181,31,50,0.18)] transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80 flex-shrink-0">
          <Search className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, company, ID..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#E8E4DA] text-xs text-[#1A1A1A] placeholder:text-[#8C8983] focus:outline-none focus:ring-1 focus:ring-[#B51F32]/40 shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {(['All', 'Checked in', 'Not in', 'VIP', 'Speakers', 'Exhibitors'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#101012] text-white border border-[#B51F32]/40 shadow-[0_2px_8px_rgba(181,31,50,0.18)] font-semibold'
                    : 'bg-white text-[#5E5B54] hover:text-[#1A1A1A] border border-[#E8E4DA] font-medium'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Attendees Table Card */}
      <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE4] text-[#8C8983] font-bold text-[10.5px] uppercase tracking-wider">
                <th className="py-2.5 px-5 font-bold">NAME</th>
                <th className="py-2.5 px-5 font-bold">COMPANY</th>
                <th className="py-2.5 px-5 font-bold">DESIGNATION</th>
                <th className="py-2.5 px-5 font-bold">TYPE</th>
                <th className="py-2.5 px-5 font-bold">STATUS</th>
                <th className="py-2.5 px-5 font-bold text-right">REG ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F1EA]">
              {paginatedAttendees.map((person) => {
                const initials = person.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
                const typeLabel =
                  person.role === 'speaker' || person.ticketType?.toLowerCase().includes('speaker')
                    ? 'Speaker'
                    : person.role === 'vip' || person.ticketType?.toLowerCase().includes('vip')
                    ? 'VIP'
                    : person.role === 'exhibitor_staff' || person.ticketType?.toLowerCase().includes('exhibitor')
                    ? 'Exhibitor'
                    : 'Delegate';

                return (
                  <tr
                    key={person.id}
                    onClick={() => setSelectedPerson(person)}
                    className="hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    {/* NAME */}
                    <td className="py-2 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#E5DFD3] text-[#554D41] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                          {initials}
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-[#1A1A1A]">
                          {person.name}
                        </span>
                      </div>
                    </td>

                    {/* COMPANY */}
                    <td className="py-2 px-5 text-xs sm:text-sm text-[#5E5B54]">
                      {person.company}
                    </td>

                    {/* DESIGNATION */}
                    <td className="py-2 px-5 text-xs sm:text-sm text-[#5E5B54]">
                      {person.designation}
                    </td>

                    {/* TYPE */}
                    <td className="py-2 px-5">
                      <span className="inline-block bg-[#EFECE4] text-[#5E5B54] text-[11px] font-medium px-2 py-0.5 rounded-md">
                        {typeLabel}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="py-2 px-5">
                      {person.checkedIn ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          Checked in
                        </span>
                      ) : (
                        <span className="text-xs text-[#8C8983] font-medium">
                          Not in
                        </span>
                      )}
                    </td>

                    {/* REG ID */}
                    <td className="py-2 px-5 text-right font-mono text-xs text-[#8C8983]">
                      {getFormattedRegId(person)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="py-2.5 px-5 border-t border-[#EFECE4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C8983]">
          <div>
            Showing {filteredAttendees.length === 0 ? 0 : startIndex + 1}
            {paginatedAttendees.length > 1 ? `–${startIndex + paginatedAttendees.length}` : ''} of{' '}
            {filteredAttendees.length.toLocaleString()} · sorted by check-in recency
          </div>

          <div className="flex items-center gap-1 font-medium select-none">
            {safeCurrentPage > 1 && (
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center hover:text-[#1A1A1A] hover:bg-[#EFECE4] cursor-pointer text-[#8C8983] transition-colors outline-none focus:outline-none"
                title="Previous page"
              >
                ←
              </button>
            )}

            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                const isLeftDots = idx === 1;
                return (
                  <button
                    type="button"
                    key={`dots-${idx}`}
                    onClick={() =>
                      setCurrentPage((p) =>
                        isLeftDots ? Math.max(1, p - 5) : Math.min(totalPages, p + 5)
                      )
                    }
                    className="w-7 h-7 rounded-lg text-xs flex items-center justify-center text-[#8C8983] hover:text-[#1A1A1A] hover:bg-[#EFECE4] cursor-pointer transition-colors outline-none focus:outline-none"
                    title={isLeftDots ? 'Jump back 5 pages' : 'Jump ahead 5 pages'}
                  >
                    ...
                  </button>
                );
              }

              const pageNum = Number(page);
              const isActive = safeCurrentPage === pageNum;

              return (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all outline-none focus:outline-none ${
                    isActive
                      ? 'bg-[#101012] text-white border border-[#B51F32]/40 shadow-[0_2px_8px_rgba(181,31,50,0.18)] cursor-default'
                      : 'text-[#8C8983] hover:text-[#1A1A1A] hover:bg-[#EFECE4] cursor-pointer'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {safeCurrentPage < totalPages && (
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center hover:text-[#1A1A1A] hover:bg-[#EFECE4] cursor-pointer text-[#8C8983] transition-colors outline-none focus:outline-none"
                title="Next page"
              >
                →
              </button>
            )}
          </div>
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
                <strong className="font-mono text-[#181818]">{getFormattedRegId(selectedPerson)}</strong>
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
