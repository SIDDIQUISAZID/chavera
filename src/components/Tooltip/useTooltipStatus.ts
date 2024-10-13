import { debounce } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTooltipStatus,
  updateTooltipStatus,
} from "../../features/tooltip/tooltipSlice";
//check tooltip status
const useTooltipStatus = (id?: string) => {
  const isOpen = useAppSelector(selectTooltipStatus);
  const dispatch = useAppDispatch();

  const setIsOpen = (status: boolean) => {
    if (status && id) {
      dispatch(updateTooltipStatus({ status: id }));
    } else {
      dispatch(updateTooltipStatus({ status: "idle" }));
    }
  };

  const closeTooltip = debounce((isVisible: boolean) => {
    if (!isVisible) {
      dispatch(updateTooltipStatus({ status: "idle" }));
    }
  }, 300);

  return { isOpen, setIsOpen, closeTooltip };
};
export default useTooltipStatus;
