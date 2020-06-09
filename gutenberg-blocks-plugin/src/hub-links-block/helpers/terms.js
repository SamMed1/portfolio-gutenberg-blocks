/* Terms Helper */
export default function( response ) {
	const termsList = [ { label: 'Keywords list', value: 'any' } ];
	const filteredTerms = Object.values( response ).map( ( term ) => ( {
		label: term.name,
		value: term.slug,
	} ) );

	return [ ...termsList, ...filteredTerms ];
}
