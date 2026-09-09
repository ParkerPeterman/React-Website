import React from 'react';
import './NOCDashboard.css';

const NOCDashboard = () => {
  return (
    <div className="noc-dashboard">
        <header className="noc-header">
          <div className="noc-title">
            <h1>
              <span className="icon">◎</span> WebOutage NOC
            </h1>
            <p className="noc-subtitle">Live Network Incident Tracking & Prediction</p>
          </div>
          <button onClick={() => window.location.hash = ''} className="back-btn">
            Return to Portfolio
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card blue shadow-lg">
            <p className="stat-label">Global Uptime</p>
            <h2 className="stat-value">99.8%</h2>
            <p className="stat-desc green">&uarr; 0.1% past 30 days</p>
          </div>
          <div className="stat-card red shadow-lg">
            <div className="ping-container">
              <div className="ping-anim"></div>
              <div className="ping-dot"></div>
            </div>
            <p className="stat-label">Active Incidents</p>
            <h2 className="stat-value">3</h2>
            <p className="stat-desc red">US-East-1 routing issue</p>
          </div>
          <div className="stat-card yellow shadow-lg">
            <p className="stat-label">Predicted Outages</p>
            <h2 className="stat-value">1</h2>
            <p className="stat-desc yellow">High latency on Node 42</p>
          </div>
          <div className="stat-card emerald shadow-lg">
            <p className="stat-label">MTTR</p>
            <h2 className="stat-value">14m</h2>
            <p className="stat-desc emerald">Faster than SLA targets</p>
          </div>
        </div>

        <div className="main-grid">
          <div className="content-panel lg-col-2">
            <h3 className="panel-title">Live Incident Log</h3>
            <div className="table-container">
              <table className="noc-table">
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Region</th>
                    <th>Component</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="status-badge bg-red-dim">CRITICAL</span></td>
                    <td className="text-white-bold">US-East-1</td>
                    <td className="text-slate-light">BGP Router A</td>
                    <td>12m 40s</td>
                    <td className="status-text red">
                      <span className="status-dot red"></span> Investigating
                    </td>
                  </tr>
                  <tr>
                    <td><span className="status-badge bg-yellow-dim">WARNING</span></td>
                    <td className="text-white-bold">EU-Central</td>
                    <td className="text-slate-light">Database Cluster</td>
                    <td>4m 10s</td>
                    <td className="status-text yellow">
                      <span className="status-dot yellow"></span> Mitigating
                    </td>
                  </tr>
                  <tr>
                    <td><span className="status-badge bg-slate-dim">INFO</span></td>
                    <td className="text-white-bold">AP-South</td>
                    <td className="text-slate-light">Load Balancer</td>
                    <td>45m 00s</td>
                    <td className="status-text green">
                      <span className="status-dot green"></span> Resolved
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-panel engine-panel">
            <h3 className="panel-title">Predictive Analysis Engine</h3>
            <p className="panel-desc">Powered by Python & Scikit-Learn</p>
            <div className="probability-list">
              <div className="prob-item">
                <div className="prob-header text-sm">
                  <span className="prob-name">DB CPU Spike Probability</span>
                  <span className="prob-value red">82%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar red" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="prob-item">
                <div className="prob-header text-sm">
                  <span className="prob-name">Network Saturation Risk</span>
                  <span className="prob-value yellow">45%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar yellow" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default NOCDashboard;
