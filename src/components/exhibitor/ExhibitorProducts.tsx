'use client';

import React, { useState, useMemo } from 'react';
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
  Check,
  UploadCloud
} from 'lucide-react';
import { Product } from '../../types';

export const ExhibitorProducts: React.FC = React.memo(() => {
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

  // Brochure Viewer & Upload modal state
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customBrochureUrl, setCustomBrochureUrl] = useState('');
  const brochureFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState('Cloud & AI');
  const [formOverview, setFormOverview] = useState('');

  // Delete confirm state
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Active exhibitor company is Truechip Solutions (Booth A-02)
  const exhibitorCompany = 'Truechip Solutions';
  const companyProducts = useMemo(
    () => products.filter((p) => p.company.toLowerCase().includes('truechip')),
    [products]
  );

  const activeProduct = useMemo(
    () => companyProducts.find((p) => p.id === selectedProductId),
    [companyProducts, selectedProductId]
  );

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
      category: formCategory.trim() || 'Verification IP & EDA',
      overview: formOverview.trim() || editingProduct.overview,
    });

    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormTagline('');
    setFormCategory('Verification IP & EDA');
    setFormOverview('');
    setShowAddModal(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    addProduct({
      name: formName.trim(),
      tagline: formTagline.trim() || 'Verification Solution by Truechip',
      category: formCategory.trim() || 'Verification IP & EDA',
      company: 'Truechip Solutions',
      booth: 'Hall 1 · A-02',
      image: '/images/exhibitors/truechip.png',
      views: 0,
      enquiries: 0,
      interestedVisitorsCount: 0,
      overview: formOverview.trim() || 'Official featured solution showcased at Truechip Booth A-02.',
      features: ['Silicon Proven', 'SystemVerilog / UVM Native', 'Comprehensive Test Suites'],
      benefits: ['Drastically cuts verification cycle', 'First-pass silicon success', 'Multi-simulator support'],
      useCases: ['ASIC & SoC Verification', 'Chiplet Integration', 'Semiconductor Emulation'],
      resources: { websiteUrl: 'https://www.truechip.net' },
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

  const handleDownloadBrochure = (prod: Product) => {
    if (prod.resources?.brochureUrl && prod.resources.brochureUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = prod.resources.brochureUrl;
      link.download = `${prod.name.replace(/[^a-zA-Z0-9]+/g, '_')}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Brochure downloaded successfully ✓', 'success');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${prod.name} — Product Brochure</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #181818; max-width: 800px; margin: 0 auto; line-height: 1.6; }
              .header { border-bottom: 3px solid #B51F32; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
              .brand { font-size: 13px; font-weight: 700; color: #B51F32; text-transform: uppercase; letter-spacing: 1.5px; }
              .title { font-size: 32px; font-weight: 800; margin: 8px 0 4px; color: #111; }
              .tagline { font-size: 18px; color: #555; }
              .badge { background: #FFF0F2; color: #B51F32; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; }
              .meta { background: #f7f7f7; padding: 12px 18px; border-radius: 8px; margin-bottom: 24px; display: flex; gap: 24px; font-size: 13px; font-weight: 600; }
              .section { margin-bottom: 24px; }
              .section h3 { font-size: 17px; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 12px; color: #111; }
              ul { padding-left: 20px; }
              li { margin-bottom: 8px; }
              .footer { border-top: 1px solid #eee; padding-top: 16px; margin-top: 40px; font-size: 12px; color: #777; display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="brand">${prod.company} · Official Solutions Showcase</div>
                <h1 class="title">${prod.name}</h1>
                <div class="tagline">${prod.tagline}</div>
              </div>
              <div><span class="badge">BOOTH ${prod.booth}</span></div>
            </div>
            <div class="meta">
              <div>Category: <strong>${prod.category}</strong></div>
              <div>Event: <strong>India Tech Summit 2026</strong></div>
            </div>
            <div class="section">
              <h3>Executive Overview</h3>
              <p>${prod.overview}</p>
            </div>
            <div class="section">
              <h3>Key Capabilities</h3>
              <ul>${prod.features.map((f: string) => `<li><strong>${f}</strong></li>`).join('')}</ul>
            </div>
            <div class="section">
              <h3>Enterprise Benefits</h3>
              <ul>${prod.benefits.map((b: string) => `<li>${b}</li>`).join('')}</ul>
            </div>
            <div class="section">
              <h3>Production Use Cases</h3>
              <ul>${prod.useCases.map((u: string) => `<li>${u}</li>`).join('')}</ul>
            </div>
            <div class="footer">
              <div>EventSphere Digital Experience Layer · MP Semiconductor Summit 2026 (MPSS26)</div>
              <div>Truechip Solutions · Booth ${prod.booth}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 400);
      showToast('Opening brochure print/save view ✓', 'success');
    }
  };

  const handleRemoveBrochure = (prod: Product) => {
    updateProduct(prod.id, {
      resources: {
        ...prod.resources,
        brochureUrl: undefined,
      },
    });
    setShowBrochureModal(false);
    showToast('Brochure removed from product ✓', 'info');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeProduct) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateProduct(activeProduct.id, {
        resources: {
          ...activeProduct.resources,
          brochureUrl: dataUrl,
        },
      });
      setShowUploadModal(false);
      showToast(`Brochure "${file.name}" uploaded successfully ✓`, 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAttachTemplateBrochure = () => {
    if (!activeProduct) return;
    const mockPdfName = `${activeProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-official-brochure.pdf`;
    updateProduct(activeProduct.id, {
      resources: {
        ...activeProduct.resources,
        brochureUrl: `https://eventsphere.blob.core.windows.net/brochures/${mockPdfName}`,
      },
    });
    setShowUploadModal(false);
    showToast('Official product brochure attached ✓', 'success');
  };

  const handleSaveCustomBrochureUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct || !customBrochureUrl.trim()) return;
    updateProduct(activeProduct.id, {
      resources: {
        ...activeProduct.resources,
        brochureUrl: customBrochureUrl.trim(),
      },
    });
    setCustomBrochureUrl('');
    setShowUploadModal(false);
    showToast('Brochure URL saved ✓', 'success');
  };

  const renderModals = () => (
    <React.Fragment>
      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-[18px] w-full max-w-sm p-4 space-y-3 shadow-2xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[17px] font-bold text-[#181818]">Edit Product</h3>
                <p className="text-[13px] text-[#6B6B6B]">Truechip Booth A-02</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 text-[#6B6B6B] hover:text-[#181818] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Product Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] placeholder:text-[13px]"
                  placeholder="e.g. Azure OpenAI Service"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] placeholder:text-[13px]"
                  placeholder="e.g. Advanced language models"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] bg-white"
                >
                  <option value="Cloud & AI">Cloud & AI</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Developer Tools">Developer Tools</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Overview</label>
                <textarea
                  value={formOverview}
                  onChange={(e) => setFormOverview(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] resize-none placeholder:text-[13px]"
                  placeholder="Brief overview of the product..."
                />
              </div>

              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-sm rounded-xl hover:bg-[#F6F4F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-sm rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brochure Viewer Modal */}
      {showBrochureModal && activeProduct && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-[20px] w-full max-w-sm max-h-[88vh] flex flex-col shadow-2xl border border-[#DEDCD7] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#DEDCD7] shrink-0 bg-[#FAFAF9]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F2] border border-[#FAD2D7] flex items-center justify-center text-[#B51F32]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#181818] leading-tight">Product Brochure</h3>
                  <p className="text-[11px] text-[#6B6B6B] truncate max-w-[200px]">{activeProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowBrochureModal(false)}
                className="p-1.5 text-[#6B6B6B] hover:text-[#181818] rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="p-4 space-y-3 text-xs">
              {/* File details pill */}
              <div className="p-3.5 bg-[#F6F4F0] rounded-xl border border-[#DEDCD7] flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#B51F32] border border-[#E5E7EB] shrink-0 font-bold text-[11px] shadow-2xs">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#181818] text-xs truncate">
                      {activeProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-brochure.pdf
                    </p>
                    <p className="text-[11px] text-[#6B6B6B]">Official Exhibitor Collateral · 2.4 MB</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-[#EBF5F0] text-[#2F7D58] px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EBEBEB] text-xs text-[#6B6B6B] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2F7D58] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Brochure is attached to <strong className="text-[#181818]">{activeProduct.name}</strong> and available for all delegates visiting Booth {activeProduct.booth}.
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-3 border-t border-[#DEDCD7] bg-[#FAFAF9] space-y-2 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadBrochure(activeProduct)}
                  className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBrochureModal(false);
                    setShowUploadModal(true);
                  }}
                  className="px-3 py-2.5 bg-white border border-[#DEDCD7] hover:bg-[#F6F4F0] text-[#181818] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  title="Replace with new file"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-[#6B6B6B]" />
                  <span>Replace</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => handleRemoveBrochure(activeProduct)}
                  className="text-[11px] text-[#B51F32] hover:underline flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove Brochure</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBrochureModal(false)}
                  className="text-xs font-semibold text-[#6B6B6B] hover:text-[#181818]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Brochure Modal */}
      {showUploadModal && activeProduct && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-[20px] w-full max-w-sm max-h-[88vh] flex flex-col shadow-2xl border border-[#DEDCD7] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#DEDCD7] shrink-0 bg-[#FAFAF9]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F2] border border-[#FAD2D7] flex items-center justify-center text-[#B51F32]">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#181818] leading-tight">Upload Brochure</h3>
                  <p className="text-[11px] text-[#6B6B6B] truncate max-w-[200px]">{activeProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 text-[#6B6B6B] hover:text-[#181818] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={brochureFileInputRef}
              accept="application/pdf,image/*,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Modal Body */}
            <div className="p-4 space-y-3.5 overflow-y-auto">
              {/* Option 1: Pick file from device */}
              <div
                onClick={() => brochureFileInputRef.current?.click()}
                className="p-5 border-2 border-dashed border-[#DEDCD7] hover:border-[#B51F32] bg-[#FAF9F6] hover:bg-[#FFF5F6] rounded-2xl text-center cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#B51F32] mx-auto shadow-xs group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181818]">Choose PDF / Document</p>
                  <p className="text-[11px] text-[#6B6B6B] mt-0.5">Click to select file from your device</p>
                </div>
                <span className="inline-block px-3 py-1 bg-white text-[#B51F32] border border-[#FAD2D7] text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-2xs">
                  Browse Device
                </span>
              </div>

              {/* Option 2: Generate Official Template */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#DEDCD7] w-full" />
                <span className="bg-white px-2 text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider absolute">
                  Or Instant Template
                </span>
              </div>

              <button
                type="button"
                onClick={handleAttachTemplateBrochure}
                className="w-full py-2.5 px-3 bg-white border border-[#DEDCD7] hover:border-[#B51F32] rounded-xl text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF0F2] text-[#B51F32] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181818]">Attach Official MPSS26 PDF</p>
                    <p className="text-[10px] text-[#6B6B6B]">Auto-formatted executive one-pager</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#B51F32] group-hover:underline shrink-0">
                  Attach ✓
                </span>
              </button>

              {/* Option 3: Document Link */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#DEDCD7] w-full" />
                <span className="bg-white px-2 text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider absolute">
                  Or Enter URL
                </span>
              </div>

              <form onSubmit={handleSaveCustomBrochureUrl} className="space-y-2">
                <label className="text-[11px] font-semibold text-[#181818] block">Brochure Web Link / Cloud URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customBrochureUrl}
                    onChange={(e) => setCustomBrochureUrl(e.target.value)}
                    placeholder="https://.../brochure.pdf"
                    className="flex-1 px-3 py-2 text-xs border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32]"
                  />
                  <button
                    type="submit"
                    disabled={!customBrochureUrl.trim()}
                    className="px-3.5 py-2 bg-[#181818] hover:bg-black disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#DEDCD7] bg-[#FAFAF9] flex justify-end">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="py-2 px-4 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-xl hover:bg-[#F6F4F0] transition-colors"
              >
                Cancel
              </button>
            </div>
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
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D11E39] px-2.5 py-1 rounded-md">
                  {activeProduct.category} · BOOTH {activeProduct.booth}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-[20px] font-bold text-[#111827] leading-snug">
                  {activeProduct.name}
                </h2>
                <div className="shrink-0 pt-0.5">
                  {activeProduct.resources?.brochureUrl ? (
                    <button
                      onClick={() => setShowBrochureModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0F2] text-[#B51F32] border border-[#FAD2D7] text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#FCE8E8] transition-colors shadow-2xs"
                      title="Open Product Brochure"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Brochure</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#181818] border border-[#DEDCD7] text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#F6F4F0] hover:border-[#B51F32] hover:text-[#B51F32] transition-colors shadow-2xs"
                      title="Upload Product Brochure"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#B51F32]" />
                      <span>Upload</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-[#4B5563] font-medium leading-relaxed">
                {activeProduct.tagline}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => enquireProduct(activeProduct.id)}
                className="flex-[2] h-11 bg-gradient-to-r from-[#151515] to-[#2A080D] hover:from-black hover:to-[#151515] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Product Enquiry</span>
              </button>

              <button
                onClick={() => setShowVisitorsModal(true)}
                className="flex-1 h-11 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] font-semibold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
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
              className={`flex-none px-4 py-3 text-sm font-semibold text-center transition-colors relative ${
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
        <div className="bg-white border border-[#E5E7EB] rounded-xl rounded-t-none p-5 shadow-sm text-sm space-y-4 relative z-20 mt-[-16px]">
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
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
            <div className="bg-white rounded-[18px] w-full max-w-md max-h-[85vh] overflow-y-auto p-4 space-y-3 shadow-xl border border-[#DEDCD7]">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#DEDCD7]">
                <div>
                  <h3 className="text-[17px] font-bold text-[#181818]">
                    Interested Visitors ({productVisitors.length})
                  </h3>
                  <p className="text-[13px] text-[#6B6B6B]">{activeProduct.name}</p>
                </div>
                <button
                  onClick={() => setShowVisitorsModal(false)}
                  className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#181818] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-[#EFEEEA] rounded-xl border border-[#DEDCD7] text-xs text-[#555] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F7D58] flex-shrink-0" />
                <span>Contact visibility strictly respects individual delegate privacy settings.</span>
              </div>

              <div className="space-y-2.5">
                {productVisitors.length === 0 ? (
                  <p className="text-sm text-center text-[#6B6B6B] py-4">No enquiries logged yet.</p>
                ) : (
                  productVisitors.map((v) => (
                    <div
                      key={v.id}
                      className="p-3 bg-[#F6F4F0] rounded-xl border border-[#DEDCD7] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#181818]">{v.name}</span>
                        <span className="text-[11px] font-mono text-[#6B6B6B]">{v.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#6B6B6B]">
                        {v.designation} · <strong className="text-[#181818] font-semibold">{v.company}</strong>
                      </p>
                      <div className="pt-1 flex items-center justify-between text-xs text-[#6B6B6B]">
                        <span>Email: <strong className="text-[#181818] font-medium">{v.email}</strong></span>
                        <span>Mobile: <strong className="text-[#181818] font-medium">{v.mobile}</strong></span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 flex items-center gap-2.5">
                <button
                  onClick={() => handleExportVisitorsCSV(activeProduct)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-sm rounded-xl shadow-xs hover:bg-[#F6F4F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowVisitorsModal(false)}
                  className="flex-1 py-2.5 bg-[#181818] text-white font-semibold text-sm rounded-xl shadow-xs hover:bg-black transition-colors"
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
            <p className="text-[13px] text-gray-300 font-medium">
              Truechip Booth A-02 Featured Solutions
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

      {/* Products List (Truechip Only) */}
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
              className="bg-white p-4 rounded-2xl border border-[#EBEBEB] hover:shadow-md transition-shadow shadow-sm cursor-pointer flex justify-between gap-3 group"
            >
              {/* Left: Text Content */}
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-1">
                  {prod.category} · Booth {prod.booth}
                </span>
                <h3 className="text-[17px] font-bold text-[#181818] leading-tight break-words mb-1">
                  {prod.name}
                </h3>
                <p className="text-[13px] text-[#555555] leading-relaxed line-clamp-2">
                  {prod.tagline}
                </p>
              </div>

              {/* Right: Actions & Details Link */}
              <div className="flex flex-col items-end justify-between shrink-0 py-0.5">
                <div className="flex items-center gap-1 -mr-1.5 -mt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 text-[#8A8A8A] hover:text-[#00A4EF] bg-transparent hover:bg-gray-50 rounded-md transition-colors"
                    title="Edit Product"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingProductId(prod.id)}
                    className="p-1.5 text-[#8A8A8A] hover:text-[#B51F32] bg-transparent hover:bg-gray-50 rounded-md transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-[12px] font-semibold text-[#737373] flex items-center gap-0.5 group-hover:text-[#B51F32] transition-colors mt-2">
                  View Details <ChevronRight className="w-3.5 h-3.5 -mr-0.5" />
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
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-[18px] w-full max-w-sm p-4 space-y-3 shadow-2xl border border-[#DEDCD7]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#DEDCD7]">
              <div>
                <h3 className="text-[17px] font-bold text-[#181818]">Add Featured Product</h3>
                <p className="text-[13px] text-[#6B6B6B]">Showcase to attendees at Truechip Booth A-02</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-[#6B6B6B] hover:text-[#181818] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-3">
              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Product Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] placeholder:text-[13px]"
                  placeholder="e.g. PCIe Gen 7 Verification IP"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] placeholder:text-[13px]"
                  placeholder="e.g. Generative AI-powered security analysis"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] bg-white"
                >
                  <option value="Cloud & AI">Cloud & AI</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Developer Tools">Developer Tools</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#181818] block mb-1.5">Overview</label>
                <textarea
                  value={formOverview}
                  onChange={(e) => setFormOverview(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DEDCD7] rounded-xl focus:outline-none focus:border-[#B51F32] resize-none placeholder:text-[13px]"
                  placeholder="Describe key benefits and capabilities..."
                />
              </div>

              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-sm rounded-xl hover:bg-[#F6F4F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-sm rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-[18px] w-full max-w-xs p-5 space-y-3 shadow-2xl border border-[#DEDCD7] text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-[#B51F32] mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-[17px] font-bold text-[#181818]">Delete Product?</h3>
              <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                Are you sure you want to remove this product from your booth showcase?
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => setDeletingProductId(null)}
                className="flex-1 py-2.5 bg-white border border-[#DEDCD7] text-[#181818] font-semibold text-sm rounded-xl hover:bg-[#F6F4F0] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const prod = products.find((p) => p.id === deletingProductId);
                  handleDelete(deletingProductId, prod?.name || 'Product');
                }}
                className="flex-1 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ExhibitorProducts.displayName = 'ExhibitorProducts';
