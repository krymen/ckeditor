/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	// This function is to be called under a "walker" instance scope.
	function iterate( rtl, breakOnFalse )
	{
		// Return null if we have reached the end.
		if ( this._.end )
			return null;

		var node,
			range = this.range,
			guard,
			userGuard = this.guard,
			type = this.type,
			getSourceNodeFn = ( rtl ? 'getPreviousSourceNode' : 'getNextSourceNode' );

		// This is the first call. Initialize it.
		if ( !this._.start )
		{
			this._.start = 1;
			
			// Trim text nodes and optmize the range boundaries. DOM changes
			// may happen at this point.
			range.trim();

			// A collapsed range must return null at first call.
			if ( range.collapsed )
			{
				this.end();
				return null;
			}
		}

		// Create the LTR guard function, if necessary.
		if ( !rtl && !this._.guardLTR )
		{
			// Gets the node that stops the walker when going LTR.
			var limitLTR = range.endContainer,
				blockerLTR = limitLTR.getChild( range.endOffset );
			
			this._.guardLTR = function( node, movingOut )
			{
				return ( ( !movingOut || !limitLTR.equals( node ) )
					&& ( !blockerLTR || !node.equals( blockerLTR ) ) 
					&& ( node.type != CKEDITOR.NODE_ELEMENT || node.name != 'body' ) );
			}
		}
		
		// Create the RTL guard function, if necessary.
		if ( rtl && !this._.guardRTL )
		{
			// Gets the node that stops the walker when going LTR.
			var limitRTL = range.startContainer,
				blockerRTL = ( range.startOffset > 0 ) && limitRTL.getChild( range.startOffset - 1 );
			
			this._.guardRTL = function( node, movingOut )
			{
				return ( ( !movingOut || !limitRTL.equals( node ) )
					&& ( !blockerRTL || !node.equals( blockerRTL ) ) 
					&& ( node.type != CKEDITOR.NODE_ELEMENT || node.name != 'body' ) );
			}
		}
		
		// Define which guard function to use.
		stopGuard = rtl ? this._.guardRTL : this._.guardLTR;

		// Make the user defined guard function participate in the process,
		// otherwise simply use the boundary guard.
		if ( userGuard )
		{
			guard = function( node, movingOut )
			{
				if ( stopGuard( node, movingOut ) === false )
					return false;

				return userGuard( node );
			}
		}
		else
			guard = stopGuard;

		if ( this.current )
			node = this.current[ getSourceNodeFn ]( false, type, guard );
		else
		{
			// Get the first node to be returned.

			if ( rtl )
			{
				node = range.endContainer;
				
				if ( range.endOffset > 0 )
				{
					node = node.getChild( range.endOffset - 1 );
					if ( guard( node ) === false )
						node = null;
				}
				else
					node = node.getPreviousSourceNode( true, type, guard );
			}
			else
			{
				node = range.startContainer;
				node = node.getChild( range.startOffset );

				if ( node )
				{
					if ( guard( node ) === false )
						node = null;
				}
				else
					node = range.startContainer.getNextSourceNode( true, type, guard );
			}
		}

		while ( node && !this._.end )
		{
			this.current = node;

			if ( !this.evaluator || this.evaluator( node ) !== false )
				return node;
			else if ( breakOnFalse && this.evaluator )
				return false;

			node = node[ getSourceNodeFn ]( false, type, guard );
		}

		this.end();
		return this.current = null;
	}

//	function iterateToLast( rtl )
//	{
//		var node, last = null;

//		while ( node = iterate.call( this, rtl ) )
//			last = node;

//		return last;
//	}

	CKEDITOR.dom.walker = CKEDITOR.tools.createClass(
	{
		/**
		 * Utility class to "walk" the DOM inside a range boundaries. If
		 * necessary, partially included nodes (text nodes) are broken to
		 * reflect the boundaries limits, so DOM and range changes may happen.
		 * Outside changes to the range may break the walker.
		 *
		 * The walker may return nodes that are not totaly included into the
		 * range boundaires. Let's take the following range representation,
		 * where the square brackets indicate the boundaries:
		 *
		 * [&lt;p&gt;Some &lt;b&gt;sample] text&lt;/b&gt;
		 *
		 * While walking forward into the above range, the following nodes are
		 * returned: &lt;p&gt;, "Some ", &lt;b&gt; and "sample". Going
		 * backwards instead we have: "sample" and "Some ". So note that the
		 * walker always returns nodes when "entering" them, but not when
		 * "leaving" them. The guard function is instead called both when
		 * entering and leaving nodes.
		 *
		 * @constructor
		 * @param {CKEDITOR.dom.range} range The range within which walk.
		 */
		$ : function( range )
		{
			this.range = range;

			/**
			 * A function executed for every matched node, to check whether
			 * it's to be considered into the walk or not. If not provided, all
			 * matched nodes are considered good.
			 * If the function returns "false" the node is ignored.
			 * @name CKEDITOR.pluginDefinition.prototype.evaluator
			 * @property
			 * @type Function
			 */
			// this.evaluator = null;

			/**
			 * A function executed for every node the walk pass by to check
			 * whether the walk is to be finished. It's called when both
			 * entering and exiting nodes, as well as for the matched nodes.
			 * If this function returns "false", the walking ends and no more
			 * nodes are evaluated.
			 * @name CKEDITOR.pluginDefinition.prototype.guard
			 * @property
			 * @type Function
			 */
			// this.guard = null;

			/** @private */
			this._ = {};
		},

//		statics :
//		{
//			/* Creates a CKEDITOR.dom.walker instance to walk inside DOM boundaries set by nodes.
//			 * @param {CKEDITOR.dom.node} startNode The node from wich the walk
//			 *		will start.
//			 * @param {CKEDITOR.dom.node} [endNode] The last node to be considered
//			 *		in the walk. No more nodes are retrieved after touching or
//			 *		passing it. If not provided, the walker stops at the
//			 *		&lt;body&gt; closing boundary.
//			 * @returns {CKEDITOR.dom.walker} A DOM walker for the nodes between the
//			 *		provided nodes.
//			 */
//			createOnNodes : function( startNode, endNode, startInclusive, endInclusive )
//			{
//				var range = new CKEDITOR.dom.range();
//				range.setStartAt( startNode, startInclusive ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END ) ;

//				if ( endNode )
//					range.setEndAt( endNode, endInclusive ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START ) ;
//				else
//					range.setEndAt( startNode.getDocument().getBody(), CKEDITOR.POSITION_BEFORE_END ) ;

//				return new CKEDITOR.dom.walker( range );
//			}
//		},

		proto :
		{
			/**
			 * Stop walking. No more nodes are retrieved if this function gets
			 * called.
			 */
			end : function()
			{
				this._.end = 1;
			},

			/**
			 * Retrieves the next node (at right).
			 * @returns {CKEDITOR.dom.node} The next node or null if no more
			 *		nodes are available.
			 */
			next : function()
			{
				return iterate.call( this );
			},
			
			/**
			 * Retrieves the previous node (at left).
			 * @returns {CKEDITOR.dom.node} The previous node or null if no more
			 *		nodes are available.
			 */
			previous : function()
			{
				return iterate.call( this, true );
			},

			/**
			 * Check all nodes at right, executing the evaluation fuction.
			 * @returns {Boolean} "false" if the evaluator function returned
			 *		"false" for any of the matched nodes. Otherwise "true".
			 */
			checkForward : function()
			{
				return iterate.call( this, false, true ) !== false;
			},

			/**
			 * Check all nodes at left, executing the evaluation fuction.
			 * @returns {Boolean} "false" if the evaluator function returned
			 *		"false" for any of the matched nodes. Otherwise "true".
			 */
			checkBackward : function()
			{
				return iterate.call( this, true, true ) !== false;
			}

// The following features have been originally included in the implementation,
// but they are not used anywhere in the code, so they got commented out.

//			/**
//			 * Executes a full walk forward (to the right), until no more nodes
//			 * are available, returning the last valid node.
//			 * @returns {CKEDITOR.dom.node} The last node at the right or null
//			 *		if no valid nodes are available.
//			 */
//			lastForward : function()
//			{
//				return iterateToLast.call( this );
//			},

//			/**
//			 * Executes a full walk backwards (to the left), until no more nodes
//			 * are available, returning the last valid node.
//			 * @returns {CKEDITOR.dom.node} The last node at the left or null
//			 *		if no valid nodes are available.
//			 */
//			lastBackward : function()
//			{
//				return iterateToLast.call( this, true );
//			}
		}
	});
})();
