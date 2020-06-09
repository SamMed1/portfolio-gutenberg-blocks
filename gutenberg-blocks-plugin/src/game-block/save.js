import { RichText, InnerBlocks } from '@wordpress/block-editor';

const BlockSave = ( props ) => {
	const { attributes } = props;
	const { orientation } = attributes;
	return (
		<div className="wp-block-gutenberg-game-block">
			<div className="wp-block-gutenberg-game-block__upper">
				<button className="wp-block-gutenberg-game-block-cover-image">
					<InnerBlocks.Content />
				</button>
				<div className="wp-block-gutenberg-game-block-game">
					<iframe
						title="Game"
						src={ props.attributes.url }
						className="wp-block-gutenberg-game-block-iframe"
						frameBorder="0"
						scrolling="no"
						allowFullScreen
					/>
				</div>
			</div>
			<div className="wp-block-gutenberg-game-block__lower">
				<h1>{ props.attributes.title }</h1>
				<RichText.Content tagName="p" value={ attributes.description } />
			</div>
			{ orientation && orientation === true && (
				<div className="portrait-only">
					<a className="portrait-only__close" href="/categories/games">
						Close
					</a>
					<p>Please rotate your device</p>
					<img
						alt="rotate"
						src="/wp-content/client-mu-plugins/gutenberg-blocks/images/rotate-device.svg"
					/>
				</div>
			) }
		</div>
	);
};

export default BlockSave;
