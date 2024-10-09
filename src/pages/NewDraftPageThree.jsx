import { useCallback, useEffect, useState } from "react";
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
  PoiRowError,
  PoiRowPoiNameContainer,
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
import { useDeleteDraft } from "../authentication/useDeleteDraft";

function NewDraftPageThree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state to track if the button has been clicked
  const [buttonClicked, setButtonClicked] = useState(false);

  //================end of error handling state=================

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  // redux state
  const isEditingState = useSelector((state) => state.newDraft.isEditing); // state to manage whether in new draft mode or edit draft mode
  const isEditingHistoryState = useSelector(
    (state) => state.newDraft.isEditingHistory
  );
  const maps = useSelector((state) => state.newDraft.maps);
  const numMaps = useSelector((state) => state.newDraft.numMap);

  // current draft being edited
  const draftInEditing = useSelector((state) => state.draft.currDraftInEditing);

  const { deleteDraft } = useDeleteDraft();
  const { submitNewDraft } = useSubmitNewDraft();

  // error handling state
  const [errors, setErrors] = useState({
    numMapsError: "",
    mapErrors: maps.map(() => ({
      mapNameError: "",
      numPoiError: "",
      poiErrors: [],
    })),
  });

  // validation
  const validateInputs = useCallback(() => {
    const newErrors = {
      numMapsError: "",
      mapErrors: maps.map(() => ({
        mapNameError: "",
        numPoiError: "",
        poiErrors: [],
      })),
    };

    let isValid = true;

    if (!numMaps) {
      newErrors.numMapsError = "This field is required.";
      isValid = false;
    } else if (numMaps < 1 || numMaps > 4) {
      newErrors.numMapsError = "Number of maps must be between 1 and 4.";
      isValid = false;
    }

    maps.forEach((map, index) => {
      if (!map.mapName) {
        newErrors.mapErrors[index].mapNameError = "Map name is required.";
        isValid = false;
      } else if (map.mapName.length > 30) {
        newErrors.mapErrors[index].mapNameError =
          "Map name cannot exceed 30 characters.";
        isValid = false;
      }

      if (map.numPoi === undefined || map.numPoi === "" || map.numPoi === 0) {
        newErrors.mapErrors[index].numPoiError = "Number of POI's is required.";
        isValid = false;
      } else if (map.numPoi < 0 || map.numPoi > 30) {
        newErrors.mapErrors[index].numPoiError =
          "Number of POI's must be between 0 and 30.";
        isValid = false;
      }

      map.pois.forEach((poi, poiIndex) => {
        if (!poi.name) {
          if (!newErrors.mapErrors[index].poiErrors[poiIndex]) {
            newErrors.mapErrors[index].poiErrors[poiIndex] = {
              poiNameError: "",
              poiPointsError: "",
            };
          }
          newErrors.mapErrors[index].poiErrors[poiIndex].poiNameError =
            "POI name is required.";
          isValid = false;
        } else if (poi.name.length > 30) {
          if (!newErrors.mapErrors[index].poiErrors[poiIndex]) {
            newErrors.mapErrors[index].poiErrors[poiIndex] = {
              poiNameError: "",
              poiPointsError: "",
            };
          }
          newErrors.mapErrors[index].poiErrors[poiIndex].poiNameError =
            "POI name cannot exceed 30 characters.";
          isValid = false;
        }

        if (poi.points === undefined || poi.points === "" || poi.points === 0) {
          if (!newErrors.mapErrors[index].poiErrors[poiIndex]) {
            newErrors.mapErrors[index].poiErrors[poiIndex] = {
              poiNameError: "",
              poiPointsError: "",
            };
          }
          newErrors.mapErrors[index].poiErrors[poiIndex].poiPointsError =
            "POI number is required.";
          isValid = false;
        }
      });
    });

    setErrors(newErrors);

    return isValid;
  }, [maps, numMaps]);

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
    navigate("/new-draft-one");
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
    // handleResetDraftForm();
    handleCancelCancel();
    if (isEditingHistoryState) {
      navigate("/dashboard/draft-history");
    } else {
      navigate("/dashboard/my-drafts");
    }
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
    submitNewDraft(undefined, {
      onSuccess: () => {
        handleSaveCancel();

        if (!draftInEditing.is_draft_complete) {
          deleteDraft(draftInEditing.draft_id);
        }
        dispatch(resetDraftForm());

        navigate("/dashboard/my-drafts");
      },
    });

    dispatch(setIsEditing(false));
  };

  //=====================================================================
  //=====================================================================

  const handleFinish = () => {
    setButtonClicked(true);

    if (validateInputs()) {
      submitNewDraft(undefined, {
        onSuccess: () => {
          dispatch(resetDraftForm());
          navigate("/dashboard/my-drafts");
        },
      });
    }
  };

  const handleClickPrev = () => {
    navigate("/new-draft-two");
  };

  const handleNumberOfMapsChange = (n) => {
    const numberOfMaps = n;
    if (numberOfMaps >= 0 && numberOfMaps <= 4) {
      dispatch(setNumberOfMaps(numberOfMaps));
    }
    validateInputs();
  };

  const handleMapChange = (index, key, value) => {
    if (key == "numPoi") {
      if (value >= 0 && value <= 30) {
        dispatch(updateMap({ index, key, value }));
      }

      validateInputs();
      return;
    } else {
      dispatch(updateMap({ index, key, value }));
    }
    validateInputs();
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
              <FormRow
                label="Number of Maps (max. of 4)"
                $error={buttonClicked && errors.numMapsError}
              >
                <StyledInput
                  $bgColor="var(--brand-color)"
                  height="4rem"
                  type="number"
                  id="numberOfMaps"
                  value={numMaps || ""}
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
                  <FormRow
                    label={`Map ${
                      index + 1
                    } Name (Map name cannot exceed 30 characters.)`}
                    $error={
                      buttonClicked && errors.mapErrors[index]?.mapNameError
                    }
                  >
                    <StyledInput
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      type="text"
                      id={`mapName-${index}`}
                      value={map.mapName}
                      onChange={(e) =>
                        handleMapChange(index, "mapName", e.target.value)
                      }
                    />
                  </FormRow>
                  <FormRow
                    label="Number of POI's"
                    $error={
                      buttonClicked && errors.mapErrors[index]?.numPoiError
                    }
                  >
                    <StyledInput
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      type="number"
                      id={`numOfPoi-${index}`}
                      value={map.numPoi || ""}
                      onChange={(e) =>
                        handleMapChange(index, "numPoi", e.target.value)
                      }
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                    />
                  </FormRow>
                  {map.numPoi ? (
                    <TeamHeader>
                      <TeamHeaderItem>POI Name</TeamHeaderItem>
                      <TeamHeaderItem>POI Number</TeamHeaderItem>
                    </TeamHeader>
                  ) : (
                    <></>
                  )}
                  {[...map.pois]
                    .sort((a, b) => a.points - b.points)
                    .map((poi, poiIndex) => (
                      <div
                        key={poiIndex}
                        style={{
                          display: "flex",
                          columnGap: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <PoiRowPoiNameContainer $flex="1">
                          <StyledInput
                            $bgColor="var(--brand-color)"
                            height="4rem"
                            id={`poiName-${index}-${poiIndex}`}
                            type="text"
                            placeholder={`POI ${poiIndex + 1} Name`}
                            // maxLength="30"
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
                          {buttonClicked &&
                            errors.mapErrors[index]?.poiErrors[poiIndex] && (
                              <PoiRowError>
                                {
                                  errors.mapErrors[index].poiErrors[poiIndex]
                                    .poiNameError
                                }
                              </PoiRowError>
                            )}
                        </PoiRowPoiNameContainer>
                        <PoiRowPoiNameContainer $flex="1">
                          <StyledInput
                            $bgColor="var(--brand-color)"
                            height="4rem"
                            type="number"
                            id={`poiNumber-${index}-${poiIndex}`}
                            value={poi.points || ""}
                            onChange={(e) =>
                              handlePOIChange(
                                index,
                                poiIndex,
                                "points",
                                e.target.value
                              )
                            }
                          />
                          {buttonClicked &&
                            errors.mapErrors[index]?.poiErrors[poiIndex] && (
                              <PoiRowError>
                                {
                                  errors.mapErrors[index].poiErrors[poiIndex]
                                    .poiPointsError
                                }
                              </PoiRowError>
                            )}
                        </PoiRowPoiNameContainer>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </SubContainer>
        </form>
        <ButtonContainer $marginTop="4rem" $justifyContent="space-between">
          <StyledButton
            $bgColor="var(--color-grey-100)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--color-grey-400)"
            height="4rem"
            width="20rem"
            onClick={handleClickPrev}
          >
            <CustomSpan $justifyContent="center">
              <MdKeyboardArrowLeft /> Prev
            </CustomSpan>
          </StyledButton>
          {!isEditingState ? (
            <StyledButton
              $bgColor="var(--green-color)"
              $textColor="var(--background-color)"
              $hoverBgColor="var(--brand-color-dark)"
              height="4rem"
              width="20rem"
              onClick={handleFinish}
            >
              <CustomSpan $justifyContent="center">Finish</CustomSpan>
            </StyledButton>
          ) : (
            <></>
          )}
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
