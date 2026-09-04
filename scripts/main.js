// Navigation
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#animate-nav');

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.classList.toggle('open');

    navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
});


// Date
document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Course Information
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');
const buttons = [allBtn, cseBtn, wddBtn];

function showItems(course, card) {
    const existingDetail = card.querySelector('.course-detail');

    if (existingDetail) {
        existingDetail.remove();
        return;
    }

    const detail = document.createElement('p');
    detail.classList.add('course-detail');
    detail.textContent = `${course.description} Technology: ${course.technology.join(', ')}.`;
    card.appendChild(detail);
}

function displayCourses(courseList) {
    const courseContainer = document.getElementById('container');
    courseContainer.innerHTML = '';

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.getElementById('credit').innerHTML =
        `Total Number of Credits: <span>${totalCredits}</span>`;

    courseList.forEach((course) => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        let content;
        if (course.completed === true) {
            content = '✔';
        } else {
            content = '↻';
            card.classList.add('in-progress');
        }

        card.innerHTML = `
            <h3>${content} ${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
        `;

        card.addEventListener('click', () => {
            showItems(course, card);
        });

        courseContainer.appendChild(card);
    });
}

function setActiveButton(button) {
    buttons.forEach(btn => btn.classList.remove('show'));
    button.classList.add('show');
}

cseBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
    setActiveButton(cseBtn);
});

wddBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
    setActiveButton(wddBtn);
});

allBtn.addEventListener('click', () => {
    displayCourses(courses);
    setActiveButton(allBtn);
});

displayCourses(courses);
setActiveButton(allBtn);