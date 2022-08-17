import React from "react";

function AddLineTable(props) {
  return (
    <div>
      <table className="table add-line-output">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Piece</th>
            <th scope="col">Price</th>
            <th scope="col">Total: {props.total.toLocaleString()} $</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                onChange={(e) => props.setLineName(e.target.value)}
                value={props.lineName}
              />
            </td>
            <td>
              <input
                type="number"
                onChange={(e) => props.setLinePiece(e.target.value)}
                value={props.linePiece}
                min="0"
                step="0"
                onKeyUp={(e) => {
                  if (e.target.value < 0) Math.abs(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="number"
                onChange={(e) => props.setLinePrice(e.target.value)}
                value={props.linePrice}
                min="0"
                step="0"
                onKeyUp={(e) => {
                  if (e.target.value < 0) Math.abs(e.target.value);
                }}
              />
            </td>
            <td>
              {
                <button
                  onClick={(e) => props.newLine(e)}
                  style={{ minWidth: "100px" }}
                >
                  Add Line
                </button>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddLineTable;
