import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonId = '/pokemon/25';
const marked = 'Pikachu is marked as favorite';

describe('Renderiza um card com informação de determinado Pokemon e...', () => {
  test('será validado se renderizado o nome, tipo, peso e imagem corretos do pokémon', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByTestId('pokemon-type');
    const averagePokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemon = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');
    expect(averagePokemon).toBeInTheDocument();
    expect(pokemon).toBeInTheDocument();
    expect(pokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemon.alt).toContain('Pikachu sprite');
  });

  test('será validado se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
  });

  test('Ao clicar no link de navegação do Pokémon, redireciona a aplicação para a página de detalhes, será validado se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    expect(history.location.pathname).toBe(pokemonId);
  });

  describe('Renderiza componente de estrela nos pokémons favoritados e...', () => {
    test('será validado se renderizada uma imagem com o atributo src contendo o caminho /star-icon.svg', () => {
      renderWithRouter(<App />);

      const details = screen.getByRole('link', {
        name: /more details/i });

      userEvent.click(details);

      const favorite = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      userEvent.click(favorite);

      const favoriteLink = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteLink);

      const star = screen.getByRole('img', {
        name: marked,
      });

      expect(star).toBeInTheDocument();
      expect(star.src).toContain('/star-icon.svg');
    });

    test('será validado se a imagem tiver o atributo alt igual a <Pokemon> is marked as favorite', () => {
      renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteLink);

      const star = screen.getByRole('img', {
        name: marked,
      });

      expect(star).toBeInTheDocument();
      expect(star.alt).toBe('Pikachu is marked as favorite');
    });
    test('será validado se exibido na tela um texto com o tipo do pokemon', () => {
      renderWithRouter(<App />);

      const getType = screen.getAllByTestId('pokemon-type-button');
      expect(getType[0]).toBeInTheDocument();
    });
  });
});
