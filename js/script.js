$(document).ready(function() {

    const btnSubmit = $('#submit');
    const btnStorage = $('#storage');
    const btnClear = $('#clear');
    const getDate = $('.month');
    const table = $('.table');

    (function() {
        var now, months, month, year;

        now = new Date();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();

        year = now.getFullYear();

        getDate.text(`${months[month]} ${year}`);
    })();

    btnSubmit.click(function() {
        let currDate = $('#date').val();
        let categories = $('#categories option:selected').val()
        let number = $('#number').val();
        let message = $('#message').val();

        var string = `{"items":[
				{"currentDate":${currDate}},
				{"categories":${categories}},
				{"number":${number}},
				{"message":${message}}
			]}`;
        var json = { "items": [{ "currentDate": currDate }, { "categories": categories }, { "number": number }, { "message": message }] };

        localStorage.setItem(`added-items`, AddToLocalStorage(string));
        localStorage.setItem(`added-items`, AddToLocalStorage(json));

        function AddToLocalStorage(data) {
            if (typeof data != "string") { data = JSON.stringify(data); }
            return data;
        }

        // this function gets string from localStorage and converts it into JSON

        // check this//
        function GetFromLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key));
        }

        var myData = GetFromLocalStorage(`added-items`);

        //console.log(myData);

        var currentDate = myData.items[0].currentDate;
        var currCat = myData.items[1].categories;
        var num = myData.items[2].number;
        var msg = myData.items[3].message;

        function fillTable() {
            table.append(`<tbody>`).append(`
							<tr>
			                    <td>${currentDate}</td>
			                    <td>${currCat}</td>
			                    <td>${num}</td>
			                    <td>${msg}</td>
			                </tr>`);
            table.DataTable()
        }
        fillTable();
    });

    btnStorage.one('click', function(e) {
        function GetFromLocalStorage(key) {
            var dateFromLocalStorage = JSON.parse(localStorage.getItem(key));
            //return JSON.parse(localStorage.getItem(key));
            let currDate = dateFromLocalStorage.items[0].currentDate
            let currCat = dateFromLocalStorage.items[1].categories;
            let num = dateFromLocalStorage.items[2].number;
            let msg = dateFromLocalStorage.items[3].message;

            $('.table').append(`<tbody>`).append(`
								<tr>
				                    <td>${currDate}</td>
				                    <td>${currCat}</td>
				                    <td>${num}</td>
				                    <td>${msg}</td>
				                </tr>`);
            table.DataTable()
        }
        GetFromLocalStorage(`added-items`);
    });

    btnClear.one('click', function() {
        (function() {
            localStorage.clear();
            location.reload();
        })();
    });
});