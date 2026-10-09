const fs = require('fs');
let code = fs.readFileSync('src/components/auth/AccessScreen.tsx', 'utf8');

const prefillButtonStr = `<button
                  type="button"
                  onClick={handleQuickPrefill}
                  className="mt-1.5 text-xs text-[#B51F32] font-semibold underline block"
                >
                  Prefill with Aarav Sharma (+91 9876543210)
                </button>`;

const newPrefillButtonStr = `<button
                  type="button"
                  onClick={handleQuickPrefill}
                  className="mt-1.5 text-xs text-[#B51F32] font-semibold underline block"
                >
                  Prefill with {role === 'exhibitor' ? 'Microsoft' : role === 'organizer' ? 'Admin' : 'Aarav Sharma (+91 9876543210)'}
                </button>`;

const successTextStr = `<p className="text-[11px] text-[#2F7D58]/80">Loading Delegate Home for Aarav Sharma...</p>`;
const newSuccessTextStr = `<p className="text-[11px] text-[#2F7D58]/80">
                  {role === 'exhibitor' ? 'Loading Booth Dashboard for Microsoft...' : role === 'organizer' ? 'Loading Command Hub...' : 'Loading Delegate Home for Aarav Sharma...'}
                </p>`;

const demoHelperStr = `{/* Quick Helper for Demo Evaluators */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-[#DEDCD7] text-xs text-[#6B6B6B]">
          <p className="font-semibold text-[#181818] mb-1">Pre-registered Attendee Record:</p>
          <div className="flex justify-between items-center text-[11px]">
            <span>Aarav Sharma · Google</span>
            <span className="font-mono text-[#181818]">+91 9876543210</span>
          </div>
          <div className="flex justify-between items-center text-[11px] mt-0.5">
            <span>Pass: Full Access Delegate</span>
            <span className="font-mono text-[#6B6B6B]">REG-ITS26-0842</span>
          </div>
        </div>`;

const newDemoHelperStr = `{/* Quick Helper for Demo Evaluators */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-[#DEDCD7] text-xs text-[#6B6B6B]">
          <p className="font-semibold text-[#181818] mb-1">Demo Pre-registered Record:</p>
          <div className="flex justify-between items-center text-[11px]">
            <span>{role === 'exhibitor' ? 'Microsoft Booth Admin' : role === 'organizer' ? 'System Administrator' : 'Aarav Sharma · Google'}</span>
            <span className="font-mono text-[#181818]">{role === 'exhibitor' ? 'MICROSOFT' : role === 'organizer' ? 'ADMIN' : '+91 9876543210'}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] mt-0.5">
            <span>Pass: {role === 'exhibitor' ? 'Exhibitor Portal' : role === 'organizer' ? 'Organizer Console' : 'Full Access Delegate'}</span>
            <span className="font-mono text-[#6B6B6B]">{role === 'exhibitor' ? 'EXH-ITS26-0014' : role === 'organizer' ? 'ORG-ITS26-0001' : 'REG-ITS26-0842'}</span>
          </div>
        </div>`;

code = code.replace(prefillButtonStr, newPrefillButtonStr);
code = code.replace(successTextStr, newSuccessTextStr);
code = code.replace(demoHelperStr, newDemoHelperStr);

fs.writeFileSync('src/components/auth/AccessScreen.tsx', code);
