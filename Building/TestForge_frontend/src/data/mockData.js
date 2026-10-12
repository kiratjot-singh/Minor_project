export const mockTests = [
  { id: "test-1", name: "Patient Login Test", url: "http://localhost:5173", browser: "Chromium", mode: "Headed", stepsCount: 6, status: "Passed", lastRun: "2 mins ago", duration: "12s" },
  { id: "test-2", name: "Doctor Signup Flow", url: "http://localhost:5173/signup/doctor", browser: "Firefox", mode: "Headless", stepsCount: 12, status: "Failed", lastRun: "1 hour ago", duration: "25s" },
  { id: "test-3", name: "Appointment Booking", url: "http://localhost:5173/book", browser: "WebKit", mode: "Headless", stepsCount: 8, status: "Running", lastRun: "Now", duration: "..." },
  { id: "test-4", name: "Admin Dashboard Load", url: "http://localhost:5173/admin", browser: "Chromium", mode: "Headless", stepsCount: 4, status: "Passed", lastRun: "3 hours ago", duration: "4s" },
];

export const mockTestRuns = [
  { id: "run-101", testId: "test-1", testName: "Patient Login Test", url: "http://localhost:5173", browser: "Chromium", status: "Running", startedAt: "10:32 AM", duration: "14s" },
  { id: "run-102", testId: "test-2", testName: "Doctor Signup Flow", url: "http://localhost:5173/signup/doctor", browser: "Firefox", status: "Failed", startedAt: "09:15 AM", duration: "25s" },
  { id: "run-103", testId: "test-3", testName: "Appointment Booking", url: "http://localhost:5173/book", browser: "WebKit", status: "Passed", startedAt: "08:00 AM", duration: "18s" }
];

export const mockHistory = [
  { id: "hist-1", testName: "Patient Login Test", url: "http://localhost:5173", browser: "Chromium", status: "Passed", steps: 6, duration: "12s", date: "Oct 24, 2023 - 10:30 AM" },
  { id: "hist-2", testName: "Doctor Signup Flow", url: "http://localhost:5173", browser: "Firefox", status: "Failed", steps: 12, duration: "25s", date: "Oct 24, 2023 - 09:15 AM" },
  { id: "hist-3", testName: "Appointment Booking", url: "http://localhost:5173", browser: "WebKit", status: "Passed", steps: 8, duration: "18s", date: "Oct 23, 2023 - 15:45 PM" },
  { id: "hist-4", testName: "Admin Dashboard Load", url: "http://localhost:5173", browser: "Chromium", status: "Passed", steps: 4, duration: "4s", date: "Oct 23, 2023 - 14:00 PM" },
  { id: "hist-5", testName: "Patient Login Test", url: "http://localhost:5173", browser: "Chromium", status: "Failed", steps: 6, duration: "8s", date: "Oct 22, 2023 - 11:20 AM" },
];

export const mockSteps = [
  { id: 1, type: "navigate", title: "Navigate to URL", desc: "Open the application", value: "http://localhost:5173" },
  { id: 2, type: "click", title: "Click on Patient Portal", desc: "Click the Patient Portal link/button", value: "text=Patient Portal" },
  { id: 3, type: "type", title: "Enter Phone Number", desc: "Type phone number", value: "9876543210", data: "phoneNumber" },
  { id: 4, type: "type", title: "Enter Password", desc: "Type password", value: "••••••••••", data: "password" },
  { id: 5, type: "click", title: "Click Login", desc: "Click the Login button", value: "text=Login" },
  { id: 6, type: "assert", title: "Assert URL", desc: "Verify redirected URL", value: "Expected: /patient" }
];
