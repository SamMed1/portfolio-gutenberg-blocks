import { RichText, InnerBlocks } from '@wordpress/block-editor';

const BlockSave = ( props ) => {
	const baseURL = window.location.origin + '/keyword-list/';
	return (
		<a href={ baseURL + props.attributes.term }>
			<div className="hub-links-block__image">
				<InnerBlocks.Content />
			</div>
			<div className="hub-links-block-content">
				<div className="hub-links-block-content__text">
					<RichText.Content tagName="h3" value={ props.attributes.title } />
					<RichText.Content tagName="h2" value={ props.attributes.description } />
				</div>
				<div className="hub-links-icon">
					<i className="icon icon--notext"></i>
				</div>
			</div>
		</a>
	);
};

export default BlockSave;
