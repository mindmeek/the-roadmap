import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { PiggyBank, Plus, Trash2, Save, Loader2, Calculator, DollarSign, TrendingUp, Target, HelpCircle, Users } from 'lucide-react';
import Tooltip from '../components/common/Tooltip';

export default function MyFinancialGoal() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const [businessExpenses, setBusinessExpenses] = useState('');
  const [emergencyBuffer, setEmergencyBuffer] = useState('20');
  
  const [affiliatePrograms, setAffiliatePrograms] = useState([]);

  const addAffiliateProgram = () => {
    setAffiliatePrograms([...affiliatePrograms, {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      numAffiliates: ''
    }]);
  };

  const removeAffiliateProgram = (id) => {
    setAffiliatePrograms(affiliatePrograms.filter(a => a.id !== id));
  };

  const updateAffiliateProgram = (id, field, value) => {
    setAffiliatePrograms(affiliatePrograms.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const [products, setProducts] = useState([
    { 
      id: crypto.randomUUID(), 
      name: '', 
      price: '', 
      cost: '',
      pricingType: 'per_unit',
      costType: 'per_unit',
      affiliateVisible: false,
      affiliateCommission: ''
    }
  ]);

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
          setAffiliatePrograms(projections.affiliatePrograms || []);
          setProducts((projections.products || [{ 
            id: crypto.randomUUID(), 
            name: '', 
            price: '', 
            cost: '',
            pricingType: 'per_unit',
            costType: 'per_unit',
            affiliateVisible: false,
            affiliateCommission: ''
          }]).map(p => ({
            affiliateVisible: false,
            affiliateCommission: '',
            ...p
          })));
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
      id: crypto.randomUUID(), 
      name: '', 
      price: '', 
      cost: '',
      pricingType: 'per_unit',
      costType: 'per_unit',
      affiliateVisible: false,
      affiliateCommission: ''
    }]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const calculateResults = () => {
    const expensesNum = parseFloat(monthlyExpenses) || 0;
    const salaryNum = parseFloat(desiredSalary) || 0;
    const businessExpensesNum = parseFloat(businessExpenses) || 0;
    const bufferNum = parseFloat(emergencyBuffer) || 0;
    
    const totalMonthlyNeeds = expensesNum + salaryNum + businessExpensesNum;
    const baseTarget = totalMonthlyNeeds * (1 + bufferNum / 100);

    // For each affiliate program, calculate commissions based on affiliate-visible products.
    // We estimate monthly revenue per product as: price * unitsNeeded (rough estimate using baseTarget split evenly).
    // Commission cost per program = numAffiliates * sum(price * unitsNeeded * commissionPct) across visible products.
    // Since unitsNeeded depends on freedomNumber (circular), we solve iteratively via a simple approximation:
    // Total affiliate payout % = weighted avg commission across visible products' revenue share.
    const visibleProducts = products.filter(p => p.affiliateVisible && parseFloat(p.price) > 0 && parseFloat(p.affiliateCommission) > 0);
    const totalNumAffiliates = affiliatePrograms.reduce((sum, a) => sum + (parseFloat(a.numAffiliates) || 0), 0);

    // Sum up the effective commission % applied to total revenue (assuming equal revenue split per visible product)
    const totalCommissionRate = visibleProducts.length > 0 && totalNumAffiliates > 0
      ? visibleProducts.reduce((sum, p) => sum + (parseFloat(p.affiliateCommission) || 0), 0) / 100 * totalNumAffiliates
      : 0;

    // Adjust freedomNumber upward: if affiliates take X% of revenue, you need revenue / (1 - X%)
    const freedomNumber = totalCommissionRate < 1
      ? baseTarget / (1 - totalCommissionRate)
      : baseTarget;

    const productCalculations = products.map(product => {
      const price = parseFloat(product.price) || 0;
      const cost = parseFloat(product.cost) || 0;
      
      if (!product.price || String(product.price).trim() === '' || price <= 0) {
        return {
          ...product,
          profit: 0,
          unitsNeeded: 0,
          monthlyRevenue: 0,
          monthlyProfit: 0,
          profitPerUnit: 0,
          isValid: false
        };
      }

      let profitPerUnit = 0;
      let unitsNeeded = 0;
      
      const costPerUnit = product.costType === 'per_unit' ? cost : 0;
      const fixedMonthlyCost = product.costType === 'monthly_subscription' ? cost : 0;

      profitPerUnit = price - costPerUnit;

      if (profitPerUnit > 0) {
          const targetProfit = freedomNumber + fixedMonthlyCost;
          unitsNeeded = Math.ceil(targetProfit / profitPerUnit);
      } else {
          unitsNeeded = 0; 
      }

      const monthlyRevenue = unitsNeeded * price;
      const monthlyCost = (unitsNeeded * costPerUnit) + fixedMonthlyCost;
      const monthlyProfit = monthlyRevenue - monthlyCost;

      return {
        ...product,
        profit: monthlyProfit,
        unitsNeeded: Math.max(0, unitsNeeded),
        monthlyRevenue: Math.max(0, monthlyRevenue),
        monthlyProfit: Math.max(0, monthlyProfit),
        profitPerUnit: Math.max(0, profitPerUnit),
        isValid: (price > 0 && profitPerUnit > 0)
      };
    });

    const validProducts = productCalculations.filter(p => p.isValid);
    let combinedCalculation = null;
    
    if (validProducts.length > 0) {
      const targetPerProduct = freedomNumber / validProducts.length;
      
      combinedCalculation = validProducts.map(product => {
        const unitsForTarget = product.profitPerUnit > 0 
          ? Math.ceil(targetPerProduct / product.profitPerUnit)
          : 0;
        
        return {
          name: product.name || 'Unnamed Product',
          unitsNeeded: unitsForTarget,
          revenue: unitsForTarget * parseFloat(product.price),
          profit: unitsForTarget * product.profitPerUnit,
          pricingType: product.pricingType
        };
      });
    }

    return {
      freedomNumber,
      totalMonthlyNeeds,
      products: productCalculations,
      combinedCalculation
    };
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
          affiliatePrograms,
          products,
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
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  const results = calculateResults();

  return (
    <div className="px-3 sm:px-4 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto pb-20 md:pb-8">
      
      {/* Enhanced Introduction Section - Mobile Optimized */}
      <div className="card p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
          <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
            <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2 sm:mb-3">My Financial Goal</h1>
            <p className="text-base sm:text-lg text-[var(--text-main)] mb-3 sm:mb-4">
              Calculate Your Path to Financial Freedom
            </p>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 text-[var(--text-soft)]">
          <p className="text-sm sm:text-base leading-relaxed">
            <strong className="text-[var(--text-main)]">Your Freedom Number is the most important metric in your business.</strong> It's the exact monthly revenue you need to quit your day job, maintain your lifestyle, cover business expenses, and build a safety buffer. This isn't just a dream—it's a concrete, achievable target backed by real numbers.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">Crystal Clear Target</h3>
                <p className="text-xs sm:text-sm">Know exactly how much you need to earn monthly to achieve independence</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg flex-shrink-0">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">Product Strategy</h3>
                <p className="text-xs sm:text-sm">See exactly how many units/clients you need to hit your goal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">Actionable Roadmap</h3>
                <p className="text-xs sm:text-sm">Turn big dreams into daily actions with measurable milestones</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-[var(--primary-gold)] p-3 sm:p-4 mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-[var(--text-main)] mb-2">
              <strong>🎯 How It Works:</strong>
            </p>
            <ul className="text-xs sm:text-sm space-y-1 ml-4">
              <li><strong>Personal Needs:</strong> Start with your current living expenses and desired lifestyle</li>
              <li><strong>Business Requirements:</strong> Add operational costs and growth investments</li>
              <li><strong>Safety Buffer:</strong> Include 20% extra for unexpected challenges and opportunities</li>
              <li><strong>Product Planning:</strong> See exactly how many sales you need per product/service</li>
            </ul>
            <p className="text-xs sm:text-sm text-[var(--text-main)] mt-3">
              <strong>💡 Result:</strong> A data-driven action plan that eliminates guesswork and gives you confidence in every business decision. Your Freedom Number becomes your North Star—guiding pricing, marketing, and growth strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Action Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
            <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary-gold)]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)]">Financial Calculator</h2>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-soft)]">Input your numbers to discover your Freedom Number</p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary w-full sm:w-auto text-sm sm:text-base" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" /> : <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
          Save Projections
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Input Section */}
        <div className="space-y-4 sm:space-y-6">
          {/* Personal Expenses Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Personal Monthly Expenses</h3>
              <Tooltip content="Your current monthly living expenses including rent, utilities, groceries, insurance, etc. This is what you need to maintain your current lifestyle.">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </Tooltip>
            </div>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="5000"
              className="form-input text-base sm:text-lg"
            />
          </div>

          {/* Desired Salary Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Desired Monthly Salary</h3>
              <Tooltip content="The monthly salary you want to pay yourself from your business. This should be above your expenses to allow for savings and lifestyle improvements.">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </Tooltip>
            </div>
            <input
              type="number"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
              placeholder="8000"
              className="form-input text-base sm:text-lg"
            />
          </div>

          {/* Business Expenses Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Monthly Business Expenses</h3>
              <Tooltip content="Fixed monthly costs to run your business like software subscriptions, marketing budget, office rent, etc. This doesn't include cost of goods sold.">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </Tooltip>
            </div>
            <input
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(e.target.value)}
              placeholder="2000"
              className="form-input text-base sm:text-lg"
            />
          </div>

          {/* Emergency Buffer Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Emergency Buffer (%)</h3>
              <Tooltip content="Extra percentage added to your total to account for unexpected expenses, slow months, or market fluctuations. 20% is recommended for safety.">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </Tooltip>
            </div>
            <input
              type="number"
              value={emergencyBuffer}
              onChange={(e) => setEmergencyBuffer(e.target.value)}
              placeholder="20"
              className="form-input text-base sm:text-lg"
            />
          </div>

          {/* Affiliate Programs Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Affiliate Programs</h3>
                <Tooltip content="Add any affiliate programs you run. Flat fee commissions are added to your costs, while percentage-based commissions adjust your required revenue upward so you still hit your goal after payouts.">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </Tooltip>
              </div>
              <button onClick={addAffiliateProgram} className="btn btn-secondary btn-sm text-xs sm:text-sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Add Program
              </button>
            </div>

            {affiliatePrograms.length === 0 ? (
              <p className="text-sm text-[var(--text-soft)] text-center py-4">No affiliate programs added. Click "Add Program" if you run one.</p>
            ) : (
              <div className="space-y-4">
                {affiliatePrograms.map((program, index) => (
                  <div key={program.id} className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-[var(--text-main)] text-sm sm:text-base">Program {index + 1}</h4>
                      <button onClick={() => removeAffiliateProgram(program.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Program Name (e.g. Main Affiliate Program)"
                        value={program.name}
                        onChange={(e) => updateAffiliateProgram(program.id, 'name', e.target.value)}
                        className="form-input w-full text-sm sm:text-base"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">Number of Affiliates</label>
                          <input
                            type="number"
                            placeholder="10"
                            value={program.numAffiliates}
                            onChange={(e) => updateAffiliateProgram(program.id, 'numAffiliates', e.target.value)}
                            className="form-input w-full text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">Commission Type</label>
                          <select
                            value={program.paymentType}
                            onChange={(e) => updateAffiliateProgram(program.id, 'paymentType', e.target.value)}
                            className="form-input w-full text-sm sm:text-base"
                          >
                            <option value="percentage">% of Revenue</option>
                            <option value="flat_fee">Flat Fee per Affiliate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">
                            {program.paymentType === 'percentage' ? 'Commission (%)' : 'Fee per Affiliate ($)'}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder={program.paymentType === 'percentage' ? '20' : '50'}
                            value={program.paymentAmount}
                            onChange={(e) => updateAffiliateProgram(program.id, 'paymentAmount', e.target.value)}
                            className="form-input w-full text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4 sm:space-y-6">
          {/* Products Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Your Products/Services</h3>
                <Tooltip content="Add all the products or services you plan to sell. Include the pricing structure (per unit or monthly subscription) and associated costs.">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </Tooltip>
              </div>
              <button onClick={addProduct} className="btn btn-secondary btn-sm text-xs sm:text-sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Add Product
              </button>
            </div>
            
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={product.id} className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-[var(--text-main)] text-sm sm:text-base">Product {index + 1}</h4>
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Product/Service Name"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      className="form-input w-full text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Short description (optional)"
                      value={product.description || ''}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                      className="form-input w-full text-sm sm:text-base"
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">Pricing Structure</label>
                        <select
                          value={product.pricingType}
                          onChange={(e) => updateProduct(product.id, 'pricingType', e.target.value)}
                          className="form-input w-full text-sm sm:text-base"
                        >
                          <option value="per_unit">Per Unit/Service</option>
                          <option value="monthly_subscription">Monthly Subscription</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">
                          {product.pricingType === 'monthly_subscription' ? 'Monthly Price ($)' : 'Price per Unit ($)'}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          className="form-input w-full text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">Cost Structure</label>
                        <select
                          value={product.costType}
                          onChange={(e) => updateProduct(product.id, 'costType', e.target.value)}
                          className="form-input w-full text-sm sm:text-base"
                        >
                          <option value="per_unit">Per Unit Cost</option>
                          <option value="monthly_subscription">Fixed Monthly Cost</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[var(--text-soft)] mb-1">
                          {product.costType === 'monthly_subscription' ? 'Monthly Cost ($)' : 'Cost per Unit ($)'}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={product.cost}
                          onChange={(e) => updateProduct(product.id, 'cost', e.target.value)}
                          className="form-input w-full text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Product Results */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--text-main)] text-sm sm:text-base">Individual Product Analysis:</h4>
            {results.products.map((product, index) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border">
                <h5 className="font-medium text-[var(--text-main)] mb-2 text-sm sm:text-base">
                  {product.name || `Product ${index + 1}`}
                </h5>
                {product.isValid ? (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-[var(--text-soft)]">
                        {product.pricingType === 'monthly_subscription' ? 'Subscribers Needed:' : 'Units to Sell:'}
                      </p>
                      <p className="font-semibold text-[var(--text-main)]">
                        {product.unitsNeeded.toLocaleString()}
                        {product.pricingType === 'monthly_subscription' ? '/month' : '/month'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Profit:</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        ${Math.round(product.monthlyProfit).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Revenue:</p>
                      <p className="font-semibold text-[var(--text-main)]">
                        ${Math.round(product.monthlyRevenue).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-soft)]">Monthly Costs:</p>
                      <p className="font-semibold text-red-600 dark:text-red-400">
                        ${Math.round(product.monthlyRevenue - product.monthlyProfit).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                    Please add a valid price to see calculations
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Financial Goal Section - Full Width */}
      <div className="card p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="bg-green-100 dark:bg-green-800 p-2 sm:p-3 rounded-md">
            <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Your Financial Goal</h3>
            <Tooltip content="This is the total monthly revenue your business needs to generate for you to quit your day job and maintain your desired lifestyle with a safety buffer.">
              <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 inline ml-2" />
            </Tooltip>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
              ${Math.round(results.freedomNumber).toLocaleString()}
            </p>
            <p className="text-[var(--text-soft)] mt-1 text-sm sm:text-base">Monthly Revenue Target</p>
          </div>
        </div>

        {/* Affiliate Breakdown */}
        {affiliatePrograms.length > 0 && (
          <div className="mb-4 sm:mb-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm sm:text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" /> Affiliate Program Impact
            </h4>
            <div className="space-y-2">
              {affiliatePrograms.map((program, index) => {
                const num = parseFloat(program.numAffiliates) || 0;
                const amount = parseFloat(program.paymentAmount) || 0;
                if (!amount) return null;
                const label = program.name || `Program ${index + 1}`;
                if (program.paymentType === 'flat_fee') {
                  return (
                    <div key={program.id} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[var(--text-soft)]">{label} ({num} affiliates × ${amount}/mo)</span>
                      <span className="font-semibold text-red-600">+${(num * amount).toLocaleString()}/mo</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={program.id} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[var(--text-soft)]">{label} ({amount}% of revenue)</span>
                      <span className="font-semibold text-purple-600">Revenue adjusted upward</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* Combined Product Mix */}
        {results.combinedCalculation && results.combinedCalculation.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h4 className="font-semibold text-[var(--text-main)] mb-3 sm:mb-4 text-sm sm:text-base">Combined Product Strategy:</h4>
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border">
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-3">
                To reach your ${Math.round(results.freedomNumber).toLocaleString()} monthly goal with a balanced product mix, you would need to sell:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {results.combinedCalculation.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <h6 className="font-medium text-[var(--text-main)] text-sm sm:text-base">{item.name}</h6>
                    <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                      {item.unitsNeeded.toLocaleString()} {item.pricingType === 'monthly_subscription' ? 'subscribers' : 'units'} / month
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400">
                      (for ${Math.round(item.profit).toLocaleString()} profit)
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                  Total Combined Profit: ${Math.round(results.combinedCalculation.reduce((sum, item) => sum + item.profit, 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}