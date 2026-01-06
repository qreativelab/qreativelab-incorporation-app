'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  Clock,
  Sparkles
} from 'lucide-react';

import { STEPS, FormData, initialFormData, ResearchResult } from '@/lib/types';
import { saveFormData, loadFormData, getLastSaved, clearFormData } from '@/lib/storage';
import ProgressBar from '@/components/ProgressBar';
import ResearchPanel from '@/components/ResearchPanel';
import Step1Valuation from '@/components/steps/Step1Valuation';
import Step3CapTable from '@/components/steps/Step3CapTable';
import Step5Articles from '@/components/steps/Step5Articles';
import Step8Export from '@/components/steps/Step8Export';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [researchResults, setResearchResults] = useState<ResearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadFormData();
    setFormData(saved);
    setLastSaved(getLastSaved());

    // Check if there's existing progress
    if (saved !== initialFormData) {
      setShowWelcome(false);
    }
  }, []);

  // Auto-save on form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFormData(formData);
      setLastSaved(Date.now());
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Research function (simulated - replace with real Perplexity API)
  const handleResearch = useCallback(async (query: string) => {
    setIsSearching(true);

    // Add loading result
    const loadingResult: ResearchResult = {
      query,
      results: [],
      sources: [],
      timestamp: Date.now(),
      loading: true
    };
    setResearchResults(prev => [loadingResult, ...prev.slice(0, 4)]);

    // Simulate API call (replace with real Perplexity API)
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      // Update with real results
      setResearchResults(prev => {
        const updated = [...prev];
        const index = updated.findIndex(r => r.query === query && r.loading);
        if (index !== -1) {
          updated[index] = {
            query,
            results: data.results || ['Research completed. Results integrated into your document.'],
            sources: data.sources || [],
            timestamp: Date.now(),
            loading: false
          };
        }
        return updated;
      });
    } catch {
      // Update with error
      setResearchResults(prev => {
        const updated = [...prev];
        const index = updated.findIndex(r => r.query === query && r.loading);
        if (index !== -1) {
          updated[index] = {
            query,
            results: ['Research service unavailable. Continue with your inputs.'],
            sources: [],
            timestamp: Date.now(),
            loading: false
          };
        }
        return updated;
      });
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Step navigation
  const goToStep = (step: number) => {
    if (step >= 1 && step <= STEPS.length) {
      setCurrentStep(step);
    }
  };

  const completeStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Form data handlers
  const updateValuation = (data: typeof formData.valuation) => {
    setFormData(prev => ({ ...prev, valuation: data }));
  };

  const updateCapTable = (data: typeof formData.capTable) => {
    setFormData(prev => ({ ...prev, capTable: data }));
  };

  const updateArticles = (data: typeof formData.articles) => {
    setFormData(prev => ({ ...prev, articles: data }));
  };

  // Export handler
  const handleExport = async (format: 'pdf' | 'word' | 'excel' | 'zip') => {
    // Trigger download
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, formData })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qreativelab-incorporation-${format}.${format === 'zip' ? 'zip' : format === 'excel' ? 'xlsx' : format === 'word' ? 'docx' : 'pdf'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  // Reset handler
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      clearFormData();
      setFormData(initialFormData);
      setCompletedSteps([]);
      setCurrentStep(1);
      setResearchResults([]);
    }
  };

  const currentStepData = STEPS[currentStep - 1];

  // Welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-void-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-10 h-10" />
              <h1 className="text-3xl font-bold">QréativeLab Inc.</h1>
            </div>
            <p className="text-primary-100 text-lg">
              Legal Document Builder
            </p>
          </div>

          <div className="p-8 space-y-6">
            <p className="text-void-600 leading-relaxed">
              This interface guides you through creating <strong>8 professional legal documents</strong> for
              your incorporation in <strong>14 days</strong>. Each step is backed by research, professional
              templates, and expert guidance.
            </p>

            <div className="bg-void-50 rounded-lg p-4 border border-void-200">
              <h3 className="font-semibold text-void-800 mb-3">Documents you&apos;ll create:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {STEPS.map(step => (
                  <div key={step.id} className="flex items-center gap-2 text-void-600">
                    <span>{step.icon}</span>
                    <span>{step.shortTitle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-success-50 rounded-lg p-4 border border-success-200">
              <p className="text-success-800 text-sm">
                <strong>Estimated time:</strong> ~16 hours over 14 days<br />
                <strong>Cost savings:</strong> $12,000 - $22,000 vs. full lawyer preparation
              </p>
            </div>

            <motion.button
              onClick={() => setShowWelcome(false)}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-400 hover:to-primary-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              START PROCESS
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void-50">
      {/* Header */}
      <header className="bg-white border-b border-void-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary-500" />
              <div>
                <h1 className="font-bold text-void-900">QréativeLab Inc.</h1>
                <p className="text-xs text-void-500">Legal Document Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Last saved */}
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-void-500">
                  <Save className="w-4 h-4" />
                  <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
                </div>
              )}

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 text-sm text-void-600 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-void-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form Section (60%) */}
          <div className="xl:col-span-3 space-y-6">
            {/* Step Header */}
            <div className="bg-white rounded-xl border border-void-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentStepData.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-void-900">
                      Step {currentStep}: {currentStepData.title}
                    </h2>
                    <p className="text-void-500 text-sm">{currentStepData.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-void-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {currentStepData.estimatedTime}
                </div>
              </div>
            </div>

            {/* Step Form */}
            <div className="bg-white rounded-xl border border-void-200 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <Step1Valuation
                      data={formData.valuation}
                      onChange={updateValuation}
                      onResearch={handleResearch}
                    />
                  )}
                  {currentStep === 2 && (
                    <div className="text-center py-12 text-void-500">
                      <p className="text-lg mb-2">Technical Specification Form</p>
                      <p className="text-sm">Coming in next update...</p>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <Step3CapTable
                      data={formData.capTable}
                      onChange={updateCapTable}
                      onResearch={handleResearch}
                    />
                  )}
                  {currentStep === 4 && (
                    <div className="text-center py-12 text-void-500">
                      <p className="text-lg mb-2">IP Contribution Agreement Form</p>
                      <p className="text-sm">Auto-filled from Steps 1-3</p>
                    </div>
                  )}
                  {currentStep === 5 && (
                    <Step5Articles
                      data={formData.articles}
                      onChange={updateArticles}
                      onResearch={handleResearch}
                    />
                  )}
                  {currentStep === 6 && (
                    <div className="text-center py-12 text-void-500">
                      <p className="text-lg mb-2">Bylaws Form</p>
                      <p className="text-sm">Coming in next update...</p>
                    </div>
                  )}
                  {currentStep === 7 && (
                    <div className="text-center py-12 text-void-500">
                      <p className="text-lg mb-2">Shareholders Agreement Form</p>
                      <p className="text-sm">Coming in next update...</p>
                    </div>
                  )}
                  {currentStep === 8 && (
                    <Step8Export
                      formData={formData}
                      completedSteps={completedSteps}
                      onExport={handleExport}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-void-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {currentStep < 8 ? (
                <button
                  onClick={completeStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-400 hover:to-primary-500 transition-all"
                >
                  Complete & Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="text-sm text-void-500">
                  Export your documents above
                </div>
              )}
            </div>
          </div>

          {/* Research Panel (40%) */}
          <div className="xl:col-span-2 h-[600px] sticky top-32">
            <ResearchPanel results={researchResults} isSearching={isSearching} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-void-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-void-500 text-sm">
            QréativeLab Inc. Legal Document Builder • Powered by OMEGA
          </p>
          <p className="text-void-400 text-xs mt-1">
            Documents are templates for lawyer review. Not legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
