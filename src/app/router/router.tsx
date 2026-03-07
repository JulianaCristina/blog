import { Route, Routes } from 'react-router'
import { PageNotFound } from '@/features/auth/components/404/PageNotFound'
import { BlogHomePage } from '@/features/public/BlogHomePage'
import { CMSLayout } from '@/features/cms/components/CMSLayout'
import { PostsPage } from '@/features/cms/posts/PostsPage'
import { PostEditorPage } from '@/features/cms/posts/PostEditorPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BlogHomePage />} />
      <Route path="/cms" element={<CMSLayout />}>
        <Route index element={<PostsPage />} />
        <Route path="dashboard" element={<PostsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="new" element={<PostEditorPage />} />
        <Route path="comments" element={<PostsPage />} />
        <Route path="update/:postId" element={<PostEditorPage />} />
      </Route>
      <Route path="/logout" element={<BlogHomePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
