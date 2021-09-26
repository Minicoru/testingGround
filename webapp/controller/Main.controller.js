sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
	'use strict';

	return Controller.extend('testing.testingGround.controller.Main', {
		onInit: function () {
			//* Create ODATA model

			var url = '/sap/opu/odata/SAP/<service>/';

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData([]);
			// oModel = new sap.ui.model.odata.ODataModel();
			// url, true

			//* Create Items Aggregation for Table

			this.getView()
				.byId('idtable')
				.bindAggregation(
					'items',
					'/<EntitySet>',

					new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: '{Ebeln}'
							}),

							new sap.m.Text({
								text: '{Bstyp}'
							}),

							new sap.m.Text({
								text: '{Bsart}'
							}),

							new sap.m.Text({
								text: '{Statu}'
							}),

							new sap.m.Text({
								text: '{Aedat}'
							}),

							new sap.m.Text({
								text: '{Ernam}'
							})
						]
					})
				);

			//* Set ODATA Model to Table

			this.getView().setModel(oModel);

			this.getView().byId('idtable').setModel(oModel);
		},
		//

		exportCSV:
			sap.m.Table.prototype.exportData ||
			function (oEvent) {
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ';'
					}),

					models: this.getView().getModel(),

					rows: {
						path: '/<EntitySet>'
					},

					columns: [
						{
							name: 'Purchasing Doc.',

							template: {
								content: '{Ebeln}'
							}
						},
						{
							name: 'Purchasing Doc. Category',

							template: {
								content: '{Bstyp}'
							}
						},
						{
							name: 'Purchasing Doc. Type',

							template: {
								content: '{Bsart}'
							}
						},
						{
							name: 'Status',

							template: {
								content: '{Statu}'
							}
						},
						{
							name: 'Created on',

							template: {
								content: '{Aedat}'
							}
						},
						{
							name: 'Created by',

							template: {
								content: '{Ernam}'
							}
						}
					]
				});

				//* download exported file

				oExport.saveFile().always(function () {
					this.destroy();
				});
			}

		//
	});
});
