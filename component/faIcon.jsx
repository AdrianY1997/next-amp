import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FaIcon = ({
    icon = null,
    size = null,
    color = null
}) => {
    return (
        <i>
            <FontAwesomeIcon icon={icon ?? faCircleQuestion} width={size ?? "12pt"} color={color ?? "black"} />
        </i>
    );
}

export default FaIcon;