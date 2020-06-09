/* WordPress dependencies */
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;

const { PanelBody, SelectControl } = wp.components;

/* Create a template from other blocks. */
const TEMPLATE = [ [ 'core/image', { placeholder: 'Add Images and links to shelf...' } ] ];
/* only allow core images to be created */
const ALLOWED_BLOCKS = [ 'core/image' ];

const BlockEdit = ( props ) => {
	const { isSelected, attributes, setAttributes, className } = props;
	const { geoSelection } = attributes;

	return [
		isSelected && (
			<InspectorControls key={ 'inspector' }>
				<PanelBody title={ 'Section Settings' }>
					<SelectControl
						label={ __( 'Target Country', 'gutenberg' ) }
						value={ geoSelection }
						options={ [
							{ value: 'all', label: __( 'All' ) },
							{ value: 'uk-only', label: __( 'United Kingdom' ) },
							{ value: 'us-only', label: __( 'United States of America' ) },
						] }
						onChange={ ( newVal ) => {
							setAttributes( { geoSelection: newVal } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		),
		<section className={ `${ className }` } key={ 'block' }>
			<div className="editor-text-input">
				<RichText
					tagName="h1"
					value={ props.attributes.title }
					onChange={ ( title ) => props.setAttributes( { title } ) }
					placeholder={ __( 'Title..', 'gutenberg' ) }
				/>
			</div>
			<nav className={ __( 'brick-shelf-block__nav', 'gutenberg' ) }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
			</nav>
		</section>,
	];
};

export default BlockEdit;
