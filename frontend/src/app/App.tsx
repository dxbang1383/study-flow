import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Timer from './components/Timer';
import Analytics from './components/Analytics';
import Help from './components/Help';
import Profile from './components/Profile';
import FloatingActionButton from './components/FloatingActionButton';
import CreateModal from './components/CreateModal';
import { useAppStore } from './components/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const { theme, isCreateModalOpen, createModalType, closeCreateModal, openCreateModal } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="h-screen w-screen flex bg-gray-50 dark:bg-gray-950">
                  {/* Left Sidebar */}
                  <Sidebar />

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Navigation */}
                    <TopNav />

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/tasks" element={<TaskManager />} />
                        <Route path="/timer" element={<Timer />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </main>
                  </div>

                  {/* Floating Action Button */}
                  <FloatingActionButton onAction={(type) => openCreateModal(type)} />

                  {/* Create Modal */}
                  <CreateModal
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                    type={createModalType}
                  />
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </DndProvider>
    </AuthProvider>
  );
}
