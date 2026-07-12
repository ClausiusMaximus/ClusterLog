import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EditIcon from "@mui/icons-material/Edit";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotesIcon from "@mui/icons-material/Notes";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import WorkIcon from "@mui/icons-material/Work";

export const Icons = {
  attack: LocalFireDepartmentIcon,

  kip: PsychologyIcon,

  duration: AccessTimeIcon,

  calendar: CalendarMonthIcon,

  notes: NotesIcon,

  edit: EditIcon,

  delete: DeleteIcon,

  activity: {
    sleep: BedtimeIcon,

    work: WorkIcon,

    household: HomeIcon,

    leisure: SportsEsportsIcon,

    driving: DirectionsCarIcon,

    eating: RestaurantIcon,

    sport: FitnessCenterIcon,

    other: HelpIcon,
  },

  side: {
    left: KeyboardDoubleArrowLeftIcon,

    right: KeyboardDoubleArrowRightIcon,

    both: CompareArrowsIcon,
  },
} as const;