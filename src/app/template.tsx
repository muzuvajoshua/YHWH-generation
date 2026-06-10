// Pass-through template — chrome lives in route-group layouts.
// Kept as a file so existing builds still pick up segment-level transitions
// when we add them later, without re-wrapping every route in app shell.
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
