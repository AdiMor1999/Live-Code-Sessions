import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';
import '../styles/CodeEditor.css';

interface CodeEditorProps {
  code: string; 
  onChange: (code: string) => void; 
  isEditable: boolean; 
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isEditable }) => {
  const [localCode,setLocalCode] = useState(code)

  useEffect(()=>{
    setLocalCode(code);
  },[code]);

  useEffect(()=>{
    const handler=setTimeout(()=>{
      onChange(localCode);
    },300);
    return () =>{
      clearTimeout(handler)
    };
  },[localCode,onChange]);
  
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalCode(event.target.value);
  };

  return (
    <div className="code-editor">
      {isEditable ? (
        <textarea value={localCode} onChange={handleCodeChange} className="code-editor-textarea" />
      ) : (
        <Highlight className="javascript">{code}</Highlight>
      )}
    </div>
  );
};

export default CodeEditor;
