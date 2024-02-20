let previous = document.getElementById('previous')
let next = document.getElementById('next')

let resumes = []
let filteredResumes = []
let isFiltered = false

let i = 0
let size = 1

showFirstPage();

function showFirstPage() {

    let storedUsername = sessionStorage.getItem('username');
    let storedPassword = sessionStorage.getItem('password');

    if ((storedUsername === "user") && (storedPassword === "123")) {
        console.log('Welcome to the Resume repository!')
        showResume(status);
    } else {
        alert('Please Log in to get access.')
        window.location.href = 'login.html'
    }
}

let search = document.getElementById('search-box')
search.addEventListener('keypress', setName)

function setName(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        i = 0;
        isFiltered = true;
        getDataByKeyword();
    }
}

function showResume(status) {

    if(status === "next") {
        i+=1
        console.log('clicked')
    }
    else if(status === "previous") {
        i-=1
    }

    getData();
}

function getData() {
    if (isFiltered) {
        getDataByKeyword(); 
    } else {
        getDataById();
    }
}

function getDataById() {          
    
    fetch(`http://localhost:3000/resume`)
        .then(response => response.json())
        .then(response => {

            console.log('response', response)

            let size = findSize(response);

            console.log('response array size=', size)

            let lastIndex = size - 1

            console.log('last index=', lastIndex)
            console.log('Displayed response', response[i])
            console.log('index=',i)

            resumes = response;
            console.log('fetched array=', resumes)

            displayData(resumes[i]);
            controlButton(i, lastIndex);
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });

}

function getDataByKeyword() {
    fetch(`http://localhost:3000/resume?basics.AppliedFor=${search.value}`)
        .then(response => response.json())
        .then(response => {

            console.log('response', response)

            let size = findSize(response);

            console.log('response array size=', size)

            let lastIndex = size - 1

            console.log('last index=', lastIndex)
            console.log('Displayed response', response[i])
            console.log('index=',i)

            filteredResumes = response;
            console.log('fetched array=', filteredResumes)

            if (size > 0) {
                displayData(filteredResumes[i])
                controlButton(i, lastIndex, size);
            } else {
                showError()
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

function findSize(valueSet) {
    return Object.keys(valueSet).length
}

function displayData(object) {

    document.getElementById('resume').style.visibility = 'visible'
    document.getElementById('error').style.visibility = 'hidden'

    document.querySelector('.name').innerText = '';
    document.querySelector('.post').innerText = '';
    document.getElementById('personal-info').innerHTML = '';
    document.getElementById('technical-skills').innerHTML = '';
    document.getElementById('hobbies').innerHTML = '';
    document.getElementById('work-experience').innerHTML = '';
    document.getElementById('projects').innerHTML = '';
    document.getElementById('education').innerHTML = '';
    document.getElementById('internship').innerHTML = '';
    document.getElementById('achievements').innerHTML = '';

    let name = document.querySelector('.name')
    name.innerText = `${object.basics.name}`

    let job = document.querySelector('.post')
    job.innerText = `Applied for: ${object.basics.AppliedFor}`

    let personalInfo = document.getElementById('personal-info')
    personalInfo.innerHTML = `
        Address: ${object.basics.location.address}<br>
        PIN: ${object.basics.location.postalCode}<br>
        City: ${object.basics.location.city}<br>
        State: ${object.basics.location.state}<br>
        Phone: ${object.basics.phone}<br>
        E-mail: ${object.basics.email}<br>
        <a href="">${object.basics.profiles.url}</a>
    `

    let domain = document.getElementById('skill-domain-level')
    domain.innerHTML = `
        ${object.skills.name} <br>
        Level: ${object.skills.level}
    `

    const skills = document.getElementById('technical-skills');
    const skillsList = document.createElement('ul');
    skillsList.style.listStyleType = 'none'

    object.skills.keywords.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = keyword;
        skillsList.appendChild(li);
    });

    skills.appendChild(skillsList);

    const hobbies = document.getElementById('hobbies');
    const hobbiesList = document.createElement('ul');
    hobbiesList.style.listStyleType = 'none'

    object.interests.hobbies.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = keyword;
        hobbiesList.appendChild(li);
    });

    hobbies.appendChild(hobbiesList);

    let experience = document.getElementById('work-experience')
    experience.innerHTML = `

        <ul>
            <li><h style="font-weight: bold">Company: </h>${object.work["Company Name"]}</li>
            <li><h style="font-weight: bold">Position: </h>${object.work.position}</li>
            <li><h style="font-weight: bold">Start Date: </h>${object.work["Start Date"]}</li>
            <li><h style="font-weight: bold">End Date: </h>${object.work["End Date"]}</li>
            <li><p><span>Summary: </span>${object.work.Summary}</p></li>
        </ul>
    `

    let projects = document.getElementById('projects')
    projects.innerHTML = `
        <p><h style="font-weight: bold">${object.projects.name}: </h>${object.projects.description}</p>
    `

    let education = document.getElementById('education')
    education.innerHTML = `
        <ul type="square">
            <li>            
                <h3>UG:</h3>
                <ul type="disc">
                    <li><h style="font-weight: bold">Institute: </h>${object.education.UG.institute}</li>
                    <li><h style="font-weight: bold">Course: </h>${object.education.UG.institute.Course}</li>
                    <li><h style="font-weight: bold">Start Date: </h>${object.education.UG["Start Date"]}</li>
                    <li><h style="font-weight: bold">End Date: </h>${object.education.UG["End Date"]}</li>
                    <li><h style="font-weight: bold">CGPA: </h>${object.education.UG.cgpa}</li>
                </ul>
            </li>
            <li>          
                <h3>Senior Secondary:</h3>
                <ul type="disc">
                    <li><h style="font-weight: bold">institute: </h>${object.education.UG.institute}</li>
                    <li><h style="font-weight: bold">CGPA: </h>${object.education.UG.cgpa}</li>
                </ul>
            </li>
            <li>          
                <h3>High School:</h3>
                <ul type="disc">
                    <li><h style="font-weight: bold">institute: </h>${object.education.UG.institute}</li>
                    <li><h style="font-weight: bold">CGPA: </h>${object.education.UG.cgpa}</li>
                </ul>
            </li>
        </ul>
    `

    let internship = document.getElementById('internship')
    internship.innerHTML = `
        <ul type="disc">
            <li><h style="font-weight: bold">Company: </h>${object.Internship["Company Name"]}</li>
            <li><h style="font-weight: bold">Position: </h>${object.Internship.position}</li>
            <li><h style="font-weight: bold">Start Date: </h>${object.Internship["Start Date"]}</li>
            <li><h style="font-weight: bold">End Date: </h>${object.Internship["End Date"]}</li>
            <li><p><span>Summary: </span>${object.Internship.Summary}</p></li>
        </ul>
    `

    let achievements = document.getElementById('achievements')
    achievements.innerHTML = `
        <ul type="disc"><li>${object.achievements.Summary}</li></ul>
    `
}

function showError() {
    document.getElementById('resume').style.visibility = 'hidden'
    document.getElementById('error').style.visibility = 'visible'
    previous.style.visibility = 'hidden'
    next.style.visibility = 'hidden'
}

function controlButton(i, n, size) {

    if (size === 1) {
        previous.style.visibility = 'hidden'
        next.style.visibility = 'hidden'
    }
    
    else if (i === 0) {
        previous.style.visibility = 'hidden'
        next.style.visibility = 'visible'
    }

    else if (i === n) {
        next.style.visibility = 'hidden'
        previous.style.visibility = 'visible'
    }

    else {
        previous.style.visibility = 'visible'
        next.style.visibility = 'visible'
    }
}