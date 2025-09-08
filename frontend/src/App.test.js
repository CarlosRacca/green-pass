jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    __esModule: true,
    useNavigate: () => () => {},
    Link: ({ children, to }) => React.createElement('a', { href: to || '#' }, children),
  };
}, { virtual: true });

// Neutralizar framer-motion para evitar act/IntersectionObserver en JSDOM
jest.mock('framer-motion', () => {
  const React = require('react');
  const passthrough = ({ children, ...rest }) => React.createElement(React.Fragment, null, children);
  return {
    __esModule: true,
    motion: new Proxy({}, { get: () => passthrough }),
    AnimatePresence: passthrough,
  };
}, { virtual: true });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext.jsx';
import FeaturedExperiences from './components/FeaturedExperiences.jsx';


test('muestra el título de experiencias destacadas', () => {
  render(
    <AuthProvider>
      <FeaturedExperiences />
    </AuthProvider>
  );
  expect(screen.getByText(/Experiencias destacadas/i)).toBeInTheDocument();
});
