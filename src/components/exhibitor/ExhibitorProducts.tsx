'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import {
  Package,
  Eye,
  MessageCircle,
  Users,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  X,
  ShieldCheck,
  Pencil,
  Trash2,
  Plus,
  Check
} from 'lucide-react';
import { Product } from '../../types';

export const ExhibitorProducts: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    enquireProduct,
    updateProduct,
    deleteProduct,
    addProduct,
    interestedVisitors,
    showToast,
  } = useStore();

  const [detailSubTab, setDetailSubTab] = useState<'overview' | 'features' | 'benefits' | 'useCases' | 'resources'>('overview');
  const [showVisitorsModal, setShowVisitorsModal] = useState(false);

  // Edit / Add modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState('Cloud & AI');
  const [formOverview, setFormOverview] = useState('');

  // Delete confirm state
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Active exhibitor company is Microsoft (Booth B-14)
  const exhibitorCompany = 'Microsoft';
  const companyProducts = products.filter(
    (p) => p.company.toLowerCase() === exhibitorCompany.toLowerCase()
  );

  const activeProduct = companyProducts.find((p) => p.id === selectedProductId);

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormTagline(prod.tagline);
    setFormCategory(prod.category);
    setFormOverview(prod.overview);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !formName.trim()) return;

    updateProduct(editingProduct.id, {
      name: formName.trim(),
      tagline: formTagline.trim(),
      category: formCategory.trim() || 'Cloud & AI',
      overview: formOverview.trim() || editingProduct.overview,
    });

    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormTagline('');
    setFormCategory('Cloud & AI');
    setFormOverview('');
    setShowAddModal(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    addProduct({
      name: formName.trim(),
      tagline: formTagline.trim() || 'Enterprise Solution by Microsoft',
      category: formCategory.trim() || 'Cloud & AI',
      company: 'Microsoft',
      booth: 'B-14',
      image: 'https://cdn.simpleicons.org/microsoft',
      views: 0,
      enquiries: 0,
      interestedVisitorsCount: 0,
      overview: formOverview.trim() || 'Official featured solution showcased at Microsoft Booth B-14.',
      features: ['Enterprise Ready', 'Cloud Connected', 'Secure Architecture'],
      benefits: ['Improved Workflow Efficiency', 'Enterprise-grade Security', 'Seamless Microsoft Integration'],
      useCases: ['Enterprise IT', 'Data Operations', 'Cloud Scale Operations'],
      resources: { websiteUrl: 'https://azure.microsoft.com' },
    });

    setShowAddModal(false);
  };

  const handleDelete = (productId: string, productName: string) => {
    deleteProduct(productId);
    setDeletingProductId(null);
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    }
  };

  const handleExportVisitorsCSV = (prod: Product) => {
    const prodVisitors = interestedVisitors.filter((v) => v.productId === prod.id);
    const headers = ['Name', 'Company', 'Designation', 'Email', 'Mobile', 'Type', 'Timestamp'];
    const rows = prodVisitors.map((v) => [
      `"${v.name}"`,
      `"${v.company}"`,
      `"${v.designation}"`,
      `"${v.email}"`,
      `"${v.mobile}"`,
      `"${v.interactionType}"`,
      `"${v.timestamp}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${prod.id}-interested-visitors.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Interested visitors exported successfully ✓', 'success');
  };

  const renderModals = () => (
    <React.Fragment>
      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-sm p-3 space-y-2 shadow-2xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[12px] font-bold text-[#181818]">Edit Product</h3>
                <p className="text-[11px] text-[#6B6B6B]">Microsoft Booth B-14</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#181818] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Product Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32]"
                  placeholder="e.g. Azure OpenAI Service"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32]"
                  placeholder="e.g. Advanced language models"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32] bg-white"
                >
                  <option value="Cloud & AI">Cloud & AI</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Developer Tools">Developer Tools</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Overview</label>
                <textarea
                  value={formOverview}
                  onChange={(e) => setFormOverview(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32] resize-none"
                  placeholder="Brief overview of the product..."
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg hover:bg-[#F6F4F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </React.Fragment>
  );

  // If a product is selected, render Product Detail
  if (activeProduct) {
    const productVisitors = interestedVisitors.filter((v) => v.productId === activeProduct.id);

    return (
      <div className="flex-1 bg-[#F6F4F0] select-none px-4 pt-4 pb-20 space-y-4">
        {/* Back and Edit/Delete Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProductId(null)}
            className="flex items-center gap-1.5 text-[15px] font-medium text-[#181818] transition-colors py-1 px-1 -ml-1 rounded-lg active:opacity-70"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenEdit(activeProduct)}
              className="px-3 py-2 rounded-xl bg-white border border-[#DEDCD7] text-sm font-semibold flex items-center gap-1.5 hover:bg-[#F6F4F0] text-[#181818] transition-colors shadow-sm"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setDeletingProductId(activeProduct.id)}
              className="px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-sm font-semibold flex items-center gap-1.5 hover:bg-red-100 text-[#B51F32] transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Card Title & Metrics */}
        <div className="p-4 rounded-[16px] shadow-sm relative overflow-hidden bg-white border border-[#F3F4F6]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#FFF0F2] opacity-80 z-0"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#FCE8E8] rounded-full blur-3xl z-0 pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D11E39] px-2.5 py-1 rounded-md">
                  {activeProduct.category} · BOOTH {activeProduct.booth}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-[19px] font-bold text-[#111827] leading-snug">
                  {activeProduct.name}
                </h2>
                <div className="shrink-0 pt-0.5">
                  {activeProduct.resources && Object.keys(activeProduct.resources).length > 0 ? (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FCE8E8] text-[#D11E39] text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#F9D5D5] transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Brochure</span>
                    </button>
                  ) : (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 text-[#6B6B6B] text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-[13px] text-[#4B5563] font-medium leading-relaxed">
                {activeProduct.tagline}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => enquireProduct(activeProduct.id)}
                className="flex-[2] h-11 bg-gradient-to-r from-[#151515] to-[#2A080D] hover:from-black hover:to-[#151515] active:scale-[0.98] text-white font-semibold text-[13px] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Product Enquiry</span>
              </button>

              <button
                onClick={() => setShowVisitorsModal(true)}
                className="flex-1 h-11 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] font-semibold text-[13px] rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                title="View Interested Visitors"
              >
                <Users className="w-4 h-4" />
                <span>Visitors</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Tabs: Overview | Features | Benefits | Use Cases */}
        <div className="flex bg-white rounded-t-xl border border-b-0 border-[#E5E7EB] overflow-x-auto no-scrollbar mt-4 relative z-10 shadow-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'features', label: 'Features' },
            { id: 'benefits', label: 'Benefits' },
            { id: 'useCases', label: 'Use Cases' },
          ].map((tab) => (
            <button
              key={tab.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setDetailSubTab(tab.id as any)}
              className={`flex-none px-4 py-3 text-[13px] font-bold text-center transition-colors relative ${
                detailSubTab === tab.id
                  ? 'text-[#B51F32]'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              {tab.label}
              {detailSubTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B51F32] rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl rounded-t-none p-5 shadow-sm text-[13px] space-y-4 relative z-20 mt-[-16px]">
          {detailSubTab === 'overview' && (
            <div>
              <h3 className="font-semibold text-[#181818] mb-2 text-base">
                Product Overview
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {activeProduct.overview}
              </p>
            </div>
          )}

          {detailSubTab === 'features' && (
            <div>
              <h3 className="font-semibold text-[#181818] mb-3 text-base">
                Key Technical Features
              </h3>
              <ul className="space-y-3 text-[#6B6B6B]">
                {activeProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B51F32] mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailSubTab === 'benefits' && (
            <div>
              <h3 className="font-semibold text-[#181818] mb-3 text-base">
                Enterprise Business Benefits
              </h3>
              <ul className="space-y-3 text-[#6B6B6B]">
                {activeProduct.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F7D58] mt-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailSubTab === 'useCases' && (
            <div>
              <h3 className="font-semibold text-[#181818] mb-3 text-base">
                Production Use Cases
              </h3>
              <ul className="space-y-3 text-[#6B6B6B]">
                {activeProduct.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#181818] mt-2 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Interested Visitors Modal */}
        {showVisitorsModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
            <div className="bg-white rounded-[14px] w-full max-w-md max-h-[85vh] overflow-y-auto p-3 space-y-2 shadow-xl border border-[#DEDCD7]">
              <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
                <div>
                  <h3 className="text-[12px] font-bold text-[#181818]">
                    Interested Visitors ({productVisitors.length})
                  </h3>
                  <p className="text-[11px] text-[#6B6B6B]">{activeProduct.name}</p>
                </div>
                <button
                  onClick={() => setShowVisitorsModal(false)}
                  className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#181818]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-2.5 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7] text-[11px] text-[#6B6B6B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F7D58] flex-shrink-0" />
                <span>Contact visibility strictly respects individual delegate privacy settings.</span>
              </div>

              <div className="space-y-2.5">
                {productVisitors.length === 0 ? (
                  <p className="text-xs text-center text-[#6B6B6B] py-3">No enquiries logged yet.</p>
                ) : (
                  productVisitors.map((v) => (
                    <div
                      key={v.id}
                      className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#181818]">{v.name}</span>
                        <span className="text-[10px] font-mono text-[#6B6B6B]">{v.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B]">
                        {v.designation} · <strong className="text-[#181818]">{v.company}</strong>
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-[#6B6B6B]">
                        <span>Email: <strong className="text-[#181818]">{v.email}</strong></span>
                        <span>Mobile: <strong className="text-[#181818]">{v.mobile}</strong></span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleExportVisitorsCSV(activeProduct)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs hover:bg-[#F6F4F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowVisitorsModal(false)}
                  className="flex-1 py-2.5 bg-[#181818] text-white font-semibold text-xs rounded-lg shadow-xs hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modals */}
        {renderModals()}
      </div>
    );
  }

  // Showcase Products Catalog View
  return (
    <div className="flex-1 bg-[#F6F4F0] select-none pb-20 flex flex-col">
      {/* Rich Header Block */}
      <div className="bg-[#151515] px-5 pt-10 pb-12 text-white rounded-b-[32px] shadow-lg relative overflow-hidden shrink-0">
        {/* Soft Red Glow Background */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-bl from-[#B51F32]/50 via-[#B51F32]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-start justify-between relative z-10 mb-2">
          <div>
            <h1 className="text-[28px] font-serif tracking-tight text-white leading-tight mb-1">
              Showcase Products
            </h1>
            <p className="text-[12px] text-gray-300 font-medium">
              Microsoft Booth B-14 Featured Solutions
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="h-10 px-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 font-semibold text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Products List (Microsoft Only) */}
      <div className="px-4 -mt-8 relative z-20 space-y-3">
        {companyProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#DEDCD7] text-center space-y-3">
            <Package className="w-8 h-8 text-[#6B6B6B] mx-auto opacity-50" />
            <p className="text-base font-semibold text-[#181818]">No featured products listed yet</p>
            <p className="text-sm text-[#6B6B6B]">Add your booth solutions to showcase them to attendees.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 px-4 py-2 bg-[#B51F32] text-white text-sm font-semibold rounded-xl"
            >
              + Add First Product
            </button>
          </div>
        ) : (
          companyProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className="bg-white p-3.5 rounded-2xl border border-[#EBEBEB] hover:shadow-md transition-shadow shadow-sm cursor-pointer flex justify-between gap-3 group"
            >
              {/* Left: Text Content */}
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A] block mb-0.5">
                  {prod.category} · Booth {prod.booth}
                </span>
                <h3 className="text-[16px] font-bold text-[#181818] leading-tight break-words mb-1">
                  {prod.name}
                </h3>
                <p className="text-[12px] text-[#6B6B6B] leading-snug line-clamp-2">
                  {prod.tagline}
                </p>
              </div>

              {/* Right: Actions & Details Link */}
              <div className="flex flex-col items-end justify-between shrink-0 py-0.5">
                <div className="flex items-center gap-0.5 -mr-1.5 -mt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 text-[#8A8A8A] hover:text-[#00A4EF] bg-transparent hover:bg-gray-50 rounded-md transition-colors"
                    title="Edit Product"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingProductId(prod.id)}
                    className="p-1.5 text-[#8A8A8A] hover:text-[#B51F32] bg-transparent hover:bg-gray-50 rounded-md transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <span className="text-[10px] font-bold text-[#8A8A8A] flex items-center gap-0.5 group-hover:text-[#B51F32] transition-colors mt-2">
                  View Details <ChevronRight className="w-3 h-3 -mr-0.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

{/* Modals */}
      {renderModals()}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-sm p-3 space-y-2 shadow-2xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[12px] font-bold text-[#181818]">Add Featured Product</h3>
                <p className="text-[11px] text-[#6B6B6B]">Showcase to attendees at Booth B-14</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#181818] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Product Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32]"
                  placeholder="e.g. Microsoft Copilot for Security"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32]"
                  placeholder="e.g. Generative AI-powered security analysis"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32] bg-white"
                >
                  <option value="Cloud & AI">Cloud & AI</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Developer Tools">Developer Tools</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#181818] block mb-1">Overview</label>
                <textarea
                  value={formOverview}
                  onChange={(e) => setFormOverview(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-[#DEDCD7] rounded-lg focus:outline-none focus:border-[#B51F32] resize-none"
                  placeholder="Describe key benefits and capabilities..."
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg hover:bg-[#F6F4F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
          <div className="bg-white rounded-[14px] w-full max-w-xs p-3 space-y-2 shadow-2xl border border-[#DEDCD7] text-center">
            <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center text-[#B51F32] mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-[12px] font-bold text-[#181818]">Delete Product?</h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Are you sure you want to remove this product from your booth showcase?
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setDeletingProductId(null)}
                className="flex-1 py-2 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg hover:bg-[#F6F4F0]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const prod = products.find((p) => p.id === deletingProductId);
                  handleDelete(deletingProductId, prod?.name || 'Product');
                }}
                className="flex-1 py-2 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-bold text-xs rounded-lg shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
