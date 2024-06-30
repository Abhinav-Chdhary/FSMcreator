import "./Intructions.css";
export default function Instructions() {
  return (
    <div className='instrnContainer'>
      The big white box above is the FSM designer. Here's how to use it:
      <p>
        <b>Make a state: </b> Double click anywhere
      </p>
      <p>
        <b>Make final state: </b>Double click on an existing state
      </p>
      <p>
        <b>Select something: </b>Click on it
      </p>
      <p>
        <b>Delete something: </b>Select and press delete
      </p>
      <p>
        <b>Move something: </b>Click and drag
      </p>
      <p>
        <b>Edit the text: </b>Select and type
      </p>
      <p>
        <b>Make an arrow: </b>Shift and drag
      </p>
    </div>
  );
}
