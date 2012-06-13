enyo.kind({
    name: "sfeast.SelectableRepeater",
	kind: enyo.Repeater, //inherit from standard Repeater kind
	published: {
		itemSelected: null, //currently selected item
		selectColor: "lightblue" //select color (used for row background color)
	},
	handlers: {
		onRowSelected: "rowSelected" //called when one of our proxy objects is tapped
	},
	//override the standard Repeater's build function
	build: function() {
		this.destroyClientControls();
		for (var i=0, c; i<this.count; i++) {
			c = this.createComponent({kind: "sfeast.OwnerProxy", index: i, selected: false, selectedColor:this.selectColor});
			// do this as a second step so 'c' is the owner of the created components
			c.createComponents(this.itemComponents);
			// invoke user's setup code
			this.doSetupItem({index: i, item: c});
		}
		this.render();	
	},
	//when a proxy object is tapped
	rowSelected: function(inSender,inEvent){
		this.setItemSelected(inEvent.index);
	},
	//update the selected item's state + de-select the old item
	itemSelectedChanged: function(oldValue) {
		if (this.itemSelected !== null) {
	 		this.controlAtIndex(this.itemSelected).setSelected(true);			
		}

		if (oldValue !== null) {
	 		this.controlAtIndex(oldValue).setSelected(false);						
		}
	},	
	//toggle the state of a particular item
	toggle: function(index) {		
		//get the toggled state & then set it
		var newState = !this.controlAtIndex(index).getSelected();
		this.controlAtIndex(index).setSelected(newState);
			
		//set the new itemSelected (or remove it if we just toggled the current one)
		this.setItemSelected(newState ? index : null);
	},
	//de-select a specific item
	deSelectItem: function(index) {
		if (index == this.itemSelected){
			this.toggle(index);
		}
	},	
	//give the new color to all rows
	selectColorChanged: function(oldValue) {
		for (var i=0; i<this.count; i++) {
	 		this.controlAtIndex(i).setSelectedColor(this.selectColor);
		}
	}
});


//overriding the default ownerproxy kind to give it selectable properties & to send an event when the row is selected
enyo.kind({
	name: "sfeast.OwnerProxy",
	kind: "enyo.OwnerProxy",
	events: {
		onRowSelected: ""
	},
	published: {
		selected: "",
		selectedColor: ""
	},
	handlers: {
		ontap: "rowSelected"
	},
	//send the rowSelected event for the owning repeater
	rowSelected: function(inSender, inEvent) {
		this.doRowSelected(inSender, inEvent);
	},
	selectedChanged: function(inSender, inEvent){
		var highlight = this.selected ? this.selectedColor : null;
		this.children[0].applyStyle("background-color", this.selected ? this.selectedColor : null);
	},
	selectedColorChanged: function(oldValue){
		this.children[0].applyStyle("background-color", this.selected ? this.selectedColor : null);
	}
});