import React, { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import awsconfig from './aws-exports';
import { listCelebrityImageMetdata } from './graphql/queries';// Adjust if necessary
import '@aws-amplify/ui-react/styles.css';



Amplify.configure(awsconfig);
const API = generateClient();
const App = () => {
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchImages = async () => {
    setIsFetching(true); // Show loading state
    try {
      // Call the list query without specific filters to fetch all items
      const response = await API.graphql(graphqlOperation(listCelebrityImageMetdata));
       // Log the entire response to the console to inspect its structure
      console.log("GraphQL Response:", response);
      
      // If data is returned, update the state with the list of images
      if (response?.data?.listCelebrityImageMetdata?.items) {
        setImages(response.data.listCelebrityImageMetdata.items);
      } else {
        console.log("No items found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsFetching(false); // Hide loading state
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
          <header>
            <h1>Welcome, {user?.username}!</h1>
            <button onClick={signOut} style={{ marginBottom: '20px' }}>Sign Out</button>
          </header>

          <h2>Upload Image to S3</h2>
          <p>Select an image to upload to your S3 bucket.</p>
          <FileUploader
            acceptedFileTypes={['image/*']}
            path="public/"
            maxFileCount={1}
            isResumable={true}
          />

          <h2>Fetch Image Recognition Results</h2>
          <button onClick={fetchImages} style={{ marginBottom: '20px' }}>
            {isFetching ? 'Fetching...' : 'Fetch Results'}
          </button>

          {images.length > 0 ? (
            <div>
              <h2>Image Recognition Results</h2>
              {images.map((image) => (
                <div key={image.ImageKey} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                  <p><strong>Image Key:</strong> {image.ImageKey}</p>
                  <p><strong>Celebrity Name:</strong> {image.celebrityName}</p>
                  <p><strong>Confidence:</strong> {image.confidence}</p>
                  <p><strong>Description:</strong> {image.description}</p>
                  <p><strong>Timestamp:</strong> {image.Timestamp}</p>
                  <p><strong>URL:</strong> <a href={image.url}>{image.url}</a></p>
                </div>
              ))}
            </div>
          ) : (
            <p>No image recognition results available.</p>
          )}
        </div>
      )}
    </Authenticator>
  );
};

export default App;