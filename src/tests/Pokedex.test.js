import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o componente <App/> e...', () => {
  test('verifica se tem <h2/> com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(encountered).toBeInTheDocument();
  });

  test('mostra outro pokemon da lista quando <button/> "Próximo Pokémon" clicado', () => {
    renderWithRouter(<App />);

    const called = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(called).toBeInTheDocument();
    userEvent.click(called);

    const second = screen.getByText(/Charmander/i);
    expect(second).toBeInTheDocument();
  });

  describe('Crie o filtro por tipo de Pokemon e...', () => {
    test('será validado se os botões de filtro por tipo de pokemon renderiza na tela', () => {
      renderWithRouter(<App />);
      const buttonsPainel = screen.getAllByTestId('pokemon-type-button');// captura dos botões pelo test Id
      expect(buttonsPainel[0]).toBeInTheDocument();
    });

    test('Será validado se <button/> "All" está sempre visível e clicável', () => {
      renderWithRouter(<App />);
      const allButtons = screen.getByTestId('');// busca do button All através do testId
      expect(allButtons).toBeVisible();
      userEvent.click(allButtons);
    });

    test('será validado se apenas os pokemons do tipo escolhido são renderizados na tela', () => {
      renderWithRouter(<App />);

      const buttonElectric = screen.getByRole('button', { name: /electric/i });
      userEvent.click(buttonElectric);

      const before = screen.getByText(/Pikachu/i);
      expect(before).toBeInTheDocument();
    });
  });
});
