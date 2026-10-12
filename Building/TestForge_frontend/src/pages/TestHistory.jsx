import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, FileText } from 'lucide-react';
import { api } from '../services/api';

export default function TestHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.getHistory().then(setHistory);
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Test History</h1>
        </div>
        <div className="toolbar" style={{ gap: '15px' }}>
          <div className="input-wrap" style={{ width: '250px', height: '38px', borderRadius: '20px' }}>
            <Search size={16} />
            <input placeholder="Search history..." />
          </div>
          <button className="outline-btn"><Filter size={16}/> Filters</button>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#fbfaf7', color: '#7b827e' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Test Name</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Browser</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Steps</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Duration</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={h.id} style={{ borderTop: '1px solid #e6e2d8' }}>
                  <td style={{ padding: '15px 20px', fontWeight: 600, color: '#27332f' }}>{h.testName}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{h.browser}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span className={`save-state ${h.status === 'Passed' ? 'saved' : h.status === 'Failed' ? 'draft' : ''}`} style={{ background: h.status === 'Failed' ? '#f9e3e3' : '' }}>
                      {h.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{h.steps}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{h.duration}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{h.date}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <button className="outline-btn" style={{ height: '32px', fontSize: '12px' }} onClick={() => navigate(`/reports/${h.id}`)}>
                      <FileText size={14}/> Report
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
