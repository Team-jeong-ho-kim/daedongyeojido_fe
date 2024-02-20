import styled from "styled-components";
import { Alarm, LogoBlack, MyPage } from "../assets";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  setAlarmVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setManageVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setAlarmVisible }) => {
  const [alarmVisible, setAlarmVisible_] = useState(false);

  const AlarmClick = () => {
    setAlarmVisible((prevVisible) => !prevVisible);
  };

  return (
    <Container>
      <Wrapper>
        <LogoWrapper to="/">
          <LogoImg src={LogoBlack} />
          <Name>대동여지도</Name>
        </LogoWrapper>
        <ButtonWrapper>
          <TextButton to="/ApplicantMgt">지원자 확인</TextButton>
          <TextButton to="/ClubMgt">동아리 관리</TextButton>
          <TextButton to="">회식 신청</TextButton>
        </ButtonWrapper>
      </Wrapper>
      <IconWrapper>
        <AlarmImg src={Alarm} onClick={AlarmClick} />
        <Link to="/My">
          <MyPageImg src={MyPage} />
        </Link>
      </IconWrapper>
      {alarmVisible && <Alarm setAlarmVisible={setAlarmVisible_} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: White;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 650px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

const TextButton = styled(Link)`
  font-size: 20px;
  font-weight: Light;
`;

const LogoImg = styled.img`
  width: 32px;
  height: 48px;
`;

const Name = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const AlarmImg = styled.img`
  width: 36px;
  height: 36px;
`;

const MyPageImg = styled.img`
  width: 48px;
  height: 48px;
`;

export default Header;
