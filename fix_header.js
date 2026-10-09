const fs = require('fs');

let code = fs.readFileSync('src/components/delegate/DelegateHome.tsx', 'utf8');

const oldHeader = `        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
            {getGreetingIST()}
          </span>
          <h1 className="text-xl font-bold text-[#181818] tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs text-[#6B6B6B]">
            {currentUser.designation} · {currentUser.company}
          </p>
        </div>`;

const newHeader = `        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#888888] mb-1">
            {getGreetingIST()}
          </span>
          <h1 className="text-[26px] font-extrabold text-[#181818] tracking-tight leading-none mb-1.5">
            {currentUser.name}
          </h1>
          <p className="text-[13px] font-medium text-[#6B6B6B] leading-none">
            {currentUser.designation} <span className="opacity-50 mx-0.5">·</span> {currentUser.company}
          </p>
        </div>`;

code = code.replace(oldHeader, newHeader);

fs.writeFileSync('src/components/delegate/DelegateHome.tsx', code);
