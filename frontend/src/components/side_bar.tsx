import { NavLink, useLocation } from 'react-router-dom';
import './side_bar.css';
import { useEffect, useState } from 'react';
import { ArrowLeftPaginSVG, ArrowRightPaginSVG, IdcardSVG, ProfileSVG, XButtonSVG } from '../assets/svg';
import logo from '../assets/geekup-logo-general.svg';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, isMobile, onClose }) => {

  const location = useLocation();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isReportActive, setIsReportActive] = useState(false);
  const [isTopStudentActive, setIsTopStudentActive] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/search')) {
      setIsSearchActive(true);
      setIsReportActive(false);
      setIsTopStudentActive(false);
    } else if (location.pathname.startsWith('/report')) {
      setIsReportActive(true);
      setIsSearchActive(false);
      setIsTopStudentActive(false);
    }
    else if (location.pathname.startsWith('/top-student')) {
      setIsTopStudentActive(true);
      setIsSearchActive(false);
      setIsReportActive(false);
    } else {
      setIsSearchActive(false);
      setIsReportActive(false);
      setIsTopStudentActive(false);
    }
  }, [location.pathname]);

  return (
    <div className="sidebar" style={{height: `calc(100vh - 60px)`, width: collapsed ? 60 : 200, transition: 'width 0.3s', display: 'flex', flexDirection: 'column', }}>
      <h2 className="sidebar-title" style={{position: 'fixed', zIndex: 1000, backgroundColor: 'white', width: '100%', margin: 0, padding: 15, display: 'none'}}>
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </h2>
      {isMobile && (
        <div style={{ textAlign: 'right', padding: 10 }}>
          <button onClick={onClose} style={{ marginRight: 10, border: 'none' }}>
             {XButtonSVG}
          </button>
        </div>
      )}
      <ul className="sidebar-menu">
        <li className='sidebar-item'>
          <NavLink to="/search" 
            className={`sidebar-link ${isSearchActive ? 'active' : ''}`}
          >
            <span
              role="img"
              aria-label="profile"
              className="sidebar-icon"
              style={{ marginRight: '8px', display: 'inline-flex' }}
            >
              {ProfileSVG}
            </span>
            <span style={{display: collapsed ? 'none' : 'block'}}>Search</span>
          </NavLink>
        </li>

        <li className='sidebar-item'>
          <NavLink to="/report" 
            className={`sidebar-link ${isReportActive ? 'active' : ''}`}
          >
            <span
              role="img"
              aria-label="idcard"
              className="sidebar-icon"
              style={{ marginRight: '8px', display: 'inline-flex' }}
            >
              {IdcardSVG}
            </span>
            <span style={{display: collapsed ? 'none' : 'block'}}>Report</span>
          </NavLink>
        </li>

        <li className='sidebar-item'>
          <NavLink to="/top-student" 
            className={`sidebar-link ${isTopStudentActive ? 'active' : ''}`}
          >
            <span
              role="img"
              aria-label="idcard"
              className="sidebar-icon"
              style={{ marginRight: '8px', display: 'inline-flex' }}
            >
              {IdcardSVG}
            </span>
            <span style={{display: collapsed ? 'none' : 'block'}}>Top Student</span>
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? ArrowRightPaginSVG : ArrowLeftPaginSVG}
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
