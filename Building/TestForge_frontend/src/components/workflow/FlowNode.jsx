import React from 'react';
import { Play } from 'lucide-react';
import { ActionIcon } from './ActionIcon';

export function FlowNode({ start, step, onDelete }) {
  if (start) return (
    <div className="flow-node start-node">
      <div className="start-icon"><Play size={18} fill="currentColor"/></div>
      <div><strong>Start Test</strong><small>Begin browser automation</small></div>
      <span className="kebab">⋮</span>
    </div>
  );

  return (
    <div className={`flow-node node-${step.type}`}>
      <div className="node-icon"><ActionIcon type={step.type}/></div>
      <div className="node-content">
        <strong>{step.title}</strong>
        <small>{step.desc}</small>
        <span className="value-chip">{step.value}</span>
      </div>
      <button className="node-delete" onClick={onDelete}>⋮</button>
    </div>
  );
}
