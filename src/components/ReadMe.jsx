/**Aula 541 começa a explicar testes unitários, o teste abaixo
 * está no componente App.test.js que é a convenção, nomear
 * o teste com o mesmo nome do componente.test.js * 
 * Esse código é um exemplo de teste automatizado para um
 * componente React usando a React Testing */

/**Aqui, você está importando duas funções da React Testing
 * Library: render e screen.
 *Também está importando o componente App que será testado. */
import { render, screen } from '@testing-library/react';
import App from './App';

/**esse teste leva dois argumentos, o primeiro é uma descrição
 * do teste e ajuda a identificar a função do teste.
 * O segundo é uma função q contém o teste em si.
 * O render leva o nome do elemento q vai ser testado
 * o screen.getByText vai capturar o texto q estiver sendo passado,
 * ou seja, vai guardar o texto entre / /, o i é para ser insensitive case,
 * e a linha de baixo diz q é esperado q haja aquele texto
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/**Para correr o teste é preciso digitar npm test */

/**foi criado mais um componente -Greeting -e um teste para ele
 * praticamente a mesma coisa do anterior */

//copiar aqui Greeting.js

import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
   const [changedText, setChangedText] = useState(false);

    const changeTextHandler = () => {
        setChangedText(true);
    };
/**Na aula 545 o <p> é substituido pelo <Output> para mostrar
 * que mesmo assim, mesmo com dois componentes conectados,
 * os testes continuam funcionando */
    return (<div>
        <h2>Hello World!</h2>
        {!changedText && <Output>It's good to see you!</Output>}
        {changedText && <Output>Changed!</Output>}
        <button onClick={changeTextHandler}>Change Text!</button>
    </div>);
};

export default Greeting;

//Greeting.text.js
/**Escrever testes requer 3 a’s

Arrange = arranjar os dados, as condições e o ambiente do teste
Act = correr a lógica que deve ser testada
Assert = assegurar que os resultados de execução sejam
os esperados
 */

import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Greeting from "./Greeting";
/**Na aula 543 é inserido o describe abaixo que é uma forma
 * de agrupar vários testes em um test suite cuja ideia é
 * agrupar testes do mesmo tipo ou área para organizar em um
 * projeto grande
 */
describe('Greeting component', () => {
    test('renders Hello World as a test', () => {
        //Arrange
        render(<Greeting />);
        //Act
        
        //Assert
        const helloWorldElement = screen.getByText('Hello World!');
        expect(helloWorldElement).toBeInTheDocument();
        });
        test('renders good to see you if the button was NOT clicked', () => {
            render(<Greeting />);

            const outputElement = screen.getByText('good to see you', {exact: false});
            expect(outputElement).toBeInTheDocument()});
//esse test é para ver se um botão foi clicado
            test('renders Changed if the button was clicked', () => {
                //Arrange
                render(<Greeting />);
                //Act
                const buttonElement = screen.getByRole("button");
                userEvent.click(buttonElement)
                //Assert    
                const outputElement = screen.getByText("Changed", {exact: false});
                expect(outputElement).toBeInTheDocument();
});
//Esse teste é para falhar e não encontrar o texto quando o botão for clicado
    test('does not render "good to see you" if the button was clicked', () => {
        //Act
        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement)
        //Assert    
        const outputElement = screen.queryByText("good to see you", {exact: false});
        expect(outputElement).toBeNull();
    })
});

//Async.js
import { useEffect, useState } from 'react';

const Async = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Async;

//Async.test.js

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