import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ZoomIn, ZoomOut, RotateCcw, Lightbulb, Terminal, Play, 
  Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Info,
  LayoutGrid, FileText, CheckCircle2, ChevronRight, Download,
  Laptop, Power, Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { LinuxDesktopOS } from './LinuxDesktopOS';

// ==========================================
// PRECISION AUDIO SYNTHESIZER
// ==========================================
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

  public playKeyClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const snap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snap.type = 'triangle';
      snap.frequency.setValueAtTime(2600 + (Math.random() - 0.5) * 200, t);
      snap.frequency.exponentialRampToValueAtTime(300, t + 0.018);
      snapGain.gain.setValueAtTime(0.06, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.02);

      const thock = this.ctx.createOscillator();
      const thockGain = this.ctx.createGain();
      thock.type = 'sine';
      thock.frequency.setValueAtTime(320 + (Math.random() - 0.5) * 30, t);
      thock.frequency.exponentialRampToValueAtTime(75, t + 0.028);
      thockGain.gain.setValueAtTime(0.08, t);
      thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);
      thock.connect(thockGain);
      thockGain.connect(this.ctx.destination);
      thock.start(t);
      thock.stop(t + 0.03);
    } catch {}
  }

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
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.025);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.028);
    } catch {}
  }

  public playLidOpenSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // Precision magnetic latch pop
      const pop = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      pop.type = 'triangle';
      pop.frequency.setValueAtTime(480, t);
      pop.frequency.exponentialRampToValueAtTime(140, t + 0.04);
      popGain.gain.setValueAtTime(0.12, t);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      pop.connect(popGain);
      popGain.connect(this.ctx.destination);
      pop.start(t);
      pop.stop(t + 0.042);

      // Smooth unibody hinge glide
      const sweep = this.ctx.createOscillator();
      const sweepGain = this.ctx.createGain();
      sweep.type = 'sine';
      sweep.frequency.setValueAtTime(180, t + 0.02);
      sweep.frequency.exponentialRampToValueAtTime(360, t + 0.20);
      sweepGain.gain.setValueAtTime(0.001, t);
      sweepGain.gain.linearRampToValueAtTime(0.06, t + 0.05);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      sweep.connect(sweepGain);
      sweepGain.connect(this.ctx.destination);
      sweep.start(t + 0.02);
      sweep.stop(t + 0.24);
    } catch {}
  }

  public playLidCloseSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // Solid aluminum unibody magnetic clamp thud
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(190, t);
      thud.frequency.exponentialRampToValueAtTime(45, t + 0.055);
      thudGain.gain.setValueAtTime(0.18, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(t);
      thud.stop(t + 0.06);

      const snap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snap.type = 'triangle';
      snap.frequency.setValueAtTime(850, t);
      snap.frequency.exponentialRampToValueAtTime(200, t + 0.02);
      snapGain.gain.setValueAtTime(0.07, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.022);
    } catch {}
  }

  public playBootChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // Authentic Windows 98 major chord swell: F# - B - C# - F# with shimmer
      const chordNotes = [369.99, 493.88, 554.37, 739.99]; // F#4, B4, C#5, F#5
      chordNotes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.08, start + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 1.25);
      });
    } catch {}
  }

  public playCupClink() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, t);
      osc.frequency.exponentialRampToValueAtTime(900, t + 0.15);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } catch {}
  }
}

const audioEngine = new TacticalAudioEngine();

// ==========================================
// PROCEDURAL TEXTURE GENERATORS
// ==========================================

// 0. Warm Studio Architectural Wall Texture (Sunlit linen plaster)
function generateStudioWallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm studio wall vertical light gradient (sunlit warm linen cream to soft taupe)
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, '#f8f4ec');
  grad.addColorStop(0.35, '#efe8dd');
  grad.addColorStop(0.7, '#e6ded0');
  grad.addColorStop(1, '#ddd4c5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft architectural ceiling spotlight wash
  const radial = ctx.createRadialGradient(512, 160, 40, 512, 220, 650);
  radial.addColorStop(0, 'rgba(255, 252, 245, 0.40)');
  radial.addColorStop(0.4, 'rgba(255, 248, 235, 0.18)');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro plaster / matte stipple texture
  ctx.globalAlpha = 0.02;
  for (let i = 0; i < 20000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 0b. Minimalist Bauhaus / Studio Art Print Texture
function generateArtPrintTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm textured paper
  ctx.fillStyle = '#f8f4ec';
  ctx.fillRect(0, 0, 512, 512);

  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#000000' : '#886644';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  // Minimalist geometric composition (Warm ochre terracotta sun & sage arch)
  ctx.fillStyle = '#4b6957';
  ctx.beginPath();
  ctx.arc(256, 310, 95, Math.PI, 0);
  ctx.rect(161, 310, 190, 85);
  ctx.fill();

  ctx.fillStyle = '#cf7e3d';
  ctx.beginPath();
  ctx.arc(256, 175, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#22252b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(130, 415);
  ctx.lineTo(382, 415);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

// 1. Natural Rich Walnut & Oiled Teak Desk Texture
function generateRichWalnutDeskTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Deep, warm honey walnut foundation with natural depth
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 2048);
  baseGrad.addColorStop(0, '#58361e');
  baseGrad.addColorStop(0.35, '#6e4526');
  baseGrad.addColorStop(0.7, '#774b29');
  baseGrad.addColorStop(1, '#52331b');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 2048, 2048);

  const plankH = 256;
  for (let y = 0; y < 2048; y += plankH) {
    const tone = Math.sin(y * 0.02) * 0.08;
    ctx.fillStyle = tone > 0 ? 'rgba(235, 175, 105, 0.10)' : 'rgba(30, 15, 5, 0.15)';
    ctx.fillRect(0, y, 2048, plankH);

    // Dark wood seam groove
    ctx.strokeStyle = '#271407';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();

    // Wood bevel edge highlight
    ctx.strokeStyle = 'rgba(255, 215, 160, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y + 2.5);
    ctx.lineTo(2048, y + 2.5);
    ctx.stroke();
  }

  // Flowing organic wood grain lines
  for (let i = 0; i < 580; i++) {
    const yBase = (i / 580) * 2048;
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= 2048; x += 16) {
      const ny = yBase + Math.sin(x * 0.005 + i * 0.35) * 8 + Math.cos(x * 0.015) * 3;
      ctx.lineTo(x, ny);
    }
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = i % 4 === 0 ? '#301a0a' : i % 2 === 0 ? '#824e27' : '#b57942';
    ctx.lineWidth = 1.0 + Math.sin(i * 0.2) * 0.7;
    ctx.stroke();
  }

  // Fine wood pores / satin grain speckles
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = '#1c0d04';
  for (let s = 0; s < 35000; s++) {
    ctx.fillRect(Math.random() * 2048, Math.random() * 2048, Math.random() * 6 + 2, 1);
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// 2. Modern Space Gray Unibody Outer Lid Texture
function generateModernOuterLidTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1360;
  const ctx = canvas.getContext('2d')!;

  // Space Gray anodized aluminum base
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, '#24272f');
  bgGrad.addColorStop(0.5, '#2b2f38');
  bgGrad.addColorStop(1, '#22252d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle bead-blasted aluminum grain
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 30000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  // CNC diamond-cut chamfer edge highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  // Centered Minimalist Developer Monogram Emblem (Polished Mirror Nickel)
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // Outer polished ring
  ctx.beginPath();
  ctx.arc(cx, cy, 64, 0, Math.PI * 2);
  const ringGrad = ctx.createLinearGradient(cx - 64, cy - 64, cx + 64, cy + 64);
  ringGrad.addColorStop(0, '#e2e8f0');
  ringGrad.addColorStop(0.5, '#64748b');
  ringGrad.addColorStop(1, '#cbd5e1');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Subtle dark mirror core
  ctx.beginPath();
  ctx.arc(cx, cy, 58, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(cx - 15, cy - 15, 5, cx, cy, 60);
  coreGrad.addColorStop(0, '#334155');
  coreGrad.addColorStop(0.7, '#1e293b');
  coreGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = coreGrad;
  ctx.fill();

  // Geometric Lambda / Engineering Monogram
  ctx.font = '600 48px "JetBrains Mono", system-ui, sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
  ctx.shadowBlur = 12;
  ctx.fillText('λ', cx, cy - 2);
  ctx.shadowBlur = 0;

  // Front lip machined scoop notch at bottom center
  ctx.save();
  ctx.fillStyle = '#181a20';
  ctx.beginPath();
  ctx.roundRect(cx - 110, canvas.height - 16, 220, 16, 8);
  ctx.fill();
  ctx.restore();

  return new THREE.CanvasTexture(canvas);
}

// 3. Modern Ultrabook Keyboard Deck Texture with Dual CNC Speaker Grilles
function generateModernKeyboardDeckTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 3072;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d')!;

  // Space Gray anodized aluminum chassis
  const chassisGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  chassisGrad.addColorStop(0, '#262931');
  chassisGrad.addColorStop(0.6, '#282b34');
  chassisGrad.addColorStop(1, '#23262d');
  ctx.fillStyle = chassisGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // CNC Micro-Drilled Speaker Grilles on Left & Right
  const drawSpeakerGrille = (startX: number, endX: number, topY: number, bottomY: number) => {
    ctx.save();
    const dotSpacing = 16;
    for (let x = startX; x <= endX; x += dotSpacing) {
      for (let y = topY; y <= bottomY; y += dotSpacing) {
        // Subtle acoustic perforation hole
        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#101216';
        ctx.fill();

        // Micro highlight on bottom rim
        ctx.beginPath();
        ctx.arc(x, y + 0.8, 2.2, 0, Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  // Left speaker grille
  drawSpeakerGrille(100, 360, 90, 880);
  // Right speaker grille
  drawSpeakerGrille(2712, 2972, 90, 880);

  // Centered Recessed Keyboard Well
  const wellW = 2240;
  const wellH = 830;
  const wellX = (canvas.width - wellW) / 2; // 416
  const wellY = 70;

  // Dark recessed well
  ctx.fillStyle = '#14161a';
  ctx.beginPath();
  ctx.roundRect(wellX, wellY, wellW, wellH, 14);
  ctx.fill();

  ctx.strokeStyle = '#0d0e12';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Subtle inner shadow
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(wellX + 2, wellY + 2, wellW - 4, wellH - 4);

  // Helper function to draw modern chiclet keycaps
  const drawModernKey = (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    subLabel: string = '',
    options: {
      fontSize?: number;
      isSpecial?: boolean;
      align?: 'center' | 'left';
      isTouchID?: boolean;
    } = {}
  ) => {
    const { fontSize = 28, isSpecial = false, align = 'center', isTouchID = false } = options;

    if (isTouchID) {
      // Modern circular TouchID / Power sensor
      ctx.fillStyle = '#0a0b0e';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 8);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#1e2229';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      return;
    }

    // Key shadow
    ctx.fillStyle = '#07080a';
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 2, w, h, 8);
    ctx.fill();

    // Key body gradient
    const keyGrad = ctx.createLinearGradient(x, y, x, y + h);
    if (isSpecial) {
      keyGrad.addColorStop(0, '#24272f');
      keyGrad.addColorStop(1, '#181a20');
    } else {
      keyGrad.addColorStop(0, '#2a2d36');
      keyGrad.addColorStop(1, '#1b1d24');
    }
    ctx.fillStyle = keyGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 7);
    ctx.fill();

    // Subtle key border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Laser-etched white legend
    ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.25)';
    ctx.shadowBlur = 3;

    if (align === 'center') {
      ctx.textAlign = 'center';
      const textY = subLabel ? y + h / 2 + fontSize * 0.15 : y + h / 2 + fontSize * 0.35;
      ctx.fillText(label, x + w / 2, textY);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(label, x + 14, y + h / 2 + fontSize * 0.35);
    }
    ctx.shadowBlur = 0;

    // Sub-label
    if (subLabel) {
      ctx.font = `400 18px system-ui, sans-serif`;
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(subLabel, x + w / 2, y + 26);
    }
  };

  // Keyboard Rows Layout
  const gap = 12;
  const stdW = 126;

  // ROW 0: Function Keys
  const r0Y = wellY + 14;
  const r0H = 75;
  const fnW = 110;
  let cx = wellX + 16;

  drawModernKey(cx, r0Y, 115, r0H, 'esc', '', { fontSize: 22 });
  cx += 115 + gap;

  const fKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  fKeys.forEach((f) => {
    drawModernKey(cx, r0Y, fnW, r0H, f, '', { fontSize: 20 });
    cx += fnW + gap;
  });

  // TouchID / Power key at top right
  drawModernKey(cx, r0Y, 105, r0H, '', '', { isTouchID: true });

  // ROW 1: Numbers (~ ` to delete)
  const r1Y = r0Y + r0H + gap;
  const r1H = 135;
  cx = wellX + 16;

  const row1 = ['~ `', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '- _', '= +'];
  row1.forEach((k) => {
    drawModernKey(cx, r1Y, stdW, r1H, k, '', { fontSize: 26 });
    cx += stdW + gap;
  });
  const delW = wellX + wellW - 16 - cx;
  drawModernKey(cx, r1Y, delW, r1H, 'delete', '', { fontSize: 22, isSpecial: true });

  // ROW 2: Tab, QWERTYUIOP, [ ], \
  const r2Y = r1Y + r1H + gap;
  const r2H = 135;
  cx = wellX + 16;

  const tabW = 180;
  drawModernKey(cx, r2Y, tabW, r2H, 'tab', '', { fontSize: 22, isSpecial: true, align: 'left' });
  cx += tabW + gap;

  const row2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'];
  row2.forEach((k) => {
    drawModernKey(cx, r2Y, stdW, r2H, k, '', { fontSize: 28 });
    cx += stdW + gap;
  });
  const slashW = wellX + wellW - 16 - cx;
  drawModernKey(cx, r2Y, slashW, r2H, '\\', '', { fontSize: 26 });

  // ROW 3: CapsLock, ASDFGHJKL, Return
  const r3Y = r2Y + r2H + gap;
  const r3H = 135;
  cx = wellX + 16;

  const capsW = 215;
  drawModernKey(cx, r3Y, capsW, r3H, 'caps lock', '', { fontSize: 22, isSpecial: true, align: 'left' });
  cx += capsW + gap;

  const row3 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''];
  row3.forEach((k) => {
    drawModernKey(cx, r3Y, stdW, r3H, k, '', { fontSize: 28 });
    cx += stdW + gap;
  });
  const returnW = wellX + wellW - 16 - cx;
  drawModernKey(cx, r3Y, returnW, r3H, 'return', '', { fontSize: 22, isSpecial: true });

  // ROW 4: Shift, ZXCVBNM, Shift
  const r4Y = r3Y + r3H + gap;
  const r4H = 135;
  cx = wellX + 16;

  const lShiftW = 275;
  drawModernKey(cx, r4Y, lShiftW, r4H, 'shift', '', { fontSize: 22, isSpecial: true, align: 'left' });
  cx += lShiftW + gap;

  const row4 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'];
  row4.forEach((k) => {
    drawModernKey(cx, r4Y, stdW, r4H, k, '', { fontSize: 28 });
    cx += stdW + gap;
  });
  const rShiftW = wellX + wellW - 16 - cx;
  drawModernKey(cx, r4Y, rShiftW, r4H, 'shift', '', { fontSize: 22, isSpecial: true });

  // ROW 5: Bottom Modifier Row & Spacebar & Inverted-T Arrows
  const r5Y = r4Y + r4H + gap;
  const r5H = 145;
  cx = wellX + 16;

  drawModernKey(cx, r5Y, 115, r5H, 'fn', '', { fontSize: 20, isSpecial: true });
  cx += 115 + gap;

  drawModernKey(cx, r5Y, 125, r5H, 'control', '', { fontSize: 20, isSpecial: true });
  cx += 125 + gap;

  drawModernKey(cx, r5Y, 135, r5H, 'option', '', { fontSize: 20, isSpecial: true });
  cx += 135 + gap;

  drawModernKey(cx, r5Y, 175, r5H, 'command', '', { fontSize: 20, isSpecial: true });
  cx += 175 + gap;

  // Wide Spacebar
  const spaceW = 750;
  drawModernKey(cx, r5Y, spaceW, r5H, '', '', { fontSize: 24 });
  cx += spaceW + gap;

  drawModernKey(cx, r5Y, 175, r5H, 'command', '', { fontSize: 20, isSpecial: true });
  cx += 175 + gap;

  drawModernKey(cx, r5Y, 135, r5H, 'option', '', { fontSize: 20, isSpecial: true });
  cx += 135 + gap;

  // Inverted-T Arrow Cluster
  const arrowW = 95;
  const arrowHalfH = (r5H - gap) / 2;

  drawModernKey(cx + arrowW + gap, r5Y, arrowW, arrowHalfH, '▲', '', { fontSize: 16 });
  drawModernKey(cx, r5Y + arrowHalfH + gap, arrowW, arrowHalfH, '◀', '', { fontSize: 16 });
  drawModernKey(cx + arrowW + gap, r5Y + arrowHalfH + gap, arrowW, arrowHalfH, '▼', '', { fontSize: 16 });
  drawModernKey(cx + (arrowW + gap) * 2, r5Y + arrowHalfH + gap, arrowW, arrowHalfH, '▶', '', { fontSize: 16 });

  return new THREE.CanvasTexture(canvas);
}

// 4. Modern Micro-Edge Display Bezel Texture (94% screen-to-body)
function generateModernBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1300;
  const ctx = canvas.getContext('2d')!;

  // Deep matte black bezel
  ctx.fillStyle = '#0f1115';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Center display cutout placeholder
  const padX = 36;
  const padTop = 44;
  const padBtm = 44;
  ctx.fillStyle = '#050608';
  ctx.fillRect(padX, padTop, canvas.width - padX * 2, canvas.height - padTop - padBtm);

  // Top bezel center: Micro HD Webcam Lens + Ambient Light Sensor
  const camX = canvas.width / 2;
  const camY = padTop / 2;

  // Camera lens ring
  ctx.beginPath();
  ctx.arc(camX, camY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#020305';
  ctx.fill();
  ctx.strokeStyle = '#232730';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Blue anti-reflective lens glint
  ctx.beginPath();
  ctx.arc(camX - 1.5, camY - 1.5, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();

  // Green camera indicator LED (subtle)
  ctx.beginPath();
  ctx.arc(camX + 22, camY, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#22c55e';
  ctx.shadowColor = '#22c55e';
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Stereo microphones
  ctx.fillStyle = '#050608';
  ctx.beginPath();
  ctx.arc(camX - 40, camY, 1.8, 0, Math.PI * 2);
  ctx.arc(camX + 40, camY, 1.8, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// 5. Modern Thunderbolt / USB-C Side Ports Texture
function generateModernSidePortsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#22252c';
  ctx.fillRect(0, 0, 1024, 64);

  // Slim Thunderbolt 4 / USB-C Oval Ports
  const drawTypeC = (x: number) => {
    ctx.beginPath();
    ctx.roundRect(x, 22, 46, 20, 10);
    ctx.fillStyle = '#090a0d';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Center contact pin plate
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 12, 28, 22, 8);
  };

  drawTypeC(140);
  drawTypeC(230);

  // MagSafe slim charge port
  ctx.beginPath();
  ctx.roundRect(50, 20, 56, 24, 6);
  ctx.fillStyle = '#090a0d';
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.stroke();

  // 3.5mm Headphone Jack
  ctx.beginPath();
  ctx.arc(360, 32, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#090a0d';
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}


// 4-Corner Homography Projective Transform for CSS matrix3d mapping
function getPerspectiveTransform(
  w: number, 
  h: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): string {
  const x0 = p0.x, y0 = p0.y;
  const x1 = p1.x, y1 = p1.y;
  const x2 = p2.x, y2 = p2.y;
  const x3 = p3.x, y3 = p3.y;

  const dx1 = x1 - x3;
  const dx2 = x2 - x3;
  const dy1 = y1 - y3;
  const dy2 = y2 - y3;

  const sx = x0 - x1 + x3 - x2;
  const sy = y0 - y1 + y3 - y2;

  let g = 0, h_val = 0;
  const det = dx1 * dy2 - dx2 * dy1;

  if (Math.abs(det) > 1e-8) {
    g = (sx * dy2 - sy * dx2) / det;
    h_val = (dx1 * sy - dy1 * sx) / det;
  }

  const a = x1 - x0 + g * x1;
  const b = x2 - x0 + h_val * x2;
  const c = x0;
  const d = y1 - y0 + g * y1;
  const e = y2 - y0 + h_val * y2;
  const f = y0;

  const m00 = a / w;
  const m10 = d / w;
  const m30 = g / w;

  const m01 = b / h;
  const m11 = e / h;
  const m31 = h_val / h;

  const m03 = c;
  const m13 = f;

  return `matrix3d(${m00}, ${m10}, 0, ${m30}, ${m01}, ${m11}, 0, ${m31}, 0, 0, 1, 0, ${m03}, ${m13}, 0, 1)`;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export const ThinkPadWorkstation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLidOpen, setIsLidOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [bootPhase, setBootPhase] = useState<'off' | 'splash' | 'booting' | 'ready'>('off');

  const [screenMounted, setScreenMounted] = useState<boolean>(false);
  const screenDomRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<{
    lidGroup: THREE.Group | null;
    screenMesh: THREE.Mesh | null;
    deskLampLight: THREE.SpotLight | null;
    camera: THREE.PerspectiveCamera | null;
    controls: OrbitControls | null;
  }>({
    lidGroup: null,
    screenMesh: null,
    deskLampLight: null,
    camera: null,
    controls: null
  });

  // Balanced cinematic camera presets (Showing full cozy desk, speakers, warm lamp, and accessories - Henry Heffernan style)
  const closedDeskCamPos = new THREE.Vector3(0, 3.40, 7.50);
  const closedDeskCamLook = new THREE.Vector3(0, 0.65, -0.40);

  const openDeskCamPos = new THREE.Vector3(0, 3.05, 7.10);
  const openDeskCamLook = new THREE.Vector3(0, 0.80, -0.50);

  // Directly facing the open laptop screen (perpendicular angle with subtle bezel frame)
  const focusedCamPos = new THREE.Vector3(0, 1.45, 1.68);
  const focusedCamLook = new THREE.Vector3(0, 1.15, -0.70);

  const cameraAnimRef = useRef({
    active: false,
    startPos: new THREE.Vector3(),
    startLook: new THREE.Vector3(),
    targetPos: new THREE.Vector3(),
    targetLook: new THREE.Vector3(),
    progress: 1
  });

  const glideCameraTo = useCallback((targetPos: THREE.Vector3, targetLook: THREE.Vector3) => {
    const cam = sceneRef.current.camera;
    const ctrl = sceneRef.current.controls;
    if (!cam || !ctrl) return;
    const anim = cameraAnimRef.current;
    anim.startPos.copy(cam.position);
    anim.startLook.copy(ctrl.target);
    anim.targetPos.copy(targetPos);
    anim.targetLook.copy(targetLook);
    anim.progress = 0;
    anim.active = true;
  }, []);

  useEffect(() => {
    if (!sceneRef.current.camera || !sceneRef.current.controls) return;
    if (!isLidOpen) {
      glideCameraTo(closedDeskCamPos, closedDeskCamLook);
    } else if (isFocused) {
      glideCameraTo(focusedCamPos, focusedCamLook);
    } else {
      glideCameraTo(openDeskCamPos, openDeskCamLook);
    }
  }, [isLidOpen, isFocused, glideCameraTo]);

  const stateRef = useRef({
    isLidOpen: false,
    isFocused: false,
    bootPhase: 'off' as 'off' | 'splash' | 'booting' | 'ready'
  });

  useEffect(() => {
    stateRef.current.isLidOpen = isLidOpen;
    stateRef.current.isFocused = isFocused;
    stateRef.current.bootPhase = bootPhase;
  }, [isLidOpen, isFocused, bootPhase]);

  // Open laptop handler
  const openLaptop = useCallback(() => {
    if (stateRef.current.isLidOpen) return;
    audioEngine.playLidOpenSound();
    setIsLidOpen(true);

    setBootPhase('splash');
    setTimeout(() => {
      setBootPhase('booting');
    }, 800);

    setTimeout(() => {
      audioEngine.playBootChime();
    }, 2000);

    setTimeout(() => {
      setBootPhase('ready');
      setIsFocused(true);
    }, 2900);
  }, []);

  // Close laptop handler
  const closeLaptop = useCallback(() => {
    if (!stateRef.current.isLidOpen) return;
    audioEngine.playLidCloseSound();
    setIsFocused(false);
    setIsLidOpen(false);
    setBootPhase('off');
  }, []);

  // Keyboard shortcut listener (Space to open, Esc to close/unfocus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space' && !stateRef.current.isLidOpen) {
        e.preventDefault();
        openLaptop();
      } else if (e.code === 'Escape') {
        if (stateRef.current.isFocused) {
          setIsFocused(false);
        } else if (stateRef.current.isLidOpen) {
          closeLaptop();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openLaptop, closeLaptop]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f1e8);
    scene.fog = new THREE.FogExp2(0xf6f1e8, 0.008);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 50);

    // Balanced camera views (Henry Heffernan cozy studio perspective)
    const closedDeskCamPos = new THREE.Vector3(0, 3.40, 7.50);
    const closedDeskCamLook = new THREE.Vector3(0, 0.65, -0.40);

    const openDeskCamPos = new THREE.Vector3(0, 3.05, 7.10);
    const openDeskCamLook = new THREE.Vector3(0, 0.80, -0.50);

    const focusedCamPos = new THREE.Vector3(0, 1.45, 1.68);
    const focusedCamLook = new THREE.Vector3(0, 1.15, -0.70);

    camera.position.copy(closedDeskCamPos);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '0';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(closedDeskCamLook);
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 1.2;
    controls.maxDistance = 12.0;

    sceneRef.current.camera = camera;
    sceneRef.current.controls = controls;

    // 2. Studio Lighting (Warm, architectural chiaroscuro)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.80);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd2, 1.35);
    keyLight.position.set(3.5, 6.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdde5ed, 0.45);
    fillLight.position.set(-4.5, 4.0, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffecd6, 0.50);
    rimLight.position.set(0, 4.5, -4.0);
    scene.add(rimLight);

    // Warm ambient point light softly illuminating the back wall & shelf
    const wallWashLight = new THREE.PointLight(0xfff3e0, 1.5, 12, 1.2);
    wallWashLight.position.set(0, 3.8, -1.2);
    scene.add(wallWashLight);

    // Warm Desk Lamp Spotlight
    const lampLight = new THREE.SpotLight(0xffd699, 2.8, 12, Math.PI / 4.2, 0.45, 1.2);
    lampLight.position.set(-2.8, 3.2, -0.8);
    lampLight.target.position.set(-0.2, 0.1, 0.1);
    lampLight.castShadow = true;
    scene.add(lampLight);
    scene.add(lampLight.target);
    sceneRef.current.deskLampLight = lampLight;

    // 3. Materials
    const walnutTex = generateRichWalnutDeskTexture();
    const deskMat = new THREE.MeshStandardMaterial({
      map: walnutTex,
      roughness: 0.45,
      metalness: 0.04
    });

    // Space Gray Anodized Aluminum Unibody Material
    const aluminumMat = new THREE.MeshPhysicalMaterial({
      color: 0x272a32,
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35
    });

    const outerLidTex = generateModernOuterLidTexture();
    const outerLidMat = new THREE.MeshStandardMaterial({
      map: outerLidTex,
      metalness: 0.82,
      roughness: 0.30
    });

    const keyboardDeckTex = generateModernKeyboardDeckTexture();
    const keyboardDeckMat = new THREE.MeshStandardMaterial({
      map: keyboardDeckTex,
      roughness: 0.35,
      metalness: 0.45
    });

    const bezelTex = generateModernBezelTexture();
    const bezelMat = new THREE.MeshStandardMaterial({
      map: bezelTex,
      roughness: 0.25,
      metalness: 0.1
    });

    const sidePortsTex = generateModernSidePortsTexture();
    const sidePortsMat = new THREE.MeshStandardMaterial({
      map: sidePortsTex,
      roughness: 0.4,
      metalness: 0.6
    });

    const unibodyHingeMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.35,
      metalness: 0.85
    });

    const porcelainMugMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f3ee,
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });

    const coffeeLiquidMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.12,
      metalness: 0.1
    });

    const wallTex = generateStudioWallTexture();
    const studioWallMat = new THREE.MeshBasicMaterial({
      map: wallTex
    });

    // 4. Environment Meshes
    // Main Walnut Desk Slab (Solid 40mm thick architectural top)
    const deskMesh = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.18, 5.4), deskMat);
    deskMesh.position.set(0, -0.09, 0);
    deskMesh.receiveShadow = true;
    deskMesh.castShadow = true;
    scene.add(deskMesh);

    // Smooth chamfered front rim of desk
    const frontRimGeo = new THREE.CylinderGeometry(0.04, 0.04, 9.6, 16);
    frontRimGeo.rotateZ(Math.PI / 2);
    const frontRim = new THREE.Mesh(frontRimGeo, deskMat);
    frontRim.position.set(0, -0.02, 2.7);
    scene.add(frontRim);

    // Architectural dark walnut baseboard trim
    const baseboardMat = new THREE.MeshStandardMaterial({
      color: 0x482d18,
      roughness: 0.55
    });
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(24, 0.28, 0.06), baseboardMat);
    baseboard.position.set(0, 0.10, -2.52);
    scene.add(baseboard);

    // Studio Back Wall (Warm sunlit architectural wall)
    const wallMesh = new THREE.Mesh(new THREE.PlaneGeometry(24, 14), studioWallMat);
    wallMesh.position.set(0, 4.0, -2.55);
    scene.add(wallMesh);

    // Studio Floor Plane (Warm architectural studio floor with soft shadows)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xd6ccbb,
      roughness: 0.85,
      metalness: 0.02
    });
    const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(28, 18), floorMat);
    floorMesh.position.set(0, -2.80, 2.0);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Matte Black Steel Trestle Desk Legs (Cleanly attached UNDER the 0.18m wood top)
    const steelLegMat = new THREE.MeshStandardMaterial({
      color: 0x16181e,
      roughness: 0.55,
      metalness: 0.85
    });
    // Underside of desk is at y = -0.18. Floor is at y = -2.80. Height = 2.62, Center = -1.49.
    [-3.8, 3.8].forEach((lx) => {
      const legA = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.62, 0.08), steelLegMat);
      legA.position.set(lx, -1.49, -1.8);
      legA.castShadow = true;
      scene.add(legA);

      const legB = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.62, 0.08), steelLegMat);
      legB.position.set(lx, -1.49, 1.8);
      legB.castShadow = true;
      scene.add(legB);

      const legCross = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3.6), steelLegMat);
      legCross.position.set(lx, -0.22, 0);
      scene.add(legCross);

      const footCross = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 3.8), steelLegMat);
      footCross.position.set(lx, -2.78, 0);
      scene.add(footCross);
    });



    // 5. Sleek Modern Unibody Laptop Assembly
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // (A) Laptop Base Chassis (Ultra-thin CNC unibody: 3.60 x 2.40 x 0.08)
    const baseW = 3.60;
    const baseD = 2.40;
    const baseH = 0.08;

    const baseChassisGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const baseChassis = new THREE.Mesh(baseChassisGeo, aluminumMat);
    baseChassis.position.set(0, baseH / 2, 0);
    baseChassis.castShadow = true;
    baseChassis.receiveShadow = true;
    laptopGroup.add(baseChassis);

    // Underside rubber feet
    const footMat = new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.9 });
    const footGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.012, 16);
    [
      [-baseW / 2 + 0.24, 0.006, -baseD / 2 + 0.22],
      [baseW / 2 - 0.24, 0.006, -baseD / 2 + 0.22],
      [-baseW / 2 + 0.24, 0.006, baseD / 2 - 0.22],
      [baseW / 2 - 0.24, 0.006, baseD / 2 - 0.22]
    ].forEach(([fx, fy, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, fy, fz);
      laptopGroup.add(foot);
    });

    // Left & Right Side USB-C / Thunderbolt Ports
    const sidePortsGeo = new THREE.PlaneGeometry(baseD - 0.2, 0.06);
    const leftPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    leftPortsMesh.position.set(-baseW / 2 - 0.001, baseH / 2, 0);
    leftPortsMesh.rotation.y = -Math.PI / 2;
    laptopGroup.add(leftPortsMesh);

    const rightPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    rightPortsMesh.position.set(baseW / 2 + 0.001, baseH / 2, 0);
    rightPortsMesh.rotation.y = Math.PI / 2;
    laptopGroup.add(rightPortsMesh);

    // (B) Keyboard Deck Top Plate (Includes centered chiclet keyboard & micro-drilled speakers)
    const deckGeo = new THREE.PlaneGeometry(baseW - 0.04, baseD - 0.04);
    const deckMesh = new THREE.Mesh(deckGeo, keyboardDeckMat);
    deckMesh.position.set(0, baseH + 0.002, 0);
    deckMesh.rotation.x = -Math.PI / 2;
    deckMesh.receiveShadow = true;
    laptopGroup.add(deckMesh);

    // (C) Large Precision Glass Trackpad (Centered Force Touch style)
    const padW = 1.45;
    const padD = 0.88;
    const padPlateGeo = new THREE.BoxGeometry(padW, 0.006, padD);
    const padPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2128,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 0.40,
      clearcoatRoughness: 0.25
    });
    const padPlate = new THREE.Mesh(padPlateGeo, padPlateMat);
    padPlate.position.set(0, baseH + 0.004, 0.65);
    padPlate.receiveShadow = true;
    laptopGroup.add(padPlate);

    // Trackpad diamond-cut hairline border highlight
    const padBorderGeo = new THREE.BoxGeometry(padW + 0.012, 0.002, padD + 0.012);
    const padBorderMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
    const padBorder = new THREE.Mesh(padBorderGeo, padBorderMat);
    padBorder.position.set(0, baseH + 0.003, 0.65);
    laptopGroup.add(padBorder);

    // (D) Continuous Hidden Unibody Hinge Bar
    const hingeGeo = new THREE.CylinderGeometry(0.038, 0.038, 2.70, 24);
    hingeGeo.rotateZ(Math.PI / 2);
    const hinge = new THREE.Mesh(hingeGeo, unibodyHingeMat);
    hinge.position.set(0, baseH + 0.012, -baseD / 2 + 0.12);
    hinge.castShadow = true;
    laptopGroup.add(hinge);

    // (E) Display Lid Assembly with Hinge Pivot
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, baseH + 0.012, -baseD / 2 + 0.12);
    laptopGroup.add(lidGroup);
    sceneRef.current.lidGroup = lidGroup;

    // Starts CLOSED flat over the base! (rotation.x = Math.PI / 2)
    lidGroup.rotation.x = Math.PI / 2;

    const lidW = 3.60;
    const lidH = 2.30;
    const lidThick = 0.036;

    // Outer Back Cover Base Box
    const lidBackGeo = new THREE.BoxGeometry(lidW, lidH, lidThick);
    const lidBack = new THREE.Mesh(lidBackGeo, aluminumMat);
    lidBack.position.set(0, lidH / 2, -lidThick / 2);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Dedicated Outer Lid Face Plane (Right-side up when closed)
    const outerLidMesh = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidH), outerLidMat);
    outerLidMesh.position.set(0, lidH / 2, -lidThick - 0.001);
    outerLidMesh.rotation.y = Math.PI;
    outerLidMesh.rotation.z = Math.PI;
    lidGroup.add(outerLidMesh);

    // Inner Display Bezel
    const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidH), bezelMat);
    bezelMesh.position.set(0, lidH / 2, 0.001);
    lidGroup.add(bezelMesh);

    // Matte LCD Screen Backplate
    const screenW = 3.42;
    const screenH = 2.16;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, lidH / 2 - 0.01, 0.004);
    lidGroup.add(screenMesh);
    sceneRef.current.screenMesh = screenMesh;
    setScreenMounted(true);

    // (F) Cozy Studio Desk Accessories (Warm, tactile, calming setup)

    // 1. Studio Audio Reference Monitors (Left & Right - Henry Heffernan inspired)
    const createSpeaker = (x: number, z: number, rotY: number) => {
      const spkGroup = new THREE.Group();
      spkGroup.position.set(x, 0.015, z);
      spkGroup.rotation.y = rotY;

      // Cabinet (Matte Nordic Slate)
      const cab = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.82, 0.54),
        new THREE.MeshStandardMaterial({ color: 0x1e2128, roughness: 0.35, metalness: 0.2 })
      );
      cab.position.set(0, 0.41, 0);
      cab.castShadow = true;
      cab.receiveShadow = true;
      spkGroup.add(cab);

      // Woofer driver (Gold/brass Kevlar cone)
      const wooferRim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.02, 24),
        new THREE.MeshStandardMaterial({ color: 0x0c0e12, roughness: 0.8 })
      );
      wooferRim.rotation.x = Math.PI / 2;
      wooferRim.position.set(0, 0.30, 0.272);
      spkGroup.add(wooferRim);

      const wooferCone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.02, 24),
        new THREE.MeshStandardMaterial({ color: 0xc8963e, roughness: 0.35, metalness: 0.75 })
      );
      wooferCone.rotation.x = Math.PI / 2;
      wooferCone.position.set(0, 0.30, 0.278);
      spkGroup.add(wooferCone);

      const dustCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x101216, roughness: 0.6 })
      );
      dustCap.position.set(0, 0.30, 0.288);
      spkGroup.add(dustCap);

      // Tweeter
      const tweeterRim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.015, 20),
        new THREE.MeshStandardMaterial({ color: 0x0c0e12, roughness: 0.8 })
      );
      tweeterRim.rotation.x = Math.PI / 2;
      tweeterRim.position.set(0, 0.58, 0.272);
      spkGroup.add(tweeterRim);

      const tweeterDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x242834, roughness: 0.2, metalness: 0.8 })
      );
      tweeterDome.position.set(0, 0.58, 0.278);
      spkGroup.add(tweeterDome);

      // Subtle cyan power LED dot
      const pwrLed = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.005, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      pwrLed.rotation.x = Math.PI / 2;
      pwrLed.position.set(0, 0.08, 0.273);
      spkGroup.add(pwrLed);

      // Angled isolation wedge under speaker
      const wedge = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, 0.035, 0.50),
        new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.9 })
      );
      wedge.position.set(0, 0.018, 0);
      spkGroup.add(wedge);

      return spkGroup;
    };

    const leftSpeaker = createSpeaker(-2.45, -0.05, 0.32);
    scene.add(leftSpeaker);

    const rightSpeaker = createSpeaker(2.45, -0.05, -0.32);
    scene.add(rightSpeaker);

    // 2. Refined Wool Felt Desk Mat (Centered under laptop, leaving warm walnut wood exposed)
    const deskMatGeo = new THREE.BoxGeometry(2.90, 0.012, 1.35);
    const woolFeltMat = new THREE.MeshStandardMaterial({
      color: 0x272a31,
      roughness: 0.88,
      metalness: 0.03
    });
    const deskMatMesh = new THREE.Mesh(deskMatGeo, woolFeltMat);
    deskMatMesh.position.set(0, 0.006, 0.38);
    deskMatMesh.receiveShadow = true;
    scene.add(deskMatMesh);

    // Stitched edge border for desk mat
    const matBorderGeo = new THREE.BoxGeometry(2.94, 0.008, 1.39);
    const matBorderMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, roughness: 0.9 });
    const matBorderMesh = new THREE.Mesh(matBorderGeo, matBorderMat);
    matBorderMesh.position.set(0, 0.003, 0.38);
    matBorderMesh.receiveShadow = true;
    scene.add(matBorderMesh);

    // 3. Minimalist Ergonomic Studio Wireless Mouse (on right of desk mat)
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(2.15, 0.015, 0.55);
    scene.add(mouseGroup);

    const mouseBodyGeo = new THREE.BoxGeometry(0.28, 0.075, 0.46);
    const mouseMat = new THREE.MeshPhysicalMaterial({
      color: 0x242730,
      metalness: 0.35,
      roughness: 0.30,
      clearcoat: 0.25
    });
    const mouseBody = new THREE.Mesh(mouseBodyGeo, mouseMat);
    mouseBody.position.set(0, 0.038, 0);
    mouseBody.castShadow = true;
    mouseBody.receiveShadow = true;
    mouseGroup.add(mouseBody);

    // Mouse scroll wheel
    const wheelGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.03, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
    const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
    wheelMesh.position.set(0, 0.076, -0.10);
    mouseGroup.add(wheelMesh);

    // 4. Designer Articulated Architect Desk Lamp (Back left with warm glow)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-2.85, 0.015, -0.75);
    scene.add(lampGroup);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xb5935b,
      metalness: 0.82,
      roughness: 0.32
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x22242a,
      metalness: 0.75,
      roughness: 0.35
    });

    // Lamp circular base
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.05, 28), brassMat);
    lampBase.position.set(0, 0.025, 0);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Lower arm
    const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.25, 16), darkMetalMat);
    lowerArm.position.set(0.12, 0.62, 0.08);
    lowerArm.rotation.z = -0.25;
    lowerArm.castShadow = true;
    lampGroup.add(lowerArm);

    // Middle elbow joint
    const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), brassMat);
    elbowJoint.position.set(0.28, 1.20, 0.16);
    lampGroup.add(elbowJoint);

    // Upper arm angling towards center of desk
    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.15, 16), darkMetalMat);
    upperArm.position.set(0.68, 1.55, 0.26);
    upperArm.rotation.z = -1.15;
    upperArm.rotation.y = 0.32;
    upperArm.castShadow = true;
    lampGroup.add(upperArm);

    // Lamp shade joint & bell shade
    const lampHeadGroup = new THREE.Group();
    lampHeadGroup.position.set(1.18, 1.72, 0.42);
    lampGroup.add(lampHeadGroup);

    const shadeGeo = new THREE.ConeGeometry(0.24, 0.34, 24, 1, true);
    shadeGeo.rotateZ(0.45);
    shadeGeo.rotateX(-0.25);
    const shadeMesh = new THREE.Mesh(shadeGeo, darkMetalMat);
    shadeMesh.castShadow = true;
    lampHeadGroup.add(shadeMesh);

    // Glowing warm bulb interior
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), bulbMat);
    bulbMesh.position.set(-0.04, -0.08, 0.03);
    lampHeadGroup.add(bulbMesh);

    // 5. Ceramic Potted Botanical Plant (Left side, brings calming life)
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-2.05, 0.015, 0.35);
    scene.add(plantGroup);

    // Terracotta stoneware ceramic pot with saucer
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xc46848,
      roughness: 0.65,
      metalness: 0.02
    });
    const potMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.38, 24), terracottaMat);
    potMesh.position.set(0, 0.19, 0);
    potMesh.castShadow = true;
    potMesh.receiveShadow = true;
    plantGroup.add(potMesh);

    // Saucer base
    const saucerMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.04, 24), terracottaMat);
    saucerMesh.position.set(0, 0.02, 0);
    plantGroup.add(saucerMesh);

    // Potting soil
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x1f1610, roughness: 0.95 });
    const soilMesh = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), soilMat);
    soilMesh.position.set(0, 0.36, 0);
    soilMesh.rotation.x = -Math.PI / 2;
    plantGroup.add(soilMesh);

    // Organic green succulent rosette leaves
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3b6b47,
      roughness: 0.40,
      metalness: 0.06,
      side: THREE.DoubleSide
    });
    const leafGeo = new THREE.ConeGeometry(0.08, 0.36, 8);
    leafGeo.rotateX(Math.PI / 2);

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(
        Math.cos(angle) * 0.11,
        0.39 + (i % 3) * 0.03,
        Math.sin(angle) * 0.11
      );
      leaf.rotation.y = angle;
      leaf.rotation.x = 0.50 + (i % 2) * 0.20;
      leaf.castShadow = true;
      plantGroup.add(leaf);
    }

    // 6. Hardcover Studio Journal & Brass Drafting Pen
    const notebookGroup = new THREE.Group();
    notebookGroup.position.set(-1.85, 0.015, 0.95);
    notebookGroup.rotation.y = 0.10;
    scene.add(notebookGroup);

    // Linen hardcover cover
    const bookCoverMat = new THREE.MeshStandardMaterial({ color: 0x223628, roughness: 0.75 });
    const bookCover = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.038, 0.96), bookCoverMat);
    bookCover.position.set(0, 0.019, 0);
    bookCover.castShadow = true;
    bookCover.receiveShadow = true;
    notebookGroup.add(bookCover);

    // Cream paper pages edge
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xf5eedd, roughness: 0.9 });
    const bookPages = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.030, 0.92), pagesMat);
    bookPages.position.set(0.015, 0.019, 0);
    notebookGroup.add(bookPages);

    // Brass drafting pen resting on notebook
    const penMat = new THREE.MeshStandardMaterial({ color: 0xc49d58, metalness: 0.85, roughness: 0.25 });
    const penGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.62, 12);
    penGeo.rotateZ(Math.PI / 2);
    const penMesh = new THREE.Mesh(penGeo, penMat);
    penMesh.position.set(0.18, 0.045, -0.05);
    penMesh.rotation.y = 0.08;
    penMesh.castShadow = true;
    notebookGroup.add(penMesh);

    // 7. Glazed Ceramic Coffee Mug on Natural Cork Coaster
    const corkMat = new THREE.MeshStandardMaterial({ color: 0xa87c4f, roughness: 0.85 });
    const coasterGeo = new THREE.CylinderGeometry(0.24, 0.25, 0.016, 24);
    const coasterMesh = new THREE.Mesh(coasterGeo, corkMat);
    coasterMesh.position.set(1.95, 0.008, 0.05);
    coasterMesh.receiveShadow = true;
    scene.add(coasterMesh);

    const mugGroup = new THREE.Group();
    mugGroup.position.set(1.95, 0.016, 0.05);
    scene.add(mugGroup);

    const stonewareMat = new THREE.MeshPhysicalMaterial({
      color: 0xeeebe2,
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15
    });
    const mugOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.38, 28), stonewareMat);
    mugOuter.position.set(0, 0.19, 0);
    mugOuter.castShadow = true;
    mugGroup.add(mugOuter);

    const coffeeLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), coffeeLiquidMat);
    coffeeLiquid.position.set(0, 0.35, 0);
    coffeeLiquid.rotation.x = -Math.PI / 2;
    mugGroup.add(coffeeLiquid);

    const handleGeo = new THREE.TorusGeometry(0.11, 0.028, 12, 24, Math.PI);
    const handleMesh = new THREE.Mesh(handleGeo, stonewareMat);
    handleMesh.position.set(0.19, 0.19, 0);
    handleMesh.rotation.y = Math.PI / 2;
    mugGroup.add(handleMesh);

    // 8. Studio Back Wall: Floating Wooden Shelf with Books, Clock & Art Print
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x54341b, roughness: 0.55 });
    const shelfGeo = new THREE.BoxGeometry(5.2, 0.05, 0.40);
    const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    shelfMesh.position.set(0, 2.05, -2.35);
    shelfMesh.castShadow = true;
    shelfMesh.receiveShadow = true;
    scene.add(shelfMesh);

    // Shelf metal brackets
    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.6, metalness: 0.8 });
    [-1.8, 1.8].forEach((bx) => {
      const br = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.38), bracketMat);
      br.position.set(bx, 1.94, -2.35);
      scene.add(br);
    });

    // Framed minimalist architectural line art print (Terracotta Sun & Sage Arch)
    const artPrintTex = generateArtPrintTexture();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.4 });
    const frameGeo = new THREE.BoxGeometry(0.85, 0.95, 0.04);
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(-0.95, 2.53, -2.33);
    frameMesh.rotation.x = -0.04;
    frameMesh.castShadow = true;
    scene.add(frameMesh);

    const artCanvasMat = new THREE.MeshBasicMaterial({ map: artPrintTex });
    const artCanvas = new THREE.Mesh(new THREE.PlaneGeometry(0.77, 0.87), artCanvasMat);
    artCanvas.position.set(-0.95, 2.53, -2.308);
    artCanvas.rotation.x = -0.04;
    scene.add(artCanvas);

    // 4 Studio Hardcover Books
    const books = [
      { color: 0x7c2d2d, h: 0.62 }, // Rust Red
      { color: 0x224a38, h: 0.58 }, // Pine Green
      { color: 0x2d436b, h: 0.64 }, // Slate Blue
      { color: 0xb58032, h: 0.55 }  // Ochre Amber
    ];
    books.forEach((b, idx) => {
      const bMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.7 });
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, b.h, 0.28), bMat);
      bMesh.position.set(0.65 + idx * 0.14, 2.05 + b.h / 2, -2.33);
      bMesh.castShadow = true;
      scene.add(bMesh);
    });

    // Analog Brass Studio Desk Clock
    const clockMat = new THREE.MeshStandardMaterial({ color: 0xb89248, roughness: 0.3, metalness: 0.85 });
    const clockBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24), clockMat);
    clockBody.rotation.x = Math.PI / 2;
    clockBody.position.set(1.55, 2.22, -2.32);
    scene.add(clockBody);

    const clockFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 24),
      new THREE.MeshBasicMaterial({ color: 0xfdfcf9 })
    );
    clockFace.position.set(1.55, 2.22, -2.29);
    scene.add(clockFace);

    // Trailing Pothos Plant on Shelf (with stoneware planter pot and connected vine stem)
    const shelfPlanter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.09, 0.16, 20),
      stonewareMat
    );
    shelfPlanter.position.set(-2.05, 2.16, -2.25);
    shelfPlanter.castShadow = true;
    scene.add(shelfPlanter);

    const shelfSoil = new THREE.Mesh(
      new THREE.CircleGeometry(0.11, 16),
      new THREE.MeshStandardMaterial({ color: 0x1f1610, roughness: 0.95 })
    );
    shelfSoil.rotation.x = -Math.PI / 2;
    shelfSoil.position.set(-2.05, 2.24, -2.25);
    scene.add(shelfSoil);

    // Cascading trailing green vine with continuous stem
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x2f5e3b, roughness: 0.5, side: THREE.DoubleSide });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x244a2e, roughness: 0.7 });
    for (let v = 0; v < 7; v++) {
      const vx = -2.05 + Math.sin(v * 0.7) * 0.05;
      const vy = 2.16 - v * 0.075;
      const vz = -2.18 + v * 0.015;

      const stemSeg = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.08, 8), stemMat);
      stemSeg.position.set(vx, vy, vz);
      stemSeg.rotation.z = Math.sin(v * 0.8) * 0.25;
      scene.add(stemSeg);

      const leaf = new THREE.Mesh(new THREE.CircleGeometry(0.042, 8), vineMat);
      leaf.position.set(vx + 0.025, vy - 0.015, vz + 0.01);
      leaf.rotation.x = 0.3 + v * 0.1;
      leaf.rotation.z = Math.sin(v) * 0.4;
      scene.add(leaf);
    }

    // 6. Interaction Raycaster (Clicking laptop when closed opens it!)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      // 1. Lamp click toggles lamp with click sound
      const lampHit = raycaster.intersectObjects([lampGroup], true);
      if (lampHit.length > 0) {
        toggleLamp();
        return;
      }

      // 2. Mug click plays ceramic clink sound
      const mugHit = raycaster.intersectObjects([mugGroup], true);
      if (mugHit.length > 0) {
        audioEngine.playCupClink();
        return;
      }

      // 3. Speaker click plays tactile acoustic feedback
      const speakerHit = raycaster.intersectObjects([leftSpeaker, rightSpeaker], true);
      if (speakerHit.length > 0) {
        audioEngine.playKeyClick();
        return;
      }

      // 3. Laptop & Notebook click
      if (!stateRef.current.isLidOpen) {
        const intersects = raycaster.intersectObjects([laptopGroup, notebookGroup], true);
        if (intersects.length > 0) {
          openLaptop();
        }
      } else {
        const intersects = raycaster.intersectObject(screenMesh);
        if (intersects.length > 0) {
          audioEngine.playKeyClick();
          setIsFocused(true);
        }
      }
    };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(mouse, camera);

      const lampHit = raycaster.intersectObjects([lampGroup], true);
      const mugHit = raycaster.intersectObjects([mugGroup], true);
      if (lampHit.length > 0 || mugHit.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
        return;
      }

      if (!stateRef.current.isLidOpen) {
        const intersects = raycaster.intersectObjects([laptopGroup, notebookGroup], true);
        renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
      } else {
        const intersects = raycaster.intersectObject(screenMesh);
        renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);
    renderer.domElement.addEventListener('mousemove', handleCanvasMouseMove);

    // 8. Animation & Render Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth physical lid rotation
      const targetLidRotX = stateRef.current.isLidOpen ? -0.22 : Math.PI / 2;
      lidGroup.rotation.x = THREE.MathUtils.lerp(lidGroup.rotation.x, targetLidRotX, 0.08);

      // Smooth camera glide
      if (cameraAnimRef.current.active) {
        const anim = cameraAnimRef.current;
        anim.progress += 0.038;
        if (anim.progress >= 1) {
          anim.progress = 1;
          anim.active = false;
          camera.position.copy(anim.targetPos);
          controls.target.copy(anim.targetLook);
        } else {
          const t = anim.progress;
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          camera.position.lerpVectors(anim.startPos, anim.targetPos, ease);
          controls.target.lerpVectors(anim.startLook, anim.targetLook, ease);
        }
      }
      controls.update();

      // Project 3D Screen to DOM in real-time
      if (screenDomRef.current && container) {
        if (!stateRef.current.isLidOpen) {
          screenDomRef.current.style.display = 'none';
        } else {
          // Check screen normal angle
          const screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(screenMesh.getWorldQuaternion(new THREE.Quaternion()));
          const screenPos = screenMesh.getWorldPosition(new THREE.Vector3());
          const toCam = camera.position.clone().sub(screenPos).normalize();
          const dot = screenNormal.dot(toCam);

          if (dot <= 0.02) {
            screenDomRef.current.style.display = 'none';
          } else {
            screenDomRef.current.style.display = 'block';

            const w = container.clientWidth;
            const h = container.clientHeight;

            const halfW = screenW / 2;
            const halfH = screenH / 2;

            // Project 4 corners
            const p0_v = new THREE.Vector3(-halfW, halfH, 0.001).applyMatrix4(screenMesh.matrixWorld).project(camera);
            const p1_v = new THREE.Vector3(halfW, halfH, 0.001).applyMatrix4(screenMesh.matrixWorld).project(camera);
            const p2_v = new THREE.Vector3(-halfW, -halfH, 0.001).applyMatrix4(screenMesh.matrixWorld).project(camera);
            const p3_v = new THREE.Vector3(halfW, -halfH, 0.001).applyMatrix4(screenMesh.matrixWorld).project(camera);

            const p0 = { x: (p0_v.x * 0.5 + 0.5) * w, y: (-(p0_v.y * 0.5) + 0.5) * h };
            const p1 = { x: (p1_v.x * 0.5 + 0.5) * w, y: (-(p1_v.y * 0.5) + 0.5) * h };
            const p2 = { x: (p2_v.x * 0.5 + 0.5) * w, y: (-(p2_v.y * 0.5) + 0.5) * h };
            const p3 = { x: (p3_v.x * 0.5 + 0.5) * w, y: (-(p3_v.y * 0.5) + 0.5) * h };

            screenDomRef.current.style.transform = getPerspectiveTransform(1280, 808, p0, p1, p2, p3);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
          };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener('mousemove', handleCanvasMouseMove);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      wallTex.dispose();
      artPrintTex.dispose();
      walnutTex.dispose();
      outerLidTex.dispose();
      keyboardDeckTex.dispose();
      bezelTex.dispose();
      sidePortsTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
    };
  }, [openLaptop]);

  // Desk Lamp toggle
  const toggleLamp = () => {
    audioEngine.playSwitchClick();
    setLampOn((prev) => {
      const next = !prev;
      if (sceneRef.current.deskLampLight) {
        sceneRef.current.deskLampLight.intensity = next ? 3.2 : 0.0;
      }
      return next;
    });
  };

  // Sound toggle
  const toggleSound = () => {
    audioEngine.enabled = !audioEngine.enabled;
    setSoundEnabled(audioEngine.enabled);
  };

  // Focus view toggle
  const toggleFocus = () => {
    audioEngine.playKeyClick();
    if (!isLidOpen) {
      openLaptop();
    } else {
      setIsFocused((prev) => !prev);
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#14161a]">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Prompt for Closed Laptop */}
      {!isLidOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <button
            onClick={openLaptop}
            className="group flex flex-col items-center gap-3 px-8 py-5 bg-[#141413]/95 hover:bg-[#1e1e1c] border border-[#383734] hover:border-[#264233] text-[#FBFBF9] rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#264233] animate-pulse" />
              <span className="font-mono font-bold text-xs tracking-widest text-[#FBFBF9] uppercase">Studio Workstation 16"</span>
            </div>
            <div className="text-xs text-[#A8A29E] flex items-center gap-2 font-mono">
              <span>Click laptop or press</span>
              <kbd className="px-2 py-0.5 bg-[#262523] rounded text-[11px] font-bold text-[#FBFBF9] border border-[#44423D] shadow-xs">SPACE</kbd>
              <span>to open workstation</span>
            </div>
          </button>
        </div>
      )}

      {/* 3D In-Screen Linux Desktop OS via CSS3D React Portal */}
      {/* 3D In-Screen Linux Desktop OS (Perspective Projected onto 3D laptop screen) */}
      <div
        ref={screenDomRef}
        id="css3d-laptop-screen"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1280px',
          height: '808px',
          transformOrigin: '0 0',
          display: 'none',
          zIndex: 10,
          pointerEvents: 'auto',
          borderRadius: '2px',
          overflow: 'hidden'
        }}
        onMouseDown={(e) => {
          if (stateRef.current.isFocused) {
            e.stopPropagation();
          }
        }}
      >
        {/* Boot Splash / Loading Screens */}
        {bootPhase === 'splash' && (
          <div className="absolute inset-0 z-50 bg-black text-[#c0c0c0] p-8 font-mono text-[13px] leading-[20px] select-none flex flex-col justify-between">
            <div>
              {/* Header with EPA Energy Star Badge */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-white font-bold">Award Modular BIOS v4.51PG, An Energy Star Ally</div>
                  <div>Copyright (C) 1984-98, Award Software, Inc.</div>
                  <div className="text-[#888888] pt-1">ASUS P2B ACPI BIOS Revision 1012</div>
                </div>

                {/* EPA Energy Star Retro Badge */}
                <div className="border-2 border-[#00d0ff] bg-[#000080]/60 px-3 py-1.5 text-center leading-tight shadow-md">
                  <div className="text-[#00ffff] font-bold text-sm tracking-wider">energy</div>
                  <div className="text-[#ffff00] tracking-widest text-[8px] mt-0.5 font-bold">EPA POLLUTION PREVENTER</div>
                </div>
              </div>

              {/* Hardware Detection List */}
              <div className="mt-8 space-y-1">
                <div><span className="text-white font-bold">PENTIUM-II CPU at 450MHz</span></div>
                <div>Memory Test :  <span className="text-white font-bold">131072K OK</span></div>
                <div className="pt-2 text-[#888888]">Award Plug and Play BIOS Extension v1.0A</div>
                <div className="text-[#888888]">Initialize Plug and Play Cards...</div>
                <div className="pt-2 text-white">Detecting IDE Primary Master   ... <span className="text-[#39ff14]">WDC AC34300L (4.3 GB)</span></div>
                <div className="text-white">Detecting IDE Primary Slave    ... <span className="text-[#39ff14]">ATAPI CD-ROM 48X</span></div>
                <div className="text-[#666666]">Detecting IDE Secondary Master ... None</div>
                <div className="text-[#666666]">Detecting IDE Secondary Slave  ... None</div>
              </div>
            </div>

            {/* Bottom Status Prompt */}
            <div className="pt-4 border-t border-[#333333] flex justify-between items-center text-xs text-[#888888]">
              <span className="animate-pulse text-white">Press DEL to enter SETUP, ESC to skip memory test</span>
              <span className="font-mono text-[11px]">10/25/1998-i440BX-W977-2A69KD4AC-00</span>
            </div>
          </div>
        )}

        {bootPhase === 'booting' && (
          <div className="absolute inset-0 w-full h-full z-50 bg-[#008080] flex flex-col items-center justify-between py-12 select-none overflow-hidden">
            <style>{`
              @keyframes win98BarSlide {
                0% { transform: translateX(-120%); }
                100% { transform: translateX(350%); }
              }
              .win98-boot-glow {
                animation: win98BarSlide 1.4s ease-in-out infinite;
              }
            `}</style>

            {/* Nostalgic Cloud Backdrop */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 35%, #468ee5 0%, #1c5ba6 45%, #0f3d75 80%, #082142 100%)'
              }}
            />

            {/* Subtle atmospheric cloud texture overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)]" />

            <div className="relative z-10 w-full" />

            {/* Windows 98 Center Brand Graphic */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              {/* Flying 4-Color Windows Flag */}
              <div className="relative flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 gap-2 transform -rotate-12">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b] to-[#dc2626] rounded-tl-xl shadow-md border-t border-l border-white/40" />
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4ade80] to-[#16a34a] rounded-tr-xl shadow-md border-t border-r border-white/40" />
                  <div className="w-12 h-12 bg-gradient-to-br from-[#38bdf8] to-[#2563eb] rounded-bl-xl shadow-md border-b border-l border-white/40" />
                  <div className="w-12 h-12 bg-gradient-to-br from-[#fde047] to-[#d97706] rounded-br-xl shadow-md border-b border-r border-white/40" />
                </div>
              </div>

              {/* WINOWS98 Typography */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-white/90 text-sm font-sans tracking-[0.28em] uppercase font-bold">
                  MOGRO SOFT<sup className="text-[10px]">®</sup>
                </span>
                <h1 className="text-5xl font-black italic tracking-wide text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] font-sans">
                  WINOWS<span className="text-[#38bdf8] font-normal not-italic ml-1">98</span>
                </h1>
                <div className="mt-1 flex items-center space-x-2 text-white/80 text-xs font-semibold tracking-widest uppercase">
                  <span>Second Edition</span>
                  <span>&bull;</span>
                  <span>wyacoomz workstation</span>
                </div>
              </div>
            </div>

            {/* Bottom: Animated Retro WINOWS98 Gradient Progress Bar */}
            <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center space-y-2">
              <div className="text-[12px] font-sans text-white/90 tracking-wide font-medium">
                Starting WINOWS98...
              </div>

              {/* Inset Beveled Progress Track */}
              <div className="w-full h-4 bg-[#0a1828] border-t-2 border-l-2 border-t-[#000000] border-l-[#000000] border-r-2 border-b-2 border-r-[#60a0e0] border-b-[#60a0e0] p-[2px] overflow-hidden rounded-none relative">
                <div
                  className="win98-boot-glow h-full w-24 rounded-xs"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #00ffff 30%, #ffffff 50%, #00ffff 70%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Real Interactive Windows 98 Desktop OS */}
        {bootPhase === 'ready' && (
          <LinuxDesktopOS
            onPlayKeyClick={() => audioEngine.playKeyClick()}
            onExitFocus={() => setIsFocused(false)}
            onCloseLaptop={closeLaptop}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            isStandaloneOverlay={false}
          />
        )}

        {/* Click to Focus Shield in Desk View */}
        {!isFocused && isLidOpen && bootPhase === 'ready' && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              audioEngine.playKeyClick();
              setIsFocused(true);
            }}
            className="absolute inset-0 z-40 cursor-pointer bg-[#264233]/0 hover:bg-[#264233]/10 transition-colors flex items-center justify-center group"
            title="Click to Zoom in on Screen"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 px-4 py-2 rounded-full bg-[#141413]/90 text-[#FBFBF9] border border-[#264233] text-xs font-mono font-medium shadow-2xl flex items-center space-x-2 backdrop-blur-sm">
              <ZoomIn className="w-3.5 h-3.5 text-[#264233]" />
              <span>Click Screen to Focus</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Header Pill & Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto flex items-center space-x-3">
        <a
          href="http://localhost:3000"
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#F4F2EB]/95 hover:bg-[#FFFFFF] text-[#141413] border border-[#DCD9CF] rounded-xs text-xs font-mono backdrop-blur-sm transition-all shadow-sm"
          title="Return to Editorial Journal Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#264233]" />
          <span className="font-semibold">Editorial Portfolio</span>
        </a>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[#F4F2EB]/95 border border-[#DCD9CF] rounded-xs text-xs font-mono text-[#575653] backdrop-blur-sm shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isLidOpen ? 'bg-[#264233]' : 'bg-[#8B4513] animate-pulse'}`} />
          <span className="font-semibold text-[#141413]">STUDIO ULTRABOOK 16"</span>
          <span>&bull;</span>
          <span className="text-[#264233] font-medium">{isLidOpen ? 'OPEN (ACTIVE)' : 'CLOSED (SLEEP)'}</span>
        </div>
      </div>

      {/* Top Right Tool Bar */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center space-x-2">
        {/* Open / Close Laptop Button */}
        <button
          onClick={isLidOpen ? closeLaptop : openLaptop}
          className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-xs text-xs font-mono transition-all backdrop-blur-sm shadow-sm ${
            isLidOpen 
              ? 'bg-[#F4F2EB]/95 hover:bg-[#FFFFFF] text-[#141413] border-[#DCD9CF]' 
              : 'bg-[#264233] hover:bg-[#1a3024] text-white border-[#1a3024]'
          }`}
          title={isLidOpen ? 'Close Laptop Lid' : 'Open Laptop Lid'}
        >
          <Laptop className={`w-3.5 h-3.5 ${isLidOpen ? 'text-[#264233]' : 'text-white'}`} />
          <span>{isLidOpen ? 'Close Laptop' : 'Open Laptop'}</span>
        </button>

        {/* Focus / Desk View Toggle */}
        {isLidOpen && (
          <button
            onClick={toggleFocus}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F4F2EB]/95 hover:bg-[#FFFFFF] text-[#141413] border border-[#DCD9CF] rounded-xs text-xs font-mono backdrop-blur-sm transition-all shadow-sm"
            title={isFocused ? 'Switch to Desk View' : 'Focus Screen'}
          >
            {isFocused ? <ZoomOut className="w-3.5 h-3.5 text-[#264233]" /> : <ZoomIn className="w-3.5 h-3.5 text-[#264233]" />}
            <span>{isFocused ? 'Desk View' : 'Focus Screen'}</span>
          </button>
        )}

        {/* Lamp Toggle */}
        <button
          onClick={toggleLamp}
          className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-xs text-xs font-mono transition-all backdrop-blur-sm shadow-sm ${
            lampOn
              ? 'bg-[#E8EFEA] text-[#264233] border-[#C2D7CB]'
              : 'bg-[#F4F2EB]/95 text-[#888680] border-[#DCD9CF]'
          }`}
          title={lampOn ? 'Turn Off Lamp' : 'Turn On Lamp'}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lampOn ? 'Lamp On' : 'Lamp Off'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-1.5 border rounded-xs text-xs font-mono transition-all backdrop-blur-sm shadow-sm ${
            soundEnabled
              ? 'bg-[#F4F2EB]/95 text-[#264233] border-[#DCD9CF]'
              : 'bg-[#F4F2EB]/95 text-[#888680] border-[#DCD9CF]'
          }`}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Precision Audio'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Info Toggle */}
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          className="p-1.5 bg-[#F4F2EB]/95 hover:bg-[#FFFFFF] text-[#575653] hover:text-[#141413] border border-[#DCD9CF] rounded-xs transition-all backdrop-blur-sm shadow-sm"
          title="Hardware Specifications"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-4 py-1.5 bg-[#F4F2EB]/95 border border-[#DCD9CF] rounded-full text-[11px] font-mono text-[#575653] backdrop-blur-sm shadow-sm flex items-center space-x-3">
          {!isLidOpen ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#264233] animate-pulse" />
              <span>Click the laptop or press <kbd className="text-[#264233] font-bold">SPACE</kbd> to open workstation</span>
              <span className="text-[#DCD9CF]">&bull;</span>
              <span>Drag to orbit 3D desk</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#264233]" />
              <span>Click screen or apps to interact</span>
              <span className="text-[#DCD9CF]">&bull;</span>
              <span>Press <kbd className="text-[#264233] font-bold">ESC</kbd> to return to desk</span>
              <span className="text-[#DCD9CF]">&bull;</span>
              <span>Drag to orbit 3D view</span>
            </>
          )}
        </div>
      </div>

      {/* Hardware Specifications Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DCD9CF] rounded-xs shadow-2xl p-5 text-xs font-mono text-[#141413]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D8]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#264233]" />
                <h3 className="font-serif font-bold text-sm text-[#141413]">Studio Ultrabook Unibody 16"</h3>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-[#888680] hover:text-[#141413] text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-2 text-[#575653]">
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Architecture:</span>
                <span className="text-[#141413] font-semibold">CNC Machined Anodized Aluminum</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Display:</span>
                <span className="text-[#141413] font-semibold">16.0" Liquid Retina Edge-to-Edge (16:10)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Audio:</span>
                <span className="text-[#141413] font-semibold">Dual CNC Micro-Drilled Acoustic Grilles</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Trackpad:</span>
                <span className="text-[#141413] font-semibold">Precision Satin Glass Surface</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Developer:</span>
                <span className="text-[#264233] font-semibold">Abdul Samad Khan (wyacoomz)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE7DD]">
                <span>Role:</span>
                <span className="text-[#141413] font-semibold">RPA & Full-Stack Developer @ Trufe</span>
              </div>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-5 w-full py-2 bg-[#264233] hover:bg-[#1a3024] text-white font-semibold rounded-xs text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
