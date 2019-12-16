import { colors } from '@material-ui/core';

export default {
  colorSecondary: {
    '&$checked': {
      color: colors.blue[900],
      '&:hover': {
        backgroundColor: colors.grey,
      },
    },
  },
};
