const { __ } = wp.i18n;

import { RichText, InnerBlocks } from '@wordpress/block-editor';

const BlockSave = ( props ) => {
	const { geoSelection, title } = props.attributes;

	return (
		<section className={ __( 'wp-block-gutenberg-brick-shelf-block ' ) + geoSelection }>
			<RichText.Content tagName="h1" className="o-container" value={ title } />
			<div className="o-carousel__wrapper brick-shelf-block-nav-wrapper">
				<button
					className="o-carousel-button o-carousel-button__previous o-carousel-button--disabled"
					disabled=""
					type="button"
					aria-label="View previous navigation items"
				></button>
				<nav className={ __( 'brick-shelf-block__nav o-carousel', 'gutenberg' ) }>
					<InnerBlocks.Content />
				</nav>
				<button
					className="o-carousel-button o-carousel-button__next"
					type="button"
					aria-label="View more navigation items"
				></button>
			</div>
		</section>
	);
};

export default BlockSave;
