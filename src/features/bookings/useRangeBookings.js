import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function datesOverlap(startDate1, endDate1, startDate2, endDate2) {
  return (
    new Date(startDate1) < new Date(endDate2) &&
    new Date(endDate1) > new Date(startDate2)
  );
}

// Filter cabins that are available (no overlap with selected dates)
function findAvailableCabins(data = {}, startDate, endDate) {
  return data
    .filter(
      (item) => !datesOverlap(item.startDate, item.endDate, startDate, endDate)
    )
    .map((item) => item.cabin.name);
}

export function useRangeBookings() {
  const [searchParams] = useSearchParams();

  const selectedStartDate = searchParams.get("startDate") || new Date();
  const selectedEndDate = searchParams.get("endDate") || new Date();

  const {
    isLoading,
    data: bookings = {},
    error,
  } = useQuery({
    queryKey: ["bookings", selectedStartDate, selectedEndDate],
    queryFn: () => getBookings(),
  });

  const availableCabins = findAvailableCabins(
    bookings,
    selectedStartDate,
    selectedEndDate
  );

  return { availableCabins, isLoading, error };
}
