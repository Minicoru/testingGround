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

		onAfterRendering: function () {
			var oModelOdata = new sap.ui.model.odata.v2.ODataModel('/sap/opu/odata/sap/ZE2E_SRV', false);

			// oModelOdata.attachRequestSent(function onSent(oEvent) {
			// 	that._dialog.open();
			// });
			// oModelOdata.attachRequestCompleted(function onCompleted(oEvent) {
			// 	that._dialog.close();
			// });
			// oModelOdata.attachRequestFailed(function onFailed(oEvent) {
			// 	that._dialog.close();
			// });
			oModelOdata.read("/FilesSet(guid'0050569C-33D0-1EEC-A083-2F3D8CFE5B76')/$value");
			// $.ajax({
			// 	url: "/sap/opu/odata/SAP/ZE2E/FilesSet(guid'0050569C-33D0-1EEC-A083-2F3D8CFE5B76')/$value",
			// 	success: function (data) {
			// 		console.log(data);
			// 	},
			// 	error: function (err) {
			// 		console.log(err);
			// 	}
			// });
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
