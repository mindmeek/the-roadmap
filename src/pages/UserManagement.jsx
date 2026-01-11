import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { User } from '@/entities/User';
import { Loader2, Search, UserCheck, UserX, Crown, Shield, ChevronDown, ChevronUp, Trash2, PauseCircle, PlayCircle, Gift } from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [upgradingUserId, setUpgradingUserId] = useState(null);
    const [processingUserId, setProcessingUserId] = useState(null); // New state for general processing

    useEffect(() => {
        loadUsers();
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const user = await User.me();
            setCurrentUser(user);
        } catch (error) {
            console.error('Error loading current user:', error);
        }
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const allUsers = await User.list();
            setUsers(allUsers);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleManualUpgrade = async (userId, newLevel) => {
        if (!confirm(`Are you sure you want to change this user's subscription to ${newLevel}?`)) {
            return;
        }

        setUpgradingUserId(userId);
        try {
            const { data } = await base44.functions.invoke('adminUpgradeUser', {
                userId: userId,
                subscriptionLevel: newLevel
            });

            if (data.success) {
                alert(`User subscription successfully updated to ${newLevel}!`);
                await loadUsers();
            } else {
                alert(`Failed to update subscription: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error upgrading user:', error);
            alert('An error occurred while updating the subscription.');
        } finally {
            setUpgradingUserId(null);
        }
    };

    const handleGrantTrial = async (userId, durationDays = 14) => {
        if (!confirm(`Grant this user a ${durationDays}-day premium trial?`)) {
            return;
        }

        setProcessingUserId(userId);
        try {
            const user = users.find(u => u.id === userId);
            
            const { data } = await base44.functions.invoke('handleNewUserSignup', {
                userId: userId,
                email: user.email,
                fullName: user.full_name
            });

            if (data.success) {
                alert(`${durationDays}-day premium trial granted successfully!`);
                await loadUsers();
            } else {
                alert(`Failed to grant trial: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error granting trial:', error);
            alert('An error occurred while granting the trial.');
        } finally {
            setProcessingUserId(null);
        }
    };

    const handlePauseAccount = async (user) => {
        const isPaused = user.account_status === 'paused';
        const action = isPaused ? 'unpause' : 'pause';
        
        if (!confirm(`Are you sure you want to ${action} ${user.full_name}'s account?`)) {
            return;
        }

        setProcessingUserId(user.id);
        try {
            await base44.entities.User.update(user.id, {
                account_status: isPaused ? 'active' : 'paused'
            });
            
            alert(`Account successfully ${isPaused ? 'unpaused' : 'paused'}!`);
            await loadUsers();
        } catch (error) {
            console.error('Error pausing/unpausing account:', error);
            alert('An error occurred while updating the account status.');
        } finally {
            setProcessingUserId(null);
        }
    };

    const handleDeleteAccount = async (user) => {
        if (!confirm(`⚠️ WARNING: This will permanently delete ${user.full_name}'s account and ALL their data. This action cannot be undone. Are you absolutely sure?`)) {
            return;
        }

        // Double confirmation for safety
        const confirmText = prompt('Type "DELETE" to confirm permanent deletion:');
        if (confirmText !== 'DELETE') {
            alert('Deletion cancelled.');
            return;
        }

        setProcessingUserId(user.id);
        try {
            await base44.asServiceRole.entities.User.delete(user.id);
            
            alert('User account permanently deleted.');
            await loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the account: ' + error.message);
        } finally {
            setProcessingUserId(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpanded = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="card p-8 text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Access Denied</h2>
                    <p className="text-[var(--text-soft)]">You need administrator privileges to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">User Management</h1>
                <p className="text-[var(--text-soft)]">Manage all platform users, subscriptions, and access levels.</p>
            </div>

            {/* Search Bar */}
            <div className="card p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or business..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input pl-10 w-full"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="card p-4">
                    <div className="text-2xl font-bold text-[var(--text-main)]">{users.length}</div>
                    <div className="text-sm text-[var(--text-soft)]">Total Users</div>
                </div>
                <div className="card p-4">
                    <div className="text-2xl font-bold text-[var(--primary-gold)]">
                        {users.filter(u => u.subscription_level === 'business_hq').length}
                    </div>
                    <div className="text-sm text-[var(--text-soft)]">Business HQ Members</div>
                </div>
                <div className="card p-4">
                    <div className="text-2xl font-bold text-[var(--text-main)]">
                        {users.filter(u => u.subscription_level === 'free').length}
                    </div>
                    <div className="text-sm text-[var(--text-soft)]">Free Members</div>
                </div>
                <div className="card p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {users.filter(u => u.is_premium_trial_user && u.trial_status === 'active').length}
                    </div>
                    <div className="text-sm text-[var(--text-soft)]">Active Trials</div>
                </div>
                <div className="card p-4">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {users.filter(u => u.account_status === 'paused').length}
                    </div>
                    <div className="text-sm text-[var(--text-soft)]">Paused Accounts</div>
                </div>
            </div>

            {/* Users List */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-[var(--border-color)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-soft)] uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-soft)] uppercase tracking-wider">Stage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-soft)] uppercase tracking-wider">Subscription</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-soft)] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-soft)] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {filteredUsers.map((user) => (
                                <React.Fragment key={user.id}>
                                    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${user.account_status === 'paused' ? 'opacity-60' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={user.profile_picture_url || 'https://via.placeholder.com/40'}
                                                    alt={user.full_name}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium text-[var(--text-main)]">
                                                        {user.full_name}
                                                        {user.account_status === 'paused' && (
                                                            <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">(Paused)</span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-[var(--text-soft)]">{user.email}</div>
                                                    {user.business_name && (
                                                        <div className="text-xs text-[var(--text-soft)] italic">{user.business_name}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {user.entrepreneurship_stage || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {user.is_premium_trial_user && user.trial_status === 'active' ? (
                                                    <span className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <Gift className="w-3 h-3 mr-1" />
                                                        Trial Active
                                                    </span>
                                                ) : user.subscription_level === 'business_hq' ? (
                                                    <span className="flex items-center px-2 py-1 text-xs rounded-full bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white">
                                                        <Crown className="w-3 h-3 mr-1" />
                                                        Business HQ
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Admin
                                                </span>
                                            ) : user.account_status === 'paused' ? (
                                                <span className="flex items-center text-xs text-orange-600 dark:text-orange-400">
                                                    <PauseCircle className="w-3 h-3 mr-1" />
                                                    Paused
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                                                    <UserCheck className="w-3 h-3 mr-1" />
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleExpanded(user.id)}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                {expandedUserId === user.id ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                    
                                    {/* Expanded Details */}
                                    {expandedUserId === user.id && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-xs text-[var(--text-soft)] mb-1">Joined</p>
                                                            <p className="text-sm text-[var(--text-main)]">
                                                                {new Date(user.created_date).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-[var(--text-soft)] mb-1">Current Week</p>
                                                            <p className="text-sm text-[var(--text-main)]">Week {user.current_week || 1}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-[var(--text-soft)] mb-1">XP Points</p>
                                                            <p className="text-sm text-[var(--text-main)]">{user.xp_points || 0} XP</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-[var(--text-soft)] mb-1">Level</p>
                                                            <p className="text-sm text-[var(--text-main)]">Level {user.level || 1}</p>
                                                        </div>
                                                    </div>

                                                    {/* Trial Status */}
                                                    {user.is_premium_trial_user && user.trial_status === 'active' && (
                                                        <div className="border-t border-[var(--border-color)] pt-4">
                                                            <h4 className="font-semibold text-[var(--text-main)] mb-2">Trial Status</h4>
                                                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
                                                                <p className="text-sm text-green-800 dark:text-green-200">
                                                                    <strong>Active Premium Trial</strong>
                                                                </p>
                                                                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                                                    Expires: {new Date(user.trial_expires_on).toLocaleDateString()}
                                                                </p>
                                                                <p className="text-xs text-green-700 dark:text-green-300">
                                                                    Days remaining: {Math.ceil((new Date(user.trial_expires_on) - new Date()) / (1000 * 60 * 60 * 24))}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Grant Trial Section */}
                                                    {!user.is_premium_trial_user && user.trial_status !== 'active' && (
                                                        <div className="border-t border-[var(--border-color)] pt-4">
                                                            <h4 className="font-semibold text-[var(--text-main)] mb-3">Grant Premium Trial</h4>
                                                            <button
                                                                onClick={() => handleGrantTrial(user.id, 14)}
                                                                disabled={processingUserId === user.id}
                                                                className="btn bg-green-600 text-white hover:bg-green-700 btn-sm disabled:opacity-50"
                                                            >
                                                                {processingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Gift className="w-4 h-4 mr-1" />
                                                                        Grant 14-Day Premium Trial
                                                                    </>
                                                                )}
                                                            </button>
                                                            <p className="text-xs text-[var(--text-soft)] mt-2">
                                                                This will give the user full premium access for 14 days and send them a welcome email.
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Manual Subscription Management */}
                                                    <div className="border-t border-[var(--border-color)] pt-4">
                                                        <h4 className="font-semibold text-[var(--text-main)] mb-3">Manage Subscription</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                onClick={() => handleManualUpgrade(user.id, 'free')}
                                                                disabled={upgradingUserId === user.id || user.subscription_level === 'free'}
                                                                className="btn btn-secondary btn-sm disabled:opacity-50"
                                                            >
                                                                {upgradingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <>Set to Free</>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleManualUpgrade(user.id, 'business_hq')}
                                                                disabled={upgradingUserId === user.id || user.subscription_level === 'business_hq'}
                                                                className="btn btn-primary btn-sm disabled:opacity-50"
                                                            >
                                                                {upgradingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Crown className="w-4 h-4 mr-1" />
                                                                        Upgrade to Business HQ
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-[var(--text-soft)] mt-2">
                                                            Current: <span className="font-medium">{user.subscription_level === 'business_hq' ? 'Business HQ' : 'Free'}</span>
                                                        </p>
                                                    </div>

                                                    {/* Role Management */}
                                                    <div className="border-t border-[var(--border-color)] pt-4">
                                                        <h4 className="font-semibold text-[var(--text-main)] mb-3">User Role</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                                                disabled={processingUserId === user.id}
                                                                className={`btn btn-sm disabled:opacity-50 ${
                                                                    user.role === 'admin'
                                                                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                                                                        : 'bg-red-600 text-white hover:bg-red-700'
                                                                }`}
                                                            >
                                                                {processingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : user.role === 'admin' ? (
                                                                    <>
                                                                        <UserX className="w-4 h-4 mr-1" />
                                                                        Remove Admin
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Shield className="w-4 h-4 mr-1" />
                                                                        Make Admin
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-[var(--text-soft)] mt-2">
                                                            Current Role: <span className="font-medium">{user.role === 'admin' ? 'Admin' : 'User'}</span>
                                                        </p>
                                                    </div>

                                                    {/* Account Actions */}
                                                    <div className="border-t border-[var(--border-color)] pt-4">
                                                        <h4 className="font-semibold text-[var(--text-main)] mb-3">Account Actions</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                onClick={() => handlePauseAccount(user)}
                                                                disabled={processingUserId === user.id || user.role === 'admin'}
                                                                className={`btn btn-sm disabled:opacity-50 ${
                                                                    user.account_status === 'paused' 
                                                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                                                        : 'bg-orange-600 text-white hover:bg-orange-700'
                                                                }`}
                                                            >
                                                                {processingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : user.account_status === 'paused' ? (
                                                                    <>
                                                                        <PlayCircle className="w-4 h-4 mr-1" />
                                                                        Unpause Account
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <PauseCircle className="w-4 h-4 mr-1" />
                                                                        Pause Account
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteAccount(user)}
                                                                disabled={processingUserId === user.id || user.role === 'admin'}
                                                                className="btn bg-red-600 text-white hover:bg-red-700 btn-sm disabled:opacity-50"
                                                            >
                                                                {processingUserId === user.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                                        Delete Account
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                        {user.role === 'admin' && (
                                                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                                                                ⚠️ Cannot pause or delete admin accounts
                                                            </p>
                                                        )}
                                                        {user.account_status === 'paused' && (
                                                            <p className="text-xs text-[var(--text-soft)] mt-2">
                                                                This account is currently paused. User cannot access the platform.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[var(--text-soft)]">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}