import { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftArrow, RightArrow } from "../assets";
import axios from "axios";

interface BannerExplainProps {
  borderIndex: number;
}

interface UrlProps {
  id: number;
  bannerImgUrl: string;
}

const AdBanner: React.FC = () => {
  const banners = [
    { explain: "1번배너소개" },
    { explain: "2번배너소개" },
    { explain: "3번배너소개" },
    { explain: "4번배너소개" },
    { explain: "5번배너소개" },
    { explain: "6번배너소개" },
    { explain: "7번배너소개" },
    { explain: "8번배너소개" },
    { explain: "9번배너소개" },
    { explain: "10번배너소개" },
  ];

  const [img, setImg] = useState(0);
  const [borderIndex, setBorderIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<UrlProps[]>([]);

  const imgChangeLeft = () => {
    setImg((prevImg) =>
      prevImg > 0 ? prevImg - 1 : currentImage?.length! - 1
    );
    setBorderIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 9));
  };

  const imgChangeRight = () => {
    setImg((prevImg) =>
      prevImg < currentImage?.length! - 1 ? prevImg + 1 : 0
    );
    setBorderIndex((prevIndex) => (prevIndex < 9 ? prevIndex + 1 : 0));
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://prod-server.xquare.app/jung-ho/main"
      );
      const images = response.data.banners;
      setCurrentImage(images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataAndChangeImage = async () => {
      await fetchData();
      imgChangeRight();
    };

    fetchDataAndChangeImage();

    const intervalId = setInterval(() => {
      fetchDataAndChangeImage();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <BannerImage src={currentImage?.[img]?.bannerImgUrl} alt="배너이미지" />
      <BannerBar>
        <MoveBanner>
          <NumberWrapper>
            <CurrentNumber>{img + 1}</CurrentNumber>
            <And>/</And>
            <TotalNumber>{currentImage.length}</TotalNumber>
          </NumberWrapper>
          <ArrowImg src={LeftArrow} onClick={imgChangeLeft} alt="왼쪽 화살표" />
          <ArrowImg
            src={RightArrow}
            onClick={imgChangeRight}
            alt="오른쪽 화살표"
          />
        </MoveBanner>
        <ExplainWrapper>
          {banners.map((element) => (
            <BannerExplain borderIndex={borderIndex}>
              <p>{element.explain}</p>
            </BannerExplain>
          ))}
        </ExplainWrapper>
      </BannerBar>
    </Container>
  );
};

const Container = styled.div``;

const BannerImage = styled.img`
  position: relative;
  width: 100%;
  height: 335px;
`;

const BannerBar = styled.div`
  display: flex;
  gap: 44px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 76px;
  border-bottom: 1px solid #e9ecef;
`;

const MoveBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 168px;
  height: 52px;
  background-color: #000000;
  opacity: 0.4;
  border-radius: 90px;
`;

const NumberWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CurrentNumber = styled.p`
  color: white;
  font-size: 20px;
  font-family: "DXhimchanLight";
`;

const And = styled.p`
  color: white;
  font-size: 20px;
  font-family: "DXhimchanLight";
`;

const TotalNumber = styled.p`
  color: white;
  font-size: 20px;
  font-family: "DXhimchanLight";
`;

const ArrowImg = styled.img`
  width: 7px;
  height: 14px;
  cursor: pointer;
`;

const ExplainWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const BannerExplain = styled.div<BannerExplainProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 38px;
  border: 1px solid #e1e1e1;
  border-radius: 30px;
  color: #333b3d;
  font-size: 18px;
`;

export default AdBanner;
