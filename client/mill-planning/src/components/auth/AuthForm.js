import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import axios from "axios";

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;


const textMap = {
  login: "로그인",
  register: "회원가입",
};

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const { Kakao } = window;

const AuthForm = ({ type }) => {
  const text = textMap[type];

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function onEmailChange(e) {
    setEmail(e.currentTarget.value);
  }

  function onPasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  async function loginUser(body) {
    const result = await axios.post("/api/auth/login", body);

    console.log(result);

    return result;
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const body = {
      email: Email,
      password: Password,
      admin: false,
    };

    loginUser(body);
  }

  function KakaoLogin() {
    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    console.log(Kakao.Auth.authorize({
      redirectUri: 'http://localhost:6534/api/auth/oauth/kakao',
      //어드민일시 'api/auth/oauth/kakao/1로 바꿔야함
      scope: 'profile, gender'
    }))
  }

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmitHandler}>
        <StyledInput
          placeholder="이메일"
          type="email"
          value={Email}
          onChange={onEmailChange}
        />
        <br />
        <StyledInput
          placeholder="비밀번호"
          type="password"
          value={Password}
          onChange={onPasswordChange}
        />
        <br />
        {type === "register" && <StyledInput placeholder="전화번호" />}
        <Button
          cyan
          fullWidth
          style={{ marginTop: "1rem" }}
          type="submit"
        >
          {text}
        </Button>
        {
          type === "login" && 
          <Button
          yellow
          fullWidth
          style={{ marginTop: "1rem" }}
          type="button"
          onClick={KakaoLogin}
        >
          카카오 로그인
        </Button>
        }
        
        <div className={('login')}>

        </div>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
            <Link to="/login">로그인</Link>
          )}
      </Footer>
    </AuthFormBlock>
  );
};

// const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
//   const text = textMap[type];
//   return (
//     <AuthFormBlock>
//       <h3>{text}</h3>
//       <form onSubmit={onSubmit}>
//         <StyledInput
//           autoComplete="username"
//           name="username"
//           placeholder="아이디"
//           onChange={onChange}
//           value={form.username}
//         />
//         <StyledInput
//           autoComplete="new-password"
//           name="password"
//           placeholder="비밀번호"
//           type="password"
//           onChange={onChange}
//           value={form.password}
//         />
//         {type === 'register' && (
//           <StyledInput
//             autoComplete="new-password"
//             name="passwordConfirm"
//             placeholder="비밀번호 확인"
//             type="password"
//             onChange={onChange}
//             value={form.passwordConfirm}
//           />
//         )}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <Button cyan fullWidth style={{ marginTop: '1rem' }}>
//           {text}
//         </Button>
//       </form>
//       <Footer>
//         {type === 'login' ? (
//           <Link to="/register">회원가입</Link>
//         ) : (
//           <Link to="/login">로그인</Link>
//         )}
//       </Footer>
//     </AuthFormBlock>
//   );
// };

export default AuthForm;
