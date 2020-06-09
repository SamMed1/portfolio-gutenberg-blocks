/* WordPress dependencies */
const { __ } = wp.i18n;
const TEMPLATE = [ [ 'core/image' ] ];

import { RichText, InnerBlocks, URLInput, InspectorControls } from '@wordpress/block-editor';

const { CheckboxControl, PanelBody } = wp.components;

const BlockEdit = ( props ) => {
	return (
		<div>
			<div className="wp-block-gutenberg-game-block">
				<div className="editor-img-input">
					<InnerBlocks template={ TEMPLATE } templateLock="all" />
				</div>
				<div className="editor-text-input">
					<URLInput
						tagName="p"
						value={ props.attributes.url }
						onChange={ ( url ) => props.setAttributes( { url } ) }
						placeholder={ __( 'Insert s3 Game URL here..', 'gutenberg' ) }
					/>
				</div>
				<div className="editor-text-input">
					<RichText
						tagName="h1"
						value={ props.attributes.title }
						onChange={ ( title ) => props.setAttributes( { title } ) }
						placeholder={ __( 'Game Block Title..', 'gutenberg' ) }
					/>
				</div>
				<div className="editor-text-input">
					<RichText
						tagName="div"
						value={ props.attributes.description }
						onChange={ ( description ) => props.setAttributes( { description } ) }
						placeholder={ __( 'Game Block Description..', 'gutenberg' ) }
						multiline="p"
					/>
				</div>
			</div>

			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ 'Is this a Portrait only game?' }>
					<CheckboxControl
						value={ props.attributes.orientation }
						onChange={ ( orientation ) => props.setAttributes( { orientation } ) }
						checked={ props.attributes.orientation }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
};

export default BlockEdit;
