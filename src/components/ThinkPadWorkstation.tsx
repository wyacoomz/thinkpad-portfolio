import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ZoomIn, ZoomOut, RotateCcw, Lightbulb, Terminal, Play, 
  Volume2, VolumeX, Maximize2, Minimize2, Sparkles, Compass, ArrowLeft, Info
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ThinkPadWorkstationProps {
  onNavigateToSection?: (sectionId: string) => void;
}

// ============================================================================
// TACTILE MECHANICAL KEYBOARD AUDIO SYNTHESIZER (WEB AUDIO API)
// ============================================================================
class TacticalAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Authentic Mechanical Keyboard Click + Deep Body Thock
  public playKeyClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // High snap click
      const snap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snap.type = 'triangle';
      snap.frequency.setValueAtTime(1900 + (Math.random() - 0.5) * 300, t);
      snap.frequency.exponentialRampToValueAtTime(140, t + 0.022);
      snapGain.gain.setValueAtTime(0.09, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.025);

      // Low tactile thock
      const thock = this.ctx.createOscillator();
      const thockGain = this.ctx.createGain();
      thock.type = 'sine';
      thock.frequency.setValueAtTime(240 + (Math.random() - 0.5) * 40, t);
      thock.frequency.exponentialRampToValueAtTime(55, t + 0.038);
      thockGain.gain.setValueAtTime(0.14, t);
      thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.038);
      thock.connect(thockGain);
      thockGain.connect(this.ctx.destination);
      thock.start(t);
      thock.stop(t + 0.04);
    } catch {}
  }

  // Soft lamp toggle click
  public playSwitchClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.035);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch {}
  }
}

const audioEngine = new TacticalAudioEngine();

// ============================================================================
// HIGH-RESOLUTION PROCEDURAL TEXTURES FOR REALISTIC WORKSTATION
// ============================================================================

// 1. Procedural Walnut Wood Grain Texture for Architect Desk
function generateWalnutWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Warm rich walnut wood gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 2048);
  grad.addColorStop(0, '#2b1b13');
  grad.addColorStop(0.5, '#3d281d');
  grad.addColorStop(1, '#24160f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 2048);

  // Organic wood grain rings and streaks
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 480; i++) {
    const y = i * 4.3;
    const waveFreq = 0.003 + Math.sin(i * 0.02) * 0.0015;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 2048; x += 16) {
      const offset = Math.sin(x * waveFreq) * 18 + Math.cos(x * 0.008) * 6;
      ctx.lineTo(x, y + offset);
    }
    ctx.strokeStyle = i % 2 === 0 ? '#180e08' : '#523827';
    ctx.lineWidth = 1.5 + Math.sin(i * 0.1) * 1.0;
    ctx.stroke();
  }

  // Fine wood pores / satin specks
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#100a06';
  for (let s = 0; s < 22000; s++) {
    const rx = Math.random() * 2048;
    const ry = Math.random() * 2048;
    ctx.fillRect(rx, ry, Math.random() * 4 + 1, 1);
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 2. Stitched Forest Leather Desk Mat Texture
function generateDeskMatTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d')!;

  // Deep forest charcoal leather
  ctx.fillStyle = '#18241f';
  ctx.fillRect(0, 0, 2048, 1200);

  // Subtle leather micro-grain
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 24000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(Math.random() * 2048, Math.random() * 1200, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  // Stitched Perimeter Border in muted gold/cream
  const pad = 42;
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 4;
  ctx.setLineDash([16, 12]);
  ctx.strokeRect(pad, pad, 2048 - pad * 2, 1200 - pad * 2);

  // Inner debossed groove
  ctx.setLineDash([]);
  ctx.strokeStyle = '#101714';
  ctx.lineWidth = 3;
  ctx.strokeRect(pad + 12, pad + 12, 2048 - (pad + 12) * 2, 1200 - (pad + 12) * 2);

  return new THREE.CanvasTexture(canvas);
}

// 3. Ultra-Detailed Keyboard Well Texture with Real Printed Key Legends
function generateKeyboardDeckTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark matte chassis base
  ctx.fillStyle = '#131315';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Recessed keyboard well with inner shadow
  const wellX = 140;
  const wellY = 70;
  const wellW = 1768;
  const wellH = 880;

  ctx.fillStyle = '#0b0c0e';
  ctx.fillRect(wellX, wellY, wellW, wellH);

  // Speaker Grilles on Left and Right of Keyboard Well (Perforated acoustic holes)
  const drawSpeakerGrille = (startX: number, startY: number, w: number, h: number) => {
    ctx.fillStyle = '#1e1e22';
    for (let x = startX; x < startX + w; x += 10) {
      for (let y = startY; y < startY + h; y += 10) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
  drawSpeakerGrille(45, 90, 65, 840);
  drawSpeakerGrille(1938, 90, 65, 840);

  // Power Button (Top Right of well)
  const pwrX = 1820;
  const pwrY = 38;
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 16, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1e';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#22c55e'; // Green glowing ring
  ctx.stroke();

  // Power icon in center
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 9, -Math.PI / 3, Math.PI * 1.33);
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pwrX, pwrY - 12);
  ctx.lineTo(pwrX, pwrY - 3);
  ctx.stroke();

  // Draw 6 Rows of Realistic ThinkPad Keys with Dish Tops & Legends
  const rows = [
    // Row 0: Function Keys
    [
      { label: 'Esc', sub: 'FnLock', w: 98 },
      { label: 'F1', sub: '🔇', w: 86 },
      { label: 'F2', sub: '🔉', w: 86 },
      { label: 'F3', sub: '🔊', w: 86 },
      { label: 'F4', sub: '🎙️', w: 86 },
      { label: 'F5', sub: '☼-', w: 86 },
      { label: 'F6', sub: '☼+', w: 86 },
      { label: 'F7', sub: '🖵', w: 86 },
      { label: 'F8', sub: '✈', w: 86 },
      { label: 'F9', sub: '⚙', w: 86 },
      { label: 'F10', sub: '🔍', w: 86 },
      { label: 'F11', sub: '⭐', w: 86 },
      { label: 'F12', sub: '🖩', w: 86 },
      { label: 'Home', sub: '', w: 86 },
      { label: 'End', sub: '', w: 86 },
      { label: 'Insert', sub: '', w: 86 },
      { label: 'Delete', sub: '', w: 98 }
    ],
    // Row 1: Numbers
    [
      { label: '~ `', sub: '', w: 98 },
      { label: '! 1', sub: '', w: 104 },
      { label: '@ 2', sub: '', w: 104 },
      { label: '# 3', sub: '', w: 104 },
      { label: '$ 4', sub: '', w: 104 },
      { label: '% 5', sub: '', w: 104 },
      { label: '^ 6', sub: '', w: 104 },
      { label: '& 7', sub: '', w: 104 },
      { label: '* 8', sub: '', w: 104 },
      { label: '( 9', sub: '', w: 104 },
      { label: ') 0', sub: '', w: 104 },
      { label: '_ -', sub: '', w: 104 },
      { label: '+ =', sub: '', w: 104 },
      { label: 'Backspace ⌫', sub: '', w: 188 }
    ],
    // Row 2: QWERTY
    [
      { label: 'Tab ⇥', sub: '', w: 138 },
      { label: 'Q', sub: '', w: 104 },
      { label: 'W', sub: '', w: 104 },
      { label: 'E', sub: '', w: 104 },
      { label: 'R', sub: '', w: 104 },
      { label: 'T', sub: '', w: 104 },
      { label: 'Y', sub: '', w: 104 },
      { label: 'U', sub: '', w: 104 },
      { label: 'I', sub: '', w: 104 },
      { label: 'O', sub: '', w: 104 },
      { label: 'P', sub: '', w: 104 },
      { label: '{ [', sub: '', w: 104 },
      { label: '} ]', sub: '', w: 104 },
      { label: '| \\', sub: '', w: 148 }
    ],
    // Row 3: Home Row (with TrackPoint cutouts for G & H)
    [
      { label: 'CapsLock [•]', sub: '', w: 168 },
      { label: 'A', sub: '', w: 104 },
      { label: 'S', sub: '', w: 104 },
      { label: 'D', sub: '', w: 104 },
      { label: 'F', sub: '', w: 104 },
      { label: 'G', sub: '', w: 104, tp: 'right' },
      { label: 'H', sub: '', w: 104, tp: 'left' },
      { label: 'J', sub: '', w: 104 },
      { label: 'K', sub: '', w: 104 },
      { label: 'L', sub: '', w: 104 },
      { label: ': ;', sub: '', w: 104 },
      { label: '" \'', sub: '', w: 104 },
      { label: 'Enter ↵', sub: '', w: 204 }
    ],
    // Row 4: Shift Row (with TrackPoint cutout for B)
    [
      { label: 'Shift ⇧', sub: '', w: 218 },
      { label: 'Z', sub: '', w: 104 },
      { label: 'X', sub: '', w: 104 },
      { label: 'C', sub: '', w: 104 },
      { label: 'V', sub: '', w: 104 },
      { label: 'B', sub: '', w: 104, tp: 'top' },
      { label: 'N', sub: '', w: 104 },
      { label: 'M', sub: '', w: 104 },
      { label: '< ,', sub: '', w: 104 },
      { label: '> .', sub: '', w: 104 },
      { label: '? /', sub: '', w: 104 },
      { label: 'Shift ⇧', sub: '', w: 248 }
    ],
    // Row 5: Modifier / Spacebar Row
    [
      { label: 'Fn', sub: '', w: 108 },
      { label: 'Ctrl', sub: '', w: 108 },
      { label: 'Win ❖', sub: '', w: 108 },
      { label: 'Alt', sub: '', w: 108 },
      { label: '              Spacebar              ', sub: '', w: 588 },
      { label: 'AltGr', sub: '', w: 108 },
      { label: 'PrtSc', sub: '', w: 108 },
      { label: 'Ctrl', sub: '', w: 108 },
      { label: '◄', sub: '', w: 86 },
      { label: '▲ ▼', sub: '', w: 86 },
      { label: '►', sub: '', w: 86 }
    ]
  ];

  const rowY = [90, 205, 345, 485, 625, 765];
  const rowH = [95, 120, 120, 120, 120, 130];

  rows.forEach((row, rIdx) => {
    let currX = wellX + 16;
    const y = rowY[rIdx];
    const h = rowH[rIdx];

    row.forEach((key) => {
      const w = key.w;

      // Keycap Bevel Gradient
      const keyGrad = ctx.createLinearGradient(currX, y, currX, y + h);
      keyGrad.addColorStop(0, '#23252a');
      keyGrad.addColorStop(0.3, '#1c1d21');
      keyGrad.addColorStop(1, '#141517');
      ctx.fillStyle = keyGrad;

      // Rounded Keycap
      ctx.beginPath();
      ctx.roundRect(currX, y, w, h, 8);
      ctx.fill();

      // Concave dish inner border
      ctx.strokeStyle = '#2b2d33';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Authentic TrackPoint scalloped cutout notches
      if (key.tp === 'right') {
        ctx.beginPath();
        ctx.arc(currX + w, y + h / 2, 22, Math.PI / 2, -Math.PI / 2);
        ctx.fillStyle = '#0b0c0e';
        ctx.fill();
      } else if (key.tp === 'left') {
        ctx.beginPath();
        ctx.arc(currX, y + h / 2, 22, -Math.PI / 2, Math.PI / 2);
        ctx.fillStyle = '#0b0c0e';
        ctx.fill();
      } else if (key.tp === 'top') {
        ctx.beginPath();
        ctx.arc(currX + w / 2, y, 22, 0, Math.PI);
        ctx.fillStyle = '#0b0c0e';
        ctx.fill();
      }

      // Key Legends
      ctx.font = rIdx === 0 ? 'bold 18px "JetBrains Mono", monospace' : 'bold 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#f3f4f6';
      ctx.textAlign = 'center';
      ctx.fillText(key.label, currX + w / 2, y + h / 2 + 7);

      // Sub-label (Function icons / FnLock)
      if (key.sub) {
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8'; // Cyan secondary legend
        ctx.fillText(key.sub, currX + w / 2, y + 26);
      }

      ctx.textAlign = 'left';
      currX += w + 8;
    });
  });

  return new THREE.CanvasTexture(canvas);
}

// 4. ThinkPad Palmrest Badge Texture (45-degree angled logo with red LED "i" dot)
function generateThinkPadBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 256);

  ctx.save();
  ctx.translate(256, 128);
  ctx.rotate(-Math.PI / 4);

  // ThinkPad Silver Metallic Text
  ctx.font = 'bold 58px "Newsreader", serif';
  ctx.fillStyle = '#f1f1ee';
  ctx.fillText('Think', -120, 0);

  ctx.font = '300 58px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('Pad', 14, 0);

  // Glowing Red Dot on the "i" in Think
  ctx.beginPath();
  ctx.arc(-80, -42, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ff2233';
  ctx.shadowBlur = 18;
  ctx.fill();

  ctx.restore();

  return new THREE.CanvasTexture(canvas);
}

// 5. Intel Core Badge Texture
function generateIntelBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 200;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0058a3';
  ctx.beginPath();
  ctx.roundRect(0, 0, 256, 200, 12);
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('intel', 30, 80);

  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CORE i7', 30, 140);

  return new THREE.CanvasTexture(canvas);
}

// 6. Detailed Side I/O Ports Texture (Thunderbolt 4, HDMI, USB-A, Audio, Vents)
function generateSidePortsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#141416';
  ctx.fillRect(0, 0, 2048, 256);

  // Left Section: Dual Thunderbolt 4 / USB-C Ports
  const drawUsbC = (x: number) => {
    ctx.fillStyle = '#08080a';
    ctx.beginPath();
    ctx.roundRect(x, 90, 110, 50, 24);
    ctx.fill();
    ctx.strokeStyle = '#4a4d52';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Metallic center tongue
    ctx.fillStyle = '#7a7e85';
    ctx.fillRect(x + 28, 108, 54, 14);

    // Lightning bolt badge above port
    ctx.fillStyle = '#a3a8b0';
    ctx.font = '22px sans-serif';
    ctx.fillText('⚡', x + 42, 68);
  };
  drawUsbC(220);
  drawUsbC(400);

  // HDMI 2.1 Trapezoid Port
  const hx = 640;
  ctx.fillStyle = '#08080a';
  ctx.beginPath();
  ctx.moveTo(hx, 140);
  ctx.lineTo(hx + 140, 140);
  ctx.lineTo(hx + 130, 90);
  ctx.lineTo(hx + 10, 90);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a4d52';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#a3a8b0';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('HDMI', hx + 48, 68);

  // USB-A 3.2 Port with Blue SS Tongue
  const ux = 880;
  ctx.fillStyle = '#08080a';
  ctx.fillRect(ux, 90, 130, 60);
  ctx.strokeStyle = '#4a4d52';
  ctx.lineWidth = 3;
  ctx.strokeRect(ux, 90, 130, 60);
  ctx.fillStyle = '#0072ce'; // SuperSpeed Blue tongue
  ctx.fillRect(ux + 15, 122, 100, 22);
  ctx.fillStyle = '#a3a8b0';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('SS ⸂⸃', ux + 42, 68);

  // 3.5mm Gold Audio Headphone Jack
  const ax = 1120;
  ctx.beginPath();
  ctx.arc(ax, 120, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0c';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#d4af37'; // Gold contact ring
  ctx.stroke();

  // Cooling Exhaust Vents with Copper Fin Details
  const ventX = 1320;
  for (let v = 0; v < 36; v++) {
    const vx = ventX + v * 18;
    ctx.fillStyle = '#08080a';
    ctx.fillRect(vx, 70, 10, 110);
    // Copper heatsink visible through slats
    ctx.fillStyle = '#b87333';
    ctx.fillRect(vx + 2, 85, 6, 80);
  }

  return new THREE.CanvasTexture(canvas);
}

// 7. Screen Bezel Texture with ThinkShutter & Dual Beam-Forming Microphones
function generateBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1400;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#141416';
  ctx.fillRect(0, 0, 2048, 1400);

  // Top Webcam Module Assembly
  const camX = 1024;
  const camY = 48;

  // Dual stereo microphone pinholes
  ctx.fillStyle = '#050506';
  ctx.beginPath();
  ctx.arc(camX - 60, camY, 3.5, 0, Math.PI * 2);
  ctx.arc(camX + 60, camY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Webcam glass lens
  ctx.beginPath();
  ctx.arc(camX, camY, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#080b10';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#2b313a';
  ctx.stroke();

  // Blue glass reflection
  ctx.beginPath();
  ctx.arc(camX - 3, camY - 3, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.globalAlpha = 0.5;
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // ThinkShutter Red Physical Slider Dot
  ctx.beginPath();
  ctx.arc(camX + 22, camY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.fill();

  // Lenovo Logo on lower left bezel
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('Lenovo', 80, 1360);

  return new THREE.CanvasTexture(canvas);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const ThinkPadWorkstation: React.FC<ThinkPadWorkstationProps> = ({ onNavigateToSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'terminal' | 'pipeline' | 'projects' | 'notes' | 'resume'>('terminal');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Initial terminal history
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([
    {
      command: 'whoami',
      output: [
        'Abdul Samad Khan (wyacoomz)',
        'RPA & Enterprise Automation Developer @ Trufe',
        'Specializing in Power Automate, Python, D365, React & SQL Server',
        'B.Tech AI & Data Science • Bhopal, India (IST UTC +05:30)',
        'Type "help" or click quick commands below to explore.'
      ]
    }
  ]);

  // Three.js State Cache in ref
  const stateRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    controls: OrbitControls | null;
    deskLampLight: THREE.SpotLight | null;
    screenGlowLight: THREE.PointLight | null;
    screenMesh: THREE.Mesh | null;
    screenCanvas: HTMLCanvasElement | null;
    screenContext: CanvasRenderingContext2D | null;
    screenTexture: THREE.CanvasTexture | null;
    cameraTarget: { pos: THREE.Vector3; look: THREE.Vector3 } | null;
    activeTab: 'terminal' | 'pipeline' | 'projects' | 'notes' | 'resume';
    terminalHistory: Array<{ command: string; output: string[] }>;
    terminalInput: string;
    pipelineRunning: boolean;
    pipelineStep: number;
    cursorVisible: boolean;
    animFrameId: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    deskLampLight: null,
    screenGlowLight: null,
    screenMesh: null,
    screenCanvas: null,
    screenContext: null,
    screenTexture: null,
    cameraTarget: null,
    activeTab: 'terminal',
    terminalHistory,
    terminalInput: '',
    pipelineRunning: false,
    pipelineStep: 0,
    cursorVisible: true,
    animFrameId: 0
  });

  // Keep stateRef synchronized
  useEffect(() => {
    stateRef.current.activeTab = activeTab;
    stateRef.current.terminalHistory = terminalHistory;
    stateRef.current.terminalInput = terminalInput;
    stateRef.current.pipelineRunning = pipelineRunning;
    stateRef.current.pipelineStep = pipelineStep;
  }, [activeTab, terminalHistory, terminalInput, pipelineRunning, pipelineStep]);

  // Terminal command executor
  const executeCommand = useCallback((rawCmd: string) => {
    audioEngine.playKeyClick();
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: string[] = [];

    switch (cmd) {
      case 'help':
        output = [
          'Available Commands:',
          '  whoami       - Print developer background and profile',
          '  projects     - List flagship and production systems',
          '  pipeline     - Show Dynamics 365 5-entity invoice architecture',
          '  skills       - Show core technical toolchain',
          '  leetcode     - View algorithmic problem-solving metrics',
          '  resume       - View resume credentials & download info',
          '  contact      - Show direct contact channels',
          '  clear        - Clear terminal history'
        ];
        break;

      case 'whoami':
        output = [
          'Abdul Samad Khan (wyacoomz)',
          'RPA & Enterprise Automation Developer @ Trufe',
          'Location: Bhopal, Madhya Pradesh, India (IST UTC +05:30)',
          'Education: B.Tech in Artificial Intelligence & Data Science'
        ];
        break;

      case 'projects':
        output = [
          'Production Systems Portfolio:',
          '  № 01 Maristo AI Invoice & Dynamics 365 Bulk Uploader (5 Entities)',
          '  № 02 Multi-Bank Financial Reporting (SNB & Al Rajhi Portals)',
          '  № 03 Full-Stack E-Commerce Platform (MERN Stack)',
          '  № 04 Cash-Flow Reconciliation Engine (SQL Server & Pandas)',
          '  № 05 Customer Data Normalization (Keyloop DMS)',
          '  № 06 Autonomous Email-to-Database Bot',
          '  № 07 Job-Sky Recruitment Marketplace'
        ];
        break;

      case 'pipeline':
        setActiveTab('pipeline');
        output = ['Switched display to 5-Entity Dynamics 365 Automation Pipeline Visualizer.'];
        break;

      case 'skills':
        output = [
          'Core Technical Toolchain:',
          '  • Enterprise RPA: Power Automate Cloud, Power Automate Desktop, Dynamics 365',
          '  • Document AI: AI Builder OCR, Confidence Gates, Outlook Adaptive Cards',
          '  • Full-Stack: React 18, TypeScript, Node.js, Express, Redux Toolkit',
          '  • Database & Systems: Microsoft SQL Server, MongoDB, OpenPyXL, Pandas'
        ];
        break;

      case 'leetcode':
        output = [
          'LeetCode Benchmark: 150+ Solved',
          'Focus: Graph algorithms, Dynamic Programming, Heap/Priority Queues, Trees.',
          'Profile: https://leetcode.com/u/wyacoomz/'
        ];
        break;

      case 'resume':
        output = [
          'Credentials & Resume:',
          '  • Degree: B.Tech in AI & Data Science (Oriental Institute of Science & Technology)',
          '  • Role: RPA Developer @ Trufe (2025–Present)',
          '  • Former: React Native Intern @ Skyinfo-group (2025)',
          '  • File: Abdul_Samad_Khan_Resume.pdf available via the top left link.'
        ];
        break;

      case 'contact':
        output = [
          'Contact Channels:',
          '  • Email: abdulischad@gmail.com',
          '  • LinkedIn: linkedin.com/in/abdul-samad-khan-b22346268',
          '  • GitHub: github.com/wyacoomz',
          '  • Timezone: IST (UTC +05:30) • Bhopal, India'
        ];
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      default:
        output = [`zsh: command not found: ${rawCmd}. Type "help" for a list of commands.`];
        break;
    }

    setTerminalHistory(prev => [...prev.slice(-8), { command: rawCmd, output }]);
    setTerminalInput('');
  }, []);

  // Run pipeline simulation timer
  const runPipelineSimulation = useCallback(() => {
    audioEngine.playKeyClick();
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStep(1);

    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineStep(step);
        audioEngine.playKeyClick();
        if (step === 5) {
          setTimeout(() => {
            setPipelineRunning(false);
          }, 1400);
        }
      }, (idx + 1) * 900);
    });
  }, [pipelineRunning]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c0b);
    stateRef.current.scene = scene;

    // 2. Camera: Balanced 3/4 Perspective to showcase the desk environment and laptop
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0.35, 2.4, 3.8);
    camera.lookAt(0, 0.45, 0);
    stateRef.current.camera = camera;

    // 3. WebGL Renderer with High-Performance Tone Mapping & PCF Soft Shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera from passing through desk
    controls.minDistance = 1.6;
    controls.maxDistance = 7.0;
    controls.target.set(0, 0.45, 0);
    stateRef.current.controls = controls;

    // 5. Lighting Environment (Warm Studio Lighting + Screen Glow)
    // (A) Ambient Light
    const ambientLight = new THREE.AmbientLight(0x383e3b, 1.3);
    scene.add(ambientLight);

    // (B) Key Light from front-right (illuminates chassis, keycaps, and desk)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.6);
    keyLight.position.set(2.8, 3.8, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // (C) Architect Desk Lamp Spotlight (Warm Incandescent 2800K)
    const deskLampSpot = new THREE.SpotLight(0xffe2b8, 4.8);
    deskLampSpot.position.set(-2.2, 2.8, 0.6);
    deskLampSpot.target.position.set(0, 0.15, 0.2);
    deskLampSpot.angle = 0.70;
    deskLampSpot.penumbra = 0.65;
    deskLampSpot.decay = 1.8;
    deskLampSpot.distance = 12;
    deskLampSpot.castShadow = true;
    deskLampSpot.shadow.mapSize.width = 2048;
    deskLampSpot.shadow.mapSize.height = 2048;
    deskLampSpot.shadow.bias = -0.0001;
    scene.add(deskLampSpot);
    scene.add(deskLampSpot.target);
    stateRef.current.deskLampLight = deskLampSpot;

    // (D) Screen Glow PointLight (Illuminates Keyboard Deck with soft terminal green glow)
    const screenGlowLight = new THREE.PointLight(0x34d399, 0.9, 2.5);
    screenGlowLight.position.set(0, 1.25, -0.9);
    scene.add(screenGlowLight);
    stateRef.current.screenGlowLight = screenGlowLight;

    // (E) Red LED on ThinkPad Logo Palmrest
    const trackPointLed = new THREE.PointLight(0xff2233, 0.6, 0.25);
    trackPointLed.position.set(1.18, 0.17, 0.88);
    scene.add(trackPointLed);

    // 6. Textures
    const walnutWoodTex = generateWalnutWoodTexture();
    const deskMatTex = generateDeskMatTexture();
    const keyboardDeckTex = generateKeyboardDeckTexture();
    const thinkpadBadgeTex = generateThinkPadBadgeTexture();
    const intelBadgeTex = generateIntelBadgeTexture();
    const sidePortsTex = generateSidePortsTexture();
    const bezelTex = generateBezelTexture();

    // 7. Materials with Authentic PBR Properties
    // Walnut Desk Wood
    const walnutWoodMat = new THREE.MeshStandardMaterial({
      map: walnutWoodTex,
      roughness: 0.62,
      metalness: 0.05
    });

    // Forest Leather Desk Mat
    const deskMatMaterial = new THREE.MeshStandardMaterial({
      map: deskMatTex,
      roughness: 0.75,
      metalness: 0.02
    });

    // ThinkPad Raven Black Chassis ("Soft-Touch" Matte Carbon-Fiber Magnesium)
    const thinkpadChassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x161619,
      roughness: 0.42,
      metalness: 0.12,
      clearcoat: 0.08,
      clearcoatRoughness: 0.5
    });

    // Keyboard Deck Plane Material
    const keyboardDeckMat = new THREE.MeshStandardMaterial({
      map: keyboardDeckTex,
      roughness: 0.38,
      metalness: 0.10
    });

    // ThinkPad Badge Material
    const thinkpadBadgeMat = new THREE.MeshBasicMaterial({
      map: thinkpadBadgeTex,
      transparent: true,
      toneMapped: false
    });

    // Intel Badge Material
    const intelBadgeMat = new THREE.MeshBasicMaterial({
      map: intelBadgeTex,
      transparent: true
    });

    const sidePortsMat = new THREE.MeshStandardMaterial({
      map: sidePortsTex,
      roughness: 0.4,
      metalness: 0.5
    });

    const bezelMat = new THREE.MeshStandardMaterial({
      map: bezelTex,
      roughness: 0.65
    });

    // Iconic ThinkPad Red (TrackPoint Nub & Accent Stripes)
    const trackPointRedMat = new THREE.MeshStandardMaterial({
      color: 0xdf1a2d,
      roughness: 0.35,
      metalness: 0.08,
      emissive: 0x3d070c,
      emissiveIntensity: 0.3
    });

    // Tactile Blue Scroll Button Material
    const scrollBlueMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      metalness: 0.1
    });

    // Brushed Stainless Steel for Drop Hinges
    const hingeSteelMat = new THREE.MeshStandardMaterial({
      color: 0x8a8d91,
      roughness: 0.22,
      metalness: 0.9
    });

    const lampMetalMat = new THREE.MeshStandardMaterial({
      color: 0x264233,
      roughness: 0.35,
      metalness: 0.6
    });

    const brassAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85
    });

    const porcelainMugMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbfbf9,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const coffeeLiquidMat = new THREE.MeshStandardMaterial({
      color: 0x1e1008,
      roughness: 0.05,
      metalness: 0.1
    });

    // 8. Architectural Studio Environment
    // (A) Ground / Walnut Desk
    const deskGeo = new THREE.BoxGeometry(18, 0.8, 12);
    const deskMesh = new THREE.Mesh(deskGeo, walnutWoodMat);
    deskMesh.position.set(0, -0.4, 0);
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);

    // (B) Studio Back Wall (Gives deep architectural atmosphere behind desk)
    const wallGeo = new THREE.PlaneGeometry(24, 14);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x141816, roughness: 0.85 });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 4.0, -5.5);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // Leather Architect Desk Mat
    const matGeo = new THREE.BoxGeometry(6.6, 0.02, 3.9);
    const matMesh = new THREE.Mesh(matGeo, deskMatMaterial);
    matMesh.position.set(0, 0.01, 0);
    matMesh.receiveShadow = true;
    scene.add(matMesh);

    // 9. Detailed ThinkPad Laptop Construction
    const thinkpadGroup = new THREE.Group();
    scene.add(thinkpadGroup);

    // (A) ThinkPad Base Unit with Authentic Wedge Profile
    const baseW = 3.32;
    const baseD = 2.30;
    const baseH = 0.12;

    const baseGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const baseMesh = new THREE.Mesh(baseGeo, thinkpadChassisMat);
    baseMesh.position.set(0, 0.08, 0.1);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    thinkpadGroup.add(baseMesh);

    // Underside 4 Textured Rubber Feet
    const footGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.9 });
    const footPositions = [
      [-1.45, 0.012, -0.85],
      [1.45, 0.012, -0.85],
      [-1.45, 0.012, 1.05],
      [1.45, 0.012, 1.05]
    ];
    footPositions.forEach(([fx, fy, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, fy, fz);
      thinkpadGroup.add(foot);
    });

    // (B) Left & Right Side I/O Ports Panels
    const sidePortsGeo = new THREE.PlaneGeometry(baseD - 0.2, 0.09);

    const leftPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    leftPortsMesh.position.set(-baseW / 2 - 0.002, 0.08, 0.1);
    leftPortsMesh.rotation.y = -Math.PI / 2;
    thinkpadGroup.add(leftPortsMesh);

    const rightPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    rightPortsMesh.position.set(baseW / 2 + 0.002, 0.08, 0.1);
    rightPortsMesh.rotation.y = Math.PI / 2;
    thinkpadGroup.add(rightPortsMesh);

    // (C) Keyboard Well with Printed Keycaps Deck
    const wellW = 3.12;
    const wellD = 1.30;
    const keyboardPlaneGeo = new THREE.PlaneGeometry(wellW, wellD);
    const keyboardMesh = new THREE.Mesh(keyboardPlaneGeo, keyboardDeckMat);
    keyboardMesh.position.set(0, 0.142, -0.32);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.receiveShadow = true;
    thinkpadGroup.add(keyboardMesh);

    // (D) PHYSICAL 3D KNURLED TRACKPOINT NUB!
    const trackPointGroup = new THREE.Group();
    trackPointGroup.position.set(0, 0.165, -0.23);
    thinkpadGroup.add(trackPointGroup);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.045, 12);
    const stemMesh = new THREE.Mesh(stemGeo, hingeSteelMat);
    stemMesh.position.set(0, 0.02, 0);
    trackPointGroup.add(stemMesh);

    // Knurled Dome Cap in Iconic Matte ThinkPad Red
    const domeGeo = new THREE.CylinderGeometry(0.062, 0.052, 0.035, 24);
    const domeMesh = new THREE.Mesh(domeGeo, trackPointRedMat);
    domeMesh.position.set(0, 0.045, 0);
    domeMesh.castShadow = true;
    trackPointGroup.add(domeMesh);

    // Convex Spherical Nub Top
    const topCapGeo = new THREE.SphereGeometry(0.060, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topCapMesh = new THREE.Mesh(topCapGeo, trackPointRedMat);
    topCapMesh.position.set(0, 0.06, 0);
    trackPointGroup.add(topCapMesh);

    // (E) Three Physical 3D TrackPoint Buttons!
    const btnGroup = new THREE.Group();
    btnGroup.position.set(0, 0.155, 0.38);
    thinkpadGroup.add(btnGroup);

    const keycapMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.08 });

    // Left Click Button
    const leftBtnGeo = new THREE.BoxGeometry(0.44, 0.025, 0.18);
    const leftBtn = new THREE.Mesh(leftBtnGeo, keycapMat);
    leftBtn.position.set(-0.48, 0, 0);
    leftBtn.castShadow = true;
    btnGroup.add(leftBtn);

    // Left Red Stripe
    const redStripeGeo = new THREE.BoxGeometry(0.40, 0.006, 0.022);
    const leftStripe = new THREE.Mesh(redStripeGeo, trackPointRedMat);
    leftStripe.position.set(-0.48, 0.013, -0.065);
    btnGroup.add(leftStripe);

    // Center Scroll Button with Blue Stripe
    const centerBtnGeo = new THREE.BoxGeometry(0.36, 0.025, 0.18);
    const centerBtn = new THREE.Mesh(centerBtnGeo, keycapMat);
    centerBtn.position.set(0, 0, 0);
    centerBtn.castShadow = true;
    btnGroup.add(centerBtn);

    const blueDotStripeGeo = new THREE.BoxGeometry(0.24, 0.006, 0.022);
    const centerBlue = new THREE.Mesh(blueDotStripeGeo, scrollBlueMat);
    centerBlue.position.set(0, 0.013, -0.065);
    btnGroup.add(centerBlue);

    // Right Click Button
    const rightBtn = new THREE.Mesh(leftBtnGeo, keycapMat);
    rightBtn.position.set(0.48, 0, 0);
    rightBtn.castShadow = true;
    btnGroup.add(rightBtn);

    const rightStripe = new THREE.Mesh(redStripeGeo, trackPointRedMat);
    rightStripe.position.set(0.48, 0.013, -0.065);
    btnGroup.add(rightStripe);

    // Physical Glass TrackPad Plate (with soft silky finish)
    const padPlateGeo = new THREE.BoxGeometry(1.42, 0.012, 0.90);
    const padPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x131316,
      roughness: 0.42,
      metalness: 0.06,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4
    });
    const padPlate = new THREE.Mesh(padPlateGeo, padPlateMat);
    padPlate.position.set(0, 0.145, 0.88);
    padPlate.receiveShadow = true;
    thinkpadGroup.add(padPlate);

    // Official ThinkPad 45° Angled Palmrest Badge
    const badgeGeo = new THREE.PlaneGeometry(0.36, 0.18);
    const tpBadgeMesh = new THREE.Mesh(badgeGeo, thinkpadBadgeMat);
    tpBadgeMesh.position.set(1.18, 0.143, 0.88);
    tpBadgeMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(tpBadgeMesh);

    // Intel Core Hologram Badge on Left Palmrest
    const intelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.14), intelBadgeMat);
    intelMesh.position.set(-1.18, 0.143, 0.88);
    intelMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(intelMesh);

    // Biometric Fingerprint Sensor Frame (Right palmrest)
    const fpGeo = new THREE.BoxGeometry(0.14, 0.008, 0.14);
    const fpMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2, metalness: 0.8 });
    const fpMesh = new THREE.Mesh(fpGeo, fpMat);
    fpMesh.position.set(1.18, 0.143, 0.58);
    thinkpadGroup.add(fpMesh);

    // (F) Dual Cylindrical Drop Hinges in Brushed Stainless Steel
    const hingeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.26, 20);
    hingeGeo.rotateZ(Math.PI / 2);

    const leftHinge = new THREE.Mesh(hingeGeo, hingeSteelMat);
    leftHinge.position.set(-1.18, 0.145, -0.98);
    leftHinge.castShadow = true;
    thinkpadGroup.add(leftHinge);

    const rightHinge = new THREE.Mesh(hingeGeo, hingeSteelMat);
    rightHinge.position.set(1.18, 0.145, -0.98);
    rightHinge.castShadow = true;
    thinkpadGroup.add(rightHinge);

    // (G) Display Lid Assembly (108-degree open angle)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.145, -0.98);
    lidGroup.rotation.x = -0.32; // ~108 degrees backwards
    thinkpadGroup.add(lidGroup);

    const lidW = 3.32;
    const lidH = 2.24;
    const lidThick = 0.07;

    // Outer Lid Backing
    const lidBackGeo = new THREE.BoxGeometry(lidW, lidH, lidThick);
    const lidBackMesh = new THREE.Mesh(lidBackGeo, thinkpadChassisMat);
    lidBackMesh.position.set(0, lidH / 2, -lidThick / 2);
    lidBackMesh.castShadow = true;
    lidGroup.add(lidBackMesh);

    // Display Bezel
    const bezelGeo = new THREE.PlaneGeometry(lidW - 0.06, lidH - 0.06);
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, lidH / 2, lidThick / 2 + 0.001);
    lidGroup.add(bezelMesh);

    // (H) Dynamic 2048x1300 Screen Canvas & IPS Anti-Glare Panel
    const screenW = 2.94;
    const screenH = 1.90;
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 2048;
    screenCanvas.height = 1300;
    const screenContext = screenCanvas.getContext('2d')!;

    stateRef.current.screenCanvas = screenCanvas;
    stateRef.current.screenContext = screenContext;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    stateRef.current.screenTexture = screenTexture;

    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    // Positioned cleanly in front of bezel without any blocking gasket box
    screenMesh.position.set(0, lidH / 2 - 0.03, lidThick / 2 + 0.004);
    lidGroup.add(screenMesh);
    stateRef.current.screenMesh = screenMesh;

    // Thin Rubber Perimeter Bumper Strips (Border only, NOT covering the screen)
    const gasketMat = new THREE.MeshStandardMaterial({ color: 0x08080a, roughness: 0.9 });
    const topGasketGeo = new THREE.BoxGeometry(lidW - 0.12, 0.018, 0.005);
    const topGasket = new THREE.Mesh(topGasketGeo, gasketMat);
    topGasket.position.set(0, lidH - 0.05, lidThick / 2 + 0.005);
    lidGroup.add(topGasket);

    const bottomGasketGeo = new THREE.BoxGeometry(lidW - 0.12, 0.018, 0.005);
    const bottomGasket = new THREE.Mesh(bottomGasketGeo, gasketMat);
    bottomGasket.position.set(0, 0.05, lidThick / 2 + 0.005);
    lidGroup.add(bottomGasket);

    // 10. Atmospheric Desk Accessories (Nicely composed within 16:9 frame)
    // (A) Articulated Brass/Green Architect Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-2.1, 0, -0.3);
    scene.add(lampGroup);

    const lampBaseGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.07, 24);
    const lampBase = new THREE.Mesh(lampBaseGeo, lampMetalMat);
    lampBase.position.set(0, 0.035, 0);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Brass Base Collar
    const collarGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.07, 16);
    const collar = new THREE.Mesh(collarGeo, brassAccentMat);
    collar.position.set(0, 0.09, 0);
    lampGroup.add(collar);

    const armLowerGeo = new THREE.CylinderGeometry(0.022, 0.022, 1.5, 12);
    const armLower = new THREE.Mesh(armLowerGeo, hingeSteelMat);
    armLower.position.set(0.12, 0.80, 0.1);
    armLower.rotation.z = -0.25;
    armLower.castShadow = true;
    lampGroup.add(armLower);

    const armUpperGeo = new THREE.CylinderGeometry(0.022, 0.022, 1.4, 12);
    const armUpper = new THREE.Mesh(armUpperGeo, hingeSteelMat);
    armUpper.position.set(0.50, 1.95, 0.15);
    armUpper.rotation.z = 0.55;
    armUpper.castShadow = true;
    lampGroup.add(armUpper);

    // Conical Lamp Shade with Brass Accent Ring
    const shadeGeo = new THREE.ConeGeometry(0.30, 0.48, 24, 1, true);
    shadeGeo.rotateX(Math.PI / 4);
    shadeGeo.rotateZ(-Math.PI / 6);
    const shadeMesh = new THREE.Mesh(shadeGeo, lampMetalMat);
    shadeMesh.position.set(0.95, 2.35, 0.25);
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    const brassRingGeo = new THREE.TorusGeometry(0.30, 0.014, 12, 32);
    brassRingGeo.rotateX(Math.PI / 4);
    brassRingGeo.rotateZ(-Math.PI / 6);
    const brassRing = new THREE.Mesh(brassRingGeo, brassAccentMat);
    brassRing.position.set(0.95, 2.35, 0.25);
    lampGroup.add(brassRing);

    // (B) Glazed Porcelain Ceramic Coffee Mug with Meniscus (Composed at right)
    const mugGroup = new THREE.Group();
    mugGroup.position.set(1.95, 0, 0.45);
    scene.add(mugGroup);

    const mugOuterGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.45, 28);
    const mugOuter = new THREE.Mesh(mugOuterGeo, porcelainMugMat);
    mugOuter.position.set(0, 0.225, 0);
    mugOuter.castShadow = true;
    mugOuter.receiveShadow = true;
    mugGroup.add(mugOuter);

    // Mug Ear Handle
    const handleGeo = new THREE.TorusGeometry(0.13, 0.032, 16, 24, Math.PI * 1.3);
    handleGeo.rotateZ(Math.PI / 2);
    const handle = new THREE.Mesh(handleGeo, porcelainMugMat);
    handle.position.set(0.24, 0.225, 0);
    mugGroup.add(handle);

    // Dark Roast Coffee Liquid Surface
    const coffeeGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24);
    const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeLiquidMat);
    coffeeMesh.position.set(0, 0.41, 0);
    mugGroup.add(coffeeMesh);

    // (C) Spiral Engineering Field Journal & Obsidian Drafting Pen (Composed at left)
    const notebookGroup = new THREE.Group();
    notebookGroup.position.set(-1.90, 0.01, 0.70);
    notebookGroup.rotation.y = 0.18;
    scene.add(notebookGroup);

    const bookCoverGeo = new THREE.BoxGeometry(0.85, 0.028, 1.25);
    const notebookCoverMat = new THREE.MeshStandardMaterial({ color: 0x202622, roughness: 0.8 });
    const bookCover = new THREE.Mesh(bookCoverGeo, notebookCoverMat);
    bookCover.position.set(0, 0.014, 0);
    bookCover.castShadow = true;
    notebookGroup.add(bookCover);

    const bookPaperGeo = new THREE.BoxGeometry(0.80, 0.022, 1.20);
    const notebookPaperMat = new THREE.MeshStandardMaterial({ color: 0xf4f2ea, roughness: 0.9 });
    const bookPaper = new THREE.Mesh(bookPaperGeo, notebookPaperMat);
    bookPaper.position.set(0.01, 0.020, 0);
    notebookGroup.add(bookPaper);

    // Metal Spiral Coil Binding
    const coilGeo = new THREE.CylinderGeometry(0.032, 0.032, 1.20, 16);
    coilGeo.rotateX(Math.PI / 2);
    const coilMesh = new THREE.Mesh(coilGeo, hingeSteelMat);
    coilMesh.position.set(-0.41, 0.032, 0);
    notebookGroup.add(coilMesh);

    // Drafting Pen
    const penGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.90, 16);
    penGeo.rotateZ(Math.PI / 2.2);
    const penMat = new THREE.MeshStandardMaterial({ color: 0x111312, roughness: 0.2, metalness: 0.7 });
    const penMesh = new THREE.Mesh(penGeo, penMat);
    penMesh.position.set(0.12, 0.045, 0.06);
    penMesh.castShadow = true;
    notebookGroup.add(penMesh);

    // 11. UV Raycasting for Direct 3D Screen Clicks!
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      if (screenMesh) {
        const intersects = raycaster.intersectObject(screenMesh);
        if (intersects.length > 0) {
          setIsFocused(true);

          const uv = intersects[0].uv;
          if (uv) {
            const canvasX = uv.x * 2048;
            const canvasY = (1 - uv.y) * 1300;

            // Click on App Navigation Tabs (y: 65 to 140)
            if (canvasY >= 65 && canvasY <= 140) {
              const tabKeys: ('terminal' | 'pipeline' | 'projects' | 'notes' | 'resume')[] = [
                'terminal', 'pipeline', 'projects', 'notes', 'resume'
              ];
              tabKeys.forEach((t, idx) => {
                const tabX = 36 + idx * 270;
                if (canvasX >= tabX && canvasX <= tabX + 260) {
                  audioEngine.playKeyClick();
                  setActiveTab(t);
                }
              });
            }

            // Click on Quick Command Pills in Terminal (y: 1180 to 1255)
            if (stateRef.current.activeTab === 'terminal' && canvasY >= 1180 && canvasY <= 1255) {
              const quickCmds = ['whoami', 'projects', 'pipeline', 'skills', 'leetcode', 'resume', 'contact', 'clear'];
              quickCmds.forEach((cmd, idx) => {
                const btnX = 260 + idx * 165;
                if (canvasX >= btnX && canvasX <= btnX + 155) {
                  executeCommand(cmd);
                }
              });
            }

            // Click on Run Simulation in Pipeline Tab (y: 660 to 730, x: 70 to 410)
            if (stateRef.current.activeTab === 'pipeline' && canvasY >= 660 && canvasY <= 730 && canvasX >= 70 && canvasX <= 410) {
              runPipelineSimulation();
            }
          }
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 12. Screen Canvas Draw Loop (2048x1300 Ultra-Sharp Display)
    let lastBlink = Date.now();
    let cursorState = true;

    const drawScreen = () => {
      if (!screenContext) return;
      const ctx = screenContext;
      const now = Date.now();

      if (now - lastBlink > 500) {
        cursorState = !cursorState;
        lastBlink = now;
        stateRef.current.cursorVisible = cursorState;
      }

      // Background
      ctx.fillStyle = '#0c0f0d';
      ctx.fillRect(0, 0, 2048, 1300);

      // Top OS Menu Bar
      ctx.fillStyle = '#141c17';
      ctx.fillRect(0, 0, 2048, 68);
      ctx.fillStyle = '#264233';
      ctx.fillRect(0, 66, 2048, 2);

      ctx.font = 'bold 26px "JetBrains Mono", monospace';
      ctx.fillStyle = '#34d399';
      ctx.fillText('wyacoomz@thinkpad-x1', 36, 44);

      ctx.font = '20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('• B.Tech AI & Data Science • Trufe RPA Developer', 390, 43);

      const dateStr = new Date().toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
      ctx.textAlign = 'right';
      ctx.fillStyle = '#f3f4f6';
      ctx.fillText(`${dateStr} IST   ⚡ 98%   LeetCode 150+   WiFi: Connected`, 2012, 43);
      ctx.textAlign = 'left';

      // Tab Navigation Bar
      ctx.fillStyle = '#111714';
      ctx.fillRect(0, 68, 2048, 72);
      ctx.fillStyle = '#1f2e25';
      ctx.fillRect(0, 138, 2048, 2);

      const tabs = [
        { id: 'terminal', label: '>_ Terminal (zsh)' },
        { id: 'pipeline', label: '2. D365 Pipeline' },
        { id: 'projects', label: '3. Selected Work' },
        { id: 'notes', label: '4. Field Notes' },
        { id: 'resume', label: '5. Resume.pdf' }
      ];

      const currentTab = stateRef.current.activeTab;

      tabs.forEach((tab, idx) => {
        const x = 36 + idx * 270;
        const isTabActive = currentTab === tab.id;

        if (isTabActive) {
          ctx.fillStyle = '#264233';
          ctx.fillRect(x, 78, 258, 52);
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(x, 136, 258, 3);
        } else {
          ctx.fillStyle = '#161f1a';
          ctx.fillRect(x, 82, 258, 44);
        }

        ctx.font = isTabActive ? 'bold 21px "JetBrains Mono", monospace' : '20px "JetBrains Mono", monospace';
        ctx.fillStyle = isTabActive ? '#fbfbf9' : '#888680';
        ctx.fillText(tab.label, x + 20, 112);
      });

      // TAB 1: TERMINAL
      if (currentTab === 'terminal') {
        ctx.fillStyle = '#0f1412';
        ctx.fillRect(36, 160, 1976, 1090);
        ctx.strokeStyle = '#264233';
        ctx.lineWidth = 1;
        ctx.strokeRect(36, 160, 1976, 1090);

        let y = 225;
        const history = stateRef.current.terminalHistory;

        history.forEach((entry) => {
          ctx.font = 'bold 24px "JetBrains Mono", monospace';
          ctx.fillStyle = '#34d399';
          ctx.fillText('wyacoomz@thinkpad:~$', 70, y);
          ctx.fillStyle = '#f5f3ea';
          ctx.fillText(entry.command, 370, y);
          y += 38;

          ctx.font = '22px "JetBrains Mono", monospace';
          ctx.fillStyle = '#d1d5db';
          entry.output.forEach((line) => {
            if (line.startsWith('Available Commands') || line.startsWith('Production Systems') || line.startsWith('Core Technical')) {
              ctx.fillStyle = '#a3c9b2';
            } else if (line.startsWith('  №') || line.startsWith('  •')) {
              ctx.fillStyle = '#f3f4f6';
            } else if (line.startsWith('Tip:') || line.startsWith('Type')) {
              ctx.fillStyle = '#9ca3af';
            } else {
              ctx.fillStyle = '#d1d5db';
            }
            ctx.fillText(line, 70, y);
            y += 34;
          });
          y += 18;
        });

        // Prompt line
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('wyacoomz@thinkpad:~$', 70, y);

        ctx.fillStyle = '#ffffff';
        const currentInput = stateRef.current.terminalInput;
        ctx.fillText(currentInput, 370, y);

        // Blinking cursor
        if (stateRef.current.cursorVisible) {
          const inputWidth = ctx.measureText(currentInput).width;
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(370 + inputWidth + 4, y - 22, 14, 28);
        }

        // Quick Command Pills
        ctx.fillStyle = '#141c17';
        ctx.fillRect(36, 1180, 1976, 70);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '18px "JetBrains Mono", monospace';
        ctx.fillText('Quick Commands:', 65, 1224);

        const quickCmds = ['whoami', 'projects', 'pipeline', 'skills', 'leetcode', 'resume', 'contact', 'clear'];
        quickCmds.forEach((cmd, idx) => {
          const x = 260 + idx * 165;
          ctx.fillStyle = '#264233';
          ctx.fillRect(x, 1195, 155, 40);
          ctx.fillStyle = '#fbfbf9';
          ctx.font = '17px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(cmd, x + 77, 1222);
          ctx.textAlign = 'left';
        });
      }

      // TAB 2: D365 PIPELINE
      else if (currentTab === 'pipeline') {
        ctx.fillStyle = '#0f1412';
        ctx.fillRect(36, 160, 1976, 1090);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(36, 160, 1976, 1090);

        ctx.font = 'bold 36px "Newsreader", serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Maristo AI Invoice Processing & Dynamics 365 Architecture', 70, 230);

        ctx.font = '22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('Unattended 5-Company Autonomous Workflow • Sisi, Interior, Ring Gelene, Hospitality, AYC', 70, 275);

        const stages = [
          { num: '01', title: 'SharePoint Buffer', tech: 'Power Automate', desc: 'UUID normalized binary stream intake' },
          { num: '02', title: 'AI Extraction', tech: 'AI Builder OCR', desc: 'Line items + Confidence matrix' },
          { num: '03', title: 'Integrity Gate', tech: 'Deterministic Check', desc: 'Score >= 0.90 & Sum balance parity' },
          { num: '04', title: '5-Entity Prep', tech: 'Python OpenPyXL', desc: 'Subsidiary ledger Excel routing' },
          { num: '05', title: 'D365 Batch Upload', tech: 'Desktop RPA Engine', desc: 'Committed ledger + SQL audit logs' }
        ];

        const activeStep = stateRef.current.pipelineStep;

        stages.forEach((st, idx) => {
          const x = 70 + idx * 374;
          const isCurrent = activeStep === idx + 1;
          const isPassed = activeStep > idx + 1;

          ctx.fillStyle = isCurrent ? '#22382c' : isPassed ? '#182b20' : '#141a17';
          ctx.strokeStyle = isCurrent ? '#22c55e' : isPassed ? '#4ade80' : '#3c4741';
          ctx.lineWidth = isCurrent ? 3 : 1;
          ctx.fillRect(x, 340, 350, 280);
          ctx.strokeRect(x, 340, 350, 280);

          ctx.font = 'bold 28px "JetBrains Mono", monospace';
          ctx.fillStyle = isCurrent ? '#22c55e' : '#a3c9b2';
          ctx.fillText(`Stage ${st.num}`, x + 24, 395);

          ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#fbfbf9';
          ctx.fillText(st.title, x + 24, 440);

          ctx.font = '19px "JetBrains Mono", monospace';
          ctx.fillStyle = '#a3c9b2';
          ctx.fillText(st.tech, x + 24, 480);

          ctx.font = '18px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#d1d5db';
          ctx.fillText(st.desc, x + 24, 535);

          if (isCurrent) {
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(x, 595, 350, 24);
            ctx.fillStyle = '#0f1211';
            ctx.font = 'bold 15px "JetBrains Mono", monospace';
            ctx.fillText('PROCESSING ACTIVE', x + 95, 613);
          }
        });

        // Trigger Button on screen
        ctx.fillStyle = '#264233';
        ctx.fillRect(70, 660, 340, 65);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.strokeRect(70, 660, 340, 65);
        ctx.font = 'bold 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('▶ RUN PIPELINE SIMULATION', 95, 702);

        // Corporate Subsidiaries List
        ctx.fillStyle = '#16221c';
        ctx.fillRect(70, 760, 1870, 160);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(70, 760, 1870, 160);

        ctx.font = 'bold 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('5 SUBSIDIARY BUSINESS ENTITIES AUTOMATED:', 95, 805);

        ctx.font = '22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('1. Sisi\'s Eatery       2. Maristo Interior Design       3. Ring Gelene       4. Maristo Hospitality       5. AYC Catering Supplies', 95, 860);
      }

      // TAB 3: PROJECTS
      else if (currentTab === 'projects') {
        ctx.fillStyle = '#0f1412';
        ctx.fillRect(36, 160, 1976, 1090);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(36, 160, 1976, 1090);

        ctx.font = 'bold 36px "Newsreader", serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Production Systems & Engineering Portfolio', 70, 230);

        ctx.font = '20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('Substantiated engineering projects across Enterprise RPA, Document AI, and Full-Stack Web', 70, 275);

        const projectList = [
          { num: '01', title: 'Maristo AI Invoice & Dynamics 365 Bulk Uploader', tech: 'Power Automate Cloud/Desktop • AI Builder • D365', status: '5 Subsidiaries' },
          { num: '02', title: 'Multi-Bank Financial Reporting (SNB & Al Rajhi)', tech: 'Selenium • Python Pandas • Banking Regional Gate', status: 'Treasury RPA' },
          { num: '03', title: 'Full-Stack E-Commerce Platform (MERN Stack)', tech: 'React • Node.js • Express • MongoDB • Redux', status: 'Full-Stack' },
          { num: '04', title: 'Cash-Flow Reconciliation Engine', tech: 'Microsoft SQL Server • Stored Procedures • Pandas', status: 'SQL Ledger' },
          { num: '05', title: 'Customer Creation & Reporting Automation', tech: 'Keyloop DMS • Power Automate • STD Mapping', status: 'Data Migration' },
          { num: '06', title: 'Autonomous Email-to-Database Ingestion Bot', tech: 'SHA-256 Byte Deduplication • SQL Server • Exchange', status: 'Unattended RPA' },
          { num: '07', title: 'Job-Sky Recruitment Marketplace', tech: 'React • Express • MongoDB • JWT Authentication', status: 'Enterprise Web' }
        ];

        let py = 330;
        projectList.forEach((p) => {
          ctx.fillStyle = '#141c18';
          ctx.fillRect(70, py, 1870, 95);
          ctx.strokeStyle = '#264233';
          ctx.lineWidth = 1;
          ctx.strokeRect(70, py, 1870, 95);

          ctx.font = 'bold 24px "JetBrains Mono", monospace';
          ctx.fillStyle = '#34d399';
          ctx.fillText(`№ ${p.num}`, 95, py + 55);

          ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#fbfbf9';
          ctx.fillText(p.title, 190, py + 55);

          ctx.font = '19px "JetBrains Mono", monospace';
          ctx.fillStyle = '#a3c9b2';
          ctx.fillText(p.tech, 980, py + 55);

          ctx.fillStyle = '#264233';
          ctx.fillRect(1720, py + 26, 180, 42);
          ctx.fillStyle = '#fbfbf9';
          ctx.font = 'bold 16px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(p.status, 1810, py + 53);
          ctx.textAlign = 'left';

          py += 112;
        });
      }

      // TAB 4: FIELD NOTES
      else if (currentTab === 'notes') {
        ctx.fillStyle = '#0f1412';
        ctx.fillRect(36, 160, 1976, 1090);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(36, 160, 1976, 1090);

        ctx.font = 'bold 36px "Newsreader", serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Engineering Field Notes // Production Trade-Offs', 70, 230);

        ctx.font = '20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('Architectural logs on deterministic error handling, SQL idempotency, and regional calendars', 70, 275);

        // Note 1: Idempotency
        ctx.fillStyle = '#141c18';
        ctx.fillRect(70, 320, 910, 420);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(70, 320, 910, 420);

        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('NOTE 01 // IDEMPOTENT BOT DESIGN', 100, 365);
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Why Deduplication Belongs in the Database', 100, 405);

        ctx.font = '18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText('Payload SHA-256 byte hashing guarantees zero duplicate rows even', 100, 450);
        ctx.fillText('when exchange mail servers re-deliver attachments or network retries fire.', 100, 480);

        // Code block
        ctx.fillStyle = '#0a0d0b';
        ctx.fillRect(95, 510, 860, 200);
        ctx.font = '17px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('def ingest_payload(raw_bytes: bytes, sender: str):', 115, 545);
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('    content_hash = hashlib.sha256(raw_bytes).hexdigest()', 115, 580);
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('    with db_transaction() as cursor:', 115, 615);
        ctx.fillStyle = '#e5e7eb';
        ctx.fillText('        cursor.execute("SELECT id FROM logs WHERE hash=%s", (content_hash,))', 115, 650);
        ctx.fillText('        if cursor.fetchone(): return {"status": "SKIPPED_DUPLICATE"}', 115, 685);

        // Note 2: Regional Calendars
        ctx.fillStyle = '#141c18';
        ctx.fillRect(1010, 320, 930, 420);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(1010, 320, 930, 420);

        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('NOTE 02 // REGIONAL CALENDAR LOGIC', 1040, 365);
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Handling Friday-Saturday Weekends in KSA Portals', 1040, 405);

        ctx.font = '18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText('Western Monday-Friday assumptions crash Saudi treasury reconciliation.', 1040, 450);
        ctx.fillText('The Sunday opening balance must mathematically reconcile to Thursday close.', 1040, 480);

        ctx.fillStyle = '#0a0d0b';
        ctx.fillRect(1035, 510, 880, 200);
        ctx.font = '17px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('def compute_target_date(run_date: datetime.date):', 1055, 545);
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('    # In Saudi Arabia, Sunday (idx 6) reconciles to Thursday (idx 3)', 1055, 580);
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('    if run_date.weekday() == 6:', 1055, 615);
        ctx.fillStyle = '#e5e7eb';
        ctx.fillText('        return run_date - timedelta(days=3) # Rewind 3 days to Thursday', 1055, 650);
        ctx.fillText('    return run_date - timedelta(days=1)', 1055, 685);
      }

      // TAB 5: RESUME
      else if (currentTab === 'resume') {
        ctx.fillStyle = '#0f1412';
        ctx.fillRect(36, 160, 1976, 1090);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(36, 160, 1976, 1090);

        ctx.font = 'bold 36px "Newsreader", serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Curriculum Vitae // Abdul Samad Khan', 70, 230);

        ctx.font = '20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a3c9b2';
        ctx.fillText('RPA Developer @ Trufe • B.Tech AI & Data Science • 150+ LeetCode Solved', 70, 275);

        // Experience Section
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('WORK HISTORY', 70, 340);

        const exp = [
          { role: 'RPA Developer', org: 'Trufe', period: 'Jan 2025 – Present', desc: 'Building unattended Power Automate & Dynamics 365 bots spanning 5 subsidiaries and dual-bank treasury reconciliation.' },
          { role: 'React Native Developer Intern', org: 'Skyinfo-group', period: 'Jan 2025 – Mar 2025', desc: 'Engineered cross-platform mobile app features with offline Redux caching and clean REST API integrations.' },
          { role: 'Web Development Intern', org: 'Elevated Labs', period: 'Nov 2024 – Dec 2024', desc: 'Developed responsive, component-driven web interfaces using React, Tailwind CSS, and JavaScript.' }
        ];

        let ey = 380;
        exp.forEach((e) => {
          ctx.fillStyle = '#141c18';
          ctx.fillRect(70, ey, 1870, 100);
          ctx.strokeStyle = '#264233';
          ctx.strokeRect(70, ey, 1870, 100);

          ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#fbfbf9';
          ctx.fillText(`${e.role} — ${e.org}`, 95, ey + 42);

          ctx.font = '18px "JetBrains Mono", monospace';
          ctx.fillStyle = '#34d399';
          ctx.fillText(e.period, 1650, ey + 42);

          ctx.font = '18px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#d1d5db';
          ctx.fillText(e.desc, 95, ey + 78);

          ey += 120;
        });

        // Education
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('EDUCATION & CREDENTIALS', 70, 770);

        ctx.fillStyle = '#141c18';
        ctx.fillRect(70, 805, 1870, 90);
        ctx.strokeStyle = '#264233';
        ctx.strokeRect(70, 805, 1870, 90);

        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fbfbf9';
        ctx.fillText('Bachelor of Technology (B.Tech) in Artificial Intelligence & Data Science', 95, 845);
        ctx.font = '18px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('2022 – 2026', 1700, 845);
        ctx.font = '18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText('Oriental Institute of Science & Technology, Bhopal • Rajiv Gandhi Proudyogiki Vishwavidyalaya', 95, 878);
      }

      // CRITICAL: Update screen texture on EVERY frame!
      screenTexture.needsUpdate = true;
    };

    // 13. Animation Loop
    const animate = () => {
      stateRef.current.animFrameId = requestAnimationFrame(animate);

      drawScreen();

      // Camera lerp navigation
      if (stateRef.current.cameraTarget) {
        camera.position.lerp(stateRef.current.cameraTarget.pos, 0.08);
        controls.target.lerp(stateRef.current.cameraTarget.look, 0.08);

        if (camera.position.distanceTo(stateRef.current.cameraTarget.pos) < 0.02) {
          stateRef.current.cameraTarget = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    stateRef.current.animFrameId = requestAnimationFrame(animate);

    // 14. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(stateRef.current.animFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleCanvasClick);

      // Dispose Three.js objects
      deskGeo.dispose();
      wallGeo.dispose();
      matGeo.dispose();
      baseGeo.dispose();
      footGeo.dispose();
      sidePortsGeo.dispose();
      keyboardPlaneGeo.dispose();
      stemGeo.dispose();
      domeGeo.dispose();
      topCapGeo.dispose();
      leftBtnGeo.dispose();
      centerBtnGeo.dispose();
      redStripeGeo.dispose();
      blueDotStripeGeo.dispose();
      padPlateGeo.dispose();
      badgeGeo.dispose();
      fpGeo.dispose();
      hingeGeo.dispose();
      lidBackGeo.dispose();
      bezelGeo.dispose();
      topGasketGeo.dispose();
      bottomGasketGeo.dispose();
      screenGeo.dispose();
      lampBaseGeo.dispose();
      collarGeo.dispose();
      armLowerGeo.dispose();
      armUpperGeo.dispose();
      shadeGeo.dispose();
      brassRingGeo.dispose();
      mugOuterGeo.dispose();
      handleGeo.dispose();
      coffeeGeo.dispose();
      bookCoverGeo.dispose();
      bookPaperGeo.dispose();
      coilGeo.dispose();
      penGeo.dispose();

      walnutWoodMat.dispose();
      wallMat.dispose();
      deskMatMaterial.dispose();
      thinkpadChassisMat.dispose();
      keyboardDeckMat.dispose();
      keycapMat.dispose();
      thinkpadBadgeMat.dispose();
      intelBadgeMat.dispose();
      sidePortsMat.dispose();
      bezelMat.dispose();
      trackPointRedMat.dispose();
      scrollBlueMat.dispose();
      hingeSteelMat.dispose();
      lampMetalMat.dispose();
      brassAccentMat.dispose();
      porcelainMugMat.dispose();
      coffeeLiquidMat.dispose();
      notebookCoverMat.dispose();
      notebookPaperMat.dispose();
      penMat.dispose();
      fpMat.dispose();
      gasketMat.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      walnutWoodTex.dispose();
      deskMatTex.dispose();
      keyboardDeckTex.dispose();
      thinkpadBadgeTex.dispose();
      intelBadgeTex.dispose();
      sidePortsTex.dispose();
      bezelTex.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Camera Zoom Animation: Screen Focus vs. Desk View
  const toggleFocus = useCallback(() => {
    audioEngine.playSwitchClick();
    const nextState = !isFocused;
    setIsFocused(nextState);

    if (nextState) {
      // Zoom in perpendicular directly to the ThinkPad display
      stateRef.current.cameraTarget = {
        pos: new THREE.Vector3(0, 1.95, 1.45),
        look: new THREE.Vector3(0, 1.18, -1.32)
      };
    } else {
      // Return to comfortable 3/4 workstation desk view
      stateRef.current.cameraTarget = {
        pos: new THREE.Vector3(0.35, 2.4, 3.8),
        look: new THREE.Vector3(0, 0.45, 0)
      };
    }
  }, [isFocused]);

  // Reset Camera View
  const resetCamera = useCallback(() => {
    audioEngine.playSwitchClick();
    setIsFocused(false);
    stateRef.current.cameraTarget = {
      pos: new THREE.Vector3(0.35, 2.4, 3.8),
      look: new THREE.Vector3(0, 0.45, 0)
    };
  }, []);

  // Desk Lamp Toggle
  const toggleLamp = useCallback(() => {
    audioEngine.playSwitchClick();
    setLampOn(prev => {
      const next = !prev;
      if (stateRef.current.deskLampLight) {
        stateRef.current.deskLampLight.intensity = next ? 4.8 : 0.3;
      }
      return next;
    });
  }, []);

  // Sound Engine Toggle
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      audioEngine.enabled = next;
      if (next) audioEngine.playSwitchClick();
      return next;
    });
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0c0b]">
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
        aria-label="Interactive 3D ThinkPad workstation by Abdul Samad Khan"
      />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none z-20">
        
        {/* Left: Return Link & ThinkPad Brand */}
        <div className="pointer-events-auto flex items-center space-x-2">
          <a
            href="http://localhost:3000"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#181f1b]/95 hover:bg-[#264233] text-[#fbfbf9] text-xs font-mono rounded-xs border border-[#264233] transition-colors backdrop-blur-md shadow-sm"
            title="Return to the Editorial Field Journal Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="hidden sm:inline">Editorial Portfolio</span>
          </a>

          <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#181f1b]/95 backdrop-blur-md border border-[#264233] rounded-xs text-xs font-mono text-[#fbfbf9] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#df1a2d] animate-pulse" />
            <span className="font-bold text-[#a3c9b2]">THINKPAD X1</span>
            <span className="text-[#888680] hidden sm:inline">&bull;</span>
            <span className="text-[#dcd9cf] hidden sm:inline">DEV WORKSTATION</span>
          </div>
        </div>

        {/* Center: App Navigation Tabs (shown in Desk View; in Focused View the screen's interactive tabs take center stage) */}
        {!isFocused && (
          <div className="pointer-events-auto hidden md:flex items-center space-x-1 bg-[#141816]/95 backdrop-blur-md border border-[#264233] p-1 rounded-xs shadow-sm overflow-x-auto">
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveTab('terminal'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all flex items-center space-x-1 ${
                activeTab === 'terminal' ? 'bg-[#264233] text-[#fbfbf9] font-bold' : 'text-[#888680] hover:text-[#fbfbf9]'
              }`}
            >
              <Terminal className="w-3 h-3 text-[#34d399]" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveTab('pipeline'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeTab === 'pipeline' ? 'bg-[#264233] text-[#fbfbf9] font-bold' : 'text-[#888680] hover:text-[#fbfbf9]'
              }`}
            >
              D365 Pipeline
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveTab('projects'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeTab === 'projects' ? 'bg-[#264233] text-[#fbfbf9] font-bold' : 'text-[#888680] hover:text-[#fbfbf9]'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveTab('notes'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeTab === 'notes' ? 'bg-[#264233] text-[#fbfbf9] font-bold' : 'text-[#888680] hover:text-[#fbfbf9]'
              }`}
            >
              Field Notes
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveTab('resume'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeTab === 'resume' ? 'bg-[#264233] text-[#fbfbf9] font-bold' : 'text-[#888680] hover:text-[#fbfbf9]'
              }`}
            >
              Resume
            </button>
          </div>
        )}

        {/* Right: Tactical Camera & Environment Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-[#141816]/95 backdrop-blur-md border border-[#264233] p-1 rounded-xs shadow-sm">
          <button
            type="button"
            onClick={toggleFocus}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xs text-xs font-mono transition-all ${
              isFocused 
                ? 'bg-[#264233] text-[#fbfbf9] font-bold border border-[#3c6450]' 
                : 'text-[#dcd9cf] hover:text-[#ffffff] hover:bg-[#1e2622]'
            }`}
            title="Toggle between close-up screen reading view and 3D desk view"
          >
            {isFocused ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span>{isFocused ? 'Desk View' : 'Focus Screen'}</span>
          </button>

          <button
            type="button"
            onClick={toggleLamp}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xs text-xs font-mono transition-all ${
              lampOn 
                ? 'bg-[#fef3c7]/20 text-[#fde68a] border border-[#fde68a]/40' 
                : 'text-[#888680] hover:text-[#ffffff] hover:bg-[#1e2622]'
            }`}
            title="Toggle warm desk lamp"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lampOn ? 'Lamp On' : 'Lamp Off'}</span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className={`p-1.5 rounded-xs transition-colors ${
              soundEnabled ? 'text-[#34d399] hover:bg-[#1e2622]' : 'text-[#888680] hover:bg-[#1e2622]'
            }`}
            title={soundEnabled ? 'Mute Keyboard Sounds' : 'Enable Keyboard Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={resetCamera}
            className="p-1.5 text-[#888680] hover:text-[#ffffff] hover:bg-[#1e2622] rounded-xs transition-colors"
            title="Reset 3D camera angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 text-[#888680] hover:text-[#ffffff] hover:bg-[#1e2622] rounded-xs transition-colors"
            title="About this workstation"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141816] border border-[#264233] rounded-sm max-w-md w-full p-6 text-xs font-mono space-y-4 shadow-xl pointer-events-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#264233]">
              <span className="font-bold text-[#34d399] uppercase">ThinkPad X1 Developer Workstation</span>
              <button 
                type="button"
                onClick={() => setShowInfo(false)}
                className="text-[#888680] hover:text-[#fbfbf9]"
              >
                [Esc / Close]
              </button>
            </div>

            <div className="space-y-2 text-[#d1d5db] leading-relaxed">
              <p>
                Inspired by the tactile engineering desk environment of <strong className="text-[#fbfbf9]">Henry Heffernan</strong>, this standalone 3D workstation showcases the engineering practice of <strong className="text-[#fbfbf9]">Abdul Samad Khan (wyacoomz)</strong>.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[#a3c9b2]">
                <li><strong className="text-[#fbfbf9]">Controls</strong>: Left click + drag to orbit, scroll to zoom.</li>
                <li><strong className="text-[#fbfbf9]">Focus Screen</strong>: Click "Focus Screen" (or click directly on the screen) to zoom face-on.</li>
                <li><strong className="text-[#fbfbf9]">Interactive OS</strong>: Type commands in the terminal (<code className="text-[#34d399]">help</code>, <code className="text-[#34d399]">whoami</code>, <code className="text-[#34d399]">pipeline</code>, <code className="text-[#34d399]">projects</code>) or click tabs.</li>
                <li><strong className="text-[#fbfbf9]">Desk Lamp</strong>: Click "Lamp On/Off" to adjust ambient spotlight.</li>
                <li><strong className="text-[#fbfbf9]">Tactile Audio</strong>: Realistic procedural mechanical keyboard audio synthesized with Web Audio API.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#264233]">
              <span className="text-[10px] text-[#888680]">Bhopal, India (IST UTC +05:30)</span>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="px-3 py-1 bg-[#264233] text-[#fbfbf9] rounded-xs hover:bg-[#34d399] hover:text-[#141816] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Interactive Dock & Command Runner */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none z-20">
        {activeTab === 'terminal' ? (
          <div className="pointer-events-auto w-full sm:max-w-2xl flex items-center space-x-2 bg-[#141816]/95 backdrop-blur-md border border-[#264233] px-3.5 py-2 rounded-xs shadow-md">
            <Terminal className="w-4 h-4 text-[#34d399] flex-shrink-0" />
            <span className="text-xs font-mono text-[#34d399] font-bold select-none">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => {
                audioEngine.playKeyClick();
                setTerminalInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  executeCommand(terminalInput);
                }
              }}
              placeholder="Type 'help', 'whoami', 'projects', 'pipeline', 'skills'..."
              className="w-full bg-transparent text-xs font-mono text-[#fbfbf9] placeholder-[#888680] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => executeCommand(terminalInput)}
              className="px-2.5 py-1 bg-[#264233] hover:bg-[#1e3327] text-[#fbfbf9] text-[11px] font-mono rounded-xs transition-colors flex-shrink-0"
            >
              Run
            </button>
          </div>
        ) : activeTab === 'pipeline' ? (
          <div className="pointer-events-auto flex items-center space-x-3 bg-[#141816]/95 backdrop-blur-md border border-[#264233] px-4 py-2 rounded-xs shadow-md">
            <button
              onClick={runPipelineSimulation}
              disabled={pipelineRunning}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#264233] hover:bg-[#1e3327] disabled:opacity-50 text-[#fbfbf9] text-xs font-mono rounded-xs border border-[#3c6450] transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-[#34d399]" />
              <span>{pipelineRunning ? `Simulating Stage 0${pipelineStep}...` : 'Run Pipeline Simulation'}</span>
            </button>
            <span className="text-[11px] font-mono text-[#888680]">5 Entities: Sisi, Interior, Ring Gelene, Hospitality, AYC</span>
          </div>
        ) : (
          <div className="pointer-events-auto flex items-center space-x-3 bg-[#141816]/95 backdrop-blur-md border border-[#264233] px-4 py-2 rounded-xs shadow-md">
            <span className="text-xs font-mono text-[#a3c9b2]">Viewing {activeTab.toUpperCase()} on ThinkPad Display</span>
          </div>
        )}

        {/* Tactical Helper Hint */}
        <div className="hidden lg:flex items-center space-x-3 text-[11px] font-mono text-[#888680] bg-[#141816]/90 backdrop-blur-md border border-[#264233] px-3 py-1.5 rounded-xs">
          <span>🖱 Drag to orbit desk</span>
          <span>&bull;</span>
          <span>🔍 Scroll to zoom</span>
          <span>&bull;</span>
          <span>⌨ Click screen to interact</span>
        </div>
      </div>
    </div>
  );
};
