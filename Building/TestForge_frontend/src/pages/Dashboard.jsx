import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Activity, CheckCircle, XCircle, Play, MoreVertical } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    api.getTestRuns().then(setRuns);
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Dashboard</h1>
        </div>
        <div className="toolbar" style={{ gap: '15px' }}>
          <div className="input-wrap" style={{ width: '250px', height: '38px', borderRadius: '20px' }}>
            <Search size={16} />
            <input placeholder="Search tests..." />
          </div>
          <button className="icon-button"><Bell size={18}/></button>
          <button className="run-btn" onClick={() => navigate('/test-builder')} style={{ borderRadius: '20px' }}>
            + Create New Test
          </button>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', overflow: 'auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { label: 'Total Tests', val: 24, icon: Activity, color: '#31654e' },
            { label: 'Passed', val: 18, icon: CheckCircle, color: '#31654e' },
            { label: 'Failed', val: 4, icon: XCircle, color: '#a94d46' },
            { label: 'Running', val: 2, icon: Play, color: '#765e52' }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#fffefa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd9cf', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: '#f7f5ef', display: 'grid', placeItems: 'center', color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '24px', display: 'block', color: '#17211f' }}>{stat.val}</strong>
                <small style={{ color: '#7b827e', fontSize: '12px', fontWeight: 600 }}>{stat.label}</small>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd9cf', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '16px' }}>Recent Test Runs</h2>
            <button className="outline-btn" style={{ height: '32px', fontSize: '12px' }} onClick={() => navigate('/test-runs')}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#fbfaf7', color: '#7b827e' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Test Name</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Browser</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Duration</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Started</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run, i) => (
                <tr key={run.id} style={{ borderTop: '1px solid #e6e2d8' }}>
                  <td style={{ padding: '15px 20px', fontWeight: 600, color: '#27332f' }}>{run.testName}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.browser}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span className={`save-state ${run.status === 'Passed' ? 'saved' : run.status === 'Failed' ? 'draft' : ''}`} style={{ background: run.status === 'Failed' ? '#f9e3e3' : run.status === 'Running' ? '#e8eef6' : '' }}>
                      {run.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.duration}</td>
                  <td style={{ padding: '15px 20px', color: '#65706b' }}>{run.startedAt}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <button className="icon-button" style={{ height: 'auto', width: 'auto' }} onClick={() => navigate(`/test-runs/${run.id}`)}>
                      <MoreVertical size={16} />
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
