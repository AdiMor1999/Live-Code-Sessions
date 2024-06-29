import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { initSocketConnection } from '../services/socketService';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/CodeBlockPage.css';
import axios from 'axios';
import { CodeBlock } from '../pages/HomePage'

const CodeBlockPage: React.FC = () => {
  //useParams extracts URL parameters
  const { id } = useParams<{ id: string }>();
  //useState manages component state, such as role and code.
  const [role, setRole] = useState<'mentor' | 'student'>('student');
  const [code, setCode] = useState('');
  const [codeBlockTitle, setCodeBlockTitle] = useState<string>('');
  const [socket, setSocket] = useState<ReturnType<typeof initSocketConnection> | null>(null);

  //useEffect is used to manage side effects like socket connections.
  //This hook runs once when the component mounts and whenever the id parameter changes.
  useEffect(() => {
    console.log("hiiii")

    const fetchCodeBlock = async () => {
      try {
        const response = await axios.get<CodeBlock>(`http://localhost:5000/codeblocks/${id}`);
        setCodeBlockTitle(response.data.title);
        setCode(response.data.code);
      } catch (error) {
        console.error('Error fetching code block:', error);
      }
    };
    fetchCodeBlock();

    const socket = initSocketConnection();
    
    setSocket(socket);

    // Emit event to join a specific code block room
    socket.emit('joinCodeBlock', id); 

    // Listen for the role assignment from the server
    socket.on('roleAssignment', ({ role }) => {
      setRole(role);
    });

    // Listen for code updates from the server
    socket.on('codeUpdate', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();//method is called when the component unmounts or when the id changes to cleanly disconnect from the WebSocket server.
    };
  }, [id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (role === 'student') {
      // Emit code change event to the server
      socket?.emit('codeChange', { codeBlockId: id, newCode });
    }
  };

  return (
 <Container fluid className="code-block-container">

        <div className="code-block-title">
          <h1>{codeBlockTitle}</h1>
        </div>

      <Row >
        <Col md={3}>
          <div className="role-permissions">
            <h3>Role: {role}</h3>
            <p>Permissions: {role === 'mentor' ? 'View Only' : 'Edit'}</p>
          </div>
        </Col>
        <Col md={9}>
          <div className="code-editor-wrapper">
            <CodeEditor code={code} onChange={handleCodeChange} isEditable={role === 'student'} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeBlockPage;
