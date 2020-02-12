/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/documentcolorcollection
 */

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

/**
 * A collection to store document colors. It enforces colors to be unique.
 *
 * @mixes module:utils/observablemixin~ObservableMixin
 * @extends module:utils/collection~Collection
 */
export default class DocumentColorCollection extends Collection {
	constructor( ...args ) {
		super( ...args );

		/**
		 * Indicates whether the document color collection is empty.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean} #isEmpty
		 */
		this.set( 'isEmpty', !this.length );
	}

	/**
	 * Adds a color (or colors) to the document color collection.
	 *
	 * This method ensures that no color duplicates are inserted (compared using
	 * the color value of the {@link module:ui/colorgrid/colorgrid~ColorDefinition}).
	 *
	 * If the item does not have an ID, it will be automatically generated and set on the item.
	 *
	 * @chainable
	 * @param {...(module:ui/colorgrid/colorgrid~ColorDefinition)} items
	 * @param {Number} [index] The position of the color (or colors) in the collection. Colors
	 * are pushed to the collection when `index` is not specified.
	 * @fires add
	 */
	add( ...args ) {
		let items = args;

		// No duplicates are allowed.
		items = items.filter( ( item, index ) => {
			// Don't filter out the add index (last argument).
			if ( index === items.length - 1 && typeof item === 'number' ) {
				return true;
			}

			return !this.find( element => element.color === item.color );
		} );

		if ( items.length ) {
			super.add( ...items );
		}

		this.set( 'isEmpty', !this.length );

		return this;
	}

	/**
	 * @inheritdoc
	 */
	remove( subject ) {
		const ret = super.remove( subject );

		this.set( 'isEmpty', !this.length );

		return ret;
	}

	/**
	 * Checks if an object with given colors is present in the document color collection.
	 *
	 * @param {String} color
	 * @returns {Boolean}
	 */
	hasColor( color ) {
		return !!this.find( item => item.color === color );
	}
}

mix( DocumentColorCollection, ObservableMixin );
