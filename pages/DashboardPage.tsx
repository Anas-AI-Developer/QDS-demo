
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import StatCard from '../components/StatCard';
import { Briefcase, FileText, CheckCircle2, Clock } from '../components/Icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { ACTIVITY_LOGS } from '../constants';

const AdminDashboard: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatCard title="Total Qualifications" value="1,250" icon={<Briefcase />} description="+20% from last month" />
    <StatCard title="Active QDCs" value="78" icon={<FileText />} description="+5 from last week" />
    <StatCard title="Pending QDFs" value="12" icon={<Clock />} description="3 urgent reviews" />
    <StatCard title="Approved This Month" value="42" icon={<CheckCircle2 />} />
  </div>
);

const DefaultDashboard: React.FC<{role: UserRole}> = ({role}) => (
    <Card>
        <CardHeader>
            <CardTitle>Welcome to your Dashboard</CardTitle>
            <CardDescription>You are logged in as a {role}.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your role-specific information and actions will appear here.</p>
        </CardContent>
    </Card>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case UserRole.NAVTTCA_ADMIN:
        return <AdminDashboard />;
      case UserRole.TEVTA_REP:
        return <DefaultDashboard role={user.role} />;
      case UserRole.QDC_MEMBER:
        return <DefaultDashboard role={user.role} />;
      case UserRole.INDUSTRY_EXPERT:
        return <DefaultDashboard role={user.role} />;
      case UserRole.TRAINING_PROVIDER:
        return <DefaultDashboard role={user.role} />;
      default:
        return <p>No dashboard available for this role.</p>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      {renderDashboard()}

      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>An overview of the latest actions in the system.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Timestamp</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ACTIVITY_LOGS.slice(0, 5).map(log => (
                        <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.user}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.details}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
