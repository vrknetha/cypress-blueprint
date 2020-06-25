const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const FacebookLogin = require('./../facebook-cookie-extractor/scripts');

module.exports = on => {
	on('file:preprocessor', cypressTypeScriptPreprocessor);
};

module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on('task', {
		async loginUsingFacebook({user, pass}) {
			const cookies = await FacebookLogin(user, pass);
			return cookies;
		}
	});
};
