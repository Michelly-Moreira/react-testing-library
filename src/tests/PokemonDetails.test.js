import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import PokemonDetails from '../pages/PokemonDetails';
import App from '../App';

describe('As informações detalhadas do Pokémon selecionado são mostradas na tela e...', () => {
  test('será validado se é exibido na tela um h2 com o texto <name> Details', async () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const nameDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(nameDetails).toBeInTheDocument();
  });

  test('será validado se é exibido na tela um h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });

  test('será validado se é exibido na tela um resumo do <summary>', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const textSummary = screen.getByText(
      /this intelligent pokémon roasts/i,
    );
    expect(textSummary).toBeInTheDocument();
  });

  describe('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes e...', () => {
    test('será validado se é exibido na tela um h2 com o texto Game Locations of <name>', () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const locationGame = screen.getByRole('heading', {
        name: /game locations of pikachu/i,
      });
      expect(locationGame).toBeInTheDocument();
    });

    test('será validado se são exibidas na tela imagens de localização com o src correto', () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const locationForest = screen.getAllByRole('img', { name: 'Pikachu location' });

      expect(locationForest[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(locationForest[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

    test('será validado se exibido na tela uma label com o texto "Pokémon favoritado?" ', () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const question = screen.getByText(/pokémon favoritado\?/i);
      expect(question).toHaveTextContent('Pokémon favoritado?');
    });
  });
});
