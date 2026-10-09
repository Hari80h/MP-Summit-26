import os

def fix_speakers():
    with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
        c = f.read()
    
    # 1. Remove PageHeader import
    c = c.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
    
    # 2. Fix the layout and header
    old_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden px-2 pt-2 pb-16 space-y-2">
      <div className="pt-3 pb-3 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0 sticky top-0 z-10">
        <PageHeader title="Featured Speakers" subtitle="Learn from industry pioneers and visionaries" icon={Mic} theme="amber" onBack={() => setActiveDelegateTab('home')} />"""
    
    new_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      <div className="pt-4 pb-2 px-3 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · SPEAKERS</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Featured</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>"""
    c = c.replace(old_layout, new_layout)
    
    # 3. Move pb-16
    c = c.replace('<div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">', '<div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2 no-scrollbar">')
    
    with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
        f.write(c)

def fix_polls():
    with open('src/components/delegate/DelegatePolls.tsx', 'r') as f:
        c = f.read()
    c = c.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
    
    old_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden px-2 pt-2 pb-16 space-y-2">
      <div className="pt-3 pb-3 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0">
        <PageHeader title="Live Polls & Q&A" subtitle="Engage with ongoing sessions in real-time" icon={BarChart2} theme="purple" onBack={() => setActiveDelegateTab('home')} />"""
        
    new_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      <div className="pt-4 pb-2 px-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · INTERACT</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Live Polls</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>"""
    c = c.replace(old_layout, new_layout)
    c = c.replace('<div className="flex-1 overflow-y-auto p-3 space-y-2">', '<div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2">')
    
    with open('src/components/delegate/DelegatePolls.tsx', 'w') as f:
        f.write(c)

def fix_companies():
    with open('src/components/delegate/DelegateCompanies.tsx', 'r') as f:
        c = f.read()
    c = c.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
    
    old_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden px-2 pt-2 pb-16 space-y-2">
      <div className="pt-3 pb-3 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0">
        <PageHeader title="Exhibitor Directory" subtitle="Explore 400+ leading tech companies and startups" icon={Building2} theme="blue" onBack={() => setActiveDelegateTab('home')} />"""
        
    new_layout = """<div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      <div className="pt-4 pb-2 px-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · DIRECTORY</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Exhibitors</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>"""
    c = c.replace(old_layout, new_layout)
    c = c.replace('<div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">', '<div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2 no-scrollbar">')
    
    with open('src/components/delegate/DelegateCompanies.tsx', 'w') as f:
        f.write(c)
        
def fix_map():
    with open('src/components/delegate/DelegateMap.tsx', 'r') as f:
        c = f.read()
    c = c.replace('px-2 pt-2 pb-16 space-y-2', 'px-2 pt-2 space-y-2')
    c = c.replace('<div className="flex-1 bg-white rounded-[14px] border border-[#DEDCD7] overflow-hidden relative shadow-sm">', '<div className="flex-1 bg-white rounded-[14px] border border-[#DEDCD7] overflow-hidden relative shadow-sm mb-16">')
    with open('src/components/delegate/DelegateMap.tsx', 'w') as f:
        f.write(c)

fix_speakers()
fix_polls()
fix_companies()
fix_map()
print("Cleaned up headers and fixed pb-16 spacing")
