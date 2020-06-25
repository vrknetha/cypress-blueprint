// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference types="Cypress" />
import 'cypress-wait-until';
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (username, password) => {
	const wList = [];
	cy.task('loginUsingFacebook', {user: username, pass: password}).then(cookies => {
		cy.clearCookies();
		cookies.forEach(cookie => {
			wList.push(cookie.name);
			cy.setCookie(cookie.name, cookie.value, {
				log: true,
				domain: cookie.domain,
				path: cookie.path,
				expiry: cookie.expires,
				httpOnly: cookie.httpOnly,
				secure: cookie.secure
			});
		});
	});

	Cypress.Cookies.defaults({
		whitelist: wList
	});
});

Cypress.Commands.add('waitTillNavigation', () => {
	cy.route({
		url: 'https://iqbqjrqsrbdgrijmjdou34cm5i.appsync-api.us-east-1.amazonaws.com/graphql',
		method: 'POST',
		status: 200,
		headers: {
			referer: 'https://localhost:4200/group-admin/manage'
		}
	})
	.as('load')
	.wait('@load', {timeout: 15000});
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
