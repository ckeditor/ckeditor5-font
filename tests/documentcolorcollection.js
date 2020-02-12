/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import DocumentColorCollection from '../src/documentcolorcollection';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

describe( 'DocumentColorCollection', () => {
	let documentColorCollection;

	const colors = [
		{
			color: '111',
		},
		{
			color: '222'
		},
		{
			color: '333'
		},
		{
			color: '444'
		}
	];

	beforeEach( () => {
		documentColorCollection = new DocumentColorCollection( colors );
	} );

	it( 'constructor()', () => {
		expect( documentColorCollection ).to.be.instanceOf( DocumentColorCollection );
		expect( documentColorCollection ).to.be.instanceOf( Collection );
	} );

	it( 'has observable "isEmpty" parameter', () => {
		expect( documentColorCollection.isEmpty ).to.be.false;

		documentColorCollection.clear();
		expect( documentColorCollection.isEmpty ).to.be.true;

		documentColorCollection.add( colors[ 0 ] );
		expect( documentColorCollection.isEmpty ).to.be.false;
	} );

	it( 'prevent of adding duplicated colors', () => {
		expect( documentColorCollection.length ).to.equal( 4 );

		documentColorCollection.add( { color: '111' } );
		expect( documentColorCollection.length ).to.equal( 4 );
	} );

	it( 'hasColor()', () => {
		expect( documentColorCollection.hasColor( '111' ) ).to.be.true;
		expect( documentColorCollection.hasColor( '555' ) ).to.be.false;
	} );

	describe( 'add()', () => {
		it( 'supports adding multiple items at a time', () => {
			documentColorCollection = new DocumentColorCollection();

			documentColorCollection.add( colors[ 0 ] );
			documentColorCollection.add( colors[ 1 ], colors[ 2 ], 0 );

			expect( documentColorCollection.map( item => item.color ) ).to.have.ordered.members( [
				'222', '333', '111'
			] );
		} );
	} );
} );
