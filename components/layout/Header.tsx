
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { Menu, Bell, Sun, Moon, LogOut, Settings, ChevronDown, Home, FileText, Users, BookOpen, BarChart2, Briefcase, CheckCircle2 } from '../Icons';
import { Notification, UserRole } from '../../types';
import { NOTIFICATIONS } from '../../constants';

// Navigation links configuration updated for dropdown functionality
const navLinks = {
  [UserRole.NAVTTCA_ADMIN]: [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/qdf-management', icon: FileText, text: 'QDF Management' },
    { to: '/users', icon: Users, text: 'Users' },
    { to: '/registry', icon: BookOpen, text: 'NVQ Registry' },
    { to: '/analytics', icon: BarChart2, text: 'Analytics' },
  ],
  [UserRole.TEVTA_REP]: [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/qdf-management', icon: FileText, text: 'My QDFs' },
    { to: '/registry', icon: BookOpen,text: 'NVQ Registry' },
  ],
  [UserRole.QDC_MEMBER]: [
    { to: '/', icon: Home, text: 'Dashboard' },
    { 
      text: 'Qualification Workspace', 
      icon: Briefcase,
      basePath: '/workspace',
      children: [
        { to: '/workspace/profiling', text: 'Occupational Profiling' },
        { to: '/workspace/standards', text: 'Competency Standards' },
        { to: '/workspace/curriculum', text: 'Curriculum' },
        { to: '/workspace/assessment', text: 'Assessment Guides' },
      ]
    },
  ],
  [UserRole.INDUSTRY_EXPERT]: [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/review', icon: CheckCircle2, text: 'Validation & Review' },
  ],
  [UserRole.TRAINING_PROVIDER]: [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/registry', icon: BookOpen, text: 'NVQ Registry' },
  ],
};


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
    const location = useLocation();
    
    const role = user?.role || UserRole.NAVTTCA_ADMIN;
    const links = navLinks[role] || [];

    const unreadNotifications = NOTIFICATIONS.filter(n => !n.read).length;

    const closeAllMenus = () => {
      setProfileOpen(false);
      setNotificationsOpen(false);
      setMobileMenuOpen(false);
      setWorkspaceMenuOpen(false);
    }

    const NavLinksComponent: React.FC<{isMobile?: boolean}> = ({ isMobile }) => (
      <>
        {links.map((link) => {
          if (link.children) {
            const isActive = link.basePath && location.pathname.startsWith(link.basePath);
            return (
              <div key={link.text} className="relative">
                <button
                  onClick={() => {
                    setWorkspaceMenuOpen(!workspaceMenuOpen);
                    setProfileOpen(false);
                    setNotificationsOpen(false);
                  }}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors w-full text-left ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.text}
                  <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${workspaceMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {workspaceMenuOpen && (
                  <div className={`${isMobile ? 'pl-4' : 'absolute top-full left-0 mt-2 w-56 bg-card border rounded-md shadow-lg z-10'}`}>
                    <ul className="py-1">
                      {link.children.map(child => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) => `block w-full text-left px-4 py-2 text-sm ${isActive ? 'bg-accent font-semibold' : 'hover:bg-accent'}`}
                            onClick={closeAllMenus}
                          >
                            {child.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                } ${isMobile ? 'w-full' : ''}`
              }
              onClick={closeAllMenus}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.text}
            </NavLink>
          );
        })}
      </>
    );

    return (
        <header className="sticky top-0 z-30 bg-card border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                     <NavLink to="/" className="flex items-center">
                        <h1 className="text-2xl font-bold text-primary">QDS</h1>
                    </NavLink>
                    <nav className="hidden lg:flex items-center space-x-2">
                        <NavLinksComponent />
                    </nav>
                </div>
                
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>

                    <div className="relative">
                        <Button variant="ghost" size="icon" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); setWorkspaceMenuOpen(false); }}>
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{unreadNotifications}</span>}
                        </Button>
                        {notificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-card border rounded-md shadow-lg z-10">
                                <div className="p-4 font-bold border-b">Notifications</div>
                                <ul className="py-2 max-h-80 overflow-y-auto">
                                    {NOTIFICATIONS.map(notif => (
                                        <li key={notif.id} className={`px-4 py-2 hover:bg-accent ${!notif.read ? 'font-semibold': ''}`}>
                                            <p className="text-sm">{notif.title}</p>
                                            <p className="text-xs text-muted-foreground">{notif.description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); setWorkspaceMenuOpen(false); }} className="flex items-center space-x-2">
                            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
                            <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                            <ChevronDown className="h-4 w-4 hidden sm:inline" />
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-card border rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    <li className="px-4 py-2 text-sm text-muted-foreground border-b">{user?.email}</li>
                                    <li>
                                        <NavLink to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-accent" onClick={() => setProfileOpen(false)}>
                                            <Settings className="w-4 h-4 mr-2" /> Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={() => { setProfileOpen(false); logout(); }} className="flex items-center w-full px-4 py-2 text-sm text-left text-destructive hover:bg-accent">
                                            <LogOut className="w-4 h-4 mr-2" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                 <div className="lg:hidden">
                    <nav className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
                       <NavLinksComponent isMobile />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;