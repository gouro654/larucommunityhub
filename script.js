script.js
/* =========================================
   LAURO COMMUNITY JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", function () {

    navbar.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

    });

});


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   ZELLE COPY FUNCTION
========================================= */

function copyZelle() {

    const zelleEmail =
        "YOUR-ZELLE-EMAIL@example.org";

    navigator.clipboard.writeText(zelleEmail)
        .then(function () {

            alert(
                "Zelle information copied: " +
                zelleEmail
            );

        })
        .catch(function () {

            alert(
                "Please copy the Zelle information manually: " +
                zelleEmail
            );

        });

}


/* =========================================
   REGISTRATION FORM
========================================= */

const registrationForm =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");


registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const membership =
        document.getElementById("membership").value;


    if (!firstName || !lastName || !email || !membership) {

        formMessage.style.display = "block";

        formMessage.textContent =
            "Please complete all required fields.";

        return;

    }


    formMessage.style.display = "block";

    formMessage.textContent =
        `Thank you, ${firstName}! Your Lauro Community registration has been received.`;


    registrationForm.reset();

});


/* =========================================
   COMMUNITY CALENDAR
========================================= */


/*
    Add or modify activities here.

    Dates use:

    YYYY-MM-DD

    Example:

    {
        date: "2026-10-15",
        title: "Children's Education Workshop",
        description: "Educational workshop for children."
    }
*/

const activities = [

    {
        date: "2026-10-05",
        title: "Community Welcome Meeting",
        description: "Introduction to Lauro Community programs."
    },

    {
        date: "2026-10-10",
        title: "Children's Education Workshop",
        description: "Learning and educational activities for children."
    },

    {
        date: "2026-10-15",
        title: "Community Relief Program",
        description: "Distribution of community relief resources."
    },

    {
        date: "2026-10-20",
        title: "Volunteer Meeting",
        description: "Volunteer orientation and planning."
    },

    {
        date: "2026-10-25",
        title: "Children's Community Day",
        description: "Fun, educational, and family activities."
    },

    {
        date: "2026-10-30",
        title: "Monthly Community Meeting",
        description: "Review of programs and upcoming activities."
    }

];


let currentDate = new Date();


const calendar =
    document.getElementById("calendar");

const calendarMonth =
    document.getElementById("calendarMonth");

const activitiesContainer =
    document.getElementById("activities");


/* =========================================
   RENDER CALENDAR
========================================= */

function renderCalendar() {

    calendar.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const monthName =
        currentDate.toLocaleString(
            "default",
            {
                month: "long"
            }
        );


    calendarMonth.textContent =
        `${monthName} ${year}`;


    /* Days of week */

    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    dayNames.forEach(function (day) {

        const element =
            document.createElement("div");

        element.className =
            "calendar-day-name";

        element.textContent =
            day;

        calendar.appendChild(element);

    });


    /* First day of month */

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    /* Number of days */

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* Empty cells */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendar.appendChild(empty);

    }


    /* Days */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayElement =
            document.createElement("div");

        dayElement.className =
            "calendar-day";


        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


        const event =
            activities.find(
                activity =>
                    activity.date === dateString
            );


        dayElement.innerHTML =
            `<div class="day-number">${day}</div>`;


        if (event) {

            dayElement.classList.add(
                "has-event"
            );


            const eventElement =
                document.createElement("span");

            eventElement.className =
                "event-dot";

            eventElement.textContent =
                event.title;

            dayElement.appendChild(
                eventElement
            );

        }


        calendar.appendChild(
            dayElement
        );

    }


    renderActivities(
        year,
        month
    );

}


/* =========================================
   SHOW MONTH ACTIVITIES
========================================= */

function renderActivities(year, month) {

    activitiesContainer.innerHTML = "";


    const monthActivities =
        activities.filter(function (activity) {

            const activityDate =
                new Date(activity.date);

            return (
                activityDate.getFullYear() === year &&
                activityDate.getMonth() === month
            );

        });


    if (monthActivities.length === 0) {

        activitiesContainer.innerHTML =
            "<p>No activities scheduled for this month.</p>";

        return;

    }


    monthActivities.forEach(function (activity) {

        const item =
            document.createElement("div");

        item.className =
            "activity-item";


        const date =
            new Date(activity.date);


        const formattedDate =
            date.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );


        item.innerHTML = `
            <strong>${formattedDate}</strong>
            <br>
            <strong>${activity.title}</strong>
            <br>
            <span>${activity.description}</span>
        `;


        activitiesContainer.appendChild(
            item
        );

    });

}


/* =========================================
   CALENDAR NAVIGATION
========================================= */

document
    .getElementById("previousMonth")
    .addEventListener("click", function () {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();

    });


document
    .getElementById("nextMonth")
    .addEventListener("click", function () {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();

    });


/* =========================================
   INITIALIZE
========================================= */

renderCalendar();