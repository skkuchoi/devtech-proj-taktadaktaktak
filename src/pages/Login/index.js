import React from "react";
import { useCallback } from "react";
import { serverAxios } from "utils/commonAxios";
import { mutate } from "swr";
import { ButtonDiv, LoginTitle, ToRegister, ToRegisterParagraph } from "./style";
import InputEmail from "components/common/Inputs/InputEmail";
import InputPassword from "components/common/Inputs/InputPassword";
import Button from "components/common/Button";

function Login() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function login() {
      // form 핸들
      const form = e.currentTarget;
      const formElements = form.elements;

      try {
        const body = {
          email: formElements?.email.value,
          password: formElements?.password.value,
        };

        serverAxios
          .post("/users/me", body, {
            withCredentials: true,
          })
          .then(function (response) {
            // POST 요청 성공 시

            // 쿠키로 보내줄거같아서 localStorage.setItem 을 불필요할 것 같긴 한데 일단 넣어두겠습니다.
            // localStorage.setItem("token", response.data.token);
            // mutate();
            // 로그인 성공 시
            // this.props.history.push("/");
            console.log("로그인 성공");
          });
      } catch (e) {
        // 로그인 실패 시
        // console.log(e);
        console.log("없는 계정입니다. ");
      }
    }
    login();
  }, []);

  return (
    <>
      <LoginTitle>로그인하기</LoginTitle>
      <form onSubmit={handleSubmit}>
        <InputEmail></InputEmail>
        <InputPassword></InputPassword>
        <Button type="submit">로그인</Button>
      </form>
      <ButtonDiv>
        <ToRegisterParagraph>
          <ToRegister>
            <a href="./register">회원가입</a>
          </ToRegister>
          하러 가기
        </ToRegisterParagraph>
      </ButtonDiv>
    </>
  );
}

export default Login;
