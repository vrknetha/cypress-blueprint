describe("Login tests", () => {
	before(function () {
		// run this once before all code
		return window.caches.keys().then(function(cacheNames) {
		  return Promise.all(
			cacheNames.map(function(cacheName) {
			  return window.caches.delete(cacheName);
			})
		  );
		});
	});

    it("login using credentials", function() {
        cy.fixture(`user`).as('user');
		cy.visit('https://develop.convosight.com/app/cs-admin-login', {
			onBeforeLoad: function(win) {
			  const promise = new Promise(function(resolve) {});
			  //@ts-ignore
			  return win.navigator.serviceWorker.register = function() {
				return promise;
			  }
			}
		  });
		cy.get(`input[placeholder='Email']`).type(`@user.cs-admin.user`);
		cy.get(`input[placeholder='Password']`).type(`@user.cs-admin.password`);
		cy.get(`button[type="submit"]`).click();
    });
});