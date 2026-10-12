'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  practiceName: string | null;
  specialty: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  updatedAt: string;
}

interface Faq {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  active: boolean;
}

type Tab = 'leads' | 'posts' | 'faqs';

const LEAD_STATUSES = ['New', 'Contacted', 'Closed'];
const LEAD_TYPES = ['contact', 'consultation', 'audit'];

const inputCls =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
const labelCls = 'block text-sm font-medium text-slate-700';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  });
  const [postError, setPostError] = useState('');

  // FAQs state
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    sortOrder: 0,
    active: true,
  });
  const [faqError, setFaqError] = useState('');

  const handleUnauthorized = useCallback(
    (res: Response) => {
      if (res.status === 401) {
        router.push('/admin/login');
        return true;
      }
      return false;
    },
    [router]
  );

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      params.set('type', typeFilter);
      params.set('status', statusFilter);
      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (handleUnauthorized(res)) return;
      const data = await res.json();
      setLeads(Array.isArray(data.leads) ? data.leads : []);
    } catch {
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  }, [search, typeFilter, statusFilter, handleUnauthorized]);

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (handleUnauthorized(res)) return;
      const data = await res.json();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch {
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  }, [handleUnauthorized]);

  const fetchFaqs = useCallback(async () => {
    setFaqsLoading(true);
    try {
      const res = await fetch('/api/admin/faqs');
      if (handleUnauthorized(res)) return;
      const data = await res.json();
      setFaqs(Array.isArray(data.faqs) ? data.faqs : []);
    } catch {
      setFaqs([]);
    } finally {
      setFaqsLoading(false);
    }
  }, [handleUnauthorized]);

  // Initial auth check + data load
  useEffect(() => {
    fetchLeads();
    fetchPosts();
    fetchFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch leads when filters change (debounced)
  useEffect(() => {
    const t = setTimeout(() => fetchLeads(), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, typeFilter, statusFilter]);

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  }

  async function updateLeadStatus(id: string, status: string) {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (handleUnauthorized(res)) return;
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      }
    } catch {
      // leave status unchanged on error
    }
  }

  async function deleteLead(id: string) {
    if (!window.confirm('Delete this lead permanently?')) return;
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (handleUnauthorized(res)) return;
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      // leave list unchanged on error
    }
  }

  function exportCsv() {
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    params.set('type', typeFilter);
    params.set('status', statusFilter);
    window.location.href = `/api/admin/leads/export?${params.toString()}`;
  }

  // ---- Posts ----
  function openNewPostForm() {
    setEditingPost(null);
    setPostForm({ title: '', slug: '', excerpt: '', content: '', published: false });
    setPostError('');
    setShowPostForm(true);
  }

  function openEditPostForm(post: Post) {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      content: post.content,
      published: post.published,
    });
    setPostError('');
    setShowPostForm(true);
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    setPostError('');
    try {
      const url = editingPost ? `/api/admin/posts/${editingPost.id}` : '/api/admin/posts';
      const method = editingPost ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      });
      if (handleUnauthorized(res)) return;
      if (!res.ok) {
        setPostError('Could not save the post. Please check the fields.');
        return;
      }
      setShowPostForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch {
      setPostError('Network error. Please try again.');
    }
  }

  async function deletePost(id: string) {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (handleUnauthorized(res)) return;
      if (res.ok) fetchPosts();
    } catch {
      // no-op
    }
  }

  // ---- FAQs ----
  function openNewFaqForm() {
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '', sortOrder: 0, active: true });
    setFaqError('');
    setShowFaqForm(true);
  }

  function openEditFaqForm(faq: Faq) {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder,
      active: faq.active,
    });
    setFaqError('');
    setShowFaqForm(true);
  }

  async function saveFaq(e: React.FormEvent) {
    e.preventDefault();
    setFaqError('');
    try {
      const url = editingFaq ? `/api/admin/faqs/${editingFaq.id}` : '/api/admin/faqs';
      const method = editingFaq ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqForm),
      });
      if (handleUnauthorized(res)) return;
      if (!res.ok) {
        setFaqError('Could not save the FAQ. Please check the fields.');
        return;
      }
      setShowFaqForm(false);
      setEditingFaq(null);
      fetchFaqs();
    } catch {
      setFaqError('Network error. Please try again.');
    }
  }

  async function deleteFaq(id: string) {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (handleUnauthorized(res)) return;
      if (res.ok) fetchFaqs();
    } catch {
      // no-op
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'leads', label: 'Leads' },
    { id: 'posts', label: 'Blog Posts' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold">Med Flow System — Admin</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-600"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-2 px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 px-4 py-3 text-sm font-medium ${
                tab === t.id
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {tab === 'leads' && (
          <section>
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="lead-search" className={labelCls}>
                  Search
                </label>
                <input
                  id="lead-search"
                  type="text"
                  placeholder="Name, email, or practice…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="type-filter" className={labelCls}>
                  Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={inputCls}
                >
                  <option value="all">All</option>
                  {LEAD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status-filter" className={labelCls}>
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={inputCls}
                >
                  <option value="all">All</option>
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={exportCsv}
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Export CSV
              </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow">
              {leadsLoading ? (
                <p className="p-6 text-sm text-slate-500">Loading leads…</p>
              ) : leads.length === 0 ? (
                <p className="p-6 text-sm text-slate-500">No leads found.</p>
              ) : (
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {['Date', 'Name', 'Email', 'Phone', 'Type', 'Practice', 'Status', 'Message', ''].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-2.5 text-left font-semibold text-slate-600"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">
                          {new Date(lead.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 font-medium text-slate-900">{lead.name}</td>
                        <td className="px-4 py-2.5 text-slate-700">{lead.email}</td>
                        <td className="px-4 py-2.5 text-slate-700">{lead.phone ?? '—'}</td>
                        <td className="px-4 py-2.5 capitalize text-slate-700">{lead.type}</td>
                        <td className="px-4 py-2.5 text-slate-700">{lead.practiceName ?? '—'}</td>
                        <td className="px-4 py-2.5">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900"
                          >
                            {LEAD_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td
                          className="max-w-[240px] truncate px-4 py-2.5 text-slate-700"
                          title={lead.message ?? ''}
                        >
                          {lead.message ?? '—'}
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            className="rounded-md px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}

        {tab === 'posts' && (
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Blog Posts</h2>
              <button
                onClick={openNewPostForm}
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                New Post
              </button>
            </div>

            {showPostForm && (
              <form
                onSubmit={savePost}
                className="mt-4 space-y-4 rounded-lg bg-white p-6 shadow"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingPost ? 'Edit Post' : 'New Post'}
                </h3>
                <div>
                  <label htmlFor="post-title" className={labelCls}>
                    Title
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    required
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm((f) => ({
                        ...f,
                        title: e.target.value,
                        slug: editingPost ? f.slug : slugify(e.target.value),
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="post-slug" className={labelCls}>
                    Slug
                  </label>
                  <input
                    id="post-slug"
                    type="text"
                    required
                    pattern="[a-z0-9-]+"
                    value={postForm.slug}
                    onChange={(e) => setPostForm((f) => ({ ...f, slug: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="post-excerpt" className={labelCls}>
                    Excerpt
                  </label>
                  <input
                    id="post-excerpt"
                    type="text"
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm((f) => ({ ...f, excerpt: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="post-content" className={labelCls}>
                    Content
                  </label>
                  <textarea
                    id="post-content"
                    required
                    rows={10}
                    value={postForm.content}
                    onChange={(e) => setPostForm((f) => ({ ...f, content: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="post-published"
                    type="checkbox"
                    checked={postForm.published}
                    onChange={(e) => setPostForm((f) => ({ ...f, published: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600"
                  />
                  <label htmlFor="post-published" className="text-sm font-medium text-slate-700">
                    Published
                  </label>
                </div>
                {postError && <p className="text-sm text-red-600">{postError}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPostForm(false);
                      setEditingPost(null);
                    }}
                    className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 space-y-3">
              {postsLoading ? (
                <p className="text-sm text-slate-500">Loading posts…</p>
              ) : posts.length === 0 ? (
                <p className="text-sm text-slate-500">No posts yet.</p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">{post.title}</p>
                      <p className="text-sm text-slate-500">/{post.slug}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          post.published
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <button
                        onClick={() => openEditPostForm(post)}
                        className="text-sm font-medium text-teal-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {tab === 'faqs' && (
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">FAQs</h2>
              <button
                onClick={openNewFaqForm}
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                New FAQ
              </button>
            </div>

            {showFaqForm && (
              <form
                onSubmit={saveFaq}
                className="mt-4 space-y-4 rounded-lg bg-white p-6 shadow"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingFaq ? 'Edit FAQ' : 'New FAQ'}
                </h3>
                <div>
                  <label htmlFor="faq-question" className={labelCls}>
                    Question
                  </label>
                  <input
                    id="faq-question"
                    type="text"
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm((f) => ({ ...f, question: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="faq-answer" className={labelCls}>
                    Answer
                  </label>
                  <textarea
                    id="faq-answer"
                    required
                    rows={4}
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm((f) => ({ ...f, answer: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="faq-sortOrder" className={labelCls}>
                    Sort order
                  </label>
                  <input
                    id="faq-sortOrder"
                    type="number"
                    value={faqForm.sortOrder}
                    onChange={(e) =>
                      setFaqForm((f) => ({
                        ...f,
                        sortOrder: Number.isNaN(parseInt(e.target.value, 10))
                          ? 0
                          : parseInt(e.target.value, 10),
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="faq-active"
                    type="checkbox"
                    checked={faqForm.active}
                    onChange={(e) => setFaqForm((f) => ({ ...f, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600"
                  />
                  <label htmlFor="faq-active" className="text-sm font-medium text-slate-700">
                    Active
                  </label>
                </div>
                {faqError && <p className="text-sm text-red-600">{faqError}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFaqForm(false);
                      setEditingFaq(null);
                    }}
                    className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 space-y-3">
              {faqsLoading ? (
                <p className="text-sm text-slate-500">Loading FAQs…</p>
              ) : faqs.length === 0 ? (
                <p className="text-sm text-slate-500">No FAQs yet.</p>
              ) : (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">{faq.question}</p>
                      <p className="truncate text-sm text-slate-500">{faq.answer}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-slate-500">Order: {faq.sortOrder}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          faq.active ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {faq.active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => openEditFaqForm(faq)}
                        className="text-sm font-medium text-teal-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
