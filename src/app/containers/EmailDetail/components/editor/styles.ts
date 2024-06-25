import styled from "styled-components";

export const RichTextEditorContainer = styled.div`
  width: 100%;
  .ql-snow .ql-tooltip.ql-editing input[type="text"] {
    color: blue;
  }
  .ql-editor .ql-size-small {
    font-size: 11px;
  }

  .ql-editor .ql-size-large {
    font-size: 24px;
  }

  .ql-editor .ql-size-huge {
    font-size: 40px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "Normal";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="11px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="11px"]::before {
    content: "Small";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    content: "Large";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="40px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="40px"]::before {
    content: "Huge";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="11px"]::before {
    font-size: 11px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    font-size: 24px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="40px"]::before {
    font-size: 40px;
  }
  .ql-toolbar {
    background-color: var(--dark-gray);
    border: none !important;
    border-radius: 4px 4px 0 0;
    display: flex;
    position: sticky;
    top: 24px;
    z-index: 1003;
    cursor: pointer;
  }

  .ql-container {
    position: relative;
    border: none !important;
    border-radius: 0 0 4px 4px;
  }

  .ql-editor {
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;
    min-height: 100px;
    max-height: 300px;
    background-color: var(--background);
  }

  .ql-snow .ql-code-block-container {
    border-left: 4px solid transparent;
    padding: 10px;
    font-family: monospace;
  }

  .ql-toolbar .ql-formats {
    display: flex;
    align-items: center;
  }

  .ql-toolbar .ql-picker {
    height: 100%;
    display: flex;
    border: none !important;
    background: none;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .ql-toolbar .ql-picker-label {
    transition:
      background-color 0.3s,
      color 0.3s;
    border-radius: 3px;
    &:hover {
      background-color: var(--dark-gray-hover);
      color: var(--text) !important;
    }
  }
  .ql-picker-label {
    padding-top: 3px;
  }

  .ql-toolbar .ql-picker-options {
    padding: 0px;
    background-color: var(--dark-gray);
    border-radius: 0 0 4px 4px;
  }

  .ql-toolbar .ql-picker-item {
    padding: 8px;
    transition:
      background-color 0.3s,
      color 0.3s;
    &:hover {
      background-color: var(--dark-gray-hover);
    }
  }

  .ql-toolbar .ql-formats button {
    border: none !important;
    background: none;
    width: 30px;
    height: 30px;
    padding: 3px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    border-radius: 3px;
    &:hover {
      background-color: var(--dark-gray-hover);
    }

    &:focus {
      outline: none;
    }
  }

  .ql-toolbar .ql-formats button.ql-active {
    background-color: var(--bright-blue);
  }
  .ql-stroke {
    stroke: var(--text) !important;
  }

  .ql-fill {
    fill: var(--text) !important;
  }

  .ql-picker {
    color: var(--text) !important;
  }

  .ql-picker-options .ql-picker-item {
    color: var(--text) !important;
  }
  /* .ql-stroke:hover,
  .ql-fill:hover,
  .ql-picker:hover,
  .ql-picker-options .ql-picker-item:hover {
    stroke: var(--dark-gray-hover) !important;
    fill: var(--dark-gray-hover) !important;
    color: var(--dark-gray-hover) !important;
  } */
`;
