// ── 10 new token icon cases for getTokenIconSVG() ──
// Drop these inside the switch(icon){ ... } block,
// before the existing `default:` case.
// Coordinate space: ~10×10 units, centered at 0,0.
// Variables available: s (scale), c (color), tc (text color),
//                      bodyFill (white when active, color otherwise), initial (player letter)

    case 'chromosome': {
      // X-shaped chromosome — two crossed chromatid arms, centromere at centre
      const arm = s * 4.8;
      return `
        <line x1="${-arm}" y1="${-arm}" x2="${arm}" y2="${arm}" stroke="${c}" stroke-width="${s*2.8}" stroke-linecap="round" opacity="0.85"/>
        <line x1="${arm}" y1="${-arm}" x2="${-arm}" y2="${arm}" stroke="${c}" stroke-width="${s*2.8}" stroke-linecap="round" opacity="0.85"/>
        <line x1="${-arm}" y1="${-arm}" x2="${arm}" y2="${arm}" stroke="rgba(255,255,255,0.2)" stroke-width="${s*1}" stroke-linecap="round"/>
        <line x1="${arm}" y1="${-arm}" x2="${-arm}" y2="${arm}" stroke="rgba(255,255,255,0.2)" stroke-width="${s*1}" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="${s*2.2}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.6}"/>
        <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.8}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'ribosome-drone': {
      // Two subunits (large lower dome, small upper offset) + three antennae
      return `
        <ellipse cx="0" cy="${s*2}" rx="${s*5}" ry="${s*3.8}" fill="${c}" opacity="0.85" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        <ellipse cx="${s*1.5}" cy="${-s*2}" rx="${s*3.2}" ry="${s*2.4}" fill="${c}" opacity="0.65" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        <line x1="0"        y1="${-s*4.5}" x2="0"        y2="${-s*7}" stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round"/>
        <line x1="${s*1.8}"  y1="${-s*4.2}" x2="${s*3}"   y2="${-s*6.5}" stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round"/>
        <line x1="${-s*1.8}" y1="${-s*4.2}" x2="${-s*3}"  y2="${-s*6.5}" stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round"/>
        <circle cx="0"       cy="${-s*7.5}" r="${s*0.9}" fill="${c}" opacity="0.9"/>
        <circle cx="${s*3.3}" cy="${-s*7}"   r="${s*0.7}" fill="${c}" opacity="0.8"/>
        <circle cx="${-s*3.3}"cy="${-s*7}"   r="${s*0.7}" fill="${c}" opacity="0.8"/>
        <circle cx="0" cy="${s*2}" r="${s*2.0}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.5}"/>
        <text x="0" y="${s*2}" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.8}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'atp-battery': {
      // Horizontal capsule with three glowing charge segments + terminal nub
      return `
        <rect x="${-s*5.5}" y="${-s*3}" width="${s*10}" height="${s*6}" rx="${s*3}" ry="${s*3}" fill="${c}" opacity="0.82" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        <rect x="${-s*5.2}" y="${-s*2.6}" width="${s*9.4}" height="${s*5.2}" rx="${s*2.8}" fill="rgba(0,0,0,0.35)"/>
        <rect x="${-s*4.6}" y="${-s*2.0}" width="${s*2.4}" height="${s*4}" rx="${s*1.2}" fill="${c}" opacity="0.9"/>
        <rect x="${-s*1.5}" y="${-s*2.0}" width="${s*2.4}" height="${s*4}" rx="${s*1.2}" fill="${c}" opacity="0.7"/>
        <rect x="${s*1.6}"  y="${-s*2.0}" width="${s*2.4}" height="${s*4}" rx="${s*1.2}" fill="${c}" opacity="0.5"/>
        <rect x="${s*5.5}"  y="${-s*1.4}" width="${s*1.2}" height="${s*2.8}" rx="${s*0.6}" fill="${c}" opacity="0.7"/>`;
    }

    case 'vesicle-pod': {
      // Sphere with concentric opacity rings + three membrane bud flaps
      return `
        <circle cx="0" cy="0" r="${s*5.5}" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="${s*0.6}"/>
        <circle cx="0" cy="0" r="${s*4}"   fill="${c}" opacity="0.30"/>
        <circle cx="0" cy="0" r="${s*2.5}" fill="${c}" opacity="0.65"/>
        <ellipse cx="${-s*5.2}" cy="${-s*2}" rx="${s*2.2}" ry="${s*1.4}" fill="${c}" opacity="0.75" transform="rotate(-25,${-s*5.2},${-s*2})"/>
        <ellipse cx="${s*5.2}"  cy="${-s*1}" rx="${s*2.2}" ry="${s*1.4}" fill="${c}" opacity="0.75" transform="rotate(15,${s*5.2},${-s*1})"/>
        <ellipse cx="${s*1}"    cy="${s*5.8}"rx="${s*1.4}" ry="${s*2.2}" fill="${c}" opacity="0.75" transform="rotate(8,${s*1},${s*5.8})"/>
        <circle cx="0" cy="0" r="${s*2.2}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.5}"/>
        <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.8}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'microbe-spy': {
      // Rounded cell body + cilia fringe + tiny fedora hat
      const cilX = [-s*4,-s*3.2,-s*2, s*2, s*3.2, s*4];
      const cilia = cilX.map(x =>
        `<line x1="${x}" y1="${-s*1.5}" x2="${x + (x>0?s*0.6:-s*0.6)}" y2="${-s*4}" stroke="${c}" stroke-width="${s*0.6}" stroke-linecap="round" opacity="0.7"/>`
      ).join('');
      return `
        <ellipse cx="0" cy="${s*1.5}" rx="${s*4.5}" ry="${s*5}" fill="${c}" opacity="0.80" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        ${cilia}
        <line x1="0" y1="${s*6}" x2="${s*0.8}" y2="${s*9}" stroke="${c}" stroke-width="${s*1.2}" stroke-linecap="round" opacity="0.75"/>
        <ellipse cx="0" cy="${-s*5.5}" rx="${s*5}" ry="${s*1.5}" fill="${c}" opacity="0.90"/>
        <rect x="${-s*3}" y="${-s*9}"  width="${s*6}" height="${s*4}" rx="${s*2}" fill="${c}" opacity="0.85"/>
        <line x1="${-s*2.8}" y1="${-s*7}" x2="${-s*2.8}" y2="${-s*5.2}" stroke="rgba(0,0,0,0.25)" stroke-width="${s*0.6}"/>
        <circle cx="0" cy="${s*1.5}" r="${s*2.1}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.5}"/>
        <text x="0" y="${s*1.5}" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.8}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'protein': {
      // Alpha-helix coil ribbon + beta-sheet arrow + active site dot
      const coilPts = Array.from({length:9},(_,i) => {
        const t = i/8, y = -s*5 + t*s*7;
        const x = Math.sin(t*Math.PI*3) * s*2.8;
        return `${i===0?'M':'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      }).join(' ');
      return `
        <path d="${coilPts}" fill="none" stroke="${c}" stroke-width="${s*1.8}" stroke-linecap="round" opacity="0.80"/>
        <path d="M${-s*5},${s*3} L${s*1.5},${s*3} L${s*1.5},${s*1.5} L${s*5},${s*4.5} L${s*1.5},${s*7.5} L${s*1.5},${s*6} L${-s*5},${s*6} Z" fill="${c}" opacity="0.65" stroke="rgba(255,255,255,0.2)" stroke-width="0.3"/>
        <circle cx="${s*3.5}" cy="${-s*2}" r="${s*2.0}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.6}"/>
        <text x="${s*3.5}" y="${-s*2}" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.4}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'spindle': {
      // Tapered microtubule bundle — wide middle, pointed tips, tubulin ring segments
      return `
        <line x1="0" y1="${-s*7}" x2="0" y2="${s*7}" stroke="${c}" stroke-width="${s*2.2}" stroke-linecap="round" opacity="0.90"/>
        <line x1="${-s*1.8}" y1="${-s*5}" x2="0" y2="${-s*7}" stroke="${c}" stroke-width="${s*1.5}" stroke-linecap="round" opacity="0.70"/>
        <line x1="${s*1.8}"  y1="${-s*5}" x2="0" y2="${-s*7}" stroke="${c}" stroke-width="${s*1.5}" stroke-linecap="round" opacity="0.70"/>
        <line x1="${-s*1.8}" y1="${-s*5}" x2="${-s*1.8}" y2="${s*5}" stroke="${c}" stroke-width="${s*1.2}" stroke-linecap="round" opacity="0.55"/>
        <line x1="${s*1.8}"  y1="${-s*5}" x2="${s*1.8}"  y2="${s*5}" stroke="${c}" stroke-width="${s*1.2}" stroke-linecap="round" opacity="0.55"/>
        <line x1="${-s*1.8}" y1="${s*5}"  x2="0" y2="${s*7}" stroke="${c}" stroke-width="${s*1.5}" stroke-linecap="round" opacity="0.70"/>
        <line x1="${s*1.8}"  y1="${s*5}"  x2="0" y2="${s*7}" stroke="${c}" stroke-width="${s*1.5}" stroke-linecap="round" opacity="0.70"/>
        <ellipse cx="0" cy="${-s*2}" rx="${s*2.5}" ry="${s*0.9}" fill="none" stroke="${c}" stroke-width="${s*0.7}" opacity="0.55"/>
        <ellipse cx="0" cy="${s*2}"  rx="${s*2.5}" ry="${s*0.9}" fill="none" stroke="${c}" stroke-width="${s*0.7}" opacity="0.55"/>`;
    }

    case 'enzyme': {
      // Pill body + active-site cleft notch on right + catalytic glow ring
      return `
        <rect x="${-s*5.5}" y="${-s*3.2}" width="${s*10}" height="${s*6.4}" rx="${s*3.2}" ry="${s*3.2}" fill="${c}" opacity="0.82" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        <rect x="${-s*5.2}" y="${-s*2.8}" width="${s*9.4}" height="${s*5.6}" rx="${s*2.9}" fill="rgba(0,0,0,0.30)"/>
        <path d="M${s*3.5},${-s*3.2} Q${s*6.5},0 ${s*3.5},${s*3.2}" fill="none" stroke="${c}" stroke-width="${s*1.4}" stroke-linecap="round" opacity="0.90"/>
        <circle cx="${s*5.2}" cy="0" r="${s*1.8}" fill="${c}" opacity="0.40"/>
        <circle cx="${s*5.2}" cy="0" r="${s*1.0}" fill="${c}" opacity="0.95"/>
        <circle cx="${s*5.2}" cy="0" r="${s*1.6}" fill="none" stroke="${c}" stroke-width="${s*0.5}" opacity="0.55"/>
        <circle cx="${-s*1.5}" cy="0" r="${s*2.1}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.5}"/>
        <text x="${-s*1.5}" y="0" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.8}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>`;
    }

    case 'nano-shuttle': {
      // Ovoid hull + viewport window + three kinesin legs + engine glow at tail
      return `
        <ellipse cx="${-s*0.5}" cy="0" rx="${s*6}" ry="${s*3.5}" fill="${c}" opacity="0.78" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
        <ellipse cx="${-s*2.5}" cy="${-s*0.5}" rx="${s*2.5}" ry="${s*1.8}" fill="rgba(0,0,0,0.35)"/>
        <ellipse cx="${-s*2.5}" cy="${-s*0.5}" rx="${s*1.6}" ry="${s*1.1}" fill="${c}" opacity="0.45" stroke="${c}" stroke-width="${s*0.5}"/>
        <line x1="${-s*3}"  y1="${s*3.5}" x2="${-s*4.5}" y2="${s*6.5}" stroke="${c}" stroke-width="${s*0.9}" stroke-linecap="round"/>
        <line x1="${-s*0.5}"y1="${s*3.5}" x2="${-s*0.5}" y2="${s*6.5}" stroke="${c}" stroke-width="${s*0.9}" stroke-linecap="round"/>
        <line x1="${s*2.5}" y1="${s*3.2}" x2="${s*3.5}"  y2="${s*6.5}" stroke="${c}" stroke-width="${s*0.9}" stroke-linecap="round"/>
        <ellipse cx="${s*5.8}" cy="0" rx="${s*2.0}" ry="${s*1.4}" fill="${c}" opacity="0.60"/>
        <ellipse cx="${s*7.2}" cy="0" rx="${s*1.2}" ry="${s*0.8}" fill="${c}" opacity="0.40"/>`;
    }

    case 'mutation': {
      // Short double-helix fragment + displaced base-pair at centre + radiating crackle lines
      const steps = 4, h = s*6, top = -s*4;
      let strand1='', strand2='', rungs='';
      for(let i=0; i<=steps*4; i++){
        const t = i/(steps*4);
        const y = top + t*h*2;
        const x1 =  Math.sin(t*Math.PI*2*steps)*s*2.8;
        const x2 = -x1;
        strand1 += (i===0?'M':'L')+`${x1.toFixed(2)},${y.toFixed(2)}`;
        strand2 += (i===0?'M':'L')+`${x2.toFixed(2)},${y.toFixed(2)}`;
        if(i%4===2) rungs += `<line x1="${x1.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y.toFixed(2)}" stroke="rgba(255,255,255,0.35)" stroke-width="${s*0.6}"/>`;
      }
      return `
        <path d="${strand1}" fill="none" stroke="${c}" stroke-width="${s*1.2}" stroke-linecap="round" opacity="0.85"/>
        <path d="${strand2}" fill="none" stroke="${c}" stroke-width="${s*1.2}" stroke-linecap="round" opacity="0.65"/>
        ${rungs}
        <circle cx="${s*2.8}" cy="0" r="${s*2.2}" fill="${bodyFill}" stroke="${c}" stroke-width="${s*0.6}"/>
        <text x="${s*2.8}" y="0" text-anchor="middle" dominant-baseline="middle" font-size="${s*2.4}" font-family="Arial" font-weight="900" fill="${tc}">${initial}</text>
        <line x1="${s*3.5}" y1="${-s*2.5}" x2="${s*6}"   y2="${-s*4.5}" stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round" opacity="0.85"/>
        <line x1="${s*5}"   y1="${-s*0.5}" x2="${s*7.5}" y2="${-s*0.5}" stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round" opacity="0.75"/>
        <line x1="${s*3.5}" y1="${s*2.5}"  x2="${s*6}"   y2="${s*4.5}"  stroke="${c}" stroke-width="${s*0.8}" stroke-linecap="round" opacity="0.65"/>`;
    }
