import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

// Create the taxonomies list.
export default async function( clientId, postType ) {
	const taxonomiesCollection = await apiFetch( { path: '/wp/v2/taxonomies' } );

	dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, {
		taxonomies: getTaxonomies( taxonomiesCollection, postType ),
	} );
}

// Format taxonomy list.
const getTaxonomies = ( taxonomiesCollection, postType ) => {
	const taxonomiesList = [ { label: 'All taxonomies', value: 'any' } ];

	const filteredTaxonomies = Object.values( taxonomiesCollection )
		.filter( ( taxonomy ) => taxonomy.types.includes( postType ) )
		.map( ( taxonomy ) => ( { label: taxonomy.name, value: taxonomy.slug } ) );

	return [ ...taxonomiesList, ...filteredTaxonomies ];
};
