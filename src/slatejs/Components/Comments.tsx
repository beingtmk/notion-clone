import Button from '@material-ui/core/Button'
import React from 'react'
import Command from '../UI/Commant'
function Comments({ item }: any) {
  return (
    <span style={{ marginBottom: '1%' }}>
      {item.comment.map((item: any, index: number) => (
        <Command key={index} item={item}>
          <span contentEditable suppressContentEditableWarning>
            {item.description}
          </span>
        </Command>
      ))}
      <Command
        // isReplayTo={'comment id'}
        options={
          <span>
            <Button variant="text" color="default">
              Submit comment
            </Button>
          </span>
        }
        item={{
          description: '[{"type":"paragraph","children":[{"text":""}]}]',
          createdDate: Date.now(),
          addedBy: {
            imageUrl: localStorage.getItem('image'),
            username: localStorage.getItem('username'),
          },
        }}
      >
        <span contentEditable suppressContentEditableWarning>
          {item.description}
        </span>
      </Command>
    </span>
  )
}

export default Comments
