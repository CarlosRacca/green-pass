import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5 text-center">
          <h3>Ocurrió un error inesperado</h3>
          <p>Por favor, recargá la página.</p>
        </div>
      );
    }
    return this.props.children;
  }
}


