// Simple line icons, one per industry, matching the existing inline-SVG style used
// elsewhere on the site (round caps/joins, currentColor stroke). Grounded in each craft's
// own tools rather than generic UI glyphs, per the redesign's "extend the real subject"
// direction — a comb/scissors for a salon, a cup for a cafe, and so on.
export const industryIcons: Record<string, string> = {
  beauty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.3"/><circle cx="6" cy="18" r="2.3"/><path d="M8 7.6 19.5 18M8 16.4 19.5 6"/></svg>`,
  restaurant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h11v6.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M16 10.5h1.6a2.4 2.4 0 0 1 0 4.8H16"/><path d="M8 6.2c0-.9.9-1 .9-2M12 6.2c0-.9.9-1 .9-2"/></svg>`,
  school: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V17l9.5-9.5 2.5 2.5L6.5 19.5H4Z"/><path d="M14.3 6.2 16.8 3.7l2.5 2.5-2.5 2.5"/></svg>`,
  "home-service": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.8 6.4a3.4 3.4 0 0 0-4.6 4.1L4 16.7l2 2 6.2-6.2a3.4 3.4 0 0 0 4.1-4.6l-2 2-1.7-.5-.5-1.7 2-2Z"/></svg>`,
};
