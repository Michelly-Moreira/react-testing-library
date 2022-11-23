import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o componente <FavoritePokemon/> e...', () => {
  test('verifica se é exibida a mensagem "No favorite pokemon found"  na tela ', () => {
    // acessar
    renderWithRouter(<FavoritePokemon />);
    const noFavorite = screen.getByText(/No favorite pokémon found/i);

    // aferir
    expect(noFavorite).toBeInTheDocument();
  });
});

describe('Renderiza o componente <FavoritePokemon/> e...', () => {
  test('verifica se todos os cards de Pokémon favoritados aparecem na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const chooseFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(chooseFavorite).toBeInTheDocument();
    userEvent.click(chooseFavorite);

    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoriteList = screen.getByText(/pikachu/i);
    expect(favoriteList).toBeInTheDocument();
  });
});
