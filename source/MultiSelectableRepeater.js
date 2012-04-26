//Based on SelectableRepeater but allows for multi-selectable rows
enyo.kind({
    name: "sfeast.MultiSelectableRepeater",
	kind: sfeast.SelectableRepeater,
	//override the SelectableRepeater's rowSelected function to prevent de-selecting other rows
	rowSelected: function(inSender, inEvent) {
		var index = inSender.rowIndex;
								
		//invert the selection state of the tapped repeater item
		var selected = !this.children[index].selected;		
		this.updateItemState(index, selected, selected ? this.selectColor : null);
	},
	//override the SelectableRepeater's toggle function to prevent de-selecting other rows
	toggle: function(index) {
		//toggle it's selected state
		var selected = !this.children[index].selected;		
		this.updateItemState(index, selected, selected ? this.selectColor : null);
	},
	//override the itemSelectedChanged function to only set items (ie do not unselect previously selected items)
	itemSelectedChanged: function(oldValue) {
		this.inherited(arguments);
		this.itemSelected = null;			
	},	
	//get all selected items
	getSelectedItems: function(){
		var selected = [];
		for (var i=0; i<this.rows; i++) {
			selected.push(this.children[i].selected);
		}
		return selected;
	}
});