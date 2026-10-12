import React from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <>
      <header className="topbar">
        <div className="title-area">
          <h1>Settings</h1>
        </div>
        <div className="toolbar">
          <button className="run-btn"><Save size={16}/> Save Changes</button>
        </div>
      </header>
      <section className="workspace" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', alignItems: 'flex-start' }}>
        
        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', padding: '25px', width: '600px', maxWidth: '100%' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', letterSpacing: '-0.3px' }}>General Settings</h2>
          
          <div className="field">
            <span>Default Browser</span>
            <div className="select-wrap">
              <select defaultValue="Chromium">
                <option>Chromium</option>
                <option>Firefox</option>
                <option>WebKit</option>
              </select>
            </div>
          </div>

          <div className="field">
            <span>Default Execution Mode</span>
            <div className="radio-row">
              <label className="radio" style={{ cursor: 'pointer' }}>
                <input type="radio" name="exec" value="Headed" defaultChecked style={{ margin: 0 }} /> Headed
              </label>
              <label className="radio" style={{ cursor: 'pointer' }}>
                <input type="radio" name="exec" value="Headless" style={{ margin: 0 }} /> Headless
              </label>
            </div>
          </div>
          
          <div className="field">
            <span>Default Timeout (ms)</span>
            <div className="input-wrap">
              <input type="number" defaultValue={30000} style={{ padding: 0 }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#fffefa', borderRadius: '12px', border: '1px solid #ddd9cf', padding: '25px', width: '600px', maxWidth: '100%' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', letterSpacing: '-0.3px' }}>Reporting & Evidence</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#414b46', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Screenshot on failure
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#414b46', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Save execution logs
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#414b46', cursor: 'pointer' }}>
              <input type="checkbox" /> Auto-retry failed steps once
            </label>
          </div>
        </div>

      </section>
    </>
  );
}
