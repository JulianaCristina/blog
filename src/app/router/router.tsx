import { Route, Routes } from 'react-router'
import { PostsPage } from '../../features/posts/pages/cms/PostsPage.tsx'
import { PostEditorPage } from '../../features/posts/pages/cms/PostEditorPage.tsx'
import { BlogHomePage } from '../../features/posts/pages/public/BlogHomePage.tsx'
import { PageNotFound } from '../../features/auth/components/404/PageNotFound.tsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BlogHomePage />} />
      <Route path="/cms/posts" element={<PostsPage />} />
      <Route path="/cms/post-editor" element={<PostEditorPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
