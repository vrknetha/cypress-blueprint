/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		login(username?: string, password?: string): Chainable<void>;
		waitTillNavigation(): Chainable<void>;
	}
}
