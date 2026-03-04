import { Route, Routes } from 'react-router'
import { PostsPage } from '@/features/posts/pages/cms/PostsPage'
import { PostEditorPage } from '@/features/posts/pages/cms/PostEditorPage'
import { BlogHomePage } from '@/features/posts/pages/public/BlogHomePage'
import { PageNotFound } from '@/features/auth/components/404/PageNotFound'
import { CMSLayout } from '@/features/posts/pages/cms/CMSLayout'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BlogHomePage />} />
      <Route path="/cms" element={<CMSLayout />}>
        <Route index element={<PostsPage />} />
        <Route path="dashboard" element={<PostsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="new" element={<PostsPage />} />
        <Route path="comments" element={<PostsPage />} />
        <Route path="update" element={<PostEditorPage />} />
      </Route>
      <Route path="/logout" element={<BlogHomePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
