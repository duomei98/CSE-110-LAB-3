import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("To Do List", () => {
    // tests that the create note form was created correctly
    test("displays all items in to do list", () => {
        render(<ToDoList />);

        dummyGroceryList.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    test("number of items bought equal zero when no items checked", () => {
        render(<ToDoList />);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    });

    test("number of items updates correctly on checking / unchecking", () => {
        render(<ToDoList />);
        const applesCheckbox1 = screen.getByRole("checkbox", { name: "Apples" });
        expect(applesCheckbox1).toBeInTheDocument();
        
        fireEvent.click(applesCheckbox1);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        const bananasCheckbox1 = screen.getByRole("checkbox", { name: "Bananas" });
        expect(bananasCheckbox1).toBeInTheDocument();
        fireEvent.click(bananasCheckbox1);
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

        // uncheck checkbox
        const applesCheckbox2 = screen.getByRole("checkbox", { name: "Apples" });
        fireEvent.click(applesCheckbox2);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        const bananasCheckbox2 = screen.getByRole("checkbox",{ name: "Bananas" });
        fireEvent.click(bananasCheckbox2);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    });
});

