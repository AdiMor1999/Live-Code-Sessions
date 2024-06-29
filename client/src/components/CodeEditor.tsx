import React from 'react';
import Highlight from 'react-highlight';
import '../styles/CodeEditor.css';

interface CodeEditorProps {
  code: string; //current code content.
  onChange: (code: string) => void; //handle changes in the code
  isEditable: boolean; //if the code editor is in editable
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isEditable }) => {
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="code-editor">
      {isEditable ? (
        <textarea value={code} onChange={handleCodeChange} className="code-editor-textarea" />
      ) : (
        <Highlight className="javascript">{code}</Highlight>
      )}
    </div>
  );
};

export default CodeEditor;
