import { FC } from 'react';

import { Button } from "@mui/material";

type Props = {
  children: ModeType;
  matchCurrentMode: boolean;
  onClick: (mode: ModeType) => void;
};

const MyButton: FC<Props> = ({ children, matchCurrentMode, onClick }) => {
  const onClickHandler = () => {
    onClick(children);
  };

  return (
    <Button
      variant={ matchCurrentMode ? 'contained' : 'outlined' }
      sx={{
        color: '#0000008a',
      }}
      onClick={onClickHandler}
    >
      {children}
    </Button>
  );
};

export { MyButton };