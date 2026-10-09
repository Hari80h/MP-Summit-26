'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { Search, Download, Filter, User, Building, Mail, Phone, Calendar, ChevronRight, X, Edit3, CheckCircle2 } from 'lucide-react';
import { Lead, LeadStatus } from '../../types';

export const ExhibitorLeads: React.FC = () => {
  const { leads, updateLeadStatus, showToast } = useStore();
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editNotesText, setEditNotesText] = useState('');

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedStatusTab === 'All') return true;
    return lead.status === selectedStatusTab;
  });

  const handleExportCSV = () => {
    const headers = ['Name', 'Company', 'Designation', 'Email', 'Mobile', 'Status', 'Interests', 'Captured At', 'Notes'];
    const rows = leads.map((l) => [
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.designation}"`,
      `"${l.email}"`,
      `"${l.mobile}"`,
      `"${l.status}"`,
      `"${l.interests.join('; ')}"`,
      `"${l.capturedAt}"`,
      `"${l.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `microsoft-booth-leads-its26.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Leads exported successfully ✓', 'success');
  };

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditNotesText(lead.notes);
    setIsEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    updateLeadStatus(selectedLead.id, selectedLead.status, editNotesText);
    setSelectedLead({ ...selectedLead, notes: editNotesText });
    setIsEditingNotes(false);
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (!selectedLead) return;
    updateLeadStatus(selectedLead.id, newStatus);
    setSelectedLead({ ...selectedLead, status: newStatus });
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
      {/* Header & Export Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[12px] font-bold text-[#181818] tracking-tight">Booth Leads</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            {leads.length} captured leads at Booth B-14
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3 py-1.5 bg-white hover:bg-[#F6F4F0] active:scale-95 border border-[#DEDCD7] rounded-lg text-xs font-semibold text-[#181818] shadow-xs transition-all flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Leads</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search leads by name, company, interest..."
          className="w-full h-11 pl-10 pr-4 rounded-lg bg-white border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] transition-all shadow-xs"
        />
      </div>

      {/* Status Filter Tabs: All and Interested */}
      <div className="flex items-center gap-2 p-1 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7]">
        {[
          { id: 'All', label: `All (${leads.length})` },
          { id: 'Interested', label: `Interested (${leads.filter((l) => l.status === 'Interested').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatusTab(tab.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${
              selectedStatusTab === tab.id
                ? 'bg-white text-[#181818] shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#181818]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads Table / Cards List */}
      <div className="space-y-2.5">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[14px] border border-[#DEDCD7]">
            <p className="text-xs font-semibold text-[#181818]">No leads match your filter</p>
            <p className="text-[11px] text-[#6B6B6B] mt-1">
              Scan attendees from the SCAN tab to capture new leads.
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => handleOpenLead(lead)}
              className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] hover:border-[#B51F32]/40 transition-all shadow-xs cursor-pointer flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#181818]">{lead.name}</h3>
                    {lead.syncStatus === 'pending' && (
                      <span className="text-[9px] font-bold text-[#595959] bg-amber-50 border border-amber-200 px-1 py-0.2 rounded">
                        Sync pending
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6B6B6B]">
                    {lead.designation} · <strong className="text-[#181818]">{lead.company}</strong>
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    lead.status === 'Qualified'
                      ? 'bg-green-50 text-[#2F7D58] border-green-200'
                      : lead.status === 'Interested'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : lead.status === 'Follow-up'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-gray-100 text-[#181818] border-gray-200'
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              {/* Interests & Source */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] pt-1 border-t border-[#DEDCD7]/60">
                <div className="flex flex-wrap gap-1">
                  {lead.interests.map((interest, idx) => (
                    <span key={idx} className="bg-[#EFEEEA] text-[#181818] px-1.5 py-0.5 rounded text-[10px] font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#6B6B6B]">{lead.capturedAt}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-md max-h-[90vh] overflow-y-auto p-3 space-y-2 shadow-xl border border-[#DEDCD7]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                  Lead Detail
                </span>
                <h2 className="text-[13px] font-bold text-[#181818]">{selectedLead.name}</h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#181818]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile & Consent-Respected Contacts */}
            <div className="bg-[#F6F4F0] p-2.5 rounded-lg border border-[#DEDCD7] space-y-2 text-xs">
              <p className="font-bold text-[#181818]">
                {selectedLead.designation} · {selectedLead.company}
              </p>

              <div className="space-y-1 pt-1 border-t border-[#DEDCD7]/60 text-[#6B6B6B]">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <strong className="text-[#181818] font-mono">{selectedLead.email}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Mobile:</span>
                  <strong className="text-[#181818] font-mono">{selectedLead.mobile}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span className="text-[#181818] font-medium">{selectedLead.source}</span>
                </div>
              </div>
            </div>

            {/* Editable Status */}
            <div>
              <label className="block text-xs font-semibold text-[#181818] mb-1.5">
                Qualification Status
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['New', 'Interested', 'Qualified', 'Contacted', 'Follow-up'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedLead.status === st
                        ? 'bg-[#181818] text-white border-[#181818]'
                        : 'bg-white text-[#6B6B6B] border-[#DEDCD7]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Section with In-place Edit */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#181818]">
                  Conversation Notes
                </label>
                {!isEditingNotes && (
                  <button
                    onClick={() => setIsEditingNotes(true)}
                    className="text-xs text-[#B51F32] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditingNotes ? (
                <div className="space-y-2">
                  <textarea
                    value={editNotesText}
                    onChange={(e) => setEditNotesText(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingNotes(false)}
                      className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-[#181818]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-3 py-1 bg-[#B51F32] text-white rounded-lg text-xs font-semibold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] text-xs text-[#181818] leading-relaxed">
                  {selectedLead.notes || 'No notes added yet.'}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedLead(null)}
              className="w-full py-2.5 bg-[#181818] text-white font-semibold text-xs rounded-lg shadow-xs hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
