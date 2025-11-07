import React, { useState, useEffect, useMemo } from 'react';
import { User } from '@/entities/User';
import { Loader2, Save, TrendingUp, DollarSign, Target, ShoppingCart, Plus, Trash2, Calendar } from 'lucide-react';

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const InfoCard = ({ icon, title, value, color }) => (
    <div className="card p-6 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-[var(--text-soft)]">{title}</p>
            <p className="text-2xl font-bold text-[var(--text-main)]">{value}</p>
        </div>
    </div>
);

const ProductCard = ({ product, index, updateProduct, removeProduct }) => (
    <div className="card p-6 space-y-4">
        <div className="flex justify-between items-center">
            <input
                type="text"
                placeholder="Product/Service Name"
                value={product.name}
                onChange={(e) => updateProduct(index, 'name', e.target.value)}
                className="form-input text-lg font-bold border-0 bg-transparent p-0 focus:ring-0 flex-1 mr-4"
            />
            <button onClick={() => removeProduct(index)} className="btn btn-ghost text-red-500 p-2">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Pricing Type</label>
                <select
                    value={product.pricing_type}
                    onChange={(e) => updateProduct(index, 'pricing_type', e.target.value)}
                    className="form-input"
                >
                    <option value="one_time">One-time Sale</option>
                    <option value="subscription">Monthly Subscription</option>
                    <option value="service">Service/Hourly</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-1">Price per Unit</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                    className="form-input"
                    placeholder="47"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Cost per Unit</label>
                <input
                    type="number"
                    value={product.cost}
                    onChange={(e) => updateProduct(index, 'cost', parseFloat(e.target.value) || 0)}
                    className="form-input"
                    placeholder="10"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {product.pricing_type === 'subscription' ? 'Target Subscribers' : 'Monthly Sales Target'}
                </label>
                <input
                    type="number"
                    value={product.pricing_type === 'subscription' ? product.target_customers : product.monthly_sales_target}
                    onChange={(e) => {
                        const field = product.pricing_type === 'subscription' ? 'target_customers' : 'monthly_sales_target';
                        updateProduct(index, field, parseInt(e.target.value) || 0);
                    }}
                    className="form-input"
                    placeholder={product.pricing_type === 'subscription' ? '100' : '50'}
                />
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-[var(--text-soft)]">Monthly Revenue:</span>
                    <p className="font-bold text-[var(--primary-gold)]">
                        {formatCurrency((() => {
                            if (product.pricing_type === 'subscription') {
                                return product.price * (product.target_customers || 0);
                            }
                            return product.price * (product.monthly_sales_target || 0);
                        })())}
                    </p>
                </div>
                <div>
                    <span className="text-[var(--text-soft)]">Monthly Profit:</span>
                    <p className="font-bold text-green-600">
                        {formatCurrency((() => {
                            const profit = product.price - product.cost;
                            if (product.pricing_type === 'subscription') {
                                return profit * (product.target_customers || 0);
                            }
                            return profit * (product.monthly_sales_target || 0);
                        })())}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default function FinancialProjectionsPage() {
    const [inputs, setInputs] = useState({
        monthlyPersonalExpenses: 2500,
        monthlyBusinessExpenses: 500,
        taxRate: 25,
        // Legacy single product fields
        productPrice: 47,
        productCost: 10,
        // New multiple products
        products: []
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [useMultipleProducts, setUseMultipleProducts] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = await User.me();
                if (user.financial_projections) {
                    setInputs(user.financial_projections);
                    setUseMultipleProducts(user.financial_projections.products && user.financial_projections.products.length > 0);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: crypto.randomUUID(),
            name: '',
            pricing_type: 'one_time',
            price: 0,
            cost: 0,
            monthly_sales_target: 0,
            target_customers: 0
        };
        setInputs(prev => ({
            ...prev,
            products: [...(prev.products || []), newProduct]
        }));
    };

    const handleUpdateProduct = (index, field, value) => {
        setInputs(prev => ({
            ...prev,
            products: prev.products.map((product, i) => 
                i === index ? { ...product, [field]: value } : product
            )
        }));
    };

    const handleRemoveProduct = (index) => {
        setInputs(prev => ({
            ...prev,
            products: prev.products.filter((_, i) => i !== index)
        }));
    };

    const toggleMultipleProducts = () => {
        setUseMultipleProducts(!useMultipleProducts);
        if (!useMultipleProducts && (!inputs.products || inputs.products.length === 0)) {
            handleAddProduct(); // Add first product when switching to multiple mode
        }
    };

    const calculations = useMemo(() => {
        const totalExpenses = inputs.monthlyPersonalExpenses + inputs.monthlyBusinessExpenses;
        const grossIncomeNeeded = totalExpenses / (1 - (inputs.taxRate / 100));

        if (useMultipleProducts && inputs.products && inputs.products.length > 0) {
            // Multiple products calculation
            const totalMonthlyRevenue = inputs.products.reduce((total, product) => {
                const monthlyRevenue = product.pricing_type === 'subscription' 
                    ? product.price * product.target_customers
                    : product.price * product.monthly_sales_target;
                return total + monthlyRevenue;
            }, 0);

            const totalMonthlyProfit = inputs.products.reduce((total, product) => {
                const profit = product.price - product.cost;
                const monthlyProfit = product.pricing_type === 'subscription' 
                    ? profit * product.target_customers
                    : profit * product.monthly_sales_target;
                return total + monthlyProfit;
            }, 0);

            return {
                totalExpenses,
                grossIncomeNeeded,
                totalMonthlyRevenue,
                totalMonthlyProfit,
                isMultiProduct: true,
                gapToFreedom: Math.max(0, grossIncomeNeeded - totalMonthlyProfit)
            };
        } else {
            // Single product calculation (legacy)
            const profitPerUnit = inputs.productPrice - inputs.productCost;
            const unitsToSell = profitPerUnit > 0 ? Math.ceil(grossIncomeNeeded / profitPerUnit) : 0;
            const revenueTarget = unitsToSell * inputs.productPrice;
            return {
                totalExpenses,
                grossIncomeNeeded,
                profitPerUnit,
                unitsToSell,
                revenueTarget,
                isMultiProduct: false
            };
        }
    }, [inputs, useMultipleProducts]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData({ financial_projections: inputs });
            alert("Projections saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save projections.");
        } finally {
            setIsSaving(false);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-4 rounded-md"><TrendingUp className="w-8 h-8 text-[var(--primary-gold)]" /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Freedom Calculator</h1>
                        <p className="text-lg text-[var(--text-soft)]">Project your path to full-time entrepreneurship.</p>
                    </div>
                </div>
                <button onClick={handleSave} className="btn btn-primary w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                    Save Projections
                </button>
            </div>

            {/* Product Mode Toggle */}
            <div className="card p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Business Model</h3>
                        <p className="text-[var(--text-soft)]">Choose how you want to calculate your projections</p>
                    </div>
                    <button
                        onClick={toggleMultipleProducts}
                        className={`btn ${useMultipleProducts ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {useMultipleProducts ? 'Multiple Products' : 'Single Product'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Expenses Input */}
                <div className="lg:col-span-1 card p-6 space-y-4">
                    <h2 className="text-xl font-bold">Your Expenses</h2>
                    <div>
                        <label className="block text-sm font-medium mb-1">Monthly Personal Expenses</label>
                        <input type="number" name="monthlyPersonalExpenses" value={inputs.monthlyPersonalExpenses} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Monthly Business Expenses</label>
                        <input type="number" name="monthlyBusinessExpenses" value={inputs.monthlyBusinessExpenses} onChange={handleInputChange} className="form-input" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Estimated Tax Rate (%)</label>
                        <input type="number" name="taxRate" value={inputs.taxRate} onChange={handleInputChange} className="form-input" />
                    </div>
                    
                    {/* Legacy Single Product Inputs */}
                    {!useMultipleProducts && (
                        <>
                            <hr className="my-4" />
                            <h3 className="text-lg font-bold">Your Product/Service</h3>
                             <div>
                                <label className="block text-sm font-medium mb-1">Sale Price per Unit</label>
                                <input type="number" name="productPrice" value={inputs.productPrice} onChange={handleInputChange} className="form-input" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Cost per Unit</label>
                                <input type="number" name="productCost" value={inputs.productCost} onChange={handleInputChange} className="form-input" />
                            </div>
                        </>
                    )}
                </div>

                {/* Products Section (Multiple Mode) */}
                {useMultipleProducts && (
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Your Products & Services</h2>
                            <button onClick={handleAddProduct} className="btn btn-primary">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {inputs.products && inputs.products.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    updateProduct={handleUpdateProduct}
                                    removeProduct={handleRemoveProduct}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className={`${useMultipleProducts ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6`}>
                    <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                        <div className="text-center">
                            {calculations.isMultiProduct ? (
                                <>
                                    <p className="text-lg text-[var(--text-main)] font-medium">Your current business projections</p>
                                    <p className="text-4xl font-bold text-[var(--primary-gold)] my-2">{formatCurrency(calculations.totalMonthlyRevenue)}</p>
                                    <p className="text-lg text-[var(--text-main)] font-medium">monthly revenue target</p>
                                    {calculations.gapToFreedom > 0 ? (
                                        <p className="text-md text-red-600 mt-2">
                                            You need <span className="font-bold">{formatCurrency(calculations.gapToFreedom)}</span> more in monthly profit to achieve freedom.
                                        </p>
                                    ) : (
                                        <p className="text-md text-green-600 mt-2">
                                            🎉 <span className="font-bold">You're ready for freedom!</span> Your projected profit exceeds your needs.
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-lg text-[var(--text-main)] font-medium">To go full-time, you need to sell</p>
                                    <p className="text-6xl font-bold text-[var(--primary-gold)] my-2">{calculations.unitsToSell}</p>
                                    <p className="text-lg text-[var(--text-main)] font-medium">units per month.</p>
                                    <p className="text-md text-[var(--text-soft)] mt-2">This will generate <span className="font-bold">{formatCurrency(calculations.revenueTarget)}</span> in monthly revenue.</p>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InfoCard 
                            icon={<DollarSign className="w-6 h-6 text-green-600"/>} 
                            title="Monthly Revenue Target" 
                            value={calculations.isMultiProduct ? formatCurrency(calculations.totalMonthlyRevenue) : formatCurrency(calculations.revenueTarget)} 
                            color="bg-green-100" 
                        />
                        <InfoCard 
                            icon={<Target className="w-6 h-6 text-red-600"/>} 
                            title="Gross Income Needed" 
                            value={formatCurrency(calculations.grossIncomeNeeded)} 
                            color="bg-red-100" 
                        />
                        {calculations.isMultiProduct ? (
                            <InfoCard 
                                icon={<ShoppingCart className="w-6 h-6 text-blue-600"/>} 
                                title="Monthly Profit" 
                                value={formatCurrency(calculations.totalMonthlyProfit)} 
                                color="bg-blue-100" 
                            />
                        ) : (
                            <InfoCard 
                                icon={<ShoppingCart className="w-6 h-6 text-blue-600"/>} 
                                title="Profit per Unit" 
                                value={formatCurrency(calculations.profitPerUnit)} 
                                color="bg-blue-100" 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}