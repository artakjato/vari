import { Button } from "@/components/ui/Button";
import { Component } from "react";
import type { ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="max-w-md space-y-3 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl text-foreground">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">Please try refreshing the page.</p>
            <Button onClick={() => this.setState({ hasError: false })} className="rounded-full">
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
