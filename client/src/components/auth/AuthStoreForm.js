import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import axios from "axios";

/**
 * 관리자 가게 추가 및 가게 정보 수정
 */

const AuthStoreFormBlock = styled.div`
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

const AuthStoreForm = ({ props, type }) => {
  const text = textMap[type];

  const dispatch = useDispatch();

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

  return (
    <AuthStoreFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmitHandler}>
        <StyledInput
          placeholder="아이디"
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
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthStoreFormBlock>
  );
};

// const AuthStoreForm = ({ type, form, onChange, onSubmit, error }) => {
//   const text = textMap[type];
//   return (
//     <AuthStoreFormBlock>
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
//     </AuthStoreFormBlock>
//   );
// };

export default AuthStoreForm;
