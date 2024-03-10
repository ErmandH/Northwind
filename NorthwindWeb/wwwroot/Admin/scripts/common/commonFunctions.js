function validateForm(formId,obj) {
    $(`#${formId}`).validate({
        rules: obj.rules, // end of rules
        messages: obj.messages,
        validClass: "is-valid",
        errorClass: "error-label is-invalid"
    })
}

function getValueFromName(inputName) {
    return $(`[name=${inputName}]`).val()
}

function getFileInputFromName(inputName) {
    const fileInput = $(`input[name=${inputName}]`)[0];
    const file = fileInput1.files[0];
    return file
}

function getPostData(opt) {
    const fdata = new FormData();
    for (var name in opt.inputNameArray) {
        fdata.append(name, getValueFromName(name));
    }
    if (opt.fileInputNameArray) {
        for (var fileInputName in opt.fileInputNameArray) {
            const fileData = getFileInputFromName(fileInputName)
            fdata.append(fileInputName, fileData)
        }
    }
    
    return fdata;
}

function submitForm(formId, opt) {
    $(`#${formId}`).submit(function (e) {
        e.preventDefault();
        if ($(`#${formId}`).valid() === false)
            return;
        const fdata = getPostData({ fileInputNameArray: opt.fileInputNameArray, inputNameArray: opt.fileInputNameArray });
        doRequest({
            url: opt.url,
            data: fdata,
            href: opt.href,
        })
    })
}
    

function doRequest(opt) {
    $.ajax({
        url: opt.url,
        type: 'POST',
        data: opt.data,
        processData: false,
        contentType: false,
        success: () => {
            Swal.fire({
                title: 'Başarıyla Eklendi!',
                icon: 'success',
                confirmButtonText: 'Tamam'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = opt.href
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
