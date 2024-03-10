$('#example').DataTable({
	initComplete: function () {
		this.api()
			.columns()
			.every(function () {
				var column = this;

				// Create select element and listener
				var select = $('<select class="form-control"><option value=""></option></select>')
					.appendTo($(column.footer()).empty())
					.on('change', function () {
						column
							.search($(this).val(), { exact: true })
							.draw();
					});

				// Add list of options
				column
					.data()
					.unique()
					.sort()
					.each(function (d, j) {
						select.append(
							'<option value="' + d + '">' + d + '</option>'
						);
					});
			});
	}
});

$('#example2').DataTable({
	initComplete: function () {
		this.api()
			.columns()
			.every(function () {
				var column = this;

				// Create select element and listener
				var select = $('<select class="form-control"><option value=""></option></select>')
					.appendTo($(column.footer()).empty())
					.on('change', function () {
						column
							.search($(this).val(), { exact: true })
							.draw();
					});

				// Add list of options
				column
					.data()
					.unique()
					.sort()
					.each(function (d, j) {
						select.append(
							'<option value="' + d + '">' + d + '</option>'
						);
					});
			});
	}
});