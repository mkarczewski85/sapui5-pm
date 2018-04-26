sap.ui.define([
	"opensap/manageproducts/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {

	"use strict";
	return BaseController.extend("opensap.manageproducts.controller.Add", {
		onInit: function() {
			this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function() {
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		_onMetadataLoaded: function() {
			// create default properties
			var oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
			};
			// create new entry in the model
			this._oContext = this.getModel().createEntry("/ProductSet", {
				properties: oProperties
			});
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},

		onCancel: function() {
			this.onNavback();
		},

		onSave: function() {
			this.getModel().submitChanges();
		},

		onNavback: function() {

			this.getModel().deleteCreatedEntry(this._oContext);
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}

	});
});