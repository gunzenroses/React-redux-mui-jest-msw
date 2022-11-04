import { FC, memo } from 'react';
import { Box } from "@mui/system";
import { Button, Typography } from '@mui/material';

import { useMode, useMyDispatch, useMyListLength } from '../redux/hooks';
import { setMode } from '../redux/modeSlice';
import { MyButton } from './MyButton';

type Props = {
  onDeleteCompleted: () => void;
};

const Footer: FC<Props> = memo(({
  onDeleteCompleted
}) => {
  const dispatch = useMyDispatch();

  const currentMode = useMode();

  const listLength = useMyListLength();

  const onModeChange = (mode: ModeType) => {
    dispatch(setMode(mode));
  }

  const text = listLength === 1 ? 'item' : 'items';
  const modes: ModeType[] = ['All', 'Active', 'Completed'];
  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-around'
      alignItems='center'
    >
      <Typography variant='body1'>
        {listLength} {text} left
      </Typography>
      <Box display='flex' gap='20px'>
        {modes.map((item, index) => {
          return (
            <MyButton
              key={String(index)}
              matchCurrentMode={currentMode === item}
              onClick={onModeChange}
            >
              {item}
            </MyButton>
          );
        })}
      </Box>
      <Button 
        variant='contained'
        color='error'
        onClick={onDeleteCompleted}
      >
          Clear completed
      </Button>
    </Box>
  );
});

export { Footer };