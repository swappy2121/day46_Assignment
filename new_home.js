let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
 empPayrollList = getEmployeePayrollDataFromStorage();
 document.querySelector(".emp-count").textContent = empPayrollList.length;	
 createInnerHtml();
 localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
	return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}	

const createInnerHtml = () => {
	if (empPayrollList.length == 0) return;
		const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
		                    "<th>Salary</th><th>Start Date</th><th>Actions</th>"
	let empPayrollData = createEmployeePayrollJSON()[0];
	let innerHTML = `${headerHtml}`;

    
//	let empPayrollList = createEmployeePayrollJSON();
	for (const empPayrollData of empPayrollList) {
		innerHTML = `${innerHTML}
		<tr>
					<td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
					<td>${empPayrollData._name}</td>
					<td>${empPayrollData._gender}</td>
					<td><div class='Dept-label'>${empPayrollData._deptartment}</div></td>
					<td>${empPayrollData._salary}</td>
					<td>${empPayrollData._startDate}</td>
					<td>
						<img name="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assests/icons/delete-black-18dp.svg">
						<img name="${empPayrollData._id}" alt="edit" onclick="upgate(this)" src="../assests/icons/create-black-18dp.svg">
					</td> 
				</tr>`;

	}
	document.querySelector('#table-display').innerHTML = innerHTML;
	};
	
	
	
	const remove = (node) => {
		let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
		if(!empPayrollData) return;
		const index = empPayrollList
						.map(empData => empData._id)
						.indexOf(empPayrollData._id);
		empPayrollList.splice(index, 1);
		localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
		document.querySelector('.emp-count').textContent = empPayrollList.length;
		createInnerHtml();
	}