let editId = '';
$('#btnCancel').click(function () {
    clearInput();
})

function clearInput() {
    $('#textBlogTitle').val('');
    $('#textBlogAuthor').val('');
    $('#textBlogContent').val('');
    $('#txtName').focus()
}

const tblblog = 'Tbl_Blog';
$('#btnSave').click(function () {
    if (editId.length == 0) {
        create($('#textBlogTitle').val(), $('#textBlogAuthor').val(), $('#textBlogContent').val());

    }
    else {
        update($('#textBlogTitle').val(), $('#textBlogAuthor').val(), $('#textBlogContent').val());
        editId = '';
    }
})
$('#btnGo').click(function () {
    deleteItem(id);
})

function successMessage(message) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}



function confirmMessage(message) {
    Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: message,
                icon: "success"
            });
        }
    });
}

function update(blogTitle, blogAuthor, blogContent) {
    let lst = [];
    if (localStorage.getItem(tblblog) != undefined && localStorage.getItem(tblblog) != null) {
        lst = JSON.parse(localStorage.getItem(tblblog));
    }
    const index = lst.findIndex(x => x.BlogId == editId);
    console.log({ index });
    lst[index].BlogTitle = blogTitle;
    lst[index].BlogAuthor = blogAuthor;
    lst[index].BlogContent = blogContent;
    localStorage.setItem(tblblog, JSON.stringify(lst));
    successMessage('Updated Successful!....')
    clearInput();
    read();
}

function create(blogTitle, blogAuthor, blogContent) {
    let lst = [];
    if (localStorage.getItem(tblblog) != undefined && localStorage.getItem(tblblog) != null) {
        lst = JSON.parse(localStorage.getItem(tblblog));
    }
    const data = {
        BlogId: uuidv4(),
        BlogTitle: blogTitle,
        BlogAuthor: blogAuthor,
        BlogContent: blogContent,
    };
    lst.push(data);
    localStorage.setItem(tblblog, JSON.stringify(lst));
    successMessage('Saving Successful!....')
    //alert('Saving Successful!..');
    clearInput();
    read();
}

function read() {
    let lst = [];
    if (localStorage.getItem(tblblog) != undefined && localStorage.getItem(tblblog) != null) {
        lst = JSON.parse(localStorage.getItem(tblblog));
    }
    let rows = "";
    $(lst).each(function (index, item) {
        console.log({ index, item });
        rows += `
                    <tr>
                    <td><button type="button" class="btn btn-warning btn-edit" onclick="edit('${item.BlogId}')">Edit</button>
                    <button type="button" class="btn btn-danger btn-delete" id="btnGo" onclick="deleteItem('${item.BlogId}')">Delete</button>
                    </td>
                    <td>${index + 1}</td>
                    <td>${item.BlogTitle}</td>
                    <td>${item.BlogAuthor}</td>
                    <td>${item.BlogContent}</td>
                </tr>`
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
    if (localStorage.getItem(tblblog) != undefined && localStorage.getItem(tblblog) != null) {
        lst = JSON.parse(localStorage.getItem(tblblog));
    }
    var data = lst.filter(x => x.BlogId == id);
    console.log(data);
    if (data.length == 0) {
        alert("No data found");
        return;
    }
    const item = data[0];
    editId = item.BlogId;
    $('#textBlogTitle').val(item.BlogTitle);
    $('#textBlogAuthor').val(item.BlogAuthor);
    $('#textBlogContent').val(item.BlogContent);
    console.log(editId);
}

function deleteItem(id) {
    confirmMessage('Are you sure want to delete?').then((result) => {
        if (!result) return;
        successMessage("Deleting Successful!...");

        let lst = [];
        if (localStorage.getItem(tblblog) != undefined && localStorage.getItem(tblblog) != null) {
            lst = JSON.parse(localStorage.getItem(tblContact));
        }
        lst = lst.filter(x => x.Id != id);
        localStorage.setItem(tblblog, JSON.stringify(lst));

        clearInput();
        read();

    })

}


read();

