---
title: Hello World
description: Hello, world!
author: Ethan Davidson
---

# Hello World

> Hello, world.

```ts
export interface BlogPostMeta {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug?: string;
  author?: {
    name: string;
    picture?: string;
  };
}

export interface BlogPost {
  html: string;
  filename: string;
  metadata: BlogPostMeta;
}
```
