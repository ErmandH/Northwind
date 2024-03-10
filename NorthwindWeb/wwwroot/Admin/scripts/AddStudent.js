$(document).ready(() => {
    $('#form-submit').validate({
        rules: {
            Name: {
                required: true,
            },
            Surname: {
                required: true,
            },
            Image: {
                required: true,
                accept: "image/jpeg, image/pjpeg, image/png"
            },
            School: {
                required:true
            }
        }, // end of rules
        messages: {
            Name: {
                required: "Lütfen okulun ismini giriniz",
                maxlength: jQuery.validator.format("En fazla {0} karakter olmalıdır")
            }
        },
        validClass: "is-valid",
        errorClass: "error-label is-invalid"
    })

    $('#form-submit').submit(function (e) {
        e.preventDefault();
        if ($('#form-submit').valid() === false)
            return;
        const fdata = new FormData();
        const fileInput1 = $('input[name=Image]')[0];
        const file1 = fileInput1.files[0];

        fdata.append('Name', $('input[name=Name]').val())
        fdata.append('Surname', $('input[name=Surname]').val())
        fdata.append("Image", file1);
        fdata.append('SchoolId', $('select[name=School]').val())

        doRequest(fdata)
    })

    function doRequest(payload) {
        $.ajax({
            url: '/admin/school/add',
            type: 'POST',
            data: payload,
            success: () => {
                Swal.fire({
                    title: 'Başarıyla Eklendi!',
                    icon: 'success',
                    confirmButtonText: 'Tamam'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/admin/school/list"
                    }
                })
            },
            error: (response) => {
                Swal.fire({
                    title: 'Hata!',
                    //text: 'Lütfen bilgileri doğru girdiğinizden emin olun',
                    text: response.responseJSON.errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                })
            }
        })
    }


	$.uploadPreview({
		input_field: "#image-upload",   // Default: .image-upload
		preview_box: "#image-preview",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false,                // Default: false
		success_callback: null          // Default: null
	});
})