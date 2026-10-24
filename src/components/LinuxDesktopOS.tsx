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
  Wifi,
  Battery,
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
  CheckCircle2,
  Sparkles,
  Radio,
  Coffee,
  Heart,
  Compass,
  Cpu,
  User,
  Music
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export interface WindowState {
  id: 'about' | 'projects' | 'lofi' | 'terminal' | 'resume' | 'contact' | 'pipeline';
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

// ==========================================
// PROCEDURAL LO-FI CHORD AUDIO ENGINE
// ==========================================
class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private currentTrack: number = 0;
  private volume: number = 0.45;
  private masterGain: GainNode | null = null;

  public tracks = [
    { title: 'Midnight Tea', artist: 'Abdul & Tape Loops', mood: 'Calm Rhodes & Vinyl Dust', chords: [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 261.63, 329.63, 392.00],         // Fmaj7
      [196.00, 261.63, 293.66, 392.00]          // G7sus4
    ]},
    { title: 'Rain on Window', artist: 'Studio Session', mood: 'Warm Minor 9ths', chords: [
      [146.83, 220.00, 261.63, 311.13, 369.99], // Dm9
      [196.00, 246.94, 329.63, 392.00],         // G13
      [130.81, 196.00, 246.94, 329.63],         // Cmaj7
      [220.00, 277.18, 349.23, 415.30]          // A7alt
    ]},
    { title: 'Quiet Studio', artist: 'Late Night Keys', mood: 'Dreamy Ambient', chords: [
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

    // Filter to give warm tape/Rhodes sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(680, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + dur);
    filter.connect(this.masterGain);

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.065 / freqs.length, now + 0.25);
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

const lofiEngine = new LofiAudioEngine();

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

  // Lo-Fi State
  const [lofiPlaying, setLofiPlaying] = useState<boolean>(false);
  const [lofiTrack, setLofiTrack] = useState<number>(0);
  const [lofiProgress, setLofiProgress] = useState<number>(24);
  const [lofiVolume, setLofiVolume] = useState<number>(0.45);

  const toggleLofiPlay = () => {
    onPlayKeyClick();
    if (lofiPlaying) {
      lofiEngine.pause();
      setLofiPlaying(false);
    } else {
      lofiEngine.play();
      setLofiPlaying(true);
    }
  };

  const handleNextLofi = () => {
    onPlayKeyClick();
    const nextIdx = lofiEngine.nextTrack();
    setLofiTrack(nextIdx);
    setLofiProgress(0);
  };

  useEffect(() => {
    if (!lofiPlaying) return;
    const pInterval = setInterval(() => {
      setLofiProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 800);
    return () => clearInterval(pInterval);
  }, [lofiPlaying]);

  // Welcome banner state
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Window management state (Starts CLEAN with desktop wallpaper!)
  const [highestZ, setHighestZ] = useState<number>(10);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: {
      id: 'about',
      title: 'About Me — Abdul Samad Khan (wyacoomz)',
      shortTitle: 'About Me',
      icon: '🌿',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    projects: {
      id: 'projects',
      title: 'Projects Archive (~/projects) — Selected Engineering Works',
      shortTitle: 'Projects',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3
    },
    lofi: {
      id: 'lofi',
      title: 'Lo-Fi Ambient Player — Relaxing Studio Audio',
      shortTitle: 'Lo-Fi Radio',
      icon: '📻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4
    },
    terminal: {
      id: 'terminal',
      title: 'Bash Shell — wyacoomz@studio:~$',
      shortTitle: 'Terminal',
      icon: '💻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    resume: {
      id: 'resume',
      title: 'Resume — Abdul Samad Khan (RPA & Full-Stack)',
      shortTitle: 'Resume.pdf',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    contact: {
      id: 'contact',
      title: 'Get In Touch — Direct Dispatch',
      shortTitle: 'Contact',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2
    },
    pipeline: {
      id: 'pipeline',
      title: 'Enterprise Workflow Bot — Dynamics 365 Automation',
      shortTitle: 'Automation Bot',
      icon: '⚙️',
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

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'whoami',
      output: 'Abdul Samad Khan (@wyacoomz) — RPA Developer at Trufe | Game Dev & Creative Technologist'
    },
    {
      command: 'quote',
      output: '"Simplicity and calming focus are the ultimate sign of mastery."'
    }
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    onPlayKeyClick();
    const cmd = terminalInput.trim().toLowerCase();
    let output = '';

    if (cmd === 'help') {
      output = 'Available commands: whoami, projects, lofi, contact, skills, quote, clear';
    } else if (cmd === 'whoami') {
      output = `${PERSONAL_INFO.name} (${PERSONAL_INFO.handle})\n${PERSONAL_INFO.title}\nLocation: ${PERSONAL_INFO.location}\nBio: ${PERSONAL_INFO.shortBio}`;
    } else if (cmd === 'projects') {
      output = PROJECTS.map((p) => `• ${p.title} (${p.category})`).join('\n');
    } else if (cmd === 'lofi') {
      toggleLofiPlay();
      output = lofiPlaying ? 'Lo-Fi ambient music paused.' : 'Now playing soothing lo-fi chords...';
    } else if (cmd === 'contact') {
      output = `Email: ${PERSONAL_INFO.email}\nGitHub: ${PERSONAL_INFO.github}\nLocation: ${PERSONAL_INFO.location}`;
    } else if (cmd === 'skills') {
      output = SKILL_CATEGORIES.map((c) => `${c.category}: ${c.skills.map(s => s.name).join(', ')}`).join('\n');
    } else if (cmd === 'quote') {
      const quotes = [
        '"Code is poetry written for machines to execute and humans to understand."',
        '"Keep things quiet, calming, and deeply intentional."',
        '"The secret to good systems is eliminating unnecessary friction."'
      ];
      output = quotes[Math.floor(Math.random() * quotes.length)];
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      output = `zsh: command not found: ${cmd}. Type 'help' for options.`;
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output }]);
    setTerminalInput('');
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  // Project Category Filter
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const filteredProjects = projectFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase().includes(projectFilter.toLowerCase()));

  // Active track info
  const currentTrackInfo = lofiEngine.tracks[lofiTrack];

  return (
    <div className="relative w-full h-full overflow-hidden select-none font-sans bg-[#12141c]">
      {/* ========================================================= */}
      {/* 1. CALMING PROCEDURAL AESTHETIC WALLPAPER (TWILIGHT RIDGE) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1280 808"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sky gradient: Dusky violet down to warm amber sunset */}
            <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1d2e" />
              <stop offset="38%" stopColor="#322842" />
              <stop offset="68%" stopColor="#7a4658" />
              <stop offset="88%" stopColor="#d97760" />
              <stop offset="100%" stopColor="#f7b084" />
            </linearGradient>

            {/* Glowing moon gradient */}
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8e7" stopOpacity="1" />
              <stop offset="60%" stopColor="#fde0b2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fde0b2" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97760" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1a1d2e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="1280" height="808" fill="url(#twilightSky)" />

          {/* Calming Glowing Moon */}
          <circle cx="980" cy="210" r="48" fill="url(#moonGlow)" />
          <circle cx="976" cy="208" r="32" fill="#fffaf0" />
          <circle cx="988" cy="204" r="28" fill="#322842" opacity="0.94" />

          {/* Tiny gentle stars */}
          {[
            [120, 90], [240, 140], [380, 80], [520, 160], [680, 95],
            [840, 120], [1120, 85], [1180, 145], [160, 220], [430, 260],
            [740, 200], [890, 280], [1050, 170]
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 1.6 : 1.1} fill="#fff" opacity={0.65 + (i % 4) * 0.1} />
          ))}

          {/* Layer 1: Distant soft mountain ridge */}
          <path
            d="M0 520 Q 220 440 460 480 T 920 450 Q 1120 420 1280 470 L 1280 808 L 0 808 Z"
            fill="#4a3148"
            opacity="0.80"
          />

          {/* Soft valley mist */}
          <rect y="460" width="1280" height="90" fill="url(#mistGrad)" />

          {/* Layer 2: Midground mountain peaks */}
          <path
            d="M0 580 Q 180 510 380 540 T 780 500 Q 1020 490 1280 560 L 1280 808 L 0 808 Z"
            fill="#2c2239"
          />

          {/* Layer 3: Foreground deep mountain silhouette */}
          <path
            d="M0 660 Q 260 590 540 640 T 1060 610 Q 1180 630 1280 670 L 1280 808 L 0 808 Z"
            fill="#181724"
          />

          {/* Subtle pine tree silhouettes along foreground ridge */}
          {[60, 110, 170, 290, 360, 480, 620, 710, 830, 940, 1070, 1190].map((tx, idx) => (
            <polygon
              key={idx}
              points={`${tx},${635 + (idx % 4) * 12} ${tx - 10},${670 + (idx % 4) * 12} ${tx + 10},${670 + (idx % 4) * 12}`}
              fill="#12111d"
            />
          ))}
        </svg>

        {/* Ambient Subtle Vignette & Grid */}
        <div className="absolute inset-0 bg-radial-vignette opacity-25" />
      </div>

      {/* ========================================================= */}
      {/* 2. TOP STATUS BAR (MINIMAL GLASS DOCK)                     */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-0 right-0 h-9 z-30 bg-[#0d0f17]/75 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between text-xs text-[#d1d5db]">
        <div className="flex items-center space-x-3">
          {/* Logo / Apple-style monogram */}
          <button 
            onClick={showDesktop}
            className="flex items-center space-x-2 text-[#f3f4f6] font-medium hover:text-white transition-colors"
            title="Abdul Samad Khan Studio"
          >
            <span className="font-serif italic font-bold text-sm tracking-tight text-[#fcd5a0]">λ</span>
            <span className="font-medium tracking-wide text-xs">studio-os</span>
          </button>

          <span className="text-white/20">|</span>

          {/* Lo-Fi Now Playing Pill in Top Bar */}
          <button
            onClick={() => focusWindow('lofi')}
            className={`flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-[11px] transition-all ${
              lofiPlaying 
                ? 'bg-[#3b2d42] text-[#fcd5a0] border border-[#fcd5a0]/30 shadow-xs' 
                : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
            }`}
            title="Open Lo-Fi Ambient Player"
          >
            <Radio className={`w-3 h-3 ${lofiPlaying ? 'animate-pulse text-[#fcd5a0]' : ''}`} />
            <span className="font-mono">{lofiPlaying ? `Now Playing: ${currentTrackInfo.title}` : 'Lo-Fi Radio'}</span>
          </button>
        </div>

        {/* System Tray: Sound, Time, Battery */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          {/* Audio toggle */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className="p-1 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#fcd5a0]" /> : <VolumeX className="w-3.5 h-3.5 text-[#9ca3af]" />}
            </button>
          )}

          <div className="flex items-center space-x-1.5 text-white/80">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>

          <span className="text-white/30">&bull;</span>
          <span className="text-[#f3f4f6] font-medium">{timeStr || '12:00'} IST</span>
          
          {onExitFocus && (
            <button
              onClick={onExitFocus}
              className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#f3f4f6] text-[10px] font-sans font-medium transition-all"
              title="Return to 3D Desk Camera"
            >
              Desk View
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DESKTOP SHORTCUTS (CALMING & HUMAN)                    */}
      {/* ========================================================= */}
      <div className="absolute top-12 left-5 z-10 flex flex-col space-y-3">
        {[
          { id: 'about', label: 'About Me', icon: User, color: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-200' },
          { id: 'projects', label: 'Projects', icon: Folder, color: 'bg-sky-950/70 border-sky-500/30 text-sky-200' },
          { id: 'lofi', label: 'Lo-Fi Radio', icon: Music, color: 'bg-amber-950/70 border-amber-500/30 text-amber-200' },
          { id: 'terminal', label: 'Terminal', icon: TerminalIcon, color: 'bg-stone-900/80 border-stone-500/30 text-stone-200' },
          { id: 'resume', label: 'Resume.pdf', icon: FileText, color: 'bg-indigo-950/70 border-indigo-500/30 text-indigo-200' },
          { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-rose-950/70 border-rose-500/30 text-rose-200' },
          { id: 'pipeline', label: 'Automation Bot', icon: Settings, color: 'bg-zinc-900/70 border-zinc-500/30 text-zinc-300' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => focusWindow(item.id)}
              className="group flex items-center space-x-3 px-3 py-2 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 hover:border-white/20 backdrop-blur-sm transition-all duration-200 text-left w-48 shadow-sm hover:scale-[1.02]"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white/95 group-hover:text-white tracking-wide">
                  {item.label}
                </span>
                <span className="text-[10px] text-white/50 font-mono">
                  {item.id === 'lofi' ? (lofiPlaying ? 'Playing' : 'Audio') : 'Open'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 4. CALM WELCOME CARD (FADES / DISMISSABLE)                */}
      {/* ========================================================= */}
      {showWelcome && (
        <div className="absolute top-14 right-6 z-20 w-80 p-4 rounded-2xl bg-[#161822]/85 border border-white/10 shadow-2xl backdrop-blur-md text-white/90">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-semibold tracking-wide font-sans text-white">Quiet Sanctuary</h4>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-white/40 hover:text-white text-xs transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-2 text-xs text-white/70 leading-relaxed font-sans">
            Welcome to Abdul Samad Khan's interactive studio. A calm space to explore engineering works, game prototypes, and ambient sounds.
          </p>
          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={toggleLofiPlay}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#fcd5a0]/15 hover:bg-[#fcd5a0]/25 text-[#fcd5a0] text-xs font-medium transition-colors"
            >
              {lofiPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{lofiPlaying ? 'Pause Lo-Fi' : 'Play Lo-Fi Music'}</span>
            </button>
            <span className="text-[10px] font-mono text-white/40">press space or click</span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. WINDOW: ABOUT ME (PERSONAL & AUTHENTIC)                */}
      {/* ========================================================= */}
      {windows.about.isOpen && !windows.about.isMinimized && (
        <div
          onClick={() => focusWindow('about')}
          style={{ zIndex: windows.about.zIndex }}
          className="absolute top-14 left-56 right-12 bottom-16 rounded-2xl bg-[#181a24]/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-11 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('about')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('about')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-white/90">About Me — Abdul Samad Khan</span>
            </div>
            <button onClick={() => closeWindow('about')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-white/80 leading-relaxed">
            <div className="flex items-center space-x-5 pb-6 border-b border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg">
                A
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white tracking-tight">Abdul Samad Khan</h2>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">RPA Developer & Systems Engineer @ Trufe &bull; @wyacoomz</p>
                <p className="text-xs text-white/50 mt-1">Bhopal / India (IST, UTC+05:30) &bull; abdulischad@gmail.com</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 font-mono">Who I Am</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  I am a software engineer focused on building resilient automation engines, high-throughput cloud pipelines, and tactile game experiences. Currently, I engineer end-to-end invoice automation and ERP synchronization at Trufe.
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  Outside enterprise automation, I craft stylized games in Godot Engine (<em className="text-white">KOKE</em> and <em className="text-white">Faceless Shooter</em>) and build interactive 3D web experiences with Three.js.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 font-mono">Philosophy</h3>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-white font-medium">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Tactile & Calming Software</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Software should feel quiet, responsive, and delightful. No unnecessary clutter, no cold robotic buzzwords — just clean craft and reliability.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-white font-medium">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cross-Platform Parity</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Building unified architectures that maintain strict Windows PC and Android mobile parity without sacrificing aesthetic fidelity.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Skills Pills */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 font-mono mb-3">Core Toolchain</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Power Automate Cloud', 'Microsoft AI Builder', 'Python', 'React', 'Three.js',
                  'Godot 4 Engine', 'Dynamics 365 ERP', 'SQL Server', 'TypeScript', 'Node.js', 'Tailwind CSS'
                ].map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/80 font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. WINDOW: PROJECTS (CURATED, HUMAN-CENTERED)             */}
      {/* ========================================================= */}
      {windows.projects.isOpen && !windows.projects.isMinimized && (
        <div
          onClick={() => focusWindow('projects')}
          style={{ zIndex: windows.projects.zIndex }}
          className="absolute top-14 left-56 right-12 bottom-16 rounded-2xl bg-[#181a24]/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-11 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('projects')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('projects')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <Folder className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-medium text-white/90">Projects Archive (~/projects)</span>
            </div>
            <button onClick={() => closeWindow('projects')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filters */}
          <div className="px-6 py-2.5 border-b border-white/10 flex items-center space-x-2 text-xs font-mono">
            {['All', 'Automation', 'Web', 'Financial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`px-3 py-1 rounded-full transition-all ${
                  projectFilter === cat 
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-2">
                    <span className="text-sky-400">{p.category}</span>
                    <span>{p.index}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-sky-200 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 line-clamp-3 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-white/70 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. WINDOW: LO-FI AMBIENT RADIO                            */}
      {/* ========================================================= */}
      {windows.lofi.isOpen && !windows.lofi.isMinimized && (
        <div
          onClick={() => focusWindow('lofi')}
          style={{ zIndex: windows.lofi.zIndex }}
          className="absolute top-20 left-72 w-[420px] rounded-2xl bg-[#1c1926]/95 border border-[#fcd5a0]/25 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-10 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('lofi')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('lofi')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <Radio className="w-3.5 h-3.5 text-[#fcd5a0]" />
              <span className="text-xs font-medium text-white/90">Lo-Fi Ambient Player</span>
            </div>
            <button onClick={() => closeWindow('lofi')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Player Body */}
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            {/* Spinning Tape Cassette Art */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#322842] to-[#7a4658] border-4 border-[#fcd5a0]/30 flex items-center justify-center shadow-inner">
              <div className={`w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center ${lofiPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                <div className="w-10 h-10 rounded-full bg-[#181a24] border border-[#fcd5a0]/50 flex items-center justify-center">
                  <Music className="w-4 h-4 text-[#fcd5a0]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-serif font-bold text-[#fcd5a0]">{currentTrackInfo.title}</h3>
              <p className="text-xs text-white/60 font-mono mt-0.5">{currentTrackInfo.artist}</p>
              <p className="text-[11px] text-[#fcd5a0]/70 mt-1 italic">{currentTrackInfo.mood}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-1">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-[#fcd5a0] transition-all duration-300" style={{ width: `${lofiProgress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>0:{lofiProgress < 10 ? `0${lofiProgress}` : lofiProgress}</span>
                <span>3:30</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={handleNextLofi}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={toggleLofiPlay}
                className="w-12 h-12 rounded-full bg-[#fcd5a0] hover:bg-[#ffe3be] text-[#1c1926] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                title={lofiPlaying ? 'Pause' : 'Play'}
              >
                {lofiPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  const nextVol = lofiVolume > 0 ? 0 : 0.45;
                  setLofiVolume(nextVol);
                  lofiEngine.setVolume(nextVol);
                }}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="Toggle Mute"
              >
                {lofiVolume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. WINDOW: TERMINAL (CLEAN & INTERACTIVE)                 */}
      {/* ========================================================= */}
      {windows.terminal.isOpen && !windows.terminal.isMinimized && (
        <div
          onClick={() => focusWindow('terminal')}
          style={{ zIndex: windows.terminal.zIndex }}
          className="absolute top-16 left-64 w-[580px] h-[380px] rounded-xl bg-[#111218]/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-mono transition-all duration-150"
        >
          {/* Header */}
          <div className="h-9 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('terminal')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('terminal')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <TerminalIcon className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs font-medium text-white/90">wyacoomz@studio: ~ (bash)</span>
            </div>
            <button onClick={() => closeWindow('terminal')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Console output */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-white/80">
            <div className="text-white/40 pb-2 border-b border-white/5">
              Welcome to Studio Shell v2.4. Type <span className="text-emerald-400">help</span> for commands.
            </div>

            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">wyacoomz@studio:~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="text-white/70 whitespace-pre-wrap pl-4 leading-relaxed font-sans text-xs">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Console prompt input */}
          <form onSubmit={handleTerminalSubmit} className="p-3 border-t border-white/10 bg-black/40 flex items-center space-x-2">
            <span className="text-emerald-400 text-xs font-bold">wyacoomz@studio:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help', 'whoami', 'projects', 'lofi'..."
              className="flex-1 bg-transparent text-xs text-white outline-none font-mono placeholder:text-white/30"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. WINDOW: RESUME (DOCUMENT VIEWER)                       */}
      {/* ========================================================= */}
      {windows.resume.isOpen && !windows.resume.isMinimized && (
        <div
          onClick={() => focusWindow('resume')}
          style={{ zIndex: windows.resume.zIndex }}
          className="absolute top-14 left-56 right-16 bottom-16 rounded-2xl bg-[#181a24]/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-11 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('resume')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('resume')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-white/90">Abdul_Samad_Khan_Resume.pdf</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 text-xs font-mono transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Download PDF</span>
              </a>
              <button onClick={() => closeWindow('resume')} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs text-white/80 max-w-3xl mx-auto">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif font-bold text-white">Abdul Samad Khan</h2>
              <p className="text-indigo-400 font-mono mt-0.5">{PERSONAL_INFO.title} &bull; {PERSONAL_INFO.email}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono mb-2">Professional Experience</h3>
              {WORK_EXPERIENCES.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 mb-3 border border-white/5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>{w.role} &bull; {w.company}</span>
                    <span className="font-mono text-white/50">{w.period}</span>
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-white/70">
                    {w.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono mb-2">Education</h3>
              {EDUCATION_DATA.map((ed, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>{ed.degree}</span>
                    <span className="font-mono text-white/50">{ed.period}</span>
                  </div>
                  <p className="text-white/60 mt-1">{ed.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. WINDOW: CONTACT (FRIENDLY DISPATCH)                   */}
      {/* ========================================================= */}
      {windows.contact.isOpen && !windows.contact.isMinimized && (
        <div
          onClick={() => focusWindow('contact')}
          style={{ zIndex: windows.contact.zIndex }}
          className="absolute top-20 left-72 w-[460px] rounded-2xl bg-[#1c1926]/95 border border-rose-500/25 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-10 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('contact')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('contact')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-medium text-white/90">Get In Touch</span>
            </div>
            <button onClick={() => closeWindow('contact')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs text-white/70 leading-relaxed">
              Always glad to connect with fellow engineers, game developers, or discuss opportunities.
            </p>

            <div className="space-y-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-medium text-white">{PERSONAL_INFO.email}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/40" />
              </a>

              <a
                href={`https://${PERSONAL_INFO.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Code className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-medium text-white">{PERSONAL_INFO.github}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/40" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-white/50 font-mono">
              Based in India (IST, UTC+05:30) &bull; Typically responds within 24 hours.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. WINDOW: AUTOMATION BOT (OPTIONAL / ON-DEMAND)         */}
      {/* ========================================================= */}
      {windows.pipeline.isOpen && !windows.pipeline.isMinimized && (
        <div
          onClick={() => focusWindow('pipeline')}
          style={{ zIndex: windows.pipeline.zIndex }}
          className="absolute top-14 left-56 right-12 bottom-16 rounded-2xl bg-[#181a24]/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans transition-all duration-150"
        >
          {/* Header */}
          <div className="h-11 px-4 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 mr-2">
                <button onClick={() => closeWindow('pipeline')} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500" />
                <button onClick={() => toggleMinimizeWindow('pipeline')} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500" />
                <button className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <Settings className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-xs font-medium text-white/90">Dynamics 365 Automation Studio</span>
            </div>
            <button onClick={() => closeWindow('pipeline')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-white/80">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold text-white">Production Invoice Automation Pipeline</h3>
              <p className="text-xs text-white/60 mt-1">
                Automated multi-subsidiary invoice ingestion and verification pipeline deployed at Trufe.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { step: '01', title: 'Intake', tech: 'Power Automate', desc: 'PDF file listener' },
                { step: '02', title: 'OCR', tech: 'AI Builder', desc: 'Data extraction' },
                { step: '03', title: 'Validation', tech: 'Python Engine', desc: 'Rules & checksum' },
                { step: '04', title: 'Review', tech: 'Adaptive Cards', desc: 'Human-in-the-loop' },
                { step: '05', title: 'ERP Commit', tech: 'Dynamics 365', desc: 'Automated journal entry' }
              ].map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-emerald-400">{s.step}</span>
                  <h4 className="text-xs font-semibold text-white mt-1">{s.title}</h4>
                  <p className="text-[10px] text-white/50 font-mono mt-0.5">{s.tech}</p>
                  <p className="text-[11px] text-white/60 mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. BOTTOM TASKBAR / DOCK                                 */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-10 z-30 bg-[#0d0f17]/85 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <button
            onClick={showDesktop}
            className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#f3f4f6] font-sans font-medium text-xs transition-colors flex items-center space-x-1.5"
            title="Toggle Desktop"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fcd5a0]" />
            <span>Desktop</span>
          </button>

          {/* Active open window tabs */}
          <div className="flex items-center space-x-1.5 ml-2 overflow-x-auto">
            {Object.values(windows).filter((w) => w.isOpen).map((w) => (
              <button
                key={w.id}
                onClick={() => focusWindow(w.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-sans transition-all flex items-center space-x-1.5 border ${
                  !w.isMinimized
                    ? 'bg-white/15 border-white/20 text-white'
                    : 'bg-black/30 border-white/5 text-white/50 hover:text-white'
                }`}
              >
                <span>{w.icon}</span>
                <span>{w.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-white/40 font-mono hidden sm:inline">
          Abdul Samad Khan &bull; Studio Ultrabook 16"
        </div>
      </div>
    </div>
  );
};
