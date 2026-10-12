import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Play, MoreVertical } from 'lucide-react';
import { api } from '../services/api';

export default function TestRuns() {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    api.getTestRuns().then(setRuns);
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Test Runs</h1>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd9cf', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '16px' }}>Active & Recent Runs</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#fbfaf7', color: '#7b827e' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Test Name</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>URL</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Browser</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} style={{ borderTop: '1px solid #e6e2d8' }}>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.id}</td>
                  <td style={{ padding: '15px 20px', fontWeight: 600, color: '#27332f' }}>{run.testName}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.url}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.browser}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span className={`save-state ${run.status === 'Passed' ? 'saved' : run.status === 'Failed' ? 'draft' : ''}`} style={{ background: run.status === 'Failed' ? '#f9e3e3' : run.status === 'Running' ? '#e8eef6' : '' }}>
                      {run.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <button className="outline-btn" style={{ height: '32px', fontSize: '12px' }} onClick={() => navigate(`/test-runs/${run.id}`)}>
                      <Play size={14}/> View Execution
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
