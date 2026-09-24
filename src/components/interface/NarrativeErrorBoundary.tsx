import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * NarrativeErrorBoundary
 * Wraps the narrative viewport. Catches render exceptions gracefully.
 * Logs errors ONLY to the local browser console (no external telemetry/surveillance trackers).
 * Provides a serene, calm recovery path for the reader.
 */
export class NarrativeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Technical-only console reporting; strictly private reading experience
    console.error("[KAIROS Engine Error Boundary caught exception]:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-24">
          <div className="max-w-lg w-full p-8 rounded-xl bg-[#12141c] border border-[#242738] shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#c99a5e]/10 border border-[#c99a5e]/30 flex items-center justify-center mx-auto text-[#c99a5e]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl text-white tracking-wider">
                A Moment of Stillness
              </h2>
              <p className="font-serif text-sm text-stone-400 leading-relaxed">
                The narrative thread encountered an unexpected interruption. Your progress is safely preserved in local storage.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded bg-[#0b0c10] border border-stone-800 text-left font-mono text-[11px] text-stone-400 max-h-24 overflow-y-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#c99a5e] hover:bg-[#d8a86c] text-stone-950 font-sans text-xs uppercase tracking-widest font-semibold transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resume Reading</span>
              </button>

              <Link
                to="/books"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#181a22] hover:bg-[#222533] border border-[#2d3142] text-stone-300 hover:text-white font-sans text-xs uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Open Library</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
