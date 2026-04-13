
import DentalHealthOverview from "./DetalHealthOverview";
import NextAppointment from "./NextAppoitment";
function ActivityOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <DentalHealthOverview/>
      <NextAppointment />
    </div>
  );
}
export default ActivityOverview;