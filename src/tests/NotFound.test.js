import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Renderiza o componente <NotFound /> e...', () => {
  test('verifica se <h2/> com o texto "Page requested not found" aparece na tela', () => {
    renderWithRouter(<NotFound />);
    const alert = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(alert).toBeInTheDocument();
  });
  test('mostra a imagem com atributo src específico', () => {
    renderWithRouter(<NotFound />);
    const imageUrl = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(imageUrl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
