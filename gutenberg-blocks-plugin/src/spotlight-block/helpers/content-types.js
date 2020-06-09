import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

// Create the post types list.
export default async function( clientId ) {
	const postTypesCollection = await apiFetch( { path: '/wp/v2/types' } );

	dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, {
		postTypesList: getContentTypes( postTypesCollection ),
	} );
}

// Format post types list.
const getContentTypes = ( postTypesCollection ) => {
	const postTypeList = [ { label: 'All post types', value: 'any' } ];

	const filteredPostTypes = Object.values( postTypesCollection )
		.filter(
			( postType ) =>
				postType.slug !== 'attachment' &&
				postType.slug !== 'wp_block' &&
				postType.slug !== 'wp_area'
		)
		.map( ( postType ) => ( { label: postType.name, value: postType.slug } ) );

	return [ ...postTypeList, ...filteredPostTypes ];
};
