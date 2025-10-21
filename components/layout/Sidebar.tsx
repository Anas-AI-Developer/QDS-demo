
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Home, FileText, Users, BookOpen, BarChart2, Briefcase, CheckCircle2 } from '../Icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

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
    { to: '/workspace', icon: Briefcase, text: 'Qualification Workspace' },
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


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const role = user?.role || UserRole.NAVTTCA_ADMIN;

  const links = navLinks[role];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-30 transition-opacity duration-200 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed z-40 inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-card border-r border-border flex flex-col`}>
        <div className="flex items-center justify-center h-16 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">QDS</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.text}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
