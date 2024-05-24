#! /usr/bin/env node
import inquirer from "inquirer";

class Student{
    id:string;
    name:string;
    courseEnrolled:string[];
    feesAmount:number;

    constructor(id:string,name:string,courseEnrolled:string[],feesAmount:number){
        this.id = id
        this.name = name
        this.courseEnrolled = courseEnrolled
        this.feesAmount = feesAmount

    }
}

let baseId = 10000;
let studentId:string = "";
let continueEnrollment = true;

let students:Student[]=[];

do{

let action=await inquirer.prompt([{
    name:"ans",
    type:"list",
    message:"please select sn option:\n:",
    choices:["Enroll a student","show student status"]
}])

if(action.ans == "Enroll a student"){
    let studentName=await inquirer.prompt({
    name:"ans",
    type:"input",
    message:"please enter your name:"
    })

    let trimStudentName = studentName.ans.trim().toLowerCase()
    let studentNameCheck = students.map(obj=>obj.name) //checks dublicate names of student
    if(studentNameCheck.includes(trimStudentName) == false)
    if(trimStudentName !== ""){
        baseId++
        studentId = "STID" + baseId

        console.log("\n \t Your Account has been created");
        console.log(`Welcome, ${trimStudentName}!`)

        let course= await inquirer.prompt([{
            name:"ans",
            type:"list",
            message:"please select your course:",
            choices:["Artificial Intelligence","CIT","Graphic Designing"]
        }])

        let courseFees = 0;
        switch(course.ans){
            case "Artificial Intelligence":
                courseFees = 5000;
                break;
                case "CIT":
                courseFees = 2500;
                break;
                case "Graphic Designing":
                courseFees = 1250;
                break;
        }

        let courseConfirm = await inquirer.prompt({
            type:"confirm",
            name:"ans",
            message:"Do you want to enroll in this course"
        })

        if(courseConfirm.ans === true){
            let student = new Student(studentId, trimStudentName, [course.ans], courseFees)
            students.push(student);
            console.log("You have enrolled in this course");


        }
    }
    else{
        console.log("Invalid Name")
    }
    else{
        console.log("this name is already exists")
    }
}


else if(action.ans === "show student status"){
    if(students.length !== 0){
        let studentNameCheck = students.map(e => e.name)

        let selectedStudent = await inquirer.prompt({
            type:"list",
            name:"ans",
            message:"please select name",
            choices:studentNameCheck
        })
        let foundStudent = students.find(Student => Student.name === selectedStudent.ans)
        console.log(foundStudent);
        console.log("\n ")
    }
    else{
        console.log("Record is empty");

    }
    let userConfirm = await inquirer.prompt({
        type:"confirm",
        name:"ans",
        message:"Do you want to continue?"
    })
    if(userConfirm.ans === false){
        continueEnrollment = false
    }
}

}while(continueEnrollment)






    



     




