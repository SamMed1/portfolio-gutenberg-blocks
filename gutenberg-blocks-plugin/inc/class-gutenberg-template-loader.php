<?php
namespace gutenberg\Blocks;

/**
 * Template loader.
 */
class gutenberg_Template_Loader extends Gamajo_Template_Loader {

	/**
	 * Prefix for filter names.
	 *
	 * @var string
	 */
	protected $filter_prefix = 'ui';

	/**
	 * Directory name where templates should be found into the theme.
	 *
	 * @var string
	 */
	protected $theme_template_directory = 'template-parts/cards';

	/**
	 * Directory name of where the templates are stored into the plugin.
	 *
	 * @var string
	 */
	protected $plugin_template_directory = 'src/template-parts/cards';
}
