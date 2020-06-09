export default {
	spotlightToggle: {
		type: 'boolean',
		default: true,
	},
	searchToggle: {
		type: 'boolean',
		default: true,
	},
	contentSearch: {
		type: 'boolean',
		default: true,
	},
	search: {
		type: 'string',
	},
	post: {
		type: 'object',
	},
	postTypesList: {
		type: 'array',
		default: [],
	},
	postType: {
		type: 'string',
		default: 'any',
	},
	taxonomies: {
		type: 'array',
		default: [ { label: 'All taxonomies', value: 'any' } ],
	},
	taxonomy: {
		type: 'string',
		default: 'any',
	},
	terms: {
		type: 'array',
		default: [ { label: 'All terms', value: 'any' } ],
	},
	term: {
		type: 'string',
		default: 'any',
	},
};
