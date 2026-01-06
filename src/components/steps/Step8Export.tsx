'use client';

import { motion } from 'framer-motion';
import { FormData, STEPS } from '@/lib/types';
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useState } from 'react';

interface Step8Props {
  formData: FormData;
  completedSteps: number[];
  onExport: (format: 'pdf' | 'word' | 'excel' | 'zip') => void;
}

export default function Step8Export({ formData, completedSteps, onExport }: Step8Props) {
  const [exporting, setExporting] = useState<string | null>(null);

  const documents = [
    { id: 1, name: 'IP Valuation Memo', pages: '3-5', step: 1 },
    { id: 2, name: 'Technical Specification', pages: '5-10', step: 2 },
    { id: 3, name: 'Cap Table v0.1', pages: 'Excel', step: 3 },
    { id: 4, name: 'IP Contribution Agreement', pages: '3-5', step: 4 },
    { id: 5, name: 'Articles of Incorporation', pages: '15-20', step: 5 },
    { id: 6, name: 'Bylaws', pages: '8-10', step: 6 },
    { id: 7, name: 'Shareholders Agreement', pages: '10-15', step: 7 },
    { id: 8, name: 'Memo pour Avocat', pages: '2', step: 8 },
  ];

  const allComplete = completedSteps.length >= 7;
  const totalPages = '70-80';

  const handleExport = async (format: 'pdf' | 'word' | 'excel' | 'zip') => {
    setExporting(format);
    try {
      await onExport(format);
    } finally {
      setTimeout(() => setExporting(null), 1000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Header */}
      <div className={`rounded-lg p-6 border ${allComplete ? 'bg-success-50 border-success-200' : 'bg-warning-50 border-warning-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          {allComplete ? (
            <CheckCircle2 className="w-8 h-8 text-success-500" />
          ) : (
            <AlertCircle className="w-8 h-8 text-warning-500" />
          )}
          <div>
            <h3 className={`font-bold text-lg ${allComplete ? 'text-success-800' : 'text-warning-800'}`}>
              {allComplete ? 'All Documents Ready!' : 'Some Steps Incomplete'}
            </h3>
            <p className={`text-sm ${allComplete ? 'text-success-600' : 'text-warning-600'}`}>
              {allComplete
                ? 'You can now export all documents for lawyer review'
                : `Complete steps ${STEPS.filter(s => !completedSteps.includes(s.id) && s.id < 8).map(s => s.id).join(', ')} before exporting`
              }
            </p>
          </div>
        </div>

        {/* Progress summary */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${allComplete ? 'bg-success-500' : 'bg-warning-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps.length / 7) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className={`text-sm font-medium ${allComplete ? 'text-success-700' : 'text-warning-700'}`}>
            {completedSteps.length}/7 steps
          </span>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="bg-white rounded-lg border border-void-200 overflow-hidden">
        <div className="bg-void-50 px-4 py-3 border-b border-void-200">
          <h3 className="font-semibold text-void-800">Document Checklist</h3>
        </div>
        <div className="divide-y divide-void-100">
          {documents.map((doc, index) => {
            const isComplete = completedSteps.includes(doc.step) || doc.step === 8;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-success-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-void-300" />
                  )}
                  <span className={`font-medium ${isComplete ? 'text-void-800' : 'text-void-400'}`}>
                    {doc.name}
                  </span>
                </div>
                <span className="text-sm text-void-500">{doc.pages} pages</span>
              </motion.div>
            );
          })}
        </div>
        <div className="bg-void-50 px-4 py-3 border-t border-void-200 flex justify-between">
          <span className="font-semibold text-void-700">Total</span>
          <span className="font-semibold text-primary-600">{totalPages} pages</span>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Bundle */}
        <motion.button
          onClick={() => handleExport('pdf')}
          disabled={!allComplete || exporting !== null}
          className="p-6 bg-white border border-void-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
          whileHover={{ scale: allComplete ? 1.02 : 1 }}
          whileTap={{ scale: allComplete ? 0.98 : 1 }}
        >
          <div className="flex items-center gap-4">
            {exporting === 'pdf' ? (
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            ) : (
              <FileText className="w-10 h-10 text-error-500" />
            )}
            <div>
              <h4 className="font-semibold text-void-800">PDF Bundle</h4>
              <p className="text-sm text-void-500">All documents in one PDF</p>
            </div>
          </div>
        </motion.button>

        {/* Word Documents */}
        <motion.button
          onClick={() => handleExport('word')}
          disabled={!allComplete || exporting !== null}
          className="p-6 bg-white border border-void-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
          whileHover={{ scale: allComplete ? 1.02 : 1 }}
          whileTap={{ scale: allComplete ? 0.98 : 1 }}
        >
          <div className="flex items-center gap-4">
            {exporting === 'word' ? (
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            ) : (
              <FileText className="w-10 h-10 text-primary-500" />
            )}
            <div>
              <h4 className="font-semibold text-void-800">Word Documents</h4>
              <p className="text-sm text-void-500">Individual .docx files for editing</p>
            </div>
          </div>
        </motion.button>

        {/* Excel Files */}
        <motion.button
          onClick={() => handleExport('excel')}
          disabled={!allComplete || exporting !== null}
          className="p-6 bg-white border border-void-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
          whileHover={{ scale: allComplete ? 1.02 : 1 }}
          whileTap={{ scale: allComplete ? 0.98 : 1 }}
        >
          <div className="flex items-center gap-4">
            {exporting === 'excel' ? (
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-10 h-10 text-success-500" />
            )}
            <div>
              <h4 className="font-semibold text-void-800">Excel Files</h4>
              <p className="text-sm text-void-500">Cap table with formulas</p>
            </div>
          </div>
        </motion.button>

        {/* ZIP Bundle */}
        <motion.button
          onClick={() => handleExport('zip')}
          disabled={!allComplete || exporting !== null}
          className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 border border-primary-400 rounded-lg hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
          whileHover={{ scale: allComplete ? 1.02 : 1 }}
          whileTap={{ scale: allComplete ? 0.98 : 1 }}
        >
          <div className="flex items-center gap-4">
            {exporting === 'zip' ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : (
              <FileArchive className="w-10 h-10 text-white" />
            )}
            <div>
              <h4 className="font-semibold text-white">ZIP Bundle</h4>
              <p className="text-sm text-white/80">Everything together (Recommended)</p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Next Steps */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-semibold text-primary-800 text-sm mb-3 flex items-center gap-2">
          <Download className="w-4 h-4" />
          After Export:
        </h4>
        <ol className="text-sm text-primary-700 space-y-2 list-decimal list-inside">
          <li>Download the ZIP bundle</li>
          <li>Email to your lawyer with subject: "QréativeLab Inc. - Incorporation Documents for Review"</li>
          <li>Lawyer reviews and optimizes (2-3 hours)</li>
          <li>Lawyer files with ISED (federal) and provincial registry</li>
          <li>Receive Certificate of Incorporation</li>
        </ol>
        <p className="text-xs text-primary-600 mt-3">
          Estimated lawyer time: 2-5 hours | Estimated cost savings: $12,000 - $22,000
        </p>
      </div>
    </div>
  );
}
