// CAT-TAC.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit('src/index.html')
  })

describe('Central de Atendimento ao Cliente TAT', function() {
    
    it('verifica o título da aplicação', function() {
        
        cy.title().should('include', 'Central de Atendimento ao Cliente TAT')
        
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('De Tal')
        cy.get('#email').type('FuladoDeTal@gmail.com')
        cy.get('#open-text-area').type('Mensagem de teste para preencher o campo de texto aberto do formulário de contato da Central de Atendimento ao Cliente TAT', { delay: 0})
        cy.contains('Enviar').click()
        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('De Tal')
        cy.get('#email').type('FuladoDeTal$gmail.com')
        cy.get('#open-text-area').type('Mensagem de teste para preencher o campo de texto aberto do formulário de contato da Central de Atendimento ao Cliente TAT', { delay: 0})
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
        
    })
    it('não deve permitir inserir valores que não sejam numeros', function() {
        
        cy.get('#phone').type('1234567890')
        cy.get('#phone').should('have.value', '1234567890')
        cy.get('#phone').clear()
        cy.get('#phone').type('a')
        cy.get('#phone').should('have.value','')
        cy.get('#phone').clear()

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
        cy.get('#phone-checkbox').check()
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
        cy.get('#phone-checkbox').uncheck()

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('De Tal')
        cy.get('#email').type('FuladoDeTal@gmail.com')
        cy.get('#open-text-area').type('Mensagem de teste para preencher o campo de texto aberto do formulário de contato da Central de Atendimento ao Cliente TAT', { delay: 0})
        cy.get('#phone').type('1234567890')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit({
            firstName: 'Fulano',
            lastName: 'De Tal',
            email: 'Fuladodetal@gmail.com',
            message: 'Mensagem de teste para preencher o campo de texto aberto do formulário de contato da Central de Atendimento ao Cliente TAT'})
    }) 
    
    it('seleciona um produto (YouTube) por seu texto', function() {
        
        cy.get('#product').select('YouTube')
        cy.get('#product').should('have.value', 'youtube')

    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        
        cy.get('#product').select('mentoria')
        cy.get('#product').should('have.value', 'mentoria')

    })
    it('seleciona um produto (Blog) por seu índice', function() {
        
        cy.get('#product').select(1)
        cy.get('#product').should('have.value', 'blog')

    })
    
    it('marca o tipo de atendimento "Feedback"', function() {
            
        cy.get('input[type="radio"]').check("feedback")
        cy.get('input[type="radio"]').should('be.checked')
    
    })
    it('marca cada tipo de atendimento"', function() {
            
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')})
    })
    
   
    it('marca ambos checkboxes, depois desmarca o último', function() {
                
            cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each(function($checkbox) {
                cy.wrap($checkbox).check()
                cy.wrap($checkbox).should('be.checked')})
            .last().uncheck()
    })
    
    it('seleciona um arquivo da pasta fixtures', function() {

        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) { 
            expect($input[0].files[0].name).to.eq('example.json')})
    })
    it('seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) { 
            expect($input[0].files[0].name).to.eq('example.json')})
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) { 
            expect($input[0].files[0].name).to.eq('example.json')})
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })
    it('testa a página da política de privacidade de forma independente', function() {

        cy.visit('src/privacy.html')
    })
})