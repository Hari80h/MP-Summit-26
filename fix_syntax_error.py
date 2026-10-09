import sys

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    content = f.read()

# We need to insert the missing block immediately after:
#         </div>
#       </div>
#
#                     <button
#                       onClick={(e) => {

search_str = """          </span>
        </div>
      </div>

                    <button
                      onClick={(e) => {"""

insertion = """          </span>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-[15px] font-bold text-[#181818] mb-3">Quick Links</h3>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
          {[
            { id: 'speakers', label: 'Speakers', icon: Users, tab: 'speakers' },
            { id: 'polls', label: 'Polls', icon: BarChart3, tab: 'polls' },
            { id: 'map', label: 'Map', icon: Building2, tab: 'map' },
            { id: 'sponsors', label: 'Sponsors', icon: Star, tab: 'sponsors' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveDelegateTab(item.tab as any)}
              className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl shadow-sm border border-[#DEDCD7] min-w-[92px] shrink-0 active:scale-95 transition-all"
            >
              <item.icon className="w-6 h-6 mb-2 text-[#181818]" />
              <span className="text-[13px] font-bold text-[#181818]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* My AI Recommendations (People) */}
      {recommendedPeople.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-bold text-[#181818]">My AI Recommendations</h3>
            <button 
              onClick={() => setActiveDelegateTab('network')}
              className="text-xs font-semibold text-[#181818] hover:underline flex items-center"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="overflow-x-auto no-scrollbar -mx-2 px-2 pb-4">
            <div className="flex gap-3 w-max">
              {recommendedPeople.map((person) => {
                const connected = isConnected(person.id);
                const pending = isPending(person.id);
                return (
                  <div
                    key={person.id}
                    onClick={() => setSelectedPersonId(person.id)}
                    className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DEDCD7] flex-shrink-0 w-[220px] flex flex-col justify-between gap-2.5 cursor-pointer shadow-sm hover:border-[#181818]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        {person.avatar ? (
                          <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#EFEBE5] flex items-center justify-center font-bold text-sm text-[#181818] flex-shrink-0 border border-[#DEDCD7]">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-bold text-[#181818] truncate leading-tight">
                            {person.name}
                          </h4>
                          <p className="text-[12px] text-[#6B6B6B] truncate mt-0.5">
                            {person.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {"""

if search_str in content:
    content = content.replace(search_str, insertion)
    with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
        f.write(content)
    print("Fixed syntax and restored layout!")
else:
    print("Could not find the search string to patch!")

