"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CogIcon, UserIcon, BellIcon, ShieldCheckIcon, LockClosedIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your admin account and system preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5 text-burgundy" />
            <CardTitle>Account Settings</CardTitle>
          </div>
          <CardDescription>Manage your profile and account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                defaultValue="KITS Admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                defaultValue="kitsadmin@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                defaultValue="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                defaultValue="Administrator"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              rows={3}
              defaultValue="Department administrator with over 5 years of experience in higher education management."
            />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
              Save Changes
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-5 w-5 text-burgundy" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter current password"
              />
            </div>
            <div />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="twoFactor"
              className="h-4 w-4 rounded border-gray-300 text-burgundy focus:ring-burgundy"
              defaultChecked
            />
            <label htmlFor="twoFactor" className="text-sm text-gray-700">Enable two-factor authentication</label>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
              Update Password
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BellIcon className="h-5 w-5 text-burgundy" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Choose what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-sm">New Registration Requests</h4>
                <p className="text-xs text-gray-500">Receive notifications when new students register</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-burgundy"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-sm">New Student Queries</h4>
                <p className="text-xs text-gray-500">Get notified when students ask questions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-burgundy"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-sm">Blog Post Submissions</h4>
                <p className="text-xs text-gray-500">Receive alerts for new blog content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-burgundy"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium text-sm">Event Reminders</h4>
                <p className="text-xs text-gray-500">Get reminders about upcoming events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-burgundy"></div>
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
              Save Preferences
            </button>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CogIcon className="h-5 w-5 text-burgundy" />
            <CardTitle>System Preferences</CardTitle>
          </div>
          <CardDescription>Configure system-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>UTC (GMT+0)</option>
                <option>Eastern Time (GMT-5)</option>
                <option>Central Time (GMT-6)</option>
                <option>Pacific Time (GMT-8)</option>
                <option>Indian Standard Time (GMT+5:30)</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="darkMode"
                className="h-4 w-4 rounded border-gray-300 text-burgundy focus:ring-burgundy"
              />
              <label htmlFor="darkMode" className="text-sm text-gray-700">Enable dark mode</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoBackup"
                className="h-4 w-4 rounded border-gray-300 text-burgundy focus:ring-burgundy"
                defaultChecked
              />
              <label htmlFor="autoBackup" className="text-sm text-gray-700">Automatic data backup</label>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Reset to Default
            </button>
            <button className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
              Save Settings
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
