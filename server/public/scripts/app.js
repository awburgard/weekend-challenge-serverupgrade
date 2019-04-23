$(document).ready(onReady);

let employeeArray = [];
let monthlyBudget = 20000;

function clickSubmitButton() {
    event.preventDefault();
    let entry = {};
    $(this).serializeArray().forEach(function (item) {
        entry[item.name] = item.value;
    });
    $(this).trigger('reset');
    employeeArray.push(entry);
    render();
}
function render() {
    $('.container').empty();
    for (let i = 0; i < employeeArray.length; i++) {
        $('.container').append('<div></div>');
        let newDiv = $('.container').children().last();
        let newEmployee = employeeArray[i];
        newDiv.data('id', i);
        newDiv.append('<p>' + 'First Name: ' + newEmployee.firstName + '</p>').addClass('formatInput');
        newDiv.append('<p>' + 'Last Name: ' + newEmployee.lastName + '</p>').addClass('formatInput');
        newDiv.append('<p>' + 'ID: ' + newEmployee.id + '</p>').addClass('formatInput');
        newDiv.append('<p>' + 'Title: ' + newEmployee.title + '</p>').addClass('formatInput');
        newDiv.append('<p>' + 'Annual Salary: ' + newEmployee.annualSalary + '</p>').addClass('formatInput');
        newDiv.append('<button class="deleteBtn">Delete</button>').addClass('formatInput');
    }
    calculateMonthly();
}

function clickDeleteButton() {
    let employeeToDelete = $(this).parent().data('id');
    employeeArray.splice(employeeToDelete, 1);
    render();
}

function onReady() {
    render();

    $('.container').on('click', '.deleteBtn', clickDeleteButton);
    $('#newEmployee').on('submit', clickSubmitButton);
    calculateMonthly();
}

function calculateMonthly() {
    let totalSalary = 0;
    let monthlyAvg = 0;
    for (let i = 0; i < employeeArray.length; i++) {
        let employee = employeeArray[i];
        monthlyAvg = employee.annualSalary / 12;
        totalSalary += monthlyAvg;
        monthlyAvg = parseInt(totalSalary);
    }
    $('#totalMonthly').text('Total Monthly Budget: $' + monthlyAvg);
    if (monthlyAvg > monthlyBudget) {
        $('#totalMonthly').addClass('red');
    }
};