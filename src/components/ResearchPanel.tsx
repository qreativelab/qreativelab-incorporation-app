'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { ResearchResult } from '@/lib/types';

interface ResearchPanelProps {
  results: ResearchResult[];
  isSearching: boolean;
}

export default function ResearchPanel({ results, isSearching }: ResearchPanelProps) {
  return (
    <div className="h-full flex flex-col bg-void-900 rounded-xl border border-void-700 overflow-hidden">
      {/* Header */}
      <div className="bg-void-800 px-4 py-3 border-b border-void-700 flex items-center gap-2">
        <Search className="w-4 h-4 text-primary-400" />
        <span className="font-semibold text-white text-sm">Research Panel</span>
        {isSearching && (
          <Loader2 className="w-4 h-4 text-primary-400 animate-spin ml-auto" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {results.length === 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-void-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-void-500" />
              </div>
              <p className="text-void-400 text-sm">
                Research results will appear here as you fill in the form
              </p>
              <p className="text-void-500 text-xs mt-2">
                Powered by Perplexity AI
              </p>
            </motion.div>
          )}

          {isSearching && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-void-800/50 rounded-lg p-4 border border-void-700"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                <div>
                  <p className="text-white text-sm font-medium">Researching...</p>
                  <p className="text-void-400 text-xs">Querying knowledge bases</p>
                </div>
              </div>
            </motion.div>
          )}

          {results.map((result, index) => (
            <motion.div
              key={`${result.query}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-void-800/50 rounded-lg border border-void-700 overflow-hidden"
            >
              {/* Query header */}
              <div className="px-4 py-2 bg-void-800 border-b border-void-700 flex items-center gap-2">
                {result.loading ? (
                  <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-success-400" />
                )}
                <span className="text-void-300 text-xs font-mono truncate">{result.query}</span>
              </div>

              {/* Results */}
              <div className="p-4 space-y-3">
                {result.loading ? (
                  <div className="flex items-center gap-2 text-void-400 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </div>
                ) : result.results.length > 0 ? (
                  result.results.map((text, i) => (
                    <div key={i} className="text-void-200 text-sm leading-relaxed">
                      {text}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-warning-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    No results found
                  </div>
                )}

                {/* Sources */}
                {result.sources.length > 0 && (
                  <div className="pt-3 border-t border-void-700">
                    <p className="text-void-500 text-xs mb-2">Sources:</p>
                    <div className="space-y-1">
                      {result.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary-400 text-xs hover:text-primary-300 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="truncate">{source}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-void-800 border-t border-void-700">
        <p className="text-void-500 text-xs text-center">
          Research validates your inputs with real-time data
        </p>
      </div>
    </div>
  );
}
