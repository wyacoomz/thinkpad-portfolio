import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ZoomIn, ZoomOut, RotateCcw, Lightbulb, Terminal, Play, 
  Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Info,
  LayoutGrid, FileText, CheckCircle2, ChevronRight, Download,
  Laptop, Power
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { LinuxDesktopOS } from './LinuxDesktopOS';

// ==========================================
// TACTICAL AUDIO SYNTHESIZER
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
      snap.frequency.setValueAtTime(2200 + (Math.random() - 0.5) * 300, t);
      snap.frequency.exponentialRampToValueAtTime(180, t + 0.022);
      snapGain.gain.setValueAtTime(0.08, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.025);

      const thock = this.ctx.createOscillator();
      const thockGain = this.ctx.createGain();
      thock.type = 'sine';
      thock.frequency.setValueAtTime(240 + (Math.random() - 0.5) * 40, t);
      thock.frequency.exponentialRampToValueAtTime(55, t + 0.035);
      thockGain.gain.setValueAtTime(0.12, t);
      thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
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
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.032);
    } catch {}
  }

  public playLidOpenSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const pop = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      pop.type = 'triangle';
      pop.frequency.setValueAtTime(340, t);
      pop.frequency.exponentialRampToValueAtTime(95, t + 0.045);
      popGain.gain.setValueAtTime(0.14, t);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      pop.connect(popGain);
      popGain.connect(this.ctx.destination);
      pop.start(t);
      pop.stop(t + 0.048);

      const sweep = this.ctx.createOscillator();
      const sweepGain = this.ctx.createGain();
      sweep.type = 'sine';
      sweep.frequency.setValueAtTime(140, t + 0.02);
      sweep.frequency.exponentialRampToValueAtTime(320, t + 0.22);
      sweepGain.gain.setValueAtTime(0.001, t);
      sweepGain.gain.linearRampToValueAtTime(0.08, t + 0.06);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      sweep.connect(sweepGain);
      sweepGain.connect(this.ctx.destination);
      sweep.start(t + 0.02);
      sweep.stop(t + 0.26);
    } catch {}
  }

  public playLidCloseSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(160, t);
      thud.frequency.exponentialRampToValueAtTime(40, t + 0.06);
      thudGain.gain.setValueAtTime(0.18, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(t);
      thud.stop(t + 0.065);

      const snap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snap.type = 'triangle';
      snap.frequency.setValueAtTime(700, t);
      snap.frequency.exponentialRampToValueAtTime(140, t + 0.025);
      snapGain.gain.setValueAtTime(0.09, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      snap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snap.start(t);
      snap.stop(t + 0.03);
    } catch {}
  }

  public playBootChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.06, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 0.48);
      });
    } catch {}
  }
}

const audioEngine = new TacticalAudioEngine();

// ==========================================
// PROCEDURAL TEXTURE GENERATORS
// ==========================================

// 1. Natural Warm Honey Oak Desk Texture
function generateWarmHoneyOakTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#b88248';
  ctx.fillRect(0, 0, 2048, 2048);

  const plankH = 256;
  for (let y = 0; y < 2048; y += plankH) {
    const toneVar = (Math.sin(y * 0.012) * 0.08) - 0.04;
    ctx.fillStyle = toneVar > 0 ? 'rgba(255,225,185,0.12)' : 'rgba(80,45,15,0.14)';
    ctx.fillRect(0, y, 2048, plankH);

    ctx.strokeStyle = '#5a3414';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(40,20,5,0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y + 2);
    ctx.lineTo(2048, y + 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,235,200,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y - 1);
    ctx.lineTo(2048, y - 1);
    ctx.stroke();
  }

  for (let i = 0; i < 480; i++) {
    const yBase = (i / 480) * 2048;
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= 2048; x += 32) {
      const ny = yBase + Math.sin(x * 0.008 + i * 0.4) * 5 + Math.cos(x * 0.02) * 2;
      ctx.lineTo(x, ny);
    }
    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = i % 4 === 0 ? '#633816' : i % 2 === 0 ? '#7a461d' : '#ebbe85';
    ctx.lineWidth = 1.2 + Math.sin(i * 0.15) * 0.8;
    ctx.stroke();
  }

  ctx.globalAlpha = 0.07;
  ctx.fillStyle = '#42240c';
  for (let s = 0; s < 30000; s++) {
    ctx.fillRect(Math.random() * 2048, Math.random() * 2048, Math.random() * 5 + 2, 1.2);
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  return texture;
}

// 2. Authentic Outer ThinkPad Lid Texture
function generateThinkPadOuterLidTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#16171a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.035;
  for (let i = 0; i < 25000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }
  ctx.globalAlpha = 1.0;

  ctx.strokeStyle = '#2d3038';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  // Top-left: "Lenovo" engraved metallic badge (near hinge)
  ctx.save();
  ctx.translate(140, 100);
  ctx.fillStyle = '#101114';
  ctx.fillRect(0, 0, 140, 48);
  ctx.strokeStyle = '#272930';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 140, 48);
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'center';
  ctx.fillText('Lenovo', 70, 32);
  ctx.restore();

  // Top-right: Iconic ThinkPad 45-degree Logo (near hinge)
  ctx.save();
  ctx.translate(canvas.width - 280, 160);
  ctx.rotate(-Math.PI / 4); // 45 deg angle

  ctx.font = 'bold 58px "JetBrains Mono", system-ui, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.fillText('Think', 0, 40);

  ctx.fillStyle = '#9499a8';
  ctx.fillText('Pad', 168, 40);

  // Red circle placeholder for 'i' dot
  ctx.beginPath();
  ctx.arc(88, -2, 7.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();

  // Bottom center: front lip notch
  ctx.save();
  ctx.fillStyle = '#101114';
  ctx.beginPath();
  ctx.roundRect(canvas.width / 2 - 120, canvas.height - 18, 240, 18, 8);
  ctx.fill();
  ctx.restore();

  return new THREE.CanvasTexture(canvas);
}

// 3. Authentic Lenovo ThinkPad T14 Keyboard Deck Texture (3072x1536)
function generateThinkPadT14KeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 3072;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#151619';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const wellW = 2880;
  const wellH = 1380;
  const wellX = (canvas.width - wellW) / 2; // 96
  const wellY = 80;

  ctx.fillStyle = '#0a0b0d';
  ctx.fillRect(wellX, wellY, wellW, wellH);

  ctx.strokeStyle = '#050608';
  ctx.lineWidth = 5;
  ctx.strokeRect(wellX, wellY, wellW, wellH);

  // Power Button
  const pwrX = wellX + wellW - 90;
  const pwrY = wellY - 42;
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#181a1e';
  ctx.fill();
  ctx.strokeStyle = '#323640';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;

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

    ctx.fillStyle = '#060709';
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 4, w, h, 9);
    ctx.fill();

    const keyGrad = ctx.createLinearGradient(x, y, x, y + h);
    if (isSpecial) {
      keyGrad.addColorStop(0, '#22252a');
      keyGrad.addColorStop(0.5, '#1b1d22');
      keyGrad.addColorStop(1, '#141619');
    } else {
      keyGrad.addColorStop(0, '#282b32');
      keyGrad.addColorStop(0.4, '#1f2126');
      keyGrad.addColorStop(1, '#17181c');
    }

    ctx.fillStyle = keyGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    ctx.strokeStyle = '#383c46';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + h - 2);
    ctx.quadraticCurveTo(x + w / 2, y + h + 2, x + w - 10, y + h - 2);
    ctx.stroke();

    const dishGrad = ctx.createRadialGradient(x + w / 2, y + h * 0.45, 4, x + w / 2, y + h * 0.45, w * 0.55);
    dishGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
    dishGrad.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = dishGrad;
    ctx.beginPath();
    ctx.roundRect(x + 4, y + 4, w - 8, h - 8, 6);
    ctx.fill();

    if (tpCutout === 'right') {
      ctx.fillStyle = '#0a0b0d';
      ctx.beginPath();
      ctx.arc(x + w + 1, y + h * 0.5, 34, 0, Math.PI * 2);
      ctx.fill();
    } else if (tpCutout === 'left') {
      ctx.fillStyle = '#0a0b0d';
      ctx.beginPath();
      ctx.arc(x - 1, y + h * 0.5, 34, 0, Math.PI * 2);
      ctx.fill();
    } else if (tpCutout === 'top') {
      ctx.fillStyle = '#0a0b0d';
      ctx.beginPath();
      ctx.arc(x + w * 0.5, y - 2, 34, 0, Math.PI * 2);
      ctx.fill();
    }

    if (hasGreenLed) {
      ctx.beginPath();
      ctx.arc(x + 16, y + 16, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#f1f5f9';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 2;

    if (align === 'center') {
      ctx.textAlign = 'center';
      const textY = subLabel ? y + h / 2 + fontSize * 0.15 : y + h / 2 + fontSize * 0.35;
      ctx.fillText(label, x + w / 2, textY);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(label, x + 16, y + h / 2 + fontSize * 0.35);
    }

    if (subLabel) {
      ctx.font = `500 20px system-ui, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(subLabel, x + w / 2, y + 30);
    }
  };

  // ROW 0: Function Keys
  const r0Y = wellY + 16;
  const r0H = 145;
  const fnW = 142;
  const gap = 14;

  let cx = wellX + 16;
  drawKeycap(cx, r0Y, 155, r0H, 'Esc', '', { hasGreenLed: true, fontSize: 26 });
  cx += 155 + gap;

  const f1_4 = [
    { l: 'F1', s: 'Mute' }, { l: 'F2', s: 'Vol-' }, { l: 'F3', s: 'Vol+' }, { l: 'F4', s: 'Mic' }
  ];
  f1_4.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24;

  const f5_8 = [
    { l: 'F5', s: 'Bri-' }, { l: 'F6', s: 'Bri+' }, { l: 'F7', s: 'Proj' }, { l: 'F8', s: 'Air' }
  ];
  f5_8.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24;

  const f9_12 = [
    { l: 'F9', s: 'Gear' }, { l: 'F10', s: 'Search' }, { l: 'F11', s: 'Star' }, { l: 'F12', s: 'App' }
  ];
  f9_12.forEach(k => {
    drawKeycap(cx, r0Y, fnW, r0H, k.l, k.s, { fontSize: 24 });
    cx += fnW + gap;
  });
  cx += 24;

  const navKeys = ['Home', 'End', 'Insert', 'Delete'];
  navKeys.forEach(l => {
    drawKeycap(cx, r0Y, fnW + 4, r0H, l, '', { fontSize: 22 });
    cx += fnW + 4 + gap;
  });

  // ROW 1: Numbers
  const r1Y = r0Y + r0H + gap;
  const r1H = 195;
  cx = wellX + 16;
  const stdW = 168;

  const row1 = ['~ `', '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )', '- _', '= +'];
  row1.forEach(l => {
    drawKeycap(cx, r1Y, stdW, r1H, l, '', { fontSize: 28 });
    cx += stdW + gap;
  });
  const bkspW = wellX + wellW - 16 - cx;
  drawKeycap(cx, r1Y, bkspW, r1H, 'Backspace', '', { fontSize: 26, isSpecial: true });

  // ROW 2: Tab, QWERTYUIOP
  const r2Y = r1Y + r1H + gap;
  const r2H = 195;
  cx = wellX + 16;

  const tabW = 245;
  drawKeycap(cx, r2Y, tabW, r2H, 'Tab', '', { fontSize: 28, isSpecial: true, align: 'left' });
  cx += tabW + gap;

  const row2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }'];
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
  drawKeycap(cx, r3Y, enterW, r3H, 'Enter', '', { fontSize: 28, isSpecial: true });

  // ROW 4: Shift, ZXCVBNM, Shift
  const r4Y = r3Y + r3H + gap;
  const r4H = 195;
  cx = wellX + 16;

  const lShiftW = 355;
  drawKeycap(cx, r4Y, lShiftW, r4H, 'Shift', '', { fontSize: 26, isSpecial: true, align: 'left' });
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
  drawKeycap(cx, r4Y, rShiftW, r4H, 'Shift', '', { fontSize: 26, isSpecial: true });

  // ROW 5: Fn, Ctrl, Win, Alt, Space, AltGr, PrtSc, Ctrl, Arrow cluster
  const r5Y = r4Y + r4H + gap;
  const r5H = 205;
  cx = wellX + 16;

  drawKeycap(cx, r5Y, 150, r5H, 'Fn', '', { fontSize: 28, isSpecial: true });
  cx += 150 + gap;

  drawKeycap(cx, r5Y, 165, r5H, 'Ctrl', '', { fontSize: 26, isSpecial: true });
  cx += 165 + gap;

  drawKeycap(cx, r5Y, 150, r5H, 'Super', '', { fontSize: 24, isSpecial: true });
  cx += 150 + gap;

  drawKeycap(cx, r5Y, 165, r5H, 'Alt', '', { fontSize: 26, isSpecial: true });
  cx += 165 + gap;

  const spaceW = 860;
  drawKeycap(cx, r5Y, spaceW, r5H, '', '', { fontSize: 28 });
  cx += spaceW + gap;

  drawKeycap(cx, r5Y, 165, r5H, 'AltGr', '', { fontSize: 26, isSpecial: true });
  cx += 165 + gap;

  drawKeycap(cx, r5Y, 150, r5H, 'PrtSc', '', { fontSize: 24, isSpecial: true });
  cx += 150 + gap;

  drawKeycap(cx, r5Y, 165, r5H, 'Ctrl', '', { fontSize: 26, isSpecial: true });
  cx += 165 + gap;

  const arrowW = 120;
  const arrowHalfH = (r5H - gap) / 2;

  const topArrowY = r5Y;
  const btmArrowY = r5Y + arrowHalfH + gap;

  drawKeycap(cx, topArrowY, arrowW, arrowHalfH, 'PgUp', '', { fontSize: 18 });
  drawKeycap(cx + arrowW + gap, topArrowY, arrowW, arrowHalfH, 'Up', '', { fontSize: 20 });
  drawKeycap(cx + (arrowW + gap) * 2, topArrowY, arrowW, arrowHalfH, 'PgDn', '', { fontSize: 18 });

  drawKeycap(cx, btmArrowY, arrowW, arrowHalfH, 'Left', '', { fontSize: 20 });
  drawKeycap(cx + arrowW + gap, btmArrowY, arrowW, arrowHalfH, 'Down', '', { fontSize: 20 });
  drawKeycap(cx + (arrowW + gap) * 2, btmArrowY, arrowW, arrowHalfH, 'Right', '', { fontSize: 20 });

  return new THREE.CanvasTexture(canvas);
}

// 4. ThinkPad Palmrest Badge Texture (45 deg angle)
function generateThinkPadBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 256);
  ctx.save();
  ctx.translate(256, 128);
  ctx.rotate(-Math.PI / 4);

  ctx.font = 'bold 58px "JetBrains Mono", system-ui, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.fillText('Think', -140, 20);

  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Pad', 35, 20);

  ctx.beginPath();
  ctx.arc(-52, -22, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 8;
  ctx.fill();

  ctx.restore();
  return new THREE.CanvasTexture(canvas);
}

// 5. Intel Core Badge
function generateIntelBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 200;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 256, 200);
  grad.addColorStop(0, '#0071c5');
  grad.addColorStop(1, '#003c71');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 200);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('intel', 128, 85);

  ctx.font = 'bold 34px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('CORE', 128, 130);

  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('i7', 128, 168);

  return new THREE.CanvasTexture(canvas);
}

// 6. Side Ports Texture
function generateSidePortsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#141518';
  ctx.fillRect(0, 0, 1024, 64);

  // Thunderbolt 4 Type-C Port 1
  ctx.fillStyle = '#060708';
  ctx.beginPath();
  ctx.roundRect(80, 20, 50, 24, 8);
  ctx.fill();
  ctx.strokeStyle = '#2d3038';
  ctx.stroke();

  // Thunderbolt 4 Type-C Port 2
  ctx.beginPath();
  ctx.roundRect(160, 20, 50, 24, 8);
  ctx.fill();
  ctx.stroke();

  // HDMI Port
  ctx.beginPath();
  ctx.roundRect(250, 18, 65, 28, 4);
  ctx.fill();
  ctx.stroke();

  // USB-A 3.2 Port
  ctx.fillStyle = '#060708';
  ctx.fillRect(360, 16, 75, 32);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(370, 22, 55, 10);
  ctx.strokeStyle = '#2d3038';
  ctx.strokeRect(360, 16, 75, 32);

  // 3.5mm Headphone Jack
  ctx.beginPath();
  ctx.arc(480, 32, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#060708';
  ctx.fill();
  ctx.strokeStyle = '#383d47';
  ctx.stroke();

  // Cooling exhaust fins
  ctx.fillStyle = '#050607';
  for (let x = 620; x < 980; x += 18) {
    ctx.fillRect(x, 14, 8, 36);
  }

  return new THREE.CanvasTexture(canvas);
}

// 7. Display Bezel Texture
function generateBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#16171a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const padX = 75;
  const padTop = 65;
  const padBtm = 115;
  ctx.fillStyle = '#0a0b0d';
  ctx.fillRect(padX, padTop, canvas.width - padX * 2, canvas.height - padTop - padBtm);

  // Top bezel center: HD Webcam + ThinkShutter
  const camX = canvas.width / 2;
  const camY = padTop / 2;

  ctx.beginPath();
  ctx.arc(camX, camY, 11, 0, Math.PI * 2);
  ctx.fillStyle = '#050607';
  ctx.fill();
  ctx.strokeStyle = '#2b2e36';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(camX - 2, camY - 2, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(camX + 24, camY - 4, 12, 8);

  ctx.fillStyle = '#050607';
  ctx.beginPath();
  ctx.arc(camX - 70, camY, 3, 0, Math.PI * 2);
  ctx.arc(camX + 70, camY, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillStyle = '#4b505c';
  ctx.textAlign = 'left';
  ctx.fillText('Lenovo', padX + 20, canvas.height - 45);

  ctx.font = '600 24px "JetBrains Mono", system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.fillText('T14', canvas.width - padX - 20, canvas.height - 45);

  return new THREE.CanvasTexture(canvas);
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

  const sceneRef = useRef<{
    lidGroup: THREE.Group | null;
    lidLedMat: THREE.MeshStandardMaterial | null;
    screenTexture: THREE.CanvasTexture | null;
    screenCanvas: HTMLCanvasElement | null;
    screenContext: CanvasRenderingContext2D | null;
    deskLampLight: THREE.SpotLight | null;
    camera: THREE.PerspectiveCamera | null;
    controls: OrbitControls | null;
  }>({
    lidGroup: null,
    lidLedMat: null,
    screenTexture: null,
    screenCanvas: null,
    screenContext: null,
    deskLampLight: null,
    camera: null,
    controls: null
  });

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
      audioEngine.playBootChime();
      setBootPhase('booting');
    }, 600);

    setTimeout(() => {
      setBootPhase('ready');
      setIsFocused(true);
    }, 1500);
  }, []);

  // Close laptop handler
  const closeLaptop = useCallback(() => {
    if (!stateRef.current.isLidOpen) return;
    audioEngine.playLidCloseSound();
    setIsFocused(false);
    setIsLidOpen(false);
    setBootPhase('off');
  }, []);

  // Keyboard shortcut listener
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
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.05);

    const camera = new THREE.PerspectiveCamera(44, container.clientWidth / container.clientHeight, 0.1, 50);
    
    // Balanced camera positions
    const closedDeskCamPos = new THREE.Vector3(0, 3.25, 4.30);
    const closedDeskCamLook = new THREE.Vector3(0, 0.12, 0);

    const openDeskCamPos = new THREE.Vector3(0, 2.50, 4.15);
    const openDeskCamLook = new THREE.Vector3(0, 0.68, -0.40);

    const focusedCamPos = new THREE.Vector3(0, 1.48, 1.70);
    const focusedCamLook = new THREE.Vector3(0, 1.15, -0.68);

    camera.position.copy(closedDeskCamPos);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(closedDeskCamLook);
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 1.2;
    controls.maxDistance = 6.5;

    sceneRef.current.camera = camera;
    sceneRef.current.controls = controls;

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    keyLight.position.set(3.5, 6.0, 4.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.85);
    fillLight.position.set(-4.5, 4.0, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf8fafc, 0.65);
    rimLight.position.set(0, 4.5, -4.0);
    scene.add(rimLight);

    const lampLight = new THREE.SpotLight(0xffebd2, 3.2, 14, Math.PI / 4.5, 0.45, 1.2);
    lampLight.position.set(-3.2, 3.6, -1.2);
    lampLight.target.position.set(0, 0.1, 0);
    lampLight.castShadow = true;
    scene.add(lampLight);
    scene.add(lampLight.target);
    sceneRef.current.deskLampLight = lampLight;

    // 3. Materials
    const honeyOakTex = generateWarmHoneyOakTexture();
    const deskMat = new THREE.MeshStandardMaterial({
      map: honeyOakTex,
      roughness: 0.65,
      metalness: 0.02
    });

    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x161719,
      roughness: 0.42,
      metalness: 0.10,
      clearcoat: 0.15,
      clearcoatRoughness: 0.45
    });

    const outerLidTex = generateThinkPadOuterLidTexture();
    const outerLidMat = new THREE.MeshStandardMaterial({
      map: outerLidTex,
      roughness: 0.40,
      metalness: 0.12
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
      roughness: 0.45,
      metalness: 0.08
    });

    const hingeSteelMat = new THREE.MeshStandardMaterial({
      color: 0x222428,
      roughness: 0.25,
      metalness: 0.88
    });

    const trackPointRedMat = new THREE.MeshStandardMaterial({
      color: 0xdf1a2d,
      roughness: 0.45,
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

    const studioWallMat = new THREE.MeshStandardMaterial({
      color: 0x0e1115,
      roughness: 0.95,
      metalness: 0.0
    });

    // 4. Environment Meshes
    const deskMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 6), deskMat);
    deskMesh.position.set(0, -0.1, 0);
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);

    const wallMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), studioWallMat);
    wallMesh.position.set(0, 4.5, -2.8);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // 5. High-Fidelity 3D ThinkPad T14 Assembly
    const thinkpadGroup = new THREE.Group();
    scene.add(thinkpadGroup);

    // (A) Laptop Base Chassis
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

    // (B) Centered Keyboard Well & Chiclet Deck
    const wellW = 3.16;
    const wellD = 1.34;
    const keyboardPlaneGeo = new THREE.PlaneGeometry(wellW, wellD);
    const keyboardMesh = new THREE.Mesh(keyboardPlaneGeo, keyboardDeckMat);
    keyboardMesh.position.set(0, baseH + 0.002, -0.32);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.receiveShadow = true;
    thinkpadGroup.add(keyboardMesh);

    // TrackPoint exact alignment: G/H cutout is at X = -0.228, Z = -0.318
    const tpX = -0.228;
    const tpZ = -0.318;

    // (C) 3D TrackPoint Nub (Centered between G, H, B)
    const trackPointGroup = new THREE.Group();
    trackPointGroup.position.set(tpX, baseH + 0.008, tpZ);
    thinkpadGroup.add(trackPointGroup);

    const stemGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.016, 12);
    const stemMesh = new THREE.Mesh(stemGeo, hingeSteelMat);
    stemMesh.position.set(0, 0.008, 0);
    trackPointGroup.add(stemMesh);

    const domeGeo = new THREE.CylinderGeometry(0.038, 0.034, 0.014, 24);
    const domeMesh = new THREE.Mesh(domeGeo, trackPointRedMat);
    domeMesh.position.set(0, 0.015, 0);
    domeMesh.castShadow = true;
    trackPointGroup.add(domeMesh);

    const topCapGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.004, 24);
    const topCapMesh = new THREE.Mesh(topCapGeo, trackPointRedMat);
    topCapMesh.position.set(0, 0.022, 0);
    trackPointGroup.add(topCapMesh);

    // (D) Three Physical 3D TrackPoint Buttons (Aligned directly below TrackPoint at tpX)
    const btnGroup = new THREE.Group();
    btnGroup.position.set(tpX, baseH + 0.006, 0.35);
    thinkpadGroup.add(btnGroup);

    const btnKeyMat = new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.36, metalness: 0.08 });

    // Left Click Button with Red Stripe
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

    // (E) Satin Glass Trackpad Plate (Aligned directly below buttons at tpX, clean front margin)
    const padPlateGeo = new THREE.BoxGeometry(1.40, 0.008, 0.70);
    const padPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x17181c,
      roughness: 0.40,
      metalness: 0.06,
      clearcoat: 0.12,
      clearcoatRoughness: 0.4
    });
    const padPlate = new THREE.Mesh(padPlateGeo, padPlateMat);
    padPlate.position.set(tpX, baseH + 0.003, 0.76);
    padPlate.receiveShadow = true;
    thinkpadGroup.add(padPlate);

    // Biometric Fingerprint Sensor (Right of touchpad)
    const fpGeo = new THREE.BoxGeometry(0.14, 0.006, 0.14);
    const fpMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2, metalness: 0.8 });
    const fpMesh = new THREE.Mesh(fpGeo, fpMat);
    fpMesh.position.set(0.85, baseH + 0.003, 0.52);
    thinkpadGroup.add(fpMesh);

    // Official ThinkPad 45 deg Angled Palmrest Badge (Right corner)
    const badgeGeo = new THREE.PlaneGeometry(0.36, 0.18);
    const tpBadgeMesh = new THREE.Mesh(badgeGeo, thinkpadBadgeMat);
    tpBadgeMesh.position.set(1.20, baseH + 0.003, 0.88);
    tpBadgeMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(tpBadgeMesh);

    // Intel Core Badge (Left corner)
    const intelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.14), intelBadgeMat);
    intelMesh.position.set(-1.20, baseH + 0.003, 0.88);
    intelMesh.rotation.x = -Math.PI / 2;
    thinkpadGroup.add(intelMesh);

    // (F) Dual Steel Drop Hinges
    const hingeGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.26, 20);
    hingeGeo.rotateZ(Math.PI / 2);
    [-1.25, 1.25].forEach((hx) => {
      const hinge = new THREE.Mesh(hingeGeo, hingeSteelMat);
      hinge.position.set(hx, baseH + 0.015, -baseD / 2 + 0.14);
      hinge.castShadow = true;
      thinkpadGroup.add(hinge);
    });

    // (G) Display Lid Assembly with Hinge Pivot
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, baseH + 0.015, -baseD / 2 + 0.14);
    thinkpadGroup.add(lidGroup);
    sceneRef.current.lidGroup = lidGroup;

    // Starts CLOSED flat over the base! (rotation.x = Math.PI / 2)
    lidGroup.rotation.x = Math.PI / 2;

    const lidW = 3.65;
    const lidH = 2.32;
    const lidThick = 0.045;

    // Outer Back Cover Base Box
    const lidBackGeo = new THREE.BoxGeometry(lidW, lidH, lidThick);
    const lidBack = new THREE.Mesh(lidBackGeo, chassisMat);
    lidBack.position.set(0, lidH / 2, -lidThick / 2);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Dedicated Outer Lid Face Plane (Right-side up when laptop is closed)
    const outerLidMesh = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidH), outerLidMat);
    outerLidMesh.position.set(0, lidH / 2, -lidThick - 0.001);
    outerLidMesh.rotation.y = Math.PI;
    outerLidMesh.rotation.z = Math.PI;
    lidGroup.add(outerLidMesh);

    // Glowing Red LED dot on outer lid 'i' (pulses during sleep/closed state)
    const lidDotMat = new THREE.MeshStandardMaterial({
      color: 0xff1020,
      emissive: 0xff1020,
      emissiveIntensity: 1.5,
      roughness: 0.2
    });
    sceneRef.current.lidLedMat = lidDotMat;

    // Exactly matches top-right 'i' dot in outer lid texture
    const lidLedMesh = new THREE.Mesh(new THREE.CircleGeometry(0.016, 16), lidDotMat);
    lidLedMesh.position.set(1.40, 0.17, -lidThick - 0.003);
    lidLedMesh.rotation.y = Math.PI;
    lidLedMesh.rotation.z = Math.PI;
    lidGroup.add(lidLedMesh);

    // Bezel Border Front (Inner bezel)
    const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidH), bezelMat);
    bezelMesh.position.set(0, lidH / 2, 0.001);
    lidGroup.add(bezelMesh);

    // 2048x1280 Canvas Texture for Screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 2048;
    screenCanvas.height = 1280;
    const screenContext = screenCanvas.getContext('2d')!;
    sceneRef.current.screenCanvas = screenCanvas;
    sceneRef.current.screenContext = screenContext;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    sceneRef.current.screenTexture = screenTexture;

    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenW = 3.38;
    const screenH = 2.11;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, lidH / 2 - 0.02, 0.004);
    lidGroup.add(screenMesh);

    // (H) Accessories on Desk
    // Warm wooden coaster for coffee mug
    const coasterGeo = new THREE.CylinderGeometry(0.24, 0.25, 0.015, 24);
    const coasterMat = new THREE.MeshStandardMaterial({ color: 0x6e3c1b, roughness: 0.7 });
    const coasterMesh = new THREE.Mesh(coasterGeo, coasterMat);
    coasterMesh.position.set(2.5, 0.008, 0.45);
    coasterMesh.receiveShadow = true;
    scene.add(coasterMesh);

    // Porcelain Coffee Mug (Right side)
    const mugGroup = new THREE.Group();
    mugGroup.position.set(2.5, 0.015, 0.45);
    scene.add(mugGroup);

    const mugOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.18, 0.42, 28), porcelainMugMat);
    mugOuter.position.set(0, 0.21, 0);
    mugOuter.castShadow = true;
    mugGroup.add(mugOuter);

    const coffeeLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), coffeeLiquidMat);
    coffeeLiquid.position.set(0, 0.38, 0);
    coffeeLiquid.rotation.x = -Math.PI / 2;
    mugGroup.add(coffeeLiquid);

    const handleGeo = new THREE.TorusGeometry(0.12, 0.03, 12, 24, Math.PI);
    const handleMesh = new THREE.Mesh(handleGeo, porcelainMugMat);
    handleMesh.position.set(0.21, 0.21, 0);
    handleMesh.rotation.y = Math.PI / 2;
    mugGroup.add(handleMesh);

    // 6. Interaction Raycaster (Clicking laptop when closed opens it!)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      if (!stateRef.current.isLidOpen) {
        const intersects = raycaster.intersectObjects([thinkpadGroup], true);
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

      if (!stateRef.current.isLidOpen) {
        const intersects = raycaster.intersectObjects([thinkpadGroup], true);
        renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
      } else {
        const intersects = raycaster.intersectObject(screenMesh);
        renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);
    renderer.domElement.addEventListener('mousemove', handleCanvasMouseMove);

    // 7. Dynamic Screen Rendering (Boot splash & Ubuntu desktop wallpaper)
    const drawScreen = () => {
      const ctx = screenContext;
      const w = screenCanvas.width;
      const h = screenCanvas.height;
      const phase = stateRef.current.bootPhase;

      if (phase === 'off') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
      } else if (phase === 'splash') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        ctx.font = 'bold 84px system-ui, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('Lenovo', w / 2, h / 2 - 20);

        ctx.font = '500 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('To interrupt normal startup, press Enter', w / 2, h - 120);
      } else if (phase === 'booting') {
        ctx.fillStyle = '#0c0d12';
        ctx.fillRect(0, 0, w, h);

        ctx.font = 'bold 54px system-ui, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText('Ubuntu 24.04 LTS', w / 2, h / 2 - 30);

        const t = performance.now() * 0.005;
        for (let i = 0; i < 5; i++) {
          const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t - i * 0.6));
          ctx.beginPath();
          ctx.arc(w / 2 - 60 + i * 30, h / 2 + 50, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
          ctx.fill();
        }
      } else {
        // Ready state: Ubuntu 24.04 Desktop Wallpaper & GNOME Interface
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, '#111827');
        bgGrad.addColorStop(0.5, '#1e1b4b');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.2, 0);
        ctx.lineTo(w * 0.8, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(w * 0.35, 0);
        ctx.lineTo(w * 0.95, h);
        ctx.stroke();

        // Top GNOME Panel
        ctx.fillStyle = '#0f141f';
        ctx.fillRect(0, 0, w, 48);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 47, w, 1);

        // Activities Button
        ctx.fillStyle = '#223044';
        ctx.beginPath();
        ctx.roundRect(16, 8, 110, 32, 16);
        ctx.fill();
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText('Activities', 71, 29);

        // Center Clock
        const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(`Sat Oct 24   ${timeStr} IST`, w / 2, 29);

        // Right Tray
        ctx.font = '15px system-ui, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText('WiFi   Vol 85%   Bat 98%   Power', w - 24, 29);

        // Left Dock
        ctx.fillStyle = '#0c111bcc';
        ctx.fillRect(0, 48, 76, h - 48);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(75, 48, 1, h - 48);

        const dockApps = [
          { icon: '📁', label: 'Projects' },
          { icon: '⚙️', label: 'Pipeline' },
          { icon: '📄', label: 'Resume' },
          { icon: '💻', label: 'Terminal' },
          { icon: '📝', label: 'Notes' },
          { icon: 'ℹ️', label: 'Specs' }
        ];

        dockApps.forEach((app, i) => {
          const dy = 70 + i * 68;
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.roundRect(14, dy, 48, 48, 12);
          ctx.fill();

          ctx.font = '24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(app.icon, 38, dy + 33);
        });

        // Desktop Neofetch Terminal Window
        const winX = 140;
        const winY = 100;
        const winW = 860;
        const winH = 540;

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(winX, winY, winW, winH, 10);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(winX, winY, winW, 40, 10);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(winX + 24, winY + 20, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(winX + 46, winY + 20, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#eab308';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(winX + 68, winY + 20, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#22c55e';
        ctx.fill();

        ctx.font = '600 15px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText('bash - wyacoomz@thinkpad-t14: ~ (Neofetch)', winX + winW / 2, winY + 25);

        ctx.textAlign = 'left';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('wyacoomz@thinkpad-t14', winX + 36, winY + 75);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('------------------------', winX + 36, winY + 98);

        const specs = [
          ['OS', 'Ubuntu 24.04 LTS x86_64'],
          ['Host', 'ThinkPad T14 Gen 3 (21AH)'],
          ['Kernel', '6.8.0-45-generic'],
          ['Uptime', '14 days, 6 hours'],
          ['Shell', 'bash 5.2.21'],
          ['Resolution', '1920x1200 @ 60Hz IPS'],
          ['CPU', '12th Gen Intel Core i7-1260P (16) @ 4.7GHz'],
          ['Memory', '32GB DDR4 3200 MT/s'],
          ['Developer', 'Abdul Samad Khan (wyacoomz)'],
          ['Role', 'RPA Developer @ Trufe (Enterprise Automation)'],
          ['LeetCode', '150+ Solved (Graphs, Dynamic Programming)']
        ];

        specs.forEach(([k, v], idx) => {
          const sy = winY + 130 + idx * 32;
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(`${k.padEnd(12, ' ')}:`, winX + 36, sy);
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(v, winX + 180, sy);
        });

        // Click to focus prompt on screen
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(winX + winW + 40, winY + 60, 460, 160, 12);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('ThinkPad Workstation Active', winX + winW + 65, winY + 105);

        ctx.font = '15px system-ui, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Click screen to enter interactive Linux desktop', winX + winW + 65, winY + 140);
        ctx.fillText('or click Focus Screen in the top bar.', winX + winW + 65, winY + 165);
      }

      screenTexture.needsUpdate = true;
    };

    // 8. Animation & Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth physical lid rotation
      const targetLidRotX = stateRef.current.isLidOpen ? -0.24 : Math.PI / 2;
      lidGroup.rotation.x = THREE.MathUtils.lerp(lidGroup.rotation.x, targetLidRotX, 0.07);

      // Standby Red LED Breathing pulse on outer lid when laptop is closed
      if (lidDotMat) {
        if (!stateRef.current.isLidOpen) {
          const pulse = 0.4 + 0.7 * (0.5 + 0.5 * Math.sin(elapsedTime * 2.8));
          lidDotMat.emissiveIntensity = pulse;
        } else {
          lidDotMat.emissiveIntensity = 1.0;
        }
      }

      // Smooth camera lerp transition
      let targetPos = closedDeskCamPos;
      let targetLook = closedDeskCamLook;

      if (stateRef.current.isLidOpen) {
        if (stateRef.current.isFocused) {
          targetPos = focusedCamPos;
          targetLook = focusedCamLook;
        } else {
          targetPos = openDeskCamPos;
          targetLook = openDeskCamLook;
        }
      }

      camera.position.lerp(targetPos, 0.08);
      controls.target.lerp(targetLook, 0.08);
      controls.update();

      drawScreen();
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
      honeyOakTex.dispose();
      outerLidTex.dispose();
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
    <div className="relative w-full h-full select-none overflow-hidden bg-[#0a0d12]">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Prompt for Closed Laptop */}
      {!isLidOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <button
            onClick={openLaptop}
            className="group flex flex-col items-center gap-3 px-7 py-4 bg-[#0f141f]/90 hover:bg-[#1e293b]/95 border border-[#38bdf8]/40 hover:border-[#38bdf8] text-[#f8fafc] rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" />
              <span className="font-mono font-bold text-sm tracking-wider text-white">LENOVO THINKPAD T14</span>
            </div>
            <div className="text-xs text-[#94a3b8] flex items-center gap-2 font-mono">
              <span>Click laptop or press</span>
              <kbd className="px-2 py-0.5 bg-[#334155] rounded text-[11px] font-bold text-white shadow-xs">SPACE</kbd>
              <span>to open workstation</span>
            </div>
          </button>
        </div>
      )}

      {/* Focused Interactive OS Layer (Henry Heffernan style) */}
      {isLidOpen && isFocused && (
        <div className="absolute inset-0 z-30 pointer-events-auto flex flex-col items-center justify-center bg-black/70 backdrop-blur-[2px] p-2 sm:p-4 animate-in fade-in duration-200">
          {/* Top Bar for Focused View */}
          <div className="w-full max-w-6xl flex items-center justify-between pb-2 text-xs font-mono select-none">
            <div className="flex items-center space-x-2 text-[#94a3b8]">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className="font-bold text-[#f8fafc]">THINKPAD T14 WORKSTATION</span>
              <span>&bull;</span>
              <span className="text-[#38bdf8]">UBUNTU LINUX DESKTOP (HENRY HEFFERNAN STYLE)</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  audioEngine.playKeyClick();
                  setIsFocused(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-1 bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] border border-[#334155] rounded-xs text-xs font-mono transition-colors shadow-md"
                title="Return to 3D Desk View"
              >
                <ZoomOut className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Desk View</span>
              </button>

              <button
                onClick={closeLaptop}
                className="flex items-center space-x-1.5 px-3 py-1 bg-[#450a0a] hover:bg-[#7f1d1d] text-[#fca5a5] border border-[#991b1b] rounded-xs text-xs font-mono transition-colors shadow-md"
                title="Close Laptop Lid"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Close Laptop</span>
              </button>
            </div>
          </div>

          {/* 16:10 Laptop Screen Bezel Container */}
          <div className="relative w-full max-w-6xl aspect-[16/10] max-h-[82vh] bg-[#0c1017] rounded-sm overflow-hidden border-[6px] border-[#18191c] shadow-2xl flex flex-col">
            {/* Real Interactive Linux Desktop OS */}
            <LinuxDesktopOS
              onPlayKeyClick={() => audioEngine.playKeyClick()}
              onExitFocus={() => setIsFocused(false)}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              isStandaloneOverlay={true}
            />
          </div>
        </div>
      )}

      {/* Top Header Pill & Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto flex items-center space-x-3">
        <a
          href="http://localhost:3000"
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#0f141f]/90 hover:bg-[#1e293b] text-[#cbd5e1] hover:text-white border border-[#1e293b] rounded-md text-xs font-mono backdrop-blur-sm transition-all shadow-lg"
          title="Return to Editorial Journal Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Editorial Portfolio</span>
        </a>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[#0f141f]/90 border border-[#1e293b] rounded-md text-xs font-mono text-[#94a3b8] backdrop-blur-sm shadow-lg">
          <span className={`w-2 h-2 rounded-full ${isLidOpen ? 'bg-[#22c55e]' : 'bg-[#ef4444] animate-pulse'}`} />
          <span className="font-semibold text-[#f8fafc]">THINKPAD T14</span>
          <span>&bull;</span>
          <span className="text-[#38bdf8]">{isLidOpen ? 'OPEN (ACTIVE)' : 'CLOSED (SLEEP)'}</span>
        </div>
      </div>

      {/* Top Right Tool Bar */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center space-x-2">
        {/* Open / Close Laptop Button */}
        <button
          onClick={isLidOpen ? closeLaptop : openLaptop}
          className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-md text-xs font-mono transition-all backdrop-blur-sm shadow-lg ${
            isLidOpen 
              ? 'bg-[#1e293b]/90 hover:bg-[#334155] text-[#f8fafc] border-[#334155]' 
              : 'bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#fca5a5] border-[#ef4444]/40'
          }`}
          title={isLidOpen ? 'Close Laptop Lid' : 'Open Laptop Lid'}
        >
          <Laptop className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>{isLidOpen ? 'Close Laptop' : 'Open Laptop'}</span>
        </button>

        {/* Focus / Desk View Toggle */}
        {isLidOpen && (
          <button
            onClick={toggleFocus}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#0f141f]/90 hover:bg-[#1e293b] text-[#cbd5e1] hover:text-white border border-[#1e293b] rounded-md text-xs font-mono backdrop-blur-sm transition-all shadow-lg"
            title={isFocused ? 'Switch to Desk View' : 'Focus Screen'}
          >
            {isFocused ? <ZoomOut className="w-3.5 h-3.5 text-[#38bdf8]" /> : <ZoomIn className="w-3.5 h-3.5 text-[#38bdf8]" />}
            <span>{isFocused ? 'Desk View' : 'Focus Screen'}</span>
          </button>
        )}

        {/* Lamp Toggle */}
        <button
          onClick={toggleLamp}
          className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-md text-xs font-mono transition-all backdrop-blur-sm shadow-lg ${
            lampOn
              ? 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/40'
              : 'bg-[#0f141f]/90 text-[#64748b] border-[#1e293b]'
          }`}
          title={lampOn ? 'Turn Off Lamp' : 'Turn On Lamp'}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lampOn ? 'Lamp On' : 'Lamp Off'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-1.5 border rounded-md text-xs font-mono transition-all backdrop-blur-sm shadow-lg ${
            soundEnabled
              ? 'bg-[#0f141f]/90 text-[#38bdf8] border-[#1e293b]'
              : 'bg-[#0f141f]/90 text-[#64748b] border-[#1e293b]'
          }`}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Mechanical Sounds'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Info Toggle */}
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          className="p-1.5 bg-[#0f141f]/90 hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] rounded-md transition-all backdrop-blur-sm shadow-lg"
          title="Hardware Specifications"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-4 py-1.5 bg-[#0b0e14]/90 border border-[#1e293b] rounded-full text-[11px] font-mono text-[#94a3b8] backdrop-blur-sm shadow-lg flex items-center space-x-3">
          {!isLidOpen ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
              <span>Click the ThinkPad or press <kbd className="text-[#38bdf8] font-bold">SPACE</kbd> to open workstation</span>
              <span className="text-[#475569]">&bull;</span>
              <span>Drag to orbit 3D desk</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>Click screen or apps to interact</span>
              <span className="text-[#475569]">&bull;</span>
              <span>Press <kbd className="text-[#38bdf8] font-bold">ESC</kbd> to return to desk</span>
              <span className="text-[#475569]">&bull;</span>
              <span>Drag to orbit 3D view</span>
            </>
          )}
        </div>
      </div>

      {/* Hardware Specifications Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0f141f] border border-[#1e293b] rounded-lg shadow-2xl p-5 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <h3 className="font-bold text-sm text-[#f8fafc]">ThinkPad T14 Gen 3 (21AH)</h3>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-[#64748b] hover:text-[#f8fafc] text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-2 text-[#94a3b8]">
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>Processor:</span>
                <span className="text-[#f8fafc] font-semibold">Intel 12th Gen Core i7-1260P</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>Display:</span>
                <span className="text-[#f8fafc] font-semibold">14.0" WUXGA (1920x1200) IPS Antiglare</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>Chassis Material:</span>
                <span className="text-[#f8fafc] font-semibold">Magnesium-Alloy Raven Black</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>Input:</span>
                <span className="text-[#f8fafc] font-semibold">TrackPoint + 3-Button ClickPad</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>OS / Kernel:</span>
                <span className="text-[#38bdf8] font-semibold">Ubuntu 24.04 LTS (Kernel 6.8)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]/50">
                <span>Developer:</span>
                <span className="text-[#f8fafc] font-semibold">Abdul Samad Khan (wyacoomz)</span>
              </div>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-5 w-full py-2 bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] font-semibold rounded text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
