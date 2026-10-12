import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Loader2, Play, Square, FileText } from 'lucide-react';
import { api } from '../services/api';

export default function TestExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [run, setRun] = useState(null);
  
  useEffect(() => {
    api.getTestRun(id).then(setRun);
  }, [id]);

  if (!run) return <div style={{padding: 20}}>Loading execution...</div>;

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Execution: {run.testName}</h1>
          <span className="save-state" style={{ background: '#e8eef6', color: '#53677f' }}>RUNNING</span>
        </div>
        <div className="toolbar">
          <button className="tool-btn danger"><Square size={16} fill="currentColor"/> Stop</button>
          <button className="outline-btn"><Play size={16}/> Run Again</button>
          <button className="run-btn" onClick={() => navigate(`/reports/${run.id}`)}><FileText size={16}/> View Report</button>
        </div>
      </header>

      <section className="workspace" style={{ display: 'flex' }}>
        <div className="config-panel" style={{ width: '320px' }}>
          <div className="panel-heading">
            <h2>Execution Steps</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#31654e' }}>
              <CheckCircle2 size={18}/> <strong>Navigate to URL</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#31654e' }}>
              <CheckCircle2 size={18}/> <strong>Click Patient Portal</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#765e52' }}>
              <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }}/> <strong>Enter Phone Number</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#a6aaa4' }}>
              <Circle size={18}/> Enter Password
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#a6aaa4' }}>
              <Circle size={18}/> Click Login
            </div>
          </div>
        </div>

        <div className="canvas" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#fffefa', border: '1px solid #ddd9cf', borderRadius: '12px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '40px', borderBottom: '1px solid #ddd9cf', background: '#fbfaf7', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '10px' }}>
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#a94d46'}}></div>
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#b36b31'}}></div>
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#75977b'}}></div>
              <div style={{ background: '#fff', border: '1px solid #e5e1d9', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', flex: 1, marginLeft: '10px', color: '#737a75' }}>
                {run.url}
              </div>
            </div>
            <div style={{ flex: 1, background: '#fff', display: 'grid', placeItems: 'center', color: '#a6aaa4' }}>
              <p>Browser live preview connecting...</p>
            </div>
          </div>

          <div style={{ height: '200px', background: '#17211f', borderRadius: '12px', padding: '15px', color: '#a6aaa4', fontFamily: 'monospace', fontSize: '13px', overflow: 'auto' }}>
            <div style={{ color: '#fff' }}>[10:32:01] Starting test execution for '{run.testName}'...</div>
            <div style={{ color: '#fff' }}>[10:32:02] Opening website: {run.url}</div>
            <div style={{ color: '#a9c5a4' }}>[10:32:03] Page loaded successfully</div>
            <div style={{ color: '#fff' }}>[10:32:04] Executing step 2: Click on Patient Portal</div>
            <div style={{ color: '#a9c5a4' }}>[10:32:05] Clicked successfully</div>
            <div style={{ color: '#e4bf8b' }}>[10:32:05] Executing step 3: Enter Phone Number...</div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
