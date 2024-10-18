import styled from "styled-components";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 40px auto 0 auto;

  @media (max-width: 1200px) {
    width: 93.5%;
  }

  @media (max-width: 744px) {
    width: 91.7%;
    margin: 24px auto 0 auto;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #111827;
`;

const Textarea = styled.textarea`
  border: none;
  border-radius: 12px;
  background: #f3f4f6;
  width: 100%;
  height: 104px;
  padding: 16px 24px;
  margin-top: 9px;
  resize: none;

  &:focus {
    outline-color: var(--blue);
  }

  &::placeholder {
    font-weight: 400;
    color: #9ca3af;
  }

  @media (max-width: 744px) {
    height: 129px;
  }
`;

const Button = styled.button`
  border-radius: 8px;
  background: var(--blue);
  width: 74px;
  height: 42px;
  font-weight: 600;
  color: #f3f4f6;
  margin: 16px 0 0 auto;
  transition: 0.3s;

  &:disabled {
    background: #9ca3af;
    cursor: auto;
  }
`;

export { Inner, Label, Textarea, Button };
