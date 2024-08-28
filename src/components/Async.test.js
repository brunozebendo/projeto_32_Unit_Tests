import {render, screen } from '@testing-library/react';
import Async from './Async';
/*esse test é para um componente que faz um requerimento para uma API e traz
//de volta vários itens, foi usada a função de achar todos pelo seu papel e verificar
se não é zerada, no entanto, é preciso usar a função find q vai esperar um segundo
para achar o item e transformar a função em assíncrona. Caso se quisesse
esperar mais de um segundo era só definir após o list item assim {} {3} */
/**Aula 547 explica sobre Mocks que são funções falsas para quando
 * se precisa testar uma função fetch e assim evitar q sejam feitas chamadas
 * desnecessárias ou que insiram dados em um db. No entanto, não se está testando
 * o fetch em si, pois essa é uma função escrita por terceiros, mas se o componente
 * está se comportando corretamente quando recebe os dados
 */
describe("Async component", () => {
   test('renders posts if request succeeds', async () => {
    //aqui é a função fetch mas "mockada", o jest.fn() é uma função criada justamente
    // para isso e tem algumas funções
        window.fetch = jest.fn();
    //aqui o mock vai usar um método especial para estabelecer um valor que
    //vai ser retornado quando a função original trouxer os dados, no caso,
    //como ela traz dados em um array com id e title é o q aqui é passado
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: "first post"}]
        });
        render(<Async />)

        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    })
})