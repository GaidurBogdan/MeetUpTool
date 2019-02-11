today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    date = 1;
    for (i = 0; i < 6; i++) {
        // creates a table row
        row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

//days of the week
var weekday=new Array(7);

weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

document.getElementsByClassName("num_date")[0].innerHTML = new Date().getDate();
document.getElementsByClassName("day")[0].innerHTML = weekday[new Date().getDay()];


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


//listen to all clicks
var selectedDateElement = null;
document.addEventListener('click', function (event) {

    //highlight a dat on click
    if (event.target.tagName == "TD") {

        if (selectedDateElement != null) {
            selectedDateElement.classList.remove("selected__date");
        }
        selectedDateElement = event.target;
        selectedDateElement.classList.add("selected__date");
    }

    //add the selected meeting on click
    if (event.target.matches(".add")) {
        var meetingName = document.getElementById("bigDate").value;

        if (meetingName == "") {
            meetingName = document.getElementsByClassName("create_event_short")[0].value;
        }
        if (selectedDateElement == null) {
            alert("Please select a date first");
        } else {
            if (meetingName == "") {
                alert("Give this meeting a name please!");
            }
            else {
                db.collection("meetings").add({
                    OwnerID: auth.currentUser.uid,
                    day: selectedDateElement.innerText,
                    month: selectMonth.value + 1,
                    year: selectYear.value,
                    name: meetingName
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(error.message);
                });
                document.getElementById("bigDate").value = "";
                alert("Meeting-ul a fost adaugat cu succes!");
            }
        }
    }
});
