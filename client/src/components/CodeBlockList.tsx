// CodeBlockList.tsx

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CodeBlock } from '../pages/HomePage';

interface CodeBlockListProps {
  codeBlocks: CodeBlock[];
}

const CodeBlockList: React.FC<CodeBlockListProps> = ({ codeBlocks }) => {
  const navigate = useNavigate();

  // Array of Bootstrap variants
  const customColors = ['#F19CBB', '#1AC69C', '#3FA4FF', '#C478FF'];

  return (
    <ListGroup className="w-100">
      {codeBlocks.map((block, index) => {
        // Get the corresponding color or fall back to a default color
        const color = customColors[index] || '#333'; // Fallback to '#333' if index exceeds array length

        return (
          <ListGroup.Item
            key={block._id}
            action
            onClick={() => navigate(`/codeblock/${block._id}`)}
            style={{
              backgroundColor: color,
              color: 'white',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            {block.title}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CodeBlockList;
