import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/side_bar';
import { useEffect, useState } from 'react';
import SearchPage from './pages/search/searchPage';
import ReportPage from './pages/report/reportPage';
import TopStudentPage from './pages/topstudent/topStudentPage';

function App() {

  const [collapsed, setCollapsed] = useState(false); // Trạng thái collapse ở App

  var sidebarWidth = collapsed ? '60px' : '200px';

  useEffect(() => {
    sidebarWidth = (collapsed ? '60px' : '200px');
  }, [collapsed]);

  return (
    <Router>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 40,
          width: '100%',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: 15,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h3>G-Score</h3>
      </div>
      <div>
        <div style={{ position: 'fixed', top: 70, left: 0 }}>
          <Sidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
        </div>
        <div
          style={{
            marginTop: 60,
            marginLeft: sidebarWidth, // phải trùng với width của sidebar khi mở
            padding: 20,
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
            width: `calc(100% - ${collapsed ? 60 : 200}px)`,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/top-student" element={<TopStudentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;