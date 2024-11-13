import React from 'react';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; // Assuming your Amplify config is here

// Configure Amplify with the AWS resources
Amplify.configure(awsconfig);

const App = () => {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Upload Image to S3</h1>
      <p>Select an image to upload to your S3 bucket.</p>

      {/* FileUploader component */}
      <FileUploader
        acceptedFileTypes={['image/*']}  // Accepts image files only
        path="public/"                   // Folder path inside the S3 bucket
        maxFileCount={1}                 // Limit to 1 file at a time
        isResumable={true}               // Allows file upload resumption if interrupted
      />
    </div>
  );
};

export default App;
