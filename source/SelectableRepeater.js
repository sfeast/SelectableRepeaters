enyo.kind({
    name: "sfeast.SelectableRepeater",
	kind: enyo.Repeater, //inherit from standard Repeater kind
	published: {
		itemSelected: null, //currently selected item
		selectColor: "lightblue" //select color (used for row background color)
	},
	//override the standard Repeater's build function
	build: function() {
		this.destroyClientControls();
		for (var i=0; i<this.rows; i++) {
			//give the wrapping component a selected property & ontap handler to track row selections
			var c = this.createComponent({noDom: true, rowIndex: i, selected: false, ontap: "rowSelected"});
			// do this as a second step so 'c' is the owner of the created components
			c.createComponents(this.rowComponents);
			this.doSetupRow({index: i, row: c});
		}
	},
	//helper function to set the specified row to the specified selection state
	updateItemState: function(index,selected,color){
		this.children[index].selected = selected;				
		this.children[index].controls[0].applyStyle("background-color", color);	
	},
	//when one of our rows is tapped, toggle it's selection state & deselect others
	rowSelected: function(inSender, inEvent) {				
		var index = inSender.rowIndex;
	
		//invert the selection state of the tapped row
		var selected = !this.children[index].selected;
		this.updateItemState(index, selected, selected ? this.selectColor : null);
		
		//deselect all other rows
		for (var i=0; i<this.rows; i++) {
			if (i !== index) {
				this.updateItemState(i,false,null);
			}
		}
		
		//set the itemSelected (or remove it if we just toggled the current one)
		this.itemSelected = inSender.selected ? index : null;
	},
	//update the selected item's state + de-select the old item
	itemSelectedChanged: function(oldValue) {
		if (this.itemSelected !== null) {
			this.updateItemState(this.itemSelected,true,this.selectColor);
		}

		if (oldValue !== null) {
			this.updateItemState(oldValue,false,null);
		}
	},
	//toggle the state of a particular item
	toggle: function(index) {
		//toggle it's selected state
		var selected = !this.children[index].selected;
		this.updateItemState(index, selected, selected ? this.selectColor : null);
		
		//set the itemSelected (or remove it if we just toggled the current one)
		this.itemSelected = selected ? index : null;
				
		//deselect all other items
		for (var i=0; i<this.rows; i++) {
			if (i !== index) {
				this.updateItemState(i,false,null);	
			}
		}
	},
	//de-select a specific item
	deSelectItem: function(index) {
		this.updateItemState(index, false, null);
		
		if (index == this.itemSelected){
			this.itemSelected = null;
		}				
	},	
	//apply the new color to any selected rows
	selectColorChanged: function(oldValue) {
		for (var i=0; i<this.rows; i++) {
			if (this.children[i].selected) {
				this.updateItemState(i,true,this.selectColor);
			}
		}
	}
});