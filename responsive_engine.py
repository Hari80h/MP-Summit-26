import os
import glob
import re

files = glob.glob('src/components/**/*.tsx', recursive=True)
files.extend(glob.glob('src/app/**/*.tsx', recursive=True))

def scale_class(cls):
    
    # Text sizing
    if cls == 'text-2xl': return 'text-[18px]'
    if cls == 'text-xl': return 'text-[16px]'
    if cls == 'text-lg': return 'text-[14px]'
    if cls == 'text-base': return 'text-[13px]'
    if cls == 'text-sm': return 'text-[12px]'
    
    if cls.startswith('text-['):
        try:
            val = int(re.search(r'\d+', cls).group())
            if val >= 24: return f'text-[{val-4}px]'
            elif val >= 18: return f'text-[{val-3}px]'
            elif val >= 14: return f'text-[{val-2}px]'
            elif val == 13: return 'text-[12px]'
        except: pass

    # Paddings & Margins
    if cls in ['p-4', 'p-5', 'p-6']: return 'p-3'
    if cls in ['px-4', 'px-5', 'px-6']: return 'px-3'
    if cls in ['py-4', 'py-5', 'py-6']: return 'py-3'
    if cls in ['pt-4', 'pt-5', 'pt-6']: return 'pt-3'
    if cls in ['pb-4', 'pb-5', 'pb-6']: return 'pb-3'
    if cls in ['p-3']: return 'p-2.5'
    
    if cls in ['m-4', 'm-5', 'm-6']: return 'm-3'
    if cls in ['mx-4', 'mx-5', 'mx-6']: return 'mx-3'
    if cls in ['my-4', 'my-5', 'my-6']: return 'my-3'
    if cls in ['mt-4', 'mt-5', 'mt-6']: return 'mt-3'
    if cls in ['mb-4', 'mb-5', 'mb-6']: return 'mb-3'
    
    # Gaps
    if cls in ['gap-4', 'gap-5', 'gap-6']: return 'gap-3'
    if cls == 'gap-3': return 'gap-2'
    
    # Sizes
    if cls in ['h-12', 'h-14']: return 'h-10'
    if cls in ['w-12', 'w-14']: return 'w-10'
    if cls in ['w-10']: return 'w-8'
    if cls in ['h-10']: return 'h-8'
    
    # Rounded
    if cls == 'rounded-2xl': return 'rounded-[14px]'
    if cls == 'rounded-3xl': return 'rounded-2xl'
    if cls == 'rounded-xl': return 'rounded-lg'

    return cls

for filepath in files:
    if 'BottomNav' in filepath or 'DelegateHome' in filepath:
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    def replace_in_classname(match):
        inner = match.group(1)
        classes = inner.split()
        new_classes = [scale_class(c) for c in classes]
        
        # Specific root container fixes for consistency with Home
        if 'flex-1' in new_classes and 'bg-[#F6F4F0]' in new_classes and ('overflow-y-auto' in new_classes or 'pb-20' in new_classes or 'pb-16' in new_classes):
            if 'p-4' in new_classes: new_classes.remove('p-4')
            if 'p-3' in new_classes: new_classes.remove('p-3')
            if 'p-2.5' in new_classes: new_classes.remove('p-2.5')
            if 'px-4' in new_classes: new_classes.remove('px-4')
            if 'px-3' in new_classes: new_classes.remove('px-3')
            if 'pt-4' in new_classes: new_classes.remove('pt-4')
            if 'pt-3' in new_classes: new_classes.remove('pt-3')
            
            new_classes = [c for c in new_classes if not c.startswith('pb-') and not c.startswith('space-y-') and not c.startswith('px-') and not c.startswith('pt-')]
            
            new_classes.extend(['px-2', 'pt-2', 'pb-16', 'space-y-2'])
            
            seen = set()
            new_classes = [x for x in new_classes if not (x in seen or seen.add(x))]

        return f'className="{ " ".join(new_classes) }"'

    content = re.sub(r'className="([^"]+)"', replace_in_classname, content)

    # Hardcoded values
    content = content.replace('p-3.5', 'p-2.5')
    content = content.replace('py-3.5', 'py-2.5')
    content = content.replace('px-3.5', 'px-2.5')
    content = content.replace('h-[52px]', 'h-[44px]')
    content = content.replace('h-[60px]', 'h-[48px]')
    content = content.replace('w-[52px]', 'w-[44px]')

    with open(filepath, 'w') as f:
        f.write(content)

print("Applied responsive engine universally")
