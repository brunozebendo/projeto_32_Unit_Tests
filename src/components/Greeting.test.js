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