import { Button } from "@mui/material";

const MyButton = ({
  title,
  backgroundColor,
  onClick,
  className,
  color,
  children,
}: {
  title?: string;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : " #3E63F4",
        "&:hover": {
          opacity: 0.8,
        },
        color: color ? color : "#fffffff",
      }}
      onClick={onClick}
      className={className}
    >
      {children ? children : title}
    </Button>
  );
};

export default MyButton;
