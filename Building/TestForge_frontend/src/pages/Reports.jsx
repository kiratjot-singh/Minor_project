import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck2, Search, Download } from 'lucide-react';
import { api } from '../services/api';

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.getReports().then(setReports);
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Execution Reports</h1>
        </div>
        <div className="toolbar">
          <div className="input-wrap" style={{ width: '250px', height: '38px', borderRadius: '20px' }}>
            <Search size={16} />
            <input placeholder="Search reports..." />
          </div>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#fbfaf7', color: '#7b827e' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Report ID</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Test Name</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Result</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={r.id} style={{ borderTop: '1px solid #e6e2d8' }}>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>REP-{r.id.split('-')[1]}</td>
                  <td style={{ padding: '15px 20px', fontWeight: 600, color: '#27332f' }}>{r.testName}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span className={`save-state ${r.status === 'Passed' ? 'saved' : r.status === 'Failed' ? 'draft' : ''}`} style={{ background: r.status === 'Failed' ? '#f9e3e3' : '' }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{r.date}</td>
                  <td style={{ padding: '15px 20px', display: 'flex', gap: '8px' }}>
                    <button className="outline-btn" style={{ height: '32px', fontSize: '12px' }} onClick={() => navigate(`/reports/${r.id}`)}>
                      <FileCheck2 size={14}/> View
                    </button>
                    <button className="icon-button" style={{ height: '32px', width: '32px', border: '1px solid #ddd9cf', borderRadius: '8px' }}>
                      <Download size={14}/>
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
