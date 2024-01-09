var editId = '';

$('#btnCancel').click(function () {
    clearInput();
})

function clearInput() {
    $('#txtUserName').val('');
    $('#txtEmail').val('');
    $('#txtMobileNo').val('');
    $('#txtName').focus();
}


function successMessage(message) {
    // Swal.fire({
    //     title: "Success!",
    //     text: message,
    //     icon: "success"
    // });

    Notiflix.Report.success(
        'Success!',
        message,
        'Ok',
    );
}

function confirmMessage(message) {
    Notiflix.Confirm.show(
        'Delete Confirm',
        'Are You sure delete?',
        'Yes',
        'No',
        function okCb() {
            Notiflix.Notify.success('Deleting Successful!...');
        },
        function cancelCb() {
            Notiflix.Notify.success('Deleting Failed..');

        }
    );
}

const tblContact = 'Tbl_Contact';
$('#btnSave').click(function () {
    if (editId.length == 0) {
        create($('#txtUserName').val(), $('#txtEmail').val(), $('#txtMobileNo').val());

    }
    else {
        update($('#txtUserName').val(), $('#txtEmail').val(), $('#txtMobileNo').val());
        editId = '';
    }
})

function update(username, email, mobileNo) {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    const index = lst.findIndex(x => x.Id == editId);
    console.log({ index });
    lst[index].UserName = username;
    lst[index].Email = email;
    lst[index].MobileNo = mobileNo;
    localStorage.setItem(tblContact, JSON.stringify(lst));
    //alert("Updating Successful!");
    successMessage('Updating Successful!');
    clearInput();
    read();
}

function create(username, email, mobileNo) {
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    const data = {
        Id: uuidv4(),
        UserName: username,
        Email: email,
        MobileNo: mobileNo,
    };
    lst.push(data);
    localStorage.setItem(tblContact, JSON.stringify(lst));
    // alert("Saving Successful!");
    successMessage('Saving Successful!');
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
                        <button type="button" class="btn btn-danger btn-delete" onclick="deleteItem('${item.Id}')">Delete</button>
                    </td>
                    <td>${index + 1}</td>
                    <td>${item.UserName}</td>
                    <td>${item.Email}</td>
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
    $('#txtUserName').val(item.UserName);
    $('#txtEmail').val(item.Email)
    $('#txtMobileNo').val(item.MobileNo);
    console.log(editId);
}

function deleteItem(id) {
    //const result = confirm('Are you sure want to delete');
    //if(result == false) return;
    //if (!result) return;
    // confirmMessage();

    // confirmMessage('Are you sure want to delete?').then((result) => {
    //     Notiflix.Loading.circle();
    //     if (!result) return;
    //     setTimeout(() => {
    //         Notiflix.Loading.remove();
    //     }, c

    confirmMessage();
    let lst = [];
    if (localStorage.getItem(tblContact) != undefined && localStorage.getItem(tblContact) != null) {
        lst = JSON.parse(localStorage.getItem(tblContact));
    }
    lst = lst.filter(x => x.Id != id);
    localStorage.setItem(tblContact, JSON.stringify(lst));
    //alert("Deleting Successful!");
    clearInput();
    read();
}

read();