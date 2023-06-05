import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FaIcon = ({ icon = null, size = null, color = null, height = null }) => {
  return (
    <FontAwesomeIcon
      icon={icon ?? faCircleQuestion}
      style={{ width: size ?? "12pt", height: size ?? null }}
      color={color ?? "black"}
    />
  );
};

export default FaIcon;
