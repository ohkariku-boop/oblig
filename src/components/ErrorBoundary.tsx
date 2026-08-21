import { Component, type ReactNode } from 'react';
import { logError } from '@/lib/errorLogging';

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    logError(error.message, `${error.stack}\n${info.componentStack}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-6 text-center dark:bg-[#080b16]">
          <p className="text-lg font-semibold text-navy dark:text-cream">Something went wrong.</p>
          <p className="max-w-sm text-sm text-muted">This has been logged. Try refreshing the page, or head back to the homepage.</p>
          <button onClick={() => { window.location.href = '/oblig/'; }} className="btn-primary">Back to homepage</button>
        </div>
      );
    }
    return this.props.children;
  }
}
