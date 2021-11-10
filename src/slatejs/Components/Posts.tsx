import { Backdrop, Link } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useHistory } from 'react-router'
import RichText from '../Apps/Slate/RichText'
import ErrorBoundary from '../ErrorBoundary'
import usePosts from '../Hooks/usePosts'
import Options from '../UI/Options'
import Comments from './Comments'
import CreatePost from './CreatePost'
import Post from './Post'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined'
function Posts() {
  const { enqueueSnackbar } = useSnackbar()
  let history: any = useHistory()

  const { loading, error, data, deletePost } = usePosts()

  if (loading)
    return (
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  if (error) return <h1> error</h1>
  return (
    <div>
      <CreatePost />
      {data.posts
        .slice(0)
        .reverse()
        .map((item: any, index: number) => {
          return (
            <div key={index} style={{ marginBottom: '1%' }}>
              <Post
                id={item.id}
                actions={[
                  {
                    icon: <ThumbUpAltOutlinedIcon />,
                    content: item.like.length,
                    value: 'like',
                    isUsed: item.like
                      .map((item: any) => item.username)
                      .includes(localStorage.getItem('username') || ''),
                  },
                  {
                    icon: <ThumbDownAltOutlinedIcon />,
                    content: item.dislike.length,
                    value: 'dislike',
                    isUsed: item.dislike
                      .map((item: any) => item.username)
                      .includes(localStorage.getItem('username') || ''),
                  },
                  {
                    icon: <ReportOutlinedIcon />,
                    content: 'Report',
                    value: 'Report',
                    isUsed: false,
                  },
                ]}
                key={index}
                underContent={<Comments item={item} />}
                avatar={item.addedBy.imageUrl}
                username={
                  <Link
                    // href={'user/' + item.addedBy.username}
                    onClick={() => {
                      history.push('user/' + item.addedBy.username)
                    }}
                  >
                    {item.addedBy.username}
                  </Link>
                }
                createdDate={item.createdDate}
                options={
                  <Options
                    options={[
                      {
                        title: 'delete',
                        action: () => {
                          deletePost({
                            variables: {
                              id: item.id,
                            },
                          }).catch((e: any) =>
                            enqueueSnackbar(`${e}`, {
                              variant: 'error',
                            }),
                          )
                        },
                      },
                    ]}
                  />
                }
              >
                <ErrorBoundary>
                  <RichText item={item} />
                </ErrorBoundary>
              </Post>
            </div>
          )
        })}
    </div>
  )
}

export default Posts
