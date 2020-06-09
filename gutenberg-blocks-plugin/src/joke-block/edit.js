/* WordPress dependencies */
import { RichText, InnerBlocks } from '@wordpress/block-editor';

const { __ } = wp.i18n;
const TEMPLATE = [ [ 'core/image' ] ];

const BlockEdit = ( props ) => {
	const { className } = props;

	return (
		//this must contain the block classname as then style versions are applied to that
		<div className={ `${ className }` }>
			<div className="editor-text-input">
				<RichText
					tagName="p"
					value={ props.attributes.question }
					onChange={ ( question ) => props.setAttributes( { question } ) }
					placeholder={ __( 'Add joke here..', 'gutenberg' ) }
				/>
			</div>
			<InnerBlocks template={ TEMPLATE } templateLock="all" />
			<div className="editor-text-input">
				<RichText
					tagName="p"
					value={ props.attributes.answer }
					onChange={ ( answer ) => props.setAttributes( { answer } ) }
					placeholder={ __( 'Add the punchline here. Make it funny!', 'gutenberg' ) }
				/>
			</div>
		</div>
	);
};

export default BlockEdit;
