import { InnerBlocks } from '@wordpress/block-editor';

const BlockSave = ( props ) => {
	const geoSelection = props.attributes.geo;
	return (
		<a
			href={ props.attributes.url }
			className={ 'wp-block-gutenberg-hero-banner-block ' + geoSelection }
		>
			<div className="hero-banner-block__image">
				<InnerBlocks.Content />
			</div>
		</a>
	);
};

export default BlockSave;
