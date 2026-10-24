import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Folder,
  FileText,
  Settings,
  Mail,
  ExternalLink,
  Minus,
  Square,
  X,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Copy,
  Check,
  Search,
  Maximize2,
  Minimize2,
  ChevronRight,
  Code,
  Briefcase,
  GraduationCap,
  Layers,
  Sparkles,
  Radio,
  Coffee,
  HelpCircle,
  HardDrive,
  Trash2,
  Disc,
  Sliders,
  Send
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export interface WindowState {
  id: 'about' | 'projects' | 'winamp' | 'dos' | 'resume' | 'contact' | 'd365';
  title: string;
  shortTitle: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface Win98DesktopProps {
  onPlayKeyClick?: () => void;
  onExitFocus?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isStandaloneOverlay?: boolean;
}

// ==========================================
// PROCEDURAL LO-FI AUDIO ENGINE (WINAMP CHILL)
// ==========================================
class Win98LofiEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  public currentTrack: number = 0;
  private volume: number = 0.5;
  private masterGain: GainNode | null = null;

  public tracks = [
    { title: '01. Abdul - Midnight Tea.mp3', name: 'Midnight Tea', artist: 'Abdul Samad Khan', chords: [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 261.63, 329.63, 392.00],         // Fmaj7
      [196.00, 261.63, 293.66, 392.00]          // G7sus4
    ]},
    { title: '02. Abdul - 90s Rain Session.mp3', name: '90s Rain Session', artist: 'Abdul Samad Khan', chords: [
      [146.83, 220.00, 261.63, 311.13, 369.99], // Dm9
      [196.00, 246.94, 329.63, 392.00],         // G13
      [130.81, 196.00, 246.94, 329.63],         // Cmaj7
      [220.00, 277.18, 349.23, 415.30]          // A7alt
    ]},
    { title: '03. Abdul - Windows 98 Chill.mp3', name: 'Windows 98 Chill', artist: 'Abdul Samad Khan', chords: [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [164.81, 196.00, 246.94, 293.66],         // Em7
      [146.83, 174.61, 220.00, 261.63],         // Dm7
      [130.81, 164.81, 196.00, 246.94]          // Cmaj7
    ]}
  ];

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private playChord(freqs: number[]) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const dur = 3.6;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(640, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + dur);
    filter.connect(this.masterGain);

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06 / freqs.length, now + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur - 0.1);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + dur);
    });
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    let chordIdx = 0;
    const track = this.tracks[this.currentTrack];

    this.playChord(track.chords[chordIdx]);
    chordIdx = (chordIdx + 1) % track.chords.length;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(track.chords[chordIdx]);
      chordIdx = (chordIdx + 1) % track.chords.length;
    }, 3600);
  }

  public pause() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }

  public nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    if (this.isPlaying) {
      this.play();
    }
    return this.currentTrack;
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      trackInfo: this.tracks[this.currentTrack],
      volume: this.volume
    };
  }
}

const winampEngine = new Win98LofiEngine();

export const LinuxDesktopOS: React.FC<Win98DesktopProps> = ({
  onPlayKeyClick = () => {},
  onExitFocus,
  soundEnabled = true,
  onToggleSound,
  isStandaloneOverlay = false
}) => {
  // Clock state (Win98 12-hour AM/PM format)
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Start Menu State
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Close start menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    if (startOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [startOpen]);

  // Selected desktop icon
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Winamp State
  const [winampPlaying, setWinampPlaying] = useState<boolean>(false);
  const [winampTrack, setWinampTrack] = useState<number>(0);
  const [trackSeconds, setTrackSeconds] = useState<number>(45);

  const toggleWinampPlay = () => {
    onPlayKeyClick();
    if (winampPlaying) {
      winampEngine.pause();
      setWinampPlaying(false);
    } else {
      winampEngine.play();
      setWinampPlaying(true);
    }
  };

  const nextWinampTrack = () => {
    onPlayKeyClick();
    const nextIdx = winampEngine.nextTrack();
    setWinampTrack(nextIdx);
    setTrackSeconds(0);
  };

  useEffect(() => {
    if (!winampPlaying) return;
    const interval = setInterval(() => {
      setTrackSeconds((prev) => (prev >= 210 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [winampPlaying]);

  // Window Management (Classic Windows 98)
  const [highestZ, setHighestZ] = useState<number>(10);
  const [activeWindowId, setActiveWindowId] = useState<string | null>('about');

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: {
      id: 'about',
      title: 'About_Me.txt - Notepad',
      shortTitle: 'About_Me.txt',
      icon: '📝',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6
    },
    projects: {
      id: 'projects',
      title: 'C:\\Projects (Enterprise & Game Builds)',
      shortTitle: 'C:\\Projects',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5
    },
    winamp: {
      id: 'winamp',
      title: 'WINAMP - [Lo-Fi Studio Playlist]',
      shortTitle: 'Winamp',
      icon: '⚡',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4
    },
    dos: {
      id: 'dos',
      title: 'MS-DOS Prompt [wyacoomz@win98]',
      shortTitle: 'MS-DOS Prompt',
      icon: '💻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3
    },
    resume: {
      id: 'resume',
      title: 'Resume.doc - WordPad',
      shortTitle: 'Resume.doc',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    contact: {
      id: 'contact',
      title: 'New Message - Outlook Express',
      shortTitle: 'Outlook Express',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    d365: {
      id: 'd365',
      title: 'D365_Bot.exe - Automation Diagnostics',
      shortTitle: 'D365_Bot.exe',
      icon: '⚙️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    }
  });

  const focusWindow = (id: string) => {
    onPlayKeyClick();
    setActiveWindowId(id);
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
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimizeWindow = (id: string) => {
    onPlayKeyClick();
    setWindows((wMap) => {
      const isMin = !wMap[id].isMinimized;
      return {
        ...wMap,
        [id]: { ...wMap[id], isMinimized: isMin }
      };
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleTaskbarWindow = (id: string) => {
    onPlayKeyClick();
    if (windows[id].isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      toggleMinimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  // MS-DOS Prompt State
  const [dosHistory, setDosHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: 'ver', res: 'Windows 98 [Version 4.10.1998]' },
    { cmd: 'whoami', res: 'Abdul Samad Khan (@wyacoomz)\nRole: RPA Developer @ Trufe | Game Dev (Godot)\nLocation: India (IST, UTC+05:30)' }
  ]);
  const [dosInput, setDosInput] = useState<string>('');
  const dosBottomRef = useRef<HTMLDivElement>(null);

  const handleDosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dosInput.trim()) return;
    onPlayKeyClick();
    const cmd = dosInput.trim().toLowerCase();
    let res = '';

    if (cmd === 'help' || cmd === '/?') {
      res = 'Available commands: DIR, WHOAMI, PROJECTS, WINAMP, CLS, VER, EXIT, HELP';
    } else if (cmd === 'ver') {
      res = 'Microsoft(R) Windows 98 [Version 4.10.1998]';
    } else if (cmd === 'dir') {
      res = ' Volume in drive C has no label.\n Volume Serial Number is 1998-2026\n Directory of C:\\WINDOWS\n\nABOUT    TXT         1,248 10-25-98  12:00a\nPROJECTS DIR             0 10-25-98  12:00a\nWINAMP   EXE       245,760 10-25-98  12:00a\nRESUME   DOC        48,128 10-25-98  12:00a\n        4 file(s)        295,136 bytes\n        1 dir(s)   4,294,967,296 bytes free';
    } else if (cmd === 'whoami') {
      res = `${PERSONAL_INFO.name} (${PERSONAL_INFO.handle})\n${PERSONAL_INFO.title}\n${PERSONAL_INFO.location}\nBio: ${PERSONAL_INFO.shortBio}`;
    } else if (cmd === 'projects') {
      res = PROJECTS.map((p) => `${p.title} [${p.category}]`).join('\n');
    } else if (cmd === 'winamp') {
      focusWindow('winamp');
      toggleWinampPlay();
      res = 'Starting Winamp audio subsystem...';
    } else if (cmd === 'cls') {
      setDosHistory([]);
      setDosInput('');
      return;
    } else if (cmd === 'exit') {
      closeWindow('dos');
      setDosInput('');
      return;
    } else {
      res = `Bad command or file name: "${cmd}". Type HELP for command list.`;
    }

    setDosHistory((prev) => [...prev, { cmd, res }]);
    setDosInput('');
    setTimeout(() => dosBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  // Selected project for Explorer
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS[0]?.id || '');

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentTrack = winampEngine.tracks[winampTrack];

  return (
    <div
      onClick={() => setSelectedIcon(null)}
      className="relative w-full h-full overflow-hidden select-none bg-[#008080] font-sans text-xs"
      style={{
        fontFamily: "'MS Sans Serif', Tahoma, 'Segoe UI', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 1. DESKTOP ICONS (CLASSIC WINDOWS 98 PIXEL STYLE)         */}
      {/* ========================================================= */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-4">
        {[
          { id: 'about', label: 'About_Me.txt', icon: '📝', action: () => focusWindow('about') },
          { id: 'projects', label: 'My Projects', icon: '📁', action: () => focusWindow('projects') },
          { id: 'winamp', label: 'Winamp (Lo-Fi)', icon: '⚡', action: () => focusWindow('winamp') },
          { id: 'dos', label: 'MS-DOS Prompt', icon: '💻', action: () => focusWindow('dos') },
          { id: 'resume', label: 'Resume.doc', icon: '📄', action: () => focusWindow('resume') },
          { id: 'contact', label: 'Outlook Express', icon: '✉️', action: () => focusWindow('contact') },
          { id: 'd365', label: 'D365_Bot.exe', icon: '⚙️', action: () => focusWindow('d365') },
          { id: 'trash', label: 'Recycle Bin', icon: '🗑️', action: () => focusWindow('about') }
        ].map((item) => {
          const isSelected = selectedIcon === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(item.id);
                item.action();
              }}
              className="flex flex-col items-center w-20 cursor-pointer group"
            >
              <div
                className={`w-11 h-11 flex items-center justify-center text-2xl transition-transform ${
                  isSelected ? 'bg-[#000080]/30 outline-1 outline-dotted outline-[#ffffff]' : ''
                }`}
              >
                <span>{item.icon}</span>
              </div>
              <span
                className={`mt-1 text-center text-[11px] leading-tight px-1 py-0.5 rounded-none text-white ${
                  isSelected ? 'bg-[#000080]' : 'text-shadow-win98'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtle Windows 98 Center Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="text-center font-bold tracking-widest text-white text-6xl font-serif">
          Microsoft Windows 98
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. WINDOW: ABOUT_ME.TXT (NOTEPAD)                         */}
      {/* ========================================================= */}
      {windows.about.isOpen && !windows.about.isMinimized && (
        <div
          onClick={() => focusWindow('about')}
          style={{ zIndex: windows.about.zIndex }}
          className="absolute top-8 left-28 w-[560px] h-[410px] bg-[#c0c0c0] shadow-2xl flex flex-col"
          style-win98-window="true"
        >
          {/* Win98 3D Outer Raised Border */}
          <div className="w-full h-full flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]">
            {/* Inner Border */}
            <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
              {/* Titlebar */}
              <div
                className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                  activeWindowId === 'about'
                    ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                    : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs">📝</span>
                  <span>About_Me.txt - Notepad</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleMinimizeWindow('about')}
                    className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-[10px] pb-1"
                  >
                    _
                  </button>
                  <button
                    onClick={() => closeWindow('about')}
                    className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Menu Bar */}
              <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>S</u>earch</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
              </div>

              {/* Text Area (White with inset border) */}
              <div className="flex-1 bg-white p-3 overflow-y-auto font-mono text-[12px] text-black leading-relaxed border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r-2 border-b-2 border-r-[#ffffff] border-b-[#ffffff] m-1">
                <div className="pb-3 border-b border-dashed border-gray-400">
                  <strong>====================================================</strong><br />
                  <strong>ABDUL SAMAD KHAN (wyacoomz) - PERSONAL LOG</strong><br />
                  <strong>====================================================</strong><br />
                  Role: RPA Developer & Systems Engineer @ Trufe<br />
                  Location: Bhopal, India (IST, UTC+05:30)<br />
                  Email: abdulischad@gmail.com<br />
                  GitHub: github.com/wyacoomz<br />
                </div>

                <div className="mt-3 space-y-2">
                  <p><strong>[1. WHO I AM]</strong></p>
                  <p>
                    I build dependable software, enterprise automation bots, and stylized indie games.
                    My day-to-day focus is architecting unattended high-throughput invoice processing
                    and Dynamics 365 ERP synchronization that eliminates hundreds of hours of manual toil.
                  </p>

                  <p><strong>[2. GAME DEVELOPMENT PASSION]</strong></p>
                  <p>
                    Outside enterprise systems, I create games in Godot 4:
                    <br />• <em>KOKE</em>: Atmospheric low-poly adventure with stylized faceless characters and volumetric fog.
                    <br />• <em>Faceless Shooter</em>: High-velocity tactical shooter.
                  </p>

                  <p><strong>[3. PHILOSOPHY]</strong></p>
                  <p>
                    • Keep systems calm, resilient, and tactile.<br />
                    • Eliminate friction without adding bloated AI gimmicks.<br />
                    • Respect cross-platform parity between Windows PC and Android.
                  </p>

                  <p><strong>[4. QUICK LAUNCH TIP]</strong></p>
                  <p>
                    Double-click <strong>Winamp (Lo-Fi)</strong> on the desktop to play calming ambient Rhodes chords while you browse!
                  </p>
                </div>
              </div>

              {/* Status Bar */}
              <div className="h-[20px] px-2 flex items-center justify-between text-[11px] text-[#404040] bg-[#c0c0c0] border-t border-[#ffffff]">
                <span>Status: Ready</span>
                <span>Ln 32, Col 1</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. WINDOW: WINAMP (LO-FI AMBIENT AUDIO PLAYER)            */}
      {/* ========================================================= */}
      {windows.winamp.isOpen && !windows.winamp.isMinimized && (
        <div
          onClick={() => focusWindow('winamp')}
          style={{ zIndex: windows.winamp.zIndex }}
          className="absolute top-16 right-16 w-[340px] bg-[#292929] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-1 font-mono select-none"
        >
          {/* Winamp Titlebar */}
          <div className="h-[18px] bg-gradient-to-r from-[#000080] via-[#004080] to-[#1084d0] px-1 flex items-center justify-between text-[11px] text-white font-bold">
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span className="tracking-wider">WINAMP</span>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => toggleMinimizeWindow('winamp')} className="w-3.5 h-3 bg-[#c0c0c0] text-black font-bold text-[9px] flex items-center justify-center">_</button>
              <button onClick={() => closeWindow('winamp')} className="w-3.5 h-3 bg-[#c0c0c0] text-black font-bold text-[9px] flex items-center justify-center">✕</button>
            </div>
          </div>

          {/* Winamp LCD Display Area */}
          <div className="bg-[#0f1a0f] p-2 mt-1 border-t-2 border-l-2 border-t-[#000000] border-l-[#000000] border-r-2 border-b-2 border-r-[#404040] border-b-[#404040] text-[#00ff00]">
            <div className="flex justify-between items-center text-[10px] tracking-widest text-[#00aa00]">
              <span>WINAMP 2.8</span>
              <span>128 KBPS / 44 KHZ</span>
            </div>

            {/* Glowing Green LCD Marquee */}
            <div className="my-1.5 overflow-hidden whitespace-nowrap bg-black/60 px-1 py-0.5 border border-[#005500]">
              <span className="text-[12px] font-bold text-[#39ff14] tracking-wide animate-pulse">
                {winampPlaying ? `▶ ${currentTrack.title}` : `❚❚ PAUSED: ${currentTrack.name}`}
              </span>
            </div>

            {/* Time & Spectrum Visualizer */}
            <div className="flex items-center justify-between pt-1">
              <div className="text-xl font-bold font-mono tracking-wider text-[#39ff14]">
                {formatTime(trackSeconds)}
              </div>

              {/* Pseudo-Spectrum EQ Bars */}
              <div className="flex items-end space-x-1 h-5">
                {[18, 12, 16, 20, 14, 19, 10, 15, 17].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#00ff00] transition-all duration-150"
                    style={{
                      height: winampPlaying ? `${Math.max(4, (h * (i % 2 === 0 ? 1 : 0.8)))}px` : '4px',
                      opacity: winampPlaying ? 1 : 0.4
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Winamp Transport Control Buttons */}
          <div className="bg-[#383838] p-1.5 mt-1 border border-[#202020] flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleWinampPlay}
                className="px-2.5 py-1 bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black font-bold text-[11px] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000]"
                title={winampPlaying ? 'Pause' : 'Play'}
              >
                {winampPlaying ? 'PAUSE' : 'PLAY'}
              </button>

              <button
                onClick={() => {
                  winampEngine.pause();
                  setWinampPlaying(false);
                  setTrackSeconds(0);
                }}
                className="px-2 py-1 bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black font-bold text-[11px] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000]"
              >
                STOP
              </button>

              <button
                onClick={nextWinampTrack}
                className="px-2 py-1 bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black font-bold text-[11px] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000]"
                title="Next Track"
              >
                NEXT »
              </button>
            </div>

            <div className="flex items-center space-x-1 text-[10px] text-white">
              <span>VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                defaultValue="0.5"
                onChange={(e) => winampEngine.setVolume(parseFloat(e.target.value))}
                className="w-16 accent-[#00ff00] cursor-pointer"
              />
            </div>
          </div>

          {/* Playlist Summary */}
          <div className="bg-[#121212] p-1 mt-1 text-[10px] text-white/80 border border-[#404040]">
            <div className="text-[#00ff00] font-bold pb-0.5 border-b border-white/20">PLAYLIST:</div>
            {winampEngine.tracks.map((t, idx) => (
              <div
                key={idx}
                onClick={() => {
                  winampEngine.currentTrack = idx;
                  setWinampTrack(idx);
                  setTrackSeconds(0);
                  if (winampPlaying) winampEngine.play();
                }}
                className={`cursor-pointer px-1 py-0.5 ${
                  winampTrack === idx ? 'bg-[#000080] text-white' : 'hover:bg-white/10'
                }`}
              >
                {t.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. WINDOW: C:\PROJECTS (WINDOWS EXPLORER)                 */}
      {/* ========================================================= */}
      {windows.projects.isOpen && !windows.projects.isMinimized && (
        <div
          onClick={() => focusWindow('projects')}
          style={{ zIndex: windows.projects.zIndex }}
          className="absolute top-12 left-36 w-[640px] h-[430px] bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          {/* Inner Border */}
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar */}
            <div
              className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                activeWindowId === 'projects'
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                  : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span>📁</span>
                <span>C:\Projects (Abdul's Engineering Archive)</span>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => toggleMinimizeWindow('projects')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px] pb-1">_</button>
                <button onClick={() => closeWindow('projects')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px]">✕</button>
              </div>
            </div>

            {/* Menu Bar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>V</u>iew</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            {/* Explorer Address Bar */}
            <div className="h-[24px] px-2 flex items-center space-x-2 text-[11px] bg-[#c0c0c0] border-b border-[#808080]">
              <span className="text-gray-700">Address:</span>
              <div className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] font-mono text-[11px]">
                C:\Projects\Production_Builds
              </div>
            </div>

            {/* Main Area: Split Left Tree + Right Icons */}
            <div className="flex-1 flex overflow-hidden p-1 gap-1">
              {/* Left Explorer Tree */}
              <div className="w-40 bg-white border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] p-2 overflow-y-auto text-[11px] space-y-1">
                <div className="font-bold text-[#000080]">📂 C:\Projects</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Automation</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Godot_Games</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Web_Platforms</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">└── 📁 Financial_Bots</div>
              </div>

              {/* Right File List & Details Pane */}
              <div className="flex-1 bg-white border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] p-3 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2.5">
                  {PROJECTS.map((p) => {
                    const isCur = selectedProject === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProject(p.id)}
                        className={`p-2.5 border cursor-pointer flex flex-col justify-between ${
                          isCur
                            ? 'bg-[#000080]/10 border-[#000080]'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-[#000080] flex items-center space-x-1">
                              <span>📁</span>
                              <span>{p.title}</span>
                            </span>
                            <span className="font-mono text-gray-500 text-[10px]">{p.category}</span>
                          </div>
                          <p className="text-[11px] text-gray-700 mt-1 leading-snug">
                            {p.shortDescription}
                          </p>
                        </div>
                        <div className="mt-2 pt-1 border-t border-gray-200 flex flex-wrap gap-1">
                          {p.tags.slice(0, 4).map((t, idx) => (
                            <span key={idx} className="bg-gray-200 text-gray-800 px-1.5 py-0.2 text-[9px] font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="h-[20px] px-2 flex items-center justify-between text-[11px] text-gray-600 bg-[#c0c0c0] border-t border-[#ffffff]">
              <span>{PROJECTS.length} object(s)</span>
              <span>Local Intranet</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. WINDOW: MS-DOS PROMPT                                  */}
      {/* ========================================================= */}
      {windows.dos.isOpen && !windows.dos.isMinimized && (
        <div
          onClick={() => focusWindow('dos')}
          style={{ zIndex: windows.dos.zIndex }}
          className="absolute top-20 left-48 w-[580px] h-[360px] bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          {/* Inner Border */}
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar */}
            <div
              className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                activeWindowId === 'dos'
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                  : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span>💻</span>
                <span>MS-DOS Prompt [wyacoomz@win98]</span>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => toggleMinimizeWindow('dos')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px] pb-1">_</button>
                <button onClick={() => closeWindow('dos')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px]">✕</button>
              </div>
            </div>

            {/* Black DOS Terminal Area */}
            <div className="flex-1 bg-black p-3 text-white font-mono text-[12px] overflow-y-auto leading-relaxed border-t border-l border-t-black border-l-black">
              <div className="text-gray-400 mb-2">
                Microsoft(R) Windows 98<br />
                (C)Copyright Microsoft Corp 1981-1998.<br />
                Type 'HELP' for command list.
              </div>

              {dosHistory.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-[#39ff14]">
                    <span>C:\WINDOWS&gt; </span>
                    <span className="text-white">{item.cmd}</span>
                  </div>
                  <div className="text-gray-300 whitespace-pre-wrap pl-2">
                    {item.res}
                  </div>
                </div>
              ))}
              <div ref={dosBottomRef} />
            </div>

            {/* DOS Prompt Input */}
            <form onSubmit={handleDosSubmit} className="bg-black px-3 py-1 flex items-center text-white font-mono text-[12px] border-t border-gray-800">
              <span className="text-[#39ff14] mr-2">C:\WINDOWS&gt;</span>
              <input
                type="text"
                value={dosInput}
                onChange={(e) => setDosInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                autoFocus
                placeholder="type dir, whoami, winamp, projects..."
              />
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. WINDOW: RESUME.DOC (WORDPAD)                           */}
      {/* ========================================================= */}
      {windows.resume.isOpen && !windows.resume.isMinimized && (
        <div
          onClick={() => focusWindow('resume')}
          style={{ zIndex: windows.resume.zIndex }}
          className="absolute top-10 left-32 w-[600px] h-[420px] bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar */}
            <div
              className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                activeWindowId === 'resume'
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                  : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span>📄</span>
                <span>Resume.doc - WordPad</span>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => toggleMinimizeWindow('resume')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px] pb-1">_</button>
                <button onClick={() => closeWindow('resume')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px]">✕</button>
              </div>
            </div>

            {/* Menu Bar & WordPad Toolbar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ormat</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            <div className="h-[26px] px-2 flex items-center justify-between bg-[#c0c0c0] border-b border-[#808080] text-[11px]">
              <div className="flex items-center space-x-1">
                <button className="px-1.5 py-0.5 border border-gray-400 bg-gray-100 font-bold">B</button>
                <button className="px-1.5 py-0.5 border border-gray-400 bg-gray-100 italic">I</button>
                <button className="px-1.5 py-0.5 border border-gray-400 bg-gray-100 underline">U</button>
              </div>
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="px-2 py-0.5 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-black font-bold text-[10px] flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>Save to Disk (.pdf)</span>
              </a>
            </div>

            {/* WordPad Paper Area */}
            <div className="flex-1 bg-white p-6 overflow-y-auto text-black font-serif text-[12px] leading-relaxed border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] m-1">
              <div className="text-center pb-4 border-b border-gray-300">
                <h2 className="text-xl font-bold font-sans">{PERSONAL_INFO.name}</h2>
                <p className="text-[11px] text-gray-600 font-sans mt-0.5">{PERSONAL_INFO.title} &bull; {PERSONAL_INFO.email}</p>
              </div>

              <div className="mt-4 space-y-4 font-sans text-xs">
                <div>
                  <h3 className="font-bold text-[#000080] uppercase tracking-wide border-b border-gray-300 pb-0.5">Experience</h3>
                  {WORK_EXPERIENCES.map((w, i) => (
                    <div key={i} className="mt-2">
                      <div className="flex justify-between font-bold">
                        <span>{w.role} - {w.company}</span>
                        <span className="font-mono text-gray-500">{w.period}</span>
                      </div>
                      <ul className="list-disc list-inside mt-1 text-gray-700 space-y-0.5">
                        {w.achievements.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-bold text-[#000080] uppercase tracking-wide border-b border-gray-300 pb-0.5">Education</h3>
                  {EDUCATION_DATA.map((ed, i) => (
                    <div key={i} className="mt-2 flex justify-between">
                      <div>
                        <span className="font-bold">{ed.degree}</span>
                        <div className="text-gray-600 text-[11px]">{ed.institution}</div>
                      </div>
                      <span className="font-mono text-gray-500">{ed.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. WINDOW: OUTLOOK EXPRESS (CONTACT DISPATCH)             */}
      {/* ========================================================= */}
      {windows.contact.isOpen && !windows.contact.isMinimized && (
        <div
          onClick={() => focusWindow('contact')}
          style={{ zIndex: windows.contact.zIndex }}
          className="absolute top-14 left-44 w-[480px] bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar */}
            <div
              className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                activeWindowId === 'contact'
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                  : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span>✉️</span>
                <span>New Message - Outlook Express</span>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => toggleMinimizeWindow('contact')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px] pb-1">_</button>
                <button onClick={() => closeWindow('contact')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px]">✕</button>
              </div>
            </div>

            {/* Outlook Toolbar */}
            <div className="h-[28px] px-2 flex items-center space-x-2 bg-[#c0c0c0] border-b border-[#808080]">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-2.5 py-0.5 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] text-black font-bold text-[11px] flex items-center space-x-1"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-[11px]">Dial-Up Connection Ready</span>
            </div>

            {/* Email Header Fields */}
            <div className="p-3 bg-[#c0c0c0] space-y-2 border-b border-[#808080] text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="w-12 font-bold text-gray-700"><u>T</u>o:</span>
                <input
                  type="text"
                  readOnly
                  value={PERSONAL_INFO.email}
                  className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-12 font-bold text-gray-700"><u>C</u>c:</span>
                <input
                  type="text"
                  readOnly
                  value="github.com/wyacoomz"
                  className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-12 font-bold text-gray-700"><u>S</u>ubject:</span>
                <input
                  type="text"
                  defaultValue="Hello Abdul! Saw your Windows 98 Workstation"
                  className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] text-[11px]"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="p-2 bg-[#c0c0c0]">
              <textarea
                rows={5}
                defaultValue={`Hi Abdul,\n\nI was testing your 3D developer workstation. Really love the nostalgic Windows 98 aesthetic and the relaxing Winamp lo-fi audio!\n\nBest regards,`}
                className="w-full bg-white p-2 border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] text-xs font-sans outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. WINDOW: D365_BOT.EXE                                   */}
      {/* ========================================================= */}
      {windows.d365.isOpen && !windows.d365.isMinimized && (
        <div
          onClick={() => focusWindow('d365')}
          style={{ zIndex: windows.d365.zIndex }}
          className="absolute top-16 left-40 w-[520px] bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            <div
              className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none ${
                activeWindowId === 'd365'
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
                  : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span>⚙️</span>
                <span>D365_Bot.exe - Automation Diagnostics</span>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => toggleMinimizeWindow('d365')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px] pb-1">_</button>
                <button onClick={() => closeWindow('d365')} className="w-[16px] h-[14px] bg-[#c0c0c0] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[10px]">✕</button>
              </div>
            </div>

            <div className="p-4 bg-white m-1 border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] text-xs font-mono space-y-3">
              <div className="font-bold text-[#000080]">TRUFE ENTERPRISE RPA // WIN98 DIAGNOSTIC DRIVER</div>
              <div className="p-2 bg-gray-100 border border-gray-300 space-y-1 text-[11px]">
                <div>• Pipeline: Multi-Entity Invoice Processor</div>
                <div>• Modules: AI Builder OCR, Deterministic Gate, ERP Upload</div>
                <div>• Status: Running unattended in production at Trufe</div>
              </div>
              <div className="text-[11px] text-gray-600">
                Processed 1,200+ monthly documents with 99.2% extraction accuracy.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. WINDOWS 98 START MENU FLYOUT                           */}
      {/* ========================================================= */}
      {startOpen && (
        <div
          ref={startMenuRef}
          className="absolute bottom-9 left-0 z-50 w-52 bg-[#c0c0c0] shadow-2xl flex border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000]"
        >
          {/* Vertical Blue Banner: Windows 98 */}
          <div className="w-7 bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center pb-2 select-none">
            <span className="transform -rotate-90 origin-bottom-left text-white font-bold tracking-widest text-[13px] whitespace-nowrap mb-6 ml-3">
              Windows<span className="font-light">98</span>
            </span>
          </div>

          {/* Start Menu Items */}
          <div className="flex-1 py-1 text-[11px] text-black flex flex-col">
            <div
              onClick={() => { focusWindow('about'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>📝</span>
              <span><u>A</u>bout Me (Notepad)</span>
            </div>

            <div
              onClick={() => { focusWindow('projects'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>📁</span>
              <span><u>P</u>rojects Archive</span>
            </div>

            <div
              onClick={() => { focusWindow('winamp'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>⚡</span>
              <span><u>W</u>inamp (Lo-Fi Radio)</span>
            </div>

            <div
              onClick={() => { focusWindow('dos'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>💻</span>
              <span><u>M</u>S-DOS Prompt</span>
            </div>

            <div
              onClick={() => { focusWindow('resume'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>📄</span>
              <span><u>R</u>esume.doc</span>
            </div>

            <div
              onClick={() => { focusWindow('contact'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>✉️</span>
              <span><u>O</u>utlook Express</span>
            </div>

            <div className="border-t border-[#808080] my-1 mx-2" />

            <div
              onClick={() => {
                if (onExitFocus) onExitFocus();
                setStartOpen(false);
              }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>🪑</span>
              <span><u>D</u>esk View</span>
            </div>

            <div
              onClick={() => {
                closeWindow('about');
                closeWindow('projects');
                closeWindow('winamp');
                closeWindow('dos');
                closeWindow('resume');
                closeWindow('contact');
                setStartOpen(false);
              }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>🔌</span>
              <span><u>S</u>hut Down Windows...</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. AUTHENTIC WINDOWS 98 TASKBAR                           */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-9 z-40 bg-[#c0c0c0] border-t-2 border-t-[#ffffff] border-b border-b-[#000000] flex items-center justify-between px-1 select-none">
        <div className="flex items-center space-x-1.5 h-full py-1">
          {/* Windows 98 Start Button */}
          <button
            onClick={() => {
              onPlayKeyClick();
              setStartOpen((prev) => !prev);
            }}
            className={`h-full px-2 flex items-center space-x-1.5 font-bold text-[12px] text-black ${
              startOpen
                ? 'border-t-2 border-l-2 border-t-[#000000] border-l-[#000000] border-r-2 border-b-2 border-r-[#ffffff] border-b-[#ffffff] bg-[#dfdfdf]'
                : 'border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] bg-[#c0c0c0]'
            }`}
          >
            {/* Windows 98 Flag Icon */}
            <div className="grid grid-cols-2 gap-[1px] w-3.5 h-3.5">
              <div className="bg-[#ff0000] w-1.5 h-1.5" />
              <div className="bg-[#00aa00] w-1.5 h-1.5" />
              <div className="bg-[#0000ff] w-1.5 h-1.5" />
              <div className="bg-[#ffff00] w-1.5 h-1.5" />
            </div>
            <span>Start</span>
          </button>

          {/* Quick Divider */}
          <div className="h-5 w-[2px] border-l border-l-[#808080] border-r border-r-[#ffffff] mx-0.5" />

          {/* Open Windows Tabs */}
          <div className="flex items-center space-x-1 h-full overflow-x-auto">
            {Object.values(windows).filter((w) => w.isOpen).map((w) => {
              const isActive = activeWindowId === w.id && !w.isMinimized;
              return (
                <button
                  key={w.id}
                  onClick={() => toggleTaskbarWindow(w.id)}
                  className={`h-full px-2 max-w-[150px] truncate flex items-center space-x-1.5 text-[11px] text-black text-left ${
                    isActive
                      ? 'border-t-2 border-l-2 border-t-[#000000] border-l-[#000000] border-r-2 border-b-2 border-r-[#ffffff] border-b-[#ffffff] bg-[#dfdfdf] font-bold'
                      : 'border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] bg-[#c0c0c0]'
                  }`}
                >
                  <span>{w.icon}</span>
                  <span className="truncate">{w.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Windows 98 System Tray (Right) */}
        <div className="h-7 px-2 flex items-center space-x-2 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] bg-[#c0c0c0] text-[11px] font-mono text-black">
          {/* Winamp Playing Indicator */}
          <button
            onClick={() => focusWindow('winamp')}
            className={`flex items-center text-[10px] ${winampPlaying ? 'text-[#000080] font-bold animate-pulse' : 'text-gray-500'}`}
            title="Winamp Audio Status"
          >
            ⚡
          </button>

          {/* Sound Mute Toggle */}
          {onToggleSound && (
            <button onClick={onToggleSound} className="cursor-pointer" title="Toggle Sound">
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          )}

          {/* Desk View Button */}
          {onExitFocus && (
            <button
              onClick={onExitFocus}
              className="text-[10px] font-sans px-1 py-0.2 bg-[#c0c0c0] hover:bg-[#d0d0d0] border border-gray-600 cursor-pointer"
              title="Return to 3D Desk"
            >
              Desk
            </button>
          )}

          {/* Digital Clock */}
          <span className="font-sans font-medium">{timeStr || '12:00 PM'}</span>
        </div>
      </div>
    </div>
  );
};
