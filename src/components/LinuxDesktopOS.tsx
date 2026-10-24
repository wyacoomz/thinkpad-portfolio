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
  Send,
  Monitor,
  Flame,
  Bomb,
  Flag,
  Smile,
  Frown
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export interface WindowState {
  id: 'about' | 'projects' | 'winamp' | 'dos' | 'resume' | 'contact' | 'minesweeper' | 'display' | 'trash';
  title: string;
  shortTitle: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  w?: number;
  h?: number;
}

interface Win98DesktopProps {
  onPlayKeyClick?: () => void;
  onExitFocus?: () => void;
  onCloseLaptop?: () => void;
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
    { title: '03. Abdul - WINOWS98 Chill.mp3', name: 'WINOWS98 Chill', artist: 'Abdul Samad Khan', chords: [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [164.81, 196.00, 246.94, 293.66],         // Em7
      [146.83, 174.61, 220.00, 261.63],         // Dm7
      [130.81, 164.81, 196.00, 246.94]          // Cmaj7
    ]},
    { title: '04. Abdul - Late Night Code.mp3', name: 'Late Night Code', artist: 'Abdul Samad Khan', chords: [
      [220.00, 261.63, 329.63, 392.00],         // Am7
      [174.61, 220.00, 261.63, 329.63],         // Fmaj7
      [196.00, 246.94, 293.66, 349.23],         // G7
      [261.63, 329.63, 392.00, 523.25]          // Cmaj7
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

interface Win98TitleBarProps {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  isActive: boolean;
  onStartDrag: (id: string, e: React.MouseEvent) => void;
  onMinimize?: (id: string, e?: React.MouseEvent) => void;
  onClose: (id: string, e?: React.MouseEvent) => void;
  showMinimize?: boolean;
}

const Win98TitleBar: React.FC<Win98TitleBarProps> = ({
  id,
  icon,
  title,
  isActive,
  onStartDrag,
  onMinimize,
  onClose,
  showMinimize = true
}) => {
  return (
    <div
      onMouseDown={(e) => onStartDrag(id, e)}
      className={`h-[22px] px-1.5 flex items-center justify-between text-white font-bold text-[12px] select-none cursor-move ${
        isActive
          ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]'
          : 'bg-gradient-to-r from-[#808080] to-[#b5b5b5]'
      }`}
    >
      <div className="flex items-center space-x-1.5 truncate pointer-events-none">
        <span className="text-xs shrink-0">{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div
        className="flex items-center space-x-1 shrink-0 ml-2"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {showMinimize && onMinimize && (
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id, e);
            }}
            aria-label="Minimize"
            className="w-[16px] h-[14px] bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-[10px] pb-1 cursor-pointer select-none"
          >
            _
          </button>
        )}
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose(id, e);
          }}
          aria-label="Close"
          className="w-[16px] h-[14px] bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] text-black font-bold flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-[10px] cursor-pointer select-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const LinuxDesktopOS: React.FC<Win98DesktopProps> = ({
  onPlayKeyClick = () => {},
  onExitFocus,
  onCloseLaptop,
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

  // Wallpaper Theme State ('teal' | 'clouds' | 'twilight' | 'bliss')
  const [wallpaperTheme, setWallpaperTheme] = useState<'teal' | 'clouds' | 'twilight' | 'bliss'>('teal');

  // Start Menu State
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Desktop Right-Click Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
      setContextMenu(null);
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Window Management & Draggable Coordinates
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
      zIndex: 6,
      x: 95,
      y: 20,
      w: 560,
      h: 410
    },
    projects: {
      id: 'projects',
      title: 'C:\\Projects (Enterprise & Game Builds)',
      shortTitle: 'C:\\Projects',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      x: 180,
      y: 60,
      w: 640,
      h: 430
    },
    winamp: {
      id: 'winamp',
      title: 'WINAMP - [Lo-Fi Studio Playlist]',
      shortTitle: 'Winamp',
      icon: '⚡',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      x: 720,
      y: 50,
      w: 340,
      h: 360
    },
    minesweeper: {
      id: 'minesweeper',
      title: 'Minesweeper',
      shortTitle: 'Minesweeper',
      icon: '💣',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      x: 260,
      y: 80,
      w: 240,
      h: 320
    },
    dos: {
      id: 'dos',
      title: 'MS-DOS Prompt [wyacoomz@win98]',
      shortTitle: 'MS-DOS Prompt',
      icon: '💻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      x: 220,
      y: 90,
      w: 580,
      h: 360
    },
    resume: {
      id: 'resume',
      title: 'Resume.doc - WordPad',
      shortTitle: 'Resume.doc',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      x: 160,
      y: 45,
      w: 600,
      h: 430
    },
    contact: {
      id: 'contact',
      title: 'New Message - Outlook Express',
      shortTitle: 'Outlook Express',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      x: 280,
      y: 75,
      w: 480,
      h: 340
    },
    display: {
      id: 'display',
      title: 'Display Properties',
      shortTitle: 'Display',
      icon: '🖥️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      x: 340,
      y: 110,
      w: 410,
      h: 350
    },
    trash: {
      id: 'trash',
      title: 'Recycle Bin',
      shortTitle: 'Recycle Bin',
      icon: '🗑️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      x: 310,
      y: 120,
      w: 460,
      h: 270
    }
  });

  // Shut Down Dialog state
  const [showShutDownDialog, setShowShutDownDialog] = useState<boolean>(false);
  const [shutDownAction, setShutDownAction] = useState<'shutdown' | 'restart'>('shutdown');

  // Recycle Bin Items state
  const [recycledItems, setRecycledItems] = useState([
    { name: 'ai_slop_generator.exe', path: 'C:\\WINDOWS\\SYSTEM', size: '0 KB', date: '10/25/1998 3:42 AM' },
    { name: 'bloated_frameworks.zip', path: 'C:\\WINDOWS\\TEMP', size: '450 MB', date: '10/25/1998 2:15 AM' },
    { name: 'untested_code.bak', path: 'C:\\DEVEL', size: '12 KB', date: '10/25/1998 1:30 AM' }
  ]);

  // DRAG MANAGEMENT
  const [draggingWindow, setDraggingWindow] = useState<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const startDrag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(id);
    const win = windows[id];
    setDraggingWindow({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: win.x,
      initY: win.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingWindow) return;
      const dx = e.clientX - draggingWindow.startX;
      const dy = e.clientY - draggingWindow.startY;
      setWindows((wMap) => {
        const win = wMap[draggingWindow.id];
        if (!win) return wMap;
        return {
          ...wMap,
          [draggingWindow.id]: {
            ...win,
            x: Math.max(10, Math.min(1000, draggingWindow.initX + dx)),
            y: Math.max(10, Math.min(500, draggingWindow.initY + dy))
          }
        };
      });
    };

    const handleMouseUp = () => {
      setDraggingWindow(null);
    };

    if (draggingWindow) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingWindow]);

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

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPlayKeyClick();
    setWindows((wMap) => {
      if (!wMap[id]) return wMap;
      return {
        ...wMap,
        [id]: { ...wMap[id], isOpen: false }
      };
    });
    setActiveWindowId((prev) => (prev === id ? null : prev));
  };

  const toggleMinimizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPlayKeyClick();
    setWindows((wMap) => {
      if (!wMap[id]) return wMap;
      const isMin = !wMap[id].isMinimized;
      return {
        ...wMap,
        [id]: { ...wMap[id], isMinimized: isMin }
      };
    });
    setActiveWindowId((prev) => (prev === id ? null : prev));
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

  // ==========================================
  // PLAYABLE MINESWEEPER LOGIC (9x9 with 10 mines)
  // ==========================================
  interface Cell {
    row: number;
    col: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
  }

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [mineCount, setMineCount] = useState<number>(10);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [mineTimer, setMineTimer] = useState<number>(0);
  const [faceEmotion, setFaceEmotion] = useState<'normal' | 'scared' | 'won' | 'dead'>('normal');

  const initMinesweeper = () => {
    const rows = 9;
    const cols = 9;
    const totalMines = 10;
    const newGrid: Cell[][] = [];

    for (let r = 0; r < rows; r++) {
      newGrid[r] = [];
      for (let c = 0; c < cols; c++) {
        newGrid[r][c] = {
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0
        };
      }
    }

    // Place mines randomly
    let placed = 0;
    while (placed < totalMines) {
      const rr = Math.floor(Math.random() * rows);
      const cc = Math.floor(Math.random() * cols);
      if (!newGrid[rr][cc].isMine) {
        newGrid[rr][cc].isMine = true;
        placed++;
      }
    }

    // Calculate neighbor mine numbers
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].adjacentMines = count;
        }
      }
    }

    setGrid(newGrid);
    setMineCount(totalMines);
    setGameStatus('idle');
    setMineTimer(0);
    setFaceEmotion('normal');
  };

  useEffect(() => {
    initMinesweeper();
  }, []);

  // Timer
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const tInterval = setInterval(() => {
      setMineTimer((prev) => Math.min(999, prev + 1));
    }, 1000);
    return () => clearInterval(tInterval);
  }, [gameStatus]);

  const revealCell = (r: number, c: number) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return;
    if (grid[r][c].isFlagged || grid[r][c].isRevealed) return;
    onPlayKeyClick();

    if (gameStatus === 'idle') {
      setGameStatus('playing');
    }

    const nextGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const target = nextGrid[r][c];

    // Clicked a mine!
    if (target.isMine) {
      // Reveal all mines
      for (let rr = 0; rr < 9; rr++) {
        for (let cc = 0; cc < 9; cc++) {
          if (nextGrid[rr][cc].isMine) {
            nextGrid[rr][cc].isRevealed = true;
          }
        }
      }
      setGrid(nextGrid);
      setGameStatus('lost');
      setFaceEmotion('dead');
      return;
    }

    // Flood fill empty spaces
    const flood = (cr: number, cc: number) => {
      if (cr < 0 || cr >= 9 || cc < 0 || cc >= 9) return;
      const cell = nextGrid[cr][cc];
      if (cell.isRevealed || cell.isFlagged || cell.isMine) return;
      cell.isRevealed = true;
      if (cell.adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            flood(cr + dr, cc + dc);
          }
        }
      }
    };

    flood(r, c);
    setGrid(nextGrid);

    // Check win condition
    let unrevealedSafe = 0;
    for (let rr = 0; rr < 9; rr++) {
      for (let cc = 0; cc < 9; cc++) {
        if (!nextGrid[rr][cc].isMine && !nextGrid[rr][cc].isRevealed) {
          unrevealedSafe++;
        }
      }
    }
    if (unrevealedSafe === 0) {
      setGameStatus('won');
      setFaceEmotion('won');
    }
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameStatus === 'won' || gameStatus === 'lost') return;
    if (grid[r][c].isRevealed) return;
    onPlayKeyClick();

    const nextGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const target = nextGrid[r][c];
    target.isFlagged = !target.isFlagged;
    setGrid(nextGrid);
    setMineCount((prev) => (target.isFlagged ? prev - 1 : prev + 1));
  };

  // MS-DOS Prompt State
  const [dosHistory, setDosHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: 'ver', res: 'Mogrosoft(R) WINOWS98 [Version 4.10.1998]' },
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
      res = 'Available commands: DIR, WHOAMI, PROJECTS, WINAMP, MINES, CLS, VER, EXIT, HELP';
    } else if (cmd === 'ver') {
      res = 'Mogrosoft(R) WINOWS98 [Version 4.10.1998]';
    } else if (cmd === 'dir') {
      res = ' Volume in drive C has no label.\n Volume Serial Number is 1998-2026\n Directory of C:\\WINDOWS\n\nABOUT    TXT         1,248 10-25-98  12:00a\nPROJECTS DIR             0 10-25-98  12:00a\nWINAMP   EXE       245,760 10-25-98  12:00a\nMINES    EXE        32,768 10-25-98  12:00a\nRESUME   DOC        48,128 10-25-98  12:00a\n        5 file(s)        327,904 bytes\n        1 dir(s)   4,294,967,296 bytes free';
    } else if (cmd === 'whoami') {
      res = `${PERSONAL_INFO.name} (${PERSONAL_INFO.handle})\n${PERSONAL_INFO.title}\n${PERSONAL_INFO.location}\nBio: ${PERSONAL_INFO.shortBio}`;
    } else if (cmd === 'projects') {
      res = PROJECTS.map((p) => `${p.title} [${p.category}]`).join('\n');
    } else if (cmd === 'winamp') {
      focusWindow('winamp');
      toggleWinampPlay();
      res = 'Starting Winamp audio subsystem...';
    } else if (cmd === 'mines' || cmd === 'minesweeper') {
      focusWindow('minesweeper');
      res = 'Launching Minesweeper...';
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

  // Number colors in classic Minesweeper
  const numColors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-indigo-800', 'text-amber-800', 'text-teal-700', 'text-black', 'text-gray-500'];

  // Handle right-click on desktop
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: Math.min(e.clientX, 1100), y: Math.min(e.clientY, 600) });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => setSelectedIcon(null)}
      className="relative w-full h-full overflow-hidden select-none font-sans text-xs transition-colors duration-500"
      style={{
        fontFamily: "'MS Sans Serif', Tahoma, 'Segoe UI', sans-serif",
        backgroundColor: wallpaperTheme === 'teal' ? '#008080' : undefined
      }}
    >
      {/* ========================================================= */}
      {/* WALLPAPER BACKGROUNDS                                     */}
      {/* ========================================================= */}
      {wallpaperTheme === 'clouds' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b58b8] via-[#4d88e0] to-[#b3d4fc] pointer-events-none flex flex-col items-center justify-center">
          <div className="text-center font-bold tracking-[0.25em] text-white/50 text-2xl font-sans uppercase">
            MOGRO SOFT
          </div>
          <div className="text-center font-black tracking-widest text-white/40 text-6xl font-serif">
            WINOWS98
          </div>
        </div>
      )}

      {wallpaperTheme === 'twilight' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#181a2e] via-[#4a2e48] to-[#d97760] pointer-events-none flex items-center justify-center">
          <div className="text-center font-bold tracking-widest text-white/30 text-5xl font-serif">
            Twilight Ridge
          </div>
        </div>
      )}

      {wallpaperTheme === 'bliss' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#2872ba] via-[#74b4ea] to-[#409c3e] pointer-events-none flex items-center justify-center">
          <div className="text-center font-bold tracking-widest text-white/30 text-6xl font-serif">
            Windows Bliss
          </div>
        </div>
      )}

      {wallpaperTheme === 'teal' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10">
          <div className="text-center font-bold tracking-[0.25em] text-white text-2xl font-sans uppercase">
            MOGRO SOFT
          </div>
          <div className="text-center font-black tracking-widest text-white text-6xl font-serif">
            WINOWS98
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. DESKTOP ICONS (CLASSIC WINDOWS 98 PIXEL STYLE)         */}
      {/* ========================================================= */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1.5">
        {[
          { id: 'about', label: 'About_Me.txt', icon: '📝', action: () => focusWindow('about') },
          { id: 'projects', label: 'My Projects', icon: '📁', action: () => focusWindow('projects') },
          { id: 'winamp', label: 'Winamp (Lo-Fi)', icon: '⚡', action: () => focusWindow('winamp') },
          { id: 'minesweeper', label: 'Minesweeper', icon: '💣', action: () => focusWindow('minesweeper') },
          { id: 'dos', label: 'MS-DOS Prompt', icon: '💻', action: () => focusWindow('dos') },
          { id: 'resume', label: 'Resume.doc', icon: '📄', action: () => focusWindow('resume') },
          { id: 'contact', label: 'Outlook Express', icon: '✉️', action: () => focusWindow('contact') },
          { id: 'display', label: 'Display Settings', icon: '🖥️', action: () => focusWindow('display') },
          { id: 'trash', label: 'Recycle Bin', icon: '🗑️', action: () => focusWindow('trash') }
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
              className="flex flex-col items-center w-[74px] cursor-pointer group select-none"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center text-2xl transition-transform ${
                  isSelected ? 'bg-[#000080]/30 outline-1 outline-dotted outline-[#ffffff]' : ''
                }`}
              >
                <span>{item.icon}</span>
              </div>
              <span
                className={`mt-0.5 text-center text-[11px] leading-tight px-1 py-0.5 rounded-none text-white ${
                  isSelected ? 'bg-[#000080]' : 'text-shadow-win98'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 2. WINDOW: ABOUT_ME.TXT (NOTEPAD)                         */}
      {/* ========================================================= */}
      {windows.about.isOpen && !windows.about.isMinimized && (
        <div
          onClick={() => focusWindow('about')}
          style={{
            zIndex: windows.about.zIndex,
            left: `${windows.about.x}px`,
            top: `${windows.about.y}px`,
            width: `${windows.about.w}px`,
            height: `${windows.about.h}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="about"
              icon="📝"
              title="About_Me.txt - Notepad"
              isActive={activeWindowId === 'about'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            {/* Menu Bar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>S</u>earch</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            {/* Text Area */}
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

                <p><strong>[4. RETRO EASTER EGGS]</strong></p>
                <p>
                  • Click <strong>Minesweeper</strong> on the desktop for a quick game!<br />
                  • Click <strong>Winamp (Lo-Fi)</strong> to play ambient chord progressions while reading.
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
      )}

      {/* ========================================================= */}
      {/* 3. WINDOW: WINAMP 2.8 (DRAGGABLE & ANIMATED)              */}
      {/* ========================================================= */}
      {windows.winamp.isOpen && !windows.winamp.isMinimized && (
        <div
          onClick={() => focusWindow('winamp')}
          style={{
            zIndex: windows.winamp.zIndex,
            left: `${windows.winamp.x}px`,
            top: `${windows.winamp.y}px`,
            width: `${windows.winamp.w}px`
          }}
          className="absolute bg-[#292929] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-1 font-mono select-none"
        >
          {/* Winamp Titlebar with Drag Listener */}
          <div
            onMouseDown={(e) => startDrag('winamp', e)}
            className="h-[18px] bg-gradient-to-r from-[#000080] via-[#004080] to-[#1084d0] px-1 flex items-center justify-between text-[11px] text-white font-bold cursor-move select-none"
          >
            <div className="flex items-center space-x-1 pointer-events-none">
              <span>⚡</span>
              <span className="tracking-wider">WINAMP 2.8</span>
            </div>
            <div
              className="flex items-center space-x-1 shrink-0 ml-1"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => toggleMinimizeWindow('winamp', e)}
                aria-label="Minimize"
                className="w-3.5 h-3 bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] text-black font-bold text-[9px] flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] cursor-pointer"
              >
                _
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => closeWindow('winamp', e)}
                aria-label="Close"
                className="w-3.5 h-3 bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] text-black font-bold text-[9px] flex items-center justify-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-[9px] cursor-pointer"
              >
                ✕
              </button>
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

              {/* Spectrum EQ Bars */}
              <div className="flex items-end space-x-1 h-5">
                {[18, 12, 16, 20, 14, 19, 10, 15, 17, 13].map((h, i) => (
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
      {/* 4. WINDOW: PLAYABLE 9x9 MINESWEEPER                       */}
      {/* ========================================================= */}
      {windows.minesweeper.isOpen && !windows.minesweeper.isMinimized && (
        <div
          onClick={() => focusWindow('minesweeper')}
          style={{
            zIndex: windows.minesweeper.zIndex,
            left: `${windows.minesweeper.x}px`,
            top: `${windows.minesweeper.y}px`,
            width: '246px'
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px] select-none"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="minesweeper"
              icon="💣"
              title="Minesweeper"
              isActive={activeWindowId === 'minesweeper'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            {/* Menu Bar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span onClick={initMinesweeper} className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>G</u>ame</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            {/* Minesweeper Header Bar (LEDs + Smiley) */}
            <div className="p-2 border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r-2 border-b-2 border-r-[#ffffff] border-b-[#ffffff] m-1 flex items-center justify-between bg-[#c0c0c0]">
              {/* Mine Counter (3-digit red LED) */}
              <div className="bg-black px-1.5 py-0.5 border border-gray-600 text-red-600 font-mono font-bold text-lg tracking-widest">
                {mineCount < 0 ? `-${Math.abs(mineCount).toString().padStart(2, '0')}` : mineCount.toString().padStart(3, '0')}
              </div>

              {/* Smiley Reset Button */}
              <button
                onClick={initMinesweeper}
                className="w-7 h-7 bg-[#c0c0c0] border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] active:border-t-[#000000] active:border-l-[#000000] flex items-center justify-center text-base"
                title="Restart Game"
              >
                {faceEmotion === 'normal' && '🙂'}
                {faceEmotion === 'scared' && '😮'}
                {faceEmotion === 'won' && '😎'}
                {faceEmotion === 'dead' && '😵'}
              </button>

              {/* Timer (3-digit red LED) */}
              <div className="bg-black px-1.5 py-0.5 border border-gray-600 text-red-600 font-mono font-bold text-lg tracking-widest">
                {mineTimer.toString().padStart(3, '0')}
              </div>
            </div>

            {/* 9x9 Mine Grid */}
            <div className="p-1 border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r-2 border-b-2 border-r-[#ffffff] border-b-[#ffffff] m-1 bg-[#808080] flex justify-center">
              <div className="grid grid-cols-9 gap-[1px] bg-[#808080]">
                {grid.map((row, r) =>
                  row.map((cell, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => revealCell(r, c)}
                      onContextMenu={(e) => toggleFlag(e, r, c)}
                      className={`w-[22px] h-[22px] font-bold text-xs flex items-center justify-center ${
                        cell.isRevealed
                          ? 'bg-[#c0c0c0] border border-[#808080]'
                          : 'bg-[#c0c0c0] border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#808080] border-b-[#808080] active:border-none'
                      }`}
                    >
                      {cell.isRevealed ? (
                        cell.isMine ? (
                          '💣'
                        ) : cell.adjacentMines > 0 ? (
                          <span className={numColors[cell.adjacentMines]}>{cell.adjacentMines}</span>
                        ) : null
                      ) : cell.isFlagged ? (
                        '🚩'
                      ) : null}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. WINDOW: C:\PROJECTS (EXPLORER)                         */}
      {/* ========================================================= */}
      {windows.projects.isOpen && !windows.projects.isMinimized && (
        <div
          onClick={() => focusWindow('projects')}
          style={{
            zIndex: windows.projects.zIndex,
            left: `${windows.projects.x}px`,
            top: `${windows.projects.y}px`,
            width: `${windows.projects.w}px`,
            height: `${windows.projects.h}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="projects"
              icon="📁"
              title="C:\Projects (Abdul's Engineering Archive)"
              isActive={activeWindowId === 'projects'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            {/* Menu Bar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>V</u>iew</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            {/* Address Bar */}
            <div className="h-[24px] px-2 flex items-center space-x-2 text-[11px] bg-[#c0c0c0] border-b border-[#808080]">
              <span className="text-gray-700">Address:</span>
              <div className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] font-mono text-[11px]">
                C:\Projects\Production_Builds
              </div>
            </div>

            {/* Main Area: Split Left Tree + Right Icons */}
            <div className="flex-1 flex overflow-hidden p-1 gap-1">
              <div className="w-40 bg-white border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] p-2 overflow-y-auto text-[11px] space-y-1">
                <div className="font-bold text-[#000080]">📂 C:\Projects</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Automation</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Godot_Games</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">├── 📁 Web_Platforms</div>
                <div className="pl-3 text-gray-700 cursor-pointer hover:underline">└── 📁 Financial_Bots</div>
              </div>

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
      {/* 6. WINDOW: MS-DOS PROMPT                                  */}
      {/* ========================================================= */}
      {windows.dos.isOpen && !windows.dos.isMinimized && (
        <div
          onClick={() => focusWindow('dos')}
          style={{
            zIndex: windows.dos.zIndex,
            left: `${windows.dos.x}px`,
            top: `${windows.dos.y}px`,
            width: `${windows.dos.w}px`,
            height: `${windows.dos.h}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="dos"
              icon="💻"
              title="MS-DOS Prompt [wyacoomz@win98]"
              isActive={activeWindowId === 'dos'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            <div className="flex-1 bg-black p-3 text-white font-mono text-[12px] overflow-y-auto leading-relaxed border-t border-l border-t-black border-l-black">
              <div className="text-gray-400 mb-2">
                Mogrosoft(R) WINOWS98<br />
                (C)Copyright Mogrosoft Corp 1981-1998.<br />
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

            <form onSubmit={handleDosSubmit} className="bg-black px-3 py-1 flex items-center text-white font-mono text-[12px] border-t border-gray-800">
              <span className="text-[#39ff14] mr-2">C:\WINDOWS&gt;</span>
              <input
                type="text"
                value={dosInput}
                onChange={(e) => setDosInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                autoFocus
                placeholder="type dir, whoami, winamp, mines..."
              />
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. WINDOW: RESUME.DOC (WORDPAD)                           */}
      {/* ========================================================= */}
      {windows.resume.isOpen && !windows.resume.isMinimized && (
        <div
          onClick={() => focusWindow('resume')}
          style={{
            zIndex: windows.resume.zIndex,
            left: `${windows.resume.x}px`,
            top: `${windows.resume.y}px`,
            width: `${windows.resume.w}px`,
            height: `${windows.resume.h}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="resume"
              icon="📄"
              title="Resume.doc - WordPad"
              isActive={activeWindowId === 'resume'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

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
      {/* 8. WINDOW: OUTLOOK EXPRESS (CONTACT DISPATCH)             */}
      {/* ========================================================= */}
      {windows.contact.isOpen && !windows.contact.isMinimized && (
        <div
          onClick={() => focusWindow('contact')}
          style={{
            zIndex: windows.contact.zIndex,
            left: `${windows.contact.x}px`,
            top: `${windows.contact.y}px`,
            width: `${windows.contact.w}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="contact"
              icon="✉️"
              title="New Message - Outlook Express"
              isActive={activeWindowId === 'contact'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            <div className="h-[28px] px-2 flex items-center space-x-2 bg-[#c0c0c0] border-b border-[#808080]">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-2.5 py-0.5 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-black font-bold text-[11px] flex items-center space-x-1"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-[11px]">Dial-Up Connection Ready</span>
            </div>

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
                  defaultValue="Hello Abdul! Testing your MOGRO SOFT WINOWS98 Workstation"
                  className="flex-1 bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] text-[11px]"
                />
              </div>
            </div>

            <div className="p-2 bg-[#c0c0c0]">
              <textarea
                rows={5}
                defaultValue={`Hi Abdul,\n\nI was testing your 3D developer workstation. Really love the nostalgic Mogrosoft WINOWS98 aesthetic, the playable Minesweeper, and the relaxing Winamp lo-fi audio!\n\nBest regards,`}
                className="w-full bg-white p-2 border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] text-xs font-sans outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. WINDOW: DISPLAY PROPERTIES (WALLPAPER CHOOSER)         */}
      {/* ========================================================= */}
      {windows.display.isOpen && !windows.display.isMinimized && (
        <div
          onClick={() => focusWindow('display')}
          style={{
            zIndex: windows.display.zIndex,
            left: `${windows.display.x}px`,
            top: `${windows.display.y}px`,
            width: `${windows.display.w}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            {/* Titlebar with Drag Listener */}
            <Win98TitleBar
              id="display"
              icon="🖥️"
              title="Display Properties"
              isActive={activeWindowId === 'display'}
              onStartDrag={startDrag}
              onClose={closeWindow}
              showMinimize={false}
            />

            <div className="p-3 bg-[#c0c0c0] space-y-3">
              {/* Virtual Mini CRT Monitor Preview */}
              <div className="flex justify-center">
                <div className="w-40 h-28 bg-[#202020] border-4 border-[#dcdcdc] rounded-sm p-1 shadow-inner flex flex-col items-center justify-center">
                  <div
                    className="w-full h-full border border-black flex items-center justify-center text-[10px] text-white font-bold"
                    style={{
                      backgroundColor:
                        wallpaperTheme === 'teal' ? '#008080' :
                        wallpaperTheme === 'clouds' ? '#4d88e0' :
                        wallpaperTheme === 'twilight' ? '#4a2e48' : '#2872ba'
                    }}
                  >
                    {wallpaperTheme.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Wallpaper Picker List */}
              <div>
                <label className="font-bold text-[11px] block mb-1">Wallpaper:</label>
                <div className="bg-white border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] p-1 h-28 overflow-y-auto space-y-0.5">
                  {[
                    { id: 'teal', label: '(None) - Classic Teal 98' },
                    { id: 'clouds', label: 'WINOWS98 Clouds' },
                    { id: 'twilight', label: 'Twilight Mountain Ridge' },
                    { id: 'bliss', label: 'Windows Bliss Hill' }
                  ].map((w) => (
                    <div
                      key={w.id}
                      onClick={() => {
                        onPlayKeyClick();
                        setWallpaperTheme(w.id as any);
                      }}
                      className={`px-2 py-1 cursor-pointer text-[11px] ${
                        wallpaperTheme === w.id ? 'bg-[#000080] text-white' : 'hover:bg-gray-200'
                      }`}
                    >
                      {w.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-end space-x-2 pt-2 border-t border-[#808080]">
                <button
                  onClick={() => closeWindow('display')}
                  className="px-4 py-1 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] font-bold text-[11px]"
                >
                  OK
                </button>
                <button
                  onClick={() => closeWindow('display')}
                  className="px-4 py-1 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-[11px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9b. WINDOW: RECYCLE BIN (AUTHENTIC WIN98 EXPLORER)        */}
      {/* ========================================================= */}
      {windows.trash.isOpen && !windows.trash.isMinimized && (
        <div
          onClick={() => focusWindow('trash')}
          style={{
            zIndex: windows.trash.zIndex,
            left: `${windows.trash.x}px`,
            top: `${windows.trash.y}px`,
            width: `${windows.trash.w}px`,
            height: `${windows.trash.h}px`
          }}
          className="absolute bg-[#c0c0c0] shadow-2xl flex flex-col border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px]"
        >
          <div className="w-full h-full flex flex-col border-t border-l border-t-[#dfdfdf] border-l-[#dfdfdf] border-r border-b border-r-[#808080] border-b-[#808080]">
            <Win98TitleBar
              id="trash"
              icon="🗑️"
              title="Recycle Bin"
              isActive={activeWindowId === 'trash'}
              onStartDrag={startDrag}
              onMinimize={toggleMinimizeWindow}
              onClose={closeWindow}
            />

            {/* Menu Bar */}
            <div className="h-[20px] px-2 flex items-center space-x-3 text-[11px] text-black bg-[#c0c0c0] border-b border-[#808080]">
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>V</u>iew</span>
              <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
            </div>

            {/* Action Toolbar */}
            <div className="h-[28px] px-2 flex items-center justify-between bg-[#c0c0c0] border-b border-[#808080] text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-mono text-[10px]">Address</span>
                <div className="bg-white px-2 py-0.5 border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] font-mono text-[10px] w-40">
                  C:\RECYCLED
                </div>
              </div>
              <button
                onClick={() => {
                  onPlayKeyClick();
                  setRecycledItems([]);
                }}
                disabled={recycledItems.length === 0}
                className="px-2 py-0.5 bg-[#c0c0c0] hover:bg-[#d4d4d4] active:bg-[#a8a8a8] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-black text-[10px] font-bold cursor-pointer disabled:opacity-40"
              >
                Empty Recycle Bin
              </button>
            </div>

            {/* File List */}
            <div className="flex-1 bg-white p-2 overflow-y-auto text-black font-sans text-[11px] border-t-2 border-l-2 border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] m-1">
              {recycledItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 italic space-y-1">
                  <span className="text-2xl">🗑️</span>
                  <span>The Recycle Bin is empty.</span>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 text-[10px] text-gray-600">
                      <th className="pb-1 font-bold">Name</th>
                      <th className="pb-1 font-bold">Original Location</th>
                      <th className="pb-1 font-bold">Date Deleted</th>
                      <th className="pb-1 font-bold">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recycledItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#000080] hover:text-white cursor-pointer select-none">
                        <td className="py-1 flex items-center space-x-1">
                          <span>🗑️</span>
                          <span className="font-mono text-[10px]">{item.name}</span>
                        </td>
                        <td className="py-1 font-mono text-[10px]">{item.path}</td>
                        <td className="py-1 text-[10px]">{item.date}</td>
                        <td className="py-1 text-[10px] font-mono">{item.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Status Bar */}
            <div className="h-[20px] px-2 flex items-center justify-between text-[11px] text-[#404040] bg-[#c0c0c0] border-t border-[#ffffff]">
              <span>{recycledItems.length} object(s)</span>
              <span>{recycledItems.length > 0 ? '450 MB' : '0 bytes'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. DESKTOP RIGHT-CLICK CONTEXT MENU                      */}
      {/* ========================================================= */}
      {contextMenu && (
        <div
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          className="absolute z-50 w-44 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] shadow-xl py-1 text-[11px] text-black"
        >
          <div onClick={() => { focusWindow('about'); setContextMenu(null); }} className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer">About Me</div>
          <div onClick={() => { focusWindow('projects'); setContextMenu(null); }} className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer">Browse Projects</div>
          <div onClick={() => { focusWindow('minesweeper'); setContextMenu(null); }} className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer">Play Minesweeper</div>
          <div onClick={() => { toggleWinampPlay(); setContextMenu(null); }} className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer">
            {winampPlaying ? 'Pause Lo-Fi Music' : 'Play Lo-Fi Music'}
          </div>
          <div className="border-t border-[#808080] my-1 mx-1" />
          <div onClick={() => { focusWindow('display'); setContextMenu(null); }} className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer font-bold">Properties (Wallpaper)</div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. WINDOWS 98 START MENU FLYOUT                          */}
      {/* ========================================================= */}
      {startOpen && (
        <div
          ref={startMenuRef}
          className="absolute bottom-9 left-0 z-50 w-52 bg-[#c0c0c0] shadow-2xl flex border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000]"
        >
          {/* Vertical Blue Banner: MOGRO SOFT WINOWS98 */}
          <div className="w-8 bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center pb-2 select-none">
            <span className="transform -rotate-90 origin-bottom-left text-white font-bold tracking-widest text-[12px] whitespace-nowrap mb-6 ml-3.5">
              Mogrosoft <span className="font-black text-cyan-200">WINOWS98</span>
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
              onClick={() => { focusWindow('minesweeper'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>💣</span>
              <span><u>M</u>inesweeper.exe</span>
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

            <div
              onClick={() => { focusWindow('display'); setStartOpen(false); }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>🖥️</span>
              <span><u>D</u>isplay Properties</span>
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
                onPlayKeyClick();
                setShowShutDownDialog(true);
                setStartOpen(false);
              }}
              className="px-3 py-1.5 flex items-center space-x-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <span>🔌</span>
              <span><u>S</u>hut Down WINOWS98...</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. AUTHENTIC WINDOWS 98 TASKBAR                          */}
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

      {/* ========================================================= */}
      {/* AUTHENTIC SHUT DOWN DIALOG (WINOWS98)                     */}
      {/* ========================================================= */}
      {showShutDownDialog && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-[340px] bg-[#c0c0c0] border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#000000] border-b-[#000000] p-[2px] shadow-2xl">
            <div className="w-full flex flex-col border border-[#808080]">
              {/* Titlebar */}
              <div className="h-[22px] px-2 bg-gradient-to-r from-[#000080] to-[#1084d0] flex items-center justify-between text-white font-bold text-[12px] select-none">
                <span>Shut Down WINOWS98</span>
                <button
                  onClick={() => setShowShutDownDialog(false)}
                  className="w-4 h-3.5 bg-[#c0c0c0] hover:bg-[#d8d8d8] text-black font-bold flex items-center justify-center border border-t-white border-l-white border-r-black border-b-black text-[10px]"
                >
                  ✕
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">💻</div>
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-black">What do you want the computer to do?</p>
                    <div className="space-y-1 text-[11px]">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shutdownAction"
                          checked={shutDownAction === 'shutdown'}
                          onChange={() => setShutDownAction('shutdown')}
                          className="cursor-pointer"
                        />
                        <span><u>S</u>hut down and close laptop</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shutdownAction"
                          checked={shutDownAction === 'restart'}
                          onChange={() => setShutDownAction('restart')}
                          className="cursor-pointer"
                        />
                        <span><u>R</u>estart WINOWS98</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Dialog Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#808080]">
                  <button
                    onClick={() => {
                      onPlayKeyClick();
                      setShowShutDownDialog(false);
                      if (shutDownAction === 'shutdown') {
                        Object.keys(windows).forEach((wId) => closeWindow(wId));
                        if (onCloseLaptop) onCloseLaptop();
                      } else {
                        window.location.reload();
                      }
                    }}
                    className="w-18 py-1 bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] font-bold text-xs"
                  >
                    OK
                  </button>
                  <button
                    onClick={() => {
                      onPlayKeyClick();
                      setShowShutDownDialog(false);
                    }}
                    className="w-18 py-1 bg-[#c0c0c0] hover:bg-[#d8d8d8] active:bg-[#a8a8a8] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#000000] border-b-[#000000] text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
