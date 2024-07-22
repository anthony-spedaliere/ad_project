import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDraftForm,
  setCurrentPage,
  setNumberOfMaps,
  updateMap,
  updatePOI,
} from "../store/slices/newDraftSlice";

import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  CustomSpan,
  NewDraftContainer,
  NewDraftFormContainer,
  SubContainer,
  TeamHeader,
  TeamHeaderItem,
} from "../styles/MyDraftStyles";
import CustomModal from "../ui/CustomModal";
import { MdKeyboardArrowLeft } from "react-icons/md";
import StyledButton from "../ui/StyledButton";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import FormRow from "../ui/FormRow";
import NewDraftPageHeader from "../components/NewDraftPageHeader";

function NewDraftPageThree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  // redux state
  const maps = useSelector((state) => state.newDraft.maps);
  const numMaps = useSelector((state) => state.newDraft.numMap);

  // Exit Modal functions
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  //=====================================================================
  //=====================================================================

  // Reset Modal functions

  const showResetModal = () => {
    setIsResetModalVisible(true);
  };

  const handleResetCancel = () => {
    setIsResetModalVisible(false);
  };

  const handleResetConfirm = () => {
    handleResetDraftForm();
    handleResetCancel();
  };

  const handleResetDraftForm = () => {
    dispatch(resetDraftForm());
  };

  //=====================================================================
  //=====================================================================

  const handleFinish = () => {
    navigate("/new-draft-three");
  };

  const handleClickPrev = () => {
    navigate("/new-draft-two");
  };

  const handleNumberOfMapsChange = (n) => {
    const numberOfMaps = n;
    if (numberOfMaps >= 0 && numberOfMaps <= 4) {
      dispatch(setNumberOfMaps(numberOfMaps));
    }
  };

  const handleMapChange = (index, key, value) => {
    if (key == "numPoi") {
      if (value >= 0 && value <= 30) {
        dispatch(updateMap({ index, key, value }));
      }
      return;
    } else {
      dispatch(updateMap({ index, key, value }));
    }
  };

  const handlePOIChange = (mapIndex, poiIndex, key, value) => {
    if (key === "points") {
      if (value >= 0 && value <= 30) {
        dispatch(updatePOI({ mapIndex, poiIndex, key, value }));
      }
      return;
    } else {
      dispatch(updatePOI({ mapIndex, poiIndex, key, value }));
    }
  };

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(3));
  }, [dispatch]);

  return (
    <NewDraftContainer>
      <NewDraftPageHeader
        showExitModal={showModal}
        showResetModal={showResetModal}
      />

      <NewDraftFormContainer>
        <form>
          <SubContainer>
            <div>
              <StyledHeader
                $textDecoration="underline"
                $fontSize="2rem"
                $fontWeight="100"
              >
                Maps
              </StyledHeader>
              <StyledHeader
                $fontSize="1.5rem"
                $fontWeight="100"
                $mgBottom="1rem"
              >
                Add map information below to be included in draft.
              </StyledHeader>
              <FormRow label="Number of Maps (max. of 4)">
                <StyledInput
                  $bgColor="var(--brand-color)"
                  height="4rem"
                  type="number"
                  id="numberOfMaps"
                  value={numMaps}
                  onChange={(e) => handleNumberOfMapsChange(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                />
              </FormRow>
            </div>
            <div>
              <StyledHeader
                $textDecoration="underline"
                $fontSize="2rem"
                $fontWeight="100"
              >
                Drop Locations (POI&apos;s)
              </StyledHeader>
              <StyledHeader
                $fontSize="1.5rem"
                $fontWeight="100"
                $mgBottom="1rem"
              >
                Enter the drop location information for each map.
              </StyledHeader>
              {maps.map((map, index) => (
                <div style={{ marginBottom: "8rem" }} key={index}>
                  <FormRow label={`Map ${index + 1} Name`}>
                    <StyledInput
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      type="text"
                      maxLength="30"
                      id={`mapName-${index}`}
                      value={map.mapName}
                      onChange={(e) =>
                        handleMapChange(index, "mapName", e.target.value)
                      }
                    />
                  </FormRow>
                  <FormRow label="Number of POI's">
                    <StyledInput
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      type="number"
                      id={`numOfPoi-${index}`}
                      value={map.numPoi}
                      onChange={(e) =>
                        handleMapChange(index, "numPoi", e.target.value)
                      }
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                    />
                  </FormRow>

                  <TeamHeader>
                    <TeamHeaderItem>POI Name</TeamHeaderItem>
                    <TeamHeaderItem>POI Number</TeamHeaderItem>
                  </TeamHeader>
                  {map.pois.map((poi, poiIndex) => (
                    <div
                      key={poiIndex}
                      style={{
                        display: "flex",
                        columnGap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <StyledInput
                        $flex="1"
                        $bgColor="var(--brand-color)"
                        height="4rem"
                        id={`poiName-${index}-${poiIndex}`}
                        type="text"
                        placeholder={`POI ${poiIndex + 1} Name`}
                        maxLength="30"
                        value={poi.name}
                        onChange={(e) =>
                          handlePOIChange(
                            index,
                            poiIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <StyledInput
                        $flex="1"
                        $bgColor="var(--brand-color)"
                        height="4rem"
                        type="number"
                        id={`poiNumber-${index}-${poiIndex}`}
                        placeholder={`POI ${poiIndex + 1} Points`}
                        value={poi.points}
                        onChange={(e) =>
                          handlePOIChange(
                            index,
                            poiIndex,
                            "points",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SubContainer>
        </form>
        <ButtonContainer $marginTop="4rem" $justifyContent="space-between">
          <StyledButton
            $bgColor="var(--brand-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--brand-color-dark)"
            height="4rem"
            width="20rem"
            onClick={handleClickPrev}
          >
            <CustomSpan $justifyContent="center">
              <MdKeyboardArrowLeft /> Prev
            </CustomSpan>
          </StyledButton>
          <StyledButton
            $bgColor="var(--brand-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--brand-color-dark)"
            height="4rem"
            width="20rem"
            onClick={handleFinish}
          >
            <CustomSpan $justifyContent="center">Finish</CustomSpan>
          </StyledButton>
        </ButtonContainer>
      </NewDraftFormContainer>
      <CustomModal
        title="Leave Draft Creation"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        bgColor="var(--background-color)"
        textColor="var(--brand-color)"
        okBgColor="var(--red-color)"
        okTextColor="var(--background-color)"
        cancelTextColor="var(--background-color)"
        headerBgColor="var(--background-color)"
        headerTextColor="var(--red-color)"
        defaultBgColor="var(--brand-color)"
      >
        Are you sure you want to exit Draft Creation? You may lose your
        progress.
      </CustomModal>
      <CustomModal
        title="Reset New Draft Form"
        open={isResetModalVisible}
        onOk={handleResetConfirm}
        onCancel={handleResetCancel}
        okText="Confirm"
        cancelText="Cancel"
        bgColor="var(--background-color)"
        textColor="var(--brand-color)"
        okBgColor="var(--red-color)"
        okTextColor="var(--background-color)"
        cancelTextColor="var(--background-color)"
        headerBgColor="var(--background-color)"
        headerTextColor="var(--red-color)"
        defaultBgColor="var(--brand-color)"
      >
        Are you sure you want to reset the new draft form? This will reset all
        your progress.
      </CustomModal>
    </NewDraftContainer>
  );
}

export default NewDraftPageThree;
