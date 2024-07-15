import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setNumberOfMaps,
  updateMap,
  updatePOI,
} from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  CustomSpan,
  LeaveButton,
  NewDraftContainer,
  NewDraftFormContainer,
  ProgressBarContainer,
  SubContainer,
  TeamContainer,
  TeamHeader,
  TeamHeaderItem,
} from "../styles/MyDraftStyles";
import CustomModal from "../ui/CustomModal";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StyledButton from "../ui/StyledButton";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import FormRow from "../ui/FormRow";

function NewDraftPageThree() {
  const dispatch = useDispatch();
  //modal
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const maps = useSelector((state) => state.newDraft.maps);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  const handleClickNext = () => {
    navigate("/new-draft-three");
  };

  const handleClickPrev = () => {
    navigate("/new-draft-two");
  };

  const handleNumberOfMapsChange = (e) => {
    const numberOfMaps = parseInt(e.target.value, 10);
    if (numberOfMaps >= 0 && numberOfMaps <= 4) {
      dispatch(setNumberOfMaps(numberOfMaps));
    }
  };

  const handleMapChange = (index, key, value) => {
    dispatch(updateMap({ index, key, value }));
  };

  const handlePOIChange = (mapIndex, poiIndex, key, value) => {
    dispatch(updatePOI({ mapIndex, poiIndex, key, value }));
  };

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(3));
  }, [dispatch]);

  return (
    <NewDraftContainer>
      <LeaveButton onClick={showModal}>Leave Draft Creation</LeaveButton>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
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
                  min="0"
                  max="4"
                  onChange={handleNumberOfMapsChange}
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
                      value={map.mapName}
                      onChange={(e) =>
                        handleMapChange(index, "mapName", e.target.value)
                      }
                    />
                  </FormRow>
                  <FormRow label="Number of Storm Point POI's">
                    <StyledInput
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      type="number"
                      value={map.stormPoints}
                      onChange={(e) =>
                        handleMapChange(index, "stormPoints", e.target.value)
                      }
                    />
                  </FormRow>

                  <TeamHeader>
                    <TeamHeaderItem>Team Name</TeamHeaderItem>
                    <TeamHeaderItem>Draft Priority</TeamHeaderItem>
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
                        type="text"
                        placeholder={`POI ${poiIndex + 1} Name`}
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
            onClick={handleClickNext}
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
    </NewDraftContainer>
  );
}

export default NewDraftPageThree;
