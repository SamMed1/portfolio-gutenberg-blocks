import { RichText, InnerBlocks } from '@wordpress/block-editor';

const BlockSave = ( props ) => {
	return (
		<div>
			<RichText.Content tagName="p" value={ props.attributes.question } />
			<InnerBlocks.Content />
			<RichText.Content tagName="p" value={ props.attributes.answer } />
		</div>
	);
};

export default BlockSave;
