// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyCLZOjYpdQXnLoZgNIM5Ce3GIR57DsIa5U",
		authDomain: "paradise-site.firebaseapp.com",
		databaseURL: "https://paradise-site.firebaseio.com",
		projectId: "paradise-site",
		storageBucket: "paradise-site.appspot.com",
		messagingSenderId: "520455277999"
	}
};
