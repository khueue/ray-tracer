describe('The Home Page', function() {
	it('successfully loads', function() {
		cy.visit('http://host.docker.internal:1234')
		cy.get('.subtitle').contains("100", { "timeout": 15000 })
		cy.screenshot()
	})
})
