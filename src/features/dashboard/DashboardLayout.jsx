import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentsStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, isLoading: isLoadingStays, confirmedStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  // console.log(bookings);
  console.log(stays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s Activity</div>
      <div>Chart Stay durations</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
