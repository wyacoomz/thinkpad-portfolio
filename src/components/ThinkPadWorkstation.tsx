import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ZoomIn, ZoomOut, RotateCcw, Lightbulb, Terminal, Play, 
  Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Info,
  LayoutGrid, FileText, CheckCircle2, ChevronRight, Download
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

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
      snap.frequency.setValueAtTime(2000 + (Math.random() - 0.5) * 260, t);
      snap.frequency.exponentialRampToValueAtTime(160, t + 0.022);
      snapGain.gain.setValueAtTime(0.08, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.025);

      // Low tactile thock
      const thock = this.ctx.createOscillator();
      const thockGain = this.ctx.createGain();
      thock.type = 'sine';
      thock.frequency.setValueAtTime(230 + (Math.random() - 0.5) * 35, t);
      thock.frequency.exponentialRampToValueAtTime(50, t + 0.036);
      thockGain.gain.setValueAtTime(0.12, t);
      thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.036);
      thock.connect(thockGain);
      thockGain.connect(this.ctx.destination);
      thock.start(t);
      thock.stop(t + 0.038);
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
      osc.frequency.setValueAtTime(750, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.03);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.035);
    } catch {}
  }
}

const audioEngine = new TacticalAudioEngine();

// ============================================================================
// HIGH-RESOLUTION PROCEDURAL TEXTURES FOR AUTHENTIC REALISM
// ============================================================================

// 1. Natural Warm Honey Oak Texture for Desk (Matching real photo)
function generateHoneyOakTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Rich warm golden honey oak base matching user photo
  const grad = ctx.createLinearGradient(0, 0, 2048, 2048);
  grad.addColorStop(0, '#c6955a');
  grad.addColorStop(0.35, '#d4a56c');
  grad.addColorStop(0.7, '#ba884e');
  grad.addColorStop(1, '#a8773e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 2048);

  // Natural straight & wavy wood grain planks
  for (let i = 0; i < 700; i++) {
    const y = i * 2.92;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 2048; x += 24) {
      const offset = Math.sin(x * 0.004 + i * 0.035) * 8 + Math.cos(x * 0.008) * 3;
      ctx.lineTo(x, y + offset);
    }
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = i % 4 === 0 ? '#633816' : i % 2 === 0 ? '#7a461d' : '#ebbe85';
    ctx.lineWidth = 1.2 + Math.sin(i * 0.15) * 0.9;
    ctx.stroke();
  }

  // Wood pore specks
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#42240c';
  for (let s = 0; s < 35000; s++) {
    ctx.fillRect(Math.random() * 2048, Math.random() * 2048, Math.random() * 5 + 2, 1.2);
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  return texture;
}

// 2. Leather Desk Mat Texture
function generateDeskMatTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c2220';
  ctx.fillRect(0, 0, 2048, 1200);

  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 20000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(Math.random() * 2048, Math.random() * 1200, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  const pad = 36;
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([14, 10]);
  ctx.strokeRect(pad, pad, 2048 - pad * 2, 1200 - pad * 2);

  return new THREE.CanvasTexture(canvas);
}

// 3. AUTHENTIC LENOVO THINKPAD T14 KEYBOARD TEXTURE (3072x1536)
// Spans 88% width of chassis with authentic ThinkPad chiclet keycaps & inverted-T arrow cluster
function generateThinkPadT14KeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 3072;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d')!;

  // Dark matte chassis surround
  ctx.fillStyle = '#131417';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Recessed keyboard well (occupies 94% of canvas width)
  const wellX = 90;
  const wellY = 70;
  const wellW = 2892;
  const wellH = 1396;

  // Dark chiclet grid background
  ctx.fillStyle = '#0a0b0d';
  ctx.fillRect(wellX, wellY, wellW, wellH);

  // Subtle inner shadow for well depth
  ctx.strokeStyle = '#050607';
  ctx.lineWidth = 4;
  ctx.strokeRect(wellX, wellY, wellW, wellH);

  // Power Button (Round with clean white LED dot in bezel above keyboard to right)
  const pwrX = 2820;
  const pwrY = 36;
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#1c1e22';
  ctx.fill();
  ctx.strokeStyle = '#30343a';
  ctx.lineWidth = 2;
  ctx.stroke();

  // White LED center dot
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Helper function to draw authentic ThinkPad smile-dish keycaps
  const drawKeycap = (
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    label: string, 
    subLabel: string = '', 
    options: {
      tpCutout?: 'left' | 'right' | 'top';
      hasGreenLed?: boolean;
      fontSize?: number;
      isSpecial?: boolean;
      align?: 'center' | 'left';
    } = {}
  ) => {
    const { tpCutout, hasGreenLed, fontSize = 32, isSpecial = false, align = 'center' } = options;

    // Keycap shadow
    ctx.fillStyle = '#060709';
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 4, w, h, 9);
    ctx.fill();

    // Keycap body gradient (Dark graphite PBR)
    const keyGrad = ctx.createLinearGradient(x, y, x, y + h);
    keyGrad.addColorStop(0, '#26282f');
    keyGrad.addColorStop(0.18, '#1e1f24');
    keyGrad.addColorStop(0.85, '#17181c');
    keyGrad.addColorStop(1, '#131417');
    ctx.fillStyle = keyGrad;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    // Smile dish bottom contour (Iconic ThinkPad curve)
    ctx.beginPath();
    ctx.moveTo(x + 12, y + h - 6);
    ctx.quadraticCurveTo(x + w / 2, y + h - 1, x + w - 12, y + h - 6);
    ctx.strokeStyle = '#0e0f12';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Top bevel highlight
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 2);
    ctx.lineTo(x + w - 10, y + 2);
    ctx.strokeStyle = '#383b44';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Semicircular TrackPoint Cutout (for G, H, B)
    if (tpCutout === 'right') {
      ctx.beginPath();
      ctx.arc(x + w, y + h / 2, 34, Math.PI / 2, -Math.PI / 2);
      ctx.fillStyle = '#0a0b0d';
      ctx.fill();
    } else if (tpCutout === 'left') {
      ctx.beginPath();
      ctx.arc(x, y + h / 2, 34, -Math.PI / 2, Math.PI / 2);
      ctx.fillStyle = '#0a0b0d';
      ctx.fill();
    } else if (tpCutout === 'top') {
      ctx.beginPath();
      ctx.arc(x + w / 2, y, 34, 0, Math.PI);
      ctx.fillStyle = '#0a0b0d';
      ctx.fill();
    }

    // Green Status LED (for Esc/FnLock & CapsLock)
    if (hasGreenLed) {
      ctx.beginPath();
      ctx.arc(x + 16, y + 16, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Key Legend Typography (Clean, crisp ThinkPad sans-serif)
    ctx.font = `600 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillStyle = isSpecial ? '#e5e7eb' : '#f3f4f6';

    if (align === 'center') {
      ctx.textAlign = 'center';
      const textY = subLabel ? y + h / 2 + fontSize * 0.15 : y + h / 2 + fontSize * 0.35;
      ctx.fillText(label, x + w / 2, textY);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(label, x + 16, y + h / 2 + fontSize * 0.35);
    }

    // Cyan Function Sub-Legend
    if (subLabel) {
      ctx.font = `500 20px system-ui, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(subLabel, x + w / 2, y + 30);
    }
  };

  // ROW 0: Function Keys (Esc, F1-F12, Home, End, Insert, Delete)
  const r0Y = wellY + 16;
  const r0H = 145;
  const fnW = 142;
  const gap = 14;

  let cx = wellX + 16;
  // Esc with green FnLock LED
  drawKeycap(cx, r0Y, 155, r0H, 'Esc', '', { hasGreenLed: true, fontSize: 26 });
  cx += 155 + gap;

  // F1 - F4
  const f1_4 = [
    { l: 'F1', s: '🔇' }, { l: 'F2', s: '🔉' }, { l: 'F3', s: '🔊' }, { l: 'F4', s: '🎙️' }
  ];
  f1_4.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24; // Gap

  // F5 - F8
  const f5_8 = [
    { l: 'F5', s: '☼-' }, { l: 'F6', s: '☼+' }, { l: 'F7', s: '🖵' }, { l: 'F8', s: '✈' }
  ];
  f5_8.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24; // Gap

  // F9 - F12
  const f9_12 = [
    { l: 'F9', s: '⚙' }, { l: 'F10', s: '🔍' }, { l: 'F11', s: '⭐' }, { l: 'F12', s: '🖩' }
  ];
  f9_12.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24; // Gap

  // Home, End, Insert, Delete
  const navKeys = ['Home', 'End', 'Insert', 'Delete'];
  navKeys.forEach(l => {
    drawKeycap(cx, r0Y, fnW + 4, r0H, l, '', { fontSize: 22 });
    cx += fnW + 4 + gap;
  });

  // ROW 1: Numbers (~ 1 2 3 ... 0 - = Backspace)
  const r1Y = r0Y + r0H + gap;
  const r1H = 195;
  const stdW = 166;
  cx = wellX + 16;

  const row1 = ['~ `', '! 1', '@ 2', '# 3', '$ 4', '% 5', '^ 6', '& 7', '* 8', '( 9', ') 0', '_ -', '+ ='];
  row1.forEach(l => {
    drawKeycap(cx, r1Y, stdW, r1H, l, '', { fontSize: 28 });
    cx += stdW + gap;
  });
  // Backspace (wider)
  const bspW = wellX + wellW - 16 - cx;
  drawKeycap(cx, r1Y, bspW, r1H, 'Backspace ⌫', '', { fontSize: 26, isSpecial: true });

  // ROW 2: Tab, QWERTY, { }, |
  const r2Y = r1Y + r1H + gap;
  const r2H = 195;
  cx = wellX + 16;

  const tabW = 245;
  drawKeycap(cx, r2Y, tabW, r2H, 'Tab ⇥', '', { fontSize: 26, isSpecial: true, align: 'left' });
  cx += tabW + gap;

  const row2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{ [', '} ]'];
  row2.forEach(l => {
    drawKeycap(cx, r2Y, stdW, r2H, l, '', { fontSize: 32 });
    cx += stdW + gap;
  });
  const slashW = wellX + wellW - 16 - cx;
  drawKeycap(cx, r2Y, slashW, r2H, '| \\', '', { fontSize: 28 });

  // ROW 3: CapsLock, ASDFGHJKL, Enter
  const r3Y = r2Y + r2H + gap;
  const r3H = 195;
  cx = wellX + 16;

  const capsW = 285;
  drawKeycap(cx, r3Y, capsW, r3H, 'CapsLock', '', { hasGreenLed: true, fontSize: 26, isSpecial: true, align: 'left' });
  cx += capsW + gap;

  const row3 = [
    { l: 'A' }, { l: 'S' }, { l: 'D' }, { l: 'F' }, 
    { l: 'G', tp: 'right' as const }, 
    { l: 'H', tp: 'left' as const }, 
    { l: 'J' }, { l: 'K' }, { l: 'L' }, { l: ': ;' }, { l: '" \'' }
  ];
  row3.forEach(k => {
    drawKeycap(cx, r3Y, stdW, r3H, k.l, '', { fontSize: 32, tpCutout: k.tp });
    cx += stdW + gap;
  });
  const enterW = wellX + wellW - 16 - cx;
  drawKeycap(cx, r3Y, enterW, r3H, 'Enter ↵', '', { fontSize: 28, isSpecial: true });

  // ROW 4: Shift, ZXCVBNM, Shift
  const r4Y = r3Y + r3H + gap;
  const r4H = 195;
  cx = wellX + 16;

  const lShiftW = 355;
  drawKeycap(cx, r4Y, lShiftW, r4H, 'Shift ⇧', '', { fontSize: 26, isSpecial: true, align: 'left' });
  cx += lShiftW + gap;

  const row4 = [
    { l: 'Z' }, { l: 'X' }, { l: 'C' }, { l: 'V' }, 
    { l: 'B', tp: 'top' as const }, 
    { l: 'N' }, { l: 'M' }, { l: '< ,' }, { l: '> .' }, { l: '? /' }
  ];
  row4.forEach(k => {
    drawKeycap(cx, r4Y, stdW, r4H, k.l, '', { fontSize: 32, tpCutout: k.tp });
    cx += stdW + gap;
  });
  const rShiftW = wellX + wellW - 16 - cx;
  drawKeycap(cx, r4Y, rShiftW, r4H, 'Shift ⇧', '', { fontSize: 26, isSpecial: true });

  // ROW 5: Fn, Ctrl, Win, Alt, Spacebar, AltGr, PrtSc, Ctrl + Inverted-T Arrow Cluster!
  const r5Y = r4Y + r4H + gap;
  const r5H = 210;
  cx = wellX + 16;

  const modW = 168;
  drawKeycap(cx, r5Y, modW, r5H, 'Fn', '', { fontSize: 26, isSpecial: true });
  cx += modW + gap;
  drawKeycap(cx, r5Y, modW, r5H, 'Ctrl', '', { fontSize: 26, isSpecial: true });
  cx += modW + gap;
  drawKeycap(cx, r5Y, modW, r5H, '❖', '', { fontSize: 28, isSpecial: true });
  cx += modW + gap;
  drawKeycap(cx, r5Y, modW, r5H, 'Alt', '', { fontSize: 26, isSpecial: true });
  cx += modW + gap;

  // Spacebar (wide)
  const spaceW = 860;
  drawKeycap(cx, r5Y, spaceW, r5H, '', '', { isSpecial: true });
  cx += spaceW + gap;

  drawKeycap(cx, r5Y, modW, r5H, 'AltGr', '', { fontSize: 26, isSpecial: true });
  cx += modW + gap;
  drawKeycap(cx, r5Y, modW, r5H, 'PrtSc', '', { fontSize: 24, isSpecial: true });
  cx += modW + gap;
  drawKeycap(cx, r5Y, modW, r5H, 'Ctrl', '', { fontSize: 26, isSpecial: true });
  cx += modW + gap;

  // AUTHENTIC THINKPAD ARROW CLUSTER (PgUp, PgDn, Inverted-T)
  const arrowColW = (wellX + wellW - 16 - cx - gap * 2) / 3;
  const halfH = (r5H - gap) / 2;

  // Col 1: PgUp (top half), Left Arrow (bottom half)
  drawKeycap(cx, r5Y, arrowColW, halfH, 'PgUp', '', { fontSize: 20, isSpecial: true });
  drawKeycap(cx, r5Y + halfH + gap, arrowColW, halfH, '◄', '', { fontSize: 24 });
  cx += arrowColW + gap;

  // Col 2: Up Arrow (top half), Down Arrow (bottom half)
  drawKeycap(cx, r5Y, arrowColW, halfH, '▲', '', { fontSize: 24 });
  drawKeycap(cx, r5Y + halfH + gap, arrowColW, halfH, '▼', '', { fontSize: 24 });
  cx += arrowColW + gap;

  // Col 3: PgDn (top half), Right Arrow (bottom half)
  drawKeycap(cx, r5Y, arrowColW, halfH, 'PgDn', '', { fontSize: 20, isSpecial: true });
  drawKeycap(cx, r5Y + halfH + gap, arrowColW, halfH, '►', '', { fontSize: 24 });

  return new THREE.CanvasTexture(canvas);
}

// 4. ThinkPad Palmrest Badge Texture (45-degree angled logo with clean red LED "i" dot)
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
  ctx.font = 'bold 62px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#f3f4f6';
  ctx.fillText('Think', -125, 0);

  ctx.font = '300 62px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('Pad', 25, 0);

  // Tiny Clean Red LED dot on the "i" in Think (Authentic size, no crazy glow)
  ctx.beginPath();
  ctx.arc(-82, -48, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
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
  ctx.roundRect(0, 0, 256, 200, 10);
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px system-ui, sans-serif';
  ctx.fillText('intel', 28, 75);

  ctx.font = 'bold 26px system-ui, sans-serif';
  ctx.fillText('CORE i7', 28, 135);

  return new THREE.CanvasTexture(canvas);
}

// 6. Detailed Side I/O Ports Texture
function generateSidePortsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#141416';
  ctx.fillRect(0, 0, 2048, 256);

  // Thunderbolt 4 / USB-C Ports
  const drawUsbC = (x: number) => {
    ctx.fillStyle = '#08080a';
    ctx.beginPath();
    ctx.roundRect(x, 90, 110, 50, 24);
    ctx.fill();
    ctx.strokeStyle = '#4a4d52';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#7a7e85';
    ctx.fillRect(x + 28, 108, 54, 14);

    ctx.fillStyle = '#a3a8b0';
    ctx.font = '22px sans-serif';
    ctx.fillText('⚡', x + 42, 68);
  };
  drawUsbC(220);
  drawUsbC(400);

  // HDMI 2.1
  const hx = 640;
  ctx.fillStyle = '#08080a';
  ctx.beginPath();
  ctx.moveTo(hx, 140);
  ctx.lineTo(hx + 20, 90);
  ctx.lineTo(hx + 120, 90);
  ctx.lineTo(hx + 140, 140);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a4d52';
  ctx.lineWidth = 3;
  ctx.stroke();

  // USB-A 3.2
  const ux = 880;
  ctx.fillStyle = '#08080a';
  ctx.fillRect(ux, 90, 140, 52);
  ctx.strokeStyle = '#4a4d52';
  ctx.lineWidth = 3;
  ctx.strokeRect(ux, 90, 140, 52);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(ux + 20, 118, 100, 18);

  // Cooling exhaust vents with copper heatsink slats
  ctx.fillStyle = '#08080a';
  ctx.fillRect(1160, 60, 780, 120);
  for (let vx = 1175; vx < 1920; vx += 24) {
    ctx.fillStyle = '#1e1f24';
    ctx.fillRect(vx, 70, 8, 100);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(vx + 9, 82, 10, 76);
  }

  return new THREE.CanvasTexture(canvas);
}

// 7. Screen Bezel Texture with "Lenovo" and "T14"
function generateBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#121316';
  ctx.fillRect(0, 0, 2048, 256);

  // Top Bezel Section (y: 0..128)
  const cx = 1024;
  const cy = 64;
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#050608';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  // ThinkShutter Red Dot
  ctx.beginPath();
  ctx.arc(cx, cy - 26, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.fill();

  // Stereo Mics
  ctx.fillStyle = '#090a0d';
  ctx.beginPath(); ctx.arc(cx - 90, cy, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + 90, cy, 4, 0, Math.PI * 2); ctx.fill();

  // Bottom Bezel Section (y: 128..256)
  // "Lenovo" lower left
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.fillStyle = '#4b5563';
  ctx.fillText('Lenovo', 80, 205);

  // "T14" lower right
  ctx.font = 'bold 32px system-ui, sans-serif';
  ctx.fillStyle = '#9ca3af';
  ctx.textAlign = 'right';
  ctx.fillText('T14', 1968, 205);
  ctx.textAlign = 'left';

  return new THREE.CanvasTexture(canvas);
}

// ============================================================================
// COMPONENT
// ============================================================================
export const ThinkPadWorkstation: React.FC<ThinkPadWorkstationProps> = ({ onNavigateToSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeApp, setActiveApp] = useState<'desktop' | 'terminal' | 'pipeline' | 'projects' | 'resume' | 'notes' | 'about'>('desktop');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Terminal history
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([
    {
      command: 'whoami',
      output: [
        'Abdul Samad Khan (wyacoomz)',
        'RPA & Enterprise Automation Developer @ Trufe',
        'Stack: Power Automate, Python, Dynamics 365, React, Node.js, SQL Server',
        'B.Tech AI & Data Science • Bhopal, India (IST UTC +05:30)',
        'Click icons on the left dock or desktop to launch Linux apps.'
      ]
    }
  ]);

  const stateRef = useRef({
    activeApp,
    terminalInput,
    terminalHistory,
    pipelineRunning,
    pipelineStep,
    cursorVisible: true,
    deskLampLight: null as THREE.SpotLight | null
  });

  useEffect(() => {
    stateRef.current.activeApp = activeApp;
    stateRef.current.terminalInput = terminalInput;
    stateRef.current.terminalHistory = terminalHistory;
    stateRef.current.pipelineRunning = pipelineRunning;
    stateRef.current.pipelineStep = pipelineStep;
  }, [activeApp, terminalInput, terminalHistory, pipelineRunning, pipelineStep]);

  // Terminal command executor
  const executeCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    audioEngine.playKeyClick();
    let output: string[] = [];

    switch (cmd) {
      case 'help':
        output = [
          'Available Linux Shell Commands:',
          '  • whoami     - View developer profile, background & credentials',
          '  • projects   - Launch the Projects Explorer file manager',
          '  • pipeline   - Launch the D365 Invoice Automation Simulator',
          '  • skills     - Print production technical competency matrix',
          '  • leetcode   - View LeetCode benchmarks (150+ solved: DP, Graphs)',
          '  • resume     - Open PDF resume document viewer',
          '  • contact    - Display email, LinkedIn, and GitHub channels',
          '  • clear      - Clear terminal window history',
          'Tip: You can also click any icon on the Linux dock or desktop!'
        ];
        break;

      case 'whoami':
        output = [
          'Developer Identity:',
          '  • Handle: wyacoomz (Abdul Samad Khan)',
          '  • Role: RPA Developer @ Trufe (Enterprise Automation)',
          '  • Education: B.Tech in AI & Data Science (OIST)',
          '  • Location: Bhopal, India (IST UTC +05:30)',
          '  • Status: Active engineering contributor'
        ];
        break;

      case 'projects':
        setActiveApp('projects');
        output = ['Launching Projects Explorer window...'];
        break;

      case 'pipeline':
        setActiveApp('pipeline');
        output = ['Launching Dynamics 365 Invoice Automation Studio...'];
        break;

      case 'skills':
        output = [
          'Core Technical Competencies:',
          '  [Automation]  Power Automate Cloud/Desktop, AI Builder, D365, OCR',
          '  [Backend]     Python, Node.js, Express.js, RESTful APIs, JWT',
          '  [Database]    SQL Server, MongoDB, PostgreSQL, Stored Procedures',
          '  [Frontend]    React.js, TypeScript, Tailwind CSS, Three.js',
          '  [Systems]     Git, Linux Bash, PowerShell, Docker, CI/CD'
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
        setActiveApp('resume');
        output = ['Opening Abdul_Samad_Khan_Resume.pdf in Document Viewer...'];
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
        output = [`bash: command not found: ${rawCmd}. Type "help" or click dock icons.`];
        break;
    }

    setTerminalHistory((prev) => [...prev, { command: rawCmd, output }]);
    setTerminalInput('');
  }, []);

  // Pipeline simulation runner
  const runPipelineSimulation = useCallback(() => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStep(1);
    audioEngine.playKeyClick();

    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineStep(step);
        audioEngine.playKeyClick();
        if (step === 5) {
          setTimeout(() => {
            setPipelineRunning(false);
          }, 1200);
        }
      }, (idx + 1) * 800);
    });
  }, [pipelineRunning]);

  // Main Three.js Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1114);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    // Perfect framing of the ThinkPad keyboard and screen
    // Natural seated eye-level camera posture (perfectly framing the entire ThinkPad, palmrest & honey oak desk)
    const deskCamPos = new THREE.Vector3(0, 2.45, 3.85);
    const deskCamLook = new THREE.Vector3(0, 0.60, -0.30);
    // Face-on perpendicular screen view (framing 100% of the 16:10 screen, top panel & left dock)
    const focusedCamPos = new THREE.Vector3(0, 2.12, 2.05);
    const focusedCamLook = new THREE.Vector3(0, 1.28, -1.37);

    camera.position.copy(deskCamPos);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 1.2;
    controls.maxDistance = 6.0;
    controls.target.copy(deskCamLook);

    // 2. Realistic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xdbe4eb, 0.55);
    scene.add(ambientLight);

    // Main studio key light from top-right-front
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(2.4, 4.2, 2.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Warm soft fill light from left
    const fillLight = new THREE.DirectionalLight(0xffecc7, 0.6);
    fillLight.position.set(-2.8, 2.5, 1.4);
    scene.add(fillLight);

    // Warm Desk Lamp (positioned back-left, completely unobtrusive)
    const deskLampSpot = new THREE.SpotLight(0xffe0b2, 3.4);
    deskLampSpot.position.set(-2.5, 2.8, -0.9);
    deskLampSpot.target.position.set(0, 0.1, 0.1);
    deskLampSpot.angle = 0.72;
    deskLampSpot.penumbra = 0.7;
    deskLampSpot.decay = 1.8;
    deskLampSpot.distance = 12;
    deskLampSpot.castShadow = true;
    scene.add(deskLampSpot);
    scene.add(deskLampSpot.target);
    stateRef.current.deskLampLight = deskLampSpot;

    // 3. Materials
    const honeyOakTex = generateHoneyOakTexture();
    const deskMat = new THREE.MeshStandardMaterial({
      map: honeyOakTex,
      roughness: 0.55,
      metalness: 0.04
    });

    const matTex = generateDeskMatTexture();
    const deskPadMat = new THREE.MeshStandardMaterial({
      map: matTex,
      roughness: 0.75,
      metalness: 0.08
    });

    // Authentic Raven Black Soft-Touch ThinkPad Chassis
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x141518,
      roughness: 0.42,
      metalness: 0.10,
      clearcoat: 0.06,
      clearcoatRoughness: 0.35
    });

    const keyboardDeckTex = generateThinkPadT14KeyboardTexture();
    const keyboardDeckMat = new THREE.MeshStandardMaterial({
      map: keyboardDeckTex,
      roughness: 0.38,
      metalness: 0.08
    });

    const thinkpadBadgeTex = generateThinkPadBadgeTexture();
    const thinkpadBadgeMat = new THREE.MeshBasicMaterial({
      map: thinkpadBadgeTex,
      transparent: true
    });

    const intelBadgeTex = generateIntelBadgeTexture();
    const intelBadgeMat = new THREE.MeshStandardMaterial({
      map: intelBadgeTex,
      roughness: 0.3,
      metalness: 0.4
    });

    const sidePortsTex = generateSidePortsTexture();
    const sidePortsMat = new THREE.MeshStandardMaterial({
      map: sidePortsTex,
      roughness: 0.5,
      metalness: 0.3
    });

    const bezelTex = generateBezelTexture();
    const bezelMat = new THREE.MeshStandardMaterial({
      map: bezelTex,
      roughness: 0.5,
      metalness: 0.1
    });

    const hingeSteelMat = new THREE.MeshStandardMaterial({
      color: 0x222428,
      roughness: 0.28,
      metalness: 0.85
    });

    // Iconic ThinkPad Red (TrackPoint Nub & Button Stripes)
    const trackPointRedMat = new THREE.MeshStandardMaterial({
      color: 0xdf1a2d,
      roughness: 0.50,
      metalness: 0.08
    });

    const scrollBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.45,
      metalness: 0.15
    });

    const footMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0d,
      roughness: 0.9,
      metalness: 0.0
    });

    const porcelainMugMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f0,
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1
    });

    const coffeeLiquidMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.12,
      metalness: 0.1
    });

    const studioWallMat = new THREE.MeshStandardMaterial({
      color: 0x121518,
      roughness: 0.95,
      metalness: 0.0
    });

    const lampMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1c2024,
      roughness: 0.35,
      metalness: 0.75
    });

    const brassAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.85
    });

    // 4. Studio Environment Meshes
    // Warm Honey Oak Desk Top
    const deskMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 6), deskMat);
    deskMesh.position.set(0, -0.1, 0);
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);

    // Stitched Leather Desk Pad
    const deskPadMesh = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.012, 3.2), deskPadMat);
    deskPadMesh.position.set(0, 0.006, 0.15);
    deskPadMesh.receiveShadow = true;
    // scene.add(deskPadMesh); // Omitted so ThinkPad sits directly on warm oak desk like in real photo

    // Studio Back Wall
    const wallMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), studioWallMat);
    wallMesh.position.set(0, 4.5, -2.8);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // 5. High-Fidelity 3D ThinkPad T14 Laptop Assembly
    const thinkpadGroup = new THREE.Group();
    scene.add(thinkpadGroup);

    // (A) Laptop Base Chassis (Wedge profile, sleek 14-inch form factor)
    const baseW = 3.65;
    const baseD = 2.45;
    const baseH = 0.11;

    const baseChassisGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const baseChassis = new THREE.Mesh(baseChassisGeo, chassisMat);
    baseChassis.position.set(0, baseH / 2, 0);
    baseChassis.castShadow = true;
    baseChassis.receiveShadow = true;
    thinkpadGroup.add(baseChassis);

    // 4 Underside Rubber Feet
    const footGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 16);
    [
      [-baseW / 2 + 0.22, 0.009, -baseD / 2 + 0.22],
      [baseW / 2 - 0.22, 0.009, -baseD / 2 + 0.22],
      [-baseW / 2 + 0.22, 0.009, baseD / 2 - 0.22],
      [baseW / 2 - 0.22, 0.009, baseD / 2 - 0.22]
    ].forEach(([fx, fy, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, fy, fz);
      thinkpadGroup.add(foot);
    });

    // Left & Right Side Ports Panels
    const sidePortsGeo = new THREE.PlaneGeometry(baseD - 0.2, 0.08);
    const leftPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    leftPortsMesh.position.set(-baseW / 2 - 0.002, 0.065, 0.08);
    leftPortsMesh.rotation.y = -Math.PI / 2;
    thinkpadGroup.add(leftPortsMesh);

    const rightPortsMesh = new THREE.Mesh(sidePortsGeo, sidePortsMat);
    rightPortsMesh.position.set(baseW / 2 + 0.002, 0.065, 0.08);
    rightPortsMesh.rotation.y = Math.PI / 2;
    thinkpadGroup.add(rightPortsMesh);

    // (B) Keyboard Well & Chiclet Deck (Spans 88% width of chassis!)
    const wellW = 3.20;
    const wellD = 1.34;
    const keyboardPlaneGeo = new THREE.PlaneGeometry(wellW, wellD);
    const keyboardMesh = new THREE.Mesh(keyboardPlaneGeo, keyboardDeckMat);
    keyboardMesh.position.set(0, baseH + 0.002, -0.32);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.receiveShadow = true;
    thinkpadGroup.add(keyboardMesh);

    // (C) FLUSH 3D TRACKPOINT NUB (Nestled level with keycaps between G, H, B)
    const trackPointGroup = new THREE.Group();
    // Centered horizontally with G/H cutouts, flush with key surface
    trackPointGroup.position.set(-0.255, baseH + 0.008, -0.325);
    thinkpadGroup.add(trackPointGroup);

    // Low-profile stem
    const stemGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.016, 12);
    const stemMesh = new THREE.Mesh(stemGeo, hingeSteelMat);
    stemMesh.position.set(0, 0.008, 0);
    trackPointGroup.add(stemMesh);

    // Low-profile knurled red rubber dome (FLUSH with keys!)
    const domeGeo = new THREE.CylinderGeometry(0.038, 0.034, 0.014, 24);
    const domeMesh = new THREE.Mesh(domeGeo, trackPointRedMat);
    domeMesh.position.set(0, 0.015, 0);
    domeMesh.castShadow = true;
    trackPointGroup.add(domeMesh);

    // Flat textured top cap
    const topCapGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.004, 24);
    const topCapMesh = new THREE.Mesh(topCapGeo, trackPointRedMat);
    topCapMesh.position.set(0, 0.022, 0);
    trackPointGroup.add(topCapMesh);

    // (D) Three Physical 3D TrackPoint Buttons (Directly below spacebar)
    const btnGroup = new THREE.Group();
    btnGroup.position.set(-0.255, baseH + 0.006, 0.38);
    thinkpadGroup.add(btnGroup);

    const btnKeyMat = new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.36, metalness: 0.08 });

    // Left Click Button with Red Horizontal Stripe
    const leftBtnGeo = new THREE.BoxGeometry(0.48, 0.018, 0.17);
    const leftBtn = new THREE.Mesh(leftBtnGeo, btnKeyMat);
    leftBtn.position.set(-0.52, 0, 0);
    leftBtn.castShadow = true;
    btnGroup.add(leftBtn);

    const redStripeGeo = new THREE.BoxGeometry(0.44, 0.004, 0.018);
    const leftStripe = new THREE.Mesh(redStripeGeo, trackPointRedMat);
    leftStripe.position.set(-0.52, 0.010, -0.065);
    btnGroup.add(leftStripe);

    // Center Scroll Button with Blue Grip
    const centerBtnGeo = new THREE.BoxGeometry(0.34, 0.018, 0.17);
    const centerBtn = new THREE.Mesh(centerBtnGeo, btnKeyMat);
    centerBtn.position.set(0, 0, 0);
    centerBtn.castShadow = true;
    btnGroup.add(centerBtn);

    const blueStripeGeo = new THREE.BoxGeometry(0.24, 0.004, 0.018);
    const centerBlue = new THREE.Mesh(blueStripeGeo, scrollBlueMat);
    centerBlue.position.set(0, 0.010, -0.065);
    btnGroup.add(centerBlue);

    // Right Click Button with Red Stripe
    const rightBtn = new THREE.Mesh(leftBtnGeo, btnKeyMat);
    rightBtn.position.set(0.52, 0, 0);
    rightBtn.castShadow = true;
    btnGroup.add(rightBtn);

    const rightStripe = new THREE.Mesh(redStripeGeo, trackPointRedMat);
    rightStripe.position.set(0.52, 0.010, -0.065);
    btnGroup.add(rightStripe);

    // (E) Satin Glass Trackpad Plate (Directly below buttons)
    const padPlateGeo = new THREE.BoxGeometry(1.42, 0.008, 0.86);
    const padPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x17181c,
      roughness: 0.40,
      metalness: 0.06,
      clearcoat: 0.12,
      clearcoatRoughness: 0.4
    });
    const padPlate = new THREE.Mesh(padPlateGeo, padPlateMat);
    padPlate.position.set(-0.255, baseH + 0.003, 0.86);
    padPlate.receiveShadow = true;
    thinkpadGroup.add(padPlate);

    // Official ThinkPad 45° Angled Palmrest Badge (Right corner)
    const badgeGeo = new THREE.PlaneGeometry(0.36, 0.18);
    const tpBadgeMesh = new THREE.Mesh(badgeGeo, thinkpadBadgeMat);
    tpBadgeMesh.position.set(1.18, baseH + 0.003, 0.88);
    tpBadgeMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(tpBadgeMesh);

    // Intel Core Badge (Left corner)
    const intelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.14), intelBadgeMat);
    intelMesh.position.set(-1.18, baseH + 0.003, 0.88);
    intelMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(intelMesh);

    // Biometric Fingerprint Sensor (Right of touchpad)
    const fpGeo = new THREE.BoxGeometry(0.14, 0.006, 0.14);
    const fpMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2, metalness: 0.8 });
    const fpMesh = new THREE.Mesh(fpGeo, fpMat);
    fpMesh.position.set(1.18, baseH + 0.003, 0.48);
    thinkpadGroup.add(fpMesh);

    // (F) Dual Steel Drop Hinges
    const hingeGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.26, 20);
    hingeGeo.rotateZ(Math.PI / 2);
    [-1.25, 1.25].forEach((hx) => {
      const hinge = new THREE.Mesh(hingeGeo, hingeSteelMat);
      hinge.position.set(hx, baseH + 0.015, -baseD / 2 + 0.14);
      hinge.castShadow = true;
      thinkpadGroup.add(hinge);
    });

    // (G) Display Lid & 2048x1300 Screen
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, baseH + 0.015, -baseD / 2 + 0.14);
    thinkpadGroup.add(lidGroup);

    // 108° open angle (natural viewing posture)
    lidGroup.rotation.x = 0.24; // Standing upright at 104 deg open angle

    const lidW = 3.65;
    const lidH = 2.42;
    const lidThick = 0.045;

    // Outer Back Cover
    const lidBackGeo = new THREE.BoxGeometry(lidW, lidH, lidThick);
    const lidBack = new THREE.Mesh(lidBackGeo, chassisMat);
    lidBack.position.set(0, lidH / 2, -lidThick / 2);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Bezel Border Front
    const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidH), bezelMat);
    bezelMesh.position.set(0, lidH / 2, 0.001);
    lidGroup.add(bezelMesh);

    // 2048x1300 Canvas Texture for Screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 2048;
    screenCanvas.height = 1300;
    const screenContext = screenCanvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenW = 3.38;
    const screenH = 2.08;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, lidH / 2 - 0.02, 0.004);
    lidGroup.add(screenMesh);

    // (H) Accessories on Desk
    // Architect Desk Lamp (Clean, positioned back-left out of view)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-6.0, 0, -3.0);
    scene.add(lampGroup);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.32, 0.06, 24), lampMetalMat);
    lampBase.position.set(0, 0.03, 0);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    const armLower = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 12), hingeSteelMat);
    armLower.position.set(0.12, 0.72, 0.05);
    armLower.rotation.z = -0.22;
    armLower.castShadow = true;
    lampGroup.add(armLower);

    const armUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.3, 12), hingeSteelMat);
    armUpper.position.set(0.48, 1.82, 0.10);
    armUpper.rotation.z = 0.52;
    armUpper.castShadow = true;
    lampGroup.add(armUpper);

    const shadeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.44, 24, 1, true), lampMetalMat);
    shadeMesh.position.set(0.92, 2.20, 0.20);
    shadeMesh.rotation.x = Math.PI / 4;
    shadeMesh.rotation.z = -Math.PI / 6;
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    // Porcelain Coffee Mug (Right side)
    const mugGroup = new THREE.Group();
    mugGroup.position.set(2.35, 0, 0.55);
    scene.add(mugGroup);

    const mugOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.18, 0.42, 28), porcelainMugMat);
    mugOuter.position.set(0, 0.21, 0);
    mugOuter.castShadow = true;
    mugGroup.add(mugOuter);

    const coffeeLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), coffeeLiquidMat);
    coffeeLiquid.position.set(0, 0.38, 0);
    coffeeLiquid.rotation.x = -Math.PI / 2;
    mugGroup.add(coffeeLiquid);

    // Mug Handle
    const handleGeo = new THREE.TorusGeometry(0.12, 0.03, 12, 24, Math.PI);
    const handleMesh = new THREE.Mesh(handleGeo, porcelainMugMat);
    handleMesh.position.set(0.21, 0.21, 0);
    handleMesh.rotation.y = Math.PI / 2;
    mugGroup.add(handleMesh);

    // 6. Direct Screen Clicking via UV Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(screenMesh);

      if (intersects.length > 0) {
        setIsFocused(true);
        const uv = intersects[0].uv;
        if (uv) {
          const canvasX = uv.x * 2048;
          const canvasY = (1 - uv.y) * 1300;

          // (1) Top GNOME Panel Activities Button (x: 20..140, y: 10..46)
          if (canvasY >= 10 && canvasY <= 46 && canvasX >= 20 && canvasX <= 140) {
            audioEngine.playKeyClick();
            setActiveApp(prev => prev === 'desktop' ? 'terminal' : 'desktop');
            return;
          }

          // (2) Left Dock Icon Clicks (x: 0..86, y: 52..1300)
          if (canvasX >= 0 && canvasX <= 86) {
            if (canvasY >= 80 && canvasY <= 146) {
              audioEngine.playKeyClick();
              setActiveApp('terminal');
              return;
            }
            if (canvasY >= 156 && canvasY <= 222) {
              audioEngine.playKeyClick();
              setActiveApp('pipeline');
              return;
            }
            if (canvasY >= 232 && canvasY <= 298) {
              audioEngine.playKeyClick();
              setActiveApp('projects');
              return;
            }
            if (canvasY >= 308 && canvasY <= 374) {
              audioEngine.playKeyClick();
              setActiveApp('resume');
              return;
            }
            if (canvasY >= 384 && canvasY <= 450) {
              audioEngine.playKeyClick();
              setActiveApp('notes');
              return;
            }
            if (canvasY >= 460 && canvasY <= 526) {
              audioEngine.playKeyClick();
              setActiveApp('about');
              return;
            }
            if (canvasY >= 536 && canvasY <= 602) {
              audioEngine.playKeyClick();
              window.open('https://github.com/wyacoomz', '_blank');
              return;
            }
          }

          // (3) Window Header Close Button (x: 1940..2010, y: 72..130) -> Close back to desktop
          if (canvasX >= 1940 && canvasX <= 2010 && canvasY >= 72 && canvasY <= 130) {
            audioEngine.playKeyClick();
            setActiveApp('desktop');
            return;
          }

          // (4) Desktop Tiles Click (when activeApp === 'desktop')
          if (stateRef.current.activeApp === 'desktop') {
            const tileW = 910;
            const tileH = 260;
            
            // Check Col 0
            if (canvasX >= 130 && canvasX <= 130 + tileW) {
              if (canvasY >= 240 && canvasY <= 240 + tileH) { audioEngine.playKeyClick(); setActiveApp('terminal'); return; }
              if (canvasY >= 535 && canvasY <= 535 + tileH) { audioEngine.playKeyClick(); setActiveApp('projects'); return; }
              if (canvasY >= 830 && canvasY <= 830 + tileH) { audioEngine.playKeyClick(); setActiveApp('notes'); return; }
            }
            // Check Col 1
            if (canvasX >= 130 + tileW + 50 && canvasX <= 130 + tileW * 2 + 50) {
              if (canvasY >= 240 && canvasY <= 240 + tileH) { audioEngine.playKeyClick(); setActiveApp('pipeline'); return; }
              if (canvasY >= 535 && canvasY <= 535 + tileH) { audioEngine.playKeyClick(); setActiveApp('resume'); return; }
              if (canvasY >= 830 && canvasY <= 830 + tileH) { audioEngine.playKeyClick(); setActiveApp('about'); return; }
            }
          }

          // (5) In-App Click Actions
          // Terminal Quick Commands
          if (stateRef.current.activeApp === 'terminal' && canvasY >= 1180 && canvasY <= 1250) {
            const cmds = ['whoami', 'projects', 'pipeline', 'skills', 'leetcode', 'resume', 'contact', 'clear'];
            cmds.forEach((cmd, idx) => {
              const btnX = 260 + idx * 165;
              if (canvasX >= btnX && canvasX <= btnX + 155) {
                executeCommand(cmd);
              }
            });
          }

          // Pipeline Run Simulation
          if (stateRef.current.activeApp === 'pipeline' && canvasY >= 660 && canvasY <= 730 && canvasX >= 70 && canvasX <= 410) {
            runPipelineSimulation();
          }

          // Resume Download PDF
          if (stateRef.current.activeApp === 'resume' && canvasY >= 150 && canvasY <= 210 && canvasX >= 1650 && canvasX <= 1980) {
            window.open('/Abdul_Samad_Khan_Resume.pdf', '_blank');
          }
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 7. LINUX DESKTOP DRAW LOOP (2048x1300 Ultra-Crisp Canvas)
    let lastBlink = Date.now();
    let cursorState = true;

    const drawLinuxScreen = () => {
      if (!screenContext) return;
      const ctx = screenContext;
      const now = Date.now();
      const currentApp = stateRef.current.activeApp;

      if (now - lastBlink > 500) {
        cursorState = !cursorState;
        lastBlink = now;
        stateRef.current.cursorVisible = cursorState;
      }

      // (A) Modern Linux Wallpaper (Geometric deep navy gradient with cyber lines)
      const wallGrad = ctx.createLinearGradient(0, 0, 2048, 1300);
      wallGrad.addColorStop(0, '#0a0d14');
      wallGrad.addColorStop(0.4, '#121927');
      wallGrad.addColorStop(1, '#0e141f');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, 2048, 1300);

      // Subtle geometric wireframe contours
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.25;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(300 + i * 180, 0);
        ctx.lineTo(800 + i * 150, 1300);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Stylized ThinkPad T14 Watermark (Bottom right)
      ctx.font = 'bold 38px system-ui, sans-serif';
      ctx.fillStyle = '#1e293b';
      ctx.textAlign = 'right';
      ctx.fillText('ThinkPad T14 • Linux 6.8 • wyacoomz', 2010, 1260);
      ctx.textAlign = 'left';

      // (B) Desktop Shortcut Grid (Prominent Linux Desktop Experience)
      if (currentApp === 'desktop') {
        // Desktop Header Hero Banner
        ctx.fillStyle = '#16202ecc';
        ctx.beginPath();
        ctx.roundRect(130, 80, 1870, 130, 12);
        ctx.fill();
        ctx.strokeStyle = '#263447';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 36px system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('ThinkPad T14 Developer Workstation', 170, 136);

        ctx.font = '20px system-ui, sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Ubuntu 24.04 LTS (Noble Numbat) • Abdul Samad Khan (wyacoomz)', 170, 178);

        ctx.font = '18px system-ui, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText('Click any application tile or dock icon to open', 1960, 156);
        ctx.textAlign = 'left';

        // 6 Large, Tactile Interactive Desktop App Tiles (2 columns x 3 rows)
        const appTiles = [
          {
            id: 'terminal',
            title: 'Terminal (Bash Shell)',
            desc: 'Interactive zsh/bash command runner, developer tools & whoami diagnostics.',
            badge: 'CLI Utility',
            icon: '💻',
            col: 0, row: 0
          },
          {
            id: 'pipeline',
            title: 'D365 Invoice Automation Studio',
            desc: 'Live 5-stage automated RPA pipeline across 5 subsidiaries into Dynamics 365.',
            badge: 'Flagship RPA',
            icon: '⚙️',
            col: 1, row: 0
          },
          {
            id: 'projects',
            title: 'Projects Explorer (~/work)',
            desc: 'Archive of 7 production enterprise automation workflows & full-stack web applications.',
            badge: 'Portfolio Files',
            icon: '📁',
            col: 0, row: 1
          },
          {
            id: 'resume',
            title: 'Abdul_Samad_Khan_Resume.pdf',
            desc: 'Document viewer with verified credentials, B.Tech AI & Data Science, Trufe experience.',
            badge: 'PDF Document',
            icon: '📄',
            col: 1, row: 1
          },
          {
            id: 'notes',
            title: 'Field_Notes.md (Gedit Editor)',
            desc: 'Technical case studies on bot exception queues, banking logic & LeetCode DP/graphs.',
            badge: 'Markdown Doc',
            icon: '📝',
            col: 0, row: 2
          },
          {
            id: 'about',
            title: 'System_Specs.nfo (Neofetch)',
            desc: 'ThinkPad T14 Gen 3 hardware diagnostics, Linux 6.8 kernel & developer background.',
            badge: 'System Info',
            icon: '👤',
            col: 1, row: 2
          }
        ];

        appTiles.forEach(tile => {
          const tileW = 910;
          const tileH = 260;
          const tx = 130 + tile.col * (tileW + 50);
          const ty = 240 + tile.row * (tileH + 35);

          // Tile card backdrop
          ctx.fillStyle = '#141c28f0';
          ctx.beginPath();
          ctx.roundRect(tx, ty, tileW, tileH, 12);
          ctx.fill();

          ctx.strokeStyle = '#28384e';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Icon box
          ctx.fillStyle = '#1e2c3e';
          ctx.beginPath();
          ctx.roundRect(tx + 28, ty + 28, 88, 88, 12);
          ctx.fill();
          ctx.font = '48px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(tile.icon, tx + 72, ty + 88);
          ctx.textAlign = 'left';

          // Badge
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.roundRect(tx + 140, ty + 28, 160, 28, 4);
          ctx.fill();
          ctx.font = 'bold 13px system-ui, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(tile.badge, tx + 220, ty + 47);
          ctx.textAlign = 'left';

          // Title
          ctx.font = 'bold 28px system-ui, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(tile.title, tx + 140, ty + 95);

          // Description
          ctx.font = '19px system-ui, sans-serif';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(tile.desc, tx + 28, ty + 160);

          // Click prompt
          ctx.font = 'bold 16px "JetBrains Mono", monospace';
          ctx.fillStyle = '#38bdf8';
          ctx.fillText('▶ Click to open application window', tx + 28, ty + 215);
        });
      }

      // (C) Application Window (If an app is open)

      if (currentApp !== 'desktop') {
        const winX = 110;
        const winY = 72;
        const winW = 1910;
        const winH = 1195;

        // Window drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(winX + 8, winY + 8, winW, winH);

        // Window background
        ctx.fillStyle = '#0f141c';
        ctx.fillRect(winX, winY, winW, winH);
        ctx.strokeStyle = '#253042';
        ctx.lineWidth = 2;
        ctx.strokeRect(winX, winY, winW, winH);

        // Window Header Bar (Titanium Dark GNOME header)
        ctx.fillStyle = '#1a2230';
        ctx.fillRect(winX, winY, winW, 58);
        ctx.fillStyle = '#263447';
        ctx.fillRect(winX, winY + 56, winW, 2);

        // Window Title
        let winTitle = '';
        if (currentApp === 'terminal') winTitle = '💻 terminal — wyacoomz@thinkpad-t14: ~ (bash)';
        if (currentApp === 'pipeline') winTitle = '⚙️ D365 Enterprise Invoice Automation Studio — Dynamics 365 Bulk Uploader';
        if (currentApp === 'projects') winTitle = '📁 Projects Explorer — ~/work (7 Production Systems)';
        if (currentApp === 'resume') winTitle = '📄 Abdul_Samad_Khan_Resume.pdf — Document Viewer';
        if (currentApp === 'notes') winTitle = '📝 field_notes.md — Gedit Text Editor';
        if (currentApp === 'about') winTitle = '👤 About Developer — System Specifications & Neofetch';

        ctx.font = 'bold 22px system-ui, sans-serif';
        ctx.fillStyle = '#f3f4f6';
        ctx.fillText(winTitle, winX + 24, winY + 38);

        // GNOME Window Control Buttons (Right corner)
        // Minimize Button (-)
        ctx.beginPath();
        ctx.arc(winX + winW - 90, winY + 29, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('−', winX + winW - 96, winY + 35);

        // Maximize Button (+)
        ctx.beginPath();
        ctx.arc(winX + winW - 54, winY + 29, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.fillText('+', winX + winW - 60, winY + 35);

        // Close Button (Red Circle ×) -> Returns to Desktop!
        ctx.beginPath();
        ctx.arc(winX + winW - 18, winY + 29, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('×', winX + winW - 23, winY + 35);

        // --------------------------------------------------------------------
        // WINDOW 1: TERMINAL (BASH)
        // --------------------------------------------------------------------
        if (currentApp === 'terminal') {
          let y = winY + 105;
          const history = stateRef.current.terminalHistory;

          history.forEach((entry) => {
            ctx.font = 'bold 24px "JetBrains Mono", monospace';
            ctx.fillStyle = '#34d399';
            ctx.fillText('wyacoomz@thinkpad-t14:~$', winX + 32, y);
            ctx.fillStyle = '#f8fafc';
            ctx.fillText(entry.command, winX + 410, y);
            y += 38;

            ctx.font = '22px "JetBrains Mono", monospace';
            entry.output.forEach((line) => {
              if (line.startsWith('Available') || line.startsWith('Developer') || line.startsWith('Core')) {
                ctx.fillStyle = '#38bdf8';
              } else if (line.startsWith('  •') || line.startsWith('  [')) {
                ctx.fillStyle = '#f1f5f9';
              } else if (line.startsWith('Tip:')) {
                ctx.fillStyle = '#94a3b8';
              } else {
                ctx.fillStyle = '#cbd5e1';
              }
              ctx.fillText(line, winX + 32, y);
              y += 34;
            });
            y += 18;
          });

          // Active Input line
          ctx.font = 'bold 24px "JetBrains Mono", monospace';
          ctx.fillStyle = '#34d399';
          ctx.fillText('wyacoomz@thinkpad-t14:~$', winX + 32, y);

          ctx.fillStyle = '#ffffff';
          const input = stateRef.current.terminalInput;
          ctx.fillText(input, winX + 410, y);

          // Blinking cursor
          if (stateRef.current.cursorVisible) {
            const w = ctx.measureText(input).width;
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(winX + 410 + w + 4, y - 22, 14, 28);
          }

          // Terminal Quick Action Buttons
          ctx.fillStyle = '#16202e';
          ctx.fillRect(winX, winY + winH - 72, winW, 72);
          ctx.fillStyle = '#94a3b8';
          ctx.font = 'bold 18px "JetBrains Mono", monospace';
          ctx.fillText('Quick Run:', winX + 24, winY + winH - 30);

          const quickCmds = ['whoami', 'projects', 'pipeline', 'skills', 'leetcode', 'resume', 'contact', 'clear'];
          quickCmds.forEach((cmd, idx) => {
            const bx = winX + 150 + idx * 170;
            ctx.fillStyle = '#223044';
            ctx.beginPath();
            ctx.roundRect(bx, winY + winH - 54, 155, 38, 6);
            ctx.fill();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#f8fafc';
            ctx.font = '16px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(cmd, bx + 77, winY + winH - 30);
          });
          ctx.textAlign = 'left';
        }

        // --------------------------------------------------------------------
        // WINDOW 2: D365 PIPELINE SIMULATION STUDIO
        // --------------------------------------------------------------------
        if (currentApp === 'pipeline') {
          // Subsidiary Badges
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.fillStyle = '#38bdf8';
          ctx.fillText('Enterprise Subsidiaries Handled (5 Companies):', winX + 32, winY + 105);

          const subs = [
            'Sisi’s Eatery', 'Maristo Interior Design', 'Ring Gelene', 'Maristo Hospitality', 'Al Yasat Catering LLC'
          ];
          subs.forEach((sub, i) => {
            const sx = winX + 32 + i * 360;
            ctx.fillStyle = '#1b2636';
            ctx.beginPath();
            ctx.roundRect(sx, winY + 125, 340, 42, 6);
            ctx.fill();
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#f1f5f9';
            ctx.font = '16px system-ui, sans-serif';
            ctx.fillText(`🏢 ${sub}`, sx + 18, winY + 152);
          });

          // 5 Pipeline Stage Cards
          const stages = [
            { id: 1, name: '01. SharePoint Intake', desc: 'Auto-monitors multi-entity folders & ingests unread invoice attachments.' },
            { id: 2, name: '02. AI Builder OCR', desc: 'Machine extraction of PO#, invoice totals, tax breakdowns, vendor details.' },
            { id: 3, name: '03. Validation Checks', desc: 'Confidence score verification (>85%) & mandatory field checks.' },
            { id: 4, name: '04. Excel Preparation', desc: 'Translates validated payloads into company-specific General Journal schemas.' },
            { id: 5, name: '05. Dynamics 365 Upload', desc: 'Power Automate Desktop enters records via UI/API with zero human intervention.' }
          ];

          const pStep = stateRef.current.pipelineStep;
          stages.forEach((stg, idx) => {
            const cy = winY + 205 + idx * 88;
            const isCompleted = pStep >= stg.id;
            const isCurrent = pStep === stg.id && stateRef.current.pipelineRunning;

            ctx.fillStyle = isCurrent ? '#1e3a5f' : isCompleted ? '#162e24' : '#141c28';
            ctx.beginPath();
            ctx.roundRect(winX + 32, cy, winW - 64, 76, 8);
            ctx.fill();

            ctx.strokeStyle = isCurrent ? '#38bdf8' : isCompleted ? '#22c55e' : '#263447';
            ctx.lineWidth = isCurrent ? 2 : 1;
            ctx.stroke();

            // Status Badge
            ctx.fillStyle = isCurrent ? '#38bdf8' : isCompleted ? '#22c55e' : '#64748b';
            ctx.beginPath();
            ctx.arc(winX + 70, cy + 38, 16, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(isCompleted ? '✓' : `${stg.id}`, winX + 70, cy + 44);
            ctx.textAlign = 'left';

            ctx.font = 'bold 20px system-ui, sans-serif';
            ctx.fillStyle = '#f8fafc';
            ctx.fillText(stg.name, winX + 110, cy + 36);

            ctx.font = '16px system-ui, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(stg.desc, winX + 110, cy + 60);

            // Right side state tag
            ctx.font = 'bold 16px "JetBrains Mono", monospace';
            ctx.fillStyle = isCurrent ? '#38bdf8' : isCompleted ? '#22c55e' : '#64748b';
            ctx.textAlign = 'right';
            ctx.fillText(isCurrent ? 'PROCESSING...' : isCompleted ? 'VERIFIED ✓' : 'STANDBY', winX + winW - 60, cy + 44);
            ctx.textAlign = 'left';
          });

          // Run Pipeline Button
          const btnY = winY + 680;
          ctx.fillStyle = stateRef.current.pipelineRunning ? '#0369a1' : '#0284c7';
          ctx.beginPath();
          ctx.roundRect(winX + 32, btnY, 340, 56, 8);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.fillText(stateRef.current.pipelineRunning ? `Simulating Stage 0${pStep}...` : '▶ Run Bot Pipeline Simulation', winX + 60, btnY + 36);

          ctx.font = '16px system-ui, sans-serif';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText('Simulates full unattended cycle across Power Automate Cloud, AI Builder, Excel & D365 Desktop.', winX + 400, btnY + 36);
        }

        // --------------------------------------------------------------------
        // WINDOW 3: PROJECTS EXPLORER
        // --------------------------------------------------------------------
        if (currentApp === 'projects') {
          PROJECTS.slice(0, 6).forEach((p, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const px = winX + 32 + col * (winW / 2 - 20);
            const py = winY + 95 + row * 190;
            const cardW = winW / 2 - 40;

            ctx.fillStyle = '#16202e';
            ctx.beginPath();
            ctx.roundRect(px, py, cardW, 172, 8);
            ctx.fill();
            ctx.strokeStyle = '#263447';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Category Badge
            ctx.fillStyle = '#0284c7';
            ctx.beginPath();
            ctx.roundRect(px + 20, py + 18, 180, 28, 4);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.category, px + 110, py + 37);
            ctx.textAlign = 'left';

            // Title
            ctx.font = 'bold 22px system-ui, sans-serif';
            ctx.fillStyle = '#f8fafc';
            ctx.fillText(p.title, px + 215, py + 39);

            // Description
            ctx.font = '16px system-ui, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(p.shortDescription.slice(0, 85) + '...', px + 20, py + 80);

            // Tech Tags
            p.tags.slice(0, 4).forEach((t, ti) => {
              const tx = px + 20 + ti * 160;
              ctx.fillStyle = '#1f2e42';
              ctx.beginPath();
              ctx.roundRect(tx, py + 120, 150, 32, 4);
              ctx.fill();

              ctx.fillStyle = '#38bdf8';
              ctx.font = '14px "JetBrains Mono", monospace';
              ctx.fillText(t, tx + 12, py + 142);
            });
          });
        }

        // --------------------------------------------------------------------
        // WINDOW 4: RESUME VIEWER (EVINCE)
        // --------------------------------------------------------------------
        if (currentApp === 'resume') {
          // Top document bar
          ctx.fillStyle = '#162232';
          ctx.fillRect(winX + 24, winY + 75, winW - 48, 55);

          ctx.font = 'bold 18px system-ui, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText('Page 1 of 1 • Abdul_Samad_Khan_Resume.pdf (Verified Local Record)', winX + 45, winY + 110);

          // Download PDF button
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.roundRect(winX + winW - 320, winY + 84, 280, 38, 6);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px system-ui, sans-serif';
          ctx.fillText('📥 Download PDF Resume', winX + winW - 300, winY + 109);

          // Rendered Resume Paper Sheet
          const rx = winX + 180;
          const ry = winY + 155;
          const rw = winW - 360;
          const rh = winH - 185;

          ctx.fillStyle = '#fbfbf9';
          ctx.fillRect(rx, ry, rw, rh);
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2;
          ctx.strokeRect(rx, ry, rw, rh);

          // Resume Header
          ctx.font = 'bold 36px "Newsreader", serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText('ABDUL SAMAD KHAN', rx + 50, ry + 65);

          ctx.font = '18px system-ui, sans-serif';
          ctx.fillStyle = '#475569';
          ctx.fillText('RPA Developer • Enterprise Systems Automation • B.Tech AI & Data Science', rx + 50, ry + 100);
          ctx.fillText('abdulischad@gmail.com • Bhopal, India (IST UTC +05:30) • github.com/wyacoomz', rx + 50, ry + 126);

          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(rx + 50, ry + 145, rw - 100, 2);

          // Experience Section
          ctx.font = 'bold 22px system-ui, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText('PROFESSIONAL EXPERIENCE', rx + 50, ry + 185);

          ctx.font = 'bold 19px system-ui, sans-serif';
          ctx.fillText('Trufe — RPA Developer', rx + 50, ry + 220);
          ctx.font = '17px system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText('2025 – Present | Enterprise Automation', rx + 50, ry + 245);

          ctx.fillStyle = '#1e293b';
          ctx.fillText('• Engineered end-to-end multi-entity AI invoice processing bot across 5 subsidiaries into Dynamics 365.', rx + 65, ry + 275);
          ctx.fillText('• Developed multi-bank financial reconciliations (SNB & Al Rajhi) with deterministic error recovery.', rx + 65, ry + 305);
          ctx.fillText('• Built Keyloop customer creation and STD mapping flows reducing manual entry by 100%.', rx + 65, ry + 335);

          // Education Section
          ctx.font = 'bold 22px system-ui, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText('EDUCATION & CREDENTIALS', rx + 50, ry + 385);

          ctx.font = 'bold 19px system-ui, sans-serif';
          ctx.fillText('B.Tech in Artificial Intelligence & Data Science', rx + 50, ry + 420);
          ctx.font = '17px system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText('Oriental Institute of Science & Technology (OIST) | 2021 – 2025', rx + 50, ry + 445);

          // LeetCode Benchmarks
          ctx.font = 'bold 19px system-ui, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText('LeetCode: 150+ Problems Solved (Data Structures & Algorithmic Optimization)', rx + 50, ry + 485);
        }

        // --------------------------------------------------------------------
        // WINDOW 5: FIELD NOTES (GEDIT)
        // --------------------------------------------------------------------
        if (currentApp === 'notes') {
          const notesText = [
            '# Practical Engineering Decisions in Production RPA & Systems',
            '',
            '## 1. Deterministic Exception Handling vs "Black Box" AI',
            'In the Maristo AI Invoice Bot, AI Builder extracts values with varying confidence.',
            'Rather than allowing uncertain OCR outputs to directly hit Dynamics 365,',
            'a strict validation gate is enforced (>85% confidence score).',
            'Uncertain or missing fields are routed to a structured human-in-the-loop exception queue,',
            'completely eliminating poisoned database states and manual reconciliation rollbacks.',
            '',
            '## 2. Multi-Bank Weekend & Balance Logic',
            'Different banking institutions (SNB vs Al Rajhi) follow varying holiday schedules.',
            'Our Power Automate engine calculates calendar dates deterministically,',
            'validating opening balance = previous business day closing balance before queuing.',
            '',
            '## 3. Algorithmic Foundation (LeetCode 150+ Solved)',
            'Mastery of graphs (BFS/DFS), dynamic programming, and tree traversals directly',
            'informs clean system design, optimal time complexity, and robust state machines.'
          ];

          let ny = winY + 105;
          notesText.forEach((line, idx) => {
            // Line numbers
            ctx.font = '18px "JetBrains Mono", monospace';
            ctx.fillStyle = '#64748b';
            ctx.fillText(`${idx + 1}`.padStart(2, ' '), winX + 30, ny);

            ctx.fillStyle = line.startsWith('#') ? '#38bdf8' : '#e2e8f0';
            ctx.fillText(line, winX + 75, ny);
            ny += 32;
          });
        }

        // --------------------------------------------------------------------
        // WINDOW 6: ABOUT / SYSTEM SPECS (NEOFETCH)
        // --------------------------------------------------------------------
        if (currentApp === 'about') {
          // Left: ASCII ThinkPad Tux Logo
          const asciiLogo = [
            "         .---.",
            "        /     \\",
            "       | () () |",
            "        \\  -  /",
            "        .-'---'-.",
            "       /  Think  \\",
            "      | |  Pad  | |",
            "      | \\     / |",
            "     (_/ '---' \\_)"
          ];

          ctx.font = 'bold 24px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ef4444';
          asciiLogo.forEach((line, i) => {
            ctx.fillText(line, winX + 80, winY + 140 + i * 36);
          });

          // Right: Neofetch System Information
          const specs = [
            { label: 'OS', val: 'Ubuntu 24.04 LTS x86_64' },
            { label: 'Host', val: 'ThinkPad T14 Gen 3 (21AH)' },
            { label: 'Kernel', val: '6.8.0-45-generic' },
            { label: 'Uptime', val: '14 days, 6 hours, 28 mins' },
            { label: 'Shell', val: 'bash 5.2.21' },
            { label: 'Resolution', val: '1920x1200 @ 60Hz (IPS Antiglare)' },
            { label: 'DE', val: 'GNOME 46.0' },
            { label: 'WM', val: 'Mutter' },
            { label: 'CPU', val: '12th Gen Intel(R) Core(TM) i7-1260P (16) @ 4.70 GHz' },
            { label: 'GPU', val: 'Intel Iris Xe Graphics' },
            { label: 'Memory', val: '32 GB DDR4 3200 MT/s' },
            { label: 'Developer', val: 'Abdul Samad Khan (wyacoomz)' },
            { label: 'Current Role', val: 'RPA Developer @ Trufe' },
            { label: 'LeetCode', val: '150+ Solved (Graphs, DP, Trees)' },
            { label: 'Location', val: 'Bhopal, India (IST UTC +05:30)' }
          ];

          let sy = winY + 120;
          specs.forEach((s) => {
            ctx.font = 'bold 20px "JetBrains Mono", monospace';
            ctx.fillStyle = '#38bdf8';
            ctx.fillText(`${s.label}:`.padEnd(14, ' '), winX + 440, sy);

            ctx.fillStyle = '#f8fafc';
            ctx.fillText(s.val, winX + 620, sy);
            sy += 36;
          });
        }
      }

      // (D) Top GNOME Panel (y: 0..52)
      ctx.fillStyle = '#0f141f';
      ctx.fillRect(0, 0, 2048, 52);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 50, 2048, 2);

      // Activities Pill Button
      ctx.fillStyle = stateRef.current.activeApp === 'desktop' ? '#38bdf8' : '#223044';
      ctx.beginPath();
      ctx.roundRect(20, 10, 120, 32, 16);
      ctx.fill();

      ctx.fillStyle = stateRef.current.activeApp === 'desktop' ? '#0f172a' : '#f8fafc';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Activities', 80, 32);

      // Active Application Label in Top Bar
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`• ${currentApp.toUpperCase()}`, 160, 32);

      // Center Clock & Date
      const dateStr = new Date().toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText(`Sat Oct 24   ${dateStr} IST`, 1024, 32);

      // Right System Tray (WiFi, Volume, Battery, Power)
      ctx.textAlign = 'right';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('📶 WiFi   🔊 85%   ⚡ 98%   ⏻', 2020, 32);
      ctx.textAlign = 'left';

      // (E) Left Translucent Dock / Launcher (x: 0..86, y: 52..1300)
      ctx.fillStyle = '#0b0f17cc';
      ctx.fillRect(0, 52, 86, 1248);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(84, 52, 2, 1248);

      const dockApps = [
        { id: 'terminal', icon: '💻', label: 'Terminal', y: 80 },
        { id: 'pipeline', icon: '⚙️', label: 'D365 Bot', y: 156 },
        { id: 'projects', icon: '📁', label: 'Projects', y: 232 },
        { id: 'resume', icon: '📄', label: 'Resume', y: 308 },
        { id: 'notes', icon: '📝', label: 'Notes', y: 384 },
        { id: 'about', icon: '👤', label: 'About', y: 460 },
        { id: 'browser', icon: '🌐', label: 'GitHub', y: 536 }
      ];

      dockApps.forEach(item => {
        const isActive = currentApp === item.id;

        // Hover / Active Icon Box
        if (isActive) {
          ctx.fillStyle = '#1e2d42';
          ctx.beginPath();
          ctx.roundRect(12, item.y, 62, 58, 10);
          ctx.fill();

          // Active glowing dot on far left
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(6, item.y + 29, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.icon, 43, item.y + 40);
      });
      ctx.textAlign = 'left';

      // Trash bin at dock bottom
      ctx.font = '30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🗑️', 43, 1250);
      ctx.textAlign = 'left';

      screenTexture.needsUpdate = true;
    };

    // 8. Animation & Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera lerp transition
      const targetPos = isFocused ? focusedCamPos : deskCamPos;
      const targetLook = isFocused ? focusedCamLook : deskCamLook;

      camera.position.lerp(targetPos, 0.08);
      controls.target.lerp(targetLook, 0.08);
      controls.update();

      drawLinuxScreen();
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
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      honeyOakTex.dispose();
      matTex.dispose();
      keyboardDeckTex.dispose();
      thinkpadBadgeTex.dispose();
      intelBadgeTex.dispose();
      sidePortsTex.dispose();
      bezelTex.dispose();
      screenTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [executeCommand, runPipelineSimulation, isFocused]);

  // Lamp toggle
  const toggleLamp = () => {
    audioEngine.playSwitchClick();
    setLampOn((prev) => {
      const next = !prev;
      if (stateRef.current.deskLampLight) {
        stateRef.current.deskLampLight.intensity = next ? 3.4 : 0.0;
      }
      return next;
    });
  };

  const toggleSound = () => {
    audioEngine.enabled = !audioEngine.enabled;
    setSoundEnabled(audioEngine.enabled);
  };

  const resetCamera = () => {
    audioEngine.playKeyClick();
    setIsFocused(false);
  };

  const toggleFocus = () => {
    audioEngine.playKeyClick();
    setIsFocused((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#0a0d12]">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Tactical Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none z-20">
        
        {/* Left: Return Link & ThinkPad T14 Brand */}
        <div className="pointer-events-auto flex items-center space-x-2">
          <a
            href="http://localhost:3000"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#141a24]/95 hover:bg-[#1e293b] text-[#f8fafc] text-xs font-mono rounded-xs border border-[#334155] transition-colors backdrop-blur-md shadow-sm"
            title="Return to the Editorial Field Journal Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="hidden sm:inline">Editorial Portfolio</span>
          </a>

          <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] rounded-xs text-xs font-mono text-[#f8fafc] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span className="font-bold text-[#f8fafc]">THINKPAD T14</span>
            <span className="text-[#64748b] hidden sm:inline">&bull;</span>
            <span className="text-[#38bdf8] hidden sm:inline">UBUNTU LINUX DESKTOP</span>
          </div>
        </div>

        {/* Center: Linux Apps Selector (Click icons on screen or pills here) */}
        {!isFocused && (
          <div className="pointer-events-auto hidden md:flex items-center space-x-1 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] p-1 rounded-xs shadow-sm overflow-x-auto">
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('terminal'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all flex items-center space-x-1 ${
                activeApp === 'terminal' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>💻 Terminal</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('pipeline'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeApp === 'pipeline' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>⚙️ D365 Bot</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('projects'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeApp === 'projects' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>📁 Projects</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('resume'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeApp === 'resume' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>📄 Resume</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('about'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeApp === 'about' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>👤 Specs</span>
            </button>
            <button
              onClick={() => { audioEngine.playKeyClick(); setActiveApp('desktop'); }}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all ${
                activeApp === 'desktop' ? 'bg-[#0284c7] text-[#ffffff] font-bold' : 'text-[#94a3b8] hover:text-[#ffffff]'
              }`}
            >
              <span>🖥️ Desktop</span>
            </button>
          </div>
        )}

        {/* Right: Camera & Lighting Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] p-1 rounded-xs shadow-sm">
          <button
            type="button"
            onClick={toggleFocus}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xs text-xs font-mono transition-all ${
              isFocused 
                ? 'bg-[#0284c7] text-[#ffffff] font-bold' 
                : 'text-[#cbd5e1] hover:text-[#ffffff] hover:bg-[#1e293b]'
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
                : 'text-[#94a3b8] hover:text-[#ffffff] hover:bg-[#1e293b]'
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
              soundEnabled ? 'text-[#38bdf8] hover:bg-[#1e293b]' : 'text-[#94a3b8] hover:bg-[#1e293b]'
            }`}
            title={soundEnabled ? 'Mute Keyboard Sounds' : 'Enable Keyboard Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={resetCamera}
            className="p-1.5 text-[#94a3b8] hover:text-[#ffffff] hover:bg-[#1e293b] rounded-xs transition-colors"
            title="Reset 3D camera angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 text-[#94a3b8] hover:text-[#ffffff] hover:bg-[#1e293b] rounded-xs transition-colors"
            title="About this workstation"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f141c] border border-[#334155] rounded-sm max-w-md w-full p-6 text-xs font-mono space-y-4 shadow-xl pointer-events-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
              <span className="font-bold text-[#38bdf8] uppercase">ThinkPad T14 Linux Workstation</span>
              <button 
                type="button"
                onClick={() => setShowInfo(false)}
                className="text-[#94a3b8] hover:text-[#ffffff]"
              >
                [Esc / Close]
              </button>
            </div>

            <div className="space-y-2 text-[#cbd5e1] leading-relaxed">
              <p>
                Modeled after a real Lenovo ThinkPad T14 on a warm honey oak desk, running an authentic <strong className="text-[#38bdf8]">Ubuntu Linux Desktop UI</strong> for <strong className="text-[#f8fafc]">Abdul Samad Khan (wyacoomz)</strong>.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[#94a3b8]">
                <li><strong className="text-[#f8fafc]">Linux Navigation</strong>: Click icons on the left dock or desktop to launch apps (Terminal, D365 Bot, Projects, Resume, Field Notes).</li>
                <li><strong className="text-[#f8fafc]">Window Controls</strong>: Click the red close button (×) at top-right of any window to close it back to the desktop!</li>
                <li><strong className="text-[#f8fafc]">Tactile Hardware</strong>: Authentic chiclet keyboard with smile dish curves, inverted-T arrow cluster, flush red TrackPoint, and integrated clickpad buttons.</li>
                <li><strong className="text-[#f8fafc]">Procedural Audio</strong>: Authentic mechanical keyboard clicks synthesized with Web Audio API.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#334155]">
              <span className="text-[10px] text-[#64748b]">Bhopal, India (IST UTC +05:30)</span>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="px-3 py-1 bg-[#0284c7] text-[#ffffff] rounded-xs hover:bg-[#38bdf8] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Interactive Dock & Command Runner */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none z-20">
        {activeApp === 'terminal' ? (
          <div className="pointer-events-auto w-full sm:max-w-2xl flex items-center space-x-2 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] px-3.5 py-2 rounded-xs shadow-md">
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
              className="w-full bg-transparent text-xs font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => executeCommand(terminalInput)}
              className="px-2.5 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-[#ffffff] text-[11px] font-mono rounded-xs transition-colors flex-shrink-0"
            >
              Run
            </button>
          </div>
        ) : activeApp === 'pipeline' ? (
          <div className="pointer-events-auto flex items-center space-x-3 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] px-4 py-2 rounded-xs shadow-md">
            <button
              onClick={runPipelineSimulation}
              disabled={pipelineRunning}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 text-[#ffffff] text-xs font-mono rounded-xs border border-[#38bdf8] transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-[#ffffff]" />
              <span>{pipelineRunning ? `Simulating Stage 0${pipelineStep}...` : 'Run Pipeline Simulation'}</span>
            </button>
            <span className="text-[11px] font-mono text-[#94a3b8]">5 Entities: Sisi, Interior, Ring Gelene, Hospitality, AYC</span>
          </div>
        ) : (
          <div className="pointer-events-auto flex items-center space-x-3 bg-[#141a24]/95 backdrop-blur-md border border-[#334155] px-4 py-2 rounded-xs shadow-md">
            <span className="text-xs font-mono text-[#38bdf8]">Click icons on the Linux screen to explore</span>
          </div>
        )}

        {/* Tactical Helper Hint */}
        <div className="hidden lg:flex items-center space-x-3 text-[11px] font-mono text-[#94a3b8] bg-[#141a24]/90 backdrop-blur-md border border-[#334155] px-3 py-1.5 rounded-xs">
          <span>🖱 Drag to orbit</span>
          <span>&bull;</span>
          <span>🔍 Scroll to zoom</span>
          <span>&bull;</span>
          <span>⌨ Click screen to interact</span>
        </div>
      </div>
    </div>
  );
};
