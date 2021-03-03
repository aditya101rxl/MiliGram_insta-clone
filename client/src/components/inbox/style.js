import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    avatar: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper1: {
        height: 520,
        width: '100%',
    },
    paper2: {
        display: 'flex',
        alignItems: 'center',
        height: 60,
        width: '100%',
    },
    chat: {
        height: 400,
        width: '100%',
    },
    send: {
        height: 60,
        width: '100%',
    },
    input: {
        display: 'flex',
        width: '100%',
        height: '60px'
    },
    focus: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));