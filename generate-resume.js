const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, PageMargin, PageOrientation, WidthType, ExternalHyperlink, ImageRun, Header, Footer, PageNumber, PageNumbers, PageBreak, Table, TableRow, TableCell, VerticalAlign, ShadingType, TableCellBorders, UnderlineType } = require('docx');
const fs = require('fs');
const path = require('path');

const doc = new Document({
    sections: [{
        properties: {
            page: {
                margin: new PageMargin(1440, 1440, 1440, 1440, 720, 720, 0),
                size: {
                    width: 6120, // Letter size
                    height: 7920,
                }
            },
        },
        children: [
            // Name
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Rajesh Kumar",
                        bold: true,
                        size: 48, // 24pt
                        font: "Arial",
                    }),
                ],
                alignment: AlignmentType.CENTER,
            }),

            // Contact details
            new Paragraph({
                children: [
                    new TextRun({
                        text: "New Delhi | rajesh.kumar@email.com | +91-98765-43210",
                        size: 20, // 10pt
                        font: "Arial",
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                    after: 240, // Space after
                },
            }),

            // Horizontal divider
            new Paragraph({
                borders: {
                    top: {
                        style: BorderStyle.SINGLE,
                        size: 6, // 0.5pt
                        color: "000000",
                    },
                },
                alignment: AlignmentType.CENTER,
                spacing: {
                    after: 240,
                },
            }),

            // Professional Summary
            new Paragraph({
                text: "Professional Summary",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Dedicated and detail-oriented individual seeking data entry position where I can utilize my organizational and detail-oriented skills to contribute to the efficiency of your team.",
                        size: 22, // 11pt
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 240,
                },
            }),

            // Education
            new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "XYZ Senior Secondary School (10th Grade), New Delhi (Graduated: March 2023)",
                        bold: true,
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Scored 90% in Commerce stream with emphasis on Business Studies, Accountancy, Economics.",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 240,
                },
            }),

            // Skills
            new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Typing speed 60 words per minute with high level of accuracy",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Data Management: Familiar with data entry software, PowerPoint tools",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Communication: Strong written and verbal communication skills",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 240,
                },
            }),

            // Experience
            new Paragraph({
                text: "Experience",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Data Entry Assistant, ABC Enterprises, New Delhi",
                        bold: true,
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "June 2023 - Present",
                        italics: true,
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Entered customer and account information from source documents.",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Organized, verified, and prioritized data for efficient processing.",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 240,
                },
            }),

            // Projects
            new Paragraph({
                text: "Projects",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "School Event Management Database, XYZ Senior Secondary School, New Delhi",
                        bold: true,
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "January 2020 - March 2020",
                        italics: true,
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Developed and maintained event database using MS Excel.",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 120,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "• Ensured data accuracy and reliability.",
                        size: 22,
                        font: "Arial",
                    }),
                ],
                spacing: {
                    after: 240,
                },
            }),
        ],
    }],
    creator: "Rajesh Kumar",
    title: "Resume",
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("resume.docx", buffer);
    console.log("Resume DOCX generated successfully as resume.docx");
}).catch((err) => {
    console.error("Error generating DOCX:", err);
});
