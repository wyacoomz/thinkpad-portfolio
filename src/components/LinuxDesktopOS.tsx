import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Folder,
  FileText,
  Settings,
  Cpu,
  Mail,
  ExternalLink,
  Minus,
  Square,
  X,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Download,
  Copy,
  Check,
  Search,
  Maximize2,
  Minimize2,
  Power,
  ChevronRight,
  Shield,
  Code,
  Briefcase,
  GraduationCap,
  Layers,
  FileSpreadsheet,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export interface WindowState {
  id: 'pipeline' | 'terminal' | 'projects' | 'resume' | 'notes' | 'about' | 'contact';
  title: string;
  shortTitle: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface LinuxDesktopOSProps {
  onPlayKeyClick?: () => void;
  onExitFocus?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isStandaloneOverlay?: boolean;
}

export const LinuxDesktopOS: React.FC<LinuxDesktopOSProps> = ({
  onPlayKeyClick = () => {},
  onExitFocus,
  soundEnabled = true,
  onToggleSound,
  isStandaloneOverlay = false
}) => {
  // Clock state
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Start / Index Menu State
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  // Window management state
  const [highestZ, setHighestZ] = useState<number>(10);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    pipeline: {
      id: 'pipeline',
      title: '01 // Dynamics 365 Invoice Automation Studio',
      shortTitle: 'D365 Studio',
      icon: '⚙️',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5
    },
    terminal: {
      id: 'terminal',
      title: '02 // Interactive Terminal — wyacoomz@trufe-rpa',
      shortTitle: 'Terminal',
      icon: '💻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4
    },
    projects: {
      id: 'projects',
      title: '03 // Work Archive (~/work) — Production Enterprise Bots & Apps',
      shortTitle: 'Work Archive',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3
    },
    resume: {
      id: 'resume',
      title: '04 // Abdul_Samad_Khan_Resume.pdf — Document Viewer',
      shortTitle: 'Resume.pdf',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    notes: {
      id: 'notes',
      title: '05 // Engineering Field Notes & LeetCode Benchmarks',
      shortTitle: 'Field Notes',
      icon: '📝',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    about: {
      id: 'about',
      title: '06 // System Specs & Core Technical Competencies',
      shortTitle: 'System Specs',
      icon: '👤',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    contact: {
      id: 'contact',
      title: '07 // Dispatch & Communication Channels',
      shortTitle: 'Dispatch',
      icon: '🌐',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    }
  });

  const focusWindow = (id: string) => {
    onPlayKeyClick();
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((wMap) => {
        if (!wMap[id]) return wMap;
        return {
          ...wMap,
          [id]: {
            ...wMap[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        };
      });
      return nextZ;
    });
  };

  const closeWindow = (id: string) => {
    onPlayKeyClick();
    setWindows((wMap) => ({
      ...wMap,
      [id]: { ...wMap[id], isOpen: false }
    }));
  };

  const toggleMinimizeWindow = (id: string) => {
    onPlayKeyClick();
    setWindows((wMap) => ({
      ...wMap,
      [id]: { ...wMap[id], isMinimized: !wMap[id].isMinimized }
    }));
  };

  const toggleMaximizeWindow = (id: string) => {
    onPlayKeyClick();
    setWindows((wMap) => ({
      ...wMap,
      [id]: { ...wMap[id], isMaximized: !wMap[id].isMaximized }
    }));
  };

  const showDesktop = () => {
    onPlayKeyClick();
    setWindows((wMap) => {
      const allMin = Object.values(wMap).every((w) => w.isMinimized || !w.isOpen);
      const nextMap = { ...wMap };
      Object.keys(nextMap).forEach((k) => {
        if (nextMap[k].isOpen) {
          nextMap[k] = { ...nextMap[k], isMinimized: !allMin };
        }
      });
      return nextMap;
    });
  };

  // Pipeline Simulator State (5 stages matching portfolio WorkflowDiagram.tsx)
  const [pipelineStage, setPipelineStage] = useState<number>(0);
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [processedInvoices, setProcessedInvoices] = useState<number>(1248);

  const pipelineStages = [
    {
      num: "01",
      name: "Cloud Ingestion Buffer",
      shortTitle: "Ingestion",
      tech: "Power Automate Cloud",
      icon: Layers,
      summary: "Event-driven PDF intake & binary staging buffer across 5 subsidiaries with MIME validation.",
      metric: "Zero Polling Latency // UUID Staging"
    },
    {
      num: "02",
      name: "Document Intelligence (OCR)",
      shortTitle: "AI Builder",
      tech: "Microsoft AI Builder",
      icon: Cpu,
      summary: "Trained document intelligence extracts PO, invoice numbers, GL codes, line-item tables, and tax sums.",
      metric: "99.2% Accuracy // Model Gating"
    },
    {
      num: "03",
      name: "Deterministic Integrity Gate",
      shortTitle: "Validation Gate",
      tech: "Python / Cloud Flow",
      icon: ShieldAlert,
      summary: "Strict threshold: floating-point confidence >= 0.90 and sum(line_items) == gross_total (0.01 tolerance).",
      metric: "Confidence >= 0.90 // Zero Bad Commits"
    },
    {
      num: "04",
      name: "Human-in-the-Loop Routing",
      shortTitle: "HITL Review",
      tech: "Adaptive Cards & Outlook",
      icon: UserCheck,
      summary: "Exception approval loop with inline PDF snippet preview directly in reviewer inbox for rapid sign-off.",
      metric: "Audit Trail // Digital Sign-Off"
    },
    {
      num: "05",
      name: "Dynamics 365 ERP Upload",
      shortTitle: "ERP Commit",
      tech: "Python / OpenPyXL / D365",
      icon: FileSpreadsheet,
      summary: "Generates 5 entity-segregated Excel workbooks for unattended D365 Data Management batch commit.",
      metric: "5 Subsidiaries // Automated Batch"
    }
  ];

  const runPipelineStep = () => {
    onPlayKeyClick();
    if (pipelineRunning) return;
    setPipelineRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 5) {
        setPipelineStage(step);
      } else {
        clearInterval(interval);
        setPipelineRunning(false);
        setPipelineStage(0);
        setProcessedInvoices((prev) => prev + 1);
      }
    }, 700);
  };

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([
    {
      command: 'whoami',
      output: [
        'Abdul Samad Khan (Handle: wyacoomz)',
        'Role: RPA Developer @ Trufe (2025–Present)',
        'Stack: Power Automate Cloud/Desktop, AI Builder, Dynamics 365, Python, React',
        'Education: B.Tech in AI & Data Science (OIST, 2021–2025)',
        'Benchmarks: 150+ LeetCode Solved (DP, Graphs, Trees, Two Pointers)'
      ]
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    onPlayKeyClick();

    let output: string[] = [];
    switch (cmd) {
      case 'help':
        output = [
          'Editorial Shell Commands:',
          '  • whoami     - Developer profile, role & credentials',
          '  • pipeline   - Launch Dynamics 365 Automation Studio',
          '  • projects   - Launch Projects Explorer archive',
          '  • skills     - Technical competency breakdown',
          '  • leetcode   - View LeetCode benchmarks (150+ Solved)',
          '  • resume     - Open PDF Resume Document Viewer',
          '  • contact    - Contact channels & social profiles',
          '  • neofetch   - Studio Workstation hardware specs',
          '  • clear      - Clear terminal history'
        ];
        break;
      case 'whoami':
        output = [
          'Developer Identity:',
          '  • Name: Abdul Samad Khan (Handle: wyacoomz)',
          '  • Role: RPA Developer @ Trufe (2025–Present)',
          '  • Former: React Native Intern @ Skyinfo-group (2025)',
          '  • Education: B.Tech in AI & Data Science (OIST, 2021–2025)',
          '  • Location: Bhopal, India (IST UTC +05:30)'
        ];
        break;
      case 'pipeline':
        focusWindow('pipeline');
        output = ['Launched Dynamics 365 Invoice Automation Studio window.'];
        break;
      case 'projects':
        focusWindow('projects');
        output = ['Opened Projects Explorer (~/work).'];
        break;
      case 'skills':
        focusWindow('about');
        output = [
          'Core Technical Competencies:',
          '  [Enterprise RPA]: Power Automate Cloud/Desktop, AI Builder, Dynamics 365 ERP',
          '  [Programming]: Python (OpenPyXL, pandas), JavaScript/TypeScript, SQL',
          '  [Full-Stack]: React, Node.js, Express, REST APIs, MongoDB, Tailwind CSS',
          '  [Systems]: Linux, Git/GitHub, Docker, Windows Automation, Postman'
        ];
        break;
      case 'leetcode':
        focusWindow('notes');
        output = [
          'LeetCode Problem Solving Benchmarks:',
          '  • Total Problems Solved: 150+ Verified',
          '  • Focus Domains: Dynamic Programming, Graph Traversal (BFS/DFS), Trees, Two Pointers',
          '  • Platform Handle: wyacoomz'
        ];
        break;
      case 'resume':
        focusWindow('resume');
        output = ['Opened Abdul_Samad_Khan_Resume.pdf Document Viewer.'];
        break;
      case 'contact':
        focusWindow('contact');
        output = [
          'Communication Channels:',
          '  • Email: abdulischad@gmail.com',
          '  • Phone: +91 97520 90623',
          '  • LinkedIn: linkedin.com/in/abdul-samad-khan-b20b29237',
          '  • GitHub: github.com/wyacoomz'
        ];
        break;
      case 'neofetch':
        focusWindow('about');
        output = [
          'Studio Ultrabook 16″ CNC Aluminum Workstation',
          'OS: Ubuntu 24.04 LTS (x86_64)',
          'Kernel: Linux 6.8.0-45-generic',
          'Host: DevBook Pro 16″ Liquid Retina',
          'RAM: 32GB DDR4 | Display: 16:10 94% Screen-to-Body'
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = [`Command not found: "${cmd}". Type "help" to view valid commands.`];
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Projects window filter
  const [projectFilter, setProjectFilter] = useState<'all' | 'rpa' | 'web' | 'data'>('all');
  const filteredProjects = PROJECTS.filter((p) => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'rpa') return p.category === 'Enterprise Automation';
    if (projectFilter === 'web') return p.category === 'Full-Stack Web';
    if (projectFilter === 'data') return p.category === 'Data & Financial' || p.category === 'Systems & Tooling';
    return true;
  });

  // Copied state for contact
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    onPlayKeyClick();
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Refined Desktop Icons Definition
  const desktopShortcuts = [
    { id: 'pipeline', num: '01', label: 'D365 Studio', sub: 'Invoice Pipeline', icon: Layers, accent: 'bg-[#264233] text-white' },
    { id: 'terminal', num: '02', label: 'Terminal', sub: 'Bash Shell', icon: TerminalIcon, accent: 'bg-[#141413] text-[#86efac]' },
    { id: 'projects', num: '03', label: 'Work Archive', sub: '7 Enterprise Bots', icon: Folder, accent: 'bg-[#4A5543] text-white' },
    { id: 'resume', num: '04', label: 'Resume.pdf', sub: 'Verified CV', icon: FileText, accent: 'bg-[#223843] text-white' },
    { id: 'notes', num: '05', label: 'Field Notes', sub: 'Case Studies', icon: Sparkles, accent: 'bg-[#8B4513] text-white' },
    { id: 'about', num: '06', label: 'Benchmarks', sub: '150+ LeetCode', icon: Flame, accent: 'bg-[#264233] text-white' },
    { id: 'contact', num: '07', label: 'Dispatch', sub: 'Direct Inquiries', icon: Mail, accent: 'bg-[#141413] text-white' }
  ];

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div 
      className="relative w-full h-full select-none overflow-hidden bg-[#FBFBF9] text-[#141413] font-sans flex flex-col justify-between"
      onClick={() => {
        if (startMenuOpen) setStartMenuOpen(false);
        setSelectedShortcut(null);
      }}
    >
      {/* ==================================================================== */}
      {/* TOP EDITORIAL MENU BAR (macOS / GNOME Refined)                       */}
      {/* ==================================================================== */}
      <div 
        className="h-7 bg-[#F4F2EB]/95 border-b border-[#E5E2D8] flex items-center justify-between px-3 text-[11px] font-mono z-30 select-none flex-shrink-0 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Monogram + Editorial Status */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => {
              onPlayKeyClick();
              setStartMenuOpen((prev) => !prev);
            }}
            className="flex items-center space-x-1.5 px-2 py-0.5 rounded-xs bg-[#E8EFEA] hover:bg-[#d8e5dc] text-[#264233] text-[10px] font-mono font-semibold border border-[#C2D7CB] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#264233] animate-pulse" />
            <span>FIELD LOG // 2025–2026</span>
          </button>
          <span className="text-[#DCD9CF]">&bull;</span>
          <span className="font-serif italic text-xs text-[#141413]">Abdul Samad Khan</span>
          <span className="text-[#888680] text-[10px] hidden sm:inline">&bull; RPA Developer @ Trufe</span>
        </div>

        {/* Center: Live Date & Time Clock */}
        <div className="text-[11px] text-[#575653] flex items-center space-x-2 font-mono">
          <span className="font-serif italic text-[#141413]">{dateStr}</span>
          <span className="text-[#DCD9CF]">&bull;</span>
          <span className="text-[#264233] font-bold">{timeStr} IST</span>
        </div>

        {/* Right: Audio, Status, Desk View */}
        <div className="flex items-center space-x-3 text-[#575653]">
          {onToggleSound && (
            <button
              onClick={() => {
                onToggleSound();
                onPlayKeyClick();
              }}
              className="hover:text-[#141413] transition-colors p-0.5"
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#264233]" /> : <VolumeX className="w-3.5 h-3.5 text-[#888680]" />}
            </button>
          )}

          <div className="flex items-center space-x-1 text-[#264233]" title="Network: trufe-enterprise-5g">
            <Wifi className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center space-x-1 text-[#575653]" title="Battery: 98% (Plugged in)">
            <Battery className="w-3.5 h-3.5 text-[#264233]" />
            <span className="text-[10px] font-mono">98%</span>
          </div>

          {onExitFocus && (
            <button
              onClick={() => {
                onPlayKeyClick();
                onExitFocus();
              }}
              className="flex items-center space-x-1 px-2.5 py-0.5 bg-[#264233] hover:bg-[#1a3024] text-white rounded-xs text-[10px] font-mono font-medium transition-colors shadow-xs"
              title="Return to 3D Desk View"
            >
              <span>Desk View</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP WORKSPACE (Clean Icon Column + Active Windows)               */}
      {/* ==================================================================== */}
      <div className="relative flex-1 w-full h-[calc(100%-64px)] overflow-hidden">
        {/* Subtle Architectural Dot Grid */}
        <div className="absolute inset-0 bg-[#FBFBF9] pointer-events-none">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#DCD9CF_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Typographic Watermark */}
          <div className="absolute bottom-6 right-8 text-right pointer-events-none select-none">
            <div className="text-3xl sm:text-4xl font-serif italic tracking-tight text-[#141413]/10">
              Abdul Samad Khan
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#575653]/30 mt-0.5">
              RPA & Enterprise Systems &bull; Trufe (2025–2026)
            </div>
          </div>
        </div>

        {/* Desktop Icons (Left Vertical Grid) */}
        <div className="relative z-10 p-3 grid grid-cols-1 gap-2.5 w-[100px]">
          {desktopShortcuts.map((sc) => {
            const isSelected = selectedShortcut === sc.id;
            const IconComponent = sc.icon;
            return (
              <button
                key={sc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayKeyClick();
                  setSelectedShortcut(sc.id);
                  focusWindow(sc.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xs transition-all text-center group ${
                  isSelected
                    ? 'bg-[#FFFFFF] border border-[#264233] shadow-md ring-1 ring-[#264233]'
                    : 'hover:bg-[#FFFFFF]/80 hover:border hover:border-[#E5E2D8] border border-transparent'
                }`}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${sc.accent}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1 -right-1 font-mono text-[8px] font-bold px-1 bg-[#FFFFFF] border border-[#E5E2D8] text-[#264233] rounded-xs shadow-xs">
                    {sc.num}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[10px] font-semibold text-[#141413] tracking-tight leading-tight max-w-[85px] truncate">
                  {sc.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* INTERACTIVE FLOATING WINDOWS (Refined Window Chrome)              */}
        {/* ================================================================== */}
        {Object.values(windows).map((win) => {
          if (!win.isOpen || win.isMinimized) return null;

          const isMax = win.isMaximized;
          // Windows open on the right of the icon column (left-[108px] right-3)
          const windowOffset = isMax
            ? 'inset-2'
            : 'top-2 bottom-3 left-[110px] right-3';

          return (
            <div
              key={win.id}
              onClick={(e) => {
                e.stopPropagation();
                focusWindow(win.id);
              }}
              style={{ zIndex: win.zIndex }}
              className={`absolute flex flex-col bg-[#FFFFFF] border border-[#DCD9CF] rounded-xs shadow-[0_20px_50px_rgba(20,20,19,0.12)] overflow-hidden transition-all duration-150 ${windowOffset}`}
            >
              {/* Refined Window Header Bar (Traffic Light Dots + Newsreader Title) */}
              <div 
                className="h-8 bg-[#F4F2EB] border-b border-[#E5E2D8] flex items-center justify-between px-3 flex-shrink-0 select-none cursor-default"
                onDoubleClick={() => toggleMaximizeWindow(win.id)}
              >
                {/* Traffic Light Window Dots */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                    className="w-3 h-3 rounded-full bg-[#e06c60] hover:bg-[#c94f43] transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMinimizeWindow(win.id);
                    }}
                    className="w-3 h-3 rounded-full bg-[#e5aa42] hover:bg-[#c98e29] transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaximizeWindow(win.id);
                    }}
                    className="w-3 h-3 rounded-full bg-[#58a55c] hover:bg-[#3d8541] transition-colors flex items-center justify-center group"
                    title={isMax ? 'Restore' : 'Maximize'}
                  >
                    <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                </div>

                {/* Centered Window Title */}
                <div className="font-serif font-semibold text-xs text-[#141413] flex items-center space-x-1.5 truncate max-w-[500px]">
                  <span>{win.title}</span>
                </div>

                {/* Right Status Tag */}
                <div className="font-mono text-[9px] text-[#264233] bg-[#E8EFEA] border border-[#C2D7CB] px-1.5 py-0.5 rounded-xs">
                  {win.shortTitle}
                </div>
              </div>

              {/* Window Content Body */}
              <div className="flex-1 overflow-auto bg-[#FFFFFF] p-4 text-[#141413]">
                {/* 1. DYNAMICS 365 INVOICE AUTOMATION STUDIO WINDOW */}
                {win.id === 'pipeline' && (
                  <div className="space-y-4">
                    {/* Header Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F4F2EB] border border-[#E5E2D8] rounded-xs">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#264233] font-semibold flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#264233]" />
                          <span>Enterprise Workflow Visualizer // Trufe Production</span>
                        </div>
                        <h4 className="font-serif text-base font-semibold text-[#141413]">
                          AI-Powered Invoice Processing & Dynamics 365 Bulk Upload Engine
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={runPipelineStep}
                          disabled={pipelineRunning}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#264233] hover:bg-[#1a3024] disabled:bg-[#888680] text-white text-xs font-mono font-medium rounded-xs shadow-xs transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>{pipelineRunning ? 'Executing Pipeline...' : 'Run Simulation'}</span>
                        </button>
                      </div>
                    </div>

                    {/* 5-Stage Stepper Buttons */}
                    <div className="grid grid-cols-5 gap-1.5">
                      {pipelineStages.map((stg, sIdx) => {
                        const isCurrent = pipelineStage === sIdx;
                        return (
                          <button
                            key={stg.num}
                            onClick={() => {
                              onPlayKeyClick();
                              setPipelineStage(sIdx);
                            }}
                            className={`p-2.5 rounded-xs border text-left transition-all ${
                              isCurrent
                                ? 'bg-[#E8EFEA] border-[#264233] shadow-xs ring-1 ring-[#264233]'
                                : 'bg-[#FFFFFF] hover:bg-[#F4F2EB] border-[#E5E2D8]'
                            }`}
                          >
                            <div className="font-mono text-[10px] font-bold text-[#264233]">{stg.num}</div>
                            <div className="font-serif text-xs font-semibold text-[#141413] truncate">{stg.shortTitle}</div>
                            <div className="font-mono text-[9px] text-[#575653] truncate">{stg.tech}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Stage Detail Card */}
                    <div className="p-4 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-[#EAE7DD] pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-[#264233] text-white font-mono text-xs font-bold rounded-xs">
                            STAGE {pipelineStages[pipelineStage].num}
                          </span>
                          <span className="font-serif font-semibold text-sm text-[#141413]">
                            {pipelineStages[pipelineStage].name}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#264233] bg-[#E8EFEA] border border-[#C2D7CB] px-2 py-0.5 rounded-xs font-medium">
                          {pipelineStages[pipelineStage].metric}
                        </span>
                      </div>

                      <p className="text-xs text-[#575653] leading-relaxed font-sans">
                        {pipelineStages[pipelineStage].summary}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-[11px]">
                        <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E2D8] rounded-xs">
                          <div className="text-[9px] text-[#888680] font-semibold">MONTHLY THROUGHPUT</div>
                          <div className="font-bold text-[#141413] text-xs">1,200+ Invoices</div>
                        </div>
                        <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E2D8] rounded-xs">
                          <div className="text-[9px] text-[#888680] font-semibold">INTEGRITY GATE</div>
                          <div className="font-bold text-[#264233] text-xs">&ge; 0.90 Score & Parity</div>
                        </div>
                        <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E2D8] rounded-xs">
                          <div className="text-[9px] text-[#888680] font-semibold">OPERATING ENTITIES</div>
                          <div className="font-bold text-[#141413] text-xs">5 Subsidiaries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TERMINAL (BASH SHELL) WINDOW */}
                {win.id === 'terminal' && (
                  <div className="h-full flex flex-col font-mono text-xs bg-[#141413] text-[#EAE7DD] rounded-xs p-3.5 -m-4">
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                      <div className="text-[#86efac]">
                        Ubuntu 24.04 LTS (x86_64) // Studio Workstation Shell
                      </div>
                      <div className="text-[#888680] text-[11px]">
                        Type 'help' to inspect commands, or click quick action chips below.
                      </div>

                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[#86efac] font-bold">wyacoomz@trufe-rpa:~$</span>
                            <span className="text-white">{item.command}</span>
                          </div>
                          <div className="space-y-0.5 text-[#DCD9CF] pl-3 border-l border-[#333]">
                            {item.output.map((line, lIdx) => (
                              <div key={lIdx} className={line.startsWith('  •') || line.startsWith('  [') ? 'text-white' : 'text-[#A8A29E]'}>
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Active Input Line */}
                    <form onSubmit={handleTerminalSubmit} className="pt-2 border-t border-[#2a2926] flex items-center space-x-2">
                      <span className="text-[#86efac] font-bold flex-shrink-0">wyacoomz@trufe-rpa:~$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type command (whoami, pipeline, projects, skills, resume)..."
                        className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-0.5 bg-[#264233] hover:bg-[#345c46] text-white rounded-xs text-[10px] font-mono font-semibold"
                      >
                        Run
                      </button>
                    </form>

                    {/* Quick Command Chips */}
                    <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#A8A29E]">
                      {['whoami', 'pipeline', 'projects', 'skills', 'leetcode', 'resume', 'contact', 'clear'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setTerminalInput(c);
                            onPlayKeyClick();
                          }}
                          className="px-2 py-0.5 bg-[#22211e] hover:bg-[#33312c] text-[#DCD9CF] border border-[#3f3e3a] rounded-xs font-mono transition-colors"
                        >
                          ${c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PROJECTS EXPLORER WINDOW */}
                {win.id === 'projects' && (
                  <div className="space-y-4">
                    {/* Category Filter Tabs */}
                    <div className="flex items-center space-x-2 pb-2 border-b border-[#E5E2D8] text-xs font-mono">
                      {[
                        { id: 'all', label: 'All Projects (7)' },
                        { id: 'rpa', label: 'Enterprise RPA' },
                        { id: 'web', label: 'Full-Stack Web' },
                        { id: 'data', label: 'Financial & Systems' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            onPlayKeyClick();
                            setProjectFilter(tab.id as any);
                          }}
                          className={`px-2.5 py-1 rounded-xs transition-colors ${
                            projectFilter === tab.id
                              ? 'bg-[#264233] text-white font-semibold'
                              : 'bg-[#F4F2EB] hover:bg-[#EAE7DD] text-[#575653]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredProjects.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 bg-[#FBFBF9] border border-[#E5E2D8] hover:border-[#264233] rounded-xs space-y-2 transition-all shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#E8EFEA] text-[#264233] border border-[#C2D7CB] rounded-xs font-semibold">
                              {p.category}
                            </span>
                            <span className="font-mono text-[10px] text-[#888680]">{p.index}</span>
                          </div>
                          <h4 className="font-serif font-semibold text-sm text-[#141413] leading-snug">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-[#575653] leading-relaxed line-clamp-2">
                            {p.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1 font-mono text-[9px] text-[#575653]">
                            {p.tags.slice(0, 4).map((t: string, idx: number) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E5E2D8] rounded-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. RESUME VIEWER WINDOW */}
                {win.id === 'resume' && (
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {/* Document Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D8]">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#141413]">Abdul Samad Khan</h3>
                        <p className="font-mono text-xs text-[#575653]">RPA & Enterprise Systems Engineer &bull; Bhopal, India</p>
                      </div>
                      <a
                        href="/Abdul_Samad_Khan_Resume.pdf"
                        download="Abdul_Samad_Khan_Resume.pdf"
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#264233] hover:bg-[#1a3024] text-white text-xs font-mono font-medium rounded-xs shadow-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>

                    {/* Summary */}
                    <div className="text-xs text-[#575653] leading-relaxed">
                      {PERSONAL_INFO.shortBio}
                    </div>

                    {/* Employment History */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#264233] font-semibold border-b border-[#EAE7DD] pb-1">
                        Work Experience
                      </div>
                      {WORK_EXPERIENCES.map((exp) => (
                        <div key={exp.id} className="p-3 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-semibold text-xs text-[#141413]">{exp.role} @ {exp.company}</h4>
                            <span className="font-mono text-[10px] text-[#888680]">{exp.period}</span>
                          </div>
                          <p className="text-[11px] text-[#575653] leading-snug">{exp.summary}</p>
                        </div>
                      ))}
                    </div>

                    {/* Education */}
                    <div className="space-y-2">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#264233] font-semibold border-b border-[#EAE7DD] pb-1">
                        Education
                      </div>
                      {EDUCATION_DATA.map((edu, idx) => (
                        <div key={idx} className="p-2.5 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs">
                          <div className="font-serif font-semibold text-xs text-[#141413]">{edu.degree}</div>
                          <div className="font-mono text-[10px] text-[#575653]">{edu.institution} &bull; {edu.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. FIELD NOTES & BENCHMARKS WINDOW */}
                {win.id === 'notes' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#F4F2EB] border border-[#E5E2D8] rounded-xs">
                      <div className="font-mono text-[10px] uppercase text-[#264233] font-semibold">Engineering Philosophy</div>
                      <h4 className="font-serif text-sm font-semibold text-[#141413]">Deterministic Error Handling in Unattended Workflows</h4>
                      <p className="text-xs text-[#575653] mt-1 leading-relaxed">
                        In enterprise RPA, a bot that fails silently or commits bad data is far worse than no bot at all. 
                        Every automated flow must implement strict integrity gates (confidence thresholds &ge; 0.90, arithmetic reconciliations, and isolated exception queues with Adaptive Card alerts).
                      </p>
                    </div>

                    <div className="p-3 bg-[#FFFFFF] border border-[#E5E2D8] rounded-xs space-y-2">
                      <div className="font-mono text-[10px] uppercase text-[#264233] font-semibold">LeetCode Benchmark (150+ Solved)</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                        <div className="p-2 bg-[#FBFBF9] border border-[#EAE7DD] rounded-xs">
                          <div className="text-[10px] text-[#888680]">DYNAMIC PROG.</div>
                          <div className="font-bold text-[#141413]">45+ Solved</div>
                        </div>
                        <div className="p-2 bg-[#FBFBF9] border border-[#EAE7DD] rounded-xs">
                          <div className="text-[10px] text-[#888680]">GRAPH THEORY</div>
                          <div className="font-bold text-[#141413]">35+ Solved</div>
                        </div>
                        <div className="p-2 bg-[#FBFBF9] border border-[#EAE7DD] rounded-xs">
                          <div className="text-[10px] text-[#888680]">TREES & BST</div>
                          <div className="font-bold text-[#141413]">40+ Solved</div>
                        </div>
                        <div className="p-2 bg-[#FBFBF9] border border-[#EAE7DD] rounded-xs">
                          <div className="text-[10px] text-[#888680]">ARRAYS & SLIDING</div>
                          <div className="font-bold text-[#141413]">30+ Solved</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. SYSTEM SPECS & HARDWARE WINDOW */}
                {win.id === 'about' && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-3 bg-[#F4F2EB] border border-[#E5E2D8] rounded-xs space-y-2">
                      <div className="text-[#264233] font-bold pb-2 border-b border-[#EAE7DD]">
                        DevBook Pro 16″ CNC Aluminum Studio Workstation
                      </div>
                      <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                        <div><span className="text-[#888680]">OS:</span> Ubuntu 24.04 LTS x86_64</div>
                        <div><span className="text-[#888680]">Kernel:</span> Linux 6.8.0-45-generic</div>
                        <div><span className="text-[#888680]">Chassis:</span> Anodized Space Gray CNC Unibody</div>
                        <div><span className="text-[#888680]">Display:</span> 16.0″ Liquid Retina (16:10, 94% StB)</div>
                        <div><span className="text-[#888680]">Audio:</span> Dual Micro-Drilled Acoustic Grilles</div>
                        <div><span className="text-[#888680]">Trackpad:</span> Precision Satin Glass Surface</div>
                        <div><span className="text-[#888680]">Engineer:</span> Abdul Samad Khan (wyacoomz)</div>
                        <div><span className="text-[#888680]">Role:</span> RPA Developer @ Trufe</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-mono text-xs uppercase text-[#264233] font-semibold">Core Competencies</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {SKILL_CATEGORIES.map((cat, idx) => (
                          <div key={idx} className="p-2 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs">
                            <div className="font-bold text-[#141413]">{cat.category}</div>
                            <div className="text-[#575653] text-[10px] mt-0.5">{cat.skills.map((s) => s.name).join(', ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. DISPATCH / CONTACT WINDOW */}
                {win.id === 'contact' && (
                  <div className="space-y-4 max-w-lg mx-auto">
                    <div className="text-center pb-2 border-b border-[#E5E2D8]">
                      <h3 className="font-serif text-base font-semibold text-[#141413]">Dispatch & Inquiries</h3>
                      <p className="font-mono text-xs text-[#575653]">Direct communication channels for engineering collaborations</p>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="p-3 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#888680]">EMAIL ADDRESS</div>
                          <div className="font-bold text-[#141413]">abdulischad@gmail.com</div>
                        </div>
                        <button
                          onClick={() => handleCopy('email', 'abdulischad@gmail.com')}
                          className="px-2.5 py-1 bg-[#264233] hover:bg-[#1a3024] text-white rounded-xs text-[10px] font-semibold flex items-center space-x-1"
                        >
                          {copiedKey === 'email' ? <Check className="w-3 h-3 text-[#86efac]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="p-3 bg-[#FBFBF9] border border-[#E5E2D8] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#888680]">PHONE NUMBER</div>
                          <div className="font-bold text-[#141413]">+91 97520 90623</div>
                        </div>
                        <button
                          onClick={() => handleCopy('phone', '+919752090623')}
                          className="px-2.5 py-1 bg-[#264233] hover:bg-[#1a3024] text-white rounded-xs text-[10px] font-semibold flex items-center space-x-1"
                        >
                          {copiedKey === 'phone' ? <Check className="w-3 h-3 text-[#86efac]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href="https://linkedin.com/in/abdul-samad-khan-b20b29237"
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 bg-[#FFFFFF] hover:bg-[#F4F2EB] border border-[#E5E2D8] rounded-xs flex items-center justify-between transition-colors"
                        >
                          <span className="font-bold text-[#141413]">LinkedIn Profile</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#575653]" />
                        </a>
                        <a
                          href="https://github.com/wyacoomz"
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 bg-[#FFFFFF] hover:bg-[#F4F2EB] border border-[#E5E2D8] rounded-xs flex items-center justify-between transition-colors"
                        >
                          <span className="font-bold text-[#141413]">GitHub Archive</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#575653]" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Start / Index Flyout Menu */}
        {startMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 left-3 z-50 w-72 bg-[#FFFFFF] border border-[#DCD9CF] rounded-xs shadow-2xl p-3 text-xs font-sans animate-in slide-in-from-bottom-2 duration-150"
          >
            {/* Header */}
            <div className="flex items-center space-x-2.5 pb-2.5 mb-2.5 border-b border-[#E5E2D8]">
              <div className="w-8 h-8 rounded-xs bg-[#264233] text-white font-serif italic text-base flex items-center justify-center font-bold">
                AK
              </div>
              <div>
                <div className="font-serif font-semibold text-xs text-[#141413]">Abdul Samad Khan</div>
                <div className="font-mono text-[9px] text-[#575653]">wyacoomz // RPA Developer @ Trufe</div>
              </div>
            </div>

            {/* Launchers */}
            <div className="space-y-1 font-mono text-[11px]">
              {desktopShortcuts.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    focusWindow(sc.id);
                    setStartMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs hover:bg-[#F4F2EB] text-left transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#264233]">{sc.num}</span>
                    <span className="text-[#141413]">{sc.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#888680]" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-2 mt-2 border-t border-[#E5E2D8] flex items-center justify-between font-mono text-[10px] text-[#575653]">
              <a
                href="http://localhost:3000"
                className="text-[#264233] hover:underline font-semibold"
              >
                &larr; Editorial Journal
              </a>
              <button
                onClick={showDesktop}
                className="hover:text-[#141413]"
              >
                [Show Desktop]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM EDITORIAL TASKBAR                                             */}
      {/* ==================================================================== */}
      <div 
        className="h-8 bg-[#F4F2EB]/95 border-t border-[#E5E2D8] flex items-center justify-between px-3 text-xs z-30 select-none flex-shrink-0 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Start / Index Button + Running App Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pr-2">
          <button
            onClick={() => {
              onPlayKeyClick();
              setStartMenuOpen((prev) => !prev);
            }}
            className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#264233] hover:bg-[#1a3024] text-white rounded-xs font-mono font-bold text-[10px] shadow-xs transition-colors"
          >
            <span>INDEX</span>
          </button>

          {/* Running Windows Tabs */}
          {openWindowsList.map((win) => {
            const isActive = !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => {
                  if (isActive) {
                    toggleMinimizeWindow(win.id);
                  } else {
                    focusWindow(win.id);
                  }
                }}
                className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-xs border text-[10px] font-mono transition-all ${
                  isActive
                    ? 'bg-[#FFFFFF] border-[#264233] text-[#264233] font-semibold shadow-xs'
                    : 'bg-[#FBFBF9] hover:bg-[#FFFFFF] border-[#E5E2D8] text-[#575653]'
                }`}
              >
                <span>{win.icon}</span>
                <span className="truncate max-w-[140px]">{win.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Show Desktop */}
        <div className="flex items-center space-x-2">
          <button
            onClick={showDesktop}
            className="px-2 py-0.5 bg-[#FFFFFF] hover:bg-[#F4F2EB] border border-[#E5E2D8] text-[#575653] hover:text-[#141413] rounded-xs font-mono text-[9px] transition-colors"
            title="Minimize all windows and show desktop"
          >
            Desktop
          </button>
        </div>
      </div>
    </div>
  );
};
