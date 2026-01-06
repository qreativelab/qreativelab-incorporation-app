'use client';

import { CapTableData } from '@/lib/types';
import { HelpCircle, User, MapPin, Calendar, Hash } from 'lucide-react';

interface Step3Props {
  data: CapTableData;
  onChange: (data: CapTableData) => void;
  onResearch: (query: string) => void;
}

export default function Step3CapTable({ data, onChange, onResearch }: Step3Props) {
  const handleChange = (field: keyof CapTableData, value: string) => {
    onChange({ ...data, [field]: value });

    if (field === 'classAShares') {
      onResearch(`startup cap table best practices Class A shares founder ${value}`);
    }
  };

  const provinces = [
    { code: 'QC', name: 'Quebec' },
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'PE', name: 'Prince Edward Island' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Founder Information */}
      <div className="bg-void-50 rounded-lg p-4 border border-void-200">
        <h3 className="font-semibold text-void-800 flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary-500" />
          Founder Information
        </h3>

        <div className="space-y-4">
          {/* Founder Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-void-700">
              Full Legal Name
              <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              value={data.founderName}
              onChange={(e) => handleChange('founderName', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-void-700">
              <MapPin className="w-4 h-4" />
              Street Address
              <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              value={data.founderAddress}
              onChange={(e) => handleChange('founderAddress', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="123 Main Street, Apt 4"
              required
            />
          </div>

          {/* City, Province, Postal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-void-700">
                City <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                value={data.founderCity}
                onChange={(e) => handleChange('founderCity', e.target.value)}
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
                value={data.founderProvince}
                onChange={(e) => handleChange('founderProvince', e.target.value)}
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
                value={data.founderPostalCode}
                onChange={(e) => handleChange('founderPostalCode', e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="H2X 1Y4"
                maxLength={7}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Incorporation Details */}
      <div className="bg-void-50 rounded-lg p-4 border border-void-200">
        <h3 className="font-semibold text-void-800 flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary-500" />
          Incorporation Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incorporation Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-void-700">
              Incorporation Date
              <span className="text-error-500">*</span>
              <button
                type="button"
                className="text-void-400 hover:text-primary-500 transition-colors"
                title="Expected date of incorporation"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </label>
            <input
              type="date"
              value={data.incorporationDate}
              onChange={(e) => handleChange('incorporationDate', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
              required
            />
          </div>

          {/* Class A Shares */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-void-700">
              <Hash className="w-4 h-4" />
              Class A Shares
              <span className="text-error-500">*</span>
            </label>
            <input
              type="number"
              value={data.classAShares}
              onChange={(e) => handleChange('classAShares', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="1000"
              min="1"
              required
            />
            <p className="text-xs text-void-500">Recommended: 1,000 shares (10 votes each = 10,000 total votes)</p>
          </div>
        </div>
      </div>

      {/* Cap Table Preview */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <h4 className="font-semibold text-success-800 text-sm mb-3">Cap Table Preview:</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-success-200">
                <th className="text-left py-2 text-success-700">Shareholder</th>
                <th className="text-left py-2 text-success-700">Class</th>
                <th className="text-right py-2 text-success-700">Shares</th>
                <th className="text-right py-2 text-success-700">%</th>
                <th className="text-right py-2 text-success-700">Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-success-800 font-medium">{data.founderName || '(Your name)'}</td>
                <td className="py-2 text-success-600">Class A</td>
                <td className="py-2 text-right text-success-800">{data.classAShares || '1,000'}</td>
                <td className="py-2 text-right text-success-800">100%</td>
                <td className="py-2 text-right text-success-800">{(parseInt(data.classAShares || '1000') * 10).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-success-600 mt-3">
          Class A shares have 10x voting power (super-voting). You maintain 51%+ control forever.
        </p>
      </div>

      {/* Info box */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-semibold text-primary-800 text-sm mb-2">What this document creates:</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Excel spreadsheet with formulas</li>
          <li>• Automatic percentage calculations</li>
          <li>• Voting power breakdown</li>
          <li>• Ready for future shareholders</li>
        </ul>
      </div>
    </div>
  );
}
