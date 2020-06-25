describe("Login tests", () => {
    it("login using credentials", () => {
        cy.fixture(`user`).as('user');
		cy.visit('https://develop.convosight.com/app/cs-admin-login');
		cy.get(`input[placeholder='Email']`).type(`@user.cs-admin.user`);
		cy.get(`input[placeholder='Password']`).type(`@user.cs-admin.password`);
		cy.get(`button[type="submit"]`).click();
    });
});