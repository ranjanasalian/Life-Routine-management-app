import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md space-y-4 p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <span className="text-4xl block">🌿</span>
            <h2 className="text-xl font-bold text-white font-display">Life Routine Management</h2>
            <p className="text-xs text-slate-400">
              The application encountered a temporary loading issue. Click below to reload your personal wellness companion.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl text-xs transition-all"
            >
              Reset & Reload Companion
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
