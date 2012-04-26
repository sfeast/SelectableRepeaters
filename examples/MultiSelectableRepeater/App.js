// Define a kind for the item to use in the SelectableRepeater.
enyo.kind({
    name: "Item",
    events: {
        onItemTap: "",
    },
	style: "height: 60px;border-top:1px white solid;border-bottom:1px lightgray solid",
    components: [
			{content: "", style: "padding: 20px;float:left;"},
			{kind: "Button", ontap: "buttonTap", style: "margin-left:50px;margin-top:15px;"}
    ],
	buttonTap: function() {
		this.doItemTap();
		return true; // prevents a button tap from interferring with row selection
	}
});

enyo.kind({
	name: "App",
	components: [
	{kind: "FittableRows", classes: "enyo-fit", components: [
		{kind: "onyx.Toolbar", content: "MultiSelectableRepeater Demo", style: "background-color: #2B4E69;"},
        {name: "info", content: "No buttons clicked yet", style: "padding: 8px;"},

			{name: "scroll", kind: "Scroller", fit: true, components: [
		        {name: "rep", kind: "sfeast.MultiSelectableRepeater", rows: 10, onSetupRow: "setupEntries", components:[
		           {kind: "Item"}
		        ]}
	        ]},
		
			{kind: "onyx.Button", ontap: "toggleItem", content: "Toggle Item #2", style: "margin: 6px;"},{tag: "br"},
			{kind: "onyx.Button", ontap: "selectItem", content: "Select Item #3", style: "margin: 6px;"},{tag: "br"},
			{kind: "onyx.Button", ontap: "deSelectItem", content: "De-Select Item #3", style: "margin: 6px;"},{tag: "br"},			
			{style: "white-space:nowrap;", components: [
				{kind: "onyx.Button", ontap: "getSelected", content: "Get Selected Array", style: "margin: 6px 4px 0px 6px;"},{tag: "br"},
				{kind: "onyx.Button", ontap: "updateSelectColor", content: "Update Select Color", style: "margin: 6px 4px 0px 6px;"},
				{kind: "onyx.Input", name: "color", value: "lightblue", style: "margin: 6px 4px 0px 6px;"},
				{tag: "br"},
				{name: "getSelectedResult", style: "padding:10px; display:inline;"}
			]}
		]}
	],
    handlers: {
        onItemTap: "itemTap" //deals with our item button presses (ie not specific to SelectableRepeater)
    },
    create: function() {
        this.inherited(arguments);
        this.$.rep.build();
    },
    setupEntries: function(inSender, inEvent) {
        inEvent.row.$.item.$.control.setContent("Row " + inEvent.index);
        inEvent.row.$.item.$.button.setContent("Button " + inEvent.index);
    },
    itemTap: function(inSender, inEvent) {	
		var index = inEvent.originator.owner.rowIndex;
        // originator is the Item, it's owner is a wrapper object that repeater creates
        this.$.info.setContent("Button " + index + " clicked");
    },		
	toggleItem: function() {
		this.$.rep.toggle(2);
	},
	selectItem: function() {
		this.$.rep.setItemSelected(3);
	},
	deSelectItem: function(inSender, inEvent) {
		this.$.rep.deSelectItem(3);
	},
	getSelected: function(inSender, inEvent) {
		this.$.getSelectedResult.setContent(this.$.rep.getSelectedItems());
	},
	updateSelectColor: function(){
		this.$.rep.setSelectColor(this.$.color.getValue())
	}
});
