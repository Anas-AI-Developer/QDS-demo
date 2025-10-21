
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">Update your personal information.</p>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Full Name</label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email Address</label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium">Preferences</h3>
          <p className="text-sm text-muted-foreground">Customize your notification settings.</p>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Select which notifications you'd like to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center space-x-2">
                    <input type="checkbox" id="qdf-updates" defaultChecked />
                    <label htmlFor="qdf-updates">QDF Status Updates</label>
               </div>
               <div className="flex items-center space-x-2">
                    <input type="checkbox" id="comments" defaultChecked />
                    <label htmlFor="comments">New Comments and Feedback</label>
               </div>
               <div className="flex items-center space-x-2">
                    <input type="checkbox" id="system-alerts" />
                    <label htmlFor="system-alerts">System Alerts</label>
               </div>
            </CardContent>
             <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
