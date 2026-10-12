import { mockTests, mockTestRuns, mockHistory, mockSteps } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getTests() { await delay(400); return mockTests; },
  async getTest(id) { await delay(300); return mockTests.find(t => t.id === id); },
  async getTestRuns() { await delay(400); return mockTestRuns; },
  async getTestRun(id) { await delay(300); return mockTestRuns.find(r => r.id === id); },
  async getHistory() { await delay(400); return mockHistory; },
  async getReports() { await delay(400); return mockHistory; }, 
  async getReport(id) { await delay(300); return mockHistory.find(h => h.id === id); },
  async getSteps() { await delay(200); return mockSteps; }
};
