import React from 'react';
import { Globe2, MousePointer2, Type, ListChecks, Clock3, Check, Upload, Zap } from 'lucide-react';

export const actionTypes = [
  { type: "navigate", label: "Navigate", hint: "Open a URL in the browser", icon: Globe2 },
  { type: "click", label: "Click", hint: "Click on an element", icon: MousePointer2 },
  { type: "type", label: "Type", hint: "Enter text into an element", icon: Type },
  { type: "select", label: "Select", hint: "Select option from dropdown", icon: ListChecks },
  { type: "wait", label: "Wait", hint: "Wait for element or time", icon: Clock3 },
  { type: "assert", label: "Assert", hint: "Verify element, text or URL", icon: Check },
  { type: "screenshot", label: "Screenshot", hint: "Capture screenshot", icon: Upload }
];

export function ActionIcon({ type, size=20 }) {
  const item = actionTypes.find(a => a.type === type);
  const Icon = item?.icon || Zap;
  return <Icon size={size} strokeWidth={2.2}/>;
}
