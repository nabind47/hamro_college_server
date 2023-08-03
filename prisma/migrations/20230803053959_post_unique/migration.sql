-- DropIndex
DROP INDEX `Post_studentId_key` ON `post`;

-- CreateIndex
CREATE INDEX `Post_studentId_idx` ON `Post`(`studentId`);
