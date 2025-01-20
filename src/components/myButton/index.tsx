import { Button } from "@mui/material";

const MyButton = ({
  title,
  color,
  onClick,
  className,
}: {
  title: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: color ? color : " #3E63F4",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={onClick}
        className={className}
      >
        {title}
      </Button>
    </div>
  );
};

export default MyButton;
