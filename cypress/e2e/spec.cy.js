describe('Teste de sistema', () => {
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/');
  })
  it('Teste de integração 1: Realizar Login', () => {

    // Realizar login
    cy.get('#uname').type('marcelo');
    cy.get('#psw').type('123');
    cy.get('.login-button').click().then(r=>{
      cy.on('window:alert',(t)=>{
        expect(t).to.contains('Login feito com sucesso!');
     });
    })
  })
  it('Teste de integração 2: Realizar Pedido', () => {
  //  Adicionar 2 itens ao carrinho
   cy.get(':nth-child(1) > .text > .quantidade').type('1');
   cy.get(':nth-child(1) > .text > .btnCarrinho').click();
   cy.url().should("be.equals", 'http://127.0.0.1:5500/carrinho.html');
   cy.get('.back-button').click()
   cy.url().should("be.equals", 'http://127.0.0.1:5500/');
   cy.get(':nth-child(2) > .text > .quantidade').type('2');
   cy.get(':nth-child(2) > .text > .btnCarrinho').click();
   
  //  Revisar valores
   cy.get('div[key="0"] > .text > .valorUnitario').should("contain", 'R$ 20,00');
   cy.get('div[key="0"] > .text > .valorTotal').should("contain", 'R$ 20');
   cy.get('div[key="0"] > .text > .quantidade').should("have.value", '1');
   cy.get('div[key="1"] > .text > .valorUnitario').should("contain", 'R$ 15,00');
   cy.get('div[key="1"] > .text > .valorTotal').should("contain", 'R$ 30');
   cy.get('div[key="1"] > .text > .quantidade').should("have.value", '2');
   cy.get('#pagamento > .valorTotal').should("contain", 'R$ 50,00');
  //  Aplicar cupom e concluir pedido
   cy.get('.cupom').type('10presentao');
   cy.get('.pagamento').click();
   cy.get('.valido').should('contain', 'Cupom Válido!');
   cy.get('.concluir-pagamento').click();
   cy.url().should("be.equals", 'http://127.0.0.1:5500/');

  });

  it('Teste de integração 3: Remover produto', ()=>{
    // Adicionar produto
    cy.get(':nth-child(1) > .text > .quantidade').type('1');
    cy.get(':nth-child(1) > .text > .btnCarrinho').click();
    cy.url().should("be.equals", 'http://127.0.0.1:5500/carrinho.html'); 
    // Remover produto
    cy.get('.remove').click()
  })
  it('Teste de integração 4: Limpar carrinho', ()=>{
    // Adicionar produto
    cy.get(':nth-child(1) > .text > .quantidade').type('1');
    cy.get(':nth-child(1) > .text > .btnCarrinho').click();
    cy.url().should("be.equals", 'http://127.0.0.1:5500/carrinho.html'); 
    // Remover produto
    cy.get('.clear').click();
    cy.url().should("be.equals", 'http://127.0.0.1:5500/'); 
  })
})

