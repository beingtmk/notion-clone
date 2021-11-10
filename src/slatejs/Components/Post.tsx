import { Button, ButtonGroup, CircularProgress } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import React from 'react'
import useUpdatePost from '../Hooks/useUpdatePost'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 'auto',
    },
    media: {
      height: 0,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
)

export default function Post({
  options,
  children,
  username,
  createdDate,
  avatar,
  actions,
  underContent,
  id,
}: any) {
  const { state, like_dislike_post, loading } = useUpdatePost(actions)
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={avatar} aria-label="recipe" className={classes.avatar} />
        }
        action={options}
        title={username}
        subheader={createdDate}
      />
      <CardMedia
        className={classes.media}
        image="https://i.pinimg.com/originals/83/b3/15/83b315a642ccb031e8da1b165a69ad75.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {children}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonGroup variant="outlined" aria-label="card actions">
          {actions &&
            state.map((item: any, index: number) => (
              <Button
                onClick={() => {
                  like_dislike_post({
                    variables: {
                      id,
                      action: item.value,
                    },
                  }).catch((e: any) =>
                    enqueueSnackbar(`${e}`, {
                      variant: 'error',
                    }),
                  )
                }}
                color={item.isUsed ? 'primary' : 'default'}
                key={index}
                value={item.value}
                startIcon={loading ? <CircularProgress size={22} /> : item.icon}
              >
                {item.content}
              </Button>
            ))}
        </ButtonGroup>
        {underContent && (
          <IconButton
            component="span"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{underContent}</CardContent>
      </Collapse>
    </Card>
  )
}
