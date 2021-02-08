import * as React from "react";
import ReactDOM from "react-dom";

import { FocusRing, FocusRingScope } from "../src";
import "../src/styles.css";

import "focus-visible";

function Button() {
  return (
    <FocusRing offset={-2}>
      <button onClick={console.log}>Click Me</button>
    </FocusRing>
  );
}

function Anchor({ children }) {
  return (
    <FocusRing>
      <a tabIndex={0} href="#">
        {children}
      </a>
    </FocusRing>
  );
}

function Scrollable({ children }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // Render the scope _within_ the scrolling container so that it will render
  // in the same layer and perfectly follow content as it scrolls.
  // Note that the container still needs a `position: relative`.
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: 100,
        overflow: "scroll",
        backgroundColor: "#eee",
        padding: 8,
      }}>
      <FocusRingScope containerRef={containerRef}>{children}</FocusRingScope>
    </div>
  );
}

function App() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <FocusRingScope containerRef={containerRef}>
      <div className="app-container" ref={containerRef}>
        <div className="content">
          <p>Here's a paragraph with some text.</p>
          <Button />
          <Button />
          <Button />
          <p>
            Here's another paragraph with more text. This one has an{" "}
            <Anchor>anchor tag inside it</Anchor> that you can also focus.
          </p>
          <FocusRing within>
            <div style={{ padding: 20 }}>
              <p>Focus within</p>
              <Button />
              <Anchor>Hello friends</Anchor>
            </div>
          </FocusRing>
          <p>
            This is an example of a scrolling container that uses a nested{" "}
            <code>FocusRingScope</code> to ensure that rings are always rendered in the right
            position.
          </p>
          <Scrollable>
            <Button />
            <p>
              Some padding text that hopefully wraps multiple lines to add vertical space so that
              the buttons are forced to scroll the container when they receive focus.
            </p>
            <Button />
            <p>More padding text</p>
            <Button />
          </Scrollable>
        </div>
      </div>
    </FocusRingScope>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
