/* WordPress dependencies */
const { __ } = wp.i18n;

import getTerms from '../joke-block/helpers/terms';

import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';

const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

const BlockEdit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { terms, term } = attributes;

	apiFetch( { path: '/wp/v2/subject' } )
		.then( ( response ) => {
			// process the data response for the dropdown
			return getTerms( response );
		} )
		.then( ( response ) => {
			// set attributes
			setAttributes( { terms: response } );
		} );

	return (
		<div>
			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ __( 'Select Which Content to Display' ) }>
					<SelectControl
						label={ __( 'Select a Subject' ) }
						value={ term }
						options={ terms }
						onChange={ ( newVal ) => {
							setAttributes( { term: newVal } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<ServerSideRender block="gutenberg/jokes-group-block" attributes={ attributes } />
		</div>
	);
};

export default BlockEdit;
