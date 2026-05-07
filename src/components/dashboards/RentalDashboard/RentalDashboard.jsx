import React from 'react';
import './RentalDashboard.css';

const RentalDashboard = () => {
  return (
    <div className="rental-dashboard">
      <aside className="rental-sidebar">
        <h1 className="rental-logo">Rental<span>ML</span></h1>
        <p className="rental-tagline">NYC Pipeline Dashboard</p>
        <nav className="rental-nav">
          <div className="nav-item active">Model Metrics</div>
          <button onClick={() => window.location.hash = ''} className="sidebar-back-btn">
            &larr; Back to Portfolio
          </button>
        </nav>
      </aside>

      <main className="rental-main">

        <div className="kpi-grid">
          <div className="kpi-card">
            <p className="kpi-label">Total Properties</p>
            <p className="kpi-value">42,891</p>
            <p className="kpi-trend green">&uarr; 12% from last week</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-label">Model R² Score</p>
            <p className="kpi-value indigo">0.84</p>
            <p className="kpi-trend slate">Validation Set</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-label">Mean Absolute Error</p>
            <p className="kpi-value">$41.50</p>
            <p className="kpi-trend green">&darr; $3.20 improvement</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-label">Data Drift Detected</p>
            <p className="kpi-value green">No</p>
            <p className="kpi-trend slate">W&B Monitoring</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-panel">
            <h3 className="chart-title">Feature Importance (Top 5)</h3>
            <div className="feature-list">
              {[
                { name: 'Neighborhood', score: 85 },
                { name: 'Room Type', score: 60 },
                { name: 'Reviews', score: 45 },
                { name: 'Availability', score: 30 },
                { name: 'Min Nights', score: 15 },
              ].map(feat => (
                <div key={feat.name} className="feature-item">
                  <div className="feature-header">
                    <span>{feat.name}</span>
                    <span className="feature-score">{feat.score / 100}</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill" style={{ width: `${feat.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RentalDashboard;
