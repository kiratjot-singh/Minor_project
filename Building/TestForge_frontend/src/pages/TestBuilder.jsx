import React, { useState, useEffect } from "react";
import { Check, ChevronDown, Code2, Database, Flag, Globe2, Activity, Play, Plus, Redo2, Save, Trash2, Undo2 } from "lucide-react";
import { actionTypes, ActionIcon } from "../components/workflow/ActionIcon";
import { FlowNode } from "../components/workflow/FlowNode";
import { api } from "../services/api";

export default function TestBuilder() {
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const [saved, setSaved] = useState(true);
  const [url, setUrl] = useState("http://localhost:5173");
  const [browser, setBrowser] = useState("Chromium");
  const [execution, setExecution] = useState("Headed");
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    api.getSteps().then(setSteps);
  }, []);

  const addStep = (type) => {
    const meta = actionTypes.find(a => a.type === type);
    const newStep = {
      id: Date.now(),
      type,
      title: meta.label,
      desc: meta.hint,
      value: type === "navigate" ? url : type === "assert" ? "Expected: /patient" : "Configure value"
    };
    setSteps(s => [...s, newStep]);
    setSaved(false);
  };

  const removeStep = (id) => {
    setSteps(s => s.filter(x => x.id !== id));
    setSaved(false);
  };

  const runTest = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2200);
  };

  const save = () => setSaved(true);

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Patient Login Test <span className="edit-dot">✎</span></h1>
          <span className={`save-state ${saved ? "saved" : "draft"}`}>
            {saved ? <Check size={14}/> : <span className="dot"/>}
            {saved ? "Saved" : "Draft"}
          </span>
        </div>
        <div className="toolbar">
          <button className="tool-btn"><Undo2 size={17}/></button>
          <button className="tool-btn"><Redo2 size={17}/></button>
          <button className="tool-btn danger"><Trash2 size={17}/></button>
          <button className="outline-btn" onClick={save}><Save size={16}/> Save</button>
          <button className="run-btn" onClick={runTest}>
            <Play size={16} fill="currentColor"/> {running ? "Running..." : "Run Test"}
          </button>
        </div>
      </header>

      <section className="workspace">
        <div className="config-panel">
          <div className="panel-heading">
            <h2>Test Flow</h2>
            <p>Configure your test and add actions</p>
          </div>

          <label>Basic Information</label>
          <div className="field">
            <span>Website URL</span>
            <div className="input-wrap"><Globe2 size={17}/><input value={url} onChange={e=>{setUrl(e.target.value);setSaved(false)}}/></div>
          </div>

          <div className="field">
            <span>Browser</span>
            <div className="select-wrap">
              <div className="browser-symbol">◉</div>
              <select value={browser} onChange={e=>setBrowser(e.target.value)}>
                <option>Chromium</option><option>Firefox</option><option>WebKit</option>
              </select>
              <ChevronDown size={16}/>
            </div>
          </div>

          <div className="field">
            <span>Execution Mode</span>
            <div className="radio-row">
              <button className={`radio ${execution==="Headed" ? "chosen":""}`} onClick={()=>setExecution("Headed")}><span/> Headed</button>
              <button className={`radio ${execution==="Headless" ? "chosen":""}`} onClick={()=>setExecution("Headless")}><span/> Headless</button>
            </div>
          </div>

          <div className="tabs">
            <button className={!showData ? "selected":""} onClick={()=>setShowData(false)}>Actions</button>
            <button className={showData ? "selected":""} onClick={()=>setShowData(true)}>Data</button>
            <button>Assertions</button>
          </div>

          {!showData ? (
            <div className="action-list">
              {actionTypes.map(a => (
                <button className={`action-item action-${a.type}`} key={a.type} onClick={()=>addStep(a.type)}>
                  <span className="action-icon"><ActionIcon type={a.type}/></span>
                  <span className="action-copy"><strong>{a.label}</strong><small>{a.hint}</small></span>
                  <span className="grip">⠿</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="data-panel">
              <div className="data-card"><Database size={17}/><div><strong>phoneNumber</strong><small>9876543210</small></div></div>
              <div className="data-card"><Database size={17}/><div><strong>password</strong><small>Stored securely</small></div></div>
              <button className="add-data"><Plus size={16}/> Add variable</button>
            </div>
          )}
        </div>

        <div className="canvas">
          <div className="canvas-top">
            <button className="flow-pill"><Activity size={16}/> Test Flow</button>
            <div className="canvas-actions">
              <button className="secondary-pill"><Database size={15}/> Variables</button>
              <button className="data-pill" onClick={()=>setShowData(true)}><Code2 size={15}/> Data Flow</button>
            </div>
          </div>

          <div className="grid-bg"/>
          <div className="flow">
            <FlowNode start />
            {steps.map((step) => (
              <React.Fragment key={step.id}>
                <div className="connector"><div className="plus">+</div></div>
                <FlowNode step={step} onDelete={()=>removeStep(step.id)} />
              </React.Fragment>
            ))}
            <div className="connector"><div className="plus">+</div></div>
            <div className="finish-node">
              <div className="finish-icon"><Flag size={18}/></div>
              <div><strong>{running ? "Test Running" : "Test Completed"}</strong><small>{running ? "Executing browser automation..." : "All steps executed"}</small></div>
            </div>
          </div>

          <div className="minimap">
            <div className="mini-line green"/>
            {steps.map(s=><div key={s.id} className={`mini-line ${s.type}`}/>)}
            <div className="mini-line dark"/>
          </div>

          <div className="zoom">
            <button>−</button><span>100%</span><button>+</button><button>⛶</button>
          </div>
        </div>
      </section>
    </>
  );
}
