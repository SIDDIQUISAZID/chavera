import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "../Button";

interface Props {
    children: ReactNode;
    fallback?: ReactNode
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    handleRetryClick = (): void => {
        this.setState({ hasError: false });
    };
    public render(): ReactNode {
        if (this.state.hasError) {
            // return this.props.fallback || <div className="flex h-screen"><h1 className="text-5xl text-blue-dark m-auto">Sorry.. there was an error</h1></div>;
            return this.props.fallback || <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-4xl font-bold mb-2 text-blue-dark">Oops! Something went wrong.</h1>
                {/* <p className="text-sm">Please try again later.</p> */}
                <Button
                    theme="primary_outline"
                    className="mt-4 mx-auto px-4 py-2 font-bold"
                    onClick={this.handleRetryClick}>
                    Retry
                </Button>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
