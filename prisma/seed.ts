// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.department.upsert({
//     where: {},
//     update: {},
//     create: {
//       title: 'Computer Department',
//       semesters: {
//         create: [
//           {
//             title: 'Semester I',
//             total_fee: 100000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Enginerring Mathematics I',
//                   credit_hours: 3,
//                   sub_code: 'MTH 112',
//                   books: {
//                     create: [
//                       {
//                         title: 'Enginerring Mathematics',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Integral Calculus' }, { name: 'Vector Analysis' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Basic Electrical Engineering',
//                   credit_hours: 3,
//                   sub_code: 'ELE 105',
//                   books: {
//                     create: [
//                       {
//                         title: 'Electrical Engineering',
//                         quantity: 10,
//                         tags: {
//                           create: [
//                             {
//                               name: 'Electrical Engineering',
//                             },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Chemistry',
//                   credit_hours: 4,
//                   sub_code: 'CHM 103',
//                   books: {
//                     create: [
//                       {
//                         title: 'Chemistry',
//                         quantity: 10,
//                         tags: {
//                           create: [
//                             {
//                               name: 'Chemistry',
//                             },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Communication Technique',
//                   credit_hours: 4,
//                   sub_code: 'ENG 104',
//                   books: {
//                     create: [
//                       {
//                         title: 'Communication Technique',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Communication Technique' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Programming in C',
//                   credit_hours: 3,
//                   sub_code: 'CMP 103',
//                   books: {
//                     create: [
//                       {
//                         title: 'Programming in C',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Programming' }, { name: 'C Programming' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Mechanical Workshop',
//                   credit_hours: 1,
//                   sub_code: 'MEC 178',
//                   books: {
//                     create: [
//                       {
//                         title: 'Mechanical Workshop',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Mechanical Workshop' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester II',
//             total_fee: 120000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Thermal Science',
//                   credit_hours: 2,
//                   sub_code: 'MEC 189',
//                   books: {
//                     create: [
//                       {
//                         title: 'Thermal Science',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Thermodynamics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Object Oriented Programming in C++',
//                   credit_hours: 3,
//                   sub_code: 'CMP 104',
//                   books: {
//                     create: [
//                       {
//                         title: 'Object Oriented Programming in C++',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Object Oriented Programming' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Engineering Drawing',
//                   credit_hours: 2,
//                   sub_code: 'MEC 109',
//                   books: {
//                     create: [
//                       {
//                         title: 'Engineering Drawing',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Engineering Drawing' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Physics',
//                   credit_hours: 4,
//                   sub_code: 'PHY 102',
//                   books: {
//                     create: [
//                       {
//                         title: 'Modern Physics',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Modern Physics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Applied Mechanics I',
//                   credit_hours: 3,
//                   sub_code: 'MEC 130',
//                   books: {
//                     create: [
//                       {
//                         title: 'Applied Mechanics ',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Applied Mechanics ' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Engineering Mathematics II',
//                   credit_hours: 3,
//                   sub_code: 'MTH 121',
//                   books: {
//                     create: [
//                       {
//                         title: 'Mechanical Workshop',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Engineering Mathematics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester III',
//             total_fee: 130000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Logic Circuits',
//                   credit_hours: 3,
//                   sub_code: 'ELX 212',
//                   books: {
//                     create: [
//                       {
//                         title: 'Logic Circuits',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Logic Circuits' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Electronic Devices and Circuits',
//                   credit_hours: 3,
//                   sub_code: 'ELX 211',
//                   books: {
//                     create: [
//                       {
//                         title: 'Electronic Devices and Circuits',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Electronic Devices' }, { name: 'Electrical Circuits' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Network Theory',
//                   credit_hours: 3,
//                   sub_code: 'ELX 215',
//                   books: {
//                     create: [
//                       {
//                         title: 'Network Theory',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Network Theory' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Electrial Engineering Materials',
//                   credit_hours: 2,
//                   sub_code: 'ELE 226',
//                   books: {
//                     create: [
//                       {
//                         title: 'Electrial Engineering Materials',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Electrial Engineering' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Data Structures and Algorithms',
//                   credit_hours: 3,
//                   sub_code: 'CMP 225',
//                   books: {
//                     create: [
//                       {
//                         title: 'Data Structures and Algorithms',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Data Structures ' }, { name: 'Algorithms' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Engineering Mathematics III',
//                   credit_hours: 3,
//                   sub_code: 'MTH 211',
//                   books: {
//                     create: [
//                       {
//                         title: 'Engineering Mathematics III',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Engineering Mathematics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester IV',
//             total_fee: 140000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Project I',
//                   credit_hours: 1,
//                   sub_code: 'CMP 290',
//                   books: {
//                     create: [
//                       {
//                         title: 'Project I',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Project' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Microprocessors',
//                   credit_hours: 3,
//                   sub_code: 'ELX 230',
//                   books: {
//                     create: [
//                       {
//                         title: 'Microprocessors',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Logic Circuits' }, { name: 'Microprocessors' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Programming Technology',
//                   credit_hours: 3,
//                   sub_code: 'CMP 211',
//                   books: {
//                     create: [
//                       {
//                         title: 'Programming Technology',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Programming' }, { name: 'Java' }, { name: 'Dotnet' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Database Management System',
//                   credit_hours: 3,
//                   sub_code: 'CMP 226',
//                   books: {
//                     create: [
//                       {
//                         title: 'Database Management System',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Database Management System' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Instrumentation',
//                   credit_hours: 3,
//                   sub_code: 'ELX 231',
//                   books: {
//                     create: [
//                       {
//                         title: 'Instrumentation',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Instrumentation' }, { name: 'Measurements' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Engineering Mathematics IV',
//                   credit_hours: 3,
//                   sub_code: 'MTH 214',
//                   books: {
//                     create: [
//                       {
//                         title: 'Engineering Mathematics IV',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Engineering Mathematics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester V',
//             total_fee: 150000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Operating Systems',
//                   credit_hours: 3,
//                   sub_code: 'CMP 330',
//                   books: {
//                     create: [
//                       {
//                         title: 'Operating Systems',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Operating Systems' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Theory of Computation',
//                   credit_hours: 3,
//                   sub_code: 'CMP 326',
//                   books: {
//                     create: [
//                       {
//                         title: 'Theory of Computation',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Theory of Computation' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Computer Architecture',
//                   credit_hours: 3,
//                   sub_code: 'CMP 332',
//                   books: {
//                     create: [
//                       {
//                         title: 'Computer Architecture',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Computer Architecture' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Probability and Statistics',
//                   credit_hours: 3,
//                   sub_code: 'MTH 220',
//                   books: {
//                     create: [
//                       {
//                         title: 'Probability and Statistics',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Probability and Statistics' }, { name: 'Mathematics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Numerical Methods',
//                   credit_hours: 3,
//                   sub_code: 'MTH 230',
//                   books: {
//                     create: [
//                       {
//                         title: 'Numerical Methods',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Numerical Methods' }, { name: 'Mathematics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Computer Graphics',
//                   credit_hours: 3,
//                   sub_code: 'CMP 241',
//                   books: {
//                     create: [
//                       {
//                         title: 'Computer Graphics',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Computer Graphics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester VI',
//             total_fee: 160000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Project II',
//                   credit_hours: 2,
//                   sub_code: 'CMP 390',
//                   books: {
//                     create: [
//                       {
//                         title: 'Project II',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Project' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Elective I',
//                   credit_hours: 3,
//                   sub_code: 'EL1',
//                   books: {
//                     create: [
//                       {
//                         title: 'Elective I',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Elective' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Embedded Systems',
//                   credit_hours: 3,
//                   sub_code: 'ELX 312',
//                   books: {
//                     create: [
//                       {
//                         title: 'Embedded Systems',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Embedded Systems' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Object Oriented Software Engineering',
//                   credit_hours: 3,
//                   sub_code: 'CMP 320',
//                   books: {
//                     create: [
//                       {
//                         title: 'Object Oriented Software Engineering',
//                         quantity: 10,
//                         tags: {
//                           create: [
//                             { name: 'Object Oriented Software Engineering' },
//                             { name: 'Software Engineering' },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Data Communication',
//                   credit_hours: 3,
//                   sub_code: 'CMM 340',
//                   books: {
//                     create: [
//                       {
//                         title: 'Data Communication',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Data Communication' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Simulation and Modeling',
//                   credit_hours: 3,
//                   sub_code: 'CMP 350',
//                   books: {
//                     create: [
//                       {
//                         title: 'Simulation and Modeling',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Simulation and Modeling' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester VII',
//             total_fee: 170000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Engineering Economics',
//                   credit_hours: 3,
//                   sub_code: 'ECO 411',
//                   books: {
//                     create: [
//                       {
//                         title: 'Engineering Economics',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Engineering Economics' }, { name: 'Economics' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Elective II',
//                   credit_hours: 3,
//                   sub_code: 'EL2',
//                   books: {
//                     create: [
//                       {
//                         title: 'Elective II',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Elective' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'ICT Project Management',
//                   credit_hours: 3,
//                   sub_code: 'CMP 483',
//                   books: {
//                     create: [
//                       {
//                         title: 'ICT Project Management',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Project Management' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Computer Networks',
//                   credit_hours: 3,
//                   sub_code: 'CMP 335',
//                   books: {
//                     create: [
//                       {
//                         title: 'Computer Networks',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Computer Networks' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Artificial Intelligence',
//                   credit_hours: 3,
//                   sub_code: 'CMP 455',
//                   books: {
//                     create: [
//                       {
//                         title: 'Artificial Intelligence',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Artificial Intelligence' }, { name: 'Data Science' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Image Processing and Pattern Recognition',
//                   credit_hours: 3,
//                   sub_code: 'CMP 441',
//                   books: {
//                     create: [
//                       {
//                         title: 'Image Processing and Pattern Recognition',
//                         quantity: 10,
//                         tags: {
//                           create: [
//                             { name: 'Image Processing and Pattern Recognition' },
//                             { name: 'Computer Graphics' },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             title: 'Semester VIII',
//             total_fee: 180000,
//             subjects: {
//               create: [
//                 {
//                   title: 'Social and Professional Issues in IT',
//                   credit_hours: 2,
//                   sub_code: 'CMP 484',
//                   books: {
//                     create: [
//                       {
//                         title: 'Social and Professional Issues in IT',
//                         quantity: 50,
//                         tags: {
//                           create: [{ name: 'Social and Professional Issues in IT' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Elective III',
//                   credit_hours: 3,
//                   sub_code: 'EL3',
//                   books: {
//                     create: [
//                       {
//                         title: 'Elective III',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Elective' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Organization and Management',
//                   credit_hours: 2,
//                   sub_code: 'MGT 321',
//                   books: {
//                     create: [
//                       {
//                         title: 'Organization and Management',
//                         quantity: 10,
//                         tags: {
//                           create: [
//                             { name: 'Project Management' },
//                             { name: 'Organization and Management' },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Project III',
//                   credit_hours: 5,
//                   sub_code: 'CMP 490',
//                   books: {
//                     create: [
//                       {
//                         title: 'Project III',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Project' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Information Systems',
//                   credit_hours: 3,
//                   sub_code: 'CMP 481',
//                   books: {
//                     create: [
//                       {
//                         title: 'Information Systems',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Information Systems' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   title: 'Digital Signal Analysis Processing',
//                   credit_hours: 3,
//                   sub_code: 'CMm 442',
//                   books: {
//                     create: [
//                       {
//                         title: 'Digital Signal Analysis Processing',
//                         quantity: 10,
//                         tags: {
//                           create: [{ name: 'Digital Signal Analysis Processing' }],
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     console.log('ok');
//   })
//   .catch(async (e) => {
//     console.log('not ok');
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
