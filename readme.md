SelectableRepeater for Enyo 2
====================

Version
-----

1.0


About
-----

These are repeater controls for Enyo 2 that allow for selectable rows. The SelectableRepeater kind allows for single row selections while the MultiSelectableRepeater kind allows for multiple row selections.


How to Use
----------

Just include the SelectableRepeaters lib:

	<script src="../../SelectableRepeaters/package.js" type="text/javascript"></script>


Then instantiate the SelectableRepeater or MultiSelectableRepeater kind:

	{name: "rep", kind: "sfeast.SelectableRepeater", rows: 10, onSetupRow: "setupEntries", components:[
	   {content: "blah"}
	]}
	
	OR
	
	{name: "rep", kind: "sfeast.MultiSelectableRepeater", rows: 10, onSetupRow: "setupEntries", components:[
	   {content: "blah"}
	]}

Where {content: "blah"}	can be replaced with custom components, controls, etc - just as with a standard Repeater.
		
Note that the example uses the Fittable & Onyx libs, but they aren't required for use of SelectableRepeater.


Properties
----------

- itemSelected -> Integer: Selected item.
- selectColor -> String: Row background color (ie row selection color), default is lightblue.

Methods
-------
	
- .toggle( index ) -> Toggles a row selection state.
- .getItemSelected( ) -> Returns the currently selected item. Applies to SelectableRepeater only.
- .setItemSelected( index ) -> Selects an item.
- .deSelectItem( index ) -> Deselects a single row.
- .getSelectedItems ( ) -> Returns an array with boolean values indicating the selection state of all rows. Applies to MultiSelectableRepeater only.
- .setSelectColor ( string ) -> Set the select color (row background color).

Demos
-----

- http://apps.stevenf.webfactional.com/examples/enyo/SelectableRepeaters/examples/SelectableRepeater/
- http://apps.stevenf.webfactional.com/examples/enyo/SelectableRepeaters/examples/MultiSelectableRepeater/

Changelog
---------

1.0 - Initial release