import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import {
  PiggyBank, Plus, Trash2, Save, Loader2, Calculator, DollarSign,
  TrendingUp, Target, HelpCircle, Users, UserCircle, Lightbulb,
  ChevronDown, ChevronUp, BarChart3, Zap
} from 'lucide-react';
import Tooltip from '../components/common/Tooltip';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

export default function MyFinancialGoal() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [showScenario, setShowScenario] = useState(false);
  const [scenarioSalary, setScenarioSalary] = useState('');
  const [scenarioTeamAdd, setScenarioTeamAdd] = useState('');

  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const [businessExpenses, setBusinessExpenses] = useState('');
  const [emergencyBuffer, setEmergencyBuffer] = useState('20');

  const [teamMembers, setTeamMembers] = useState([]);
  const [affiliatePrograms, setAffiliatePrograms] = useState([]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { id: crypto.randomUUID(), name: '', role: '', monthlySalary: '' }]);
  };
  const removeTeamMember = (id) => setTeamMembers(teamMembers.filter(m => m.id !== id));
  const updateTeamMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));
  };
  const totalTeamSalaryCost = teamMembers.reduce((sum, m) => sum + (parseFloat(m.monthlySalary) || 0), 0);

  const addAffiliateProgram = () => {
    setAffiliatePrograms([...affiliatePrograms, { id: crypto.randomUUID(), name: '', description: '', numAffiliates: '' }]);
  };
  const removeAffiliateProgram = (id) => setAffiliatePrograms(affiliatePrograms.filter(a => a.id !== id));
  const updateAffiliateProgram = (id, field, value) => {
    setAffiliatePrograms(affiliatePrograms.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const [products, setProducts] = useState([{
    id: crypto.randomUUID(), name: '', price: '', cost: '',
    pricingType: 'per_unit', costType: 'per_unit', affiliateVisible: false, affiliateCommission: ''
  }]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
        const projections = userData.financial_projections;
        if (projections) {
          setMonthlyExpenses(String(projections.monthlyExpenses || ''));
          setDesiredSalary(String(projections.desiredSalary || ''));
          setBusinessExpenses(String(projections.businessExpenses || ''));
          setEmergencyBuffer(String(projections.emergencyBuffer || '20'));
          setTeamMembers(projections.teamMembers || []);
          setAffiliatePrograms(projections.affiliatePrograms || []);
          setProducts((projections.products || [{
            id: crypto.randomUUID(), name: '', price: '', cost: '',
            pricingType: 'per_unit', costType: 'per_unit', affiliateVisible: false, affiliateCommission: ''
          }]).map(p => ({ affiliateVisible: false, affiliateCommission: '', ...p })));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addProduct = () => {
    setProducts([...products, {
      id: crypto.randomUUID(), name: '', price: '', cost: '',
      pricingType: 'per_unit', costType: 'per_unit', affiliateVisible: false, affiliateCommission: ''
    }]);
  };
  const removeProduct = (id) => { if (products.length > 1) setProducts(products.filter(p => p.id !== id)); };
  const updateProduct = (id, field, value) => setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));

  const calculateResults = (overrideVars = {}) => {
    const expensesNum = parseFloat(monthlyExpenses) || 0;
    const salaryNum = parseFloat(overrideVars.desiredSalary ?? desiredSalary) || 0;
    const businessExpensesNum = parseFloat(businessExpenses) || 0;
    const bufferNum = parseFloat(emergencyBuffer) || 0;
    const extraTeam = parseFloat(overrideVars.extraTeamCost ?? 0) || 0;
    const effectiveTeamCost = totalTeamSalaryCost + extraTeam;

    const totalMonthlyNeeds = expensesNum + salaryNum + businessExpensesNum + effectiveTeamCost;
    const baseTarget = totalMonthlyNeeds * (1 + bufferNum / 100);

    const visibleProducts = products.filter(p => p.affiliateVisible && parseFloat(p.price) > 0 && parseFloat(p.affiliateCommission) > 0);
    const totalNumAffiliates = affiliatePrograms.reduce((sum, a) => sum + (parseFloat(a.numAffiliates) || 0), 0);
    const totalCommissionRate = visibleProducts.length > 0 && totalNumAffiliates > 0
      ? visibleProducts.reduce((sum, p) => sum + (parseFloat(p.affiliateCommission) || 0), 0) / 100 * totalNumAffiliates
      : 0;

    const freedomNumber = totalCommissionRate < 1 ? baseTarget / (1 - totalCommissionRate) : baseTarget;

    const productCalculations = products.map(product => {
      const price = parseFloat(product.price) || 0;
      const cost = parseFloat(product.cost) || 0;
      if (!product.price || String(product.price).trim() === '' || price <= 0) {
        return { ...product, profit: 0, unitsNeeded: 0, monthlyRevenue: 0, monthlyProfit: 0, profitPerUnit: 0, profitMarginPct: 0, isValid: false };
      }
      const costPerUnit = product.costType === 'per_unit' ? cost : 0;
      const fixedMonthlyCost = product.costType === 'monthly_subscription' ? cost : 0;
      const profitPerUnit = price - costPerUnit;
      const unitsNeeded = profitPerUnit > 0 ? Math.ceil((freedomNumber + fixedMonthlyCost) / profitPerUnit) : 0;
      const monthlyRevenue = unitsNeeded * price;
      const monthlyCost = (unitsNeeded * costPerUnit) + fixedMonthlyCost;
      const monthlyProfit = monthlyRevenue - monthlyCost;
      // Use actual monthly profit vs monthly revenue for accurate margin (handles fixed monthly costs correctly)
      const profitMarginPct = monthlyRevenue > 0 ? Math.round((monthlyProfit / monthlyRevenue) * 100) : 0;

      return {
        ...product,
        profit: monthlyProfit,
        unitsNeeded: Math.max(0, unitsNeeded),
        monthlyRevenue: Math.max(0, monthlyRevenue),
        monthlyProfit: Math.max(0, monthlyProfit),
        profitPerUnit: Math.max(0, profitPerUnit),
        profitMarginPct,
        isValid: (price > 0 && profitPerUnit > 0)
      };
    });

    const validProducts = productCalculations.filter(p => p.isValid);
    let combinedCalculation = null;
    if (validProducts.length > 0) {
      const targetPerProduct = freedomNumber / validProducts.length;
      combinedCalculation = validProducts.map(product => {
        const unitsForTarget = product.profitPerUnit > 0 ? Math.ceil(targetPerProduct / product.profitPerUnit) : 0;
        return {
          name: product.name || 'Unnamed Product',
          unitsNeeded: unitsForTarget,
          revenue: unitsForTarget * parseFloat(product.price),
          profit: unitsForTarget * product.profitPerUnit,
          pricingType: product.pricingType
        };
      });
    }

    return { freedomNumber, totalMonthlyNeeds, baseTarget, effectiveTeamCost, salaryNum, expensesNum, businessExpensesNum, bufferNum, products: productCalculations, combinedCalculation };
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const results = calculateResults();
      await User.updateMyUserData({
        financial_projections: {
          monthlyExpenses: parseFloat(monthlyExpenses) || 0,
          desiredSalary: parseFloat(desiredSalary) || 0,
          businessExpenses: parseFloat(businessExpenses) || 0,
          emergencyBuffer: parseFloat(emergencyBuffer) || 20,
          teamMembers, affiliatePrograms, products,
          freedomNumber: results.freedomNumber,
          calculatedAt: new Date().toISOString()
        }
      });
      alert('Financial projections saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save projections.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
  }

  const results = calculateResults();

  // Pie chart data for cost breakdown
  const pieData = [
    { name: 'Personal Expenses', value: parseFloat(monthlyExpenses) || 0, color: '#3B82F6' },
    { name: 'Desired Salary', value: parseFloat(desiredSalary) || 0, color: '#10B981' },
    { name: 'Business Expenses', value: parseFloat(businessExpenses) || 0, color: '#F59E0B' },
    { name: 'Team Salaries', value: totalTeamSalaryCost, color: '#8B5CF6' },
  ].filter(d => d.value > 0);

  // Affiliate estimated payout
  const estimatedAffiliatePayout = results.freedomNumber - results.baseTarget;

  // Contextual tips
  const tips = [];
  if (parseFloat(monthlyExpenses) > parseFloat(desiredSalary) && parseFloat(desiredSalary) > 0) {
    tips.push("Your personal expenses exceed your desired salary — consider reducing expenses or increasing your salary target.");
  }
  if (totalTeamSalaryCost > 0 && totalTeamSalaryCost > results.businessExpensesNum) {
    tips.push("Your team salaries are your largest business cost. Ensure your pricing supports this overhead.");
  }
  if (estimatedAffiliatePayout > 0) {
    tips.push(`Affiliates add ~$${Math.round(estimatedAffiliatePayout).toLocaleString()} to your monthly revenue target. Ensure your pricing margins support this.`);
  }
  const validProductCount = results.products.filter(p => p.isValid).length;
  if (validProductCount === 1) {
    tips.push("You have only one product. Adding a second revenue stream reduces risk and can accelerate hitting your Freedom Number.");
  }
  if (validProductCount > 0) {
    const lowMarginProducts = results.products.filter(p => p.isValid && p.profitMarginPct < 30);
    if (lowMarginProducts.length > 0) {
      tips.push(`${lowMarginProducts.map(p => p.name || 'A product').join(', ')} ${lowMarginProducts.length > 1 ? 'have' : 'has'} a profit margin below 30% — consider raising the price or reducing COGS.`);
    }
  }

  // Scenario results
  const scenarioResults = calculateResults({
    desiredSalary: scenarioSalary || desiredSalary,
    extraTeamCost: parseFloat(scenarioTeamAdd) || 0
  });

  return (
    <div className="px-3 sm:px-4 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto pb-20 md:pb-8">

      {/* Header */}
      <div className="card p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
          <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
            <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">My Financial Goal</h1>
            <p className="text-base sm:text-lg text-[var(--text-main)]">Calculate Your Path to Financial Freedom</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0"><Target className="w-4 h-4 text-green-600" /></div>
            <div>
              <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Crystal Clear Target</h3>
              <p className="text-xs text-[var(--text-soft)]">Know exactly how much you need monthly</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg flex-shrink-0"><Calculator className="w-4 h-4 text-blue-600" /></div>
            <div>
              <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Product Strategy</h3>
              <p className="text-xs text-[var(--text-soft)]">See exact units needed per product</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg flex-shrink-0"><TrendingUp className="w-4 h-4 text-purple-600" /></div>
            <div>
              <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Actionable Roadmap</h3>
              <p className="text-xs text-[var(--text-soft)]">Turn goals into daily revenue actions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Row */}
      <div className="flex justify-between items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
            <Calculator className="w-6 h-6 text-[var(--primary-gold)]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">Financial Calculator</h2>
            <p className="text-sm text-[var(--text-soft)]">Input your numbers to discover your Freedom Number</p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary w-full sm:w-auto" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Projections
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Left: Inputs */}
        <div className="space-y-4 sm:space-y-6">

          {/* Personal Expenses */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-[var(--primary-gold)]" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Personal Monthly Expenses</h3>
              <Tooltip content="Your current monthly living expenses including rent, utilities, groceries, insurance, etc.">
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} placeholder="5000" className="form-input text-lg" />
          </div>

          {/* Desired Salary */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-[var(--primary-gold)]" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Desired Monthly Salary</h3>
              <Tooltip content="The monthly salary you want to pay yourself from your business.">
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input type="number" value={desiredSalary} onChange={(e) => setDesiredSalary(e.target.value)} placeholder="8000" className="form-input text-lg" />
          </div>

          {/* Business Expenses */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calculator className="w-5 h-5 text-[var(--primary-gold)]" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Monthly Business Expenses</h3>
              <Tooltip content="Fixed monthly costs like software subscriptions, marketing budget, office rent, etc.">
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} placeholder="2000" className="form-input text-lg" />
          </div>

          {/* Emergency Buffer */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-[var(--primary-gold)]" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Emergency Buffer (%)</h3>
              <Tooltip content="Extra percentage added to your total for unexpected expenses. 20% recommended.">
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input type="number" value={emergencyBuffer} onChange={(e) => setEmergencyBuffer(e.target.value)} placeholder="20" className="form-input text-lg" />
          </div>

          {/* Team Members */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-[var(--primary-gold)]" />
                <h3 className="text-lg font-bold text-[var(--text-main)]">Team Members & Salaries</h3>
                <Tooltip content="Monthly salaries for your team are automatically factored into your Freedom Number.">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <button onClick={addTeamMember} className="btn btn-secondary btn-sm text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add Member
              </button>
            </div>
            {teamMembers.length === 0 ? (
              <p className="text-sm text-[var(--text-soft)] text-center py-4">No team members added yet.</p>
            ) : (
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={member.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-[var(--text-main)] text-sm">Member {index + 1}</h4>
                      <button onClick={() => removeTeamMember(member.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input type="text" placeholder="Full Name" value={member.name} onChange={e => updateTeamMember(member.id, 'name', e.target.value)} className="form-input w-full text-sm" />
                      <input type="text" placeholder="Role / Title" value={member.role} onChange={e => updateTeamMember(member.id, 'role', e.target.value)} className="form-input w-full text-sm" />
                      <input type="number" placeholder="Monthly Salary ($)" value={member.monthlySalary} onChange={e => updateTeamMember(member.id, 'monthlySalary', e.target.value)} className="form-input w-full text-sm" />
                    </div>
                  </div>
                ))}
                <div className="text-right text-sm font-semibold text-[var(--text-main)] mt-1">
                  Total Team Cost: <span className="text-red-600 dark:text-red-400">${totalTeamSalaryCost.toLocaleString()}/mo</span>
                </div>
              </div>
            )}
          </div>

          {/* Affiliate Programs */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[var(--primary-gold)]" />
                <h3 className="text-lg font-bold text-[var(--text-main)]">Affiliate Programs</h3>
                <Tooltip content="Your Freedom Number automatically adjusts upward to cover affiliate payouts.">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <button onClick={addAffiliateProgram} className="btn btn-secondary btn-sm text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add Program
              </button>
            </div>
            {affiliatePrograms.length === 0 ? (
              <p className="text-sm text-[var(--text-soft)] text-center py-4">No affiliate programs added yet.</p>
            ) : (
              <div className="space-y-4">
                {affiliatePrograms.map((program, index) => (
                  <div key={program.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-[var(--text-main)] text-sm">Program {index + 1}</h4>
                      <button onClick={() => removeAffiliateProgram(program.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-2">
                      <input type="text" placeholder="Program Name" value={program.name} onChange={(e) => updateAffiliateProgram(program.id, 'name', e.target.value)} className="form-input w-full text-sm" />
                      <textarea placeholder="Short description" value={program.description || ''} onChange={(e) => updateAffiliateProgram(program.id, 'description', e.target.value)} className="form-input w-full text-sm resize-none" rows={2} />
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">Number of Affiliates</label>
                        <input type="number" placeholder="10" value={program.numAffiliates} onChange={(e) => updateAffiliateProgram(program.id, 'numAffiliates', e.target.value)} className="form-input w-full text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
                {/* Employee Cost Note in Affiliate Section */}
                {totalTeamSalaryCost > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3">
                    <p className="text-xs font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-1">
                      <UserCircle className="w-3.5 h-3.5" /> Employee Costs Impacting Affiliate Revenue
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                      Your team salaries (${totalTeamSalaryCost.toLocaleString()}/mo) are factored into your Freedom Number, meaning your affiliate-driven revenue also needs to cover this cost.
                    </p>
                    <div className="space-y-1">
                      {teamMembers.filter(m => parseFloat(m.monthlySalary) > 0).map((m, i) => (
                        <div key={m.id} className="flex justify-between text-xs text-orange-700 dark:text-orange-300">
                          <span>{m.name || `Employee ${i + 1}`}{m.role ? ` (${m.role})` : ''}</span>
                          <span className="font-semibold">${(parseFloat(m.monthlySalary) || 0).toLocaleString()}/mo</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs font-bold text-orange-800 dark:text-orange-200 pt-1 border-t border-orange-200 dark:border-orange-700 mt-1">
                        <span>Total Payroll</span>
                        <span>${totalTeamSalaryCost.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Products */}
        <div className="space-y-4 sm:space-y-6">
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-[var(--text-main)]">Your Products/Services</h3>
                <Tooltip content="Add all products or services you plan to sell, including pricing and costs.">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <button onClick={addProduct} className="btn btn-secondary btn-sm text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add Product
              </button>
            </div>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={product.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-[var(--text-main)] text-sm">Product {index + 1}</h4>
                    {products.length > 1 && (
                      <button onClick={() => removeProduct(product.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <input type="text" placeholder="Product/Service Name" value={product.name} onChange={(e) => updateProduct(product.id, 'name', e.target.value)} className="form-input w-full text-sm" />
                    <input type="text" placeholder="Short description (optional)" value={product.description || ''} onChange={(e) => updateProduct(product.id, 'description', e.target.value)} className="form-input w-full text-sm" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">Pricing Structure</label>
                        <select value={product.pricingType} onChange={(e) => updateProduct(product.id, 'pricingType', e.target.value)} className="form-input w-full text-sm">
                          <option value="per_unit">Per Unit/Service</option>
                          <option value="monthly_subscription">Monthly Subscription</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">{product.pricingType === 'monthly_subscription' ? 'Monthly Price ($)' : 'Price per Unit ($)'}</label>
                        <input type="number" step="0.01" placeholder="0.00" value={product.price} onChange={(e) => updateProduct(product.id, 'price', e.target.value)} className="form-input w-full text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">Cost Structure</label>
                        <select value={product.costType} onChange={(e) => updateProduct(product.id, 'costType', e.target.value)} className="form-input w-full text-sm">
                          <option value="per_unit">Per Unit Cost</option>
                          <option value="monthly_subscription">Fixed Monthly Cost</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">{product.costType === 'monthly_subscription' ? 'Monthly Cost ($)' : 'Cost per Unit ($)'}</label>
                        <input type="number" step="0.01" placeholder="0.00" value={product.cost} onChange={(e) => updateProduct(product.id, 'cost', e.target.value)} className="form-input w-full text-sm" />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <label className="flex items-center gap-2 cursor-pointer mb-2">
                        <input type="checkbox" checked={product.affiliateVisible || false} onChange={(e) => updateProduct(product.id, 'affiliateVisible', e.target.checked)} className="w-4 h-4 accent-[var(--primary-gold)]" />
                        <span className="text-xs font-medium text-[var(--text-main)]">Affiliates can promote this product</span>
                      </label>
                      {product.affiliateVisible && (
                        <div>
                          <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">Affiliate Commission (%)</label>
                          <input type="number" step="0.1" min="0" max="100" placeholder="e.g. 20" value={product.affiliateCommission || ''} onChange={(e) => updateProduct(product.id, 'affiliateCommission', e.target.value)} className="form-input w-full text-sm" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Product Analysis with Margin % */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--text-main)] text-sm">Individual Product Analysis:</h4>
            {results.products.map((product, index) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-[var(--text-main)] text-sm">{product.name || `Product ${index + 1}`}</h5>
                  {product.isValid && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.profitMarginPct >= 50 ? 'bg-green-100 text-green-700' : product.profitMarginPct >= 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {product.profitMarginPct}% margin
                    </span>
                  )}
                </div>
                {product.isValid ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[var(--text-soft)]">{product.pricingType === 'monthly_subscription' ? 'Subscribers Needed:' : 'Units to Sell:'}</p>
                      <p className="font-semibold text-[var(--text-main)]">{product.unitsNeeded.toLocaleString()}/mo</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Profit:</p>
                      <p className="font-semibold text-green-600">${Math.round(product.monthlyProfit).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Revenue:</p>
                      <p className="font-semibold text-[var(--text-main)]">${Math.round(product.monthlyRevenue).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Costs:</p>
                      <p className="font-semibold text-red-600">${Math.round(product.monthlyRevenue - product.monthlyProfit).toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 text-xs">Please add a valid price to see calculations.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== YOUR FINANCIAL GOAL - Full Width ===== */}
      <div className="card p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 dark:bg-green-800 p-2 sm:p-3 rounded-md">
            <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Your Financial Goal</h3>
            <p className="text-xs text-[var(--text-soft)]">Complete monthly revenue target breakdown</p>
          </div>
        </div>

        {/* Freedom Number Hero */}
        <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-300 dark:border-green-700 mb-6 shadow-sm">
          <p className="text-xs sm:text-sm text-[var(--text-soft)] uppercase tracking-wider mb-1">Your Monthly Freedom Number</p>
          <p className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
            ${Math.round(results.freedomNumber).toLocaleString()}
          </p>
          <p className="text-[var(--text-soft)] mt-1 text-sm">Monthly Revenue Target</p>
        </div>

        {/* Cost Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Left: Itemized Breakdown */}
          <div>
            <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--primary-gold)]" /> Cost Breakdown
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Personal Expenses', value: parseFloat(monthlyExpenses) || 0, color: 'bg-blue-500', textColor: 'text-blue-700 dark:text-blue-300' },
                { label: 'Desired Salary', value: parseFloat(desiredSalary) || 0, color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300' },
                { label: 'Business Expenses', value: parseFloat(businessExpenses) || 0, color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-300' },
                { label: 'Team Salaries', value: totalTeamSalaryCost, color: 'bg-purple-500', textColor: 'text-purple-700 dark:text-purple-300' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-[var(--text-main)]">{item.label}</span>
                  </div>
                  <span className={`text-sm font-semibold ${item.textColor}`}>${item.value.toLocaleString()}/mo</span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border">
                <span className="text-sm font-semibold text-[var(--text-main)]">Subtotal (before buffer)</span>
                <span className="text-sm font-bold text-[var(--text-main)]">${Math.round(results.totalMonthlyNeeds).toLocaleString()}/mo</span>
              </div>
              <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                <span className="text-sm text-orange-700 dark:text-orange-300">Emergency Buffer ({emergencyBuffer}%)</span>
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">+${Math.round(results.baseTarget - results.totalMonthlyNeeds).toLocaleString()}/mo</span>
              </div>
              {estimatedAffiliatePayout > 0 && (
                <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                  <span className="text-sm text-purple-700 dark:text-purple-300">Affiliate Payout Coverage</span>
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">+${Math.round(estimatedAffiliatePayout).toLocaleString()}/mo</span>
                </div>
              )}
              <div className="flex items-center justify-between bg-green-600 rounded-lg p-3">
                <span className="text-sm font-bold text-white">🎯 Freedom Number</span>
                <span className="text-sm font-bold text-white">${Math.round(results.freedomNumber).toLocaleString()}/mo</span>
              </div>
            </div>
          </div>

          {/* Right: Pie Chart + Team Members */}
          <div className="space-y-4">
            {/* Pie Chart */}
            {pieData.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--text-main)] mb-2 text-sm">Revenue Composition</h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl border p-3">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Team Members in Financial Goal Card */}
            {teamMembers.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-purple-600" /> Your Team
                </h4>
                <div className="space-y-2">
                  {teamMembers.map((member, i) => (
                    <div key={member.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2.5 border border-purple-100 dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-200 dark:bg-purple-700 flex items-center justify-center text-xs font-bold text-purple-800 dark:text-purple-200">
                          {(member.name || `M${i + 1}`).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-main)]">{member.name || `Team Member ${i + 1}`}</p>
                          {member.role && <p className="text-xs text-[var(--text-soft)]">{member.role}</p>}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                        ${(parseFloat(member.monthlySalary) || 0).toLocaleString()}/mo
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-bold text-purple-800 dark:text-purple-200 pt-1 border-t border-purple-200 mt-1 px-1">
                    <span>Total Payroll</span>
                    <span>${totalTeamSalaryCost.toLocaleString()}/mo</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affiliate Breakdown */}
        {affiliatePrograms.length > 0 && (
          <div className="mb-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
            <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" /> Affiliate Program Impact
            </h4>
            <div className="space-y-3">
              {affiliatePrograms.map((program, index) => {
                const num = parseFloat(program.numAffiliates) || 0;
                const label = program.name || `Program ${index + 1}`;
                const affiliableProducts = products.filter(p => p.affiliateVisible && parseFloat(p.affiliateCommission) > 0);
                return (
                  <div key={program.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                    <div className="flex justify-between text-sm font-semibold text-[var(--text-main)] mb-1">
                      <span>{label}</span>
                      <span className="text-purple-600">{num} affiliates</span>
                    </div>
                    {program.description && <p className="text-xs text-[var(--text-soft)] mb-2">{program.description}</p>}
                    {affiliableProducts.length > 0 ? (
                      <div className="space-y-1 pl-2 border-l-2 border-purple-200">
                        {affiliableProducts.map(p => (
                          <div key={p.id} className="flex justify-between text-xs text-[var(--text-soft)]">
                            <span>{p.name || 'Unnamed Product'}</span>
                            <span>{p.affiliateCommission}% commission per sale</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[var(--text-soft)] pl-2">No affiliate-visible products assigned yet.</p>
                    )}
                    {/* Employee cost note */}
                    {totalTeamSalaryCost > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                          ⚠️ Includes ${totalTeamSalaryCost.toLocaleString()}/mo in employee costs that affiliate revenue must help cover.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
              {estimatedAffiliatePayout > 0 && (
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Estimated Affiliate Payout</span>
                    <span className="font-bold text-purple-800 dark:text-purple-200">~${Math.round(estimatedAffiliatePayout).toLocaleString()}/mo</span>
                  </div>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">This is the additional revenue needed on top of your base target to cover affiliate commissions.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Combined Product Strategy */}
        {results.combinedCalculation && results.combinedCalculation.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm">Combined Product Strategy:</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
              <p className="text-xs text-[var(--text-soft)] mb-3">
                To reach your ${Math.round(results.freedomNumber).toLocaleString()} monthly goal with a balanced product mix:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.combinedCalculation.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h6 className="font-medium text-[var(--text-main)] text-sm">{item.name}</h6>
                    <p className="text-xs text-[var(--text-soft)]">{item.unitsNeeded.toLocaleString()} {item.pricingType === 'monthly_subscription' ? 'subscribers' : 'units'} / month</p>
                    <p className="text-xs font-semibold text-green-600">(${Math.round(item.profit).toLocaleString()} profit)</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  Total Combined Profit: ${Math.round(results.combinedCalculation.reduce((sum, item) => sum + item.profit, 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== SCENARIO PLANNING ===== */}
      <div className="card p-4 sm:p-6 mb-6 border-2 border-[var(--primary-gold)]/30">
        <button
          onClick={() => setShowScenario(!showScenario)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[var(--primary-gold)]/10 p-2 rounded-lg"><Zap className="w-5 h-5 text-[var(--primary-gold)]" /></div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Scenario Planning</h3>
              <p className="text-xs text-[var(--text-soft)]">What if you raised your salary or hired someone new?</p>
            </div>
          </div>
          {showScenario ? <ChevronUp className="w-5 h-5 text-[var(--text-soft)]" /> : <ChevronDown className="w-5 h-5 text-[var(--text-soft)]" />}
        </button>

        {showScenario && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">What if my desired salary was... ($)</label>
                <input
                  type="number"
                  value={scenarioSalary}
                  onChange={e => setScenarioSalary(e.target.value)}
                  placeholder={desiredSalary || '8000'}
                  className="form-input w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">What if I added a new employee costing... ($/mo)</label>
                <input
                  type="number"
                  value={scenarioTeamAdd}
                  onChange={e => setScenarioTeamAdd(e.target.value)}
                  placeholder="3000"
                  className="form-input w-full text-sm"
                />
              </div>
            </div>
            {(scenarioSalary || scenarioTeamAdd) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Current Freedom Number</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">${Math.round(results.freedomNumber).toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Scenario Freedom Number</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">${Math.round(scenarioResults.freedomNumber).toLocaleString()}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 dark:text-red-400 mb-1">Additional Revenue Needed</p>
                  <p className="text-xl font-bold text-red-700 dark:text-red-300">
                    +${Math.round(Math.max(0, scenarioResults.freedomNumber - results.freedomNumber)).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== CONTEXTUAL PRO TIPS ===== */}
      {tips.length > 0 && (
        <div className="card p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)]/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--primary-gold)]/10 p-2 rounded-lg"><Lightbulb className="w-5 h-5 text-[var(--primary-gold)]" /></div>
            <h3 className="text-base font-bold text-[var(--text-main)]">💡 Smart Insights for Your Numbers</h3>
          </div>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 border">
                <span className="text-[var(--primary-gold)] font-bold text-sm flex-shrink-0">→</span>
                <p className="text-sm text-[var(--text-main)]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}