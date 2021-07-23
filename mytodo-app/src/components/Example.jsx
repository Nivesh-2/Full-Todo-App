import { Alert } from "react-st-modal";

function AlertExample() {
  const text = (
    <ul>
      <li>
        To Add Todo: You can find 'Add Todo' button on the top left corner.
      </li>
			<li>
				Then add the description and target date of completion of that activity and click on Save button which will redirect to Home page.
			</li>
			<li>
				You can update or delete respective todos in the Home page.
			</li>
			<li>
				All added todos are classified into Due Today, Upcoming, Completed Todos. To view this classification, click on the 'Show Todos' Button.
			</li>
			<li>
				To edit, add, or delete todos navigate back to home page.
			</li>
    </ul>
  );
  return (
    <div>
      <button
        className="btn btn-success"
        onClick={async () => {
          await Alert(text, "Instuctions");
        }}
      >
        Instructions
      </button>
    </div>
  );
}

export default AlertExample;
