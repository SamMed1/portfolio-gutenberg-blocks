const { registerBlockType } = wp.blocks;

// Import our blocks.
import * as jokeBlock from './joke-block';
import * as jokesGroupBlock from './jokes-group-block';
import * as hubLinksBlock from './hub-links-block';
import * as brickShelfBlock from './brick-shelf';
import * as heroBannerBlock from './hero-banner-block';
import * as spotlightBlock from './spotlight-block';
import * as gameBlock from './game-block';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { settings, name } = block;
	registerBlockType( name, settings );
};

// Register blocks.
[
	jokeBlock,
	jokesGroupBlock,
	hubLinksBlock,
	brickShelfBlock,
	heroBannerBlock,
	spotlightBlock,
	gameBlock,
].forEach( registerBlock );
