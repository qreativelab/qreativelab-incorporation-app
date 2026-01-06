'use client';

import { ArticlesData } from '@/lib/types';
import { Building2, MapPin, Users, Shield } from 'lucide-react';

interface Step5Props {
  data: ArticlesData;
  onChange: (data: ArticlesData) => void;
  onResearch: (query: string) => void;
}

export default function Step5Articles({ data, onChange, onResearch }: Step5Props) {
  const handleChange = (field: keyof ArticlesData, value: string | boolean) => {
    onChange({ ...data, [field]: value });

    if (field === 'confirm5ClassStructure' && value === true) {
      onResearch('CBCA articles of incorporation multi-class share structure founder protection');
    }
  };

  const provinces = [
    { code: 'QC', name: 'Quebec' },
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Company Name */}
      <div className="bg-void-50 rounded-lg p-4 border border-void-200">
        <h3 className="font-semibold text-void-800 flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-primary-500" />
          Company Information
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-void-700">
              Company Legal Name
              <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="QréativeLab Inc."
              required
            />
            <p className="text-xs text-void-500">Must end with Inc., Ltd., or Corp. for federal incorporation</p>
          </div>
        </div>
      </div>

      {/* Registered Office */}
      <div className="bg-void-50 rounded-lg p-4 border border-void-200">
        <h3 className="font-semibold text-void-800 flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary-500" />
          Registered Office Address
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-void-700">
              Street Address <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              value={data.registeredAddress}
              onChange={(e) => handleChange('registeredAddress', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="123 Business Street, Suite 100"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-void-700">
                City <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                value={data.registeredCity}
                onChange={(e) => handleChange('registeredCity', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="Montreal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-void-700">
                Province <span className="text-error-500">*</span>
              </label>
              <select
                value={data.registeredProvince}
                onChange={(e) => handleChange('registeredProvince', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
                required
              >
                {provinces.map((p) => (
                  <option key={p.code} value={p.code}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-void-700">
                Postal Code <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                value={data.registeredPostalCode}
                onChange={(e) => handleChange('registeredPostalCode', e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="H2X 1Y4"
                maxLength={7}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Directors */}
      <div className="bg-void-50 rounded-lg p-4 border border-void-200">
        <h3 className="font-semibold text-void-800 flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary-500" />
          Initial Directors
        </h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-void-700">
            Director Name(s) <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            value={data.directorNames}
            onChange={(e) => handleChange('directorNames', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            placeholder="John Doe (separate multiple names with commas)"
            required
          />
          <p className="text-xs text-void-500">At least one director required. Must be 18+ and not bankrupt.</p>
        </div>
      </div>

      {/* 5-Class Structure Confirmation */}
      <div className="bg-warning-50 rounded-lg p-4 border border-warning-200">
        <h3 className="font-semibold text-warning-800 flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-warning-600" />
          Share Structure Confirmation
        </h3>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-warning-200">
            <h4 className="font-medium text-void-800 mb-3">5-Class Share Structure:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-20 font-mono text-primary-600">Class A</span>
                <span className="text-void-600">Founder (10 votes/share, super-voting)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 font-mono text-primary-600">Class B</span>
                <span className="text-void-600">Co-founders (1 vote/share, PSU vesting)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 font-mono text-primary-600">Class C</span>
                <span className="text-void-600">Series A Investors (1 vote/share, liquidation preference)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 font-mono text-primary-600">Class D</span>
                <span className="text-void-600">Advisors (non-voting, 24-month vesting)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 font-mono text-primary-600">Class E</span>
                <span className="text-void-600">Employee Options (non-voting, $0.01 strike)</span>
              </div>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.confirm5ClassStructure}
              onChange={(e) => handleChange('confirm5ClassStructure', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-warning-300 text-primary-500 focus:ring-primary-500"
              required
            />
            <span className="text-sm text-warning-800">
              I confirm I want to use the 5-class share structure that guarantees founder control (51%+ voting) perpetually, even after dilution from future funding rounds.
            </span>
          </label>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-semibold text-primary-800 text-sm mb-2">What this document creates:</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Full CBCA-compliant Articles of Incorporation (15-20 pages)</li>
          <li>• 5-class share structure with voting rights</li>
          <li>• Transfer restrictions and ROFR provisions</li>
          <li>• Director appointment and removal provisions</li>
          <li>• Ready for ISED federal filing</li>
        </ul>
      </div>
    </div>
  );
}
