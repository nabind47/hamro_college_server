Here's a summary of the relationships and optimizations made to the schema:

- `Student` has a one-to-one relationship with `Profile`.
- `Teacher` has a one-to-one relationship with `Profile`.
- `Profile` has a one-to-many relationship with `Book`.
- `Department` has a one-to-many relationship with `Semester`.
- `Semester` has a one-to-many relationship with `Subject`.
- `Subject` has a many-to-many relationship with `Teacher`.
- `Subject` has a one-to-many relationship with `Book`.
- `Book` has an optional one-to-many relationship with `Library`.
- `Book` has an optional one-to-one relationship with `Profile`.
- `Book` has an optional one-to-one relationship with `Subject`.
- `Library` has a one-to-many relationship with `Book`.
- `Profile` has a one-to-one relationship with `Account`.
- `Account` has a one-to-one relationship with `Transaction`.

Optimizations:

- Added indexes to improve query performance on the relation fields: `departmentId`, `semesterId`, `libraryId`, `studentId`, and `subjectId`.
- Added `@@index` directives to specify the indexes on the corresponding fields.

These optimizations help enhance the performance of queries involving the relation fields and ensure efficient data retrieval from the database.

---

## Upadated

1. `Student` and `Profile`: One-to-One Relationship

   - A `Student` can have a single `Profile`.
   - The relationship is defined by the `profile` field in the `Student` model and the `studentId` field in the `Profile` model.

2. `Student` and `Borrowing`: One-to-Many Relationship

   - A `Student` can have multiple `Borrowings`.
   - The relationship is defined by the `borrowings` field in the `Student` model and the `studentId` field in the `Borrowing` model.

3. `Student` and `Semester`: Many-to-One Relationship

   - A `Student` can be associated with a single `Semester`.
   - The relationship is defined by the `semester` field in the `Student` model and the `semesterId` field in the `Semester` model.

4. `Profile` and `Teacher`: One-to-One Relationship

   - A `Profile` can have a single `Teacher`.
   - The relationship is defined by the `teacher` field in the `Profile` model and the `teacherId` field in the `Teacher` model.

5. `Teacher` and `Subject`: Many-to-Many Relationship

   - A `Teacher` can teach multiple `Subjects`.
   - A `Subject` can have multiple `Teachers`.
   - The relationship is defined by the `teachers` field in the `Subject` model and the `subjects` field in the `Teacher` model, with the relation name `"TeacherSubject"`.

6. `Department` and `Semester`: One-to-Many Relationship

   - A `Department` can have multiple `Semesters`.
   - The relationship is defined by the `semesters` field in the `Department` model and the `departmentId` field in the `Semester` model.

7. `Semester` and `Subject`: One-to-Many Relationship

   - A `Semester` can have multiple `Subjects`.
   - The relationship is defined by the `subjects` field in the `Semester` model and the `semesterId` field in the `Subject` model.

8. `Subject` and `Book`: One-to-Many Relationship

   - A `Subject` can have multiple `Books`.
   - The relationship is defined by the `books` field in the `Subject` model and the `subjectId` field in the `Book` model.

9. `Book` and `Tag`: Many-to-Many Relationship

   - A `Book` can have multiple `Tags`.
   - A `Tag` can be associated with multiple `Books`.
   - The relationship is defined by the `tags` field in the `Book` model and the `books` field in the `Tag` model, with the relation name `"BookTags"`.

10. `Book` and `Borrowing`: One-to-Many Relationship

    - A `Book` can have multiple `Borrowings`.
    - The relationship is defined by the `borrowings` field in the `Book` model and the `bookId` field in the `Borrowing` model.

11. `Borrowing` and `Student`: Many-to-One Relationship

    - A `Borrowing` is associated with a single `Student`.
    - The relationship is defined by the `student` field in the `Borrowing` model and the `studentId` field in the `Student` model.

12. `Library` and `Book`: One-to-Many Relationship
    - A `Library` can have multiple `Books`.
    - The relationship is defined by the `books` field in the `Library` model.

```json
{
  "id": 1,
  "books": [
    {
      "id": 1,
      "title": "Book 1",
      "description": "Description of Book 1",
      "cover_image": "book1.jpg",
      "quantity": 5,
      "libraryId": 1,
      "subjectId": 1,
      "tags": [
        {
          "id": 1,
          "name": "Tag 1"
        },
        {
          "id": 2,
          "name": "Tag 2"
        }
      ],
      "borrowings": [
        {
          "id": 1,
          "borrowDate": "2023-07-08T10:00:00Z",
          "returnDate": null,
          "bookId": 1,
          "studentId": 1
        },
        {
          "id": 2,
          "borrowDate": "2023-07-06T14:30:00Z",
          "returnDate": "2023-07-12T09:45:00Z",
          "bookId": 1,
          "studentId": 2
        }
      ],
      "subject": {
        "id": 1,
        "title": "Subject 1",
        "description": "Description of Subject 1",
        "credit_hours": 3,
        "semesterId": 1
      }
    },
    {
      "id": 2,
      "title": "Book 2",
      "description": "Description of Book 2",
      "cover_image": "book2.jpg",
      "quantity": 3,
      "libraryId": 1,
      "subjectId": 2,
      "tags": [
        {
          "id": 1,
          "name": "Tag 1"
        },
        {
          "id": 3,
          "name": "Tag 3"
        }
      ],
      "borrowings": [
        {
          "id": 3,
          "borrowDate": "2023-07-05T16:15:00Z",
          "returnDate": null,
          "bookId": 2,
          "studentId": 3
        }
      ],
      "subject": {
        "id": 2,
        "title": "Subject 2",
        "description": "Description of Subject 2",
        "credit_hours": 4,
        "semesterId": 1
      }
    }
  ]
}
```

---

## Library

```json
{
  "Book": {
    "id": 1,
    "title": "The Great Gatsby",
    "description": "A classic novel depicting the Jazz Age in America",
    "cover_image": "http://example.com/book1_cover.jpg",
    "quantity": 5,
    "tags": ["Fiction", "American Literature"],
    "libraryId": 1
  },
  "Tag": {
    "Tag1": "Fiction",
    "Tag2": "American Literature"
  },
  "Library": {
    "id": 1,
    "books": ["Book1", "Book2", "Book3"]
  }
}
```

### Book to Tag:

The **Book** model has a many-to-many relationship with the Tag model. This relationship is established through the tags field in the Book model using the **@relation("BookTags")** directive. The tags field is an array of **Tag** objects associated with the book. Multiple books can have the same tags, and each tag can be associated with multiple books.

### Book to Library:

The **Book** model has a one-to-many relationship with the **Library** model. This relationship is represented by the Library? field in the Book model, which references the Library model. The Library model has a field called books, which is an array of Book objects associated with the library. Each book can be linked to a single library through the libraryId foreign key in the Book model.

```json
{
  "id": 1,
  "books": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "description": "A classic novel depicting the Jazz Age in America",
      "cover_image": "http://example.com/book1_cover.jpg",
      "quantity": 5,
      "libraryId": 1,
      "tags": [
        {
          "id": 1,
          "name": "Fiction"
        },
        {
          "id": 2,
          "name": "American Literature"
        }
      ]
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "description": "A powerful novel addressing racial injustice in the South",
      "cover_image": "http://example.com/book2_cover.jpg",
      "quantity": 3,
      "libraryId": 1,
      "tags": [
        {
          "id": 1,
          "name": "Fiction"
        },
        {
          "id": 3,
          "name": "Social Issues"
        }
      ]
    }
  ]
}
```

> **_In summary, a book can have multiple tags through the tags field, and a library can have multiple books through the books field in the Library model. These relationships allow you to query books based on their associated tags or retrieve all books belonging to a specific library._**
