import * as vscode from "vscode";

let mode: "normal" | "insert" = "insert";
let shiftToggled = false;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  console.log("Keymap extension activated");

  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "INSERT";
  statusBarItem.show();

  // Set initial context
  vscode.commands.executeCommand("setContext", "keymap:mode", mode);

  // Toggle Mode Command (Ctrl+;)
  let toggleMode = vscode.commands.registerCommand("keymap.toggleMode", () => {
    mode = mode === "insert" ? "normal" : "insert";
    console.log(`Mode switched to: ${mode}`);

    if (mode === "normal") {
      statusBarItem.backgroundColor = new vscode.ThemeColor(
        "statusBarItem.errorBackground"
      );
      statusBarItem.text = "NORMAL";
    } else {
      statusBarItem.backgroundColor = undefined;
      statusBarItem.text = "INSERT";
    }

    // Update cursor style
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.options = {
        cursorStyle:
          mode === "normal"
            ? vscode.TextEditorCursorStyle.Block
            : vscode.TextEditorCursorStyle.Line,
      };
    }

    vscode.commands.executeCommand("setContext", "keymap:mode", mode);
  });

  // Basic movement commands
  let moveLeft = vscode.commands.registerCommand("keymap.moveLeft", () => {
    if (shiftToggled) {
      return vscode.commands.executeCommand("cursorLeftSelect");
    }
    return vscode.commands.executeCommand("cursorLeft");
  });

  let moveDown = vscode.commands.registerCommand("keymap.moveDown", () => {
    if (shiftToggled) {
      return vscode.commands.executeCommand("cursorDownSelect");
    }
    return vscode.commands.executeCommand("cursorDown");
  });

  let moveUp = vscode.commands.registerCommand("keymap.moveUp", () => {
    if (shiftToggled) {
      return vscode.commands.executeCommand("cursorUpSelect");
    }
    return vscode.commands.executeCommand("cursorUp");
  });

  let moveRight = vscode.commands.registerCommand("keymap.moveRight", () => {
    if (shiftToggled) {
      return vscode.commands.executeCommand("cursorRightSelect");
    }
    return vscode.commands.executeCommand("cursorRight");
  });

  // Line navigation
  let moveLineStart = vscode.commands.registerCommand(
    "keymap.moveLineStart",
    () => {
      if (shiftToggled) {
        return vscode.commands.executeCommand("cursorHomeSelect");
      }
      return vscode.commands.executeCommand("cursorHome");
    }
  );

  let moveLineEnd = vscode.commands.registerCommand(
    "keymap.moveLineEnd",
    () => {
      if (shiftToggled) {
        return vscode.commands.executeCommand("cursorEndSelect");
      }
      return vscode.commands.executeCommand("cursorEnd");
    }
  );

  // Word navigation
  let moveWordForward = vscode.commands.registerCommand(
    "keymap.moveWordForward",
    () => {
      if (shiftToggled) {
        return vscode.commands.executeCommand("cursorWordRightSelect");
      }
      return vscode.commands.executeCommand("cursorWordRight");
    }
  );

  let moveWordBackward = vscode.commands.registerCommand(
    "keymap.moveWordBackward",
    () => {
      if (shiftToggled) {
        return vscode.commands.executeCommand("cursorWordLeftSelect");
      }
      return vscode.commands.executeCommand("cursorWordLeft");
    }
  );

  // New line commands
  let newLineBelow = vscode.commands.registerCommand(
    "keymap.newLineBelow",
    () => {
      return vscode.commands.executeCommand("editor.action.insertLineAfter");
    }
  );

  let newLineAbove = vscode.commands.registerCommand(
    "keymap.newLineAbove",
    () => {
      return vscode.commands.executeCommand("editor.action.insertLineBefore");
    }
  );

  // Toggle shift selection
  let toggleShift = vscode.commands.registerCommand(
    "keymap.toggleShift",
    () => {
      shiftToggled = !shiftToggled;
      console.log(`Shift toggled: ${shiftToggled}`);
    }
  );

  context.subscriptions.push(
    statusBarItem,
    toggleMode,
    moveLeft,
    moveDown,
    moveUp,
    moveRight,
    moveLineStart,
    moveLineEnd,
    moveWordForward,
    moveWordBackward,
    newLineBelow,
    newLineAbove,
    toggleShift
  );
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
