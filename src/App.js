import React, { useState, useEffect } from 'react';
import { FaMagic, FaRedoAlt } from "react-icons/fa";
import axios from 'axios';
import { Input, Image, ChakraProvider, ButtonGroup, Button, Flex, Stack, Center, Alert, AlertIcon } from "@chakra-ui/react";

const HOST = "https://994e-129-128-184-114.ngrok-free.app";
// const HOST = "http://127.0.0.1:5000";
const DEBOUNCE_DELAY = 150; // Time in milliseconds

function App() {
  const [inputValue, setInputValue] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isGeneratingHQ, setIsGeneratingHQ] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        fetchImage(inputValue);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler); // Cleanup the timeout if inputValue changes or component unmounts
  }, [inputValue]); // Effect runs on inputValue change

  // Function to send request
  const fetchImage = async (prompt, image = null, fast = true) => {
    try {
      const response = await axios.post(`${HOST}/api/generate-image`, {
        fast,
        image,
        prompt: prompt,
      });
      setImageSrc(`data:image/jpeg;base64,${response.data.base64_image}`);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching image:', error);
      // setImageSrc('https://via.placeholder.com/512');
      setErrorMessage('An error occured while generating your image. Please try again.')
    }
  };

  // Function triggered on clicking Generate HQ Image
  const onClickGenerateHQImage = async () => {
    setIsGeneratingHQ(true);
    await fetchImage(inputValue, imageSrc, false);
    setIsGeneratingHQ(false);
  };

  // Function triggered on clicking Redo Image
  const onClickRedoImage = async () => {
    await fetchImage(inputValue);
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" verticalAlign="center" alignContent="center" justifyContent="center">
        <Center>
          <Stack direction="column" width="100%" spacing={4} align="center">
            {imageSrc && <Image
              src={imageSrc}
              style={{ width: '512px', height: '512px', paddingBottom: '32px' }}
            />}

            <Input
              placeholder="Type in your prompt..."
              size="lg"
              width={512}
              value={inputValue}
              onChange={handleInputChange}
            />

            <ButtonGroup width="100%" direction='row' spacing={4}>
              <Button leftIcon={<FaMagic />} colorScheme='blue' width="100%" variant='solid' isLoading={isGeneratingHQ} isDisabled={!inputValue} onClick={onClickGenerateHQImage}>
                Generate HQ
              </Button>
              <Button leftIcon={<FaRedoAlt />} colorScheme='blue' width="100%" variant='outline' isDisabled={!inputValue} onClick={onClickRedoImage}>
                Redo
              </Button>
            </ButtonGroup>

            {errorMessage && <Alert status='error' style={{ marginTop: "16px" }}>
              <AlertIcon />
              {errorMessage}
            </Alert>}
          </Stack>
        </Center>
      </Flex>
    </ChakraProvider>
  );
}

export default App;