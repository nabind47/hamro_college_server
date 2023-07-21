```json
[
  {
    "title": "Enginerring Mathematics",
    "quantity": 50,
    "tags": ["Integral Calculus", "Vector Analysis"]
  },
  {
    "title": "Electrical Engineering",
    "quantity": 10,
    "tags": ["Electrical Engineering"]
  },
  {
    "title": "Chemistry",
    "quantity": 10,
    "tags": ["Chemistry"]
  },
  {
    "title": "Communication Technique",
    "quantity": 10,
    "tags": ["Communication Technique"]
  },
  {
    "title": "Programming in C",
    "quantity": 10,
    "tags": ["Programming", "C Programming"]
  },
  {
    "title": "Mechanical Workshop",
    "quantity": 10,
    "tags": ["Mechanical Workshop"]
  },
  {
    "title": "Thermal Science",
    "quantity": 50,
    "tags": ["Thermodynamics"]
  },
  {
    "title": "Object Oriented Programming in C++",
    "quantity": 10,
    "tags": ["Object Oriented Programming"]
  },
  {
    "title": "Engineering Drawing",
    "quantity": 10,
    "tags": ["Engineering Drawing"]
  },
  {
    "title": "Physics",
    "quantity": 10,
    "tags": ["Modern Physics"]
  },
  {
    "title": "Applied Mechanics",
    "quantity": 10,
    "tags": ["Applied Mechanics"]
  },
  {
    "title": "Mechanical Workshop",
    "quantity": 10,
    "tags": ["Engineering Mathematics"]
  },
  {
    "title": "Logic Circuits",
    "quantity": 50,
    "tags": ["Logic Circuits"]
  },
  {
    "title": "Electronic Devices and Circuits",
    "quantity": 10,
    "tags": ["Electronic Devices", "Electrical Circuits"]
  },
  {
    "title": "Network Theory",
    "quantity": 10,
    "tags": ["Network Theory"]
  },
  {
    "title": "Electrial Engineering Materials",
    "quantity": 10,
    "tags": ["Electrial Engineering"]
  },
  {
    "title": "Data Structures and Algorithms",
    "quantity": 10,
    "tags": ["Data Structures ", "Algorithms"]
  },
  {
    "title": "Engineering Mathematics III",
    "quantity": 10,
    "tags": ["Engineering Mathematics"]
  },
  {
    "title": "Project I",
    "quantity": 50,
    "tags": ["Project"]
  },
  {
    "title": "Microprocessors",
    "quantity": 10,
    "tags": ["Logic Circuits", "Microprocessors"]
  },
  {
    "title": "Programming Technology",
    "quantity": 10,
    "tags": ["Programming", "Java", "Dotnet"]
  },
  {
    "title": "Database Management System",
    "quantity": 10,
    "tags": ["Database Management System"]
  },
  {
    "title": "Instrumentation",
    "quantity": 10,
    "tags": ["Instrumentation", "Measurements"]
  },
  {
    "title": "Engineering Mathematics IV",
    "quantity": 10,
    "tags": ["Engineering Mathematics"]
  },
  {
    "title": "Operating Systems",
    "quantity": 50,
    "tags": ["Operating Systems"]
  },
  {
    "title": "Theory of Computation",
    "quantity": 10,
    "tags": ["Theory of Computation"]
  },
  {
    "title": "Computer Architecture",
    "quantity": 10,
    "tags": ["Computer Architecture"]
  },
  {
    "title": "Probability and Statistics",
    "quantity": 10,
    "tags": ["Probability and Statistics", "Mathematics"]
  },
  {
    "title": "Numerical Methods",
    "quantity": 10,
    "tags": ["Numerical Methods", "Mathematics"]
  },
  {
    "title": "Computer Graphics",
    "quantity": 10,
    "tags": ["Computer Graphics"]
  },
  {
    "title": "Project II",
    "quantity": 50,
    "tags": ["Project"]
  }
]
```

```ts
const subject = await prisma.subject.createMany({
  data: [
    {
      title: 'Enginerring Mathematics I',
      credit_hours: 3,
      sub_code: 'MTH 112',
      semesterId: 1,
    },
    {
      title: 'Basic Electrical Engineering',
      credit_hours: 3,
      sub_code: 'ELE 105',
      semesterId: 1,
    },
    {
      title: 'Chemistry',
      credit_hours: 4,
      sub_code: 'CHM 103',
      semesterId: 1,
    },
    {
      title: 'Communication Technique',
      credit_hours: 4,
      sub_code: 'ENG 104',
      semesterId: 1,
    },
    {
      title: 'Programming in C',
      credit_hours: 3,
      sub_code: 'CMP 103',
      semesterId: 1,
    },
    {
      title: 'Mechanical Workshop',
      credit_hours: 1,
      sub_code: 'MEC 178',
      semesterId: 1,
    },
    {
      title: 'Thermal Science',
      credit_hours: 2,
      sub_code: 'MEC 189',
      semesterId: 2,
    },
    {
      title: 'Object Oriented Programming in C++',
      credit_hours: 3,
      sub_code: 'CMP 104',
      semesterId: 2,
    },
    {
      title: 'Engineering Drawing',
      credit_hours: 2,
      sub_code: 'MEC 109',
      semesterId: 2,
    },
    {
      title: 'Physics',
      credit_hours: 4,
      sub_code: 'PHY 102',
      semesterId: 2,
    },
    {
      title: 'Applied Mechanics I',
      credit_hours: 3,
      sub_code: 'MEC 130',
      semesterId: 2,
    },
    {
      title: 'Engineering Mathematics II',
      credit_hours: 3,
      sub_code: 'MTH 121',
      semesterId: 2,
    },
    {
      title: 'Logic Circuits',
      credit_hours: 3,
      sub_code: 'ELX 212',
      semesterId: 3,
    },
    {
      title: 'Electronic Devices and Circuits',
      credit_hours: 3,
      sub_code: 'ELX 211',
      semesterId: 3,
    },
    {
      title: 'Network Theory',
      credit_hours: 3,
      sub_code: 'ELX 215',
      semesterId: 3,
    },
    {
      title: 'Electrial Engineering Materials',
      credit_hours: 2,
      sub_code: 'ELE 226',
      semesterId: 3,
    },
    {
      title: 'Data Structures and Algorithms',
      credit_hours: 3,
      sub_code: 'CMP 225',
      semesterId: 3,
    },
    {
      title: 'Engineering Mathematics III',
      credit_hours: 3,
      sub_code: 'MTH 211',
      semesterId: 3,
    },
    {
      title: 'Project I',
      credit_hours: 1,
      sub_code: 'CMP 290',
      semesterId: 4,
    },
    {
      title: 'Microprocessors',
      credit_hours: 3,
      sub_code: 'ELX 230',
      semesterId: 4,
    },
    {
      title: 'Programming Technology',
      credit_hours: 3,
      sub_code: 'CMP 211',
      semesterId: 4,
    },
    {
      title: 'Database Management System',
      credit_hours: 3,
      sub_code: 'CMP 226',
      semesterId: 4,
    },
    {
      title: 'Instrumentation',
      credit_hours: 3,
      sub_code: 'ELX 231',
      semesterId: 4,
    },
    {
      title: 'Engineering Mathematics IV',
      credit_hours: 3,
      sub_code: 'MTH 214',
      semesterId: 4,
    },
    {
      title: 'Operating Systems',
      credit_hours: 3,
      sub_code: 'CMP 330',
      semesterId: 5,
    },
    {
      title: 'Theory of Computation',
      credit_hours: 3,
      sub_code: 'CMP 326',
      semesterId: 5,
    },
    {
      title: 'Computer Architecture',
      credit_hours: 3,
      sub_code: 'CMP 332',
      semesterId: 5,
    },
    {
      title: 'Probability and Statistics',
      credit_hours: 3,
      sub_code: 'MTH 220',
      semesterId: 5,
    },
    {
      title: 'Numerical Methods',
      credit_hours: 3,
      sub_code: 'MTH 230',
      semesterId: 5,
    },
    {
      title: 'Computer Graphics',
      credit_hours: 3,
      sub_code: 'CMP 241',
      semesterId: 5,
    },
    {
      title: 'Project II',
      credit_hours: 2,
      sub_code: 'CMP 390',
      semesterId: 6,
    },
    {
      title: 'Elective I',
      credit_hours: 3,
      sub_code: 'EL1',
      semesterId: 6,
    },
    {
      title: 'Embedded Systems',
      credit_hours: 3,
      sub_code: 'ELX 312',
      semesterId: 6,
    },
    {
      title: 'Object Oriented Software Engineering',
      credit_hours: 3,
      sub_code: 'CMP 320',
      semesterId: 6,
    },
    {
      title: 'Data Communication',
      credit_hours: 3,
      sub_code: 'CMM 340',
      semesterId: 6,
    },
    {
      title: 'Simulation and Modeling',
      credit_hours: 3,
      sub_code: 'CMP 350',
      semesterId: 6,
    },
    {
      title: 'Engineering Economics',
      credit_hours: 3,
      sub_code: 'ECO 411',
      semesterId: 7,
    },
    {
      title: 'Elective II',
      credit_hours: 3,
      sub_code: 'EL2',
      semesterId: 7,
    },
    {
      title: 'ICT Project Management',
      credit_hours: 3,
      sub_code: 'CMP 483',
      semesterId: 7,
    },
    {
      title: 'Computer Networks',
      credit_hours: 3,
      sub_code: 'CMP 335',
      semesterId: 7,
    },
    {
      title: 'Artificial Intelligence',
      credit_hours: 3,
      sub_code: 'CMP 455',
      semesterId: 7,
    },
    {
      title: 'Image Processing and Pattern Recognition',
      credit_hours: 3,
      sub_code: 'CMP 441',
      semesterId: 7,
    },
    {
      title: 'Social and Professional Issues in IT',
      credit_hours: 2,
      sub_code: 'CMP 484',
      semesterId: 8,
    },
    {
      title: 'Elective III',
      credit_hours: 3,
      sub_code: 'EL3',
      semesterId: 8,
    },
    {
      title: 'Organization and Management',
      credit_hours: 2,
      sub_code: 'MGT 321',
      semesterId: 8,
    },
    {
      title: 'Project III',
      credit_hours: 5,
      sub_code: 'CMP 490',
      semesterId: 8,
    },
    {
      title: 'Information Systems',
      credit_hours: 3,
      sub_code: 'CMP 481',
      semesterId: 8,
    },
    {
      title: 'Digital Signal Analysis Processing',
      credit_hours: 3,
      sub_code: 'CMm 442',
      semesterId: 8,
    },
  ],
});
```

```json
[
  {
    "title": "Semester I",
    "total_fee": 100000
  },
  {
    "title": "Semester II",
    "total_fee": 120000
  },
  {
    "title": "Semester III",
    "total_fee": 130000
  },
  {
    "title": "Semester IV",
    "total_fee": 140000
  },
  {
    "title": "Semester V",
    "total_fee": 150000
  },
  {
    "title": "Semester VI",
    "total_fee": 160000
  },
  {
    "title": "Semester VII",
    "total_fee": 170000
  },
  {
    "title": "Semester VIII",
    "total_fee": 180000
  }
]
```

```ts
const semester = await prisma.semester.createMany({
  data: [
    {
      title: 'Semester I',
      total_fee: 100000,
      departmentId: 1,
    },
    {
      title: 'Semester II',
      total_fee: 120000,
      departmentId: 1,
    },
    {
      title: 'Semester III',
      total_fee: 130000,
      departmentId: 1,
    },
    {
      title: 'Semester IV',
      total_fee: 140000,
      departmentId: 1,
    },
    {
      title: 'Semester V',
      total_fee: 150000,
      departmentId: 1,
    },
    {
      title: 'Semester VI',
      total_fee: 160000,
      departmentId: 1,
    },
    {
      title: 'Semester VII',
      total_fee: 170000,
      departmentId: 1,
    },
    {
      title: 'Semester VIII',
      total_fee: 180000,
      departmentId: 1,
    },
  ],
});
```
