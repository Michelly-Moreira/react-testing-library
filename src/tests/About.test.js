import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Renderiza o componente <About/> e...', () => {
  test('verifica se o <h2/> e <p/> aparecem na tela', () => {
    render(<About />);

    const title = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    const description = screen.getByText(/digital encyclopedia containing all pokémon/i);
    const paragraph = screen.getByText(/filter Pokémon by type/i);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
  test('verifica o atributo src da imagem', () => {
    // acessar
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: 'Pokédex' });

    // aferir
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
