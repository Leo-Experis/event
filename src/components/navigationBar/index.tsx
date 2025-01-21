import "./style.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
const NavigationBar = () => {
  return (
    <div className="navigation-body">
      <div className="button home-button">
        <HomeIcon sx={{ fontSize: { xs: 42, sm: 48, md: 48, lg: 48 } }} />
        <div className="active"></div>
      </div>

      <div className="button search-button">
        <SearchIcon sx={{ fontSize: { xs: 42, sm: 48, md: 48, lg: 48 } }} />
      </div>

      <div className="new-event-button">
        <AddCircleIcon sx={{ fontSize: { xs: 50, sm: 50, md: 50, lg: 50 } }} />
      </div>

      <div className="button calendar-button">
        <CalendarTodayIcon
          sx={{ fontSize: { xs: 42, sm: 48, md: 48, lg: 48 } }}
        />
      </div>

      <div className="button profile-button">
        <PersonIcon sx={{ fontSize: { xs: 42, sm: 48, md: 48, lg: 48 } }} />
      </div>
    </div>
  );
};

export default NavigationBar;
