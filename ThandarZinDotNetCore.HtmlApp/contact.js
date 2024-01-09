var editId = ''
$('#btnCancel').click(function () {
    clearInput();
})

function clearInput() {
    $('#txtName').val('');
    $('#txtMobileNo').val('');
    $('#txtName').focus();
}

function successMessage(message) {
    Swal.fire({
        title: "Success!",
        text: message,
        icon: "success"
    });
}
function confirmMessage(message) {
    return new Promise(function (myResolve, myReject) {
        Notiflix.Confirm.show(
            'Confirm',
            message,
            'Yes',
            'No',
            function okCb() {
                myResolve(true);
            },
            function cancelCb() {
                myReject(false);
            }
        );
    });
}
const tblContact = 'Tbl_Contact';
$('#btnSave').click(function () {
    if (editId.length == 0) {
        create($('#txtName').val(), $('#txtMobileNo').val());
    }
    else {
        update($('#txtName').val(), $('#txtMobileNo').val());
        editId = '';
    }
})
$('#btnGo').click(function () {
    deleteItem(id);
})


function update(name, mobileNo) {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    const index = lst.findIndex(x => x.Id == editId);
    console.log({ index });
    lst[index].Name = name;
    lst[index].MobileNo = mobileNo;
    localStorage.setItem(tblContact, JSON.stringify(lst));
    successMessage("Updated Successfully.....");
    //alert("Updating Successful!");
    clearInput();
    read();
}

function create(name, mobileNo) {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    const data = {
        Id: uuidv4(),
        Name: name,
        MobileNo: mobileNo,
    };
    lst.push(data);
    localStorage.setItem(tblContact, JSON.stringify(lst));
    successMessage("Save Successfully.....");
    //alert("Saving Successful!");
    clearInput();
    read();
}

function read() {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    let rows = "";
    $(lst).each(function (index, item) {
        console.log({ index, item });
        rows += `
                <tr>
                    <td>
                        <button type="button" class="btn btn-warning btn-edit" onclick="edit('${item.Id}')">Edit</button>
                        <button type="button" class="btn btn-danger btn-delete" id="btnGo" onclick="deleteItem('${item.Id}')">Delete</button>
                    </td>
                    <td>${index + 1}</td>
                    <td>${item.Name}</td>
                    <td>${item.MobileNo}</td>
                </tr>
        `;
    })

    $('#tbTableData').html(rows);
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function edit(id) {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }

    const data = lst.filter(x => x.Id == id);
    console.log(data);
    if (data.length == 0) {
        alert("No data found.");
        return;
    }

    const item = data[0];
    editId = item.Id;
    $('#txtName').val(item.Name);
    $('#txtMobileNo').val(item.MobileNo);
    console.log(editId);
}

function deleteItem(id) {
    confirmMessage('Are you sure want to delete?').then((result) => {
        if (!result) return;
     Notiflix.Notify.success('Deleting Successful!');
        Notiflix.Loading.circle();

        let lst = [];
        if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
            lst = JSON.parse(localStorage.getItem(tblContact));
        }
        lst = lst.filter(x => x.Id != id);
        localStorage.setItem(tblContact, JSON.stringify(lst));

        setTimeout(() => {
            Notiflix.Loading.remove();
            clearInput();
            read();
        }, 1000);
    })

}

read();