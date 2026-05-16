export const Icon = ({ name, size = 20, color = 'currentColor', stroke = 2 }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home': return <svg {...props}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'chart': return <svg {...props}><path d="M3 21V5"/><path d="M3 21h18"/><path d="M7 17V11"/><path d="M12 17V8"/><path d="M17 17V13"/></svg>;
    case 'plus': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></svg>;
    case 'menu': return <svg {...props}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>;
    case 'target': return <svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>;
    case 'food': return <svg {...props}><path d="M4 4v7a4 4 0 008 0V4"/><path d="M8 4v16"/><path d="M16 4a3 3 0 013 3v4a3 3 0 01-3 3v6"/></svg>;
    case 'syringe': return <svg {...props}><path d="M16 3l5 5"/><path d="M14 5l5 5"/><path d="M19 7L9 17l-4 1 1-4L16 4"/><path d="M9 13l2 2"/></svg>;
    case 'walk': return <svg {...props}><circle cx="13" cy="4" r="1.7"/><path d="M9 21l2-5 2-3-2-3 1-3"/><path d="M14 13l3 1 1 4"/><path d="M11 8l-3 1-1 3"/></svg>;
    case 'run': return <svg {...props}><circle cx="15" cy="4" r="1.7"/><path d="M5 20l3-5 3-4-1-4"/><path d="M10 7l4 2 1 3 4 1"/><path d="M14 12l-2 3"/><path d="M7 11l-2 1"/></svg>;
    case 'bike': return <svg {...props}><circle cx="6" cy="17" r="3.5"/><circle cx="18" cy="17" r="3.5"/><path d="M6 17l4-7h5l3 7"/><path d="M10 10l-2-4h-2"/><path d="M15 10l-1-3h2"/></svg>;
    case 'sensor': return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4"/></svg>;
    case 'check': return <svg {...props}><path d="M4 12l5 5L20 6"/></svg>;
    case 'arrowRight': return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrowUpRight': return <svg {...props}><path d="M7 17L17 7M9 7h8v8"/></svg>;
    case 'arrowDown': return <svg {...props}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'chevronLeft': return <svg {...props}><path d="M15 18l-6-6 6-6"/></svg>;
    case 'minus': return <svg {...props}><path d="M5 12h14"/></svg>;
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'shield': return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/></svg>;
    case 'moon': return <svg {...props}><path d="M20 14a8 8 0 11-10-10 7 7 0 0010 10z"/></svg>;
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case 'x': return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'info': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>;
    case 'drop': return <svg {...props}><path d="M12 3s-6 7-6 11a6 6 0 0012 0c0-4-6-11-6-11z"/></svg>;
    default: return null;
  }
};
