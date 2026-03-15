import { useNavigate } from 'react-router'
import { useAppSelector } from '@/app/store/hooks'
import { selectAllPosts } from '@/features/cms/posts/postsSlices'
import { PostStatus } from '@/features/cms/posts/posts.types'
import { Button } from '@/components/ui/button'

export const BlogHomePage = () => {
  const navigate = useNavigate()
  const posts = useAppSelector(selectAllPosts)

  const publishedPosts = posts.filter((post) => post.status === PostStatus.published)

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 justify-center h-100">
      <div className="flex justify-end ">
        <Button onClick={() => navigate('/cms/dashboard')}>Go to Admin</Button>
      </div>
      <h1 className="mb-8 text-4xl font-bold justify-center text-center">Welcome to Our Blog</h1>

      {publishedPosts.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">
          No published posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <article key={post.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                By {post.authorId} on{' '}
                {Intl.DateTimeFormat('pt-br', { dateStyle: 'medium' }).format(post.updatedAt)}
              </p>
              <p className="mb-4 line-clamp-3 text-base">{post.content}</p>
              <button
                onClick={() => navigate(`/blog/posts/${post.slug}`)}
                className="text-primary hover:underline"
              >
                Read More
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
