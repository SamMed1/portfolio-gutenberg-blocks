/* WordPress dependencies */
const { __ } = wp.i18n;
const TEMPLATE = [ [ 'core/image' ] ];

import getTerms from '../hub-links-block/helpers/terms';
import apiFetch from '@wordpress/api-fetch';

import { RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
const { PanelBody, SelectControl } = wp.components;

const BlockEdit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { terms, term } = attributes;

	apiFetch( { path: '/wp/v2/tags' } )
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
			<div className="wp-block-gutenberg-hub-links-block">
				<div className="editor-img-input hub-links-block__image">
					<InnerBlocks template={ TEMPLATE } templateLock="all" />
				</div>
				<div className="hub-links-block-content">
					<div className="hub-links-block-content__text">
						<div className="editor-text-input">
							<RichText
								tagName="h3"
								value={ props.attributes.title }
								onChange={ ( title ) => props.setAttributes( { title } ) }
								placeholder={ __( 'Title..', 'gutenberg' ) }
							/>
						</div>
						<div className="editor-text-input">
							<RichText
								tagName="h2"
								value={ props.attributes.description }
								onChange={ ( description ) => props.setAttributes( { description } ) }
								placeholder={ __( 'Description..', 'gutenberg' ) }
							/>
						</div>
						<div className="hub-links-icon">
							<i className="icon-editor icon--notext"></i>
						</div>
					</div>
				</div>
			</div>

			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ 'Hub link' }>
					<SelectControl
						label={ __( 'Select a Hub' ) }
						value={ term }
						options={ terms }
						onChange={ ( newVal ) => {
							setAttributes( { term: newVal } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
};

export default BlockEdit;
