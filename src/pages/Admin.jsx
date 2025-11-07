import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Zap, Bell, BarChart2, Edit, ShieldCheck, BookOpen } from 'lucide-react';

const AdminCard = ({ title, description, link, icon: Icon, color }) => (
  <Link 
    to={link} 
    className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className={`p-3 rounded-md ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-[var(--text-main)]">{title}</h3>
    </div>
    <p className="text-[var(--text-soft)] flex-grow">{description}</p>
    <div className="mt-4 text-right text-[var(--primary-gold)] font-semibold">
      Go to {title} &rarr;
    </div>
  </Link>
);

export default function AdminDashboard() {
  return (
    <div className="px-4 pb-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="w-8 h-8 text-[var(--primary-gold)]" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-[var(--text-soft)]">Manage your application and users.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard 
            title="User Management"
            description="View, edit, and manage all users in the system. Update their subscription levels and roles."
            link={createPageUrl('UserManagement')}
            icon={Users}
            color="bg-blue-500"
          />
          <AdminCard 
            title="System Tests"
            description="Run diagnostic tests for critical systems like GoHighLevel integration and email notifications."
            link={createPageUrl('AdminTestSystems')}
            icon={Zap}
            color="bg-red-500"
          />
          <AdminCard 
            title="Send Notifications"
            description="Send broadcast push notifications to all subscribed users across the platform."
            link={createPageUrl('AdminNotifications')}
            icon={Bell}
            color="bg-yellow-500"
          />
          <AdminCard 
            title="Analytics"
            description="View key metrics and analytics about user engagement and application performance."
            link={createPageUrl('AdminAnalytics')}
            icon={BarChart2}
            color="bg-green-500"
          />
          <AdminCard 
            title="Content Management"
            description="Manage site-wide content such as guides, magazine issues, and community highlights."
            link={createPageUrl('AdminContentManagement')}
            icon={Edit}
            color="bg-purple-500"
          />
          <AdminCard 
            title="Course Management"
            description="Create, edit, and manage all interactive courses and learning content."
            link={createPageUrl('AdminCourseManagement')}
            icon={BookOpen}
            color="bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}