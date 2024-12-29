
# React Flow Library Upgrade

This project is a React Flow application enhanced with custom node types, logic handling, and additional features. It allows users to create, edit, and manage a flow of nodes and edges visually.

## Features

- **Custom Node Types**: Includes `ellipse`, `rootIf`, `if`, `elseif`, `add`, and `else` nodes with unique designs.
- **Custom Edge Type**: Implements a `custom` edge type for added styling and interaction.
- **Undo/Redo Functionality**: Easily revert or reapply actions to maintain workflow flexibility.
- **Node Panel**: Double-click a node to open a panel where you can:
  - Edit the node label.
  - Change the node background color.
  - Update node-specific logic and attributes (`logic`, `parentId`, etc.).
- **Context Menu**: Right-click on nodes or edges to access a menu for editing or deleting them.
- **Save/Load Flow**: Save the current flow state to a JSON file or load an existing one.
- **Dynamic Node Addition**: Add new nodes dynamically through a button or other interaction.

## Requirements

- Node.js >= 14.x
- npm >= 6.x

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Project

To start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application in your browser.

## Folder Structure

```
src/
├── data/
│   └── sampleFlow.ts        # Sample flow data for nodes and edges
├── nodes/
│   ├── PlaceholderNode.tsx  # Component for placeholder node types
│   ├── PositionLoggerNode.tsx # Component to log and display node position
│   ├── EllipseNode.tsx      # Component for ellipse nodes
│   ├── RootIfNode.tsx       # Component for rootIf nodes
│   ├── IfNode.tsx           # Component for if nodes
│   ├── ElseNode.tsx         # Component for else nodes
│   ├── ElseIfNode.tsx       # Component for elseif nodes
│   ├── AddNode.tsx          # Component for add nodes
│   ├── index.ts             # Node types registry
│   └── types.ts             # Type definitions for nodes
├── edges/
│   ├── CustomEdge.tsx       # Custom edge component
│   ├── index.ts             # Edge types registry
├── App.tsx                  # Main React application
├── main.tsx                 # Entry point of the application
```

## How to Use

1. **Adding Nodes**:
   - Click the "➕ Add Node" button to create a new node.
   - Provide a name and background color for the node.

2. **Editing Nodes**:
   - Double-click a node to open the editing panel.
   - Update node attributes like label, color, and logic.

3. **Managing Edges**:
   - Connect nodes by dragging from one node handle to another.
   - Right-click on an edge to edit or delete it.

4. **Undo/Redo**:
   - Use the "↩️ Undo" and "↪️ Redo" buttons to navigate the action history.

5. **Save/Load Flow**:
   - Save the current flow using the "Save Flow" button.
   - Load a previously saved flow via the "Load Flow" button.

## Acknowledgments

 - **React Flow**: Used for building the node/edge graph interface.

 - **Task Document**: Specifications provided by the client.

## Contact

For questions or issues, please contact:

Name: Evan Pavone

Email: EvanRPavone@gmail.com

LinkedIn: [Evan Pavone | LinkedIn](https://www.linkedin.com/in/evan-pavone/)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Happy coding!**
