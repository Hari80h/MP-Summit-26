'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventMetadata,
  Person,
  Connection,
  Lead,
  Product,
  Session,
  Question,
  Poll,
  ExhibitorStats,
  DemoRole,
  QuestionStatus,
  LeadStatus,
  PrivacyConsent,
  InterestedVisitor
} from '../types';
import {
  INITIAL_EVENT,
  CURRENT_USER,
  INITIAL_ATTENDEES,
  INITIAL_CONNECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_LEADS,
  INITIAL_SESSIONS,
  INITIAL_QUESTIONS,
  INITIAL_POLL,
  INITIAL_EXHIBITORS,
  INITIAL_INTERESTED_VISITORS
} from './mockData';


interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & Role
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  activeDelegateTab: 'home' | 'people' | 'scan' | 'schedule' | 'profile' | 'companies' | 'company_detail' | 'edit_profile' | 'ai_recommendations' | 'speakers' | 'polls' | 'map' | 'sponsors';
  setActiveDelegateTab: (tab: 'home' | 'people' | 'scan' | 'schedule' | 'profile' | 'companies' | 'company_detail' | 'edit_profile' | 'ai_recommendations' | 'speakers' | 'polls' | 'map' | 'sponsors') => void;
  viewSavedPeopleOnly: boolean;
  setViewSavedPeopleOnly: (v: boolean) => void;
  viewSavedCompaniesOnly: boolean;
  setViewSavedCompaniesOnly: (v: boolean) => void;
  savedCompanyIds: string[];
  savedPeopleIds: string[];
  toggleSavePerson: (id: string) => void;
  toggleSaveCompany: (id: string) => void;
  activeExhibitorTab: 'home' | 'leads' | 'scan' | 'products' | 'more';
  setActiveExhibitorTab: (tab: 'home' | 'leads' | 'scan' | 'products' | 'more') => void;
  activeOrganizerTab: 'overview' | 'attendees' | 'exhibitors' | 'sessions' | 'analytics' | 'reports' | 'settings';
  setActiveOrganizerTab: (tab: 'overview' | 'attendees' | 'exhibitors' | 'sessions' | 'analytics' | 'reports' | 'settings') => void;

  // View frame mode for Delegate/Exhibitor (centered 430px frame vs full)
  viewMode: 'frame' | 'responsive';
  setViewMode: (mode: 'frame' | 'responsive') => void;

  // Connectivity & Offline Sync Demo
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  toggleConnectivity: () => void;
  isSyncing: boolean;
  syncPendingCount: number;
  lastSyncedTime: string;

  // Access Flow state
  hasAccessConfirmed: boolean;
  setHasAccessConfirmed: (confirmed: boolean) => void;
  triggerAccessFlow: (prefillMobile?: string, prefillEventId?: string) => void;

  // Selected details
  selectedPersonId: string | null;
  setSelectedPersonId: (id: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;

  // Core Data
  event: EventMetadata;
  currentUser: Person;
  updateCurrentUser: (data: Partial<Person>) => void;
  updateCurrentUserPrivacy: (newPrivacy: Partial<PrivacyConsent>) => void;
  attendees: Person[];
  setAttendees: React.Dispatch<React.SetStateAction<Person[]>>;
  connections: Connection[];
  leads: Lead[];
  products: Product[];
  sessions: Session[];
  questions: Question[];
  poll: Poll;
  exhibitors: ExhibitorStats[];
  interestedVisitors: InterestedVisitor[];

  // Mutators & Business Logic
  connectWith: (personId: string, source?: 'direct' | 'qr_scan' | 'recommended') => { success: boolean; alreadyConnected: boolean };
  disconnectFrom: (personId: string) => void;
  acceptConnectionRequest: (personId: string) => void;
  ignoreConnectionRequest: (personId: string) => void;
  saveLead: (leadData: Omit<Lead, 'id' | 'capturedAt'>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus, notes?: string) => void;
  enquireProduct: (productId: string) => void;
  toggleSaveProduct: (productId: string) => void;
  updateProduct: (productId: string, data: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (productData: Omit<Product, 'id'>) => void;
  submitQuestion: (sessionId: string, text: string, isAnonymous: boolean) => void;
  upvoteQuestion: (questionId: string) => { success: boolean; message?: string };
  updateQuestionStatus: (questionId: string, status: QuestionStatus) => void;
  votePoll: (optionId: string) => { success: boolean; message: string };
  togglePollStatus: () => void;
  toggleCheckIn: (personId: string) => void;
  addWalkInAttendee: (data: { name: string; email: string; mobile: string; company: string; designation: string; ticketType: string }) => void;
  importAttendeesMock: (count: number) => void;
  toggleBookmarkSession: (sessionId: string) => void;
  recordScan: () => void;
  resetAllData: () => void;

  // Notification Toast
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'eventsphere_mpss26_store_v9';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role
  const [role, setRoleState] = useState<DemoRole>('delegate');
  const [activeDelegateTab, setActiveDelegateTab] = useState<'home' | 'people' | 'scan' | 'schedule' | 'profile' | 'companies' | 'company_detail' | 'edit_profile' | 'ai_recommendations' | 'speakers' | 'polls' | 'map' | 'sponsors'>('home');
  const [viewSavedPeopleOnly, setViewSavedPeopleOnly] = useState<boolean>(false);
  const [viewSavedCompaniesOnly, setViewSavedCompaniesOnly] = useState<boolean>(false);
  const [activeExhibitorTab, setActiveExhibitorTab] = useState<'home' | 'leads' | 'scan' | 'products' | 'more'>('home');
  const [activeOrganizerTab, setActiveOrganizerTab] = useState<'overview' | 'attendees' | 'exhibitors' | 'sessions' | 'analytics' | 'reports' | 'settings'>('overview');
  const [viewMode, setViewMode] = useState<'frame' | 'responsive'>('frame');

  const toggleSaveCompany = (id: string) => {
    setSavedCompanyIds(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  // Connectivity
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncPendingCount, setSyncPendingCount] = useState<number>(0);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('12:40 PM');

  // Access Flow
  const [hasAccessConfirmed, setHasAccessConfirmed] = useState<boolean>(false);

  // Selected Detail Views
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>([]);
  const [savedPeopleIds, setSavedPeopleIds] = useState<string[]>([]);
  const toggleSavePerson = (id: string) => {
    setSavedPeopleIds((prev) => {
      const isSaved = prev.includes(id);
      if (isSaved) return prev.filter((pId) => pId !== id);
      return [...prev, id];
    });
  };


  // Entities
  const [event, setEvent] = useState<EventMetadata>(INITIAL_EVENT);
  const [currentUser, setCurrentUser] = useState<Person>(CURRENT_USER);
  const [attendees, setAttendees] = useState<Person[]>(INITIAL_ATTENDEES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [poll, setPoll] = useState<Poll>(INITIAL_POLL);
  const [exhibitors, setExhibitors] = useState<ExhibitorStats[]>(INITIAL_EXHIBITORS);
  const [interestedVisitors, setInterestedVisitors] = useState<InterestedVisitor[]>(INITIAL_INTERESTED_VISITORS);

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Show Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.event) {
          setEvent({
            ...INITIAL_EVENT,
            ...parsed.event,
            totalRegistered: parsed.event.totalRegistered || INITIAL_EVENT.totalRegistered,
            totalCheckedIn: parsed.event.totalCheckedIn || INITIAL_EVENT.totalCheckedIn,
            totalExhibitors: parsed.event.totalExhibitors || INITIAL_EVENT.totalExhibitors,
            totalSpeakers: parsed.event.totalSpeakers || INITIAL_EVENT.totalSpeakers,
            totalScans: parsed.event.totalScans || INITIAL_EVENT.totalScans,
            totalConnections: parsed.event.totalConnections || INITIAL_EVENT.totalConnections,
          });
        }
        if (parsed.currentUser) {
          const u = parsed.currentUser;
          if (!u.registrationId || u.registrationId.toLowerCase().includes('not public')) {
            u.registrationId = '#0523';
          }
          setCurrentUser(u);
        }
        if (parsed.attendees) {
          const existingIds = new Set(parsed.attendees.map((a: Person) => a.id));
          const missingSpeakers = INITIAL_ATTENDEES.filter((a) => !existingIds.has(a.id));
          const allAttendees = [...parsed.attendees, ...missingSpeakers];
          const sanitized = allAttendees.map((a: Person) => {
            if (!a.registrationId || a.registrationId.toLowerCase().includes('not public') || a.registrationId.toLowerCase().includes('unlisted')) {
              const num = String(Math.abs(a.id.split('').reduce((acc: number, c: string) => ((acc << 5) - acc) + c.charCodeAt(0), 0)) % 9000 + 1000).padStart(4, '0');
              return { ...a, registrationId: `#${num}` };
            }
            return a;
          });
          setAttendees(sanitized);
        } else {
          setAttendees(INITIAL_ATTENDEES);
        }
        if (parsed.connections) setConnections(parsed.connections);
        if (parsed.leads && parsed.leads.length > 0) setLeads(parsed.leads);
        else setLeads(INITIAL_LEADS);
        if (parsed.products) setProducts(parsed.products);
        if (parsed.sessions) {
          const userBookmarks = new Map(parsed.sessions.map((s: Session) => [s.id, s.isBookmarked]));
          const freshSessions = INITIAL_SESSIONS.map((s) => ({
            ...s,
            isBookmarked: userBookmarks.get(s.id) ?? s.isBookmarked ?? false,
          }));
          setSessions(freshSessions);
        } else {
          setSessions(INITIAL_SESSIONS);
        }
        if (parsed.questions) setQuestions(parsed.questions);
        if (parsed.poll) setPoll(parsed.poll);
        if (parsed.exhibitors) setExhibitors(parsed.exhibitors);
        if (parsed.interestedVisitors) setInterestedVisitors(parsed.interestedVisitors);
        if (parsed.role) setRoleState(parsed.role);
        // if (typeof parsed.hasAccessConfirmed === 'boolean') setHasAccessConfirmed(parsed.hasAccessConfirmed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const payload = {
        event,
        currentUser,
        attendees,
        connections,
        leads,
        products,
        sessions,
        questions,
        poll,
        exhibitors,
        interestedVisitors,
        role,
        /* hasAccessConfirmed */
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [
    event,
    currentUser,
    attendees,
    connections,
    leads,
    products,
    sessions,
    questions,
    poll,
    exhibitors,
    interestedVisitors,
    role,
    hasAccessConfirmed,
  ]);

  // Set role with tab preservation
  const setRole = (newRole: DemoRole) => {
    setRoleState(newRole);
    showToast(`Switched to ${newRole === 'delegate' ? 'Delegate (Aarav)' : newRole === 'exhibitor' ? 'Exhibitor (Microsoft B-14)' : 'Organizer Console'} view`, 'info');
  };

  // Connectivity toggle
  const toggleConnectivity = () => {
    if (isOnline) {
      setIsOnline(false);
      showToast('Switched to Offline Mode · Sync pending for new actions', 'info');
    } else {
      setIsSyncing(true);
      showToast('Syncing offline data with EventSphere server...', 'info');
      setTimeout(() => {
        setIsSyncing(false);
        setIsOnline(true);
        setSyncPendingCount(0);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSyncedTime(timeStr);
        // Mark pending leads as synced
        setLeads((prev) => prev.map((l) => ({ ...l, syncStatus: 'synced' })));
        showToast('Synced ✓ All data up to date', 'success');
      }, 1200);
    }
  };

  // Trigger Access Flow
  const triggerAccessFlow = () => {
    setHasAccessConfirmed(false);
    setActiveDelegateTab('home');
  };

  // Update privacy
  const updateCurrentUser = (data: Partial<Person>) => {
    setCurrentUser((prev) => {
      const updatedUser = { ...prev, ...data };
      setAttendees((att) => att.map((a) => (a.id === prev.id ? updatedUser : a)));
      return updatedUser;
    });
    showToast('Profile updated ✓', 'success');
  };

  const updateCurrentUserPrivacy = (newPrivacy: Partial<PrivacyConsent>) => {
    setCurrentUser((prev) => {
      const updatedPrivacy = { ...prev.privacy, ...newPrivacy };
      // Also update in attendees list
      setAttendees((att) =>
        att.map((a) => (a.id === prev.id ? { ...a, privacy: updatedPrivacy } : a))
      );
      return {
        ...prev,
        privacy: updatedPrivacy,
      };
    });
    showToast('Privacy preferences updated ✓', 'success');
  };

  // Record a QR scan
  const recordScan = () => {
    setEvent((prev) => ({
      ...prev,
      totalScans: prev.totalScans + 1,
    }));
  };

  // Connect with person (Delegate)
  const connectWith = (personId: string, source: 'direct' | 'qr_scan' | 'recommended' = 'direct') => {
    const existing = connections.find((c) => c.personId === personId);
    const targetPerson = attendees.find((a) => a.id === personId);
    if (!targetPerson) return { success: false, alreadyConnected: false };

    if (existing) {
      return { success: true, alreadyConnected: true };
    }

    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      personId: targetPerson.id,
      personName: targetPerson.name,
      designation: targetPerson.designation,
      company: targetPerson.company,
      avatar: targetPerson.avatar,
      status: source === 'qr_scan' ? 'connected' : 'pending',
      type: 'sent',
      source,
      connectedAt: 'Just now',
    };

    setConnections((prev) => [newConnection, ...prev]);

    // Update global event metrics
    setEvent((prev) => ({
      ...prev,
      totalConnections: prev.totalConnections + 1,
      totalScans: source === 'qr_scan' ? prev.totalScans + 1 : prev.totalScans,
    }));

    if (!isOnline) {
      setSyncPendingCount((c) => c + 1);
    }

    showToast(`Sent connection request to ${targetPerson.name} ✓`, 'success');
    return { success: true, alreadyConnected: false };
  };

  // Disconnect from person
  const disconnectFrom = (personId: string) => {
    const existing = connections.find((c) => c.personId === personId);
    if (!existing) return;

    setConnections((prev) => prev.filter((c) => c.personId !== personId));

    const targetPerson = attendees.find((a) => a.id === personId);
    if (targetPerson) {
      showToast(`Disconnected from ${targetPerson.name}`, 'info');
    }

    setEvent((prev) => ({
      ...prev,
      totalConnections: Math.max(0, prev.totalConnections - 1),
    }));
  };

  const acceptConnectionRequest = (personId: string) => {
    setConnections(prev => prev.map(c => 
      c.personId === personId && c.type === 'received' && c.status === 'pending'
        ? { ...c, status: 'connected', connectedAt: 'Just now' }
        : c
    ));
    showToast('Connection request accepted', 'success');
  };

  const ignoreConnectionRequest = (personId: string) => {
    setConnections(prev => prev.filter(c => !(c.personId === personId && c.type === 'received' && c.status === 'pending')));
  };

  // Save Lead (Exhibitor)
  const saveLead = (leadData: Omit<Lead, 'id' | 'capturedAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      capturedAt: 'Just now',
      syncStatus: isOnline ? 'synced' : 'pending',
    };

    setLeads((prev) => [newLead, ...prev]);

    // Update Microsoft stats
    setExhibitors((prev) =>
      prev.map((ex) =>
        ex.company === 'Microsoft'
          ? { ...ex, leads: ex.leads + 1 }
          : ex
      )
    );

    // Update event metrics
    setEvent((prev) => ({
      ...prev,
      totalScans: prev.totalScans + 1,
    }));

    if (!isOnline) {
      setSyncPendingCount((c) => c + 1);
      showToast(`Lead saved for ${leadData.name} (Sync pending)`, 'info');
    } else {
      showToast(`Lead saved for ${leadData.name} ✓`, 'success');
    }
  };

  // Update Lead Status
  const updateLeadStatus = (leadId: string, status: LeadStatus, notes?: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status, ...(notes !== undefined ? { notes } : {}) }
          : l
      )
    );
    showToast(`Lead updated to ${status} ✓`, 'success');
  };

  // Enquire product
  const enquireProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Increment enquiries and interested visitors count
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              enquiries: p.enquiries + 1,
              interestedVisitorsCount: p.interestedVisitorsCount + 1,
            }
          : p
      )
    );

    // Update Microsoft booth stats
    setExhibitors((prev) =>
      prev.map((ex) =>
        ex.company === 'Microsoft'
          ? { ...ex, enquiries: ex.enquiries + 1 }
          : ex
      )
    );

    // Add currentUser to interested visitors (respecting privacy consent!)
    const alreadyVisitor = interestedVisitors.find(
      (v) => v.productId === productId && v.personId === currentUser.id
    );

    if (!alreadyVisitor) {
      const newVisitor: InterestedVisitor = {
        id: `v-${Date.now()}`,
        productId,
        personId: currentUser.id,
        name: currentUser.name,
        designation: currentUser.designation,
        company: currentUser.company,
        email: currentUser.privacy.shareEmail ? currentUser.email : 'Not shared',
        mobile: currentUser.privacy.sharePhone ? currentUser.mobile : 'Not shared',
        linkedin: (currentUser.privacy.shareLinkedIn && currentUser.linkedin) ? currentUser.linkedin : 'Not shared',
        interactionType: 'enquiry',
        timestamp: 'Just now',
      };
      setInterestedVisitors((prev) => [newVisitor, ...prev]);
    }

    showToast(`Enquiry submitted for ${product.name} ✓`, 'success');
  };

  // Save/Bookmark Product
  const toggleSaveProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.isSaved;
          showToast(nextState ? `Saved ${p.name} to your items` : `Removed ${p.name} from saved`, 'info');
          return { ...p, isSaved: nextState };
        }
        return p;
      })
    );
  };

  // Update product (Exhibitor)
  const updateProduct = (productId: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...data } : p))
    );
    showToast('Product updated successfully ✓', 'success');
  };

  // Delete product (Exhibitor)
  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from showcase ✓', 'info');
  };

  // Add product (Exhibitor)
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-microsoft-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('New product added to showcase ✓', 'success');
  };

  // Submit Q&A Question
  const submitQuestion = (sessionId: string, text: string, isAnonymous: boolean) => {
    if (!text.trim()) return;

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      sessionId,
      text: text.trim(),
      authorName: isAnonymous ? 'Anonymous' : currentUser.name,
      authorId: isAnonymous ? 'usr-anon' : currentUser.id,
      isAnonymous,
      status: 'Submitted',
      upvotes: 1,
      upvotedBy: [currentUser.id],
      createdAt: 'Just now',
    };

    setQuestions((prev) => [newQuestion, ...prev]);

    // Update session questions count
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, questionsCount: s.questionsCount + 1 } : s
      )
    );

    showToast('Question submitted ✓', 'success');
  };

  // Upvote Question
  const upvoteQuestion = (questionId: string) => {
    const q = questions.find((item) => item.id === questionId);
    if (!q) return { success: false };

    const alreadyUpvoted = q.upvotedBy.includes(currentUser.id);
    if (alreadyUpvoted) {
      // remove upvote
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === questionId
            ? {
                ...item,
                upvotes: Math.max(0, item.upvotes - 1),
                upvotedBy: item.upvotedBy.filter((id) => id !== currentUser.id),
              }
            : item
        )
      );
      return { success: true, message: 'Upvote removed' };
    } else {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === questionId
            ? {
                ...item,
                upvotes: item.upvotes + 1,
                upvotedBy: [...item.upvotedBy, currentUser.id],
              }
            : item
        )
      );
      showToast('Question upvoted ✓', 'success');
      return { success: true };
    }
  };

  // Update question status (Moderator action)
  const updateQuestionStatus = (questionId: string, status: QuestionStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, status } : q))
    );
    showToast(`Question marked as ${status} ✓`, 'info');
  };

  // Vote in Poll
  const votePoll = (optionId: string) => {
    if (poll.voterIds.includes(currentUser.id)) {
      return { success: false, message: 'You have already voted.' };
    }

    setPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      voterIds: [...prev.voterIds, currentUser.id],
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));

    showToast('Poll vote recorded ✓', 'success');
    return { success: true, message: 'Vote submitted ✓' };
  };

  // Toggle Poll Status (Open / Closed)
  const togglePollStatus = () => {
    setPoll((prev) => {
      const nextStatus = prev.status === 'open' ? 'closed' : 'open';
      showToast(`Poll is now ${nextStatus.toUpperCase()}`, 'info');
      return { ...prev, status: nextStatus };
    });
  };

  // Toggle check-in (Organizer)
  const toggleCheckIn = (personId: string) => {
    setAttendees((prev) =>
      prev.map((p) => {
        if (p.id === personId) {
          const next = !p.checkedIn;
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...p,
            checkedIn: next,
            checkInTime: next ? `12 Feb 2026, ${nowStr}` : undefined,
          };
        }
        return p;
      })
    );

    setEvent((prev) => {
      const target = attendees.find((a) => a.id === personId);
      const isCurrentlyCheckedIn = target?.checkedIn;
      return {
        ...prev,
        totalCheckedIn: isCurrentlyCheckedIn ? prev.totalCheckedIn - 1 : prev.totalCheckedIn + 1,
      };
    });

    if (!isOnline) {
      setSyncPendingCount((c) => c + 1);
    }

    showToast('Check-in status updated ✓', 'success');
  };

  // Add Walk-in Attendee (Organizer)
  const addWalkInAttendee = (data: {
    name: string;
    email: string;
    mobile: string;
    company: string;
    designation: string;
    ticketType: string;
  }) => {
    const newPerson: Person = {
      id: `usr-walkin-${Date.now()}`,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      company: data.company,
      designation: data.designation,
      ticketType: data.ticketType,
      role: 'delegate',
      bio: 'On-site walk-in registered delegate.',
      interests: ['General Tech', 'Networking'],
      skills: [],
      linkedin: '',
      registrationId: `REG-MPSS26-${Math.floor(1000 + Math.random() * 9000)}`,
      checkedIn: true,
      checkInTime: '23 Oct 2026, Just now',
      privacy: {
        preset: 'Connections Only',
        shareEmail: true,
        sharePhone: false,
        shareLinkedIn: true,
      },
    };

    setAttendees((prev) => [newPerson, ...prev]);
    setEvent((prev) => ({
      ...prev,
      totalRegistered: prev.totalRegistered + 1,
      totalCheckedIn: prev.totalCheckedIn + 1,
    }));

    showToast(`Walk-in attendee ${data.name} checked in ✓`, 'success');
  };

  // Import mock CSV attendees
  const importAttendeesMock = (count: number) => {
    setEvent((prev) => ({
      ...prev,
      totalRegistered: prev.totalRegistered + count,
    }));
    showToast(`Successfully imported ${count} registrations from CSV ✓`, 'success');
  };

  // Toggle bookmark session
  const toggleBookmarkSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const next = !s.isBookmarked;
          showToast(next ? `Session added to My Schedule ✓` : `Session removed from My Schedule`, 'info');
          return { ...s, isBookmarked: next };
        }
        return s;
      })
    );
  };

  // Reset all data
  const resetAllData = () => {
    setEvent(INITIAL_EVENT);
    setCurrentUser(CURRENT_USER);
    setAttendees(INITIAL_ATTENDEES);
    setConnections(INITIAL_CONNECTIONS);
    setLeads(INITIAL_LEADS);
    setProducts(INITIAL_PRODUCTS);
    setSessions(INITIAL_SESSIONS);
    setQuestions(INITIAL_QUESTIONS);
    setPoll(INITIAL_POLL);
    setExhibitors(INITIAL_EXHIBITORS);
    setInterestedVisitors(INITIAL_INTERESTED_VISITORS);
    setRoleState('delegate');
    setHasAccessConfirmed(false);
    setIsOnline(true);
    setSyncPendingCount(0);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Demo data reset to initial state ✓', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        role,
        setRole,
        activeDelegateTab,
    viewSavedPeopleOnly,
    setViewSavedPeopleOnly,
    viewSavedCompaniesOnly,
    savedCompanyIds,
    savedPeopleIds,
    toggleSavePerson,
    toggleSaveCompany,
    setViewSavedCompaniesOnly,
        setActiveDelegateTab,
        activeExhibitorTab,
        setActiveExhibitorTab,
        activeOrganizerTab,
        setActiveOrganizerTab,
        viewMode,
        setViewMode,
        isOnline,
        setIsOnline,
        toggleConnectivity,
        isSyncing,
        syncPendingCount,
        lastSyncedTime,
        hasAccessConfirmed,
        setHasAccessConfirmed,
        triggerAccessFlow,
        selectedPersonId,
        setSelectedPersonId,
        selectedProductId,
        setSelectedProductId,
        selectedSessionId,
        setSelectedSessionId,
        selectedCompanyId,
        setSelectedCompanyId,
        event,
        currentUser,
        updateCurrentUser,
        updateCurrentUserPrivacy,
        attendees,
        setAttendees,
        connections,
        leads,
        products,
        sessions,
        questions,
        poll,
        exhibitors,
        interestedVisitors,
        connectWith,
        disconnectFrom,
        acceptConnectionRequest,
        ignoreConnectionRequest,
        saveLead,
        updateLeadStatus,
        enquireProduct,
        toggleSaveProduct,
        updateProduct,
        deleteProduct,
        addProduct,
        submitQuestion,
        upvoteQuestion,
        updateQuestionStatus,
        votePoll,
        togglePollStatus,
        toggleCheckIn,
        addWalkInAttendee,
        importAttendeesMock,
        toggleBookmarkSession,
        recordScan,
        resetAllData,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
