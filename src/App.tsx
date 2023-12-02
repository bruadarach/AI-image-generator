import { useState } from "react";
import { styled } from "styled-components";
import { CallGPT } from "./api/gpt";
import Loading from "./components/Loading";
import RequestInput from "./components/RequestInput";
import Button from "./components/Button";

function App() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [image, setImage] = useState("");

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

  const handleCallAPI = async () => {
    if (userInput === "") {
      alert("Please write your request.");
      return;
    }

    setIsSubmitted(false);

    try {
      setIsLoading(true);
      const message = await CallGPT(userInput);
      setImage(message);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>AI Image Generator</Title>
        <SubTitle>Your ideas come alive with colors and details.</SubTitle>
        <SubTitle>Turn your thoughts into art with our AI magic!</SubTitle>
        <UserInput>
          <RequestInput
            userInput={userInput}
            handleUserInput={handleUserInput}
          />
        </UserInput>
        <Button
          name={"Generate Image"}
          handleClick={handleCallAPI}
          isLoading={isLoading}
        />
        <CounselingLog>
          {isLoading && <Loading />}
          <Line />
          {!isLoading && isSubmitted && <img src={image} alt="image" />}
        </CounselingLog>
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  max-width: 768px;
  min-width: 250px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  padding: 60px;
  width: 100%;

  @media screen and (max-width: 640px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  margin: 10px 0;
  color: #841853;

  @media screen and (max-width: 640px) {
    padding: 30px;
  }

  @media screen and (max-width: 320px) {
    font-size: 26px;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 15px;
  color: #bb798b;
  font-weight: 300;
`;

const UserInput = styled.div`
  margin: 40px 0;
  width: 100%;
`;

const Line = styled.div`
  margin: 40px 0;
  border-top: 4px dotted #f8b8be;
`;

const CounselingLog = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
`;
