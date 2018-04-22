
    var ContactInformation = {
        ContactId: 0,
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            Status: true
        }

        // Handle click event on Update button
        function updateClick() {
        // Build ContactInformation object from inputs
        ContactInformation = new Object();
    ContactInformation.FirstName = $("#firstName").val();
            ContactInformation.LastName = $("#lastName").val();
            ContactInformation.Email = $("#email").val();
            ContactInformation.PhoneNumber = $("#phoneNumber").val();
            ContactInformation.Status = $("#status").is(':checked');
            if (isValid(ContactInformation)) {
                if ($("#updateButton").text().trim() == "Add") {
                    contactInformationAdd(ContactInformation);
                }
                else {
                    ContactInformation.ContactId = $("#ContactId").val();
                    contactInformationUpdate(ContactInformation);
                }
            }
        }
        // Handle click event on Add button
        function contactInformationAdd(contactInformation) {
        $.ajax({
            url: "/api/ContactInformations",
            type: 'POST',
            contentType:
            "application/json;charset=utf-8",
            data: JSON.stringify(contactInformation),
            success: function (contactInformation) {
                contactInformationAddSuccess(contactInformation);
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        });
    }

        function contactInformationUpdate(contactInformation) {
        $.ajax({
            url: "/api/ContactInformations",
            type: 'PUT',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(contactInformation),
            success: function (contactInformation) {
                contactInformationUpdateSuccess(contactInformation);
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        });
    }

        function contactInformationUpdateSuccess(contactInformation) {
        contactInformationUpdateInTable(contactInformation);
    }

        function contactInformationUpdateInTable(contactInformation) {
            // Find contactInformation in <table>
            var row = $("#contactInformationTable button[data-id='" + contactInformation.ContactId + "']").parents("tr")[0];
            // Add changed contactInformation to table
            $(row).after(contactInformationBuildTableRow(contactInformation));
            // Remove original contactInformation
            $(row).remove();
            formClear(); // Clear form fields
            // Change Update Button Text
            $("#updateButton").text("Add");
            $("#contactInfoAddUpdate").css("display", "none");
            alert('Information updated sucessfully');
        }

        function contactInformationList() {
        // Call Web API to get a list of contactInformation
        $.ajax({
            url: '/api/ContactInformations/',
            type: 'GET',
            dataType: 'json',
            success: function (contactInformations) {
                contactInformationListSuccess(contactInformations);
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        });
    }

        function contactInformationListSuccess(contactInformations) {
        // Iterate over the collection of data
        $.each(contactInformations, function (index, contactInformation) {
            // Add a row to the contactInformation table
            contactInformationAddRow(contactInformation);
        });
    }

        function contactInformationAddRow(contactInformation) {
            // Check if <tbody> tag exists, add one if not
            if ($("#contactInformationTable tbody").length == 0) {
        $("#contactInformationTable").append("<tbody></tbody>");
    }
            // Append row to <table>
        $("#contactInformationTable tbody").append(
                contactInformationBuildTableRow(contactInformation));
        }

        function contactInformationBuildTableRow(contactInformation) {
            var htmlMarkup =
                "<tr>" +
                "<td>" +
                "<button type='button' " +
                "onclick='contactInformationGet(this);' " +
                "class='btn btn-default' " +
                "data-id='" + contactInformation.ContactId + "'>" +
                "<span class='glyphicon glyphicon-edit' />Edit"
                + "</button>" +
                "</td >" +
                "<td>" + contactInformation.FirstName + "</td>" +
                "<td>" + contactInformation.LastName + "</td>" +
                "<td>" + contactInformation.Email + "</td>" +
                "<td>" + contactInformation.PhoneNumber + "</td>" +
                "<td>" + contactInformation.Status + "</td>" +
                "<td>" +
                "<button type='button' " +
            "onclick='contactInformationDelete(this);' " +
                "class='btn btn-default' " +
                "data-id='" + contactInformation.ContactId + "'>" +
                "<span class='glyphicon glyphicon-remove' />Delete" +
                "</button>" +
                "</td>" +
                "</tr>";
return htmlMarkup;
        }

function contactInformationDelete(ctl) {
    var id = $(ctl).data("id");

    $.ajax({
        url: "/api/ContactInformations/" + id,
        type: 'DELETE',
        success: function (contactInformation) {
            $(ctl).parents("tr").remove();
            alert('Information deleted sucessfully');
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function handleException(request, message,
    error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}

function contactInformationToFields(contactInformation) {
    $("#firstName").val(contactInformation.FirstName);
    $("#lastName").val(contactInformation.LastName);
    $("#email").val(contactInformation.Email);
    $("#phoneNumber").val(contactInformation.PhoneNumber);
    $('input:checkbox').prop('checked', contactInformation.Status);
}

function contactInformationAddSuccess(contactInformation) {
    contactInformationAddRow(contactInformation);
    formClear();
    $("#contactInfoAddUpdate").css("display", "none");
    alert('Information saved sucessfully');
}

function formClear() {
    $("#ContactId").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#email").val("");
    $("#phoneNumber").val("");
    $('input:checkbox').prop('checked', false);
}
function addClick() {
    formClear();
    $("#updateButton").text("Add");
    $("#contactInfoAddUpdate").show();
}

function resetClick() {
    formClear();
    $("#updateButton").text("Add");
    $("#contactInfoAddUpdate").css("display", "none");
}

function isValid(ContactInformation) {

    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

    if (ContactInformation.FirstName == "" || ContactInformation.LastName == "" || ContactInformation.Email == "" || ContactInformation.PhoneNumber == "") {
        alert("Please fill the empty field");
        return false;
    }

    if (ContactInformation.PhoneNumber.length > 10) {
        alert("Phone number should be 10 digit number");
        return false;
    }
  

    if (!emailPattern.test(ContactInformation.Email)) {
        alert("Enter valid email address");
        return false;
    }
     
    return true;
}
function contactInformationGet(ctl) {
    // Get contactInformation id from data- attribute
    var id = $(ctl).data("id");

    // Store contactInformation id in hidden field
    $("#ContactId").val(id);

    // Call Web API to get a list of contactInformations
    $.ajax({
        url: "/api/ContactInformations/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (contactInformation) {
            contactInformationToFields(contactInformation);

            // Change Update Button Text
            $("#updateButton").text("Update");
            $("#contactInfoAddUpdate").show();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

$(document).ready(function () {
    contactInformationList();
});

