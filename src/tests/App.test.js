import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o componente App e...', () => {
  test('verifica se os links "Home", "About" e "Favorite Pokémon" aparecem na tela e se ao clicar vão para as rotas correspondentes', () => {
    /* duas formas de acessar com o router, abaixo usando o componente renderWithRouter:
      const history = createMemoryHistory();
       render(
        <Router history={ history }>
          <App />
        </Router>,
      ); */

    const { history } = renderWithRouter(<App />);

    // capturando o botão
    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(home).toBeInTheDocument(); // testando se renderiza na tela
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();

    userEvent.click(home); // interagindo
    console.log(history.location.pathname); // history para acessar a sessão de histórico do navegador, pathname é onde está a rota.
    expect(history.location.pathname).toBe('/'); // aferindo

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('renderiza a página de notFound ao entrar em URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />); // acessa
    history.push('/nadaHaver'); // entrando em rota desconhecida

    const textNotFound = await screen.findByRole('heading', { name: 'Page requested not found' }); // aferindo (heading, por ser h2)
    expect(textNotFound).toBeInTheDocument(); // aferindo se textNotFound é renderizado na tela
  });
});
