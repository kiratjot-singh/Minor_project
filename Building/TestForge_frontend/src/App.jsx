import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import TestBuilder from './pages/TestBuilder';
import TestRuns from './pages/TestRuns';
import TestExecution from './pages/TestExecution';
import TestHistory from './pages/TestHistory';
import Reports from './pages/Reports';
import ReportDetails from './pages/ReportDetails';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="test-builder" element={<TestBuilder />} />
        <Route path="test-runs" element={<TestRuns />} />
        <Route path="test-runs/:id" element={<TestExecution />} />
        <Route path="test-history" element={<TestHistory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/:id" element={<ReportDetails />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
