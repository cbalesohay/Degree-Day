import React, {useState, useEffect} from 'react';
const API_URL = process.env.API_URL;

type FetchDataProps = {
  data: any; // Add data property
  isLoading: boolean;
  isError: boolean;
  error: string;
};

export const Fetch = (
  selectedDate: string,
  selectedSpecies: string,
  selectedReqData: string,
): FetchDataProps => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const info = {
    date: selectedDate,
    species: selectedSpecies,
    reqData: selectedReqData,
  };
  const fetchData = async (info: {
    date: string;
    species: string;
    reqData: string;
  }): Promise<void> => {
    setIsLoading(true);
    setIsError(false); // Reset error state before starting the request
    setError('');
    try {
      if (!API_URL) {
        throw new Error('API_URL is not defined');
      }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json(); // Parse the response as JSON
      // console.log(json); // To check the data recieved
      setData(json); // Update the state with the fetched data
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error occurred:', err.message); // Will log error in console instead of on screen
        setIsError(true); // Set error state if there's an issue
        setError(err.message); // Store the error message for debugging
      } else {
        console.log('An unknown error occurred');
        setIsError(true);
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    if (isMounted) {
      fetchData(info); // Call fetchData when the dependencies change
    }

    // Cleanup function to prevent setting state after unmount
    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedSpecies, selectedReqData]); // Only rerun when dependencies change

  return {data, isLoading, error, isError};
};
