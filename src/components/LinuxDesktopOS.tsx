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
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export interface WindowState {
  id: 'terminal' | 'pipeline' | 'projects' | 'resume' | 'notes' | 'about' | 'contact';
  title: string;
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
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
      setDateStr(now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Kolkata' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Start Menu state
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);

  // Selected desktop shortcut
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  // Window management state
  const [highestZ, setHighestZ] = useState<number>(10);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    terminal: {
      id: 'terminal',
      title: 'wyacoomz@dev-laptop: ~ (bash)',
      icon: '💻',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5
    },
    pipeline: {
      id: 'pipeline',
      title: 'D365 Invoice Automation Studio — Dynamics 365 Bulk Uploader',
      icon: '⚙️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    projects: {
      id: 'projects',
      title: 'Projects Explorer — ~/work (7 Production Systems)',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1
    },
    resume: {
      id: 'resume',
      title: 'Abdul_Samad_Khan_Resume.pdf — Document Viewer',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1
    },
    notes: {
      id: 'notes',
      title: 'field_notes.md — Gedit Editor',
      icon: '📝',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1
    },
    about: {
      id: 'about',
      title: 'About Developer & Workstation — Neofetch',
      icon: '👤',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1
    },
    contact: {
      id: 'contact',
      title: 'Connect & Channels — wyacoomz',
      icon: '🌐',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1
    }
  });

  // Bring window to focus
  const focusWindow = (id: string) => {
    onPlayKeyClick();
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((curr) => ({
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ
        }
      }));
      return nextZ;
    });
  };

  // Open window from shortcut or start menu
  const openWindow = (id: string) => {
    onPlayKeyClick();
    setStartMenuOpen(false);
    focusWindow(id);
  };

  // Minimize window
  const minimizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPlayKeyClick();
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMinimized: true
      }
    }));
  };

  // Maximize / Restore window
  const toggleMaximizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPlayKeyClick();
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMaximized: !curr[id].isMaximized
      }
    }));
  };

  // Close window
  const closeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPlayKeyClick();
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: false,
        isMinimized: false
      }
    }));
  };

  // Close all windows / show desktop
  const showDesktop = () => {
    onPlayKeyClick();
    setStartMenuOpen(false);
    setWindows((curr) => {
      const next = { ...curr };
      Object.keys(next).forEach((k) => {
        next[k] = { ...next[k], isMinimized: true };
      });
      return next;
    });
  };

  // --------------------------------------------------------------------------
  // TERMINAL STATE & COMMAND RUNNER
  // --------------------------------------------------------------------------
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([
    {
      command: 'whoami',
      output: [
        'Abdul Samad Khan (wyacoomz)',
        'RPA & Enterprise Automation Developer @ Trufe',
        'Stack: Power Automate Cloud/Desktop, AI Builder, Dynamics 365, Python, React, SQL Server',
        'B.Tech AI & Data Science • 150+ LeetCode Solved • Bhopal, India (IST UTC +05:30)',
        'Type "help" or click quick commands below to explore.'
      ]
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const runTerminalCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;
    onPlayKeyClick();

    let output: string[] = [];

    switch (cmd) {
      case 'help':
        output = [
          'Available Shell Commands:',
          '  • whoami     - Developer profile, role & background',
          '  • projects   - Launch Projects Explorer window',
          '  • pipeline   - Launch Dynamics 365 Automation Studio',
          '  • skills     - Technical competency breakdown',
          '  • leetcode   - View LeetCode benchmarks (150+ Solved)',
          '  • resume     - Open PDF Resume Document Viewer',
          '  • contact    - Contact channels & social profiles',
          '  • neofetch   - ASCII hardware diagnostics & system spec',
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

      case 'projects':
        openWindow('projects');
        output = ['Opening Projects Explorer...'];
        break;

      case 'pipeline':
        openWindow('pipeline');
        output = ['Launching Dynamics 365 Automation Studio...'];
        break;

      case 'skills':
        output = [
          'Core Technical Competencies:',
          '  [Automation]  Power Automate Cloud/Desktop, AI Builder OCR, D365 ERP',
          '  [Backend]     Python, Node.js, Express.js, REST APIs, Stored Procedures',
          '  [Databases]   SQL Server, MongoDB, PostgreSQL',
          '  [Frontend]    React.js, TypeScript, Tailwind CSS, Three.js WebGL',
          '  [Systems]     Linux Bash, Git, PowerShell, Docker'
        ];
        break;

      case 'leetcode':
        output = [
          'LeetCode Benchmark: 150+ Problems Solved',
          'Focus: Graph algorithms (BFS/DFS), Dynamic Programming, Heaps, Trees.',
          'Profile URL: https://leetcode.com/u/wyacoomz/'
        ];
        break;

      case 'resume':
        openWindow('resume');
        output = ['Opening Abdul_Samad_Khan_Resume.pdf in Document Viewer...'];
        break;

      case 'contact':
        openWindow('contact');
        output = ['Opening Contact & Channels window...'];
        break;

      case 'neofetch':
        openWindow('about');
        output = ['Launching System Diagnostics...'];
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      default:
        output = [`bash: command not found: ${rawCmd}. Type "help" for a list of commands.`];
        break;
    }

    setTerminalHistory((prev) => [...prev, { command: rawCmd, output }]);
    setTerminalInput('');
  };

  // --------------------------------------------------------------------------
  // D365 PIPELINE SIMULATOR STATE
  // --------------------------------------------------------------------------
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState<string>("Sisi's Eatery");

  const runPipelineSimulation = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStep(1);
    onPlayKeyClick();

    [1, 2, 3, 4, 5].forEach((step, idx) => {
      setTimeout(() => {
        setPipelineStep(step);
        onPlayKeyClick();
        if (step === 5) {
          setTimeout(() => {
            setPipelineRunning(false);
          }, 1200);
        }
      }, (idx + 1) * 750);
    });
  };

  // --------------------------------------------------------------------------
  // COPY CLIPBOARD HELPER
  // --------------------------------------------------------------------------
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    onPlayKeyClick();
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Desktop shortcuts configuration
  const desktopShortcuts = [
    { id: 'projects', label: 'Projects', icon: '📁', sub: 'Portfolio Archive' },
    { id: 'pipeline', label: 'D365 Bot', icon: '⚙️', sub: 'Invoice Automation' },
    { id: 'terminal', label: 'Terminal', icon: '💻', sub: 'Bash Shell' },
    { id: 'resume', label: 'Resume.pdf', icon: '📄', sub: 'Official CV' },
    { id: 'notes', label: 'Field Notes', icon: '📝', sub: 'Engineering Log' },
    { id: 'about', label: 'System Specs', icon: '👤', sub: 'Neofetch' },
    { id: 'contact', label: 'Contact', icon: '🌐', sub: 'Get in Touch' }
  ];

  // Open windows list for taskbar
  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div 
      className="relative w-full h-full select-none overflow-hidden bg-[#0c1017] text-[#f8fafc] font-sans flex flex-col justify-between"
      onClick={() => {
        if (startMenuOpen) setStartMenuOpen(false);
        setSelectedShortcut(null);
      }}
    >
      {/* ==================================================================== */}
      {/* TOP GNOME OS BAR                                                     */}
      {/* ==================================================================== */}
      <div 
        className="h-8 bg-[#090d14]/95 border-b border-[#1e293b] flex items-center justify-between px-3 text-xs z-30 select-none backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Activities button & active app label */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              onPlayKeyClick();
              showDesktop();
            }}
            className="px-2.5 py-0.5 rounded-full bg-[#1e293b] hover:bg-[#334155] text-[#38bdf8] font-semibold text-[11px] transition-colors"
          >
            Activities
          </button>
          <span className="text-[#64748b] text-[11px]">•</span>
          <span className="text-[#94a3b8] text-[11px] font-mono">DevBook Pro 16″</span>
        </div>

        {/* Center: Live Date & Time Clock */}
        <div className="text-xs font-medium text-[#e2e8f0] flex items-center space-x-2">
          <span>{dateStr}</span>
          <span className="text-[#38bdf8] font-bold font-mono">{timeStr} IST</span>
        </div>

        {/* Right: System Tray (Audio, WiFi, Battery, Power) */}
        <div className="flex items-center space-x-3 text-[#94a3b8]">
          {onToggleSound && (
            <button
              onClick={() => {
                onToggleSound();
                onPlayKeyClick();
              }}
              className="hover:text-[#ffffff] transition-colors p-0.5"
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" /> : <VolumeX className="w-3.5 h-3.5 text-[#ef4444]" />}
            </button>
          )}

          <div className="flex items-center space-x-1" title="WiFi Connected: trufe-5g">
            <Wifi className="w-3.5 h-3.5 text-[#22c55e]" />
          </div>

          <div className="flex items-center space-x-1" title="Battery: 98% (Plugged in)">
            <Battery className="w-3.5 h-3.5 text-[#22c55e]" />
            <span className="text-[10px] font-mono">98%</span>
          </div>

          {onExitFocus && (
            <button
              onClick={() => {
                onPlayKeyClick();
                onExitFocus();
              }}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] rounded-xs text-[10px] font-mono transition-colors border border-[#334155]"
              title="Return to 3D Desk View"
            >
              <span>Desk View</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP WORKSPACE (Wallpaper + Desktop Shortcuts + Windows)          */}
      {/* ==================================================================== */}
      <div className="relative flex-1 w-full h-[calc(100%-68px)] overflow-hidden">
        {/* Linux Dark Polygon Wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080b11] via-[#0f172a] to-[#0a0f1d] pointer-events-none">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          {/* Modern Wallpaper Watermark */}
          <div className="absolute bottom-6 right-8 text-right pointer-events-none opacity-20">
            <div className="text-4xl font-black font-sans tracking-tight text-[#ffffff]">DEVBOOK <span className="text-[#38bdf8]">PRO</span></div>
            <div className="text-xs font-mono text-[#94a3b8]">Ubuntu 24.04 LTS • wyacoomz</div>
          </div>
        </div>

        {/* Desktop Icons Grid (Left Column) */}
        <div className="relative z-10 p-4 grid grid-cols-1 gap-3 w-fit">
          {desktopShortcuts.map((sc) => {
            const isSelected = selectedShortcut === sc.id;
            return (
              <button
                key={sc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedShortcut(sc.id);
                  openWindow(sc.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  openWindow(sc.id);
                }}
                className={`group flex items-center space-x-3 p-2 rounded-sm w-48 text-left transition-all ${
                  isSelected ? 'bg-[#0284c7]/30 border border-[#38bdf8]/60 shadow-lg' : 'hover:bg-[#1e293b]/50 border border-transparent'
                }`}
                title={`Click or double click to open ${sc.label}`}
              >
                <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {sc.icon}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-[#f8fafc] truncate">{sc.label}</div>
                  <div className="text-[10px] text-[#94a3b8] truncate">{sc.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* INTERACTIVE FLOATING WINDOWS (Multi-Window Manager)               */}
        {/* ================================================================== */}
        {Object.values(windows).map((win) => {
          if (!win.isOpen || win.isMinimized) return null;

          const isMax = win.isMaximized;
          const windowOffsets: Record<string, string> = {
            terminal: 'top-6 bottom-8 left-10 right-10 sm:left-20 sm:right-20 md:left-36 md:right-36',
            pipeline: 'top-4 bottom-10 left-8 right-12 sm:left-16 sm:right-24 md:left-28 md:right-44',
            projects: 'top-8 bottom-6 left-14 right-8 sm:left-24 sm:right-16 md:left-44 md:right-28',
            resume: 'top-5 bottom-9 left-12 right-12 sm:left-20 sm:right-20 md:left-32 md:right-32',
            notes: 'top-9 bottom-5 left-16 right-10 sm:left-28 sm:right-18 md:left-48 md:right-36',
            about: 'top-7 bottom-7 left-10 right-14 sm:left-22 sm:right-26 md:left-38 md:right-42',
            contact: 'top-10 bottom-4 left-14 right-14 sm:left-26 sm:right-26 md:left-44 md:right-44'
          };

          return (
            <div
              key={win.id}
              onClick={(e) => {
                e.stopPropagation();
                focusWindow(win.id);
              }}
              style={{ zIndex: win.zIndex }}
              className={`absolute flex flex-col bg-[#0f141f] border border-[#263447] rounded-sm shadow-2xl overflow-hidden transition-all duration-150 ${
                isMax
                  ? 'inset-2'
                  : windowOffsets[win.id] || 'top-6 bottom-6 left-12 right-12 sm:left-24 sm:right-24 md:left-40 md:right-40'
              }`}
            >
              {/* Window Header Bar */}
              <div 
                className="h-9 bg-[#16202e] border-b border-[#253244] flex items-center justify-between px-3 flex-shrink-0 select-none cursor-default"
                onDoubleClick={() => toggleMaximizeWindow(win.id)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{win.icon}</span>
                  <span className="text-xs font-bold text-[#f8fafc] truncate">{win.title}</span>
                </div>

                {/* Window Controls: Minimize, Maximize, Close */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => minimizeWindow(win.id, e)}
                    className="w-5 h-5 rounded-xs bg-[#223044] hover:bg-[#334155] text-[#94a3b8] hover:text-[#ffffff] flex items-center justify-center transition-colors text-xs"
                    title="Minimize"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <button
                    onClick={(e) => toggleMaximizeWindow(win.id, e)}
                    className="w-5 h-5 rounded-xs bg-[#223044] hover:bg-[#334155] text-[#94a3b8] hover:text-[#ffffff] flex items-center justify-center transition-colors text-xs"
                    title={isMax ? 'Restore' : 'Maximize'}
                  >
                    {isMax ? <Minimize2 className="w-3 h-3" /> : <Square className="w-2.5 h-2.5" />}
                  </button>

                  <button
                    onClick={(e) => closeWindow(win.id, e)}
                    className="w-5 h-5 rounded-xs bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] flex items-center justify-center transition-colors text-xs"
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Window Content Body */}
              <div className="flex-1 overflow-auto bg-[#0a0e17] p-4 text-xs">
                {/* 1. TERMINAL WINDOW */}
                {win.id === 'terminal' && (
                  <div className="h-full flex flex-col font-mono text-xs">
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                      <div className="text-[#38bdf8]">
                        Ubuntu 24.04 LTS (GNU/Linux 6.8.0-45-generic x86_64) • DevBook Pro
                      </div>
                      <div className="text-[#64748b]">
                        Type 'help' to see commands, or click quick buttons below.
                      </div>

                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[#22c55e] font-bold">wyacoomz@dev-laptop:~$</span>
                            <span className="text-[#f8fafc]">{item.command}</span>
                          </div>
                          <div className="space-y-0.5 text-[#cbd5e1] pl-2 border-l border-[#1e293b]">
                            {item.output.map((line, lIdx) => (
                              <div key={lIdx} className={line.startsWith('  •') || line.startsWith('  [') ? 'text-[#f1f5f9]' : 'text-[#94a3b8]'}>
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Active Input Line */}
                    <div className="pt-3 border-t border-[#1e293b] flex items-center space-x-2">
                      <span className="text-[#22c55e] font-bold flex-shrink-0">wyacoomz@dev-laptop:~$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') runTerminalCommand(terminalInput);
                        }}
                        autoFocus
                        placeholder="Type a command (whoami, projects, pipeline, skills, leetcode, resume)..."
                        className="flex-1 bg-transparent text-[#f8fafc] focus:outline-none placeholder-[#475569]"
                      />
                      <button
                        onClick={() => runTerminalCommand(terminalInput)}
                        className="px-3 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] rounded-xs text-[11px] font-mono transition-colors flex-shrink-0"
                      >
                        Run
                      </button>
                    </div>

                    {/* Quick Command Pills */}
                    <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                      {['whoami', 'projects', 'pipeline', 'skills', 'leetcode', 'resume', 'contact', 'clear'].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => runTerminalCommand(cmd)}
                          className="px-2 py-0.5 bg-[#16202e] hover:bg-[#1e2d42] text-[#38bdf8] border border-[#253244] rounded-xs transition-colors"
                        >
                          ${cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. D365 PIPELINE SIMULATOR WINDOW */}
                {win.id === 'pipeline' && (
                  <div className="space-y-4">
                    {/* Header Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#16202e] border border-[#253244] rounded-xs">
                      <div>
                        <div className="font-bold text-[#f8fafc] text-sm">Enterprise Invoice Ingestion & Dynamics 365 Uploader</div>
                        <div className="text-[#94a3b8] text-[11px]">Unattended AI OCR extraction & General Journal batch posting across 5 business subsidiaries</div>
                      </div>

                      <button
                        onClick={runPipelineSimulation}
                        disabled={pipelineRunning}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 text-[#ffffff] font-bold rounded-xs transition-colors shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{pipelineRunning ? `Stage 0${pipelineStep} Running...` : '▶ Run Live Simulation'}</span>
                      </button>
                    </div>

                    {/* Subsidiary Company Badges */}
                    <div className="space-y-1.5">
                      <div className="text-[#38bdf8] font-bold uppercase tracking-wider text-[10px]">Select Target Subsidiary:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["Sisi's Eatery", "Maristo Interior Design", "Ring Gelene", "Maristo Hospitality", "Al Yasat Catering LLC"].map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              onPlayKeyClick();
                              setSelectedCompany(c);
                            }}
                            className={`p-2 rounded-xs border text-left transition-all ${
                              selectedCompany === c ? 'bg-[#0284c7]/20 border-[#38bdf8] text-[#f8fafc] font-bold' : 'bg-[#141c28] border-[#253244] text-[#94a3b8] hover:text-[#f8fafc]'
                            }`}
                          >
                            <div className="text-[10px] text-[#38bdf8]">🏢 Subsidiary</div>
                            <div className="truncate text-xs">{c}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5 Pipeline Stages */}
                    <div className="space-y-2">
                      {[
                        { id: 1, name: '01. SharePoint Intake', desc: 'Monitors entity inbox & ingests PDF attachments without human intervention.', tech: 'Power Automate Cloud' },
                        { id: 2, name: '02. AI Builder OCR', desc: 'Neural extraction of PO#, invoice totals, line items, and vendor tax registration.', tech: 'AI Builder' },
                        { id: 3, name: '03. Validation Checks', desc: 'Strict confidence gate (>85%) and mandatory field verification.', tech: 'Custom Business Logic' },
                        { id: 4, name: '04. Excel Preparation', desc: 'Formats extracted line items into entity-specific General Journal schemas.', tech: 'Excel Online Scripts' },
                        { id: 5, name: '05. Dynamics 365 Upload', desc: 'Power Automate Desktop enters journals via UI/API with zero error rate.', tech: 'Power Automate Desktop' }
                      ].map((stg) => {
                        const isDone = pipelineStep >= stg.id;
                        const isCurr = pipelineStep === stg.id && pipelineRunning;
                        return (
                          <div
                            key={stg.id}
                            className={`p-3 rounded-xs border flex items-center justify-between transition-colors ${
                              isCurr ? 'bg-[#0284c7]/20 border-[#38bdf8]' : isDone ? 'bg-[#14281f] border-[#22c55e]' : 'bg-[#131b26] border-[#253244]'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                isDone ? 'bg-[#22c55e] text-[#0f172a]' : isCurr ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-[#253244] text-[#94a3b8]'
                              }`}>
                                {isDone ? '✓' : stg.id}
                              </div>
                              <div>
                                <div className="font-bold text-[#f8fafc]">{stg.name}</div>
                                <div className="text-[#94a3b8] text-[11px]">{stg.desc}</div>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <span className="px-2 py-0.5 bg-[#1e293b] text-[#38bdf8] rounded-xs font-mono text-[10px]">
                                {stg.tech}
                              </span>
                              <div className="text-[10px] font-mono mt-1 font-bold">
                                {isCurr ? <span className="text-[#38bdf8] animate-pulse">PROCESSING...</span> : isDone ? <span className="text-[#22c55e]">VERIFIED ✓</span> : <span className="text-[#64748b]">STANDBY</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. PROJECTS EXPLORER WINDOW */}
                {win.id === 'projects' && (
                  <div className="space-y-4">
                    <div className="text-[#94a3b8]">
                      Production systems engineered across Enterprise Business Process Automation (Power Automate, D365) and Full-Stack Web Development.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {PROJECTS.map((proj) => (
                        <div key={proj.id} className="p-3.5 bg-[#141c28] border border-[#253244] rounded-xs space-y-2 hover:border-[#38bdf8] transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="px-2 py-0.5 bg-[#0284c7]/20 border border-[#0284c7] text-[#38bdf8] text-[10px] rounded-xs font-semibold uppercase">
                                {proj.category}
                              </span>
                              <h3 className="font-bold text-[#f8fafc] text-sm mt-1">{proj.title}</h3>
                            </div>
                            <span className="text-xs font-mono text-[#64748b]">#{proj.index}</span>
                          </div>

                          <p className="text-[#94a3b8] text-xs leading-relaxed">{proj.shortDescription}</p>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.tags.slice(0, 4).map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-[#1e293b] text-[#cbd5e1] rounded-xs text-[10px] font-mono">
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2.5 bg-[#16202e] border border-[#253244] rounded-xs">
                      <div className="text-xs font-mono text-[#cbd5e1]">Abdul_Samad_Khan_Resume.pdf • Verified Local Source</div>
                      <a
                        href="/Abdul_Samad_Khan_Resume.pdf"
                        download="Abdul_Samad_Khan_Resume.pdf"
                        className="flex items-center space-x-1.5 px-3 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] font-bold rounded-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>

                    {/* Paper Sheet Preview */}
                    <div className="max-w-2xl mx-auto bg-[#fbfbf9] text-[#0f172a] p-6 rounded-xs shadow-xl space-y-4 font-sans">
                      <div className="border-b border-[#cbd5e1] pb-3">
                        <h1 className="text-2xl font-black font-serif tracking-tight">ABDUL SAMAD KHAN</h1>
                        <p className="text-xs font-medium text-[#475569]">RPA Developer • Enterprise Systems Automation • B.Tech AI & Data Science</p>
                        <p className="text-[11px] text-[#64748b]">abdulischad@gmail.com • Bhopal, India (IST UTC +05:30) • github.com/wyacoomz</p>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">Work Experience</h2>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span>Trufe — RPA Developer</span>
                            <span className="text-[#64748b]">2025 – Present</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#334155]">
                            <li>Architected end-to-end multi-entity AI invoice processing bot across 5 subsidiaries into Dynamics 365.</li>
                            <li>Engineered multi-bank reconciliation workflows (SNB & Al Rajhi) with calendar discrepancy routing.</li>
                            <li>Built Keyloop customer creation and STD mapping flows reducing manual data entry by 100%.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-[#cbd5e1] pt-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">Education</h2>
                        <div className="text-xs">
                          <div className="font-bold">B.Tech in Artificial Intelligence & Data Science</div>
                          <div className="text-[#64748b] text-[11px]">Oriental Institute of Science & Technology (OIST) • 2021 – 2025</div>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-[#cbd5e1] pt-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">LeetCode Benchmark</h2>
                        <p className="text-[11px] text-[#334155]">150+ Problems Solved focusing on Graph algorithms, Dynamic Programming, and Tree traversals.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. FIELD NOTES WINDOW */}
                {win.id === 'notes' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex space-x-2 border-b border-[#253244] pb-2">
                      <span className="px-2.5 py-1 bg-[#1e293b] text-[#38bdf8] font-bold rounded-xs text-[11px]">01_bot_resilience.md</span>
                      <span className="px-2.5 py-1 text-[#64748b] text-[11px]">02_bank_calendar.md</span>
                      <span className="px-2.5 py-1 text-[#64748b] text-[11px]">03_leetcode_opt.md</span>
                    </div>

                    <div className="p-3 bg-[#080c14] border border-[#1e293b] rounded-xs space-y-2 text-[#cbd5e1] text-xs leading-relaxed">
                      <div className="text-[#38bdf8] font-bold"># Practical Engineering Decisions in Production RPA & Systems</div>
                      <div>
                        In the Maristo AI Invoice Bot, AI Builder extracts values with varying confidence scores.
                        Rather than allowing uncertain OCR outputs to directly hit Dynamics 365, a strict validation gate is enforced (&gt;85% confidence score).
                      </div>
                      <div>
                        Uncertain or missing fields are routed to a structured human-in-the-loop exception queue, completely eliminating poisoned database states and manual reconciliation rollbacks.
                      </div>
                      <div className="text-[#22c55e]">
                        ✓ Outcome: 100% data fidelity in Dynamics 365 General Journals across all 5 subsidiaries.
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. ABOUT / NEOFETCH WINDOW */}
                {win.id === 'about' && (
                  <div className="flex flex-col sm:flex-row gap-6 p-2 font-mono">
                    {/* ASCII Tux / Modern System */}
                    <div className="text-[#38bdf8] text-xs font-bold leading-none select-none flex-shrink-0">
                      <pre>{`
         .---.
        /     \\
       | () () |
        \\  -  /
        .-'---'-.
       /  DEV    \\
      | | BOOK  | |
      | \\     / |
     (_/ '---' \\_)
                      `}</pre>
                    </div>

                    {/* Hardware & Profile Specs */}
                    <div className="space-y-1 text-xs">
                      <div className="text-[#38bdf8] font-bold pb-2 border-b border-[#253244]">wyacoomz@dev-laptop</div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">OS:</span><span className="text-[#f8fafc]">Ubuntu 24.04 LTS x86_64</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Host:</span><span className="text-[#f8fafc]">DevBook Pro 16″ CNC Aluminum</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Kernel:</span><span className="text-[#f8fafc]">6.8.0-45-generic</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Shell:</span><span className="text-[#f8fafc]">bash 5.2.21</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">CPU:</span><span className="text-[#f8fafc]">12th Gen Intel Core i7-1260P (16) @ 4.70GHz</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Memory:</span><span className="text-[#f8fafc]">32GB DDR4 3200 MT/s</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Developer:</span><span className="text-[#f8fafc]">Abdul Samad Khan</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">Role:</span><span className="text-[#f8fafc]">RPA Developer @ Trufe</span></div>
                      <div className="flex space-x-4"><span className="text-[#38bdf8] w-24">LeetCode:</span><span className="text-[#f8fafc]">150+ Solved</span></div>
                    </div>
                  </div>
                )}

                {/* 7. CONTACT CHANNELS WINDOW */}
                {win.id === 'contact' && (
                  <div className="space-y-3">
                    <div className="text-[#94a3b8] text-xs">Reach out for enterprise automation roles, full-stack contracting, or system architecture inquiries.</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 bg-[#16202e] border border-[#253244] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#38bdf8] font-mono">Email Channel</div>
                          <div className="text-xs font-bold text-[#f8fafc]">abdulischad@gmail.com</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard('abdulischad@gmail.com', 'email')}
                          className="px-2.5 py-1 bg-[#223044] hover:bg-[#334155] text-[#38bdf8] rounded-xs text-[10px] font-mono"
                        >
                          {copiedItem === 'email' ? 'Copied ✓' : 'Copy'}
                        </button>
                      </div>

                      <div className="p-3 bg-[#16202e] border border-[#253244] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#38bdf8] font-mono">GitHub Profile</div>
                          <div className="text-xs font-bold text-[#f8fafc]">github.com/wyacoomz</div>
                        </div>
                        <a
                          href="https://github.com/wyacoomz"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] rounded-xs text-[10px] font-mono"
                        >
                          Launch ↗
                        </a>
                      </div>

                      <div className="p-3 bg-[#16202e] border border-[#253244] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#38bdf8] font-mono">LinkedIn Profile</div>
                          <div className="text-xs font-bold text-[#f8fafc]">Abdul Samad Khan</div>
                        </div>
                        <a
                          href="https://linkedin.com/in/abdul-samad-khan-b22346268"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] rounded-xs text-[10px] font-mono"
                        >
                          Launch ↗
                        </a>
                      </div>

                      <div className="p-3 bg-[#16202e] border border-[#253244] rounded-xs flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#38bdf8] font-mono">LeetCode Profile</div>
                          <div className="text-xs font-bold text-[#f8fafc]">wyacoomz (150+ Solved)</div>
                        </div>
                        <a
                          href="https://leetcode.com/u/wyacoomz/"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] rounded-xs text-[10px] font-mono"
                        >
                          Launch ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ================================================================== */}
        {/* START MENU POPUP (Henry Heffernan style)                           */}
        {/* ================================================================== */}
        {startMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 left-2 w-80 bg-[#121926]/98 border border-[#334155] rounded-xs shadow-2xl z-50 overflow-hidden flex flex-col font-sans backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            {/* User Profile Header */}
            <div className="p-3.5 bg-[#1a2332] border-b border-[#283548] flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] flex items-center justify-center font-bold text-[#ffffff] text-sm shadow-md">
                AK
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm text-[#f8fafc] truncate">Abdul Samad Khan</div>
                <div className="text-[11px] text-[#38bdf8] truncate font-mono">wyacoomz • Trufe RPA Developer</div>
              </div>
            </div>

            {/* Pinned Applications */}
            <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Pinned Applications</div>
              {[
                { id: 'terminal', label: 'Terminal (Bash Shell)', icon: '💻', desc: 'Command prompt & diagnostics' },
                { id: 'pipeline', label: 'D365 Invoice Studio', icon: '⚙️', desc: 'Live automated RPA simulator' },
                { id: 'projects', label: 'Projects Explorer', icon: '📁', desc: '7 production system case studies' },
                { id: 'resume', label: 'Resume.pdf Viewer', icon: '📄', desc: 'Official credentials & PDF export' },
                { id: 'notes', label: 'Field Notes Editor', icon: '📝', desc: 'Bot exception recovery log' },
                { id: 'about', label: 'System Information', icon: '👤', desc: 'Neofetch & hardware specs' },
                { id: 'contact', label: 'Connect & Channels', icon: '🌐', desc: 'Direct contact details' }
              ].map((app) => (
                <button
                  key={app.id}
                  onClick={() => openWindow(app.id)}
                  className="w-full flex items-center space-x-2.5 p-2 rounded-xs hover:bg-[#1e293b] text-left transition-colors group"
                >
                  <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{app.icon}</span>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-[#f8fafc] group-hover:text-[#38bdf8] transition-colors">{app.label}</div>
                    <div className="text-[10px] text-[#94a3b8] truncate">{app.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-2.5 bg-[#0f141f] border-t border-[#283548] flex items-center justify-between text-xs">
              <a
                href="http://localhost:3000"
                className="text-[#38bdf8] hover:underline text-[11px] font-mono flex items-center space-x-1"
              >
                <span>← Editorial Journal</span>
              </a>

              <button
                onClick={() => {
                  onPlayKeyClick();
                  setStartMenuOpen(false);
                  showDesktop();
                }}
                className="flex items-center space-x-1 px-2 py-1 bg-[#1e293b] hover:bg-[#334155] rounded-xs text-[11px] text-[#cbd5e1]"
                title="Minimize all windows to desktop"
              >
                <Power className="w-3 h-3 text-[#ef4444]" />
                <span>Show Desktop</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM TASKBAR (Start Menu + Open Apps + Clock)                      */}
      {/* ==================================================================== */}
      <div 
        className="h-10 bg-[#0c121d]/98 border-t border-[#1e293b] flex items-center justify-between px-2.5 z-40 select-none backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Start Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              onPlayKeyClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xs font-bold text-xs transition-all ${
              startMenuOpen
                ? 'bg-[#0284c7] text-[#ffffff] shadow-md shadow-[#0284c7]/40'
                : 'bg-[#1e293b] hover:bg-[#283548] text-[#f8fafc]'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" />
            <span className="font-mono uppercase tracking-wider">Start</span>
          </button>

          {/* Active Application Windows List */}
          <div className="hidden sm:flex items-center space-x-1.5 overflow-x-auto max-w-xl">
            {openWindowsList.map((win) => {
              const isActive = win.isOpen && !win.isMinimized && win.zIndex === highestZ;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    if (isActive) {
                      minimizeWindow(win.id);
                    } else {
                      focusWindow(win.id);
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xs text-xs transition-all max-w-[160px] truncate ${
                    isActive
                      ? 'bg-[#1e293b] border-b-2 border-[#38bdf8] text-[#ffffff] font-semibold'
                      : win.isMinimized
                      ? 'bg-[#141b26]/50 text-[#64748b] hover:text-[#cbd5e1]'
                      : 'bg-[#141b26] text-[#cbd5e1] hover:bg-[#1e293b]'
                  }`}
                  title={win.title}
                >
                  <span className="text-sm">{win.icon}</span>
                  <span className="truncate text-[11px]">{win.title.split('—')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Show Desktop Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={showDesktop}
            className="w-4 h-7 hover:bg-[#38bdf8]/40 border-l border-[#334155] transition-colors"
            title="Show Desktop (Minimize all windows)"
          />
        </div>
      </div>
    </div>
  );
};
