'use client'

import { useEffect, useRef, useState } from 'react'
import { useUser } from '@/contexts/user-context'
import { PhotoCommentsForm } from './photo-comments-form'
import { Comment } from '@/actions/photo-get'
import styles from './photo-comments.module.css'

interface PhotoCommentsProps {
  single: boolean
  id: number
  comments: Comment[]
}

export function PhotoComments({ single, id, comments }: PhotoCommentsProps) {
  const [allComments, setAllComments] = useState(() => comments)
  const commentsSection = useRef<HTMLUListElement>(null)
  const { user } = useUser()

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight
    }
  }, [allComments])

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${single ? styles.single : ''}`}
      >
        {allComments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          id={id}
          single={single}
          setComments={setAllComments}
        />
      )}
    </>
  )
}
