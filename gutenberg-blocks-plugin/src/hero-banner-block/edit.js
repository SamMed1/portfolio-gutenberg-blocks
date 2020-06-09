/* WordPress dependencies */
const { __ } = wp.i18n;
const TEMPLATE = [ [ 'core/cover' ], [ 'core/image' ] ];

import { RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
const { PanelBody, SelectControl } = wp.components;

const BlockEdit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { geo } = attributes;

	return (
		<div>
			<div className="wp-block-gutenberg-hero-banner-block">
				<div className="editor-text-input">
					<RichText
						tagName="h3"
						value={ props.attributes.title }
						onChange={ ( title ) => props.setAttributes( { title } ) }
						placeholder={ __( 'Hero Banner Title..', 'gutenberg' ) }
					/>
				</div>
				<div className="editor-img-input">
					<InnerBlocks template={ TEMPLATE } templateLock="all" />
				</div>
				<div className="editor-text-input">
					<RichText
						tagName="p"
						value={ props.attributes.url }
						onChange={ ( url ) => props.setAttributes( { url } ) }
						placeholder={ __( 'Hero Banner URL..', 'gutenberg' ) }
					/>
				</div>
			</div>

			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ 'Country' }>
					<SelectControl
						label={ __( 'Target Country', 'gutenberg' ) }
						value={ geo }
						options={ [
							{ value: 'all', label: __( 'All' ) },
							{ value: 'uk-only', label: __( 'United Kingdom' ) },
							{ value: 'us-only', label: __( 'United States of America' ) },
						] }
						onChange={ ( newVal ) => {
							setAttributes( { geo: newVal } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
};

export default BlockEdit;
