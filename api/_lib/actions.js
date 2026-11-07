import { ACTIONS } from "./knowledge.js";

// The model may end a reply with [[action]] tags. Keep only whitelisted ones and
// strip every tag from the visible text.
export function splitActions(raw) {
  const actions = [];
  const text = raw
    .replace(/\[\[([a-z:_-]+)\]\]/gi, (_, act) => {
      const key = act.toLowerCase();
      if (ACTIONS[key] && !actions.some((a) => a.act === key)) {
        actions.push({ label: ACTIONS[key], act: key });
      }
      return "";
    })
    .trim();
  return { text, actions: actions.slice(0, 2) };
}

