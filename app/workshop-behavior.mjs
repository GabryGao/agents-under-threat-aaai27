export function nextMenuState(currentOpen, action) {
  if (action === 'toggle') return !currentOpen;
  if (action === 'close') return false;
  throw new Error(`Unknown menu action: ${action}`);
}
