//Based on SelectableRepeater but allows for multi-selectable rows
enyo.kind({
    name: "sfeast.MultiSelectableRepeater",
	kind: sfeast.SelectableRepeater,
	//override the SelectableRepeater's rowSelected function to prevent de-selecting other rows
	rowSelected: function(inSender, inEvent) {
		var index = inEvent.index;			
		//invert the selection state of the tapped repeater item										
 		this.controlAtIndex(index).setSelected(!this.controlAtIndex(index).getSelected());											
	},
	//override the SelectableRepeater's toggle function to prevent de-selecting other rows
	toggle: function(index) {
 		this.controlAtIndex(index).setSelected(!this.controlAtIndex(index).getSelected());
	},
	//override the itemSelectedChanged function to only set items (ie do not unselect previously selected items)
	itemSelectedChanged: function(oldValue) {
		this.inherited(arguments);
		this.itemSelected = null;		
	},	
	//de-select a specific item
	deSelectItem: function(index) {
 		this.controlAtIndex(index).setSelected(false);
	},	
	//get all selected items
	getSelectedItems: function(){
		var selected = [];
		for (var i=0; i<this.count; i++) {
			selected.push(this.controlAtIndex(i).getSelected());
		}
		return selected;
	}
});