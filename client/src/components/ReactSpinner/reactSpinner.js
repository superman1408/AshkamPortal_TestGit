/** @jsxImportSource @emotion/react */
import { keyframes, css } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinnerStyle = css`
  width: 16px;
  height: 16px;
  border: 2px solid #eee;
  border-top: 2px solid #999;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const LoadingSpinner = () => {
  return <div css={spinnerStyle} />;
};

export default LoadingSpinner;
