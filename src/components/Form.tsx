import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './Audit.css';


const Container = styled.div`
  color: black;
  padding: 7rem 3rem;
  border-radius: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Mona Sans', sans-serif;
  
  @media (max-width: 1024px) {
    padding: 6rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 2rem;
    width: 100%;
  }

  @media (max-width: 568px) {
    padding: 4rem 1rem;
    width: 100%;
  }
`;

const Form__ = styled.div`
  border-radius: 15px;
  margin: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-family: 'Mona Sans', sans-serif;
  
  input {
    background-color: white;
    color: black;
    border: none;
    padding: 10px 15px;
    width: 90%;
    margin-bottom: 1rem;
    font-size: 16px;
  }

  input::placeholder {
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 4rem 2rem;
  }

  @media (max-width: 568px) {
    padding: 3rem 1rem;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 2.6rem;
  margin: auto;
  overflow-y: auto;
  display: flex;
  gap: 2rem;
  width: 60%;
  flex-direction: column;
  border: 1px solid black;
  padding: 0rem 6rem;
  padding-bottom: 5rem;
  justify-content: center;
  align-items: start;
  font-family: 'Mona Sans', sans-serif;

  @media (max-width: 1024px) {
    padding: 4rem 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 1rem;
  }

  @media (max-width: 568px) {
    width: 100%;
    padding: 2rem 1rem;
  }
`;


const FormContainer2 = styled.div`
  background-color: white;
  margin: auto;
  display:flex;
  gap:2rem;
  flex-direction:column;
  width:100%;
    justify-content: center;

  align-items:center;
  font-family: 'Mona Sans', sans-serif;

  @media (max-width: 768px) {
    padding: 5rem 2rem;
  }

  @media (max-width: 568px) {
    padding: 5rem 1rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: black;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 568px) {
    font-size: 2rem;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  width: 70%;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  justify-content: center;

  .input {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .input input,
  .input select,
  .input textarea {
    height: 3rem;
    color: black;
    width: 100%;
    font-family: 'Mona Sans';
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    padding: 0.8rem 1rem;
    border-radius: 3rem;
    border: 1.2px solid black;
    transition: all 0.2s ease-in-out;
  }

  .input textarea {
    height: 10rem;
  }

  .input input:focus,
  .input select:focus,
  .input textarea:focus {
    border: 1.5px solid black;
    border-bottom: 3px solid #000000c0;
  }

  @media (max-width: 768px) {
    .input input,
    .input select,
    .input textarea {
      font-size: 1rem;
    }
  }

  @media (max-width: 568px) {
    .input input,
    .input select,
    .input textarea {
      font-size: 0.9rem;
    }
  }
`;

const IssueButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;


const IssueButton = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: white;
  border: 2px solid #333;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #333;
    color: white;
  }

  &.selected {
    background-color: #333;
    color: white;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: black;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:hover {
    background-color: #333;
  }

  svg {
    color: white;
  }
`;
const Form: React.FC = () => {
  const [animationClass, setAnimationClass] = useState<string>("");

  interface FormData {
    name: string;
    email: string;
    phone: string;
    domain: string;
    description: string;
    websiteLink: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    domain: "",
    description: "",
    websiteLink: "",
  });

  const stepToWords = (step: number) => {
    const words = ["Company Detail", "Customer Detail", "Audit Form", "Audit Form"];
    return words[step] || `${step + 1}th`;
  };

  const questions = [
    "Is the equipment operational?",
    "Was the maintenance check completed?",
    "Is the safety protocol followed?",
    "Any outstanding issues reported?",
  ];

  const [step, setStep] = useState(0);
  const progress = ((step + 1) / questions.length) * 100;

  const [answers, setAnswers] = useState<Array<string | null>>(
    Array(questions.length).fill(null)
  );

  const [nextLoading, setNextLoading] = useState(false);

  const handleNext = () => {
    if (step < questions.length - 1) {
      setNextLoading(true); // Start loading
      setAnimationClass("slide-out");
  
      setTimeout(() => {
        setStep(step + 1); // Move to the next step
        setAnimationClass("slide-in"); // Start the slide-in animation
        setNextLoading(false); // Stop loading
      }, 500); // Delay to simulate loading
    }
  };
  

  const handleBack = () => {
    if (step > 0) {
      setAnimationClass("slide-out");
      setTimeout(() => {
        setStep(step - 1);
        setAnimationClass("slide-in");
      }, 300);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container>
      <FormContainer>
      <FormTitle>Name of The Company</FormTitle>

      <FormContainer2>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="progress-steps">
            {questions.map((_, index) => (
              <div key={index} className="progress-step-container">
                <div
                  className={`progress-step ${index <= step ? "filled" : ""}`}
                >
                  {index + 1}
                </div>
                <div className="progress-step-subheading">
                  {stepToWords(index)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <Form__ className={`form-wrapper ${animationClass}`}>
            <FormWrapper>
              <FormGroup>
                <div className="input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <div className="input">
                  <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>

              <SubmitButton
                type="button"
                onClick={handleNext}
                disabled={nextLoading || formData.name === ""} 
              >
                {nextLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner"></div>
                    Loading...
                  </div>
                ) : (
                  step === questions.length - 1 ? "Submit" : "Next"
                )}
              </SubmitButton>

            </FormWrapper>
          </Form__>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <Form__>
            <FormWrapper>
              <FormGroup>
                <div className="input">
                  <input
                    type="text"
                    name="Name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <div className="input">
                  <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <div className="input">
                  <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <div className="input">
                  <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <div className="input">
                  <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>

              <SubmitButton
                type="button"
                onClick={handleNext}
                disabled={formData.name === "" || nextLoading}
              >
                {nextLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner"></div>
                    Loading...
                  </div>
                ) : (
                  step === questions.length - 1 ? "Submit" : "Next"
                )}
              </SubmitButton>
            </FormWrapper>
          </Form__>
        )}
              </ FormContainer2>

      </FormContainer>
    </Container>
  );
};


export default Form;
