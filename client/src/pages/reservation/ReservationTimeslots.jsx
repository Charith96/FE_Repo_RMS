import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchReservationItemsById } from "../../store/actions/ReservationItemActions";
import { useLocation } from "react-router-dom";
import FlexibleTimeSlots from "./ReservationTimeFlexible";
import DefinedReservation from "./ReservationTimeDefined";

const ReservationGroupList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const item = location.state ? location.state.item : null;
  const [slotType, setSlotType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchItem = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );

  const fetchData = useCallback(async () => {
    if (item) {
      setIsLoading(true);
      try {
        await dispatch(fetchReservationItemsById(item));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [dispatch, item]);

  useEffect(() => {
    fetchData();
  }, [fetchData, item]);

  useEffect(() => {
    if (fetchItem) {
      setSlotType(fetchItem.timeSlotType);
    }
  }, [fetchItem]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!fetchItem) {
    return <div>No reservation data available</div>;
  }

  return (
    <>
      {slotType === "Flexible" && <FlexibleTimeSlots />}
      {slotType === "Defined" && <DefinedReservation />}
    </>
  );
};

export default ReservationGroupList;

