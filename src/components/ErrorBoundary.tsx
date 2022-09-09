import React, {Component, ReactNode} from 'react';
import Alert from "../ducks/alerts/Alert";


export interface ErrorBoundaryProps {
    children: ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    componentStack: string,
    message: string,
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    state = {
        hasError: false,
        componentStack: '',
        message: '',
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: any) {
        this.setState({componentStack: errorInfo.componentStack, message: error.message});
    }

    render() {
        const {hasError, componentStack, message} = this.state;
        if (hasError) {
            return (
                <>
                    <h1>Sorry! something went wrong!</h1>
                    <Alert alert={{name: 'ErrorBoundary', message: '', count: 1, id: 0 }} />
                    <code className="pre">
                        <pre style={{whiteSpace: 'pre-wrap'}}>
                            {componentStack}
                        </pre>
                    </code>
                </>
            )
        }
        return this.props.children;
    }
}
