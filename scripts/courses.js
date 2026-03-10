
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');

function displayCourses(courses) {
    const courseContainer = document.getElementById("container");
    courseContainer.innerHTML = "";

    courses.forEach((course) => {
        let card = document.createElement("div")
        card.classList.add("course-card");

        const totalCredits = courses.reduce((total, course) => total + course.credits, 0)
        document.getElementById('credit').innerHTML = `Total Number of Credits: <span>${totalCredits}</span>`;

        let content;
        if (course.completed == true) {
            content = "✔";
        } else {
            content = "‼";
            card.style.backgroundColor = '#ffba08';
            card.style.color = '#03071e';
        }

        card.innerHTML = `
    <h3>${content}  ${course.subject} ${course.number}</h3>
    <p>${course.title}</p>
    `
        card.addEventListener("click", () => {
            showItems(course)
        })

        courseContainer.appendChild(card);
    })
}

displayCourses(courses)

cseBtn.addEventListener('click', () => {
    let cseCourses = courses.filter(course => (course.subject) == "CSE");
    displayCourses(cseCourses)
})

wddBtn.addEventListener('click', () => {
    let wddCourses = courses.filter(course => (course.subject) == "WDD");
    displayCourses(wddCourses)
})

allBtn.addEventListener('click', () => {
    displayCourses(courses)
})

const closeButton = document.querySelector("#course-details button");
const openDialog = document.querySelector("#course-details");
const subject = document.querySelector("#course-details h2");
const courseName = document.querySelector("#course-name");
const credits = document.querySelector("#credits");
const certificate = document.querySelector("#certificate");
const courseInfo = document.querySelector("#course-info");
const techTools = document.querySelector("#tools");

closeButton.addEventListener("click", () => {
    openDialog.close();
})

function showItems(x) {
    console.log(x);
    subject.innerHTML = `${x.subject} ${x.number}`;
    courseName.innerHTML = x.title;
    credits.innerHTML = `${x.credits} credits`;
    certificate.innerHTML = `<b>Certificate: </b>${x.certificate}`;
    courseInfo.innerHTML = x.description;
    techTools.innerHTML = `<b>Technology: </b>${x.technology}`;
    openDialog.showModal();
}

window.addEventListener("click", (event) => {
    if (event.target == openDialog) {
        openDialog.close();
    }
})
