"use strict";

module.exports = {
	public: false,
	host: undefined,
	port: 9000,
	bind: undefined,
	reverseProxy: true,
	theme: "thelounge-theme-solarized",
	prefetch: true,
	prefetchStorage: true,
	prefetchMaxImageSize: 10000,

	displayNetwork: true,
	lockNetwork: false,
	useHexIp: false,
	webirc: null,

	logs: {
		format: "YYYY-MM-DD HH:mm:ss",
		timezone: "UTC+00:00"
	},

	maxHistory: 10000,

	defaults: {
		name: "Freenode",
		host: "chat.freenode.net",
		port: 6697,
		password: "",
		tls: true,
		nick: "lounge-user",
		username: "lounge-user",
		realname: "The Lounge User",
		join: "#thelounge"
	},

	transports: ["polling", "websocket"],

	https: {
		enable: false,
		key: "",
		certificate: "",
		ca: ""
	},

	identd: {
		enable: false,
		port: 113
	},

	oidentd: null,

	ldap: {
		enable: false,
		url: "ldaps://example.com",
		baseDN: "ou=accounts,dc=example,dc=com",
		primaryKey: "uid"
	},

	debug: {
		ircFramework: false,
		raw: false,
	}
};
