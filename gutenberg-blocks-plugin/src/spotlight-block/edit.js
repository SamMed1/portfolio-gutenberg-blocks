import updateTerms from '../spotlight-block/helpers/terms';
import apiFetch from '@wordpress/api-fetch';

/* WordPress dependencies */
const { __ } = wp.i18n;
const { ServerSideRender } = wp.editor;
const { InspectorControls, URLInput } = wp.blockEditor;
const { PanelBody, SelectControl, BaseControl, ToggleControl, CheckboxControl } = wp.components;

const BlockEdit = ( props ) => {
	const { isSelected, attributes, setAttributes, className } = props;
	const { search, terms, term, spotlightToggle, searchToggle } = attributes;

	apiFetch( { path: '/wp/v2/tags' } )
		.then( ( response ) => {
			// process the data response for the dropdown
			return updateTerms( response );
		} )
		.then( ( response ) => {
			// set attributes
			setAttributes( { terms: response } );
		} );

	return [
		isSelected && (
			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ 'Choose Spotlight' }>
					<BaseControl id="content-search">
						<ToggleControl
							label={ !! spotlightToggle ? __( 'Articles.' ) : __( 'Hubs.' ) }
							checked={ !! spotlightToggle }
							onChange={ () => {
								!! spotlightToggle // eslint-disable-line no-unused-expressions
									? setAttributes( {
											spotlightToggle: ! spotlightToggle,
											postType: 'gutenberg-posts',
											taxonomies: [ { label: 'Keywords', value: 'keywords' } ],
											terms: [ { label: 'All terms', value: 'keywords' } ],
											taxonomy: 'keywords',
											term: 'any',
									  } )
									: setAttributes( {
											spotlightToggle: ! spotlightToggle,
											postType: 'any',
											taxonomies: [ { label: 'All taxonomies', value: 'any' } ],
											terms: [ { label: 'All terms', value: 'any' } ],
											taxonomy: 'any',
											term: 'any',
									  } );
							} }
						/>

						<URLInput
							id="content-search"
							className="content-search-input"
							value={ search }
							onChange={ ( url, post ) => {
								setAttributes( {
									search: url,
									post,
									postType: 'any',
									taxonomies: [ { label: 'All taxonomies', value: 'any' } ],
									terms: [ { label: 'All terms', value: 'any' } ],
									taxonomy: 'any',
									term: 'any',
								} );
							} }
						/>
					</BaseControl>

					{ ! spotlightToggle && (
						<CheckboxControl
							label={ !! searchToggle ? __( 'Use Search only' ) : __( 'Select keyword.' ) }
							checked={ !! searchToggle }
							onChange={ () => {
								!! searchToggle // eslint-disable-line no-unused-expressions
									? setAttributes( {
											searchToggle: ! searchToggle,
									  } )
									: setAttributes( {
											searchToggle: ! searchToggle,
									  } );
							} }
						/>
					) }

					{ ! spotlightToggle && ! searchToggle && (
						<SelectControl
							id="terms"
							label={ __( 'Select a Keyword' ) }
							value={ term }
							options={ terms }
							onChange={ ( newVal ) => {
								setAttributes( { term: newVal } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		),
		<section className={ className } key={ 'block' }>
			<ServerSideRender block={ 'gutenberg/spotlight-block' } attributes={ attributes } />
		</section>,
	];
};

export default BlockEdit;
