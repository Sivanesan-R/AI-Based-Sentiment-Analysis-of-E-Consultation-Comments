export const posts = [
  {
    id: 'p1',
    title: 'Building a Fast React Site',
    short: 'Quick tips to speed up your React app',
    description:
      'Full article: This post explains performance tricks including code-splitting, memoization and lazy loading. It has examples and code snippets.',
    draft: false,
    comments: [
      'Great explanation. The code-splitting section made the topic easy to understand.',
      'The app still feels slow on older phones, so more optimization examples would help.',
      'Memoization is useful, but the article should warn about using it everywhere.',
      'Clear post with practical advice for teams building larger React apps.',
      'I liked the lazy loading part, but a working demo would make it stronger.',
    ],
  },
  {
    id: 'p2',
    title: 'Designing Dark UIs',
    short: 'Color palettes and accessibility',
    description:
      'A deep-dive into color contrast, accessible text colors, and creating pleasant dark themes for modern apps.',
    draft: true,
    comments: [
      'The accessibility guidance is useful and easy to apply.',
      'Some color combinations still look too low contrast for long reading sessions.',
      'Good overview of dark mode design decisions.',
      'Please add more examples for buttons, forms, and charts.',
      'The palette advice feels balanced and practical.',
    ],
  },
]
