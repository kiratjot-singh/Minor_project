import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Play, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../services/api';

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    api.getReport(id).then(setReport);
    api.getSteps().then(setSteps);
  }, [id]);

  if (!report) return <div style={{padding: 20}}>Loading report...</div>;

  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <button className="icon-button" onClick={() => navigate(-1)}><ArrowLeft size={18}/></button>
          <h1>Report: {report.testName}</h1>
          <span className={`save-state ${report.status === 'Passed' ? 'saved' : 'draft'}`} style={{ background: report.status === 'Failed' ? '#f9e3e3' : '' }}>
            {report.status}
          </span>
        </div>
        <div className="toolbar">
          <button className="outline-btn"><Download size={16}/> Download PDF</button>
          <button className="run-btn" onClick={() => navigate(`/test-runs/${report.id}`)}><Play size={16} fill="currentColor"/> Run Again</button>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div style={{ background: '#fffefa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd9cf' }}>
            <small style={{ color: '#7b827e', fontSize: '12px', fontWeight: 600 }}>Browser</small>
            <strong style={{ fontSize: '16px', display: 'block', color: '#17211f', marginTop: '5px' }}>{report.browser}</strong>
          </div>
          <div style={{ background: '#fffefa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd9cf' }}>
            <small style={{ color: '#7b827e', fontSize: '12px', fontWeight: 600 }}>Duration</small>
            <strong style={{ fontSize: '16px', display: 'block', color: '#17211f', marginTop: '5px' }}>{report.duration}</strong>
          </div>
          <div style={{ background: '#fffefa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd9cf' }}>
            <small style={{ color: '#7b827e', fontSize: '12px', fontWeight: 600 }}>Steps Passed</small>
            <strong style={{ fontSize: '16px', display: 'block', color: '#31654e', marginTop: '5px' }}>{report.status === 'Passed' ? report.steps : report.steps - 1} / {report.steps}</strong>
          </div>
          <div style={{ background: '#fffefa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd9cf' }}>
            <small style={{ color: '#7b827e', fontSize: '12px', fontWeight: 600 }}>Date & Time</small>
            <strong style={{ fontSize: '16px', display: 'block', color: '#17211f', marginTop: '5px' }}>{report.date}</strong>
          </div>
        </div>

        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd9cf' }}>
            <h2 style={{ margin: 0, fontSize: '16px' }}>Step Results</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#fbfaf7', color: '#7b827e' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>#</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Action</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Target / Value</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Expected</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((s, i) => {
                const isFailStep = report.status === 'Failed' && i === steps.length - 1;
                return (
                  <React.Fragment key={s.id}>
                    <tr style={{ borderTop: '1px solid #e6e2d8', background: isFailStep ? '#fdf2f2' : 'transparent' }}>
                      <td style={{ padding: '15px 20px', color: '#65706b' }}>{i + 1}</td>
                      <td style={{ padding: '15px 20px', fontWeight: 600, color: '#27332f' }}>{s.title}</td>
                      <td style={{ padding: '15px 20px', color: '#65706b' }}>{s.value}</td>
                      <td style={{ padding: '15px 20px', color: '#65706b' }}>Success</td>
                      <td style={{ padding: '15px 20px' }}>
                        {isFailStep ? (
                          <span style={{ color: '#a94d46', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}><XCircle size={16}/> Failed</span>
                        ) : (
                          <span style={{ color: '#31654e', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}><CheckCircle2 size={16}/> Passed</span>
                        )}
                      </td>
                    </tr>
                    {isFailStep && (
                      <tr style={{ background: '#f9e3e3' }}>
                        <td colSpan={5} style={{ padding: '15px 20px' }}>
                          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #f0caca' }}>
                            <strong style={{ color: '#a94d46', display: 'block', marginBottom: '8px' }}>Error Details:</strong>
                            <p style={{ margin: 0, color: '#733333', fontSize: '12px', fontFamily: 'monospace' }}>
                              TimeoutError: Element not found<br/>
                              Selector: "{s.value}"<br/>
                              Waited 30000ms for element to be visible.
                            </p>
                            <button className="outline-btn" style={{ marginTop: '15px', height: '30px', fontSize: '12px', color: '#a94d46', borderColor: '#e6c8c8' }}>
                              View Error Screenshot
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
