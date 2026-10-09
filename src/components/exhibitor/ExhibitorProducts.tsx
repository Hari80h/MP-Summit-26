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

  // If a product is selected, render Product Detail
  if (activeProduct) {
    const productVisitors = interestedVisitors.filter((v) => v.productId === activeProduct.id);

    return (
      <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
        {/* Back and Edit/Delete Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProductId(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#181818] hover:text-[#B51F32] transition-colors py-1 px-2 -ml-2 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleOpenEdit(activeProduct)}
              className="px-2.5 py-1.5 rounded-lg border border-[#DEDCD7] bg-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#F6F4F0] text-[#181818] transition-colors shadow-xs"
            >
              <Pencil className="w-3.5 h-3.5 text-[#00A4EF]" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setDeletingProductId(activeProduct.id)}
              className="px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-xs font-semibold flex items-center gap-1.5 hover:bg-red-100 text-[#B51F32] transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Product Card Title & Metrics */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00A4EF]/10 border border-[#00A4EF]/20 flex items-center justify-center text-[#00A4EF] font-bold text-[12px] flex-shrink-0">
              <Package className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                {activeProduct.category} · Booth {activeProduct.booth}
              </span>
              <h1 className="text-[13px] font-bold text-[#181818] leading-tight truncate">
                {activeProduct.name}
              </h1>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                {activeProduct.tagline}
              </p>
            </div>
          </div>

          {/* Metrics Row: Views, Enquiries, Interested Visitors */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DEDCD7]/60 text-center">
            <div className="p-2 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
              <span className="text-[10px] text-[#6B6B6B] block">Views</span>
              <span className="text-[12px] font-bold font-mono text-[#181818]">
                {activeProduct.views}
              </span>
            </div>
            <div className="p-2 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
              <span className="text-[10px] text-[#6B6B6B] block">Enquiries</span>
              <span className="text-[12px] font-bold font-mono text-[#B51F32]">
                {activeProduct.enquiries}
              </span>
            </div>
            <div
              onClick={() => setShowVisitorsModal(true)}
              className="p-2 bg-[#F6F4F0] hover:bg-[#EFEEEA] rounded-lg border border-[#DEDCD7] cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#6B6B6B] block">Interested</span>
              <span className="text-[12px] font-bold font-mono text-[#2F7D58]">
                {activeProduct.interestedVisitorsCount}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => enquireProduct(activeProduct.id)}
              className="flex-1 h-11 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-[0.98] text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Simulate Product Enquiry</span>
            </button>

            <button
              onClick={() => setShowVisitorsModal(true)}
              className="h-11 px-3 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1"
              title="View Interested Visitors"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Visitors</span>
            </button>
          </div>
        </div>

        {/* 5 Tabs: Overview | Features | Benefits | Use Cases | Resources */}
        <div className="flex bg-[#EFEEEA] p-1 rounded-lg border border-[#DEDCD7] overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'features', label: 'Features' },
            { id: 'benefits', label: 'Benefits' },
            { id: 'useCases', label: 'Use Cases' },
            { id: 'resources', label: 'Resources' },
          ].map((tab) => (
            <button
              key={tab.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setDetailSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                detailSubTab === tab.id
                  ? 'bg-white text-[#181818] shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#181818]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs text-xs space-y-3">
          {detailSubTab === 'overview' && (
            <div>
              <h3 className="font-bold text-[#181818] mb-1.5 uppercase tracking-wide text-[11px]">
                Product Overview
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {activeProduct.overview}
              </p>
            </div>
          )}

          {detailSubTab === 'features' && (
            <div>
              <h3 className="font-bold text-[#181818] mb-2 uppercase tracking-wide text-[11px]">
                Key Technical Features
              </h3>
              <ul className="space-y-2 text-[#6B6B6B]">
                {activeProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B51F32] mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailSubTab === 'benefits' && (
            <div>
              <h3 className="font-bold text-[#181818] mb-2 uppercase tracking-wide text-[11px]">
                Enterprise Business Benefits
              </h3>
              <ul className="space-y-2 text-[#6B6B6B]">
                {activeProduct.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F7D58] mt-1.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailSubTab === 'useCases' && (
            <div>
              <h3 className="font-bold text-[#181818] mb-2 uppercase tracking-wide text-[11px]">
                Production Use Cases
              </h3>
              <ul className="space-y-2 text-[#6B6B6B]">
                {activeProduct.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#181818] mt-1.5 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailSubTab === 'resources' && (
            <div className="space-y-2.5">
              <h3 className="font-bold text-[#181818] mb-1.5 uppercase tracking-wide text-[11px]">
                Collateral & Links
              </h3>

              <div
                onClick={() => showToast('Product Brochure downloaded ✓', 'success')}
                className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] flex items-center justify-between cursor-pointer hover:bg-[#EFEEEA] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#B51F32]" />
                  <div>
                    <p className="font-bold text-[#181818]">Executive Product Brochure</p>
                    <p className="text-[10px] text-[#6B6B6B]">PDF · 3.2 MB</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#6B6B6B]" />
              </div>

              <a
                href={activeProduct.resources?.websiteUrl || 'https://azure.microsoft.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] flex items-center justify-between hover:bg-[#EFEEEA] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#00A4EF]" />
                  <div>
                    <p className="font-bold text-[#181818]">Official Documentation & Specs</p>
                    <p className="text-[10px] text-[#6B6B6B]">azure.microsoft.com</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#6B6B6B]" />
              </a>
            </div>
          )}
        </div>

        {/* Interested Visitors Modal */}
        {showVisitorsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 animate-in fade-in">
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
      </div>
    );
  }

  // Showcase Products Catalog View
  return (
    <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
      {/* Header with Title and Add Product Button */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-[12px] font-bold text-[#181818] tracking-tight">Showcase Products</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Microsoft Booth B-14 Featured Solutions
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="h-9 px-3 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-95 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Featured Section Badge */}
      <div className="flex items-center justify-between bg-white px-2.5 py-2.5 rounded-lg border border-[#DEDCD7] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
          <span className="text-xs font-bold text-[#181818]">
            Featured Solutions ({companyProducts.length})
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#6B6B6B]">
          Exhibitor Booth B-14
        </span>
      </div>

      {/* Products List (Microsoft Only) */}
      <div className="space-y-3">
        {companyProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-[#DEDCD7] text-center space-y-3">
            <Package className="w-8 h-8 text-[#6B6B6B] mx-auto opacity-50" />
            <p className="text-[12px] font-semibold text-[#181818]">No featured products listed yet</p>
            <p className="text-xs text-[#6B6B6B]">Add your booth solutions to showcase them to attendees.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 px-3 py-2 bg-[#B51F32] text-white text-xs font-bold rounded-lg"
            >
              + Add First Product
            </button>
          </div>
        ) : (
          companyProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] hover:border-[#B51F32]/40 transition-all shadow-xs cursor-pointer flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#00A4EF]/10 border border-[#00A4EF]/20 flex items-center justify-center text-[#00A4EF] font-bold text-[12px] flex-shrink-0">
                    <Package className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                      {prod.category} · Booth {prod.booth}
                    </span>
                    <h3 className="text-[12px] font-bold text-[#181818] truncate">{prod.name}</h3>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 text-[#6B6B6B] hover:text-[#00A4EF] hover:bg-[#00A4EF]/10 rounded-lg transition-colors"
                    title="Edit Product"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingProductId(prod.id)}
                    className="p-1.5 text-[#6B6B6B] hover:text-[#B51F32] hover:bg-[#B51F32]/10 rounded-lg transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                {prod.tagline}
              </p>

              <div className="pt-2 border-t border-[#DEDCD7]/60 flex items-center justify-between text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3.5 h-3.5" />
                    <strong className="text-[#181818] font-mono">{prod.views}</strong> views
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5 text-[#B51F32]" />
                    <strong className="text-[#B51F32] font-mono">{prod.enquiries}</strong> enquiries
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#B51F32] hover:underline">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in">
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
