import { Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React from 'react'
import usePosts from '../Hooks/usePosts'

function CreatePost() {
  const { enqueueSnackbar } = useSnackbar()
  const { loading, error, data, res, setstate, createPost }: any = usePosts()
  return (
    <Button
      onClick={() => {
        createPost({
          variables: {
            description: `[{"type":"paragraph","children":[{"text":""}]}]`,
          },
        }).catch((e: any) => enqueueSnackbar(`${e}`, { variant: 'error' }))
      }}
      style={{ marginBottom: '20px' }}
      variant="text"
      color="default"
    >
      Create new post
    </Button>
  )
}

export default CreatePost
