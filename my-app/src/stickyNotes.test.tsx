import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    // tests that the create note form was created correctly
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        // finds the input fields using the placeholders
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");

        // MY CODE: sets the label too
        const createNoteLabelInput = screen.getByTestId("label-select") as HTMLSelectElement;

        // finds the Create Note button
        const createNoteButton = screen.getByText("Create Note");
   
        // fireEvent simulates typing into input fields
        // changes title input to "New Note"
        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        // changes the content input to "Note content"
        fireEvent.change(createNoteContentTextarea, {target: { value: "Note content" },});

        fireEvent.change(createNoteLabelInput, { target: { value: "personal "}});
        // simulates creating a note with the click 
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");
        // Checks if the new note is displayed on the screen by asserting that
        // elements with the text "New Note" and "Note content" are present.
        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });


    // MY TESTS! 

    test('set default label', () => {
        render(<StickyNotes/>);
        // select dropdown with test id (infer type so .value doesn't throw error)
        const selectElement = screen.getByTestId("label-select") as HTMLSelectElement;

        // we expect the default selection to have value "Select a label"
        expect(selectElement.value).toBe("Select a label"); 
    });

    test('reset to default label after form submission', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "filler title" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "filler content" },});
        fireEvent.change(createNoteLabel, { target: { value: "personal"},});
        fireEvent.click(createNoteButton);

        // we expect the default selection to have value "Select a label"
        const selectElementAfterSubmit = screen.getByTestId("label-select") as HTMLSelectElement;
        expect(selectElementAfterSubmit.value).toBe("Select a label"); 
    });

    // we expect that if we don't fill in inputs, we can't submit
    test('should not submit when inputs empty', () => {
        render(<StickyNotes/>);

        const createNoteButton = screen.getByText("Create Note");
        fireEvent.click(createNoteButton);

        // Doc: queries all elements with role 'note'
        const noteItems1 = screen.queryAllByRole('note');
        expect(noteItems1.length).toBe(0);
    });

    test('should not submit when title empty', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 1" },});
        fireEvent.change(createNoteLabel, { target: { value: "other"},});

        fireEvent.click(createNoteButton);

        const noteItems = screen.queryAllByRole('note');
        expect(noteItems.length).toBe(0);
    });

    test('should not submit when content empty', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "" },});
        fireEvent.change(createNoteLabel, { target: { value: "other"},});

        fireEvent.click(createNoteButton);

        const noteItems = screen.queryAllByRole('note');
        expect(noteItems.length).toBe(0);
    });

    test('should not submit when label not selected', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 1" },});

        fireEvent.click(createNoteButton);

        const noteItems = screen.queryAllByRole('note');
        expect(noteItems.length).toBe(0);
    });
    

    // are all the notes that are created displayed on the page
    // Note: for the sake of this test we set initial notes to empty array, ie no notes
    // this way we can create notes and see if they display one by one
    test('displays all notes created', () => {
        render(<StickyNotes/>);

        // NOTE 1
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        // selects the dropdown menu
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");
 
        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 1" },});
        fireEvent.change(createNoteLabel, { target: { value: "other"},});
        fireEvent.click(createNoteButton);

        const newNoteTitle1 = screen.getByText("Note 1");
        const newNoteContent1 = screen.getByText("content 1");
        const newNoteLabel1 = screen.getByTestId("note-label-1") as HTMLSelectElement;
    
        expect(newNoteTitle1).toBeInTheDocument();
        expect(newNoteContent1).toBeInTheDocument();
        expect(newNoteLabel1.value).toBe('other');

        const noteItems1 = screen.queryAllByRole('note');
        expect(noteItems1.length).toBe(1);

        // NOTE 2

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 2" },});
        fireEvent.change(createNoteLabel, { target: { value: "personal"},});
        fireEvent.click(createNoteButton);

        const newNoteTitle2 = screen.getByText("Note 2");
        const newNoteContent2 = screen.getByText("content 2");
        const newNoteLabel2 = screen.getByTestId("note-label-2") as HTMLSelectElement;

        expect(newNoteTitle2).toBeInTheDocument();
        expect(newNoteContent2).toBeInTheDocument();
        expect(newNoteLabel2.value).toBe('personal');

        const noteItems2 = screen.queryAllByRole('note');
        expect(noteItems2.length).toBe(2);

        // NOTE 3

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 3" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 3" },});
        fireEvent.change(createNoteLabel, { target: { value: "study"},});
        fireEvent.click(createNoteButton);

        const newNoteTitle3 = screen.getByText("Note 3");
        const newNoteContent3 = screen.getByText("content 3");
        const newNoteLabel3 = screen.getByTestId("note-label-3") as HTMLSelectElement;

        expect(newNoteTitle3).toBeInTheDocument();
        expect(newNoteContent3).toBeInTheDocument();
        expect(newNoteLabel3.value).toBe('study');

        const noteItems3 = screen.queryAllByRole('note');
        expect(noteItems3.length).toBe(3);

        // NOTE 4

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 4" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 4" },});
        fireEvent.change(createNoteLabel, { target: { value: "work"},});
        fireEvent.click(createNoteButton);

        const newNoteTitle4 = screen.getByText("Note 4");
        const newNoteContent4 = screen.getByText("content 4");
        const newNoteLabel4 = screen.getByTestId("note-label-4") as HTMLSelectElement;

        expect(newNoteTitle4).toBeInTheDocument();
        expect(newNoteContent4).toBeInTheDocument();
        expect(newNoteLabel4.value).toBe('work');

        // check query size updated correctly
        const noteItems4 = screen.queryAllByRole('note');
        expect(noteItems4.length).toBe(4);
    });

    test('updates sticky notes correctly', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");
 
        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 1" },});
        fireEvent.change(createNoteLabel, { target: { value: "other"},});
        fireEvent.click(createNoteButton);

        // Title update
        const updatedTitle = "New Title";
        const noteTitleEditable = screen.getByTestId("note-title-1");
        // from doc: blur means that the user clicks away from something
        // ie; here they edit the text and then click away, meaning they're done
        fireEvent.blur(noteTitleEditable, { target: { textContent: updatedTitle } });
        expect(screen.getByText(updatedTitle)).toBeInTheDocument();

        // Content update
        const updatedContent = "New Content";
        const noteContentEditable = screen.getByTestId("note-content-1");
        fireEvent.blur(noteContentEditable, { target: { textContent: updatedContent } });
        expect(screen.getByText(updatedContent)).toBeInTheDocument();

        // Label update
        const noteLabelEditable = screen.getByTestId("note-label-1") as HTMLSelectElement;
        fireEvent.change(noteLabelEditable, { target: { value: 'work' } });
        expect(noteLabelEditable.value).toBe('work');
        
    });

    test('delete note filters it out', () => {
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteLabel = screen.getByTestId("label-select") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "content 1" } });
        fireEvent.change(createNoteLabel, { target: { value: "other" } });
        fireEvent.click(createNoteButton);

        //<button onClick={() => deleteNote(note.id)}>x</button>
        const deleteButton = screen.getByText('x'); 
        fireEvent.click(deleteButton);

        const deletedNoteTitle = screen.queryByText("Note 1");
        expect(deletedNoteTitle).not.toBeInTheDocument();
    });
});

