'use client';

import { ValuationData } from '@/lib/types';
import { HelpCircle } from 'lucide-react';

interface Step1Props {
  data: ValuationData;
  onChange: (data: ValuationData) => void;
  onResearch: (query: string) => void;
}

export default function Step1Valuation({ data, onChange, onResearch }: Step1Props) {
  const handleChange = (field: keyof ValuationData, value: string) => {
    onChange({ ...data, [field]: value });

    // Trigger research on certain field changes
    if (field === 'systemName' && value.length > 10) {
      onResearch(`${value} AI platform market valuation 2025`);
    }
    if (field === 'developmentStatus') {
      onResearch(`SaaS ${value} stage startup valuations 2025`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* System Name */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-void-700">
          System Name
          <span className="text-error-500">*</span>
          <button
            type="button"
            className="text-void-400 hover:text-primary-500 transition-colors"
            title="The official name of your system/platform"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </label>
        <input
          type="text"
          value={data.systemName}
          onChange={(e) => handleChange('systemName', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          placeholder="e.g., OMEGA AI Orchestration Platform"
          required
        />
        <p className="text-xs text-void-500">The official name of your system/platform</p>
      </div>

      {/* Core Features */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-void-700">
          Core Features
          <span className="text-error-500">*</span>
          <span className="text-xs text-void-400">(minimum 15 features)</span>
        </label>
        <textarea
          value={data.coreFeatures}
          onChange={(e) => handleChange('coreFeatures', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all min-h-32 resize-y"
          placeholder="List all significant features/capabilities, separated by commas...&#10;&#10;Example: Multi-agent orchestration, Neural symbiosis architecture, Living entities system, Mission control dashboard..."
          required
        />
        <p className="text-xs text-void-500">
          Features listed: {data.coreFeatures.split(',').filter(f => f.trim()).length} / 15 minimum
        </p>
      </div>

      {/* Unique Advantages */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-void-700">
          Unique Advantages
          <span className="text-error-500">*</span>
          <span className="text-xs text-void-400">(3-5 items)</span>
        </label>
        <textarea
          value={data.uniqueAdvantages}
          onChange={(e) => handleChange('uniqueAdvantages', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all min-h-24 resize-y"
          placeholder="What makes your system different from competitors?&#10;&#10;Example: Only platform with neural symbiosis architecture, 10x faster than alternatives..."
          required
        />
      </div>

      {/* Development Status */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-void-700">
          Current Development Status
          <span className="text-error-500">*</span>
        </label>
        <select
          value={data.developmentStatus}
          onChange={(e) => handleChange('developmentStatus', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
          required
        >
          <option value="">Select status...</option>
          <option value="prototype">Prototype</option>
          <option value="mvp">MVP (Minimum Viable Product)</option>
          <option value="production">Production Ready</option>
          <option value="live">Live / In Production</option>
        </select>
        <p className="text-xs text-void-500">What stage is your system at?</p>
      </div>

      {/* Estimated Rebuild Cost */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-void-700">
          Estimated Rebuild Cost (CAD)
          <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-void-400">$</span>
          <input
            type="number"
            value={data.rebuildCost}
            onChange={(e) => handleChange('rebuildCost', e.target.value)}
            className="w-full pl-8 pr-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            placeholder="10000000"
            required
          />
        </div>
        <p className="text-xs text-void-500">If you hired a team to rebuild this from scratch, what would it cost?</p>
      </div>

      {/* Revenue Projections */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-void-700">
          Projected Revenue (CAD)
          <span className="text-error-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-void-500">Year 1</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-void-400">$</span>
              <input
                type="number"
                value={data.revenueYear1}
                onChange={(e) => handleChange('revenueYear1', e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="500000"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-void-500">Year 2</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-void-400">$</span>
              <input
                type="number"
                value={data.revenueYear2}
                onChange={(e) => handleChange('revenueYear2', e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="2000000"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-void-500">Year 3</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-void-400">$</span>
              <input
                type="number"
                value={data.revenueYear3}
                onChange={(e) => handleChange('revenueYear3', e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="5000000"
                required
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-void-500">Conservative projections for each year</p>
      </div>

      {/* Info box */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-semibold text-primary-800 text-sm mb-2">What this document creates:</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Executive Summary with fair market value</li>
          <li>• System overview with all capabilities</li>
          <li>• Comparable market analysis (auto-researched)</li>
          <li>• Cost approach valuation methodology</li>
          <li>• Income approach with DCF calculations</li>
        </ul>
      </div>
    </div>
  );
}
