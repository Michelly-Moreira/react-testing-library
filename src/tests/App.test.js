import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Renderiza o App.js e...', () => {
  describe('renderiza a home e...', () => {
    test('verifica se os links "Home", "About" e "Favorite Pokémon" aparecem na tela', () => {
      render(<App />); });
  });
});
