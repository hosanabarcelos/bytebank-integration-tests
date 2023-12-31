import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './paginas/Principal/App';
import AppRoutes from './routes';
import Cartoes from './componentes/Cartoes'

describe('Routes', () => {
  test('If the main route is rendered correctly', () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });

  test('If the cards route was rendered', () => {
    const route = '/cartoes';

    render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="cartoes" element={<Cartoes />}/>
                </Route>
            </Routes>
        </MemoryRouter>
    );

    const mycards = screen.getByText('Meus cartões');
    expect(mycards).toHaveTextContent('Meus cartões');
  });

  test('If the current route location was rendered', () => {
    const route = '/cartoes';

    render(
        <MemoryRouter initialEntries={[route]}>
            <App />
        </MemoryRouter>
    );

    const location = screen.getByTestId('local');
    expect(location).toHaveTextContent(route);
  });

  test('If the 404 page was rendered', () => {
    const route = '/extrato';

    render(
        <MemoryRouter initialEntries={[route]}>
            <AppRoutes />
        </MemoryRouter>
    );

    const errorPage = screen.getByTestId('pagina-404');
    expect(errorPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});