import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDraftForm,
  setCurrentPage,
  setIsEditing,
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
import { MdKeyboardArrowLeft } from "react-icons/md";
import StyledButton from "../ui/StyledButton";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import FormRow from "../ui/FormRow";
import NewDraftPageHeader from "../components/NewDraftPageHeader";
import { useSubmitNewDraft } from "../authentication/useSubmitNewDraft";
import EditDraftsHeader from "../components/EditDraftsHeader";
import {
  EditDraftSaveModal,
  EditDraftCancelModal,
  LeaveDraftCreationModal,
  ResetDraftFormModal,
} from "../ui/CustomModals";

function NewDraftPageThree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  // redux state
  const isEditingState = useSelector((state) => state.newDraft.isEditing); // state to manage whether in new draft mode or edit draft mode
  const maps = useSelector((state) => state.newDraft.maps);
  const numMaps = useSelector((state) => state.newDraft.numMap);

  // react-query
  const { submitNewDraft, isPending } = useSubmitNewDraft();

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

  // Cancel Modal functions
  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
  };

  const handleCancelConfirm = () => {
    handleResetDraftForm();
    handleCancelCancel();
    navigate("/dashboard/my-drafts");
    dispatch(setIsEditing(false));
  };

  //=====================================================================
  //=====================================================================

  // Save Modal functions
  const showSaveModal = () => {
    setIsSaveModalVisible(true);
  };

  const handleSaveCancel = () => {
    setIsSaveModalVisible(false);
  };

  const handleSaveConfirm = () => {
    handleResetDraftForm();
    handleSaveCancel();
    navigate("/dashboard/my-drafts");
    dispatch(setIsEditing(false));
  };

  //=====================================================================
  //=====================================================================

  const handleFinish = () => {
    submitNewDraft();
    dispatch(resetDraftForm());
    navigate("/dashboard/my-drafts");
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
      {!isEditingState ? (
        <NewDraftPageHeader
          showExitModal={showModal}
          showResetModal={showResetModal}
        />
      ) : (
        <EditDraftsHeader
          showCancelModal={showCancelModal}
          showSaveModal={showSaveModal}
        />
      )}

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
      <LeaveDraftCreationModal
        isModalVisible={isModalVisible}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />

      <ResetDraftFormModal
        isResetModalVisible={isResetModalVisible}
        handleResetConfirm={handleResetConfirm}
        handleResetCancel={handleResetCancel}
      />

      <EditDraftCancelModal
        isCancelModalVisible={isCancelModalVisible}
        handleCancelConfirm={handleCancelConfirm}
        handleCancelCancel={handleCancelCancel}
      />

      <EditDraftSaveModal
        isSaveModalVisible={isSaveModalVisible}
        handleSaveConfirm={handleSaveConfirm}
        handleSaveCancel={handleSaveCancel}
      />
    </NewDraftContainer>
  );
}

export default NewDraftPageThree;
