import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { styled } from "styled-components";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const ModalMenuButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  white-space: nowrap;
  font-family: "Nanum Pen Script", cursive;
  position: static;
  background-color: #fd565f;
  color: white;
`;

const ModalCustom = {
  content: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "40%",
    padding: "0px",
    gap: "5%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "none",
    borderRadius: "30px",
  },
};

if (window.innerWidth < 1000) {
  ModalCustom.content.width = "80%";
  ModalCustom.content.height = "30%";
}
//모달창 커스텀

const ModalText = styled.div`
  font-family: "Nanum Pen Script";
  font-size: 32px;
  font-weight: 700;
`;

const ModalButtonDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 20%;
  gap: 10%;
`;

const ModalButton = styled.button`
  border-radius: 10px;
  border: none;
  width: 30%;
  font-size: 30px;
  font-family: "Nanum Pen Script";

  &:hover {
    border: 2px solid black;
  }
`;

const YesButton = styled(ModalButton)`
  background-color: #695dff;
  color: white;
`;

const NoButton = styled(ModalButton)``;

//originData는 Edit페이지에서 DiaryEditor보내져 받아온다.
export function DiaryModal({ originData }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const { onRemove } = useContext(DiaryDispatchContext);

  const handleRemove = () => {
    onRemove(originData.id);
    navigate("/", { replace: true });
  };
  //삭제 함수

  useEffect(() => {
    console.log(originData);
  }, []);

  return (
    <>
      <ModalMenuButton onClick={openModal}>삭제하기</ModalMenuButton>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={ModalCustom}
      >
        <ModalText>정말로 일기를 지우시겠습니까?</ModalText>
        <ModalButtonDiv>
          <NoButton onClick={closeModal}>아니오</NoButton>
          <YesButton onClick={handleRemove}>네</YesButton>
        </ModalButtonDiv>
      </Modal>
    </>
  );
}

export default DiaryModal;
