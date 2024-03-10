$(document).ready(() => {
	$("#data-table").dataTable({
		"columnDefs": [
			{ "sortable": false, "targets": [2, 3] }
		]
	});
})