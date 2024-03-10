$(document).ready(() => {
    validateForm('form-submit', {
        rules: {
            Name: {
                required: true,
            },
            StudentCount: {
                required: true,
                digits:true
            }
        },
        messages: {
            Name: {
                required: "Lütfen okulun ismini giriniz",
                maxlength: jQuery.validator.format("En fazla {0} karakter olmalıdır")
            }
        },
    })
    submitForm('form-submit', {
        inputNameArray: ['Name', 'StudentCount'],
        url: '/admin/school/add',
        href:'/admin/school/list'
    })
    //$('#form-submit').validate({
    //    rules: {
    //        Name: {
    //            required: true,
    //        },
    //        StudentCount: {
    //            required: true,
    //            digits:true
    //        }
    //    }, // end of rules
    //    messages: {
    //        Name: {
    //            required: "Lütfen okulun ismini giriniz",
    //            maxlength: jQuery.validator.format("En fazla {0} karakter olmalıdır")
    //        }
    //    },
    //    validClass: "is-valid",
    //    errorClass: "error-label is-invalid"
    //})

    //$('#form-submit').submit(function (e) {
    //    e.preventDefault();
    //    if ($('#form-submit').valid() === false)
    //        return;
    //    const fdata = new FormData();

    //    fdata.append('Name', $('input[name=Name]').val())
    //    fdata.append('StudentCount', $('input[name=StudentCount]').val())

    //    doRequest(fdata)
    //})

    //function doRequest(payload) {
    //    $.ajax({
    //        url: '/admin/school/add',
    //        type: 'POST',
    //        data: payload,
    //        processData: false,
    //        contentType: false,
    //        success: () => {
    //            Swal.fire({
    //                title: 'Başarıyla Eklendi!',
    //                icon: 'success',
    //                confirmButtonText: 'Tamam'
    //            }).then((result) => {
    //                if (result.isConfirmed) {
    //                    window.location.href = "/admin/school/list"
    //                }
    //            })
    //        },
    //        error: (response) => {
    //            Swal.fire({
    //                title: 'Hata!',
    //                //text: 'Lütfen bilgileri doğru girdiğinizden emin olun',
    //                text: response.responseJSON.errorMessage,
    //                icon: 'error',
    //                confirmButtonText: 'Tamam'
    //            })
    //        }
    //    })
    //}
})


