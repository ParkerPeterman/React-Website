import React from 'react';
import './CensusDashboard.css';

const CensusDashboard = () => {
  return (
    <div className="census-dashboard">
      <nav className="census-nav">
        <div className="census-brand">
          <div className="api-box">API</div>
          <span className="census-title">Census ML Gateway</span>
        </div>
        <button onClick={() => window.location.hash = ''} className="nav-back-btn">
          Return to Portfolio &rarr;
        </button>
      </nav>

      <div className="census-container">
        <div className="kpi-row">
          <div className="kpi-box teal">
            <p className="kpi-name">Inferences Today</p>
            <p className="kpi-data">1.2M</p>
          </div>
          <div className="kpi-box blue">
            <p className="kpi-name">Avg Latency</p>
            <p className="kpi-data">45ms</p>
          </div>
          <div className="kpi-box green">
            <p className="kpi-name">API Health</p>
            <p className="kpi-data green">Operational</p>
          </div>
        </div>

        <div className="dashboard-main">
          <div className="census-panel lg-col-2">
            <h3 className="panel-heading">Recent Inference Logs</h3>
            <div className="log-table-container">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Endpoint</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                    <th>Latency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>10:42:01 AM</td><td>/predict</td><td><span className="prediction-tag red">&lt;=50K</span></td><td>92%</td><td>42ms</td></tr>
                  <tr><td>10:42:05 AM</td><td>/predict</td><td><span className="prediction-tag green">&gt;50K</span></td><td>88%</td><td>46ms</td></tr>
                  <tr><td>10:42:12 AM</td><td>/predict</td><td><span className="prediction-tag red">&lt;=50K</span></td><td>99%</td><td>39ms</td></tr>
                  <tr><td>10:42:18 AM</td><td>/predict</td><td><span className="prediction-tag green">&gt;50K</span></td><td>76%</td><td>51ms</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="census-panel">
            <h3 className="panel-heading">Model Info (DVC)</h3>
            <div className="info-list">
              <div className="info-row">
                <span className="info-label">Model Version</span>
                <span className="info-value mono teal">v2.1.4-beta</span>
              </div>
              <div className="info-row">
                <span className="info-label">Data Hash</span>
                <span className="info-value mono">a9f8c2e</span>
              </div>
              <div className="info-row">
                <span className="info-label">F1 Score</span>
                <span className="info-value">0.82</span>
              </div>
              <div className="info-row">
                <span className="info-label">Precision</span>
                <span className="info-value">0.85</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CensusDashboard;
